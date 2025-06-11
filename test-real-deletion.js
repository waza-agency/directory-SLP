const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configurar clientes de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function testRealDeletion() {
  console.log('🔍 Testing REAL deletion process...\n');

  try {
    // 1. Buscar el listing de prueba
    const testListingId = 'c4b81fbe-49e4-47b3-b4c0-9138f0f79c2c';

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

    // 2. Verificar business profile
    console.log('2. Checking business profile...');
    const { data: businessProfile, error: profileError } = await supabaseAdmin
      .from('business_profiles')
      .select('*')
      .eq('id', listing.business_id)
      .single();

    if (profileError) {
      console.error('❌ Error fetching business profile:', profileError);
      return;
    }

    console.log('✅ Found business profile:', {
      id: businessProfile.id,
      business_name: businessProfile.business_name,
      user_id: businessProfile.user_id,
      subscription_status: businessProfile.subscription_status,
      active_listings_count: businessProfile.active_listings_count
    });
    console.log('');

    // 3. Verificar foreign key constraints antes de eliminar
    console.log('3. Checking and cleaning foreign key constraints...');

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

    // Check for transactions
    const { data: transactions, error: transactionCheckError } = await supabaseAdmin
      .from('marketplace_transactions')
      .select('id, status')
      .eq('listing_id', testListingId);

    if (transactionCheckError) {
      console.warn('⚠️  Error checking transactions:', transactionCheckError);
    } else if (transactions && transactions.length > 0) {
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
      console.log('✅ No transactions found');
    }
    console.log('');

    // 4. INTENTAR ELIMINACIÓN REAL
    console.log('4. Attempting REAL deletion...');
    console.log('   ⚠️  WARNING: This will actually delete the listing!');

    const { error: deleteError } = await supabaseAdmin
      .from('business_listings')
      .delete()
      .eq('id', testListingId);

    if (deleteError) {
      console.error('❌ DELETION FAILED!');
      console.error('Error details:', {
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint
      });
      return;
    }

    console.log('✅ DELETION SUCCESSFUL!');
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

    // 6. Actualizar contador si era necesario
    if (listing.status === 'active') {
      console.log('6. Updating business profile counter...');
      const { error: counterError } = await supabaseAdmin
        .from('business_profiles')
        .update({
          active_listings_count: Math.max(0, businessProfile.active_listings_count - 1)
        })
        .eq('id', businessProfile.id);

      if (counterError) {
        console.error('⚠️  Error updating counter:', counterError);
      } else {
        console.log('✅ Counter updated successfully');
      }
    }

    console.log('\n🎉 Test completed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Ejecutar el test
testRealDeletion().then(() => {
  console.log('\n🏁 Real deletion test completed');
  process.exit(0);
}).catch(error => {
  console.error('💥 Real deletion test failed:', error);
  process.exit(1);
});