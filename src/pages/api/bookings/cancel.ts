import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { logger } from '@/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createPagesServerClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { booking_id } = req.body;
    if (!booking_id) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    // Verify booking belongs to user and is cancellable
    const { data: booking, error: findError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .eq('user_id', session.user.id)
      .single();

    if (findError || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel a completed booking' });
    }

    const { data: updated, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', booking_id)
      .eq('user_id', session.user.id)
      .select('*')
      .single();

    if (error) {
      logger.error('Error cancelling booking:', error);
      return res.status(500).json({ error: 'Failed to cancel booking' });
    }

    return res.status(200).json({ data: updated });
  } catch (error) {
    logger.error('Booking cancellation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
