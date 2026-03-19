import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { addSubscriber, getSubscriberByEmail } from '@/lib/beehiiv-service';
import { strictRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

const subscribeSchema = z.object({
  email: z.string().email().max(320),
  firstName: z.string().max(200).optional(),
  source: z.string().max(100).default('website'),
});

function cors(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (strictRateLimit(req, res, 'newsletter-subscribe')) return;

  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Valid email is required',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, firstName, source } = parsed.data;

  try {
    // Check if already subscribed in Beehiiv
    const { subscriber: existing } = await getSubscriberByEmail(email.toLowerCase());

    if (existing && existing.status === 'active') {
      return res.status(200).json({
        message: 'You are already subscribed!',
        alreadySubscribed: true
      });
    }

    // Add/reactivate subscriber in Beehiiv
    // Beehiiv will send the welcome email automatically
    const result = await addSubscriber(email.toLowerCase(), {
      utmSource: source,
      utmMedium: firstName ? 'landing_page' : 'website',
      sendWelcomeEmail: true, // Beehiiv handles welcome email
    });

    if (!result.success) {
      // Check if error is "already subscribed" type
      if (result.error?.toLowerCase().includes('already') ||
          result.error?.toLowerCase().includes('exists')) {
        return res.status(200).json({
          message: 'You are already subscribed!',
          alreadySubscribed: true
        });
      }

      logger.error('Beehiiv subscription error:', result.error);
      return res.status(400).json({
        message: 'Failed to subscribe. Please try again.',
        error: result.error
      });
    }

    // Success - Beehiiv webhook will sync to Supabase automatically
    return res.status(200).json({
      message: existing
        ? 'Welcome back! You have been resubscribed.'
        : 'Successfully subscribed! Check your inbox for a welcome email.',
      resubscribed: !!existing,
      subscriber: {
        id: result.subscriber?.id,
        email: result.subscriber?.email,
      }
    });

  } catch (error) {
    logger.error('Newsletter subscription error:', error);
    return res.status(500).json({
      message: 'Failed to subscribe. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
