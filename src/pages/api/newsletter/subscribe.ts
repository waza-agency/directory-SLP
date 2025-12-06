import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { addSubscriber as addBeehiivSubscriber } from '@/lib/beehiiv-service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

async function sendWelcomeEmail(email: string, firstName?: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured, skipping welcome email');
    return null;
  }

  const name = firstName || 'there';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'San Luis Way <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to San Luis Way Weekly! 🌵',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F3F4F6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #C75B39 0%, #FFCB05 100%); padding: 40px; text-align: center;">
                      <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 32px; margin: 0;">Welcome to San Luis Way!</h1>
                      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 15px 0 0 0;">Your weekly digest of Potosino life</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="font-size: 18px; color: #1F2937; margin: 0 0 20px 0;">Hey ${name}! 👋</p>

                      <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
                        Thanks for subscribing to <strong>San Luis Way Weekly</strong>! You're now part of a growing community of expats, locals, and visitors discovering the best of San Luis Potosí.
                      </p>

                      <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 30px 0;">
                        Every Monday, you'll receive:
                      </p>

                      <ul style="font-size: 16px; color: #4B5563; line-height: 1.8; padding-left: 20px; margin: 0 0 30px 0;">
                        <li>📰 <strong>Local News</strong> - What's happening in SLP</li>
                        <li>🌟 <strong>Top Events</strong> - Concerts, festivals, exhibitions</li>
                        <li>🏙️ <strong>Around Town</strong> - New restaurants, shops, trends</li>
                        <li>🌿 <strong>Weekend Escapes</strong> - Day trips and outdoor adventures</li>
                        <li>💡 <strong>Expat Pro Tips</strong> - Practical advice for living here</li>
                      </ul>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="https://www.sanluisway.com" style="display: inline-block; padding: 14px 30px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Explore San Luis Way →</a>
                      </div>

                      <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
                        In the meantime, check out our latest:
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 10px 0;">
                            <a href="https://www.sanluisway.com/events" style="color: #2563EB; text-decoration: none; font-size: 15px;">📅 Upcoming Events</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <a href="https://www.sanluisway.com/places" style="color: #2563EB; text-decoration: none; font-size: 15px;">🗺️ Places Directory</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <a href="https://www.sanluisway.com/blog" style="color: #2563EB; text-decoration: none; font-size: 15px;">📖 Blog & Guides</a>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0;">
                        See you in your inbox!<br><br>
                        <strong>The San Luis Way Team</strong> 🌵
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #1F2937; padding: 30px; text-align: center;">
                      <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0 0 10px 0;">
                        Follow us:
                        <a href="https://www.instagram.com/sanluisway/" style="color: #FFCB05; text-decoration: none;">Instagram</a> |
                        <a href="https://www.tiktok.com/@sanluisway" style="color: #FFCB05; text-decoration: none;">TikTok</a>
                      </p>
                      <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
                        San Luis Way | sanluisway.com<br>
                        San Luis Potosí, México
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to send welcome email:', error);
    return null;
  }

  return await response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, firstName, source = 'website' } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return res.status(200).json({
          message: 'You are already subscribed!',
          alreadySubscribed: true
        });
      }

      // Resubscribe if previously unsubscribed
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          status: 'active',
          unsubscribed_at: null,
          subscribed_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (updateError) throw updateError;

      // Sync to Beehiiv (reactivate)
      addBeehiivSubscriber(email, {
        utmSource: source,
        utmMedium: 'resubscribe',
        sendWelcomeEmail: false,
      }).catch(err => console.error('Beehiiv sync error:', err));

      await sendWelcomeEmail(email, firstName);

      return res.status(200).json({
        message: 'Welcome back! You have been resubscribed.',
        resubscribed: true
      });
    }

    // Get IP and user agent for tracking
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create new subscriber
    const { data: subscriber, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: email.toLowerCase(),
        first_name: firstName || null,
        source,
        ip_address: typeof ip === 'string' ? ip : ip?.[0],
        user_agent: userAgent,
        status: 'active',
        confirmed_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(200).json({
          message: 'You are already subscribed!',
          alreadySubscribed: true
        });
      }
      throw insertError;
    }

    // Sync new subscriber to Beehiiv
    addBeehiivSubscriber(email, {
      utmSource: source,
      utmMedium: 'website',
      sendWelcomeEmail: false,
    }).catch(err => console.error('Beehiiv sync error:', err));

    // Send welcome email
    await sendWelcomeEmail(email, firstName);

    return res.status(200).json({
      message: 'Successfully subscribed! Check your inbox for a welcome email.',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        subscribed_at: subscriber.subscribed_at
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      message: 'Failed to subscribe. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
