import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { sampleBrands, mapSupabasePlace } from '@/lib/brands-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch places from Supabase
    const { data: supabasePlaces, error } = await supabase
      .from('places')
      .select('*')
      .eq('category', 'shop')
      .order('featured', { ascending: false });
    
    if (error) {
      console.error('Error fetching places from Supabase:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    // Map Supabase data to match the Place type
    const mappedPlaces = supabasePlaces?.map(place => mapSupabasePlace(place)) || [];

    // Combine with sample brands
    const places = [...mappedPlaces, ...sampleBrands];
    
    // Filter for Potosino brands
    const potosinoBrands = places.filter(place => 
      place.category === 'shop' && 
      place.tags?.includes('potosino')
    );

    // Log the data
    console.log('Total places:', places.length);
    console.log('Potosino brands:', potosinoBrands.length);
    console.log('Potosino brands details:', potosinoBrands.map(brand => ({
      name: brand.name,
      tags: brand.tags,
      featured: brand.featured
    })));

    return res.status(200).json({
      success: true,
      totalPlaces: places.length,
      potosinoBrands: potosinoBrands.length,
      potosinoBrandsDetails: potosinoBrands.map(brand => ({
        name: brand.name,
        tags: brand.tags,
        featured: brand.featured
      }))
    });
  } catch (error) {
    console.error('Debug brands API error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 