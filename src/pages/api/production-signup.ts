import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface SignupRequest {
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  error?: string;
  user?: any;
  debug?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignupResponse>) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  console.log('Production signup API called');

  try {
    // Validate request body
    const { email, password }: SignupRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      nodeEnv: process.env.NODE_ENV
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error - missing environment variables'
      });
    }

    // Create Supabase client with explicit configuration
    console.log('Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Attempt signup
    console.log('Attempting signup for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Supabase signup error:', error);
      return res.status(400).json({
        success: false,
        error: error.message,
        debug: {
          code: error.status,
          name: error.name
        }
      });
    }

    if (!data?.user) {
      console.error('No user data returned from signup');
      return res.status(400).json({
        success: false,
        error: 'Failed to create user account'
      });
    }

    console.log('Signup successful for user:', data.user.id);

    // Return success response
    return res.status(200).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        emailConfirmed: !!data.user.email_confirmed_at
      }
    });

  } catch (error: any) {
    console.error('Unexpected error in production signup:', error);

    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred',
      debug: process.env.NODE_ENV !== 'production' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
}