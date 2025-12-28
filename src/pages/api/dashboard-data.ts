import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchDashboardData, DashboardData } from '@/lib/api/dashboard-data';

// Cache the response for 10 minutes
let cachedData: DashboardData | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = Date.now();

    // Return cached data if still valid
    if (cachedData && now - cacheTime < CACHE_DURATION) {
      return res.status(200).json(cachedData);
    }

    // Fetch fresh data
    const data = await fetchDashboardData();

    // Update cache
    cachedData = data;
    cacheTime = now;

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Dashboard data API error:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}
