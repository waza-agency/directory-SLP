const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTestListing() {
  console.log('Creating test listing...');

  try {
    // Usar el business_id que encontramos antes
    const businessId = '670abe0f-af8e-4f96-88d9-6db1b27774e7';

    const { data: listing, error } = await supabaseAdmin
      .from('business_listings')
      .insert({
        business_id: businessId,
        title: 'Test Listing for Deletion',
        description: 'This is a test listing that will be deleted',
        price: 100,
        category: 'test',
        status: 'active',
        type: 'product'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating test listing:', error);
      return;
    }

    console.log('✅ Test listing created:', {
      id: listing.id,
      title: listing.title,
      business_id: listing.business_id
    });

    // También crear algunos order_items para probar la eliminación
    const { error: orderItemError } = await supabaseAdmin
      .from('order_items')
      .insert({
        listing_id: listing.id,
        quantity: 2,
        price: 100
      });

    if (orderItemError) {
      console.warn('Could not create order item (table might not exist):', orderItemError);
    } else {
      console.log('✅ Test order item created');
    }

    return listing.id;

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestListing().then((listingId) => {
  if (listingId) {
    console.log(`\n🎯 Test listing ID: ${listingId}`);
    console.log('You can now test deletion with this ID');
  }
  process.exit(0);
}).catch(error => {
  console.error('Failed to create test listing:', error);
  process.exit(1);
});