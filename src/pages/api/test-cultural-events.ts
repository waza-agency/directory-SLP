import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get current date for reference
    const currentDate = new Date().toISOString();

    // First, get events with the exact same query as the cultural page
    const { data: events, error } = await supabase
      .from('events')
      .select("*")
      .or('category.eq.cultural,category.eq.arts-culture,category.eq.music')
      .gte('end_date', currentDate)
      .order('start_date', { ascending: true })
      .limit(6);

    // Now, get all events without the date filter to compare
    const { data: allEvents, error: allError } = await supabase
      .from('events')
      .select("*")
      .or('category.eq.cultural,category.eq.arts-culture,category.eq.music');

    // Get events by individual category to see if there's an issue with the OR query
    const { data: artsEvents } = await supabase
      .from('events')
      .select("*")
      .eq('category', 'arts-culture');

    const { data: musicEvents } = await supabase
      .from('events')
      .select("*")
      .eq('category', 'music');

    const { data: culturalEvents } = await supabase
      .from('events')
      .select("*")
      .eq('category', 'cultural');

    if (error) {
      throw error;
    }

    return res.status(200).json({
      currentDate,
      filteredEvents: events || [],
      filteredCount: events?.length || 0,
      allEvents: allEvents || [],
      allCount: allEvents?.length || 0,
      artsEvents: artsEvents || [],
      artsCount: artsEvents?.length || 0,
      musicEvents: musicEvents || [],
      musicCount: musicEvents?.length || 0,
      culturalEvents: culturalEvents || [],
      culturalCount: culturalEvents?.length || 0
    });
  } catch (error) {
    console.error('Error in test cultural events:', error);
    return res.status(500).json({ error: 'Failed to test cultural events query' });
  }
} 