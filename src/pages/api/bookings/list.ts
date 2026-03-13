import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { logger } from '@/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createPagesServerClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { place_id, status } = req.query;

    let query = supabase
      .from('bookings')
      .select('*, places(id, name, image_url, category)')
      .eq('user_id', session.user.id)
      .order('booking_date', { ascending: true });

    if (place_id && typeof place_id === 'string') {
      query = query.eq('place_id', place_id);
    }

    if (status && typeof status === 'string') {
      query = query.eq('status', status);
    }

    const { data: bookings, error } = await query;

    if (error) {
      logger.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    return res.status(200).json(bookings || []);
  } catch (error) {
    logger.error('Bookings list error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
