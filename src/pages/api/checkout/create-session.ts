import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  businessId?: string;
  type?: string;
  shipping_fee?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const { items, userId } = req.body as { items: CartItem[]; userId: string };

    if (!items || items.length === 0) {
      return res.status(400).json({ error: { message: 'No items provided' } });
    }

    if (!userId) {
      return res.status(400).json({ error: { message: 'User ID is required' } });
    }

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const unitAmount = Math.round(item.price * 100); // Convert to cents
      const shippingAmount = Math.round((item.shipping_fee || 0) * 100);

      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.name,
            ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
            metadata: {
              listing_id: item.id,
              business_id: item.businessId || '',
              type: item.type || 'product',
            },
          },
          unit_amount: unitAmount + shippingAmount,
        },
        quantity: item.quantity,
      };
    });

    // Collect business IDs for metadata
    const businessIds = Array.from(new Set(items.map((i) => i.businessId).filter(Boolean)));

    const origin = req.headers.origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        user_id: userId,
        business_ids: businessIds.join(','),
        item_ids: items.map((i) => i.id).join(','),
        source: 'marketplace',
      },
    });

    logger.log('Checkout session created:', session.id);

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    logger.error('Error creating checkout session:', error);
    return res.status(500).json({
      error: { message: error.message || 'Failed to create checkout session' },
    });
  }
}
