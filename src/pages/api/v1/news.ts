import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { newsQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(newsQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, lang } = parsed.data;

  try {
    const { data: headlines, error } = await supabaseAdmin
      .from('news_headlines')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false })
      .limit(limit);

    if (error) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch news'));
    }

    const data = (headlines || []).map((h: Record<string, unknown>) => ({
      id: h.id,
      title: h[`text_${lang}`] || h.text_en,
      summary: h[`summary_${lang}`] || h.summary_en,
      source: h.source,
      source_url: h.source_url,
      created_at: h.created_at,
    }));

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
