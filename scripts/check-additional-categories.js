const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCategories() {
  // Get all unique values from additional_categories
  const { data, error } = await supabase
    .from('places')
    .select('id, name, category, additional_categories')
    .not('additional_categories', 'is', null);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} places with additional_categories\n`);

  // Collect all unique additional categories
  const allCategories = new Set();
  data.forEach(place => {
    if (Array.isArray(place.additional_categories)) {
      place.additional_categories.forEach(cat => allCategories.add(cat));
    }
  });

  console.log('Unique additional categories found:');
  console.log([...allCategories].sort().join('\n'));

  // Show places for specific categories we need
  const targetCategories = [
    'rainy-day-activities',
    'restaurants-with-playgrounds', 
    'easy-parking-spots',
    'family-activities',
    'english-speaking-healthcare',
    'international-markets'
  ];

  console.log('\n--- Places by target category ---\n');

  for (const cat of targetCategories) {
    const places = data.filter(p => 
      Array.isArray(p.additional_categories) && 
      p.additional_categories.includes(cat)
    );
    console.log(`\n${cat}: ${places.length} places`);
    places.forEach(p => console.log(`  - ${p.name} (primary: ${p.category})`));
  }
}

checkCategories();
