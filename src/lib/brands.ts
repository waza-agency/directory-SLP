import { supabase } from './supabase';

export interface Brand {
  id: string;
  name: string;
  category: string;
  year_founded?: string;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  description?: string;
  notable_products?: string;
  where_to_buy?: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get all brands from Supabase
 */
export const getAllBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }

  return data || [];
};

/**
 * Get featured brands from Supabase
 */
export const getFeaturedBrands = async (limit = 3): Promise<Brand[]> => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('featured', true)
    .order('name', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured brands:', error);
    return [];
  }

  return data || [];
};

/**
 * Get a brand by ID
 */
export const getBrandById = async (id: string): Promise<Brand | null> => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching brand ${id}:`, error);
    return null;
  }

  return data || null;
};

/**
 * Get brands by category
 */
export const getBrandsByCategory = async (category: string): Promise<Brand[]> => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('category', category)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error fetching brands by category ${category}:`, error);
    return [];
  }

  return data || [];
}; 