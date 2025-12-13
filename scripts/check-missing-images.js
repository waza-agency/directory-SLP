const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const publicDir = path.join(__dirname, '..', 'public');

async function checkMissingImages() {
  console.log('Fetching all places...\n');

  const { data: places, error } = await supabase
    .from('places')
    .select('id, name, category, image_url')
    .order('name');

  if (error) {
    console.error('Error fetching places:', error);
    return;
  }

  const localImages = places.filter(p => p.image_url && p.image_url.startsWith('/'));
  const supabaseImages = places.filter(p => p.image_url && p.image_url.includes('supabase.co'));

  console.log(`Places with local image paths: ${localImages.length}`);
  console.log(`Places with Supabase URLs: ${supabaseImages.length}\n`);

  // Check which local images don't exist
  console.log('=== Checking local images ===\n');
  const missingLocal = [];

  for (const place of localImages) {
    const imagePath = path.join(publicDir, place.image_url);
    if (!fs.existsSync(imagePath)) {
      missingLocal.push(place);
      console.log(`MISSING: ${place.name}`);
      console.log(`  Path: ${place.image_url}`);
      console.log(`  Category: ${place.category}`);
      console.log(`  ID: ${place.id}\n`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total local images: ${localImages.length}`);
  console.log(`Missing local images: ${missingLocal.length}`);
  console.log(`Supabase images: ${supabaseImages.length}`);

  // Output list of places that need fixing
  if (missingLocal.length > 0) {
    console.log('\n=== Places needing image fix ===');
    missingLocal.forEach(p => {
      console.log(`${p.id}|${p.name}|${p.category}`);
    });
  }
}

checkMissingImages().catch(console.error);
