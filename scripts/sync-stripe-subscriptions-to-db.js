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

async function syncStripeSubscriptionsToDatabase() {
  console.log('🔄 Starting Stripe to Database subscription sync...');

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

    // Step 2: Get the default subscription plan from database
    console.log('📋 Getting subscription plan from database...');
    let { data: subscriptionPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .single();

    if (planError || !subscriptionPlan) {
      console.error('❌ Error getting subscription plan:', planError);
      console.log('🔧 Creating default subscription plan...');

      // Create default plan if it doesn't exist
      const { data: newPlan, error: createPlanError } = await supabase
        .from('subscription_plans')
        .insert({
          name: 'Business Profile',
          description: 'Create your business profile and list up to 10 services or products',
          price_monthly: 250.00,
          price_yearly: 2500.00,
          max_listings: 10,
          features: {
            custom_profile: true,
            analytics_dashboard: true,
            priority_support: false
          },
          is_active: true
        })
        .select()
        .single();

      if (createPlanError) {
        console.error('❌ Error creating subscription plan:', createPlanError);
        return;
      }

      console.log('✅ Created default subscription plan');
      subscriptionPlan = newPlan;
    }

    console.log(`✅ Using subscription plan: ${subscriptionPlan.name} (ID: ${subscriptionPlan.id})`);

    // Step 3: Process each Stripe subscription
    let syncedCount = 0;
    let errorCount = 0;

    for (const stripeSubscription of stripeSubscriptions.data) {
      try {
        console.log(`\n🔍 Processing subscription: ${stripeSubscription.id}`);

        // Get customer details
        const customer = await stripe.customers.retrieve(stripeSubscription.customer);
        console.log(`👤 Customer: ${customer.email}`);

        // Step 4: Find user by email
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, stripe_customer_id')
          .eq('email', customer.email)
          .single();

        if (userError || !userData) {
          console.log(`⚠️  User not found for email: ${customer.email}`);

          // Update user with Stripe customer ID if user exists but doesn't have it
          const { data: userByCustomerId } = await supabase
            .from('users')
            .select('id, email')
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

        // Update user with Stripe customer ID if not set
        if (!userData.stripe_customer_id) {
          await supabase
            .from('users')
            .update({ stripe_customer_id: customer.id })
            .eq('id', userData.id);
          console.log(`✅ Updated user with Stripe customer ID`);
        }

        // Step 5: Check if subscription already exists
        const { data: existingSubscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', stripeSubscription.id)
          .single();

        const subscriptionData = {
          user_id: userData.id,
          plan_id: subscriptionPlan.id,
          status: stripeSubscription.status,
          current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end,
          stripe_subscription_id: stripeSubscription.id,
          stripe_customer_id: customer.id,
          interval: stripeSubscription.items.data[0]?.price?.recurring?.interval || 'monthly',
          updated_at: new Date().toISOString()
        };

        if (existingSubscription) {
          // Update existing subscription
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update(subscriptionData)
            .eq('id', existingSubscription.id);

          if (updateError) {
            console.error(`❌ Error updating subscription:`, updateError);
            errorCount++;
            continue;
          }
          console.log(`✅ Updated existing subscription in database`);
        } else {
          // Create new subscription
          const { data: newSubscription, error: insertError } = await supabase
            .from('subscriptions')
            .insert(subscriptionData)
            .select()
            .single();

          if (insertError) {
            console.error(`❌ Error creating subscription:`, insertError);
            errorCount++;
            continue;
          }
          console.log(`✅ Created new subscription in database`);
        }

        // Step 6: Update or create business profile (skip subscription_status for now)
        const { data: existingProfile } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', userData.id)
          .single();

        const profileData = {
          subscription_id: stripeSubscription.id,
          subscription_start_date: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
          subscription_end_date: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          stripe_customer_id: customer.id,
          updated_at: new Date().toISOString()
        };

        if (existingProfile) {
          // Update existing business profile
          const { error: updateProfileError } = await supabase
            .from('business_profiles')
            .update(profileData)
            .eq('id', existingProfile.id);

          if (updateProfileError) {
            console.error(`❌ Error updating business profile:`, updateProfileError);
          } else {
            console.log(`✅ Updated business profile`);
          }
        } else {
          // Create new business profile
          const { error: createProfileError } = await supabase
            .from('business_profiles')
            .insert({
              user_id: userData.id,
              business_name: customer.name || customer.email.split('@')[0],
              business_description: 'Business profile created from subscription sync',
              business_category: 'General',
              ...profileData
            });

          if (createProfileError) {
            console.error(`❌ Error creating business profile:`, createProfileError);
          } else {
            console.log(`✅ Created new business profile`);
          }
        }

        // Step 7: Update user flags
        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            has_active_subscription: true,
            is_business: true,
            account_type: 'business'
          })
          .eq('id', userData.id);

        if (updateUserError) {
          console.error(`❌ Error updating user flags:`, updateUserError);
        } else {
          console.log(`✅ Updated user subscription flags`);
        }

        syncedCount++;
        console.log(`✅ Successfully synced subscription for ${customer.email}`);

      } catch (error) {
        console.error(`❌ Error processing subscription ${stripeSubscription.id}:`, error);
        errorCount++;
      }
    }

    // Step 8: Summary
    console.log(`\n📊 Sync Summary:`);
    console.log(`✅ Successfully synced: ${syncedCount} subscriptions`);
    console.log(`❌ Errors: ${errorCount} subscriptions`);
    console.log(`📋 Total processed: ${stripeSubscriptions.data.length} subscriptions`);

    if (syncedCount > 0) {
      console.log(`\n🎉 Subscription sync completed successfully!`);
      console.log(`💡 Your listings page should now show content from subscribed users.`);
      console.log(`⚠️  Note: subscription_status field was skipped due to type constraints.`);
      console.log(`   You may need to manually update this field in the database.`);
    }

  } catch (error) {
    console.error('❌ Fatal error during sync:', error);
  }
}

// Run the sync
if (require.main === module) {
  syncStripeSubscriptionsToDatabase()
    .then(() => {
      console.log('\n🏁 Sync process finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sync process failed:', error);
      process.exit(1);
    });
}

module.exports = { syncStripeSubscriptionsToDatabase };