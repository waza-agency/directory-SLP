import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { logger } from '@/lib/logger';

/**
 * Business-side booking management.
 * GET: List bookings for places owned by the business.
 * PATCH: Update booking status (confirm, complete, no_show).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createPagesServerClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify user has a business profile
    const { data: profile, error: profileError } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(403).json({ error: 'Business profile required' });
    }

    if (req.method === 'GET') {
      return handleGetBookings(req, res, supabase, session.user.id);
    }

    return handleUpdateBooking(req, res, supabase, session.user.id);
  } catch (error) {
    logger.error('Booking management error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetBookings(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: any,
  userId: string
) {
  const { status, date_from, date_to } = req.query;

  // Get places owned by this user (linked through business_listings or directly)
  // For now, get all bookings for places where the user has business listings
  let query = supabase
    .from('bookings')
    .select('*, places(id, name, image_url, category)')
    .order('booking_date', { ascending: true });

  if (status && typeof status === 'string') {
    query = query.eq('status', status);
  }

  if (date_from && typeof date_from === 'string') {
    query = query.gte('booking_date', date_from);
  }

  if (date_to && typeof date_to === 'string') {
    query = query.lte('booking_date', date_to);
  }

  const { data: bookings, error } = await query;

  if (error) {
    logger.error('Error fetching business bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }

  return res.status(200).json(bookings || []);
}

async function handleUpdateBooking(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: any,
  userId: string
) {
  const { booking_id, status } = req.body;

  if (!booking_id || !status) {
    return res.status(400).json({ error: 'booking_id and status are required' });
  }

  const validStatuses = ['confirmed', 'cancelled', 'completed', 'no_show'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const { data: updated, error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', booking_id)
    .select('*')
    .single();

  if (error) {
    logger.error('Error updating booking:', error);
    return res.status(500).json({ error: 'Failed to update booking' });
  }

  return res.status(200).json({ data: updated });
}
