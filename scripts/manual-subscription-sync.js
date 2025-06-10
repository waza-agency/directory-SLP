// Load environment variables
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function manualSubscriptionSync() {
  console.log('🔄 Starting manual subscription sync for users table...');

  try {
    // Step 1: Get all active subscriptions from Stripe
    console.log('📡 Fetching active subscriptions from Stripe...');
    const stripeSubscriptions = await stripe.subscriptions.list({
      status: 'active',
      limit: 100
    });

    console.log(`✅ Found ${stripeSubscriptions.data.length} active subscriptions in Stripe`);

    if (stripeSubscriptions.data.length === 0) {
      console.log('❌ No active subscriptions found in Stripe');
      return;
    }

    // Step 2: Process each Stripe subscription
    let syncedCount = 0;
    let errorCount = 0;

    for (const stripeSubscription of stripeSubscriptions.data) {
      try {
        console.log(`\n🔍 Processing subscription: ${stripeSubscription.id}`);

        // Get customer details
        const customer = await stripe.customers.retrieve(stripeSubscription.customer);
        console.log(`👤 Customer: ${customer.email}`);

        // Step 3: Find user by email
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, stripe_customer_id, has_active_subscription')
          .eq('email', customer.email)
          .single();

        if (userError || !userData) {
          console.log(`⚠️  User not found for email: ${customer.email}`);

          // Try to find by Stripe customer ID
          const { data: userByCustomerId } = await supabase
            .from('users')
            .select('id, email, has_active_subscription')
            .eq('stripe_customer_id', customer.id)
            .single();

          if (userByCustomerId) {
            console.log(`✅ Found user by Stripe customer ID: ${userByCustomerId.email}`);
            userData = userByCustomerId;
          } else {
            errorCount++;
            continue;
          }
        }

        console.log(`📋 Current user subscription status: ${userData.has_active_subscription}`);

        // Step 4: Update user flags
        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            has_active_subscription: true,
            is_business: true,
            account_type: 'business',
            stripe_customer_id: customer.id
          })
          .eq('id', userData.id);

        if (updateUserError) {
          console.error(`❌ Error updating user flags:`, updateUserError);
          errorCount++;
          continue;
        } else {
          console.log(`✅ Updated user subscription flags`);
        }

        // Step 5: Check if business profile exists, create if not
        const { data: existingProfile } = await supabase
          .from('business_profiles')
          .select('id, business_name')
          .eq('user_id', userData.id)
          .single();

        if (!existingProfile) {
          console.log(`🏢 Creating business profile...`);
          const { error: createProfileError } = await supabase
            .from('business_profiles')
            .insert({
              user_id: userData.id,
              business_name: customer.name || customer.email.split('@')[0],
              business_description: 'Business profile created from subscription sync',
              business_category: 'General'
            });

          if (createProfileError) {
            console.error(`❌ Error creating business profile:`, createProfileError);
          } else {
            console.log(`✅ Created new business profile`);
          }
        } else {
          console.log(`✅ Business profile exists: ${existingProfile.business_name}`);
        }

        syncedCount++;
        console.log(`✅ Successfully synced user for ${customer.email}`);

      } catch (error) {
        console.error(`❌ Error processing subscription ${stripeSubscription.id}:`, error);
        errorCount++;
      }
    }

    // Step 6: Summary
    console.log(`\n📊 Sync Summary:`);
    console.log(`✅ Successfully synced: ${syncedCount} users`);
    console.log(`❌ Errors: ${errorCount} users`);
    console.log(`📋 Total processed: ${stripeSubscriptions.data.length} subscriptions`);

    if (syncedCount > 0) {
      console.log(`\n🎉 Manual subscription sync completed successfully!`);
      console.log(`💡 Your listings page should now show content from subscribed users.`);
      console.log(`ℹ️  Users have been marked as having active subscriptions.`);
    }

  } catch (error) {
    console.error('❌ Fatal error during sync:', error);
  }
}

// Run the sync
if (require.main === module) {
  manualSubscriptionSync()
    .then(() => {
      console.log('\n🏁 Manual sync process finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Manual sync process failed:', error);
      process.exit(1);
    });
}

module.exports = { manualSubscriptionSync };