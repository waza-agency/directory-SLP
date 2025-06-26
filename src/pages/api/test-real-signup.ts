import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🧪 Testing real signup');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    });

    // Use REAL email domains that Supabase accepts
    const realDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const randomDomain = realDomains[Math.floor(Math.random() * realDomains.length)];
    const testEmail = `test-${Date.now()}@${randomDomain}`;
    const testPassword = 'test123456';

    console.log('Testing with real domain email:', testEmail);

    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    return res.status(200).json({
      success: !error,
      testEmail: testEmail,
      domain: randomDomain,
      result: {
        user: data?.user ? {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: !!data.user.email_confirmed_at
        } : null,
        error: error ? {
          message: error.message,
          status: error.status,
          name: error.name
        } : null
      },
      message: error ? 'Failed with real domain' : 'SUCCESS with real domain!',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error testing real signup:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}