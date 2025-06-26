import { NextApiRequest, NextApiResponse } from 'next';

interface EnvCheckResponse {
  environment: string;
  supabase: {
    url: {
      exists: boolean;
      valid: boolean;
      domain?: string;
    };
    anonKey: {
      exists: boolean;
      valid: boolean;
      keyPrefix?: string;
    };
  };
  nextjs: {
    version?: string;
    nodeEnv: string;
  };
  deployment: {
    vercel?: boolean;
    netlify?: boolean;
    other?: boolean;
  };
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<EnvCheckResponse>) {
  console.log('Production environment check requested');

  try {
    // Check Supabase URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseUrlExists = !!supabaseUrl;
    const supabaseUrlValid = supabaseUrl ? supabaseUrl.includes('supabase.co') : false;
    const supabaseDomain = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

    // Check Supabase Anon Key
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseAnonKeyExists = !!supabaseAnonKey;
    const supabaseAnonKeyValid = supabaseAnonKey ?
      (supabaseAnonKey.startsWith('eyJ') && supabaseAnonKey.length > 100) : false;
    const keyPrefix = supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : undefined;

    // Check deployment platform
    const isVercel = !!process.env.VERCEL;
    const isNetlify = !!process.env.NETLIFY;
    const isOther = !isVercel && !isNetlify;

    // Get Next.js version if available
    const nextVersion = process.env.npm_package_dependencies_next || 'unknown';

    const response: EnvCheckResponse = {
      environment: process.env.NODE_ENV || 'unknown',
      supabase: {
        url: {
          exists: supabaseUrlExists,
          valid: supabaseUrlValid,
          domain: supabaseDomain
        },
        anonKey: {
          exists: supabaseAnonKeyExists,
          valid: supabaseAnonKeyValid,
          keyPrefix: keyPrefix
        }
      },
      nextjs: {
        version: nextVersion,
        nodeEnv: process.env.NODE_ENV || 'unknown'
      },
      deployment: {
        vercel: isVercel,
        netlify: isNetlify,
        other: isOther
      },
      timestamp: new Date().toISOString()
    };

    // Log the results for debugging
    console.log('Production environment check results:', {
      supabaseUrlExists,
      supabaseUrlValid,
      supabaseAnonKeyExists,
      supabaseAnonKeyValid,
      environment: process.env.NODE_ENV,
      platform: isVercel ? 'Vercel' : isNetlify ? 'Netlify' : 'Other'
    });

    res.status(200).json(response);

  } catch (error: any) {
    console.error('Error checking production environment:', error);

    res.status(500).json({
      environment: process.env.NODE_ENV || 'unknown',
      supabase: {
        url: { exists: false, valid: false },
        anonKey: { exists: false, valid: false }
      },
      nextjs: {
        nodeEnv: process.env.NODE_ENV || 'unknown'
      },
      deployment: {
        vercel: false,
        netlify: false,
        other: true
      },
      timestamp: new Date().toISOString()
    });
  }
}