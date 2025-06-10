const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTableStructure() {
  console.log('🔍 Checking business_listings table structure...');

  // Check if we can query existing listings to understand the structure
  const { data: existingListings, error: queryError } = await supabase
    .from('business_listings')
    .select('*')
    .limit(1);

  if (queryError) {
    console.error('❌ Error querying existing listings:', queryError);
    return;
  }

  console.log('📋 Sample listing structure:');
  if (existingListings && existingListings.length > 0) {
    console.log('Available columns:', Object.keys(existingListings[0]));
    console.log('Sample listing:', existingListings[0]);
  } else {
    console.log('No existing listings found');
  }

  // Try to understand what columns are expected by the create service form
  console.log('\n🧪 Testing schema compatibility...');

  // Test a minimal insert to see what's required
  const testData = {
    business_id: '00000000-0000-0000-0000-000000000000',
    title: 'test',
    description: 'test',
    category: 'test'
  };

  const { error: minimalError } = await supabase
    .from('business_listings')
    .insert([testData])
    .select()
    .limit(0);

  if (minimalError) {
    console.log('❌ Minimal insert error:', minimalError);
  } else {
    console.log('✅ Minimal schema works');
  }

  // Test with additional columns that the service form tries to use
  const extendedTestData = {
    ...testData,
    type: 'service',
    metadata: {},
    price: 100,
    images: [],
    status: 'active'
  };

  const { error: extendedError } = await supabase
    .from('business_listings')
    .insert([extendedTestData])
    .select()
    .limit(0);

  if (extendedError) {
    console.log('❌ Extended insert error:', extendedError);
    console.log('This suggests missing columns:', ['type', 'metadata'].filter(col =>
      extendedError.message.includes(col)
    ));
  } else {
    console.log('✅ Extended schema works');
  }
}

checkTableStructure().catch(console.error);