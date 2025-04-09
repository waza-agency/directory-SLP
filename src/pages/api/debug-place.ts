import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlaceById } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    
    console.log('API route: Fetching place with ID:', id);
    
    const place = await getPlaceById(id);
    
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    // Return the place data
    return res.status(200).json({ 
      success: true, 
      place 
    });
  } catch (error) {
    console.error('API route error:', error);
    
    if (error instanceof Error) {
      return res.status(500).json({ 
        error: 'Server error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
    
    return res.status(500).json({ error: 'Server error' });
  }
} 