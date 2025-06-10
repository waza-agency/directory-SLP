require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testListingDetailQuery() {
  console.log('🔍 Testing listing detail queries...\n');

  try {
    // First, get all business listing IDs
    console.log('1. Getting all business listing IDs:');
    const { data: allListings, error: allListingsError } = await supabase
      .from('business_listings')
      .select('id, title, status')
      .order('created_at', { ascending: false });

    if (allListingsError) {
      console.error('❌ Error fetching all listings:', allListingsError);
      return;
    }

    console.log(`✅ Found ${allListings?.length || 0} total business listings:`);
    allListings?.forEach(listing => {
      console.log(`   - ID: ${listing.id}, Title: "${listing.title}", Status: ${listing.status}`);
    });
    console.log('');

    if (!allListings || allListings.length === 0) {
      console.log('❌ No listings found to test detail page');
      return;
    }

    // Test the detail query for the first listing
    const testListingId = allListings[0].id;
    console.log(`2. Testing detail query for listing ID: ${testListingId}`);

    const { data: detailListing, error: detailError } = await supabase
      .from('business_listings')
      .select(`
        *,
        business_profiles (
          business_name,
          phone,
          website,
          instagram,
          facebook,
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
      console.error('❌ Error fetching listing detail:', detailError);

      // Try without the status filter
      console.log('\n3. Trying without status filter:');
      const { data: detailListing2, error: detailError2 } = await supabase
        .from('business_listings')
        .select(`
          *,
          business_profiles (
            business_name,
            phone,
            website,
            instagram,
            facebook,
            address,
            city,
            subscription_status,
            user_id,
            id
          )
        `)
        .eq('id', testListingId)
        .single();

      if (detailError2) {
        console.error('❌ Error even without status filter:', detailError2);
      } else {
        console.log('✅ Listing found without status filter:');
        console.log(`   - Title: "${detailListing2.title}"`);
        console.log(`   - Status: ${detailListing2.status}`);
        console.log(`   - Business: ${detailListing2.business_profiles?.business_name || 'No business profile'}`);
        console.log(`   - Subscription Status: ${detailListing2.business_profiles?.subscription_status || 'No subscription status'}`);
      }
    } else {
      console.log('✅ Listing detail found successfully:');
      console.log(`   - Title: "${detailListing.title}"`);
      console.log(`   - Status: ${detailListing.status}`);
      console.log(`   - Business: ${detailListing.business_profiles?.business_name || 'No business profile'}`);
      console.log(`   - Subscription Status: ${detailListing.business_profiles?.subscription_status || 'No subscription status'}`);
    }

    // Test URLs
    console.log('\n4. Expected URLs for all listings:');
    allListings?.forEach(listing => {
      console.log(`   - /listings/${listing.id} (${listing.title})`);
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testListingDetailQuery();