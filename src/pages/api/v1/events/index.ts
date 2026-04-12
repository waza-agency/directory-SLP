import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { eventsQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(eventsQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, category, from, to } = parsed.data;

  try {
    let query = supabaseAdmin
      .from('events')
      .select('id, title, description, start_date, end_date, location, category, image_url, featured')
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(limit);

    if (category) query = query.eq('category', category);
    if (from) query = query.gte('start_date', from);
    if (to) query = query.lte('start_date', to);

    const { data, error } = await query;

    if (error) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch events'));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data || [], { total: data?.length || 0, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
