import { supabase } from './supabase';

export interface Brand {
  id: string;
  name: string;
  slug: string;
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
 * Generate SEO-friendly slug from brand data
 */
export const generateBrandSlug = (name: string, category: string, city?: string): string => {
  const slugParts = [
    name,
    category,
    city || 'san-luis-potosi'
  ];

  return slugParts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Get all brands from Supabase
 */
export const getAllBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase
    .from('brands')
    .select("*")
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
    .select("*")
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
 * Get random Potosino brands from Supabase
 * Returns a randomly selected set of brands
 */
export const getRandomPotosinoBrands = async (limit = 3): Promise<Brand[]> => {
  try {
    // First, get all brands
    const { data, error } = await supabase
      .from('brands')
      .select;

    if (error) {
      console.error('Error fetching brands for random selection:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Shuffle the array to get random selection
    const shuffled = [...data].sort(() => 0.5 - Math.random());

    // Return the first 'limit' items
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error in getRandomPotosinoBrands:', error);
    return [];
  }
};

/**
 * Get a brand by ID
 */
export const getBrandById = async (id: string): Promise<Brand | null> => {
  const { data, error } = await supabase
    .from('brands')
    .select("*")
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching brand ${id}:`, error);
    return null;
  }

  return data || null;
};

/**
 * Get a brand by slug (SEO-friendly URL)
 */
export const getBrandBySlug = async (slug: string): Promise<Brand | null> => {
  const { data, error } = await supabase
    .from('brands')
    .select("*")
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching brand by slug ${slug}:`, error);
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
    .select("*")
    .eq('category', category)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error fetching brands by category ${category}:`, error);
    return [];
  }

  return data || [];
};