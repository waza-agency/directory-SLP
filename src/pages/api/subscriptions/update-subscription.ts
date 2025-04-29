import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow PUT method
  if (req.method !== 'PUT') {
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
    
    // Get request body
    const { subscription_id, new_plan_id } = req.body;
    
    if (!subscription_id || !new_plan_id) {
      return res.status(400).json({ message: 'Missing required fields: subscription_id or new_plan_id' });
    }
    
    // Fetch the current subscription
    const { data: subscription, error: subError } = await supabase
      .from('business_subscriptions')
      .select('*, subscription_plans:plan_id(stripe_price_id)')
      .eq('id', subscription_id)
      .eq('user_id', session.user.id)
      .single();
      
    if (subError || !subscription) {
      console.error('Error fetching subscription:', subError);
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    // Check if subscription is active
    if (subscription.status !== 'active') {
      return res.status(400).json({ message: 'Cannot update a non-active subscription' });
    }
    
    // Fetch the new plan details
    const { data: newPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', new_plan_id)
      .single();
      
    if (planError || !newPlan) {
      console.error('Error fetching new plan:', planError);
      return res.status(404).json({ message: 'New subscription plan not found' });
    }
    
    // If it's the same plan, no need to update
    if (subscription.plan_id === newPlan.id) {
      return res.status(200).json({ 
        message: 'No change needed - already on this plan',
        subscription
      });
    }
    
    // Update the subscription in Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    );
    
    // Update the subscription items
    await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        items: [
          {
            id: stripeSubscription.items.data[0].id,
            price: newPlan.stripe_price_id,
          },
        ],
        proration_behavior: 'create_prorations',
      }
    );
    
    // Update the subscription record in our database
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('business_subscriptions')
      .update({
        plan_id: newPlan.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription_id)
      .select()
      .single();
      
    if (updateError) {
      console.error('Error updating subscription record:', updateError);
      return res.status(500).json({ message: 'Error updating subscription record' });
    }
    
    return res.status(200).json({
      message: 'Subscription updated successfully',
      subscription: updatedSubscription
    });
  } catch (error) {
    console.error('Subscription update error:', error);
    return res.status(500).json({ message: 'Error updating subscription' });
  }
} 