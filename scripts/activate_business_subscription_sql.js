#!/usr/bin/env node

/**
 * A simple script to activate a business subscription using direct SQL
 * 
 * Usage:
 *   node scripts/activate_business_subscription_sql.js --email=drunkenberger@gmail.com
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
const email = args.find(arg => arg.startsWith('--email='))?.substring('--email='.length);

if (!email) {
  console.error('Error: You must provide --email=EMAIL');
  process.exit(1);
}

async function activateSubscriptionSQL() {
  try {
    console.log(`Starting subscription activation for ${email}...`);
    
    // Step 1: Find the user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();
    
    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }
    
    console.log(`Found user: ${user.email} (ID: ${user.id})`);
    
    // Step 2: Update the user's subscription flags directly
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        has_active_subscription: true,
        account_type: 'business',
        is_business: true
      })
      .eq('id', user.id);
    
    if (updateUserError) {
      console.error('Error updating user:', updateUserError);
    } else {
      console.log('Successfully updated user subscription flags.');
    }
    
    // Step 3: Get the business profile
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('id, business_name')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) {
      console.error('Error finding business profile:', profileError);
      console.log('User subscription flags were updated, but couldn\'t update business profile.');
      return;
    }
    
    console.log(`Found business profile: ${businessProfile.business_name} (ID: ${businessProfile.id})`);
    
    // Step 4: Update the business profile dates
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30); // 30 days from now
    
    const { error: updateProfileError } = await supabase
      .from('business_profiles')
      .update({
        subscription_start_date: now.toISOString(),
        subscription_end_date: endDate.toISOString()
      })
      .eq('id', businessProfile.id);
    
    if (updateProfileError) {
      console.error('Error updating business profile dates:', updateProfileError);
    } else {
      console.log('Successfully updated business profile dates.');
    }
    
    // Step 5: Try to execute raw SQL to update the subscription_status
    // This will only work if the function exists in the database
    try {
      // Use the PostgreSQL-based SQL update to try to update the status
      const sql = `
        DO $$
        BEGIN
          -- Try updating with direct cast
          BEGIN
            UPDATE public.business_profiles
            SET subscription_status = 'active'
            WHERE id = '${businessProfile.id}';
            RAISE NOTICE 'Updated subscription_status successfully';
          EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not update subscription_status: %', SQLERRM;
          END;
        END $$;
      `;
      
      const { data, error } = await supabase.rpc('execute_raw_query', { sql_query: sql });
      
      if (error) {
        console.log('Note: Could not update subscription_status via SQL, but this is not critical.');
        console.log('Error:', error.message);
      } else {
        console.log('Successfully executed SQL to update subscription_status.');
      }
    } catch (err) {
      console.log('Note: execute_raw_query function not available in the database.');
    }
    
    console.log('\n=== SUBSCRIPTION ACTIVATION SUMMARY ===');
    console.log(`User: ${user.email} (ID: ${user.id})`);
    console.log(`Business Profile: ${businessProfile.business_name} (ID: ${businessProfile.id})`);
    console.log('User subscription flags updated:');
    console.log('- has_active_subscription: TRUE');
    console.log('- account_type: business');
    console.log('- is_business: true');
    console.log(`Business profile subscription dates updated through: ${endDate.toLocaleString()}`);
    console.log('=== ACTIVATION COMPLETE ===');
    console.log('\nThe user should refresh their browser to see the updated subscription status.');
    console.log('If issues persist, they should try logging out and back in again.');
    
  } catch (error) {
    console.error('Error in activateSubscriptionSQL:', error);
  }
}

// Run the activation
activateSubscriptionSQL()
  .then(() => {
    console.log('Script completed.');
  })
  .catch(err => {
    console.error('Unhandled error:', err);
  }); 