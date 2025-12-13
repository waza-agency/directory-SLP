const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping of wrong paths to correct paths
const imagePathFixes = {
  '/images/practical-categories/rainy-day-activities.jpg': '/images/practical-categories/activities-rainy-day.jpg',
  '/images/practical-categories/sports-fitness.jpg': '/images/practical-categories/sports-fitness.webp',
  '/images/practical-categories/restaurants-with-playgrounds.jpg': '/images/practical-categories/restaurants-with-playgrounds.png',
  '/images/practical-categories/easy-parking-spots.jpg': '/images/practical-categories/easy-parking-spots.png',
  '/images/practical-categories/local-organic-products.jpg': '/images/practical-categories/local-organic-products.jpeg',
};

async function fixPlacesImages() {
  console.log('Fixing places images...\n');

  for (const [wrongPath, correctPath] of Object.entries(imagePathFixes)) {
    console.log(`Updating: ${wrongPath}`);
    console.log(`      To: ${correctPath}`);

    const { data, error } = await supabase
      .from('places')
      .update({ image_url: correctPath })
      .eq('image_url', wrongPath)
      .select('id, name');

    if (error) {
      console.error(`  Error: ${error.message}`);
    } else if (data && data.length > 0) {
      console.log(`  Updated ${data.length} places:`);
      data.forEach(p => console.log(`    - ${p.name}`));
    } else {
      console.log(`  No places found with this path`);
    }
    console.log('');
  }

  console.log('Done!');
}

fixPlacesImages().catch(console.error);
