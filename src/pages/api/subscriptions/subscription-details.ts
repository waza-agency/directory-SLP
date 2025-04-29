import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

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
    
    // Get subscription_id from query params
    const { subscription_id } = req.query;
    
    if (!subscription_id || Array.isArray(subscription_id)) {
      return res.status(400).json({ message: 'Valid subscription ID is required' });
    }
    
    // Fetch the subscription from our database
    const { data: subscription, error } = await supabase
      .from('business_subscriptions')
      .select(`
        *,
        subscription_plans(*)
      `)
      .eq('id', subscription_id)
      .eq('user_id', session.user.id)
      .single();
    
    if (error || !subscription) {
      console.error('Error fetching subscription:', error);
      return res.status(404).json({ message: 'Subscription not found' });
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