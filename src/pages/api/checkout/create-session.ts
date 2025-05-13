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

// Initialize Stripe with better error handling
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    if (req.method !== 'POST') {
      return res.status(405).json({
        error: {
          message: 'Method not allowed',
          code: 'method_not_allowed'
        }
      });
    }

    // Validate required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY');
      return res.status(500).json({
        error: {
          message: 'Server configuration error',
          code: 'missing_stripe_key'
        }
      });
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
          code: 'not_authenticated'
        }
      });
    }

    console.log('Session found:', session.user.id);

    const { orderId, items, customerEmail } = req.body;

    // Validate request data
    if (!orderId) {
      return res.status(400).json({
        error: {
          message: 'Order ID is required',
          code: 'missing_order_id'
        }
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: {
          message: 'Items array is required and must not be empty',
          code: 'invalid_items'
        }
      });
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

    if (!customerEmail) {
      return res.status(400).json({
        error: {
          message: 'Customer email is required',
          code: 'missing_email'
        }
      });
    }

    // Create Stripe checkout session with error handling
    try {
      console.log('Creating Stripe session with items:', items);
      console.log('Environment check:', {
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        origin: req.headers.origin,
        host: req.headers.host
      });

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: customerEmail,
        success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout/cancel`,
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'mxn',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        metadata: {
          orderId,
          userId: session.user.id,
        },
      });

      console.log('Stripe session created successfully:', stripeSession.id);
      return res.status(200).json({ sessionId: stripeSession.id });
    } catch (stripeError: any) {
      console.error('Stripe session creation error:', {
        error: stripeError,
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        declineCode: stripeError.decline_code,
        requestParams: {
          items,
          customerEmail,
          origin: req.headers.origin
        }
      });
      return res.status(500).json({
        error: {
          message: stripeError.message || 'Failed to create checkout session',
          code: 'stripe_error',
          type: stripeError.type,
          decline_code: stripeError.decline_code,
          details: stripeError
        }
      });
    }
  } catch (error: any) {
    console.error('API handler error:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'Internal server error',
        code: 'internal_error',
        details: error
      }
    });
  }
}