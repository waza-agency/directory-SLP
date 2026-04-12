import type { NextApiRequest, NextApiResponse } from 'next';
import { guides } from '@/data/guides';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const { slug, lang = 'en' } = req.query as { slug: string; lang?: string };

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) {
    return res.status(404).json(apiError('NOT_FOUND', `Guide "${slug}" not found`));
  }

  const data = {
    slug: guide.slug,
    title: resolveKey(guide.titleKey, lang),
    description: resolveKey(guide.descriptionKey, lang),
    badge: resolveKey(guide.badgeKey, lang),
    tags: guide.tags,
    image: guide.image,
    path: guide.path,
    url: `https://www.sanluisway.com${guide.path}`,
  };

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data));
}
