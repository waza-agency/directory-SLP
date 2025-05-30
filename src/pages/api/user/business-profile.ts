import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createPagesServerClient({ req, res });

    // Get user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get user_id from query params or use the authenticated user's ID
    const userId = req.query.user_id || session.user.id;

    // Verify the user has permission to access this profile
    if (userId !== session.user.id) {
      // For security, check if the authenticated user has admin privileges
      const { data: userData } = await supabase
        .from('users')
        .select('account_type')
        .eq('id', session.user.id)
        .single();

      if (!userData || userData.account_type !== 'admin') {
        return res.status(403).json({
          error: 'forbidden',
          description: 'You do not have permission to access this business profile',
        });
      }
    }

    // Get business profile data
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      // If it's a "no rows returned" error, that means the user doesn't have a business profile yet
      if (profileError.code === 'PGRST116') {
        return res.status(404).json({
          error: 'not_found',
          description: 'Business profile not found',
        });
      }

      console.error('Error fetching business profile:', profileError);
      return res.status(500).json({ error: 'Error fetching business profile' });
    }

    // Return business profile data
    return res.status(200).json(businessProfile);
  } catch (error: any) {
    console.error('Business profile fetch error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while fetching the business profile',
    });
  }
}