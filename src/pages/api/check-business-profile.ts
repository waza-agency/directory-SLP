import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create Supabase client
    const supabase = createPagesServerClient({ req, res });

    // Check user_id
    const userId = 'd6e52249-d9a5-40c1-a0db-555f861345f6';

    // Get the business profile data
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching business profile:', profileError);
      return res.status(500).json({ error: 'Error fetching business profile', details: profileError });
    }

    // Get subscription data
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', userId)
      .maybeSingle();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError);
    }

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
    }

    // Get business listings
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('*')
      .eq('business_id', businessProfile?.id || '')
      .order('created_at', { ascending: false });

    if (listingsError && businessProfile) {
      console.error('Error fetching business listings:', listingsError);
    }

    // Return all the data
    return res.status(200).json({
      businessProfile,
      subscription,
      userData,
      listings: listings || []
    });
  } catch (error: any) {
    console.error('Error checking business profile:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An error occurred while checking the business profile',
      },
    });
  }
}