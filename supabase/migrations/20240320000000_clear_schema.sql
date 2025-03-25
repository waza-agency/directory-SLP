-- Drop triggers first
drop trigger if exists handle_places_updated_at on public.places;
drop trigger if exists handle_events_updated_at on public.events;
drop trigger if exists handle_featured_photos_updated_at on public.featured_photos;

-- Drop tables
drop table if exists public.featured_photos;
drop table if exists public.events;
drop table if exists public.places;

-- Drop the function
drop function if exists public.handle_updated_at();

-- Drop the enum types
drop type if exists public.event_category;
drop type if exists public.place_category; 