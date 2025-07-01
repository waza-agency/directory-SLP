import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    headers: {
      'user-agent': req.headers['user-agent'],
      'host': req.headers.host,
      'origin': req.headers.origin,
      'referer': req.headers.referer,
      'cookie': req.headers.cookie ? 'present' : 'missing'
    },
    environmentVariables: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'defined' : 'undefined',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'defined' : 'undefined',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'defined' : 'undefined',
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
    },
    cookies: req.cookies,
    supabaseTest: null as any,
    errors: [] as string[]
  };

  // Test Supabase connection
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createPagesBrowserClient();

      // Test basic connection
      const { data, error } = await supabase.from('users').select.limit(1);

      if (error) {
        debugInfo.supabaseTest = {
          status: 'error',
          error: error.message,
          code: error.code
        };
        debugInfo.errors.push(`Supabase connection error: ${error.message}`);
      } else {
        debugInfo.supabaseTest = {
          status: 'success',
          message: 'Supabase connection successful'
        };
      }
    } else {
      debugInfo.supabaseTest = {
        status: 'error',
        error: 'Missing Supabase environment variables'
      };
      debugInfo.errors.push('Missing Supabase environment variables');
    }
  } catch (error: any) {
    debugInfo.supabaseTest = {
      status: 'error',
      error: error.message
    };
    debugInfo.errors.push(`Supabase test error: ${error.message}`);
  }

  // If this is a POST request, test login functionality
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const supabase = createPagesBrowserClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        debugInfo.loginTest = {
          status: error ? 'error' : 'success',
          error: error?.message,
          hasUser: !!data?.user,
          hasSession: !!data?.session
        };

        if (error) {
          debugInfo.errors.push(`Login test error: ${error.message}`);
        }
      } catch (error: any) {
        debugInfo.loginTest = {
          status: 'error',
          error: error.message
        };
        debugInfo.errors.push(`Login test exception: ${error.message}`);
      }
    }
  }

  return res.status(200).json(debugInfo);
}