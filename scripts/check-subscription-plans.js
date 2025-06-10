const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSubscriptionPlans() {
  console.log('📋 Checking subscription plans...');

  const { data: plans, error } = await supabase
    .from('subscription_plans')
    .select('*');

  if (error) {
    console.error('❌ Error fetching plans:', error);
    return;
  }

  console.log('📊 Subscription Plans:');
  plans.forEach(plan => {
    console.log(`  - ID: ${plan.id}`);
    console.log(`    Name: ${plan.name}`);
    console.log(`    Max Listings: ${plan.max_listings}`);
    console.log(`    Active: ${plan.is_active}`);
    console.log('');
  });

  // Also check users subscription status
  console.log('👥 Checking users with active subscriptions...');
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, email, has_active_subscription, is_business')
    .eq('has_active_subscription', true);

  if (usersError) {
    console.error('❌ Error fetching users:', usersError);
    return;
  }

  console.log('👥 Active subscription users:', users);

  // Check business profiles with subscription status
  console.log('🏢 Checking business profiles...');
  const { data: profiles, error: profilesError } = await supabase
    .from('business_profiles')
    .select('*')
    .in('user_id', users.map(u => u.id));

  if (profilesError) {
    console.error('❌ Error fetching profiles:', profilesError);
    return;
  }

  console.log('🏢 Business profiles with active subscriptions:', profiles.length);
  profiles.forEach(profile => {
    console.log(`  - ${profile.business_name} (User: ${profile.user_id})`);
    console.log(`    Plan ID: ${profile.plan_id}`);
    console.log(`    Subscription Status: ${profile.subscription_status}`);
    console.log(`    Active Listings Count: ${profile.active_listings_count}`);
  });

  // Check actual listings count for each business
  console.log('📝 Checking actual listings for each business...');
  for (const profile of profiles) {
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('id, title, status')
      .eq('business_id', profile.id);

    if (listingsError) {
      console.error(`❌ Error fetching listings for ${profile.business_name}:`, listingsError);
      continue;
    }

    console.log(`📝 ${profile.business_name}: ${listings.length} listings`);
    listings.forEach(listing => {
      console.log(`    - ${listing.title} (${listing.status})`);
    });
  }
}

checkSubscriptionPlans().catch(console.error);