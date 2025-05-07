import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

// CORS middleware
function cors(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
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
  apiVersion: '2025-04-30.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createPagesServerClient({ req, res });
    
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    const { orderId, items, customerEmail } = req.body;

    if (!orderId || !items || items.length === 0) {
      return res.status(400).json({
        error: 'invalid_request',
        description: 'Order ID and items are required',
      });
    }

    // Format line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe customer if they don't already have one
    let customerId: string | undefined;
    
    // Check if user already has a Stripe customer ID
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      throw userError;
    }

    if (userData?.stripe_customer_id) {
      customerId = userData.stripe_customer_id;
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: customerEmail || session.user.email,
        metadata: {
          userId: session.user.id,
        },
      });
      
      customerId = customer.id;
      
      // Save the Stripe customer ID to the user's profile
      const { error: updateError } = await supabase
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('id', session.user.id);
        
      if (updateError) {
        console.error('Error updating user with Stripe customer ID:', updateError);
      }
    }

    // Create a checkout session
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

    // Update the order with the Stripe session ID
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({ stripe_session_id: checkoutSession.id })
      .eq('id', orderId);

    if (orderUpdateError) {
      console.error('Error updating order with Stripe session ID:', orderUpdateError);
    }

    res.status(200).json({ sessionId: checkoutSession.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: {
        message: error.message || 'An error occurred during checkout',
      },
    });
  }
} 