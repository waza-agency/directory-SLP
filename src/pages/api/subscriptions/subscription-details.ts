import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Check if this is an admin request
    const isAdmin = req.query.admin === 'true';
    const targetUserId = req.query.userId as string || session.user.id;

    // Get subscription_id from query params
    const { subscription_id } = req.query;
    
    if (!subscription_id || Array.isArray(subscription_id)) {
      return res.status(400).json({ message: 'Valid subscription ID is required' });
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
          description: 'Admin access required'
        });
      }
    }
    
    // Use the appropriate client
    const client = isAdmin ? supabaseAdmin : supabase;
    
    // Fetch the subscription from our database
    const { data: subscription, error } = await client
      .from('business_subscriptions')
      .select(`
        *,
        subscription_plans(*)
      `)
      .eq('id', subscription_id)
      // Only restrict to user_id for non-admin requests
      .eq(isAdmin ? 'id' : 'user_id', isAdmin ? subscription_id : session.user.id)
      .single();
    
    if (error || !subscription) {
      console.error('Error fetching subscription:', error);
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    // For non-admin users, verify they own this subscription
    if (!isAdmin && subscription.user_id !== session.user.id) {
      return res.status(403).json({
        error: 'forbidden',
        description: 'You can only access your own subscription details'
      });
    }
    
    // If there's a stripe_subscription_id, fetch additional details from Stripe
    let stripeSubscription = null;
    
    if (subscription.stripe_subscription_id) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });
      
      try {
        stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripe_subscription_id
        );
      } catch (stripeError) {
        console.error('Error fetching Stripe subscription:', stripeError);
        // Continue without Stripe data if there's an error
      }
    }
    
    return res.status(200).json({
      message: 'Subscription retrieved successfully',
      subscription,
      stripe_details: stripeSubscription
    });
  } catch (error) {
    console.error('Subscription details error:', error);
    return res.status(500).json({ message: 'Error retrieving subscription details' });
  }
} 