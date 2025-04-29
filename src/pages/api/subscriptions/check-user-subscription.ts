import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get the business profile along with subscription status
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching business profile:', profileError);
      return res.status(500).json({ error: 'Error fetching business profile' });
    }

    // Get the subscription details if exists
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', session.user.id)
      .eq('status', 'active')
      .maybeSingle();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError);
      return res.status(500).json({ error: 'Error fetching subscription' });
    }

    // Get business listings count
    let listingsCount = 0;
    if (businessProfile) {
      const { data: listingsData, error: listingsError } = await supabase
        .from('business_listings')
        .select('id', { count: 'exact' })
        .eq('business_id', businessProfile.id);

      if (listingsError) {
        console.error('Error counting listings:', listingsError);
      } else {
        listingsCount = listingsData?.length || 0;
      }
    }

    // Return combined profile and subscription data
    return res.status(200).json({
      businessProfile,
      subscription,
      listingsCount,
      hasActiveSubscription: !!subscription,
      maxListings: subscription?.subscription_plans?.max_listings || 0
    });
  } catch (error: any) {
    console.error('Error checking user subscription:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An error occurred while checking the user subscription',
      },
    });
  }
} 