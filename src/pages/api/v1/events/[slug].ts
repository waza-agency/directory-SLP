import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json(apiError('INVALID_PARAMS', 'Missing required param: slug'));
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .ilike('title', slug.replace(/-/g, '%'))
      .single();

    if (error || !data) {
      return res.status(404).json(apiError('NOT_FOUND', `Event '${slug}' not found`));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
