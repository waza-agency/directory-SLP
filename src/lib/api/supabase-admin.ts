import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Log environment variables in development (without exposing the actual keys)
if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase Admin client environment variables check:', {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? 'defined' : 'undefined',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? 'defined' : 'undefined',
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey ? 'defined' : 'undefined',
  });
}

// Initialize Supabase with service role key for admin access, or fallback to anon key
export const supabase = createClient<Database>(
  supabaseUrl,
  serviceRoleKey || anonKey
);

// If no service role key, log a warning
if (!serviceRoleKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is not defined. Using NEXT_PUBLIC_SUPABASE_ANON_KEY instead, which may not have sufficient permissions for admin operations.');
} 