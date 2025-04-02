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
  const { data, error } = await supabase
    .from('places')
    .select(`
      *,
      photos (*),
      reviews (*),
      tags (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
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