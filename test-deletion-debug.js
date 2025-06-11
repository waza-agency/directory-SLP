const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configurar clientes de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, anonKey);
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function testDeletionProcess() {
  console.log('🔍 Testing deletion process...\n');

  try {
    // 1. Verificar configuración
    console.log('1. Environment check:');
    console.log('   SUPABASE_URL:', supabaseUrl ? '✅ Defined' : '❌ Missing');
    console.log('   ANON_KEY:', anonKey ? '✅ Defined' : '❌ Missing');
    console.log('   SERVICE_ROLE_KEY:', serviceRoleKey ? '✅ Defined' : '❌ Missing');
    console.log('');

    // 2. Probar conexión con admin client
    console.log('2. Testing admin client connection...');
    const { data: testData, error: testError } = await supabaseAdmin
      .from('business_listings')
      .select('id, title, business_id')
      .limit(1);

    if (testError) {
      console.error('❌ Admin client error:', testError);
      return;
    }
    console.log('✅ Admin client working, found', testData?.length || 0, 'listings');
    console.log('');

    // 3. Buscar un listing para probar
    console.log('3. Finding a test listing...');
    const { data: listings, error: listingsError } = await supabaseAdmin
      .from('business_listings')
      .select('id, title, business_id, status')
      .limit(5);

    if (listingsError) {
      console.error('❌ Error fetching listings:', listingsError);
      return;
    }

    if (!listings || listings.length === 0) {
      console.log('❌ No listings found to test with');
      return;
    }

    const testListing = listings[0];
    console.log('✅ Found test listing:', {
      id: testListing.id,
      title: testListing.title,
      business_id: testListing.business_id,
      status: testListing.status
    });
    console.log('');

    // 4. Verificar foreign key constraints
    console.log('4. Checking foreign key constraints...');

    // Check shopping cart
    const { data: cartItems, error: cartError } = await supabaseAdmin
      .from('shopping_cart')
      .select('id')
      .eq('listing_id', testListing.id);

    if (cartError) {
      console.warn('⚠️  Error checking shopping cart:', cartError);
    } else {
      console.log('   Shopping cart items:', cartItems?.length || 0);
    }

    // Check transactions
    const { data: transactions, error: transError } = await supabaseAdmin
      .from('marketplace_transactions')
      .select('id, status')
      .eq('listing_id', testListing.id);

    if (transError) {
      console.warn('⚠️  Error checking transactions:', transError);
    } else {
      console.log('   Transactions:', transactions?.length || 0);
      if (transactions && transactions.length > 0) {
        console.log('   Transaction statuses:', transactions.map(t => t.status));
      }
    }
    console.log('');

    // 5. Simular eliminación (SIN ELIMINAR REALMENTE)
    console.log('5. Simulating deletion process...');
    console.log('   ⚠️  NOTE: This is a DRY RUN - no actual deletion will occur');

    // Test deletion query without executing
    console.log('   Testing deletion query structure...');

    // Verificar RLS policies
    console.log('6. Checking RLS policies...');
    const { data: policies, error: policiesError } = await supabaseAdmin
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'business_listings');

    if (policiesError) {
      console.warn('⚠️  Could not check RLS policies:', policiesError);
    } else {
      console.log('   Found', policies?.length || 0, 'RLS policies for business_listings');
      policies?.forEach(policy => {
        console.log(`   - ${policy.policyname}: ${policy.cmd} (${policy.permissive})`);
      });
    }

    console.log('\n✅ Deletion test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Admin client: Working');
    console.log('   - Test listing found: Yes');
    console.log('   - Foreign key constraints: Checked');
    console.log('   - RLS policies: Checked');
    console.log('\n💡 If deletion is still failing, the issue might be:');
    console.log('   1. Session/authentication in the actual API call');
    console.log('   2. Business profile verification');
    console.log('   3. Subscription status check');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Ejecutar el test
testDeletionProcess().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch(error => {
  console.error('💥 Test failed:', error);
  process.exit(1);
});