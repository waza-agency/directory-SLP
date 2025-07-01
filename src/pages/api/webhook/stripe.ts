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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout session:', session.id, 'Payment status:', session.payment_status);

    // First check if an order already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select("*")
      .eq('stripe_session_id', session.id)
      .single();

    console.log('Existing order found:', existingOrder?.id);

    // Get line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Simplified status logic: only completed or cancelled
    const orderStatus = session.payment_status === 'paid' ? 'completed' : 'cancelled';
    console.log('Setting order status to:', orderStatus);

    if (existingOrder) {
      console.log('Updating existing order:', existingOrder.id);
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

      console.log('Order updated successfully:', order?.id);
      return order;
    } else {
      console.log('Creating new order for session:', session.id);
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

      // Create new order with completed status if payment is successful
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

      console.log('New order created successfully:', order?.id, 'with status:', orderStatus);
      return order;
    }
  } catch (error) {
    console.error('Error in handleCheckoutSession:', error);
    throw error;
  }
}

// Webhook handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log('Webhook event received:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Processing completed session:', session.id);

        try {
          const order = await handleCheckoutSession(session);

          // Handle coupon usage tracking for subscriptions
          if (session.mode === 'subscription' && session.metadata?.couponCode) {
            await handleCouponUsage(session);
          }

          console.log('Successfully processed order:', order?.id);
          return res.json({ success: true, order: order?.id });
        } catch (error) {
          console.error('Error processing checkout session:', error);
          return res.status(500).json({ error: 'Error processing checkout session' });
        }

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('Processing expired session:', expiredSession.id);

        try {
          const order = await handleCheckoutSession(expiredSession);
          console.log('Successfully processed expired session:', order?.id);
        } catch (error) {
          console.error('Error processing expired session:', error);
          return res.status(500).json({ error: 'Error processing expired session' });
        }
        break;

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
        return res.json({ received: true });
    }
  } catch (err) {
    console.error('Error processing webhook:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}

// Handle coupon usage tracking
async function handleCouponUsage(session: Stripe.Checkout.Session) {
  try {
    const couponCode = session.metadata?.couponCode;
    const userId = session.metadata?.userId;
    const businessId = session.metadata?.businessId;

    if (!couponCode || !userId) {
      console.log('No coupon code or user ID in session metadata');
      return;
    }

    console.log('Recording coupon usage:', couponCode, 'for user:', userId);

    // Get coupon details from database
    const { data: coupon, error: couponError } = await supabaseClient
      .from('admin_coupons')
      .select("*")
      .eq('coupon_code', couponCode.toUpperCase())
      .single();

    if (couponError || !coupon) {
      console.error('Error finding coupon for usage tracking:', couponError);
      return;
    }

    // Check if usage already recorded (prevent duplicates)
    const { data: existingUsage } = await supabaseClient
      .from('coupon_usage')
      .select("*")
      .eq('user_id', userId)
      .eq('coupon_code', couponCode.toUpperCase())
      .single();

    if (existingUsage) {
      console.log('Coupon usage already recorded');
      return;
    }

    // Get subscription ID from the session
    let subscriptionId = null;
    if (session.subscription) {
      const { data: subscription } = await supabaseClient
        .from('subscriptions')
        .select("*")
        .eq('stripe_subscription_id', session.subscription)
        .single();

      subscriptionId = subscription?.id;
    }

    // Record coupon usage
    const { error: usageError } = await supabaseClient
      .from('coupon_usage')
      .insert({
        user_id: userId,
        business_profile_id: businessId || null,
        coupon_code: couponCode.toUpperCase(),
        stripe_coupon_id: coupon.stripe_coupon_id,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        subscription_id: subscriptionId,
        stripe_subscription_id: session.subscription as string || null
      });

    if (usageError) {
      console.error('Error recording coupon usage:', usageError);
      return;
    }

    // Update business profile with coupon info
    if (businessId) {
      const { error: profileError } = await supabaseClient
        .from('business_profiles')
        .update({
          coupon_used: couponCode.toUpperCase(),
          coupon_applied_at: new Date().toISOString(),
          coupon_discount_amount: coupon.discount_type === 'amount' ? coupon.discount_value : null,
          coupon_discount_percent: coupon.discount_type === 'percent' ? coupon.discount_value : null
        })
        .eq('id', businessId);

      if (profileError) {
        console.error('Error updating business profile with coupon info:', profileError);
      }
    }

    // Update coupon usage count
    const { error: updateError } = await supabaseClient
      .from('admin_coupons')
      .update({
        times_redeemed: coupon.times_redeemed + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', coupon.id);

    if (updateError) {
      console.error('Error updating coupon usage count:', updateError);
    }

    console.log('Successfully recorded coupon usage for:', couponCode);

  } catch (error) {
    console.error('Error in handleCouponUsage:', error);
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Get customer ID from subscription
  const customerId = subscription.customer as string;

  // Find user with this Stripe customer ID
  const { data: userData, error: userError } = await supabaseClient
    .from('users')
    .select("*")
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
    .select("*")
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
    .select("*")
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (subError) {
    console.error('Error finding subscription record:', subError);

    // Try finding by customer ID as fallback
    const customerId = subscription.customer as string;
    const { data: userData, error: userError } = await supabaseClient
      .from('users')
      .select("*")
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
    .select("*")
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