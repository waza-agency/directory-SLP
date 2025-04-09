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
  return data
}

export const getFeaturedPlaces = async () => {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
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
      category: data.category || 'other',
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
      tags: []
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
  return data;
}

export const searchPlaces = async (searchTerm: string, category?: string) => {
  let query = supabase
    .from('places')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
} 