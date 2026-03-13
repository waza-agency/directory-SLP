import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const reviewSchema = z.object({
  place_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(5000),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (rateLimit(req, res, { limit: 10, windowSec: 60, prefix: 'reviews' })) return;

  try {
    const supabase = createPagesServerClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const parsed = reviewSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { place_id, rating, text } = parsed.data;

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
