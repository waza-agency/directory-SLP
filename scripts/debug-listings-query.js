const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debugListingsQuery() {
  console.log('🔍 Debugging listings query...');

  try {
    // First, let's see all business listings regardless of constraints
    console.log('\n📋 Step 1: All business listings');
    const { data: allListings, error: allError } = await supabase
      .from('business_listings')
      .select('id, title, status, business_id, created_at')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Error fetching all listings:', allError);
      return;
    }

    console.log(`Found ${allListings.length} total business listings:`);
    allListings.forEach(listing => {
      console.log(`  - ${listing.title} (Status: ${listing.status}, Business: ${listing.business_id})`);
    });

    // Check active listings only
    console.log('\n📋 Step 2: Active business listings');
    const { data: activeListings, error: activeError } = await supabase
      .from('business_listings')
      .select('id, title, status, business_id')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (activeError) {
      console.error('❌ Error fetching active listings:', activeError);
    } else {
      console.log(`Found ${activeListings.length} active business listings:`);
      activeListings.forEach(listing => {
        console.log(`  - ${listing.title} (Business: ${listing.business_id})`);
      });
    }

    // Check business profiles for these listings
    console.log('\n🏢 Step 3: Business profiles with active subscriptions');
    const { data: activeProfiles, error: profilesError } = await supabase
      .from('business_profiles')
      .select('id, business_name, user_id, subscription_status')
      .eq('subscription_status', 'active');

    if (profilesError) {
      console.error('❌ Error fetching business profiles:', profilesError);
    } else {
      console.log(`Found ${activeProfiles.length} business profiles with active subscriptions:`);
      activeProfiles.forEach(profile => {
        console.log(`  - ${profile.business_name} (ID: ${profile.id}, User: ${profile.user_id})`);
      });
    }

    // Check users with active subscriptions
    console.log('\n👥 Step 4: Users with active subscriptions');
    const { data: activeUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, has_active_subscription, is_business')
      .eq('has_active_subscription', true);

    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
    } else {
      console.log(`Found ${activeUsers.length} users with active subscriptions:`);
      activeUsers.forEach(user => {
        console.log(`  - ${user.email} (ID: ${user.id}, Business: ${user.is_business})`);
      });
    }

    // Now test the exact query from the listings page
    console.log('\n🧪 Step 5: Testing the exact listings page query');
    const { data: pageListings, error: pageError } = await supabase
      .from('business_listings')
      .select(`
        id,
        title,
        description,
        category,
        price,
        images,
        address,
        city,
        phone,
        website,
        email,
        created_at,
        business_profiles!inner (
          id,
          business_name,
          business_category,
          users!inner (
            id,
            email,
            has_active_subscription,
            subscriptions (
              id,
              status,
              current_period_end
            )
          )
        )
      `)
      .eq('status', 'active')
      .eq('business_profiles.users.has_active_subscription', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (pageError) {
      console.error('❌ Listings page query error:', pageError);
    } else {
      console.log(`✅ Listings page query returned ${pageListings.length} results:`);
      pageListings.forEach(listing => {
        console.log(`  - ${listing.title} by ${listing.business_profiles.business_name}`);
      });
    }

    // Try a simpler query to see if the issue is with the complex joins
    console.log('\n🔧 Step 6: Simplified query without complex joins');
    const { data: simpleListings, error: simpleError } = await supabase
      .from('business_listings')
      .select(`
        id,
        title,
        description,
        category,
        business_id,
        status,
        created_at,
        business_profiles (
          id,
          business_name,
          user_id,
          subscription_status
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (simpleError) {
      console.error('❌ Simple query error:', simpleError);
    } else {
      console.log(`✅ Simple query returned ${simpleListings.length} results:`);
      simpleListings.forEach(listing => {
        console.log(`  - ${listing.title} (Profile: ${listing.business_profiles?.business_name || 'No profile'}, Subscription: ${listing.business_profiles?.subscription_status || 'Unknown'})`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugListingsQuery().catch(console.error);