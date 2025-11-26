// Script to add cultural events from EVENTS_TEMPLATE.json to Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addEventsFromTemplate() {
  try {
    console.log('📖 Reading EVENTS_TEMPLATE.json...\n');

    // Read the import file
    const templatePath = path.join(__dirname, '..', 'EVENTS_TO_IMPORT.json');
    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

    // Get events from the "events_to_add" array
    const eventsToAdd = templateData.events_to_add;

    if (!eventsToAdd || eventsToAdd.length === 0) {
      console.log('⚠️  No events found in "events_to_add" array.');
      console.log('   Please add your events to the "events_to_add" array in EVENTS_TEMPLATE.json\n');
      return;
    }

    console.log(`📅 Found ${eventsToAdd.length} event(s) to add\n`);

    // Validate each event before adding
    const validatedEvents = [];
    const errors = [];

    for (let i = 0; i < eventsToAdd.length; i++) {
      const event = eventsToAdd[i];
      const eventNum = i + 1;

      console.log(`Validating Event ${eventNum}: ${event.title || 'Untitled'}`);

      // Required fields validation
      const requiredFields = ['title', 'start_date', 'end_date', 'location', 'category'];
      const missingFields = requiredFields.filter(field => !event[field]);

      if (missingFields.length > 0) {
        errors.push(`Event ${eventNum} (${event.title || 'Untitled'}): Missing required fields: ${missingFields.join(', ')}`);
        continue;
      }

      // Validate category
      const validCategories = ['sports', 'cultural', 'arts-culture', 'music', 'culinary', 'other', 'community-social'];
      if (!validCategories.includes(event.category)) {
        errors.push(`Event ${eventNum} (${event.title}): Invalid category "${event.category}". Must be one of: ${validCategories.join(', ')}`);
        continue;
      }

      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
      if (!dateRegex.test(event.start_date)) {
        errors.push(`Event ${eventNum} (${event.title}): Invalid start_date format. Use YYYY-MM-DDTHH:MM:SS`);
        continue;
      }
      if (!dateRegex.test(event.end_date)) {
        errors.push(`Event ${eventNum} (${event.title}): Invalid end_date format. Use YYYY-MM-DDTHH:MM:SS`);
        continue;
      }

      // Validate featured is boolean
      if (typeof event.featured !== 'boolean') {
        errors.push(`Event ${eventNum} (${event.title}): "featured" must be true or false (boolean)`);
        continue;
      }

      // Set defaults for optional fields
      const validatedEvent = {
        title: event.title,
        description: event.description || null,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        category: event.category,
        image_url: event.image_url || null,
        featured: event.featured,
        add_to_cultural_calendar: event.show_in_cultural_calendar !== false // Default to true if not specified
      };

      validatedEvents.push(validatedEvent);
      console.log(`✅ Valid\n`);
    }

    // Report validation errors
    if (errors.length > 0) {
      console.log('❌ VALIDATION ERRORS:\n');
      errors.forEach(error => console.log(`   ${error}`));
      console.log('\n⚠️  Please fix the errors above and try again.\n');
      return;
    }

    if (validatedEvents.length === 0) {
      console.log('❌ No valid events to add.\n');
      return;
    }

    console.log(`\n✅ All ${validatedEvents.length} event(s) validated successfully!\n`);
    console.log('📤 Adding events to Supabase...\n');

    // Add events to database
    const { data, error } = await supabase
      .from('events')
      .insert(validatedEvents)
      .select();

    if (error) {
      console.error('❌ Error adding events to database:', error);
      throw error;
    }

    console.log('✅ SUCCESS! Events added to database:\n');
    data.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   ID: ${event.id}`);
      console.log(`   Category: ${event.category}`);
      console.log(`   Dates: ${event.start_date} to ${event.end_date}`);
      console.log(`   Location: ${event.location}`);
      console.log(`   Cultural Calendar: ${event.show_in_cultural_calendar ? 'YES ✓' : 'NO'}`);
      console.log(`   Featured: ${event.featured ? 'YES ✓' : 'NO'}`);
      console.log('');
    });

    console.log(`\n🎉 Successfully added ${data.length} event(s) to the database!\n`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
console.log('\n═══════════════════════════════════════════════════════');
console.log('   CULTURAL EVENTS IMPORTER');
console.log('═══════════════════════════════════════════════════════\n');

addEventsFromTemplate();
