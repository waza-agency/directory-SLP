import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Require auth for this endpoint
  const { authorization } = req.headers;
  if (!authorization || authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { eventIds, showInCulturalCalendar } = req.body;

  if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
    return res.status(400).json({ message: 'Event IDs are required and must be an array' });
  }

  if (typeof showInCulturalCalendar !== 'boolean') {
    return res.status(400).json({ message: 'showInCulturalCalendar must be a boolean' });
  }

  try {
    // Update the events
    const { data, error } = await supabase
      .from('events')
      .update({ show_in_cultural_calendar: showInCulturalCalendar })
      .in('id', eventIds)
      .select('id, title, category, show_in_cultural_calendar');

    if (error) {
      throw error;
    }

    return res.status(200).json({
      message: `Successfully updated ${data.length} events`,
      updatedEvents: data
    });
  } catch (error) {
    console.error('Error updating events:', error);
    return res.status(500).json({
      message: 'Failed to update events',
      error
    });
  }
} 