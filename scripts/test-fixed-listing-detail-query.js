require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testFixedListingDetailQuery() {
  console.log('🔍 Testing fixed listing detail query...\n');

  try {
    // Get the first business listing ID
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('id, title')
      .limit(1);

    if (listingsError || !listings || listings.length === 0) {
      console.error('❌ Error getting listings:', listingsError);
      return;
    }

    const testListingId = listings[0].id;
    console.log(`Testing with listing ID: ${testListingId} (${listings[0].title})\n`);

    // Test the fixed query
    const { data: detailListing, error: detailError } = await supabase
      .from('business_listings')
      .select(`
        *,
        business_profiles (
          business_name,
          phone,
          website,
          instagram_handle,
          facebook_url,
          address,
          city,
          subscription_status,
          user_id,
          id
        )
      `)
      .eq('id', testListingId)
      .eq('status', 'active')
      .single();

    if (detailError) {
      console.error('❌ Query still failing:', detailError);
    } else {
      console.log('✅ Query successful! Listing details:');
      console.log(`   - Title: "${detailListing.title}"`);
      console.log(`   - Status: ${detailListing.status}`);
      console.log(`   - Business: ${detailListing.business_profiles?.business_name || 'No business profile'}`);
      console.log(`   - Phone: ${detailListing.business_profiles?.phone || 'Not provided'}`);
      console.log(`   - Website: ${detailListing.business_profiles?.website || 'Not provided'}`);
      console.log(`   - Instagram: ${detailListing.business_profiles?.instagram_handle || 'Not provided'}`);
      console.log(`   - Facebook: ${detailListing.business_profiles?.facebook_url || 'Not provided'}`);
      console.log(`   - Address: ${detailListing.business_profiles?.address || 'Not provided'}`);
      console.log(`   - City: ${detailListing.business_profiles?.city || 'Not provided'}`);
      console.log(`   - Subscription Status: ${detailListing.business_profiles?.subscription_status || 'No status'}`);

      console.log('\n✅ The listing detail page should now work properly!');
      console.log(`   Test URL: http://localhost:3000/listings/${testListingId}`);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testFixedListingDetailQuery();