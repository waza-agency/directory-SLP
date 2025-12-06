import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { createPost as createBeehiivPost } from '@/lib/beehiiv-service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;
const RESEND_BATCH_ENDPOINT = 'https://api.resend.com/emails/batch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { newsletter_id, test_email, create_beehiiv_draft } = req.body;

  if (!newsletter_id) {
    return res.status(400).json({ message: 'Newsletter ID is required' });
  }

  try {
    // Get the newsletter
    const { data: newsletter, error: nlError } = await supabase
      .from('newsletters')
      .select('*')
      .eq('id', newsletter_id)
      .single();

    if (nlError || !newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    // If test_email provided, send only to that email
    if (test_email) {
      const result = await sendSingleEmail(newsletter, test_email);
      return res.status(200).json({ message: 'Test email sent', result });
    }

    // Get active subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, first_name')
      .eq('status', 'active');

    if (subError) throw subError;

    if (!subscribers || subscribers.length === 0) {
      return res.status(400).json({ message: 'No active subscribers found' });
    }

    // Update newsletter status
    await supabase
      .from('newsletters')
      .update({ status: 'sending' })
      .eq('id', newsletter_id);

    // Send in batches
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);
      const results = await sendBatch(newsletter, batch);
      sent += results.sent;
      failed += results.failed;
    }

    // Update newsletter with final stats
    await supabase
      .from('newsletters')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        stats: { sent, failed, delivered: 0, opened: 0, clicked: 0 }
      })
      .eq('id', newsletter_id);

    // Optionally create Beehiiv draft for manual sending via Beehiiv dashboard
    let beehiivPostId = null;
    if (create_beehiiv_draft) {
      const beehiivResult = await createBeehiivPost(
        newsletter.subject,
        newsletter.html_content,
        { subtitle: newsletter.preview_text }
      );
      if (beehiivResult.success) {
        beehiivPostId = beehiivResult.post?.id;
        console.log('Beehiiv draft created:', beehiivPostId);
      } else {
        console.error('Failed to create Beehiiv draft:', beehiivResult.error);
      }
    }

    return res.status(200).json({
      message: 'Newsletter sent successfully',
      stats: { total: subscribers.length, sent, failed },
      beehiiv_post_id: beehiivPostId
    });

  } catch (error) {
    console.error('Send newsletter error:', error);
    return res.status(500).json({
      message: 'Failed to send newsletter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function sendSingleEmail(newsletter: { subject: string; html_content: string; preview_text?: string }, email: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'San Luis Way <newsletter@sanluisway.com>',
      to: email,
      subject: newsletter.subject,
      html: addUnsubscribeLink(newsletter.html_content, email),
    }),
  });

  return response.json();
}

async function sendBatch(
  newsletter: { id: string; subject: string; html_content: string },
  subscribers: Array<{ id: string; email: string; first_name?: string }>
) {
  let sent = 0;
  let failed = 0;

  // Resend batch API expects an array of email objects
  const emails = subscribers.map(sub => ({
    from: 'San Luis Way <newsletter@sanluisway.com>',
    to: sub.email,
    subject: newsletter.subject,
    html: addUnsubscribeLink(newsletter.html_content, sub.email),
  }));

  try {
    const response = await fetch(RESEND_BATCH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emails),
    });

    const result = await response.json();

    // Log sends to newsletter_sends table
    for (const sub of subscribers) {
      await supabase.from('newsletter_sends').insert({
        newsletter_id: newsletter.id,
        subscriber_id: sub.id,
        email: sub.email,
        status: response.ok ? 'sent' : 'failed',
        sent_at: response.ok ? new Date().toISOString() : null,
        error_message: response.ok ? null : JSON.stringify(result),
      });
    }

    sent = response.ok ? subscribers.length : 0;
    failed = response.ok ? 0 : subscribers.length;
  } catch (error) {
    failed = subscribers.length;
    console.error('Batch send error:', error);
  }

  return { sent, failed };
}

function addUnsubscribeLink(html: string, email: string): string {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const unsubscribeHtml = `
    <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Don't want these emails? <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  `;

  // Insert before closing body tag
  return html.replace('</body>', `${unsubscribeHtml}</body>`);
}
