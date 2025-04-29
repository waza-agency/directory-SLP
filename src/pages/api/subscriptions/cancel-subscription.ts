import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
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
    
    // Get subscription_id from request body
    const { subscription_id } = req.body;
    
    if (!subscription_id) {
      return res.status(400).json({ message: 'Subscription ID is required' });
    }
    
    // Fetch the subscription from our database
    const { data: subscription, error } = await supabase
      .from('business_subscriptions')
      .select('*')
      .eq('id', subscription_id)
      .eq('user_id', session.user.id)
      .single();
    
    if (error || !subscription) {
      console.error('Error fetching subscription:', error);
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });
    
    // If there's a Stripe subscription, cancel it
    if (subscription.stripe_subscription_id) {
      try {
        // Cancel the subscription at period end
        await stripe.subscriptions.update(
          subscription.stripe_subscription_id,
          { cancel_at_period_end: true }
        );
      } catch (stripeError) {
        console.error('Error canceling Stripe subscription:', stripeError);
        return res.status(500).json({ 
          message: 'Error canceling subscription in Stripe',
          error: stripeError
        });
      }
    }
    
    // Update the subscription status in our database
    const { error: updateError } = await supabase
      .from('business_subscriptions')
      .update({ 
        status: 'canceling',
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription_id)
      .eq('user_id', session.user.id);
    
    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return res.status(500).json({ 
        message: 'Error updating subscription status',
        error: updateError
      });
    }
    
    return res.status(200).json({
      message: 'Subscription canceled successfully. It will remain active until the end of the current billing period.'
    });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    return res.status(500).json({ message: 'Error canceling subscription' });
  }
} 