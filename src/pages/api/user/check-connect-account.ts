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

  try {
    // Create authenticated Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      });
    }

    // Get current user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select("*")
      .eq('id', session.user.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return res.status(500).json({ error: userError.message });
    }

    // If user doesn't have a Stripe account ID, they're not a seller
    if (!userData.stripe_account_id) {
      return res.status(200).json({
        isSeller: false,
        hasConnectAccount: false,
        accountStatus: null
      });
    }

    // Retrieve the account from Stripe
    const account = await stripe.accounts.retrieve(userData.stripe_account_id);

    // Update user's seller status in database if needed
    if (account.charges_enabled && !userData.is_seller) {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          is_seller: true,
          stripe_account_enabled: true
        })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating user seller status:', updateError);
      }
    }

    // Return account status
    return res.status(200).json({
      isSeller: userData.is_seller,
      hasConnectAccount: true,
      accountStatus: {
        id: account.id,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements
      }
    });
  } catch (error: any) {
    console.error('Error checking Stripe Connect account:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An error occurred while checking Stripe Connect account',
      },
    });
  }
} 