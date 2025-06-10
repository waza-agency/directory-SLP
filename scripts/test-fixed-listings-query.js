const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testFixedListingsQuery() {
  console.log('🧪 Testing the fixed listings query...');

  try {
    // Test the new simplified query
    const { data: listings, error } = await supabase
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
          user_id,
          subscription_status
        )
      `)
      .eq('status', 'active')
      .eq('business_profiles.subscription_status', 'active')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('❌ Query error:', error);
      return;
    }

    console.log(`✅ Query successful! Found ${listings.length} listings:`);

    listings.forEach(listing => {
      console.log(`  📄 ${listing.title}`);
      console.log(`     Business: ${listing.business_profiles.business_name}`);
      console.log(`     Category: ${listing.category}`);
      console.log(`     User ID: ${listing.business_profiles.user_id}`);
      console.log(`     Subscription: ${listing.business_profiles.subscription_status}`);
      console.log('');
    });

    // Test the data transformation
    console.log('🔄 Testing data transformation...');

    const transformedListings = listings.map(listing => ({
      ...listing,
      business_profiles: {
        ...listing.business_profiles,
        users: {
          id: listing.business_profiles.user_id,
          email: '',
          subscriptions: [
            {
              id: 'active',
              status: 'active',
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      }
    }));

    console.log(`✅ Transformation successful! ${transformedListings.length} listings ready for display:`);

    transformedListings.forEach(listing => {
      console.log(`  📄 ${listing.title} by ${listing.business_profiles.business_name}`);
      console.log(`     Has active subscription: ${listing.business_profiles.users.subscriptions.some(
        sub => sub.status === 'active'
      )}`);
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testFixedListingsQuery().catch(console.error);