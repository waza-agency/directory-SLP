import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { placesQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(placesQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, category, sort } = parsed.data;

  try {
    let query = supabaseAdmin
      .from('places')
      .select('id, name, category, address, city, phone, website, instagram, latitude, longitude, description, image_url, hours, featured, rating, price_level');

    if (category) query = query.eq('category', category);

    if (sort === 'rating') {
      query = query.order('rating', { ascending: false });
    } else if (sort === 'name') {
      query = query.order('name', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch places'));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data || [], { total: data?.length || 0, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
