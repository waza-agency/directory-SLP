import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

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

// Initialize Stripe with better error handling
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    // Log the full request details
    console.log('API Request received:', {
      method: req.method,
      url: req.url,
      headers: {
        origin: req.headers.origin,
        host: req.headers.host,
        'content-type': req.headers['content-type'],
      },
      body: {
        orderId: req.body?.orderId,
        itemsCount: req.body?.items?.length,
        customerEmail: req.body?.customerEmail,
      }
    });

    // CORS handling
    if (cors(req, res)) return;

    // Get the user from the session
    const supabase = createServerSupabaseClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { items, success_url, cancel_url } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items' });
    }

    // Validate each item
    for (const item of items) {
      if (!item.name || typeof item.price !== 'number' || item.price <= 0 || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          error: {
            message: 'Each item must have a name, valid price, and quantity',
            code: 'invalid_item_data',
            item
          }
        });
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      success_url: success_url || `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation`,
      cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        user_id: session.user.id, // Add user ID to metadata
      },
      customer_email: session.user.email,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error: any) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
}