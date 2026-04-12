import type { NextApiRequest, NextApiResponse } from 'next';
import { outdoorActivities } from '@/data/outdoor';
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

  const sliced = outdoorActivities.slice(0, limit);

  const data = sliced.map((a) => ({
    slug: a.slug,
    title: resolveKey(a.titleKey, lang),
    description: resolveKey(a.descriptionKey, lang),
    image: a.image,
    path: a.path,
    url: `https://www.sanluisway.com${a.path}`,
    badgeColor: a.badgeColor,
  }));

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
}
