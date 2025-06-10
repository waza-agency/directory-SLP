require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkBusinessProfilesStructure() {
  console.log('🔍 Checking business_profiles table structure...\n');

  try {
    // Get a sample business profile to see its structure
    const { data: sampleProfile, error } = await supabase
      .from('business_profiles')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error fetching sample profile:', error);
      return;
    }

    if (!sampleProfile || sampleProfile.length === 0) {
      console.log('❌ No business profiles found');
      return;
    }

    console.log('✅ Sample business profile structure:');
    console.log(JSON.stringify(sampleProfile[0], null, 2));

    console.log('\n📋 Available columns:');
    Object.keys(sampleProfile[0]).forEach(column => {
      console.log(`   - ${column}: ${typeof sampleProfile[0][column]} (${sampleProfile[0][column] === null ? 'null' : 'has value'})`);
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkBusinessProfilesStructure();