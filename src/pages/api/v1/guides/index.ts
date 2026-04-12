import type { NextApiRequest, NextApiResponse } from 'next';
import { guides } from '@/data/guides';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { guidesQuerySchema, parseQuery } from '@/lib/api/v1/validate';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(guidesQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, tag } = parsed.data;
  const lang = (req.query.lang as string) || 'en';

  let filtered = [...guides];
  if (tag) filtered = filtered.filter((g) => g.tags.includes(tag));
  filtered = filtered.slice(0, limit);

  const data = filtered.map((g) => ({
    slug: g.slug,
    title: resolveKey(g.titleKey, lang),
    description: resolveKey(g.descriptionKey, lang),
    tags: g.tags,
    image: g.image,
    path: g.path,
    url: `https://www.sanluisway.com${g.path}`,
  }));

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
}
