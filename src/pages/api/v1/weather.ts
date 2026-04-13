import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const SLP_LAT = 22.1565;
const SLP_LON = -100.9855;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return res.status(503).json(apiError('SERVICE_UNAVAILABLE', 'Weather service not configured'));
    }

    const response = await fetch(
      `${OPENWEATHER_URL}?lat=${SLP_LAT}&lon=${SLP_LON}&units=metric&appid=${apiKey}`
    );
    const raw = await response.json();

    const data = {
      temperature: raw.main?.temp,
      feels_like: raw.main?.feels_like,
      humidity: raw.main?.humidity,
      condition: raw.weather?.[0]?.main,
      description: raw.weather?.[0]?.description,
      wind_speed: raw.wind?.speed,
      city: 'San Luis Potosí',
      updated_at: new Date().toISOString(),
    };

    setCacheHeaders(res, 180); // 3 min cache
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Failed to fetch weather'));
  }
}
