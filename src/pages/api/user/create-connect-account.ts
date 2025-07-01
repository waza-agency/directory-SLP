import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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

    // Check if user already has a Stripe Connect account
    if (userData.stripe_account_id) {
      // Get the account details from Stripe
      const account = await stripe.accounts.retrieve(userData.stripe_account_id);
      
      // If the account is already fully onboarded, return error
      if (account.charges_enabled && account.details_submitted) {
        return res.status(400).json({
          error: 'connect_account_exists',
          description: 'You already have a Stripe Connect account that is fully set up.',
          accountId: userData.stripe_account_id
        });
      }
      
      // If the account exists but is not fully onboarded, create an account link
      const accountLink = await stripe.accountLinks.create({
        account: userData.stripe_account_id,
        refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account/seller?refresh=true`,
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account/seller?success=true`,
        type: 'account_onboarding',
      });
      
      return res.status(200).json({
        accountLinkUrl: accountLink.url,
        accountId: userData.stripe_account_id,
        isNew: false
      });
    }

    // Create a new Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'express', // Using Express account for simplicity
      country: 'US', // Default country (can be changed in the onboarding process)
      email: userData.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
      metadata: {
        user_id: session.user.id
      },
    });

    // Update user with Stripe account ID
    const { error: updateError } = await supabase
      .from('users')
      .update({
        stripe_account_id: account.id,
        is_seller: true,
      })
      .eq('id', session.user.id);

    if (updateError) {
      console.error('Error updating user with Stripe account ID:', updateError);
      return res.status(500).json({ error: updateError.message });
    }

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account/seller?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account/seller?success=true`,
      type: 'account_onboarding',
    });

    return res.status(200).json({
      accountLinkUrl: accountLink.url,
      accountId: account.id,
      isNew: true
    });
  } catch (error: any) {
    console.error('Error creating Stripe Connect account:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An error occurred while creating Stripe Connect account',
      },
    });
  }
} 