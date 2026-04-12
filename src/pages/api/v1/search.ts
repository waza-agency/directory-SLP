import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { guides } from '@/data/guides';
import { outdoorActivities } from '@/data/outdoor';
import { cultureSites } from '@/data/culture';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { searchQuerySchema, parseQuery } from '@/lib/api/v1/validate';
import { resolveKey } from '@/lib/api/v1/i18n';

type SearchResult = {
  type: string;
  slug: string;
  title: string;
  description?: string;
  path?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(searchQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { q, limit, type } = parsed.data;
  const lang = (req.query.lang as string) || 'en';
  const pattern = `%${q}%`;
  const results: SearchResult[] = [];

  try {
    if (type === 'all' || type === 'events') {
      const { data } = await supabaseAdmin
        .from('events')
        .select('title, description, category, start_date')
        .or(`title.ilike.${pattern},description.ilike.${pattern}`)
        .limit(limit);
      for (const e of data || []) {
        results.push({ type: 'event', slug: e.title, title: e.title, description: e.description ?? undefined });
      }
    }

    if (type === 'all' || type === 'places') {
      const { data } = await supabaseAdmin
        .from('places')
        .select('name, description, category, address')
        .or(`name.ilike.${pattern},description.ilike.${pattern}`)
        .limit(limit);
      for (const p of data || []) {
        results.push({ type: 'place', slug: p.name, title: p.name, description: p.description ?? undefined });
      }
    }

    const qLower = q.toLowerCase();

    if (type === 'all' || type === 'guides') {
      for (const g of guides) {
        const title = resolveKey(g.titleKey, lang);
        const desc = resolveKey(g.descriptionKey, lang);
        if (title.toLowerCase().includes(qLower) || desc.toLowerCase().includes(qLower)) {
          results.push({ type: 'guide', slug: g.slug, title, description: desc, path: g.path });
        }
      }
    }

    if (type === 'all' || type === 'outdoor') {
      for (const a of outdoorActivities) {
        const title = resolveKey(a.titleKey, lang);
        if (title.toLowerCase().includes(qLower)) {
          results.push({ type: 'outdoor', slug: a.slug, title, path: a.path });
        }
      }
    }

    if (type === 'all' || type === 'culture') {
      for (const c of cultureSites) {
        const title = resolveKey(c.titleKey, lang);
        if (title.toLowerCase().includes(qLower)) {
          results.push({ type: 'culture', slug: c.slug, title, path: c.path });
        }
      }
    }

    const limited = results.slice(0, limit);
    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(limited, { total: limited.length, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
