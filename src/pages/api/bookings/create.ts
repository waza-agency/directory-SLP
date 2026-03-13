import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

const bookingSchema = z.object({
  place_id: z.string().uuid(),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  booking_time: z.string().regex(/^\d{2}:\d{2}$/),
  party_size: z.number().int().min(1).max(50),
  notes: z.string().max(1000).optional(),
  contact_name: z.string().min(1).max(200),
  contact_email: z.string().email().max(320),
  contact_phone: z.string().max(50).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (rateLimit(req, res, { limit: 10, windowSec: 60, prefix: 'bookings-create' })) return;

  try {
    const supabase = createPagesServerClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { place_id, booking_date, booking_time, party_size, notes, contact_name, contact_email, contact_phone } = parsed.data;

    // Validate booking is in the future
    const bookingDateTime = new Date(`${booking_date}T${booking_time}`);
    if (bookingDateTime <= new Date()) {
      return res.status(400).json({ error: 'Booking must be in the future' });
    }

    // Verify place exists
    const { data: place, error: placeError } = await supabase
      .from('places')
      .select('id, name')
      .eq('id', place_id)
      .single();

    if (placeError || !place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: session.user.id,
        place_id,
        booking_date,
        booking_time,
        party_size,
        notes: notes?.trim() || null,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) {
      logger.error('Error creating booking:', error);
      return res.status(500).json({ error: 'Failed to create booking' });
    }

    return res.status(201).json({ data: booking });
  } catch (error) {
    logger.error('Booking creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
