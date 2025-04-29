import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase-admin';

// Initialize Stripe with the secret key from env vars
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    // Validate request body
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Check if this is the specific user we're debugging
    const isDebugUser = userId === 'd6e52249-d9a5-40c1-a0db-555f861345f6';

    console.log('[API] stripe-status: Checking subscription for userId:', userId, isDebugUser ? '(DEBUG USER)' : '');

    // Get user's stripe_customer_id from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      console.log('[API] stripe-status: User not found:', userError);
      return res.status(404).json({ error: 'User not found', details: userError?.message });
    }

    const stripeCustomerId = userData.stripe_customer_id;
    console.log('[API] stripe-status: Found stripe_customer_id:', stripeCustomerId, isDebugUser ? `for user ${userData.email}` : '');

    // Get profile data for this user to check current database state
    if (isDebugUser) {
      const { data: profileData } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      console.log('[API] stripe-status: DEBUG - Current business_profile data:', 
        JSON.stringify({
          subscription_status: profileData?.subscription_status,
          subscription_id: profileData?.subscription_id,
          plan_id: profileData?.plan_id,
          subscription_end_date: profileData?.subscription_end_date
        })
      );
    }

    // If no stripe_customer_id found, user is not subscribed
    if (!stripeCustomerId) {
      console.log('[API] stripe-status: No stripe_customer_id, returning isSubscribed: false');
      return res.status(200).json({ 
        active: false,
        isSubscribed: false
      });
    }

    // Get subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
      expand: ['data.default_payment_method', 'data.items.data.price.product'],
    });

    if (isDebugUser) {
      console.log('[API] stripe-status: DEBUG - Raw Stripe subscriptions data:', 
        JSON.stringify(subscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          items: sub.items.data.map(item => ({
            price_id: item.price.id,
            product_id: typeof item.price.product === 'string' 
              ? item.price.product 
              : item.price.product.id,
            product_name: typeof item.price.product === 'string' 
              ? 'unknown' 
              : item.price.product.name
          }))
        })))
      );
    }

    console.log('[API] stripe-status: Found', subscriptions.data.length, 'active subscriptions');

    // Check for active subscriptions
    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      console.log('[API] stripe-status: Active subscription found with ID', subscription.id);
      
      // Get the plan ID from our database based on the Stripe product ID
      const stripeProductId = subscription.items.data[0]?.price.product as string;
      
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('id, name, max_listings, stripe_product_id')
        .eq('stripe_product_id', stripeProductId)
        .maybeSingle();

      if (isDebugUser) {
        console.log('[API] stripe-status: DEBUG - Plan lookup result:', 
          JSON.stringify({
            stripeProductId: stripeProductId,
            planData: planData,
            planError: planError
          })
        );

        // Try to find the plan by iterating through all plans
        const { data: allPlans } = await supabase
          .from('subscription_plans')
          .select('id, name, max_listings, stripe_product_id');
        
        console.log('[API] stripe-status: DEBUG - All available plans:', 
          JSON.stringify(allPlans)
        );
      }

      const planId = planData?.id;
      console.log('[API] stripe-status: Mapped to plan_id:', planId);
      
      // Return subscription details with the format expected by the dashboard
      return res.status(200).json({
        active: true,
        isSubscribed: true,
        subscriptionDetails: {
          id: subscription.id,
          status: subscription.status,
          plan_id: planId,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          productId: stripeProductId,
          priceId: subscription.items.data[0]?.price.id,
          isTrialing: subscription.status === 'trialing',
          trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        }
      });
    }

    // Check if user has any trialing subscriptions
    const trialSubscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'trialing',
      expand: ['data.items.data.price.product'],
    });

    if (isDebugUser && trialSubscriptions.data.length > 0) {
      console.log('[API] stripe-status: DEBUG - Raw Stripe trial subscriptions data:', 
        JSON.stringify(trialSubscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          items: sub.items.data.map(item => ({
            price_id: item.price.id,
            product_id: typeof item.price.product === 'string' 
              ? item.price.product 
              : item.price.product.id,
            product_name: typeof item.price.product === 'string' 
              ? 'unknown' 
              : item.price.product.name
          }))
        })))
      );
    }

    console.log('[API] stripe-status: Found', trialSubscriptions.data.length, 'trial subscriptions');

    if (trialSubscriptions.data.length > 0) {
      const trialSubscription = trialSubscriptions.data[0];
      console.log('[API] stripe-status: Trial subscription found with ID', trialSubscription.id);
      
      // Get the plan ID from our database based on the Stripe product ID
      const stripeProductId = trialSubscription.items.data[0]?.price.product as string;
      
      const { data: planData } = await supabase
        .from('subscription_plans')
        .select('id')
        .eq('stripe_product_id', stripeProductId)
        .maybeSingle();

      const planId = planData?.id;
      console.log('[API] stripe-status: Mapped to plan_id:', planId);
      
      return res.status(200).json({
        active: true,
        isSubscribed: true,
        subscriptionDetails: {
          id: trialSubscription.id,
          status: 'active', // Treat trial as active for our UI
          plan_id: planId,
          current_period_end: new Date(trialSubscription.trial_end! * 1000).toISOString(),
          trialEnd: new Date(trialSubscription.trial_end! * 1000).toISOString(),
          productId: stripeProductId,
          priceId: trialSubscription.items.data[0]?.price.id,
          isTrialing: true
        }
      });
    }

    // Get all Stripe subscriptions for this customer (including non-active ones)
    if (isDebugUser) {
      const allStripeSubscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        expand: ['data.items.data.price.product'],
      });
      
      console.log('[API] stripe-status: DEBUG - All Stripe subscriptions for this customer:', 
        JSON.stringify(allStripeSubscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          created: new Date(sub.created * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          items: sub.items.data.map(item => ({
            price_id: item.price.id,
            product_id: typeof item.price.product === 'string' 
              ? item.price.product 
              : item.price.product.id,
            product_name: typeof item.price.product === 'string' 
              ? 'unknown' 
              : item.price.product.name
          }))
        })))
      );
    }

    // Check if there's an entry in our database that marks this user as having an active subscription
    // This is a fallback for cases where Stripe might be inconsistent
    const { data: businessProfile } = await supabase
      .from('business_profiles')
      .select('subscription_status, subscription_id, plan_id')
      .eq('user_id', userId)
      .single();

    if (businessProfile && businessProfile.subscription_status === 'active' && businessProfile.subscription_id) {
      console.log('[API] stripe-status: Using fallback from business_profiles. Status:', businessProfile.subscription_status);
      
      // Get the plan details
      const { data: planData } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', businessProfile.plan_id)
        .maybeSingle();
        
      if (planData) {
        if (isDebugUser) {
          console.log('[API] stripe-status: DEBUG - Using fallback from business profile with plan data:', 
            JSON.stringify(planData)
          );
        }
        
        // Try to retrieve the subscription from Stripe using the ID stored in the database
        try {
          const subId = businessProfile.subscription_id;
          if (subId && subId.startsWith('sub_')) {
            const stripeSubscription = await stripe.subscriptions.retrieve(subId);
            if (isDebugUser) {
              console.log('[API] stripe-status: DEBUG - Found Stripe subscription with ID from database:', 
                JSON.stringify({
                  id: stripeSubscription.id,
                  status: stripeSubscription.status
                })
              );
            }
            
            // If subscription exists but isn't active, update our database
            if (stripeSubscription.status !== 'active' && stripeSubscription.status !== 'trialing') {
              console.log('[API] stripe-status: Stripe subscription exists but has status:', stripeSubscription.status);
              console.log('[API] stripe-status: Database should be updated to match Stripe status');
            }
          }
        } catch (stripeError) {
          console.log('[API] stripe-status: Error retrieving subscription from Stripe:', 
            isDebugUser ? stripeError : (stripeError as Error).message);
        }
        
        return res.status(200).json({
          active: true,
          isSubscribed: true,
          subscriptionDetails: {
            id: businessProfile.subscription_id,
            status: 'active',
            plan_id: businessProfile.plan_id,
            // Set a far future date if we don't have an explicit end date
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            productId: planData.stripe_product_id,
          }
        });
      }
    }

    // If we get here, user has a stripe customer ID but no active or trial subscription
    console.log('[API] stripe-status: No active subscription found, returning isSubscribed: false');
    return res.status(200).json({ 
      active: false,
      isSubscribed: false 
    });
  } catch (error) {
    console.error('[API] stripe-status: Error checking subscription status:', error);
    return res.status(500).json({ 
      error: 'Failed to check subscription status',
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 