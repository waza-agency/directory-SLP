import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

const PLATFORM_FEE_PERCENTAGE = 5; // 5% platform fee

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const supabaseServer = createServerSupabaseClient({ req, res });
    
    // Check if we have a session
    const {
      data: { session },
    } = await supabaseServer.auth.getSession();

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

    // Get order details
    const { data: orderData, error: orderError } = await supabaseServer
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return res.status(500).json({ error: orderError.message });
    }

    // Create or retrieve Stripe customer
    let customerId: string | undefined;
    
    // Check if user already has a Stripe customer ID
    const { data: userData, error: userError } = await supabaseServer
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
      const { error: updateError } = await supabaseServer
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('id', session.user.id);
        
      if (updateError) {
        console.error('Error updating user with Stripe customer ID:', updateError);
      }
    }

    // Group items by business for display purposes
    const groupedItems: Record<string, any[]> = {};
    
    // Format line items for Stripe and find business information
    const lineItems = [];
    const businessTransactions = [];
    
    // Calculate totals for marketplace transactions
    let orderTotal = 0;
    
    for (const item of items) {
      // Add to line items for Stripe checkout (product)
      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      });

      // If shipping_fee > 0, add a separate line item for shipping
      if (item.shipping_fee && Number(item.shipping_fee) > 0) {
        lineItems.push({
          price_data: {
            currency: 'mxn',
            product_data: {
              name: `${item.name} - Shipping`,
            },
            unit_amount: Math.round(Number(item.shipping_fee) * 100),
          },
          quantity: item.quantity,
        });
      }
      
      // Calculate item total
      const itemTotal = item.price * item.quantity;
      orderTotal += itemTotal;
      
      // Get business information if it's a marketplace listing
      if (item.businessId || item.sellerId) {
        // Use businessId if available, otherwise use sellerId for backward compatibility
        const businessId = item.businessId || item.sellerId;
        
        // Get business details from business_profiles
        const { data: businessData, error: businessError } = await supabaseServer
          .from('business_profiles')
          .select('stripe_connect_account_id, id, business_name, user_id')
          .eq('id', businessId)
          .single();
        
        if (businessError) {
          console.error('Error fetching business data:', businessError);
          continue;
        }
        
        if (!businessData.stripe_connect_account_id) {
          console.error('Business does not have a Stripe Connect account:', businessId);
          continue;
        }
        
        // Calculate fees
        const platformFee = (itemTotal * PLATFORM_FEE_PERCENTAGE) / 100;
        
        // Estimate Stripe fee (2.9% + 30 cents)
        const stripeFee = (itemTotal * 0.029) + 0.30;
        
        // Calculate business payout
        const businessPayout = itemTotal - platformFee - stripeFee;
        
        // Save transaction info for later processing
        businessTransactions.push({
          order_id: orderId,
          business_id: businessId,
          business_user_id: businessData.user_id,
          buyer_id: session.user.id,
          product_id: item.id,
          amount: itemTotal,
          platform_fee: platformFee,
          stripe_fee: stripeFee,
          business_payout: businessPayout,
          stripe_connect_account_id: businessData.stripe_connect_account_id,
          status: 'pending'
        });
        
        // Group items by business for display
        if (!groupedItems[businessId]) {
          groupedItems[businessId] = [];
        }
        groupedItems[businessId].push(item);
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
        isMarketplace: 'true',
      },
    });

    // Store business transactions in database
    if (businessTransactions.length > 0) {
      const { error: transactionError } = await supabaseServer
        .from('marketplace_transactions')
        .insert(businessTransactions);
      
      if (transactionError) {
        console.error('Error creating marketplace transactions:', transactionError);
      }
    }

    // Update the order with the Stripe session ID and status
    const { error: orderUpdateError } = await supabaseServer
      .from('orders')
      .update({ 
        stripe_session_id: checkoutSession.id,
        status: 'awaiting_payment' 
      })
      .eq('id', orderId);

    if (orderUpdateError) {
      console.error('Error updating order with Stripe session ID:', orderUpdateError);
    }

    res.status(200).json({ sessionId: checkoutSession.id });
  } catch (error: any) {
    console.error('Error creating marketplace checkout session:', error);
    res.status(500).json({
      error: {
        message: error.message || 'An error occurred during checkout',
      },
    });
  }
} 