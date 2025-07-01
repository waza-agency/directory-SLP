import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Count places
    const { count: placesCount, error: placesError } = await supabaseAdmin
      .from('places')
      .select;
    if (placesError) throw placesError;

    // Count business_listings (services)
    const { count: servicesCount, error: servicesError } = await supabaseAdmin
      .from('business_listings')
      .select;
    if (servicesError) throw servicesError;

    return res.status(200).json({ placesCount, servicesCount });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ message: 'Failed to fetch stats' });
  }
}