const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBrandsTable() {
  console.log('Checking brands table in Supabase...\n');

  try {
    // Check if brands table exists and get all records
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error querying brands table:', error.message);
      console.error('Details:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log('Brands table exists but is empty.');
      return;
    }

    console.log(`Found ${data.length} brands in the database:\n`);

    data.forEach((brand, index) => {
      console.log(`${index + 1}. ${brand.name}`);
      console.log(`   ID: ${brand.id}`);
      console.log(`   Category: ${brand.category}`);
      console.log(`   Image URL: ${brand.image_url || 'NOT SET'}`);
      console.log(`   Featured: ${brand.featured}`);
      console.log('');
    });

    // Check for brands with missing images
    const brandsWithoutImages = data.filter(b => !b.image_url);
    if (brandsWithoutImages.length > 0) {
      console.log(`\nWARNING: ${brandsWithoutImages.length} brands without images:`);
      brandsWithoutImages.forEach(b => console.log(`  - ${b.name}`));
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkBrandsTable();
