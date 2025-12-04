import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { generateWeeklyNewsletter } from '@/lib/newsletter-generator';
import { sendBatch, sendTestEmail } from '@/lib/newsletter-service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Security Check
  // Vercel Cron uses 'Authorization' header: `Bearer ${process.env.CRON_SECRET}`
  // GitHub Actions or others can set a custom header.
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 2. Generate Content
    console.log('Generating newsletter...');
    const { subject, html_content, date_range } = await generateWeeklyNewsletter();

    // 3. Save to Database
    const { data: newsletter, error: dbError } = await supabase
      .from('newsletters')
      .insert({
        subject,
        html_content,
        status: 'draft', // Start as draft
        preview_text: `Your weekly guide to San Luis Potosí for ${date_range}`,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    // 4. Handling Sending
    // Check for ?mode=live query param to actually send to everyone
    const mode = req.query.mode as string;

    if (mode === 'live') {
      // SEND TO ALL SUBSCRIBERS
      const { data: subscribers } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, first_name')
        .eq('status', 'active');

      if (subscribers && subscribers.length > 0) {
        await supabase.from('newsletters').update({ status: 'sending' }).eq('id', newsletter.id);

        const result = await sendBatch(newsletter, subscribers);

        await supabase.from('newsletters').update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          stats: { ...result }
        }).eq('id', newsletter.id);

        return res.status(200).json({
          success: true,
          action: 'generated_and_sent',
          newsletter_id: newsletter.id,
          stats: result
        });
      }
    }

    // DEFAULT: Send Test Email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'santiago@sanluisway.com'; // Fallback or Env
    if (adminEmail) {
      await sendTestEmail(newsletter, adminEmail);
      return res.status(200).json({
        success: true,
        action: 'generated_and_test_sent',
        newsletter_id: newsletter.id,
        message: `Draft created and test email sent to ${adminEmail}`
      });
    }

    return res.status(200).json({
      success: true,
      action: 'generated_draft_only',
      newsletter_id: newsletter.id
    });

  } catch (error) {
    console.error('Cron Job Error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

