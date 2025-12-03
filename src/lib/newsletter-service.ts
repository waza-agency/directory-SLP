import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_BATCH_ENDPOINT = 'https://api.resend.com/emails/batch';
const RESEND_SINGLE_ENDPOINT = 'https://api.resend.com/emails';

export interface Newsletter {
  id: string;
  subject: string;
  html_content: string;
  preview_text?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
}

export interface SendResult {
  sent: number;
  failed: number;
  details?: any[];
}

/**
 * Sends a newsletter to a single test email
 */
export async function sendTestEmail(newsletter: Newsletter, email: string) {
  try {
    const response = await fetch(RESEND_SINGLE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'San Luis Way <newsletter@sanluisway.com>',
        to: email,
        subject: `[TEST] ${newsletter.subject}`,
        html: addUnsubscribeLink(newsletter.html_content, email),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send email');
    return data;
  } catch (error) {
    console.error('Send test email error:', error);
    throw error;
  }
}

/**
 * Sends a newsletter to a batch of subscribers
 */
export async function sendBatch(newsletter: Newsletter, subscribers: Subscriber[]): Promise<SendResult> {
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
    // We do this asynchronously to not block the return
    const logPromises = subscribers.map(sub =>
      supabase.from('newsletter_sends').insert({
        newsletter_id: newsletter.id,
        subscriber_id: sub.id,
        email: sub.email,
        status: response.ok ? 'sent' : 'failed',
        sent_at: response.ok ? new Date().toISOString() : null,
        error_message: response.ok ? null : JSON.stringify(result),
      })
    );

    await Promise.allSettled(logPromises);

    return {
      sent: response.ok ? subscribers.length : 0,
      failed: response.ok ? 0 : subscribers.length
    };

  } catch (error) {
    console.error('Batch send error:', error);
    return { sent: 0, failed: subscribers.length };
  }
}

/**
 * Helper to add unsubscribe link
 */
function addUnsubscribeLink(html: string, email: string): string {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const unsubscribeHtml = `
    <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Don't want these emails? <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  `;

  // Insert before closing body tag if it exists, otherwise append
  if (html.includes('</body>')) {
    return html.replace('</body>', `${unsubscribeHtml}</body>`);
  }
  return html + unsubscribeHtml;
}

