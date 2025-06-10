import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';

// Initialize Stripe
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(stripeKey as string, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase with service role key for admin access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey || anonKey
);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔄 Starting Stripe to Database subscription sync...');

    // Step 1: Get all active subscriptions from Stripe
    const stripeSubscriptions = await stripe.subscriptions.list({
      status: 'active',
      limit: 100
    });

    console.log(`Found ${stripeSubscriptions.data.length} active subscriptions in Stripe`);

    if (stripeSubscriptions.data.length === 0) {
      return res.status(200).json({
        message: 'No active subscriptions found in Stripe',
        stats: { total: 0, synced: 0, errors: 0 }
      });
    }

    // Step 2: Get or create default subscription plan
    let { data: subscriptionPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .single();

    if (planError || !subscriptionPlan) {
      console.log('Creating default subscription plan...');

      const { data: newPlan, error: createPlanError } = await supabase
        .from('subscription_plans')
        .insert({
          name: 'Business Profile',
          description: 'Create your business profile and list up to 10 services or products',
          price_monthly: 250.00,
          price_yearly: 2500.00,
          max_listings: 10,
          features: {
            custom_profile: true,
            analytics_dashboard: true,
            priority_support: false
          },
          is_active: true
        })
        .select()
        .single();

      if (createPlanError) {
        console.error('Error creating subscription plan:', createPlanError);
        return res.status(500).json({
          message: 'Error creating subscription plan',
          error: createPlanError.message
        });
      }

      subscriptionPlan = newPlan;
    }

    // Step 3: Process each Stripe subscription
    let syncedCount = 0;
    let errorCount = 0;
    const results = [];

    for (const stripeSubscription of stripeSubscriptions.data) {
      try {
        // Get customer details
        const customer = await stripe.customers.retrieve(stripeSubscription.customer as string);

        if (!customer.email) {
          console.log(`Skipping subscription ${stripeSubscription.id} - no customer email`);
          errorCount++;
          results.push({
            subscription_id: stripeSubscription.id,
            status: 'error',
            message: 'No customer email'
          });
          continue;
        }

        // Find user by email
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, stripe_customer_id')
          .eq('email', customer.email)
          .single();

        if (userError || !userData) {
          // Try to find by Stripe customer ID
          const { data: userByCustomerId } = await supabase
            .from('users')
            .select('id, email')
            .eq('stripe_customer_id', customer.id)
            .single();

          if (!userByCustomerId) {
            console.log(`User not found for email: ${customer.email}`);
            errorCount++;
            results.push({
              subscription_id: stripeSubscription.id,
              customer_email: customer.email,
              status: 'error',
              message: 'User not found'
            });
            continue;
          }

          userData.id = userByCustomerId.id;
          userData.email = userByCustomerId.email;
        }

        // Update user with Stripe customer ID if not set
        if (!userData.stripe_customer_id) {
          await supabase
            .from('users')
            .update({ stripe_customer_id: customer.id })
            .eq('id', userData.id);
        }

        // Check if subscription already exists
        const { data: existingSubscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', stripeSubscription.id)
          .single();

        const subscriptionData = {
          user_id: userData.id,
          plan_id: subscriptionPlan.id,
          status: stripeSubscription.status,
          current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end,
          stripe_subscription_id: stripeSubscription.id,
          stripe_customer_id: customer.id,
          interval: stripeSubscription.items.data[0]?.price?.recurring?.interval || 'monthly',
          updated_at: new Date().toISOString()
        };

        if (existingSubscription) {
          // Update existing subscription
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update(subscriptionData)
            .eq('id', existingSubscription.id);

          if (updateError) {
            console.error(`Error updating subscription:`, updateError);
            errorCount++;
            results.push({
              subscription_id: stripeSubscription.id,
              customer_email: customer.email,
              status: 'error',
              message: 'Failed to update subscription'
            });
            continue;
          }
        } else {
          // Create new subscription
          const { error: insertError } = await supabase
            .from('subscriptions')
            .insert(subscriptionData);

          if (insertError) {
            console.error(`Error creating subscription:`, insertError);
            errorCount++;
            results.push({
              subscription_id: stripeSubscription.id,
              customer_email: customer.email,
              status: 'error',
              message: 'Failed to create subscription'
            });
            continue;
          }
        }

        // Update or create business profile
        const { data: existingProfile } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', userData.id)
          .single();

        const profileData = {
          subscription_status: 'active',
          subscription_id: stripeSubscription.id,
          subscription_start_date: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
          subscription_end_date: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          stripe_customer_id: customer.id,
          updated_at: new Date().toISOString()
        };

        if (existingProfile) {
          await supabase
            .from('business_profiles')
            .update(profileData)
            .eq('id', existingProfile.id);
        } else {
          await supabase
            .from('business_profiles')
            .insert({
              user_id: userData.id,
              business_name: (customer as any).name || customer.email.split('@')[0],
              business_description: 'Business profile created from subscription sync',
              business_category: 'General',
              ...profileData
            });
        }

        // Update user flags
        await supabase
          .from('users')
          .update({
            has_active_subscription: true,
            is_business: true,
            account_type: 'business'
          })
          .eq('id', userData.id);

        syncedCount++;
        results.push({
          subscription_id: stripeSubscription.id,
          customer_email: customer.email,
          status: 'success',
          message: 'Successfully synced'
        });

      } catch (error: any) {
        console.error(`Error processing subscription ${stripeSubscription.id}:`, error);
        errorCount++;
        results.push({
          subscription_id: stripeSubscription.id,
          status: 'error',
          message: error.message
        });
      }
    }

    return res.status(200).json({
      message: 'Stripe subscription sync completed',
      stats: {
        total: stripeSubscriptions.data.length,
        synced: syncedCount,
        errors: errorCount
      },
      results
    });

  } catch (error: any) {
    console.error('Fatal error during sync:', error);
    return res.status(500).json({
      message: 'Sync failed',
      error: error.message
    });
  }
}

export default withAdminApiAuth(handler);