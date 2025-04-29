import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';

// Initialize Stripe with better error handling
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(stripeKey as string, {
  apiVersion: '2024-04-10',
});

// Check if service role key is available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Log environment variables in development (without exposing the actual keys)
if (process.env.NODE_ENV !== 'production') {
  console.log('API environment variables check:', {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? 'defined' : 'undefined',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? 'defined' : 'undefined',
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey ? 'defined' : 'undefined',
    STRIPE_SECRET_KEY: stripeKey ? 'defined' : 'undefined'
  });
}

// Initialize Supabase with service role key for admin access, or fallback to anon key
const supabase = createClient(
  supabaseUrl,
  serviceRoleKey || anonKey
);

// If no service role key, log a warning
if (!serviceRoleKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is not defined. Using NEXT_PUBLIC_SUPABASE_ANON_KEY instead, which may not have sufficient permissions.');
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify Stripe is initialized
    if (!stripeKey) {
      return res.status(500).json({ message: 'Stripe configuration missing' });
    }

    // Get all subscriptions from Supabase
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        stripe_subscription_id,
        business_profiles!inner (
          id,
          subscription_status
        )
      `);

    if (subError) {
      console.error('Error fetching subscriptions from Supabase:', subError);
      return res.status(500).json({ 
        message: 'Error fetching subscriptions', 
        error: subError.message,
        details: process.env.NODE_ENV === 'development' ? subError : undefined 
      });
    }

    // If no subscriptions found, return early
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        message: 'No subscriptions to sync',
        stats: {
          total: 0,
          updated: 0,
          errors: 0,
          skipped: 0,
          alreadyCorrect: 0
        }
      });
    }

    // Test Stripe connection first
    try {
      // This will throw if Stripe is not properly configured
      await stripe.subscriptions.list({ limit: 1 });
    } catch (stripeConnectionError: any) {
      console.error('Error connecting to Stripe:', stripeConnectionError);
      return res.status(500).json({
        message: 'Unable to connect to Stripe API',
        error: stripeConnectionError.message,
        details: process.env.NODE_ENV === 'development' ? stripeConnectionError : undefined
      });
    }

    // Track statistics for response
    const stats = {
      total: subscriptions.length,
      updated: 0,
      errors: 0,
      skipped: 0,
      alreadyCorrect: 0,
      invalid: 0
    };

    // Process each subscription
    const updatePromises = subscriptions.map(async (sub) => {
      try {
        // Skip subscriptions without a Stripe ID
        if (!sub.stripe_subscription_id) {
          stats.skipped++;
          return;
        }

        try {
          // Get current status from Stripe
          const stripeSubscription = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);
          
          // Validate the response
          if (!stripeSubscription || !stripeSubscription.status) {
            console.error(`Invalid Stripe subscription data for ${sub.stripe_subscription_id}:`, stripeSubscription);
            stats.invalid++;
            return;
          }
          
          const stripeStatus = stripeSubscription.status;
          
          // Convert Stripe status to our internal format
          const mappedStatus = stripeStatus === 'active' || stripeStatus === 'trialing' 
            ? 'active'
            : stripeStatus === 'canceled' || stripeStatus === 'unpaid'
              ? 'canceled'
              : 'inactive';
          
          // If status matches, no update needed
          if (sub.business_profiles.subscription_status === mappedStatus) {
            stats.alreadyCorrect++;
            return;
          }
          
          console.log(`Updating subscription ${sub.id} from ${sub.business_profiles.subscription_status} to ${mappedStatus}`);
          
          // Update business profile subscription status
          const { error: updateError } = await supabase
            .from('business_profiles')
            .update({ 
              subscription_status: mappedStatus,
              ...(mappedStatus === 'active' && {
                subscription_start_date: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
                subscription_end_date: new Date(stripeSubscription.current_period_end * 1000).toISOString()
              })
            })
            .eq('id', sub.business_profiles.id);
            
          if (updateError) {
            console.error(`Error updating business profile ${sub.business_profiles.id}:`, updateError);
            stats.errors++;
            return;
          }
          
          // IMPORTANT! Also update the subscription record in the subscriptions table
          const { error: subscriptionUpdateError } = await supabase
            .from('subscriptions')
            .update({ 
              status: mappedStatus === 'active' ? 'active' : mappedStatus,
              current_period_start: stripeSubscription.current_period_start ? new Date(stripeSubscription.current_period_start * 1000).toISOString() : null,
              current_period_end: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000).toISOString() : null
            })
            .eq('id', sub.id);

          if (subscriptionUpdateError) {
            console.error(`Error updating subscription record ${sub.id}:`, subscriptionUpdateError);
            stats.errors++;
            return;
          }
          
          // Update user account status
          const { error: userUpdateError } = await supabase
            .from('users')
            .update({ 
              has_active_subscription: mappedStatus === 'active',
              account_type: mappedStatus === 'active' ? 'business' : 'user'
            })
            .eq('id', sub.user_id);
            
          if (userUpdateError) {
            console.error(`Error updating user status for ${sub.user_id}:`, userUpdateError);
            stats.errors++;
            return;
          }
          
          stats.updated++;
        } catch (stripeError: any) {
          // Handle Stripe API errors specifically
          console.error(`Stripe API error for subscription ${sub.id}:`, stripeError.message);
          stats.errors++;
        }
      } catch (error: any) {
        console.error(`Error processing subscription ${sub.id}:`, error.message);
        stats.errors++;
      }
    });
    
    // Wait for all updates to complete
    await Promise.all(updatePromises);
    
    // Return success with stats
    return res.status(200).json({
      message: 'Subscription sync completed',
      stats
    });
  } catch (error: any) {
    console.error('Error syncing subscriptions:', error);
    return res.status(500).json({ 
      message: error?.message || 'Error syncing subscriptions',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Export the handler with admin authentication
export default withAdminApiAuth(handler); 