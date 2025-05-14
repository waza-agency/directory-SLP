import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';
import { supabase } from '@/lib/supabase';

// Disable body parsing, need the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Supabase with admin/service role key for webhook processing
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  try {
    // First check if an order already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', session.id)
      .single();

    // Get line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Determine order status based on payment status
    let orderStatus = 'processing';
    if (session.payment_status === 'paid') {
      orderStatus = 'completed';
    } else if (session.status === 'expired' || session.status === 'canceled') {
      orderStatus = 'cancelled';
    }

    if (existingOrder) {
      // Update existing order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({
          status: orderStatus,
          payment_status: session.payment_status,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingOrder.id)
        .select()
        .single();

      if (orderError) {
        console.error('Error updating order:', orderError);
        throw orderError;
      }

      // If order is completed, create order items if they don't exist
      if (orderStatus === 'completed' && order && lineItems.data.length > 0) {
        const { data: existingItems } = await supabase
          .from('order_items')
          .select('id')
          .eq('order_id', order.id);

        if (!existingItems || existingItems.length === 0) {
          const orderItems = lineItems.data.map(item => ({
            order_id: order.id,
            item_id: item.price?.product as string,
            quantity: item.quantity || 1,
            price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) {
            console.error('Error creating order items:', itemsError);
          }
        }
      }

      return order;
    } else {
      // Generate order number
      const orderNumber = 'SLP-' + Math.floor(100000 + Math.random() * 900000).toString();

      // Calculate total amount
      const amount = session.amount_total ? session.amount_total / 100 : 0;

      // Create order items array
      const items = lineItems.data.map(item => ({
        title: item.description || 'Unknown Item',
        quantity: item.quantity || 1,
        price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0
      }));

      // Get customer details
      const customer = session.customer_details;
      const shippingAddress = session.shipping_details || customer?.address;

      // Create new order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: session.metadata?.user_id,
            order_number: orderNumber,
            status: orderStatus,
            amount: amount,
            items: items,
            shipping_address: shippingAddress,
            payment_intent_id: session.payment_intent as string,
            payment_status: session.payment_status,
            stripe_session_id: session.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      // If order is completed, create order items
      if (orderStatus === 'completed' && order && lineItems.data.length > 0) {
        const orderItems = lineItems.data.map(item => ({
          order_id: order.id,
          item_id: item.price?.product as string,
          quantity: item.quantity || 1,
          price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Error creating order items:', itemsError);
        }
      }

      return order;
    }
  } catch (error) {
    console.error('Error in handleCheckoutSession:', error);
    throw error;
  }
}

// Webhook handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const error = err as Error;
      console.error('Webhook signature verification failed:', error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
          const order = await handleCheckoutSession(session);
          console.log('Order processed successfully:', order);
        } catch (error) {
          console.error('Error processing order:', error);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
          const order = await handleCheckoutSession(session);
          console.log('Order marked as expired:', order);
        } catch (error) {
          console.error('Error handling expired session:', error);
        }
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
      case 'account.updated': {
        const account = event.data.object as Stripe.Account;
        await handleAccountUpdated(account);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Get customer ID from subscription
  const customerId = subscription.customer as string;

  // Find user with this Stripe customer ID
  const { data: userData, error: userError } = await supabaseClient
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (userError) {
    console.error('Error finding user for subscription:', userError);
    return;
  }

  if (!userData) {
    console.error('No user found for customer ID:', customerId);
    return;
  }

  const userId = userData.id;

  // Update business profile with subscription status
  const { data: businessProfile, error: profileError } = await supabaseClient
    .from('business_profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error('Error finding business profile:', profileError);
    return;
  }

  // Extract subscription details
  const status = subscription.status;
  const currentPeriodEnd = new Date((subscription as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000).toISOString();

  if (businessProfile) {
    // Update existing business profile
    const { error: updateError } = await supabaseClient
      .from('business_profiles')
      .update({
        subscription_status: status,
        subscription_id: subscription.id,
        subscription_end_date: currentPeriodEnd,
        updated_at: new Date().toISOString()
      })
      .eq('id', businessProfile.id);

    if (updateError) {
      console.error('Error updating business profile subscription:', updateError);
    }
  } else {
    // Create new business profile with subscription
    const { error: createError } = await supabaseClient
      .from('business_profiles')
      .insert({
        user_id: userId,
        subscription_status: status,
        subscription_id: subscription.id,
        subscription_end_date: currentPeriodEnd
      });

    if (createError) {
      console.error('Error creating business profile with subscription:', createError);
    }
  }

  // Also update subscriptions table if it exists
  try {
    const { error: subError } = await supabaseClient
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'stripe_subscription_id'
      });

    if (subError) {
      console.error('Error updating subscription record:', subError);
    }
  } catch (error) {
    // Table might not exist, that's ok
    console.warn('Could not update subscriptions table, it might not exist:', error);
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Find user with this subscription
  const { data: userSubscription, error: subError } = await supabaseClient
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (subError) {
    console.error('Error finding subscription record:', subError);

    // Try finding by customer ID as fallback
    const customerId = subscription.customer as string;
    const { data: userData, error: userError } = await supabaseClient
      .from('users')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (userError) {
      console.error('Error finding user for deleted subscription:', userError);
      return;
    }

    if (userData) {
      // Update business profile
      const { error: updateError } = await supabaseClient
        .from('business_profiles')
        .update({
          subscription_status: 'canceled',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userData.id);

      if (updateError) {
        console.error('Error updating business profile for canceled subscription:', updateError);
      }
    }

    return;
  }

  if (!userSubscription) {
    console.error('No subscription record found for:', subscription.id);
    return;
  }

  // Update business profile subscription status
  const { error: updateError } = await supabaseClient
    .from('business_profiles')
    .update({
      subscription_status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userSubscription.user_id);

  if (updateError) {
    console.error('Error updating business profile for canceled subscription:', updateError);
  }

  // Also update subscription record
  const { error: subUpdateError } = await supabaseClient
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id);

  if (subUpdateError) {
    console.error('Error updating subscription record status:', subUpdateError);
  }
}

// Handle Connect account updates
async function handleAccountUpdated(account: Stripe.Account) {
  // Find user with this Stripe account ID
  const { data: userData, error: userError } = await supabaseClient
    .from('users')
    .select('id')
    .eq('stripe_account_id', account.id)
    .single();

  if (userError) {
    console.error('Error finding user for Stripe Connect account:', userError);
    return;
  }

  if (!userData) {
    console.error('No user found for Stripe Connect account ID:', account.id);
    return;
  }

  // Update the user's seller status based on account capabilities
  const { error: updateError } = await supabaseClient
    .from('users')
    .update({
      stripe_account_enabled: account.charges_enabled,
      seller_details: {
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
        requirements: account.requirements,
        updated_at: new Date().toISOString()
      }
    })
    .eq('id', userData.id);

  if (updateError) {
    console.error('Error updating user seller status:', updateError);
  }
}