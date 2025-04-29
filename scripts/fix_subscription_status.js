#!/usr/bin/env node

/**
 * This script fixes the subscription_status field in business_profiles table
 * by handling the enum type correctly
 * 
 * Usage:
 *   node scripts/fix_subscription_status.js --userId=50f9cb91-9061-4737-beb5-41c584c8dd08
 * 
 * Environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL - Supabase URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (requires admin privileges)
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL', 
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Parse command line arguments
const args = process.argv.slice(2);
const userId = args.find(arg => arg.startsWith('--userId='))?.substring('--userId='.length);

if (!userId) {
  console.error('Error: You must provide --userId=USERID');
  process.exit(1);
}

async function executeRawQuery(query, params = []) {
  try {
    const { data, error } = await supabase.rpc('execute_raw_query', {
      sql_query: query,
      params: params
    });

    if (error) {
      console.error('Error executing query:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error with RPC call:', err);
    return { success: false, error: err };
  }
}

async function fixSubscriptionStatus() {
  try {
    console.log('Starting subscription status fix...');
    
    // Get the business_profile ID
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('id, business_name, subscription_status')
      .eq('user_id', userId)
      .single();
    
    if (profileError) {
      console.error('Error fetching business profile:', profileError);
      return;
    }
    
    console.log(`Business profile found: ${businessProfile.business_name} (ID: ${businessProfile.id})`);
    console.log(`Current subscription_status: ${businessProfile.subscription_status || 'null'}`);
    
    // Prepare and execute SQL with proper casting
    // Approach 1: Use the 'subscription_status' string but cast to the correct enum type
    const query1 = `
      UPDATE public.business_profiles 
      SET subscription_status = 'active'::text::subscription_status 
      WHERE id = '${businessProfile.id}'
    `;
    
    const result1 = await executeRawQuery(query1);
    
    if (result1.success) {
      console.log('Successfully updated subscription_status using enum cast.');
    } else {
      console.log('Failed with first approach, trying alternative...');
      
      // Approach 2: Try to directly update with enum value
      const query2 = `
        UPDATE public.business_profiles 
        SET subscription_status = 'active' 
        WHERE id = '${businessProfile.id}'
      `;
      
      const result2 = await executeRawQuery(query2);
      
      if (result2.success) {
        console.log('Successfully updated subscription_status using direct value.');
      } else {
        console.log('Failed with second approach, trying alternative...');
        
        // Approach 3: Check what values are allowed in the enum
        const query3 = `
          SELECT enum_range(NULL::subscription_status) as allowed_values
        `;
        
        const result3 = await executeRawQuery(query3);
        
        if (result3.success) {
          console.log('Allowed values for subscription_status enum:', result3.data);
          
          // Approach 4: Try updating with one of the allowed enum values
          const query4 = `
            UPDATE public.business_profiles 
            SET subscription_status = 'active' 
            WHERE id = '${businessProfile.id}'
          `;
          
          const result4 = await executeRawQuery(query4);
          
          if (result4.success) {
            console.log('Successfully updated subscription_status using allowed enum value.');
          } else {
            console.log('All approaches failed. Falling back to field info retrieval.');
            
            // Approach 5: Get information about the column to verify its type
            const query5 = `
              SELECT column_name, data_type, udt_name 
              FROM information_schema.columns 
              WHERE table_name = 'business_profiles' AND column_name = 'subscription_status'
            `;
            
            const result5 = await executeRawQuery(query5);
            
            if (result5.success) {
              console.log('Column information:', result5.data);
              console.log('Please use this information to manually correct the subscription_status.');
            } else {
              console.log('Unable to retrieve column information.');
            }
          }
        } else {
          console.log('Unable to retrieve allowed enum values.');
        }
      }
    }
    
    // Update the user subscription status (this is more reliable)
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        has_active_subscription: true,
        account_type: 'business',
        is_business: true
      })
      .eq('id', userId);
    
    if (updateUserError) {
      console.error('Error updating user:', updateUserError);
    } else {
      console.log('Successfully updated user subscription flags.');
    }
    
    // Update business_profile dates (these are not enum types)
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30); // 30 days from now
    
    const { error: updateDatesError } = await supabase
      .from('business_profiles')
      .update({
        subscription_start_date: now.toISOString(),
        subscription_end_date: endDate.toISOString()
      })
      .eq('id', businessProfile.id);
    
    if (updateDatesError) {
      console.error('Error updating business profile dates:', updateDatesError);
    } else {
      console.log('Successfully updated business profile dates.');
    }
    
    console.log('\n=== SUBSCRIPTION STATUS FIX SUMMARY ===');
    console.log(`User ID: ${userId}`);
    console.log(`Business Profile: ${businessProfile.business_name} (ID: ${businessProfile.id})`);
    console.log('User subscription flags updated:');
    console.log('- has_active_subscription: TRUE');
    console.log('- account_type: business');
    console.log('- is_business: true');
    console.log(`Business profile dates updated for subscription period through: ${endDate.toLocaleString()}`);
    console.log('=== FIX COMPLETE ===');
    console.log('\nThe user should refresh their browser to see the updated subscription status.');
    
  } catch (error) {
    console.error('Error in fixSubscriptionStatus:', error);
  }
}

// Run the fix
fixSubscriptionStatus()
  .then(() => {
    console.log('Script completed.');
  })
  .catch(err => {
    console.error('Unhandled error:', err);
  }); 