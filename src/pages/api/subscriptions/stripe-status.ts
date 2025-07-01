import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createPagesServerClient({ req, res });

  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get user_id from body or use session user
    const { userId = session.user.id } = req.body;

    // Admin check if not requesting own data
    if (userId !== session.user.id) {
      const { data: userData } = await supabase
        .from('users')
        .select("*")
        .eq('id', session.user.id)
        .single();

      if (!userData || userData.account_type !== 'admin') {
        return res.status(403).json({
          error: 'forbidden',
          description: 'You do not have permission to access this user\'s subscription information',
        });
      }
    }

    // Get the user to check for customer_id
    const { data: user, error: userError } = await supabase
      .from('users')
      .select("*")
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Get business profile to check for customer ID
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select("*")
      .eq('user_id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching business profile:', profileError);
      return res.status(500).json({ error: 'Error fetching business profile' });
    }

    // Check for stripe_customer_id
    const stripeCustomerId = businessProfile?.stripe_customer_id || user?.stripe_customer_id;

    if (!stripeCustomerId) {
      console.log('No Stripe customer ID found for user:', userId);
      return res.status(200).json({ active: false });
    }

    // Get subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      console.log('No active subscriptions found in Stripe for customer:', stripeCustomerId);
      return res.status(200).json({ active: false });
    }

    // Get the subscription details
    const subscription = subscriptions.data[0];
    console.log('Found active subscription in Stripe:', subscription.id);

    // Try to get the plan ID from the subscription
    let planId = businessProfile?.plan_id || null;

    try {
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select("*")
        .eq('stripe_subscription_id', subscription.id)
        .single();

      if (subscriptionData?.plan_id) {
        planId = subscriptionData.plan_id;
      }
    } catch (err) {
      console.log('Could not find plan ID from subscriptions table:', err);
    }

    // Return the active status and subscription details
    return res.status(200).json({
      active: true,
      subscriptionDetails: {
        id: subscription.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        plan_id: planId,
        stripe_subscription_id: subscription.id,
      }
    });
  } catch (error: any) {
    console.error('Error checking Stripe subscription status:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while checking the Stripe subscription status'
    });
  }
}