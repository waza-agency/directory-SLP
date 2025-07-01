import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

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

    // Check if this is an admin request
    const isAdmin = req.query.admin === 'true';
    const targetUserId = req.query.userId as string || session.user.id;
    
    // For non-admin users, only allow checking their own subscription
    if (!isAdmin && targetUserId !== session.user.id) {
      return res.status(403).json({
        error: 'forbidden',
        description: 'You can only access your own subscription details',
      });
    }
    
    // If admin, verify admin status before proceeding
    if (isAdmin) {
      const { data: adminRoleData } = await supabase
        .from('users')
        .select("*")
        .eq('id', session.user.id)
        .single();
        
      if (adminRoleData?.role !== 'admin') {
        return res.status(403).json({
          error: 'forbidden',
          description: 'Admin access required',
        });
      }
    }
    
    // Use the appropriate client
    const client = isAdmin ? supabaseAdmin : supabase;
    
    // Get the business profile along with subscription status
    const { data: businessProfile, error: profileError } = await client
      .from('business_profiles')
      .select("*")
      .eq('user_id', targetUserId)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching business profile:', profileError);
      return res.status(500).json({ error: 'Error fetching business profile' });
    }

    // Get the subscription details if exists
    const { data: subscription, error: subscriptionError } = await client
      .from('subscriptions')
      .select("*")
      .eq('user_id', targetUserId)
      .eq('status', 'active')
      .maybeSingle();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError);
      return res.status(500).json({ error: 'Error fetching subscription' });
    }

    // Get business listings count
    let listingsCount = 0;
    if (businessProfile) {
      const { data: listingsData, error: listingsError } = await client
        .from('business_listings')
        .select("*")
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