import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const debug = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      supabase: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        urlFormat: process.env.NEXT_PUBLIC_SUPABASE_URL ?
          process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20) + '...' :
          'NOT_SET'
      },
      site: {
        hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET'
      },
      headers: {
        host: req.headers.host,
        userAgent: req.headers['user-agent']?.substring(0, 50) + '...',
        origin: req.headers.origin
      },
      build: {
        nextVersion: process.env.npm_package_dependencies_next || 'unknown',
        nodeVersion: process.version
      }
    };

    return res.status(200).json({
      success: true,
      message: 'Production debug information',
      debug
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}