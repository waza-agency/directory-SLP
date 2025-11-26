// Script to check music events in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMusicEvents() {
  try {
    console.log('\n🎵 Checking music events in database...\n');

    // Get all events with category 'music'
    const { data: musicEvents, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', 'music')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('❌ Error fetching music events:', error);
      throw error;
    }

    console.log(`Found ${musicEvents.length} music event(s):\n`);

    if (musicEvents.length > 0) {
      musicEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   Dates: ${event.start_date} to ${event.end_date}`);
        console.log(`   Location: ${event.location}`);
        console.log(`   Featured: ${event.featured}`);
        console.log('');
      });
    } else {
      console.log('❌ No music events found in database!\n');
      console.log('Let me check all categories...\n');

      // Get count of events by category
      const { data: allEvents } = await supabase
        .from('events')
        .select('category');

      const categoryCounts = {};
      allEvents.forEach(event => {
        categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
      });

      console.log('Events by category:');
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkMusicEvents();
