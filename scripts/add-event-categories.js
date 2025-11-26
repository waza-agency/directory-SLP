// Script to add new event category enum values to Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addCategories() {
  console.log('\n🔧 Adding new event categories to database...\n');

  const categoriesToAdd = [
    'sports',
    'cultural',
    'arts-culture',
    'music',
    'culinary',
    'other'
  ];

  console.log('Categories to add:', categoriesToAdd.join(', '));
  console.log('\nThis requires running SQL directly in Supabase...\n');

  console.log('SQL to run in Supabase SQL Editor:\n');
  console.log('-- Add new enum values to event_category type');

  categoriesToAdd.forEach(cat => {
    console.log(`ALTER TYPE event_category ADD VALUE IF NOT EXISTS '${cat}';`);
  });

  console.log('\nOR, if event_category type doesn\'t exist, create it:');
  console.log(`
CREATE TYPE event_category AS ENUM (
  'sports',
  'cultural',
  'arts-culture',
  'music',
  'culinary',
  'other',
  'community-social'
);

-- Then update the column to use the enum
ALTER TABLE events
  ALTER COLUMN category TYPE event_category
  USING category::event_category;
`);

  console.log('\n⚠️  Please run the SQL above in your Supabase SQL Editor.');
  console.log('   Then run this import script again.\n');
}

addCategories();
