import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';

// Initialize Stripe with better error handling
const stripeKey = process.env.STRIPE_SECRET_KEY;

// Check if service role key is available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Initialize Supabase with service role key for admin access, or fallback to anon key
const supabase = createClient(
  supabaseUrl,
  serviceRoleKey || anonKey
);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get all subscriptions from Supabase
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        stripe_subscription_id,
        status,
        created_at,
        business_profiles!inner (
          id,
          business_name,
          subscription_status,
          user_id
        ),
        users!inner (
          id,
          email,
          has_active_subscription,
          account_type
        )
      `);

    if (subError) {
      console.error('Error fetching subscriptions from Supabase:', subError);
      return res.status(500).json({ 
        message: 'Error fetching subscriptions', 
        error: subError.message
      });
    }

    // If no subscriptions found, return early
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        message: 'No subscriptions found in Supabase',
        subscriptions: []
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey as string, {
      apiVersion: '2024-04-10',
    });

    // Get all Stripe subscriptions
    const stripeSubscriptions = await stripe.subscriptions.list({
      limit: 100,
    });

    // Create a lookup of Stripe subscription data by ID
    const stripeSubsMap = {};
    stripeSubscriptions.data.forEach(sub => {
      stripeSubsMap[sub.id] = {
        id: sub.id,
        status: sub.status,
        customer: sub.customer,
        currentPeriodStart: new Date(sub.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString()
      };
    });

    // Compare and process results
    const results = subscriptions.map(sub => {
      const stripeSub = stripeSubsMap[sub.stripe_subscription_id];
      const stripeStatus = stripeSub?.status;
      
      // Determine the correct mapped status
      const correctMappedStatus = stripeStatus === 'active' || stripeStatus === 'trialing' 
        ? 'active'
        : stripeStatus === 'canceled' || stripeStatus === 'unpaid'
          ? 'canceled'
          : 'inactive';
          
      // Check if Supabase status matches what it should be
      const statusCorrect = sub.business_profiles.subscription_status === correctMappedStatus;
      const userAccountCorrect = (
        sub.users.has_active_subscription === (correctMappedStatus === 'active') &&
        sub.users.account_type === (correctMappedStatus === 'active' ? 'business' : 'user')
      );
      
      return {
        id: sub.id,
        stripe_subscription_id: sub.stripe_subscription_id,
        business_name: sub.business_profiles.business_name,
        business_id: sub.business_profiles.id,
        user_id: sub.user_id,
        user_email: sub.users.email,
        supabase_status: {
          subscription_status: sub.business_profiles.subscription_status,
          has_active_subscription: sub.users.has_active_subscription,
          account_type: sub.users.account_type
        },
        stripe_data: stripeSub || null,
        correct_status: correctMappedStatus,
        status_match: statusCorrect,
        user_status_match: userAccountCorrect,
        needs_update: !statusCorrect || !userAccountCorrect
      };
    });

    return res.status(200).json({
      message: 'Subscription data comparison completed',
      subscriptions: results || [],
      needsUpdate: results ? results.filter(r => r.needs_update).length : 0
    });
  } catch (error: any) {
    console.error('Error comparing subscriptions:', error);
    return res.status(500).json({ 
      message: error?.message || 'Error comparing subscriptions',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Export the handler with admin authentication
export default withAdminApiAuth(handler); 