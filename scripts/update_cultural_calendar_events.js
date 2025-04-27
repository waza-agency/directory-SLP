// This script updates existing events to mark them for the cultural calendar
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateEvents() {
  try {
    console.log('Fetching events...');
    
    // Get all events that are cultural, arts-culture, or music
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .or('category.eq.cultural,category.eq.arts-culture,category.eq.music');
    
    if (error) {
      throw error;
    }
    
    console.log(`Found ${events.length} cultural-related events`);
    
    // Mark all these events for the cultural calendar
    for (const event of events) {
      console.log(`Updating event: ${event.title}`);
      
      const { error: updateError } = await supabase
        .from('events')
        .update({ show_in_cultural_calendar: true })
        .eq('id', event.id);
      
      if (updateError) {
        console.error(`Error updating event ${event.id}:`, updateError);
      }
    }
    
    // Also mark some non-cultural events for the cultural calendar as an example
    const { data: otherEvents, error: otherError } = await supabase
      .from('events')
      .select('*')
      .not('category', 'in', '("cultural","arts-culture","music")')
      .limit(5);
    
    if (otherError) {
      throw otherError;
    }
    
    console.log(`Found ${otherEvents?.length || 0} other events to mark`);
    
    for (const event of (otherEvents || [])) {
      console.log(`Updating non-cultural event: ${event.title}`);
      
      const { error: updateError } = await supabase
        .from('events')
        .update({ show_in_cultural_calendar: true })
        .eq('id', event.id);
      
      if (updateError) {
        console.error(`Error updating event ${event.id}:`, updateError);
      }
    }
    
    console.log('Update completed');
  } catch (error) {
    console.error('Error updating events:', error);
  }
}

updateEvents(); 