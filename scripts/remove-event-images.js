// Script to remove image_url from all events in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeEventImages() {
  try {
    console.log('\n🔧 Removing image_url from all events...\n');

    // Update all events to set image_url to null
    const { data, error, count } = await supabase
      .from('events')
      .update({ image_url: null })
      .not('image_url', 'is', null)
      .select();

    if (error) {
      console.error('❌ Error updating events:', error);
      throw error;
    }

    console.log(`✅ Successfully removed images from ${data.length} event(s)\n`);

    if (data.length > 0) {
      console.log('Updated events:');
      data.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
      });
    } else {
      console.log('No events had images to remove.');
    }

    console.log('\n✨ Done!\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('   REMOVE EVENT IMAGES');
console.log('═══════════════════════════════════════════════════════\n');

removeEventImages();
