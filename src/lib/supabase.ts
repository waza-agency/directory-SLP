import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { logger } from './logger'

// Ensure environment variables are loaded or use development fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Use the updated Pages Browser client for cookie-based session storage
export const supabase = createPagesBrowserClient<Database>();

logger.log('Supabase client initialized');

// Mock implementations for development mode
const isDev = process.env.NODE_ENV !== 'production';

// Helper function to map database place data to Place interface
const mapPlaceData = (place: any) => ({
  id: place.id,
  name: place.name,
  category: place.category,
  address: place.address || '',
  city: place.city || null,
  phone: place.phone || null,
  website: place.website || null,
  instagram: place.instagram || null,
  latitude: place.latitude || null,
  longitude: place.longitude || null,
  description: place.description || '',
  imageUrl: place.image_url || null,
  hours: place.hours || null,
  featured: Boolean(place.featured),
  rating: place.rating || null,
  priceLevel: place.price_level || null,
  reviews: [],
  photos: [],
  tags: place.tags || []
});

// Helper functions for common operations
export const getPlaces = async () => {
  if (isDev) {
    logger.log('DEV MODE: Using mock data for getPlaces');
    return [];
  }

  const { data, error } = await supabase
    .from('places')
    .select("*")
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(mapPlaceData);
}

export const getFeaturedPlaces = async () => {
  const { data, error } = await supabase
    .from('places')
    .select("*")
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(mapPlaceData);
}

// Helper function to filter events by date consistently across all pages
export const filterUpcomingEvents = (events: any[] | null) => {
  if (!events || !Array.isArray(events)) return [];

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set to start of day

  return events.filter(event => {
    // Parse the start date to properly compare regardless of format
    const eventStartDate = new Date(event.start_date);
    eventStartDate.setHours(0, 0, 0, 0); // Set to start of day

    // If end_date is missing, create a default end date 2 hours after start
    let eventEndDate: Date;
    if (!event.end_date) {
      eventEndDate = new Date(event.start_date);
      // Add 2 hours to the start time
      eventEndDate.setHours(eventEndDate.getHours() + 2);
    } else {
      eventEndDate = new Date(event.end_date);
    }

    // Include events that:
    // 1. Start today or in the future, OR
    // 2. Are currently ongoing (end date is today or in the future)
    return eventStartDate >= currentDate || eventEndDate >= currentDate;
  });
};

// Get a safety buffer date for use in Supabase queries
export const getSafetyDateBuffer = (daysBack = 7) => {
  const safetyDateBuffer = new Date();
  safetyDateBuffer.setDate(safetyDateBuffer.getDate() - daysBack);
  return safetyDateBuffer.toISOString();
};

export const getEvents = async () => {
  // Calculate the safety buffer date - 7 days in the past
  const safetyDateString = getSafetyDateBuffer();

  try {
    const { data, error } = await supabase
      .from('events')
      .select("*")
      .or(`end_date.gte.${safetyDateString},end_date.is.null`) // Get events with future end dates OR null end dates
      .order('start_date', { ascending: true });

    if (error && error.code === '42703') {
      // Column doesn't exist - try without category
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('events')
        .select("*")
        .or(`end_date.gte.${safetyDateString},end_date.is.null`)
        .order('start_date', { ascending: true });

      if (fallbackError) throw fallbackError;

      // Add default category
      const dataWithCategory = fallbackData?.map(event => ({ ...event, category: 'other' })) || [];
      return filterUpcomingEvents(dataWithCategory);
    }

    if (error) throw error;

    // Apply the consistent filtering logic
    return filterUpcomingEvents(data);
  } catch (error) {
    logger.error('Error in getEvents:', error);
    return [];
  }
}

export const getFeaturedEvents = async () => {
  // Use safety buffer for initial query to get more recent events
  const safetyDateString = getSafetyDateBuffer();

  try {
    const { data: eventsData, error } = await supabase
      .from('events')
      .select("*")
      .eq('featured', true)
      .or(`end_date.gte.${safetyDateString},end_date.is.null`) // Get events with future end dates OR null end dates
      .order('start_date', { ascending: true });

    if (error && error.code === '42703') {
      // Column doesn't exist - try without category
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('events')
        .select("*")
        .eq('featured', true)
        .or(`end_date.gte.${safetyDateString},end_date.is.null`)
        .order('start_date', { ascending: true });

      if (fallbackError) throw fallbackError;

      // Add default category
      const dataWithCategory = fallbackData?.map(event => ({ ...event, category: 'other' })) || [];
      return filterUpcomingEvents(dataWithCategory);
    }

    if (error) throw error;

    // Now use the filterUpcomingEvents function to properly filter with our date logic
    return filterUpcomingEvents(eventsData);
  } catch (error) {
    logger.error('Error in getFeaturedEvents:', error);
    return [];
  }
}

export const getFeaturedPhotos = async () => {
  const { data, error } = await supabase
    .from('featured_photos')
    .select("*")
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getPlaceById = async (id: string) => {
  try {
    logger.log('Fetching place with ID:', id);

    // First check if the ID exists in the database
    const { data: placeExists, error: checkError } = await supabase
      .from('places')
      .select("*")
      .eq('id', id)
      .single();

    if (checkError) {
      logger.error('Error checking place existence:', checkError);
      if (checkError.code === 'PGRST116') {  // No rows returned
        logger.log('Place ID does not exist:', id);
        return null;
      }
      throw checkError;
    }

    if (!placeExists) {
      logger.log('No place found with ID:', id);
      return null;
    }

    // Now fetch the full place data
    const { data, error } = await supabase
      .from('places')
      .select(`
        *
      `)
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching place data:', error);
      throw error;
    }

    if (!data) {
      logger.error('No data returned for place:', id);
      return null;
    }

    const mappedPlace = mapPlaceData(data);
    logger.log('Mapped place data:', mappedPlace);
    return mappedPlace;
  } catch (error) {
    logger.error('Error in getPlaceById:', error);
    throw error;
  }
}

export const getEventById = async (id: string) => {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      photos (*),
      tags (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getPotosinoBrands = async () => {
  const { data, error } = await supabase
    .from('places')
    .select("*")
    .eq('category', 'shop')
    .eq('tags', ['potosino'])
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(mapPlaceData);
}

export const searchPlaces = async (searchTerm: string, category?: string) => {
  logger.log('Search request with:', { searchTerm, category });

  let query = supabase
    .from('places')
    .select("*")
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  if (category && category !== 'all') {
    logger.log(`Filtering by category: "${category}"`);
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    logger.error('Error fetching places:', error);
    throw error;
  }

  logger.log(`Found ${data.length} places in database`);

  const mappedData = data.map(mapPlaceData);

  logger.log(`Returning ${mappedData.length} mapped places`);
  return mappedData;
}

// Get random places from the database
export const getRandomPlaces = async (limit: number = 16) => {
  try {
    // First, get the total count of places
    const { count, error: countError } = await supabase
      .from('places')
      .select;

    if (countError) throw countError;

    if (!count || count === 0) {
      logger.log('No places found in database');
      return [];
    }

    logger.log(`Total places in database: ${count}`);

    // Get all places and randomize client-side
    // This is more efficient for small to medium datasets than the SQL randomization
    const { data, error } = await supabase
      .from('places')
      .select;

    if (error) throw error;

    // Shuffle the array using Fisher-Yates algorithm
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'limit' items
    const randomPlaces = shuffled.slice(0, limit);
    logger.log(`Returning ${randomPlaces.length} random places`);

    return randomPlaces.map(mapPlaceData);
  } catch (error) {
    logger.error('Error getting random places:', error);
    throw error;
  }
}