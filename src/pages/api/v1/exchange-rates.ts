import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

const FRANKFURTER_URL = 'https://api.frankfurter.app/latest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  try {
    const response = await fetch(`${FRANKFURTER_URL}?from=MXN&to=USD,EUR,GBP,JPY,CNY`);
    const raw = await response.json();

    const data = {
      base: 'MXN',
      rates: raw.rates || {},
      date: raw.date,
      updated_at: new Date().toISOString(),
    };

    setCacheHeaders(res, 600); // 10 min cache
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Failed to fetch exchange rates'));
  }
}
