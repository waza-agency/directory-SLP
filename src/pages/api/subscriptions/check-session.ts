import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id parameter' });
  }

  try {
    // Create authenticated Supabase client
    const supabase = createServerSupabaseClient({ req, res });

    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // First retrieve the Stripe session to get the metadata
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id as string);

    if (!checkoutSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // If no active user session, but we have a valid Stripe session with metadata,
    // we can still provide subscription status (payment might be processing)
    if (!session) {
      console.log('No active user session, but checking subscription status from Stripe session');

      // Get user ID from Stripe session metadata
      const userId = checkoutSession.metadata?.userId;

      if (!userId) {
        return res.status(401).json({
          error: 'not_authenticated',
          description: 'No user session and no user ID in Stripe metadata',
        });
      }

      // Use service role to check subscription status without requiring user session
      const serviceSupabase = require('@supabase/supabase-js').createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data: businessProfile } = await serviceSupabase
        .from('business_profiles')
        .select("*")
        .eq('user_id', userId)
        .single();

      let status = 'pending';

      if (businessProfile?.subscription_status === 'active') {
        status = 'active';
      } else if (checkoutSession.payment_status === 'paid') {
        // Payment is complete but our webhook might not have processed yet
        status = 'active';

        // Update the business profile status
        await serviceSupabase
          .from('business_profiles')
          .update({
            subscription_status: 'active',
          })
          .eq('user_id', userId);
      }

      return res.status(200).json({
        status,
        payment_status: checkoutSession.payment_status,
        subscription_id: checkoutSession.subscription,
        note: 'Status checked without user session'
      });
    }

    // Check if the session belongs to the authenticated user
    if (checkoutSession.metadata?.userId !== session.user.id) {
      return res.status(403).json({ error: 'Unauthorized to access this session' });
    }

    // Get the subscription status from the business profile
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select("*")
      .eq('user_id', session.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching business profile:', profileError);

      // If business profile doesn't exist but payment was successful, create it
      if (profileError.code === 'PGRST116' && checkoutSession.payment_status === 'paid') {
        console.log('Creating business profile for successful payment');

        const { data: userData } = await supabase
          .from('users')
          .select("*")
          .eq('id', session.user.id)
          .single();

        const businessName = userData?.email ?
          userData.email.split[0] + ' Business' :
          'New Business';

        const { data: newProfile, error: insertError } = await supabase
          .from('business_profiles')
          .insert([
            {
              user_id: session.user.id,
              business_name: businessName,
              subscription_status: 'active',
              business_category: 'Other'
            }
          ])
          .select("*")
          .single();

        if (!insertError) {
          return res.status(200).json({
            status: 'active',
            payment_status: checkoutSession.payment_status,
            subscription_id: checkoutSession.subscription,
            note: 'Business profile created'
          });
        }
      }

      return res.status(500).json({ error: 'Error fetching subscription status' });
    }

    // If the checkout session has a payment status, use it to determine the overall status
    let status = 'pending';

    if (businessProfile?.subscription_status === 'active') {
      status = 'active';
    } else if (checkoutSession.payment_status === 'paid') {
      // If the payment is paid but our DB doesn't reflect it yet (webhook might be delayed)
      status = 'active';

      // Update the business profile status
      const { error: updateError } = await supabase
        .from('business_profiles')
        .update({
          subscription_status: 'active',
        })
        .eq('user_id', session.user.id);

      if (updateError) {
        console.error('Error updating business profile status:', updateError);
      }
    }

    res.status(200).json({
      status,
      payment_status: checkoutSession.payment_status,
      subscription_id: checkoutSession.subscription,
    });
  } catch (error: any) {
    console.error('Error checking subscription session:', error);
    res.status(500).json({
      error: {
        message: error.message || 'An error occurred while checking the subscription',
      },
    });
  }
}