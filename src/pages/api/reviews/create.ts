import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createPagesServerClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { place_id, rating, text } = req.body;

    if (!place_id || !rating || !text) {
      return res.status(400).json({ error: 'Missing required fields: place_id, rating, text' });
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
    }

    if (text.trim().length < 10) {
      return res.status(400).json({ error: 'Review text must be at least 10 characters' });
    }

    const author = session.user.user_metadata?.full_name
      || session.user.email?.split('@')[0]
      || 'Anonymous';

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        place_id,
        author,
        rating,
        text: text.trim(),
      })
      .select('*')
      .single();

    if (error) {
      // Review insert failed
      return res.status(500).json({ error: 'Failed to create review' });
    }

    // Update place average rating
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('place_id', place_id);

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await supabase
        .from('places')
        .update({
          rating: Math.round(avgRating * 10) / 10,
          review_count: reviews.length,
        })
        .eq('id', place_id);
    }

    return res.status(201).json(data);
  } catch (error) {
    // Unexpected error in review creation
    return res.status(500).json({ error: 'Internal server error' });
  }
}
