import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';

// Initialize Stripe with better error handling
const stripeKey = process.env.STRIPE_SECRET_KEY;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if Stripe key is available
    if (!stripeKey) {
      return res.status(500).json({ 
        message: 'Stripe configuration missing',
        details: {
          STRIPE_SECRET_KEY: stripeKey ? 'defined' : 'undefined'
        }
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-04-10',
    });

    // Test Stripe connection by listing a small number of subscriptions
    try {
      console.log('Attempting to connect to Stripe API...');
      const subscriptions = await stripe.subscriptions.list({
        limit: 3
      });

      return res.status(200).json({
        message: 'Stripe connection successful',
        subscriptionCount: subscriptions.data.length,
        subscriptionSample: subscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString()
        }))
      });
    } catch (stripeError: any) {
      console.error('Stripe API error:', stripeError);
      return res.status(500).json({
        message: 'Error connecting to Stripe',
        error: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        details: process.env.NODE_ENV === 'development' ? stripeError : undefined
      });
    }
  } catch (error: any) {
    console.error('Error in test-stripe endpoint:', error);
    return res.status(500).json({ 
      message: error?.message || 'Error testing Stripe connection',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Export the handler with admin authentication
export default withAdminApiAuth(handler); 