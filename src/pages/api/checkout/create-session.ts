import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

// CORS middleware
function cors(req: NextApiRequest, res: NextApiResponse) {
  // Get the origin from the request headers
  const origin = req.headers.origin || '';

  // Allow the actual origin in production, or localhost in development
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-30',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('API Request received:', {
      method: req.method,
      url: req.url,
      headers: {
        origin: req.headers.origin,
        host: req.headers.host,
        referer: req.headers.referer,
      },
      body: {
        orderId: req.body?.orderId,
        itemsCount: req.body?.items?.length,
        customerEmail: req.body?.customerEmail,
      }
    });

    if (cors(req, res)) return;

    if (req.method !== 'POST') {
      return res.status(405).json({ error: { message: 'Method not allowed' } });
    }

    // Create authenticated Supabase client
    console.log('Creating Supabase client...');
    const supabase = createPagesServerClient({ req, res });

    // Check if we have a session
    console.log('Checking session...');
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log('No session found');
      return res.status(401).json({
        error: {
          message: 'Not authenticated',
          description: 'The user does not have an active session or is not authenticated',
        }
      });
    }
    console.log('Session found:', session.user.id);

    const { orderId, items, customerEmail } = req.body;
    console.log('Request body:', {
      orderId,
      items: items ? items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })) : null,
      customerEmail
    });

    if (!orderId || !items || items.length === 0) {
      console.log('Invalid request data');
      return res.status(400).json({
        error: {
          message: 'Invalid request',
          description: 'Order ID and items are required',
        }
      });
    }

    // Format line items for Stripe
    console.log('Formatting line items...');
    const lineItems = items.map((item: any) => {
      const lineItem = {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
      console.log('Created line item:', lineItem);
      return lineItem;
    });

    // Create Stripe customer if they don't already have one
    let customerId: string | undefined;

    // Check if user already has a Stripe customer ID
    console.log('Checking for existing Stripe customer...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.error('Error fetching user data:', userError);
      throw new Error('Failed to fetch user data');
    }

    if (userData?.stripe_customer_id) {
      console.log('Found existing Stripe customer:', userData.stripe_customer_id);
      customerId = userData.stripe_customer_id;
    } else {
      console.log('Creating new Stripe customer...');
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: customerEmail || session.user.email,
        metadata: {
          userId: session.user.id,
        },
      });

      customerId = customer.id;
      console.log('Created new Stripe customer:', customerId);

      // Save the Stripe customer ID to the user's profile
      console.log('Saving Stripe customer ID to user profile...');
      const { error: updateError } = await supabase
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating user with Stripe customer ID:', updateError);
        // Don't throw here, as this is not critical
      }
    }

    // Create a checkout session
    console.log('Creating Stripe checkout session with data:', {
      customer: customerId,
      lineItems,
      successUrl: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${req.headers.origin}/checkout?canceled=true`,
      metadata: {
        orderId,
        userId: session.user.id,
      }
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      metadata: {
        orderId,
        userId: session.user.id,
      },
    });
    console.log('Checkout session created:', checkoutSession.id);

    // Update the order with the Stripe session ID
    console.log('Updating order with session ID...');
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({ stripe_session_id: checkoutSession.id })
      .eq('id', orderId);

    if (orderUpdateError) {
      console.error('Error updating order with Stripe session ID:', orderUpdateError);
      // Don't throw here, as the checkout session is already created
    }

    res.status(200).json({ sessionId: checkoutSession.id });
  } catch (error: any) {
    console.error('Detailed error in checkout session creation:', {
      message: error.message,
      stack: error.stack,
      type: error.type,
      code: error.code,
      param: error.param,
      raw: error,
      env: {
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        nodeEnv: process.env.NODE_ENV,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL
      }
    });
    res.status(500).json({
      error: {
        message: error.message || 'An error occurred during checkout',
        type: error.type,
        code: error.code,
        param: error.param
      },
    });
  }
}