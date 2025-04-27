import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      events: data || [],
      count: data?.length || 0,
      categoryCounts: {
        cultural: data?.filter(event => event.category === 'cultural').length || 0,
        'arts culture': data?.filter(event => event.category === 'arts culture').length || 0,
        sports: data?.filter(event => event.category === 'sports').length || 0,
        other: data?.filter(event => event.category === 'other').length || 0
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Failed to fetch events', error });
  }
} 