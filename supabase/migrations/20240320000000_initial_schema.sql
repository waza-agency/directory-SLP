-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum for place categories
create type place_category as enum (
    'service',
    'other',
    'food',
    'beverages',
    'sports-fitness',
    'outdoor-activities',
    'private-dining-rooms',
    'language-exchange-cafes',
    'family-activities',
    'terraces',
    'live-music'
);

-- Create enum for event categories
create type event_category as enum (
    'arts-culture',
    'cultural',
    'culinary',
    'music',
    'sports',
    'traditional',
    'wellness',
    'community-social'
);

-- Create places table
create table if not exists public.places (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    category place_category not null,
    address text not null,
    city text,
    phone text,
    website text,
    instagram text,
    latitude float,
    longitude float,
    description text,
    image_url text,
    hours text,
    featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create events table
create table if not exists public.events (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    location text not null,
    category event_category not null,
    image_url text,
    featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create featured photos table for homepage
create table if not exists public.featured_photos (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    subtitle text,
    image_url text not null,
    link text,
    active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing triggers if they exist
drop trigger if exists handle_places_updated_at on public.places;
drop trigger if exists handle_events_updated_at on public.events;
drop trigger if exists handle_featured_photos_updated_at on public.featured_photos;

-- Create updated_at triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger handle_places_updated_at
    before update on public.places
    for each row
    execute function public.handle_updated_at();

create trigger handle_events_updated_at
    before update on public.events
    for each row
    execute function public.handle_updated_at();

create trigger handle_featured_photos_updated_at
    before update on public.featured_photos
    for each row
    execute function public.handle_updated_at();

-- Set up Row Level Security (RLS)
alter table public.places enable row level security;
alter table public.events enable row level security;
alter table public.featured_photos enable row level security;

-- Create policies
create policy "Public read access" on public.places
    for select using (true);

create policy "Public read access" on public.events
    for select using (true);

create policy "Public read access" on public.featured_photos
    for select using (true);