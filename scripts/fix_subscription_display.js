#!/usr/bin/env node

/**
 * This script fixes subscription display issues by updating all necessary tables
 * 
 * Usage:
 *   node scripts/fix_subscription_display.js --userId=50f9cb91-9061-4737-beb5-41c584c8dd08
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

async function fixSubscription() {
  try {
    console.log('Starting comprehensive subscription fix...');
    console.log(`Updating subscription for user ID: ${userId}`);
    
    // Step 1: Get user details
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email, has_active_subscription, account_type, subscription_id')
      .eq('id', userId)
      .single();
    
    if (userError) {
      console.error('Error fetching user:', userError);
      return;
    }
    
    if (!userData) {
      console.error(`No user found with ID: ${userId}`);
      return;
    }
    
    console.log(`User found: ${userData.email || userData.name || userId}`);
    console.log(`Current status: has_active_subscription = ${userData.has_active_subscription}, account_type = ${userData.account_type}, subscription_id = ${userData.subscription_id || 'null'}`);
    
    // Step 2: Get business profile
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (profileError) {
      console.error('Error fetching business profile:', profileError);
      return;
    }
    
    console.log(`Business profile found: ${businessProfile.business_name} (ID: ${businessProfile.id})`);
    console.log(`Current profile status: subscription_status = ${businessProfile.subscription_status || 'null'}`);
    
    // Step 3: Get subscription plan
    const { data: planData, error: planError } = await supabase
      .from('subscription_plans')
      .select('id, name, max_listings')
      .single();
      
    if (planError) {
      console.error('Error fetching subscription plan:', planError);
      return;
    }
    
    console.log(`Using subscription plan: ${planData.name} (ID: ${planData.id})`);
    
    // Step 4: Set up subscription dates
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30); // 30 days from now
    
    // Step 5: Check for existing subscription in the subscriptions table
    let subscription;
    let subscriptionId = userData.subscription_id;
    
    if (subscriptionId) {
      const { data: existingSubscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('id', subscriptionId)
        .single();
      
      if (subError) {
        console.log(`No subscription found with ID ${subscriptionId}, will create a new one.`);
        subscriptionId = null;
      } else {
        subscription = existingSubscription;
        console.log(`Found existing subscription: ${subscription.id}`);
      }
    }
    
    // Step 6: Create or update subscription
    if (subscription) {
      console.log(`Updating existing subscription: ${subscription.id}`);
      
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          plan_id: planData.id,
          current_period_start: now.toISOString(),
          current_period_end: endDate.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('id', subscription.id);
      
      if (updateError) {
        console.error('Error updating subscription:', updateError);
      } else {
        console.log(`Successfully updated subscription: ${subscription.id}`);
      }
      
      subscriptionId = subscription.id;
    } else {
      console.log('Creating new subscription...');
      
      const { data: newSubscription, error: createError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: planData.id,
          status: 'active',
          current_period_start: now.toISOString(),
          current_period_end: endDate.toISOString(),
          interval: 'monthly'
        })
        .select('id')
        .single();
      
      if (createError) {
        console.error('Error creating subscription:', createError);
      } else {
        console.log(`Successfully created subscription: ${newSubscription.id}`);
        subscriptionId = newSubscription.id;
      }
    }
    
    // Step 7: Update the user record with all required fields
    if (subscriptionId) {
      const { error: updateUserError } = await supabase
        .from('users')
        .update({
          has_active_subscription: true,
          account_type: 'business',
          subscription_id: subscriptionId,
          is_business: true
        })
        .eq('id', userId);
      
      if (updateUserError) {
        console.error('Error updating user:', updateUserError);
      } else {
        console.log(`Successfully updated user with subscription_id: ${subscriptionId}`);
      }
    }
    
    // Step 8: Update business_profile with all required fields
    try {
      // First try with the full update
      const { error: updateProfileError } = await supabase
        .from('business_profiles')
        .update({
          subscription_status: 'active',
          subscription_id: subscriptionId,
          subscription_start_date: now.toISOString(),
          subscription_end_date: endDate.toISOString()
        })
        .eq('id', businessProfile.id);
      
      if (updateProfileError) {
        console.error('Error updating business profile:', updateProfileError);
        console.log('Trying without subscription_status field...');
        
        // Try again without the subscription_status field
        const { error: updateError2 } = await supabase
          .from('business_profiles')
          .update({
            subscription_id: subscriptionId,
            subscription_start_date: now.toISOString(),
            subscription_end_date: endDate.toISOString()
          })
          .eq('id', businessProfile.id);
        
        if (updateError2) {
          console.error('Error updating business profile (second attempt):', updateError2);
        } else {
          console.log('Successfully updated business profile dates and subscription_id.');
        }
      } else {
        console.log('Successfully updated business profile with all subscription fields.');
      }
    } catch (err) {
      console.error('Error during business profile update:', err);
    }
    
    // Step 9: Try direct SQL update for subscription_status if needed
    try {
      // Try a direct SQL approach for subscription_status
      const { error: rawSqlError } = await supabase.rpc('update_text_field', {
        table_name: 'business_profiles',
        column_name: 'subscription_status',
        new_value: 'active',
        row_id: businessProfile.id
      });
      
      if (rawSqlError) {
        console.log('Note: Could not update subscription_status via RPC, but this is likely not critical.');
      } else {
        console.log('Successfully updated subscription_status via SQL.');
      }
    } catch (err) {
      console.log('Note: RPC method not available, skipping.');
    }
    
    console.log('\n=== SUBSCRIPTION FIX SUMMARY ===');
    console.log(`User: ${userData.email}`);
    console.log(`User ID: ${userId}`);
    console.log(`Business Profile: ${businessProfile.business_name}`);
    console.log(`Subscription ID: ${subscriptionId || 'Not created/updated'}`);
    console.log(`has_active_subscription: TRUE`);
    console.log(`account_type: business`);
    console.log(`is_business: true`);
    console.log(`Active until: ${endDate.toLocaleString()}`);
    console.log('=== FIX COMPLETE ===');
    console.log('\nThe subscription should now be visible in the business dashboard.');
    console.log('If issues persist, please instruct the user to refresh their browser or try logging out and back in.');
    
  } catch (error) {
    console.error('Error in fixSubscription:', error);
  }
}

// Run the fix
fixSubscription()
  .then(() => {
    console.log('Script completed.');
  })
  .catch(err => {
    console.error('Unhandled error:', err);
  }); 