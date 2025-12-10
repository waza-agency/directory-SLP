import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API endpoint for on-demand revalidation of Next.js ISR pages
 *
 * Usage:
 * POST /api/revalidate?path=/
 * POST /api/revalidate?path=/en
 * POST /api/revalidate?path=/places
 *
 * For security, you can add a secret token:
 * POST /api/revalidate?path=/&secret=your-secret-token
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' });
  }

  // Get path from query params
  const path = req.query.path as string;
  const secret = req.query.secret as string;

  // Validate path parameter
  if (!path) {
    return res.status(400).json({
      message: 'Missing path parameter',
      example: '/api/revalidate?path=/'
    });
  }

  // Optional: Add secret token for security
  // Uncomment and set REVALIDATE_SECRET in .env if you want this
  // if (secret !== process.env.REVALIDATE_SECRET) {
  //   return res.status(401).json({ message: 'Invalid secret token' });
  // }

  try {
    // Revalidate the path
    await res.revalidate(path);

    return res.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return res.status(500).json({
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}
