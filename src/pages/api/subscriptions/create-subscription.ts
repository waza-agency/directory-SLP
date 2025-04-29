import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Get request body
    const { plan_id, payment_method_id, business_id } = req.body;
    
    if (!plan_id || !payment_method_id) {
      return res.status(400).json({ message: 'Missing required fields: plan_id or payment_method_id' });
    }
    
    // Fetch the plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', plan_id)
      .single();
      
    if (planError || !plan) {
      console.error('Error fetching plan:', planError);
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    
    // Check if user already has an active subscription
    const { data: existingSubscription, error: subscriptionError } = await supabase
      .from('business_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .or('status.eq.active,status.eq.cancelling')
      .maybeSingle();
      
    if (subscriptionError) {
      console.error('Error checking existing subscription:', subscriptionError);
      return res.status(500).json({ message: 'Error checking existing subscription' });
    }
    
    if (existingSubscription) {
      return res.status(409).json({ 
        message: 'You already have an active subscription',
        subscription: existingSubscription
      });
    }
    
    // Get or create a Stripe customer for the user
    let customerId: string;
    
    const { data: customer } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();
      
    if (customer && customer.stripe_customer_id) {
      customerId = customer.stripe_customer_id;
    } else {
      // Get user details for creating a new customer
      const { data: userData } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', session.user.id)
        .single();
        
      // Create a new customer in Stripe
      const newCustomer = await stripe.customers.create({
        email: userData?.email || session.user.email,
        name: userData?.full_name,
        metadata: {
          user_id: session.user.id
        }
      });
      
      customerId = newCustomer.id;
      
      // Update user with Stripe customer ID
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', session.user.id);
    }
    
    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(payment_method_id, {
      customer: customerId,
    });
    
    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: payment_method_id,
      },
    });
    
    // Create the subscription in Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: plan.stripe_price_id,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });
    
    // Create subscription record in our database
    const { data: newSubscription, error: createError } = await supabase
      .from('business_subscriptions')
      .insert({
        user_id: session.user.id,
        business_id: business_id || null,
        plan_id: plan.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (createError) {
      console.error('Error creating subscription record:', createError);
      // Cancel the Stripe subscription if we couldn't create the record
      await stripe.subscriptions.del(subscription.id);
      return res.status(500).json({ message: 'Error creating subscription record' });
    }
    
    return res.status(200).json({
      message: 'Subscription created successfully',
      subscription: newSubscription,
      client_secret: (subscription.latest_invoice as any).payment_intent?.client_secret || null
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return res.status(500).json({ message: 'Error creating subscription' });
  }
} 