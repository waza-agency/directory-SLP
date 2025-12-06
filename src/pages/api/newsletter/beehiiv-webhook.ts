import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Beehiiv Subscription Object (based on API v2 documentation)
 * @see https://developers.beehiiv.com/api-reference/subscriptions
 */
interface BeehiivSubscription {
  id: string;
  email: string;
  status: 'validating' | 'invalid' | 'pending' | 'active' | 'inactive' | 'needs_attention' | 'paused';
  created: number; // Unix timestamp
  subscription_tier?: 'free' | 'premium';
  utm_source?: string;
  utm_medium?: string;
  utm_channel?: 'website' | 'import' | 'embed' | 'api' | 'referral' | 'recommendation' | 'magic_link' | 'boost' | 'integration';
  utm_campaign?: string;
  referring_site?: string;
  referral_code?: string;
  custom_fields?: Array<{ name: string; value: string | number | boolean }>;
  tags?: string[];
}

/**
 * Beehiiv Webhook Payload
 * Events: subscription.created, subscription.confirmed, subscription.deleted,
 *         subscription.upgraded, subscription.downgraded, subscription.paused,
 *         subscription.resumed
 */
interface BeehiivWebhookPayload {
  event_type: string;
  data: BeehiivSubscription;
  timestamp?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify webhook secret if configured
  const webhookSecret = process.env.BEEHIIV_WEBHOOK_SECRET;
  if (webhookSecret) {
    // Beehiiv may use different header names - check common patterns
    const signature = req.headers['x-beehiiv-signature'] ||
                      req.headers['x-webhook-secret'] ||
                      req.headers['authorization'];

    // Simple secret comparison (Beehiiv uses direct secret matching)
    if (signature !== webhookSecret && signature !== `Bearer ${webhookSecret}`) {
      console.error('Invalid Beehiiv webhook signature');
      console.log('Expected:', webhookSecret.substring(0, 10) + '...');
      console.log('Received headers:', Object.keys(req.headers).filter(h => h.includes('beehiiv') || h.includes('webhook') || h.includes('auth')));
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  // Log raw payload for debugging
  console.log('Beehiiv webhook received:', JSON.stringify(req.body, null, 2).substring(0, 500));

  try {
    const payload: BeehiivWebhookPayload = req.body;
    const eventType = payload.event_type || (payload as any).event;
    const data = payload.data;

    if (!data || !data.email) {
      console.error('Invalid webhook payload - missing data or email');
      return res.status(400).json({ message: 'Invalid payload' });
    }

    console.log(`Beehiiv webhook: ${eventType} for ${data.email}`);

    switch (eventType) {
      case 'subscription.created':
        await handleSubscriptionCreated(data);
        break;

      case 'subscription.confirmed':
        await handleSubscriptionConfirmed(data);
        break;

      case 'subscription.deleted':
        await handleSubscriptionDeleted(data);
        break;

      case 'subscription.upgraded':
      case 'subscription.downgraded':
        await handleTierChange(data, eventType);
        break;

      case 'subscription.paused':
        await handleSubscriptionPaused(data);
        break;

      case 'subscription.resumed':
        await handleSubscriptionResumed(data);
        break;

      default:
        console.log('Unhandled Beehiiv event:', eventType);
    }

    return res.status(200).json({ success: true, event: eventType });
  } catch (error) {
    console.error('Beehiiv webhook error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleSubscriptionCreated(data: BeehiivSubscription) {
  const { email, utm_source, utm_medium, utm_campaign, utm_channel, referring_site } = data;

  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, status')
    .eq('email', email.toLowerCase())
    .single();

  if (existing) {
    if (existing.status !== 'active') {
      await supabase
        .from('newsletter_subscribers')
        .update({
          status: 'pending',
          unsubscribed_at: null,
          subscribed_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    }
    return;
  }

  const source = utm_source || utm_channel || referring_site || 'beehiiv';

  await supabase
    .from('newsletter_subscribers')
    .insert([{
      email: email.toLowerCase(),
      source: `beehiiv:${source}`,
      status: 'pending', // Will become active on subscription.confirmed
      subscribed_at: new Date().toISOString(),
      preferences: {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_channel,
        referring_site,
        synced_from: 'beehiiv'
      }
    }]);

  console.log(`New Beehiiv subscriber (pending): ${email}`);
}

async function handleSubscriptionConfirmed(data: BeehiivSubscription) {
  const { email } = data;

  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id')
    .eq('email', email.toLowerCase())
    .single();

  if (existing) {
    await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'active',
        confirmed_at: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    // Create if doesn't exist (edge case)
    await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: email.toLowerCase(),
        source: 'beehiiv:confirmed',
        status: 'active',
        confirmed_at: new Date().toISOString()
      }]);
  }

  console.log(`Beehiiv subscriber confirmed: ${email}`);
}

async function handleSubscriptionDeleted(data: BeehiivSubscription) {
  const { email } = data;

  await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString()
    })
    .eq('email', email.toLowerCase());

  console.log(`Beehiiv unsubscribe: ${email}`);
}

async function handleTierChange(data: BeehiivSubscription, eventType: string) {
  const { email, subscription_tier } = data;

  // Get current preferences and update
  const { data: subscriber } = await supabase
    .from('newsletter_subscribers')
    .select('preferences')
    .eq('email', email.toLowerCase())
    .single();

  const updatedPreferences = {
    ...(subscriber?.preferences || {}),
    subscription_tier,
    tier_updated_at: new Date().toISOString()
  };

  await supabase
    .from('newsletter_subscribers')
    .update({ preferences: updatedPreferences })
    .eq('email', email.toLowerCase());

  console.log(`Beehiiv tier change (${eventType}): ${email} -> ${subscription_tier}`);
}

async function handleSubscriptionPaused(data: BeehiivSubscription) {
  const { email } = data;

  await supabase
    .from('newsletter_subscribers')
    .update({ status: 'paused' })
    .eq('email', email.toLowerCase());

  console.log(`Beehiiv subscription paused: ${email}`);
}

async function handleSubscriptionResumed(data: BeehiivSubscription) {
  const { email } = data;

  await supabase
    .from('newsletter_subscribers')
    .update({ status: 'active' })
    .eq('email', email.toLowerCase());

  console.log(`Beehiiv subscription resumed: ${email}`);
}
