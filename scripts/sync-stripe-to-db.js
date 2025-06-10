const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncStripeSubscriptionsToDatabase() {
  console.log('🔄 Starting Stripe to Database sync...');

  try {
    // Step 1: Get all subscriptions from Stripe
    console.log('📡 Fetching subscriptions from Stripe...');
    const stripeSubscriptions = await stripe.subscriptions.list({
      limit: 100,
      status: 'all'
    });

    console.log(`Found ${stripeSubscriptions.data.length} subscriptions in Stripe`);

    if (stripeSubscriptions.data.length === 0) {
      console.log('❌ No subscriptions found in Stripe');
      return;
    }

    // Step 2: Get default subscription plan from database
    const { data: defaultPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .single();

    if (planError || !defaultPlan) {
      console.error('❌ Error fetching default subscription plan:', planError);
      return;
    }

    console.log(`✅ Using default plan: ${defaultPlan.name} (ID: ${defaultPlan.id})`);

    let syncStats = {
      total: stripeSubscriptions.data.length,
      synced: 0,
      errors: 0,
      skipped: 0
    };

    // Step 3: Process each Stripe subscription
    for (const stripeSubscription of stripeSubscriptions.data) {
      try {
        console.log(`\n🔍 Processing subscription: ${stripeSubscription.id}`);

        // Find user by Stripe customer ID
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email')
          .eq('stripe_customer_id', stripeSubscription.customer)
          .single();

        if (userError || !userData) {
          console.log(`⚠️  No user found for customer ${stripeSubscription.customer}, skipping...`);
          syncStats.skipped++;
          continue;
        }

        console.log(`👤 Found user: ${userData.email} (${userData.id})`);

        // Check if subscription already exists in database
        const { data: existingSubscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', stripeSubscription.id)
          .single();

        if (existingSubscription) {
          console.log(`✅ Subscription already exists in database, skipping...`);
          syncStats.skipped++;
          continue;
        }

        // Map Stripe status to our internal status
        const mappedStatus = ['active', 'trialing'].includes(stripeSubscription.status)
          ? 'active'
          : stripeSubscription.status;

        // Create subscription record
        const subscriptionData = {
          user_id: userData.id,
          plan_id: defaultPlan.id,
          status: mappedStatus,
          current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end || false,
          stripe_subscription_id: stripeSubscription.id,
          stripe_customer_id: stripeSubscription.customer,
          interval: stripeSubscription.items.data[0]?.price?.recurring?.interval || 'monthly',
          created_at: new Date(stripeSubscription.created * 1000).toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: newSubscription, error: insertError } = await supabase
          .from('subscriptions')
          .insert(subscriptionData)
          .select()
          .single();

        if (insertError) {
          console.error(`❌ Error creating subscription:`, insertError);
          syncStats.errors++;
          continue;
        }

        console.log(`✅ Created subscription record: ${newSubscription.id}`);

        // Step 4: Update or create business profile
        const { data: existingProfile, error: profileError } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', userData.id)
          .single();

        if (existingProfile) {
          // Update existing business profile
          const { error: updateError } = await supabase
            .from('business_profiles')
            .update({
              subscription_status: mappedStatus,
              subscription_id: stripeSubscription.id,
              subscription_start_date: subscriptionData.current_period_start,
              subscription_end_date: subscriptionData.current_period_end,
              stripe_customer_id: stripeSubscription.customer,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingProfile.id);

          if (updateError) {
            console.error(`❌ Error updating business profile:`, updateError);
          } else {
            console.log(`✅ Updated business profile: ${existingProfile.id}`);
          }
        } else {
          // Create new business profile
          const { data: newProfile, error: createError } = await supabase
            .from('business_profiles')
            .insert({
              user_id: userData.id,
              business_name: `Business for ${userData.email}`,
              business_description: 'Business profile created from Stripe sync',
              business_category: 'General',
              subscription_status: mappedStatus,
              subscription_id: stripeSubscription.id,
              subscription_start_date: subscriptionData.current_period_start,
              subscription_end_date: subscriptionData.current_period_end,
              stripe_customer_id: stripeSubscription.customer,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (createError) {
            console.error(`❌ Error creating business profile:`, createError);
          } else {
            console.log(`✅ Created business profile: ${newProfile.id}`);
          }
        }

        // Step 5: Update user record
        const { error: userUpdateError } = await supabase
          .from('users')
          .update({
            has_active_subscription: mappedStatus === 'active',
            subscription_id: newSubscription.id,
            is_business: true,
            account_type: mappedStatus === 'active' ? 'business' : 'user',
            updated_at: new Date().toISOString()
          })
          .eq('id', userData.id);

        if (userUpdateError) {
          console.error(`❌ Error updating user:`, userUpdateError);
        } else {
          console.log(`✅ Updated user record`);
        }

        syncStats.synced++;
        console.log(`✅ Successfully synced subscription for ${userData.email}`);

      } catch (error) {
        console.error(`❌ Error processing subscription ${stripeSubscription.id}:`, error);
        syncStats.errors++;
      }
    }

    // Step 6: Print summary
    console.log('\n📊 Sync Summary:');
    console.log(`Total subscriptions processed: ${syncStats.total}`);
    console.log(`Successfully synced: ${syncStats.synced}`);
    console.log(`Skipped (already exist): ${syncStats.skipped}`);
    console.log(`Errors: ${syncStats.errors}`);

    if (syncStats.synced > 0) {
      console.log('\n🎉 Sync completed successfully!');
      console.log('The listings page should now show listings from subscribed users.');
    }

  } catch (error) {
    console.error('❌ Fatal error during sync:', error);
  }
}

// Run the sync
if (require.main === module) {
  syncStripeSubscriptionsToDatabase()
    .then(() => {
      console.log('\n✅ Script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { syncStripeSubscriptionsToDatabase };