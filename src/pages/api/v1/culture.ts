import type { NextApiRequest, NextApiResponse } from 'next';
import { cultureSites } from '@/data/culture';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { paginationSchema, parseQuery } from '@/lib/api/v1/validate';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(paginationSchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit } = parsed.data;
  const lang = (req.query.lang as string) || 'en';

  const sliced = cultureSites.slice(0, limit);

  const data = sliced.map((s) => ({
    slug: s.slug,
    title: resolveKey(s.titleKey, lang),
    description: resolveKey(s.descriptionKey, lang),
    image: s.image,
    path: s.path,
    url: `https://www.sanluisway.com${s.path}`,
  }));

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
}
