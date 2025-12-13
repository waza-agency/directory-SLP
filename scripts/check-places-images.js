const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPlacesImages() {
  console.log('Fetching all places...\n');

  const { data: places, error } = await supabase
    .from('places')
    .select('id, name, category, image_url')
    .order('name');

  if (error) {
    console.error('Error fetching places:', error);
    return;
  }

  console.log(`Total places found: ${places.length}\n`);

  const withImage = places.filter(p => p.image_url && p.image_url.trim() !== '');
  const withoutImage = places.filter(p => !p.image_url || p.image_url.trim() === '');

  console.log(`Places WITH image_url: ${withImage.length}`);
  console.log(`Places WITHOUT image_url: ${withoutImage.length}\n`);

  console.log('=== Places WITHOUT images ===');
  withoutImage.forEach(p => {
    console.log(`- ${p.name} (${p.category}) [ID: ${p.id}]`);
  });

  console.log('\n=== Sample image URLs ===');
  withImage.slice(0, 10).forEach(p => {
    console.log(`- ${p.name}: ${p.image_url}`);
  });

  // Check storage buckets
  console.log('\n=== Checking Supabase Storage ===');
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

  if (bucketError) {
    console.error('Error listing buckets:', bucketError);
  } else {
    console.log('Available buckets:', buckets.map(b => b.name));

    // Check for images in common buckets
    for (const bucket of buckets) {
      const { data: files, error: filesError } = await supabase.storage
        .from(bucket.name)
        .list('', { limit: 20 });

      if (!filesError && files && files.length > 0) {
        console.log(`\nFiles in '${bucket.name}' bucket (first 20):`);
        files.forEach(f => console.log(`  - ${f.name}`));
      }
    }
  }
}

checkPlacesImages().catch(console.error);
