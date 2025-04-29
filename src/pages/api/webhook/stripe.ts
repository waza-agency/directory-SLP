import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Get the raw request body for signature verification
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    // Verify the event is from Stripe
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Handle subscription session
        if (session.mode === 'subscription') {
          // Get user ID from metadata
          const userId = session.metadata?.userId;
          
          if (!userId) {
            console.error('No userId found in session metadata');
            return res.status(400).json({ error: 'No userId found in session metadata' });
          }

          // Update business profile with subscription info
          const { error: updateError } = await supabase
            .from('business_profiles')
            .update({
              subscription_status: 'active',
              subscription_id: session.subscription as string,
              subscription_start_date: new Date().toISOString(),
              subscription_end_date: session.metadata?.interval === 'monthly' 
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq('user_id', userId);

          if (updateError) {
            console.error('Error updating business profile subscription status:', updateError);
            return res.status(500).json({ error: 'Error updating business profile subscription status' });
          }

          // Update user's account type
          const { error: userUpdateError } = await supabase
            .from('users')
            .update({ account_type: 'business' })
            .eq('id', userId);

          if (userUpdateError) {
            console.error('Error updating user account type:', userUpdateError);
          }
        } else if (session.metadata?.orderId) {
          // Handle normal checkout session for products/orders
          const orderId = session.metadata.orderId;
        
          if (!orderId) {
            console.error('No orderId found in session metadata');
            return res.status(400).json({ error: 'No orderId found in session metadata' });
          }

          // Update order status to 'paid'
          const { error: updateError } = await supabase
            .from('orders')
            .update({
              status: 'paid',
              payment_id: session.payment_intent as string,
            })
            .eq('id', orderId);

          if (updateError) {
            console.error('Error updating order status:', updateError);
            return res.status(500).json({ error: 'Error updating order status' });
          }
        }

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        
        if (subscriptionId) {
          // Get the subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Get the customer ID
          const customerId = subscription.customer as string;
          
          // Find the business profile with this customer ID
          const { data: profiles, error: findError } = await supabase
            .from('business_profiles')
            .select('id, user_id')
            .eq('stripe_customer_id', customerId);

          if (findError) {
            console.error('Error finding business profile:', findError);
          } else if (profiles && profiles.length > 0) {
            // Update business profile subscription status
            const { error: updateError } = await supabase
              .from('business_profiles')
              .update({ 
                subscription_status: 'active',
                subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
              })
              .eq('id', profiles[0].id);

            if (updateError) {
              console.error('Error updating business subscription status:', updateError);
            }
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        
        if (subscriptionId) {
          // Get the subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Get the customer ID
          const customerId = subscription.customer as string;
          
          // Find the business profile with this customer ID
          const { data: profiles, error: findError } = await supabase
            .from('business_profiles')
            .select('id')
            .eq('stripe_customer_id', customerId);

          if (findError) {
            console.error('Error finding business profile:', findError);
          } else if (profiles && profiles.length > 0) {
            // Update business profile subscription status to past_due
            const { error: updateError } = await supabase
              .from('business_profiles')
              .update({ subscription_status: 'past_due' })
              .eq('id', profiles[0].id);

            if (updateError) {
              console.error('Error updating business subscription status:', updateError);
            }
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        // Find the business profile with this customer ID
        const { data: profiles, error: findError } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('stripe_customer_id', customerId);

        if (findError) {
          console.error('Error finding business profile:', findError);
        } else if (profiles && profiles.length > 0) {
          // Update business profile subscription status to canceled
          const { error: updateError } = await supabase
            .from('business_profiles')
            .update({ 
              subscription_status: 'canceled',
              subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
            })
            .eq('id', profiles[0].id);

          if (updateError) {
            console.error('Error updating business subscription status:', updateError);
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
        
        // Find the order with this payment intent
        const { data: orders, error: findError } = await supabase
          .from('orders')
          .select('id')
          .eq('payment_id', paymentIntent.id);

        if (findError) {
          console.error('Error finding order:', findError);
        } else if (orders && orders.length > 0) {
          // Update order status to 'failed'
          const { error: updateError } = await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', orders[0].id);

          if (updateError) {
            console.error('Error updating order status to failed:', updateError);
          }
        }
        
        break;
      }

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ error: `Webhook handler failed: ${err.message}` });
  }
} 