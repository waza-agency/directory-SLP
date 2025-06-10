const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function debugDeletionIssue() {
  console.log('🔍 Debugging listing deletion issue...\n');

  try {
    // 1. Check current user authentication
    console.log('1. Checking authentication...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('❌ Auth Error:', authError);
      return;
    }

    if (!user) {
      console.log('❌ No authenticated user found');
      return;
    }

    console.log('✅ User authenticated:', user.id);
    console.log('   Email:', user.email);

    // 2. Check business profile
    console.log('\n2. Checking business profile...');
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('❌ Business Profile Error:', profileError);
      return;
    }

    if (!businessProfile) {
      console.log('❌ No business profile found');
      return;
    }

    console.log('✅ Business profile found:', businessProfile.id);
    console.log('   Business name:', businessProfile.business_name);
    console.log('   Subscription status:', businessProfile.subscription_status);

    // 3. Check subscription
    console.log('\n3. Checking subscription...');
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();

    if (subError) {
      console.error('❌ Subscription Error:', subError);
    } else if (subscription) {
      console.log('✅ Active subscription found:', subscription.id);
      console.log('   Plan:', subscription.subscription_plans?.name);
      console.log('   Status:', subscription.status);
    } else {
      console.log('⚠️  No active subscription found');
    }

    // 4. Get business listings
    console.log('\n4. Checking business listings...');
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('*')
      .eq('business_id', businessProfile.id)
      .order('created_at', { ascending: false });

    if (listingsError) {
      console.error('❌ Listings Error:', listingsError);
      return;
    }

    console.log(`✅ Found ${listings.length} listings`);
    listings.forEach((listing, index) => {
      console.log(`   ${index + 1}. ${listing.title} (ID: ${listing.id}) - Status: ${listing.status}`);
    });

    if (listings.length === 0) {
      console.log('⚠️  No listings to test deletion');
      return;
    }

    // 5. Test RLS policy for deletion (without actually deleting)
    console.log('\n5. Testing RLS policy for deletion...');
    const testListingId = listings[0].id;
    console.log(`Testing with listing ID: ${testListingId}`);

    // Test if we can select the listing (should work)
    const { data: canRead, error: readError } = await supabase
      .from('business_listings')
      .select('id, title')
      .eq('id', testListingId)
      .single();

    if (readError) {
      console.error('❌ Cannot read listing:', readError);
    } else {
      console.log('✅ Can read listing:', canRead.title);
    }

    // Test if we can update the listing (should work if RLS is correct)
    const { data: canUpdate, error: updateError } = await supabase
      .from('business_listings')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', testListingId)
      .select('id');

    if (updateError) {
      console.error('❌ Cannot update listing (RLS policy issue):', updateError);
      console.log('   This indicates the DELETE operation will also fail');

      // Let's check the RLS policy more specifically
      console.log('\n6. Analyzing RLS policy...');

      // Check if the business_profiles relationship exists
      const { data: rlsCheck, error: rlsError } = await supabase
        .from('business_listings')
        .select(`
          id,
          business_id,
          business_profiles!inner (
            id,
            user_id
          )
        `)
        .eq('id', testListingId)
        .eq('business_profiles.user_id', user.id);

      if (rlsError) {
        console.error('❌ RLS check failed:', rlsError);
      } else if (rlsCheck.length === 0) {
        console.error('❌ RLS policy failed: business_listings.business_id does not match business_profiles.id for current user');
        console.log('   Expected user_id:', user.id);
        console.log('   Business_id in listing:', listings[0].business_id);
        console.log('   Business profile ID:', businessProfile.id);
      } else {
        console.log('✅ RLS policy should work, checking other issues...');
      }
    } else {
      console.log('✅ Can update listing, RLS policy is working');
    }

    // 6. Test the actual API endpoint
    console.log('\n7. Testing deletion API endpoint...');
    console.log('Note: This is where the actual issue might be in the API logic');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run if called directly
if (require.main === module) {
  debugDeletionIssue()
    .then(() => console.log('\n🔍 Debug complete'))
    .catch(error => console.error('❌ Debug failed:', error));
}

module.exports = { debugDeletionIssue };