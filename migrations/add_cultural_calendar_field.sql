-- Add show_in_cultural_calendar field to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS show_in_cultural_calendar BOOLEAN DEFAULT FALSE;

-- Set existing arts-culture and music events to show in cultural calendar
UPDATE events 
SET show_in_cultural_calendar = TRUE 
WHERE category IN ('arts-culture', 'music', 'cultural');

-- Comment: You can run this SQL script against your Supabase database 
-- to add the new field and backfill existing data. 