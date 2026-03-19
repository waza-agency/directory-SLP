import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { logger } from '@/lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const userId = session.metadata?.user_id;
    const businessIds = session.metadata?.business_ids?.split(',').filter(Boolean) || [];
    const itemIds = session.metadata?.item_ids?.split(',').filter(Boolean) || [];

    // Create marketplace transactions for each business
    for (const businessId of businessIds) {
      const totalAmount = (session.amount_total || 0) / 100;
      const platformFee = totalAmount * 0.10;
      const sellerPayout = totalAmount - platformFee;

      const { error: txError } = await supabase
        .from('marketplace_transactions')
        .insert({
          business_id: businessId,
          buyer_id: userId,
          stripe_checkout_session_id: sessionId,
          stripe_payment_intent_id: session.payment_intent as string,
          total_amount: totalAmount,
          platform_fee: platformFee,
          seller_payout: sellerPayout,
          status: 'completed',
        });

      if (txError) {
        logger.error('Error creating marketplace transaction:', txError);
      }
    }

    // Update sales counts for listings
    for (const itemId of itemIds) {
      const { error: updateError } = await supabase
        .from('business_listings')
        .update({ sales_count: supabase.rpc('increment', { x: 1 }) as any })
        .eq('id', itemId);

      if (updateError) {
        logger.error('Error incrementing sales count:', updateError);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    logger.error('Error processing marketplace payment:', error);
    return res.status(500).json({ error: error.message });
  }
}
