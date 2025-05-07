import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

// Disable body parsing, need the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Supabase with admin/service role key for webhook processing
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

// Webhook handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the raw body for signature verification
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    // Verify the event with Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    if (!webhookSecret) {
      return res.status(500).json({ error: 'Stripe webhook secret is not configured' });
    }

    // Construct and verify the event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
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

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Error processing webhook' });
  }
}

// Handle checkout.session.completed event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer) {
    console.error('No customer ID in checkout session');
    return;
  }

  const customerId = typeof session.customer === 'string' 
    ? session.customer 
    : session.customer.id;

  // Associate Stripe customer with user in database
  if (session.client_reference_id) {
    const userId = session.client_reference_id;
    const { error } = await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user with Stripe customer ID:', error);
    }
  } else if (session.metadata?.userId) {
    // Fall back to metadata if client_reference_id not set
    const userId = session.metadata.userId;
    const { error } = await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user with Stripe customer ID:', error);
    }
  } else {
    console.warn('No user ID found in session, cannot update user');
  }

  // If there's a subscription in the session, handle it
  if (session.subscription) {
    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription.id;
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionChange(subscription);
  }

  // If this is a marketplace payment, process transfers to sellers
  if (session.metadata?.isMarketplace === 'true' && session.metadata?.orderId) {
    await processMarketplacePayment(session);
  }

  // Update order status to 'paid' if applicable
  if (session.metadata?.orderId) {
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', session.metadata.orderId);
    
    if (orderError) {
      console.error('Error updating order status:', orderError);
    }
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Get customer ID from subscription
  const customerId = subscription.customer as string;
  
  // Find user with this Stripe customer ID
  const { data: userData, error: userError } = await supabase
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
  const { data: businessProfile, error: profileError } = await supabase
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
    const { error: updateError } = await supabase
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
    const { error: createError } = await supabase
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
    const { error: subError } = await supabase
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
  const { data: userSubscription, error: subError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (subError) {
    console.error('Error finding subscription record:', subError);
    
    // Try finding by customer ID as fallback
    const customerId = subscription.customer as string;
    const { data: userData, error: userError } = await supabase
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
      const { error: updateError } = await supabase
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
  const { error: updateError } = await supabase
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
  const { error: subUpdateError } = await supabase
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
  const { data: userData, error: userError } = await supabase
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
  const { error: updateError } = await supabase
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

// Process marketplace payments and transfers to sellers
async function processMarketplacePayment(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  
  if (!orderId) {
    console.error('No order ID found in marketplace session');
    return;
  }
  
  try {
    // Get marketplace transactions for this order
    const { data: transactions, error: txError } = await supabase
      .from('marketplace_transactions')
      .select('*, business:business_id(stripe_connect_account_id)')
      .eq('order_id', orderId)
      .eq('status', 'pending');
    
    if (txError) {
      console.error('Error fetching marketplace transactions:', txError);
      return;
    }
    
    if (!transactions || transactions.length === 0) {
      console.log('No pending marketplace transactions found for order:', orderId);
      return;
    }
    
    console.log(`Processing ${transactions.length} marketplace transfers`);
    
    // Process each transaction
    for (const transaction of transactions) {
      // Skip if no business account ID
      if (!transaction.business?.stripe_connect_account_id) {
        console.error('Business does not have a Stripe Connect account:', transaction.business_id);
        continue;
      }
      
      const stripeAccountId = transaction.business.stripe_connect_account_id;
      
      try {
        // Create a transfer to the business's connected account
        const transfer = await stripe.transfers.create({
          amount: Math.round(transaction.business_payout * 100), // Convert to cents
          currency: 'mxn',
          destination: stripeAccountId,
          metadata: {
            order_id: orderId,
            transaction_id: transaction.id,
            business_id: transaction.business_id,
            buyer_id: transaction.buyer_id,
            product_id: transaction.product_id
          }
        });
        
        // Update the transaction with the transfer ID and status
        const { error: updateError } = await supabase
          .from('marketplace_transactions')
          .update({
            stripe_transfer_id: transfer.id,
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', transaction.id);
        
        if (updateError) {
          console.error('Error updating marketplace transaction:', updateError);
        }
        
        console.log(`Created transfer ${transfer.id} for business ${transaction.business_id}`);
      } catch (error) {
        console.error(`Error creating transfer for business ${transaction.business_id}:`, error);
        
        // Update transaction status to failed
        const { error: updateError } = await supabase
          .from('marketplace_transactions')
          .update({
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error',
            updated_at: new Date().toISOString()
          })
          .eq('id', transaction.id);
          
        if (updateError) {
          console.error('Error updating failed transaction:', updateError);
        }
      }
    }
  } catch (error) {
    console.error('Error processing marketplace payment:', error);
  }
} 