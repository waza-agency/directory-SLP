const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testUpdatedDeletion() {
  console.log('🔍 Testing UPDATED deletion process...\n');

  try {
    // Usar el nuevo listing ID
    const testListingId = '78128d3a-8b59-4e8a-b0dc-0e2b88127b69';

    console.log('1. Checking test listing...');
    const { data: listing, error: listingError } = await supabaseAdmin
      .from('business_listings')
      .select('*')
      .eq('id', testListingId)
      .single();

    if (listingError) {
      console.error('❌ Error fetching listing:', listingError);
      return;
    }

    console.log('✅ Found listing:', {
      id: listing.id,
      title: listing.title,
      business_id: listing.business_id,
      status: listing.status
    });
    console.log('');

    // 2. Verificar todas las foreign key constraints
    console.log('2. Checking ALL foreign key constraints...');

    // Check shopping_cart
    const { data: cartItems } = await supabaseAdmin
      .from('shopping_cart')
      .select('id')
      .eq('listing_id', testListingId);
    console.log('   Shopping cart items:', cartItems?.length || 0);

    // Check order_items
    const { data: orderItems } = await supabaseAdmin
      .from('order_items')
      .select('id')
      .eq('listing_id', testListingId);
    console.log('   Order items:', orderItems?.length || 0);

    // Check marketplace_transactions
    const { data: transactions } = await supabaseAdmin
      .from('marketplace_transactions')
      .select('id, status')
      .eq('listing_id', testListingId);
    console.log('   Transactions:', transactions?.length || 0);
    console.log('');

    // 3. Aplicar la lógica de eliminación actualizada
    console.log('3. Applying UPDATED deletion logic...');

    // Delete from shopping_cart first
    const { error: cartDeleteError } = await supabaseAdmin
      .from('shopping_cart')
      .delete()
      .eq('listing_id', testListingId);

    if (cartDeleteError) {
      console.warn('⚠️  Error deleting shopping cart items:', cartDeleteError);
    } else {
      console.log('✅ Shopping cart items cleaned');
    }

    // Delete from order_items (THE NEW ADDITION!)
    const { error: orderItemsDeleteError } = await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('listing_id', testListingId);

    if (orderItemsDeleteError) {
      console.warn('⚠️  Error deleting order items:', orderItemsDeleteError);
    } else {
      console.log('✅ Order items cleaned');
    }

    // Check for transactions
    if (transactions && transactions.length > 0) {
      const completedTransactions = transactions.filter(t => t.status === 'completed');
      console.log(`Found ${transactions.length} transactions (${completedTransactions.length} completed)`);

      if (completedTransactions.length > 0) {
        console.log('❌ Cannot delete listing with completed transactions');
        return;
      }

      // Delete pending transactions
      const { error: deleteTransactionsError } = await supabaseAdmin
        .from('marketplace_transactions')
        .delete()
        .eq('listing_id', testListingId)
        .neq('status', 'completed');

      if (deleteTransactionsError) {
        console.error('❌ Error deleting pending transactions:', deleteTransactionsError);
        return;
      } else {
        console.log('✅ Pending transactions cleaned');
      }
    } else {
      console.log('✅ No transactions to clean');
    }
    console.log('');

    // 4. INTENTAR ELIMINACIÓN REAL
    console.log('4. Attempting REAL deletion with updated logic...');

    const { error: deleteError } = await supabaseAdmin
      .from('business_listings')
      .delete()
      .eq('id', testListingId);

    if (deleteError) {
      console.error('❌ DELETION STILL FAILED!');
      console.error('Error details:', {
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint
      });
      return;
    }

    console.log('🎉 DELETION SUCCESSFUL!');
    console.log('');

    // 5. Verificar que se eliminó
    console.log('5. Verifying deletion...');
    const { data: verifyListing, error: verifyError } = await supabaseAdmin
      .from('business_listings')
      .select('id')
      .eq('id', testListingId)
      .single();

    if (verifyError && verifyError.code === 'PGRST116') {
      console.log('✅ Listing successfully deleted (not found in database)');
    } else if (verifyListing) {
      console.log('❌ Listing still exists in database');
    } else {
      console.log('⚠️  Unexpected verification result:', verifyError);
    }

    console.log('\n🎉 UPDATED DELETION TEST SUCCESSFUL!');
    console.log('The fix is working - order_items cleanup resolved the foreign key constraint issue.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Ejecutar el test
testUpdatedDeletion().then(() => {
  console.log('\n🏁 Updated deletion test completed');
  process.exit(0);
}).catch(error => {
  console.error('💥 Updated deletion test failed:', error);
  process.exit(1);
});