import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabase } from '@/lib/supabase-admin';

// Disable default body parser since we need the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// Webhook handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the raw body for signature verification
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    // Verify the event with Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    if (!webhookSecret) {
      return res.status(500).json({ error: 'Stripe webhook secret is not configured' });
    }

    // Construct and verify the event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ 
      error: 'Error processing webhook',
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// Handle checkout.session.completed event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer) {
    console.error('No customer ID in checkout session');
    return;
  }

  const customerId = typeof session.customer === 'string' 
    ? session.customer 
    : session.customer.id;

  // Associate Stripe customer with user in database
  if (session.client_reference_id) {
    const userId = session.client_reference_id;
    const { error } = await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user with Stripe customer ID:', error);
    }
  } else {
    console.warn('No client_reference_id found in session, cannot update user');
  }

  // If there's a subscription in the session, handle it
  if (session.subscription) {
    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription.id;
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionChange(subscription);
  }
}

// Handle subscription changes (created or updated)
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  if (!subscription.customer) {
    console.error('No customer ID in subscription');
    return;
  }

  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id;

  // Get the user with this customer ID
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId);

  if (userError || !users?.length) {
    console.error('Error finding user with Stripe customer ID:', userError || 'No user found');
    return;
  }

  const userId = users[0].id;

  // Get details for updating user's subscription status
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;
  const productId = subscription.items.data[0]?.price.product as string;

  // Update subscription data in database
  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      subscription_id: subscription.id,
      status,
      price_id: priceId,
      product_id: productId,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      created_at: new Date(subscription.created * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (updateError) {
    console.error('Error updating user subscription data:', updateError);
  }

  // If subscription is active, update any related functionality
  if (status === 'active' || status === 'trialing') {
    // For example, update user permissions or access levels
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ is_subscribed: true })
      .eq('id', userId);

    if (userUpdateError) {
      console.error('Error updating user subscription status:', userUpdateError);
    }
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  if (!subscription.customer) {
    console.error('No customer ID in deleted subscription');
    return;
  }

  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id;

  // Find user with this customer ID
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId);

  if (userError || !users?.length) {
    console.error('Error finding user with Stripe customer ID:', userError || 'No user found');
    return;
  }

  const userId = users[0].id;

  // Update subscription status to cancelled
  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (updateError) {
    console.error('Error updating cancelled subscription:', updateError);
  }

  // Update user subscription status
  const { error: userUpdateError } = await supabase
    .from('users')
    .update({ is_subscribed: false })
    .eq('id', userId);

  if (userUpdateError) {
    console.error('Error updating user subscription status:', userUpdateError);
  }
} 