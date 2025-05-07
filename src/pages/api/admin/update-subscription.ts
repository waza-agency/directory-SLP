import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withAdminApiAuth } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

// Initialize Stripe with better error handling
const stripeKey = process.env.STRIPE_SECRET_KEY;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ message: 'Missing subscription ID' });
  }

  try {
    console.log(`Getting Stripe subscription: ${subscriptionId}`);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey as string, {
      apiVersion: '2023-10-16',
    });

    // Get subscription details from Stripe
    try {
      // Get subscription from Stripe
      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      // Verify it's valid
      if (!stripeSubscription || !stripeSubscription.status) {
        return res.status(404).json({ message: 'Stripe subscription not found or invalid' });
      }

      // Get Supabase subscription that links to this Stripe ID
      const { data: supabaseSubscription, error: subError } = await supabaseAdmin
        .from('subscriptions')
        .select(`
          id, 
          user_id,
          business_profiles!inner (
            id
          )
        `)
        .eq('stripe_subscription_id', subscriptionId)
        .single();

      if (subError || !supabaseSubscription) {
        console.error('Error finding subscription in Supabase:', subError || 'Not found');
        return res.status(404).json({ 
          message: 'Subscription not found in Supabase', 
          details: subError?.message
        });
      }

      console.log(`Found subscription in Supabase: ${supabaseSubscription.id}`);

      // Map Stripe status to our internal format
      const stripeStatus = stripeSubscription.status;
      const mappedStatus = stripeStatus === 'active' || stripeStatus === 'trialing' 
        ? 'active'
        : stripeStatus === 'canceled' || stripeStatus === 'unpaid'
          ? 'canceled'
          : 'inactive';

      console.log(`Updating status to: ${mappedStatus}`);

      // Update business profile status
      const { error: businessError } = await supabaseAdmin
        .from('business_profiles')
        .update({ 
          subscription_status: mappedStatus,
          ...(mappedStatus === 'active' && {
            subscription_start_date: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
            subscription_end_date: new Date(stripeSubscription.current_period_end * 1000).toISOString()
          })
        })
        .eq('id', supabaseSubscription.business_profiles.id);

      if (businessError) {
        console.error('Error updating business profile:', businessError);
        return res.status(500).json({ 
          message: 'Error updating business profile status', 
          details: businessError.message 
        });
      }

      // IMPORTANT! Update the status in the subscriptions table as well
      const { error: subscriptionUpdateError } = await supabaseAdmin
        .from('subscriptions')
        .update({ 
          status: mappedStatus === 'active' ? 'active' : mappedStatus,
          current_period_start: stripeSubscription.current_period_start ? new Date(stripeSubscription.current_period_start * 1000).toISOString() : null,
          current_period_end: stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000).toISOString() : null
        })
        .eq('id', supabaseSubscription.id);

      if (subscriptionUpdateError) {
        console.error('Error updating subscription status:', subscriptionUpdateError);
        return res.status(500).json({ 
          message: 'Error updating subscription record', 
          details: subscriptionUpdateError.message
        });
      }

      // Update user account settings
      const { error: userError } = await supabaseAdmin
        .from('users')
        .update({ 
          has_active_subscription: mappedStatus === 'active',
          account_type: mappedStatus === 'active' ? 'business' : 'user'
        })
        .eq('id', supabaseSubscription.user_id);

      if (userError) {
        console.error('Error updating user account:', userError);
        return res.status(500).json({ 
          message: 'Error updating user account status', 
          details: userError.message
        });
      }

      return res.status(200).json({
        message: `Subscription updated to ${mappedStatus}`,
        subscription: {
          id: supabaseSubscription.id,
          stripeId: subscriptionId,
          stripeStatus: stripeStatus,
          mappedStatus: mappedStatus
        }
      });
    } catch (stripeError: any) {
      console.error('Stripe API error:', stripeError);
      return res.status(500).json({
        message: 'Error retrieving subscription from Stripe',
        error: stripeError.message,
        details: process.env.NODE_ENV === 'development' ? stripeError : undefined
      });
    }
  } catch (error: any) {
    console.error('Error updating subscription:', error);
    return res.status(500).json({ 
      message: error?.message || 'Error updating subscription',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Export the handler with admin authentication
export default withAdminApiAuth(handler); 