import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow both GET (from email links) and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const email = req.method === 'GET' ? req.query.email : req.body.email;
  const token = req.method === 'GET' ? req.query.token : req.body.token;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status, confirmation_token')
      .eq('email', email.toLowerCase())
      .single();

    if (findError || !subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(200).json({
        message: 'You are already unsubscribed',
        alreadyUnsubscribed: true
      });
    }

    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) throw updateError;

    // For GET requests (from email links), redirect to confirmation page
    if (req.method === 'GET') {
      return res.redirect(302, '/newsletter/unsubscribed');
    }

    return res.status(200).json({
      message: 'Successfully unsubscribed. We\'re sorry to see you go!',
      unsubscribed: true
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return res.status(500).json({
      message: 'Failed to unsubscribe. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
