import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get more user details from the users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select("*")
      .eq('id', session.user.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Return user data
    return res.status(200).json({
      data: {
        id: session.user.id,
        email: session.user.email,
        ...userData
      }
    });
  } catch (error: any) {
    console.error('User data fetch error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while fetching user data',
    });
  }
} 