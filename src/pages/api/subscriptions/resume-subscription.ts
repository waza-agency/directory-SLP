import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

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
    
    // Get the current subscription that is set to cancel
    const { data: subscription, error: subscriptionError } = await supabase
      .from('business_subscriptions')
      .select("*")
      .eq('user_id', session.user.id)
      .eq('status', 'cancelling')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (subscriptionError || !subscription) {
      return res.status(404).json({ 
        message: 'No cancelling subscription found to resume' 
      });
    }
    
    // Resume the subscription in Stripe
    if (subscription.stripe_subscription_id) {
      await stripe.subscriptions.update(
        subscription.stripe_subscription_id,
        { cancel_at_period_end: false }
      );
    }
    
    // Update subscription status in our database
    const { error: updateError } = await supabase
      .from('business_subscriptions')
      .update({ 
        status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id);
      
    if (updateError) {
      console.error('Error updating subscription:', updateError);
      return res.status(500).json({
        message: 'Error updating subscription status'
      });
    }

    return res.status(200).json({ 
      message: 'Subscription resumed successfully',
      subscription: {
        ...subscription,
        status: 'active'
      }
    });
  } catch (error) {
    console.error('Subscription resume error:', error);
    return res.status(500).json({ 
      message: 'Error resuming subscription' 
    });
  }
} 