import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Ensure environment variables are loaded
if (typeof window !== 'undefined') {
  console.log('Browser environment variables:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables not found:', {
    url: supabaseUrl,
    key: supabaseAnonKey
  })
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const getPlaces = async () => {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  
  // Map the database results to the expected Place interface
  return data.map(place => {
    return {
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
    };
  });
}

export const getFeaturedPlaces = async () => {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  
  // Map the database results to the expected Place interface
  return data.map(place => {
    return {
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
    };
  });
}

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })

  if (error) throw error
  return data
}

export const getFeaturedEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('featured', true)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })

  if (error) throw error
  return data
}

export const getFeaturedPhotos = async () => {
  const { data, error } = await supabase
    .from('featured_photos')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getPlaceById = async (id: string) => {
  try {
    console.log('Supabase: Fetching place with ID:', id);
    
    // First check if the ID exists in the database
    const { data: placeExists, error: checkError } = await supabase
      .from('places')
      .select('id')
      .eq('id', id)
      .single();
      
    if (checkError) {
      console.error('Supabase error checking place existence:', checkError);
      if (checkError.code === 'PGRST116') {  // No rows returned
        console.log('Place ID does not exist:', id);
        return null;
      }
      throw checkError;
    }
    
    if (!placeExists) {
      console.log('No place found with ID:', id);
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
      console.error('Supabase error fetching place data:', error);
      throw error;
    }

    if (!data) {
      console.error('No data returned for place:', id);
      return null;
    }

    // Map the database fields to our interface
    const mappedPlace = {
      id: data.id,
      name: data.name,
      category: data.category,
      address: data.address || '',
      city: data.city || null,
      phone: data.phone || null,
      website: data.website || null,
      instagram: data.instagram || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      description: data.description || '',
      imageUrl: data.image_url || null,
      hours: data.hours || null,
      featured: Boolean(data.featured),
      rating: data.rating || null,
      priceLevel: data.price_level || null,
      reviews: [],
      photos: [],
      tags: data.tags || []
    };

    console.log('Mapped place data:', mappedPlace);
    return mappedPlace;
  } catch (error) {
    console.error('Error in getPlaceById:', error);
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
    .select('*')
    .eq('category', 'shop')
    .eq('tags', ['potosino'])
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Map the database results to the expected Place interface
  return data.map(place => ({
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
  }));
}

export const searchPlaces = async (searchTerm: string, category?: string) => {
  console.log('Search request with:', { searchTerm, category });
  
  let query = supabase
    .from('places')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  if (category && category !== 'all') {
    console.log(`Filtering by category: "${category}"`);
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
  
  console.log(`Found ${data.length} places in database`);
  // Log all unique categories in the database results
  const uniqueCategories = Array.from(new Set(data.map(place => place.category)));
  console.log('Unique categories in database results:', uniqueCategories);
  
  // Map the database results to the expected Place interface
  const mappedData = data.map(place => {
    return {
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
    };
  });
  
  console.log(`Returning ${mappedData.length} mapped places`);
  return mappedData;
}

// Get random places from the database
export const getRandomPlaces = async (limit: number = 16) => {
  try {
    // First, get the total count of places
    const { count, error: countError } = await supabase
      .from('places')
      .select('*', { count: 'exact', head: true });
      
    if (countError) throw countError;
    
    if (!count || count === 0) {
      console.log('No places found in database');
      return [];
    }
    
    console.log(`Total places in database: ${count}`);
    
    // Get all places and randomize client-side
    // This is more efficient for small to medium datasets than the SQL randomization
    const { data, error } = await supabase
      .from('places')
      .select('*');
      
    if (error) throw error;
    
    // Shuffle the array using Fisher-Yates algorithm
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the first 'limit' items
    const randomPlaces = shuffled.slice(0, limit);
    console.log(`Returning ${randomPlaces.length} random places`);
    
    // Map the places to our interface
    return randomPlaces.map(place => ({
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
    }));
  } catch (error) {
    console.error('Error getting random places:', error);
    throw error;
  }
} 