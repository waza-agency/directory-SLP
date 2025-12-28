import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function isPastEvent(event: any, cutoffDate: string): boolean {
  const cutoff = new Date(cutoffDate);

  if (event.end_date) {
    return new Date(event.end_date) < cutoff;
  }

  if (event.start_date) {
    const startDate = new Date(event.start_date);
    startDate.setHours(startDate.getHours() + 4);
    return startDate < cutoff;
  }

  return false;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cutoffDate = '2025-12-14T00:00:00.000Z';

  if (req.method === 'GET') {
    try {
      const { data: allEvents, error } = await supabase
        .from('events')
        .select('id, title, start_date, end_date, category')
        .order('start_date', { ascending: true });

      if (error) throw error;

      const pastEvents = (allEvents || []).filter(e => isPastEvent(e, cutoffDate));
      const futureEvents = (allEvents || []).filter(e => !isPastEvent(e, cutoffDate));

      return res.status(200).json({
        cutoffDate,
        pastEventsCount: pastEvents.length,
        pastEvents,
        futureEventsCount: futureEvents.length,
        futureEvents,
        totalEventsCount: allEvents?.length || 0
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { data: allEvents, error: fetchError } = await supabase
        .from('events')
        .select('id, title, start_date, end_date')
        .order('start_date', { ascending: true });

      if (fetchError) throw fetchError;

      const pastEvents = (allEvents || []).filter(e => isPastEvent(e, cutoffDate));

      if (pastEvents.length === 0) {
        return res.status(200).json({
          message: 'No past events to delete',
          deletedCount: 0
        });
      }

      const pastEventIds = pastEvents.map(e => e.id);

      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .in('id', pastEventIds);

      if (deleteError) throw deleteError;

      return res.status(200).json({
        message: 'Past events deleted successfully',
        deletedCount: pastEvents.length,
        deletedEvents: pastEvents
      });
    } catch (error) {
      console.error('Error deleting events:', error);
      return res.status(500).json({ error: 'Failed to delete events' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
