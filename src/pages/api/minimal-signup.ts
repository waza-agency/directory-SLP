import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface MinimalSignupRequest {
  email: string;
  password: string;
}

interface MinimalSignupResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MinimalSignupResponse>) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  console.log('🚀 MINIMAL signup API called');

  try {
    // Validate request body
    const { email, password }: MinimalSignupRequest = req.body;

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Missing Supabase environment variables');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Create Supabase client - MINIMAL CONFIGURATION
    console.log('📡 Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    });

    // Clean and validate email before sending to Supabase
    const cleanEmail = email.trim().toLowerCase();

    // ONLY DO AUTH SIGNUP - NO DATABASE OPERATIONS
    console.log('🔐 Attempting MINIMAL auth signup for:', cleanEmail);
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        // Minimal options to avoid production issues
        emailRedirectTo: undefined,
        data: {},
        captchaToken: undefined
      }
    });

    if (error) {
      console.error('❌ Supabase auth error:', error.message);
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    if (!data?.user) {
      console.error('❌ No user data returned from Supabase');
      return res.status(400).json({
        success: false,
        error: 'Failed to create user account'
      });
    }

    console.log('✅ Minimal signup successful for user:', data.user.id);

    // Return minimal success response
    return res.status(200).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || cleanEmail
      }
    });

  } catch (error: any) {
    console.error('💥 Unexpected error in minimal signup:', error);

    return res.status(500).json({
      success: false,
      error: 'Server error occurred'
    });
  }
}