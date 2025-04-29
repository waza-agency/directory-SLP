#!/usr/bin/env node

/**
 * This script syncs subscription statuses between Stripe and Supabase.
 * It can be run manually or scheduled as a cron job to ensure the database stays in sync with Stripe.
 * 
 * Usage:
 *   node scripts/sync-stripe-subscriptions.js
 * 
 * Environment variables:
 *   STRIPE_SECRET_KEY - Stripe API key
 *   NEXT_PUBLIC_SUPABASE_URL - Supabase URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (requires admin privileges)
 *   ADMIN_PASSWORD - Optional override for the admin password (defaults to 'directoryslp2024')
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');

// Default admin password - matches the one in admin-auth.ts
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'directoryslp2024';

// Check for required environment variables
const requiredEnvVars = [
  'STRIPE_SECRET_KEY', 
  'NEXT_PUBLIC_SUPABASE_URL', 
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Track statistics
const stats = {
  total: 0,
  updated: 0,
  errors: 0,
  skipped: 0,
  alreadyCorrect: 0
};

async function syncSubscriptions() {
  try {
    console.log('Starting subscription sync...');
    
    // Get all subscriptions from Supabase
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        stripe_subscription_id,
        business_profiles!inner (
          id,
          subscription_status
        )
      `);

    if (subError) {
      console.error('Error fetching subscriptions from Supabase:', subError);
      return;
    }

    console.log(`Found ${subscriptions.length} subscriptions to check.`);
    stats.total = subscriptions.length;

    // Process each subscription
    for (const sub of subscriptions) {
      try {
        // Skip subscriptions without a Stripe ID
        if (!sub.stripe_subscription_id) {
          console.log(`Skipping subscription ${sub.id} (no Stripe ID)`);
          stats.skipped++;
          continue;
        }

        console.log(`Checking subscription ${sub.id} (Stripe ID: ${sub.stripe_subscription_id})`);

        // Get current status from Stripe
        const stripeSubscription = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);
        const stripeStatus = stripeSubscription.status;
        
        // Convert Stripe status to our internal status format
        const mappedStatus = stripeStatus === 'active' || stripeStatus === 'trialing' 
          ? 'active'
          : stripeStatus === 'canceled' || stripeStatus === 'unpaid'
            ? 'canceled'
            : 'inactive';
        
        console.log(`  Stripe status: ${stripeStatus} → Mapped to: ${mappedStatus}`);
        console.log(`  Current DB status: ${sub.business_profiles.subscription_status}`);
        
        // If status matches, no update needed
        if (sub.business_profiles.subscription_status === mappedStatus) {
          console.log(`  Status already correct, no update needed.`);
          stats.alreadyCorrect++;
          continue;
        }
        
        console.log(`  Updating status from ${sub.business_profiles.subscription_status} to ${mappedStatus}`);
        
        // Update business profile subscription status
        const { error: updateError } = await supabase
          .from('business_profiles')
          .update({ 
            subscription_status: mappedStatus,
            ...(mappedStatus === 'active' && {
              subscription_start_date: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
              subscription_end_date: new Date(stripeSubscription.current_period_end * 1000).toISOString()
            })
          })
          .eq('id', sub.business_profiles.id);
          
        if (updateError) {
          console.error(`  Error updating business profile ${sub.business_profiles.id}:`, updateError);
          stats.errors++;
          continue;
        }
        
        // Update user account status
        const { error: userUpdateError } = await supabase
          .from('users')
          .update({ 
            has_active_subscription: mappedStatus === 'active',
            account_type: mappedStatus === 'active' ? 'business' : 'user'
          })
          .eq('id', sub.user_id);
          
        if (userUpdateError) {
          console.error(`  Error updating user status for ${sub.user_id}:`, userUpdateError);
          stats.errors++;
          continue;
        }
        
        console.log(`  Status updated successfully.`);
        stats.updated++;
      } catch (error) {
        console.error(`Error processing subscription ${sub.id}:`, error.message);
        stats.errors++;
      }
    }
    
    // Print summary
    console.log('\nSync completed!');
    console.log('Summary:');
    console.log(`  Total subscriptions: ${stats.total}`);
    console.log(`  Updated: ${stats.updated}`);
    console.log(`  Already correct: ${stats.alreadyCorrect}`);
    console.log(`  Skipped: ${stats.skipped}`);
    console.log(`  Errors: ${stats.errors}`);
    
  } catch (error) {
    console.error('Error syncing subscriptions:', error);
  }
}

// Run the sync
console.log(`Admin password for this script: ${ADMIN_PASSWORD}`);
console.log('Note: You can change this password in src/lib/admin-auth.ts or by setting ADMIN_PASSWORD env var');
console.log('---------------------------------------------------------------');

syncSubscriptions()
  .then(() => {
    console.log('Script completed.');
  })
  .catch(err => {
    console.error('Unhandled error:', err);
  }); 