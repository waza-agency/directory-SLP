import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseClient) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase environment variables are required');
    }
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return supabaseClient;
}

export function getCurrentNewsletterDates() {
  // Always use fresh current date/time to ensure accuracy
  const now = new Date();

  // Get current time in Mexico City timezone for accurate local time
  const mexicoCityTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  console.log(`Newsletter generation timestamp: ${now.toISOString()}`);
  console.log(`Mexico City local time: ${mexicoCityTime}`);

  // Use TODAY as start date and 7 days from now as end date
  const startDate = now;
  const endDate = addDays(now, 7);

  return {
    currentDate: format(now, 'MMMM d, yyyy'),
    currentDateTime: format(now, 'MMMM d, yyyy \'at\' h:mm a'),
    weekStartDate: startDate,
    weekEndDate: endDate,
    weekStartIso: startDate.toISOString(),
    weekEndIso: endDate.toISOString(),
    dateRangeStr: `${format(startDate, 'MMMM d')} - ${format(endDate, 'MMMM d, yyyy')}`,
    todayFormatted: format(now, 'EEEE, MMMM d, yyyy'),
    mexicoCityLocalTime: mexicoCityTime,
  };
}

// Initialize Gemini with SEARCH GROUNDING
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  tools: [
    {
      googleSearch: {}
    }
  ],
  generationConfig: {
    maxOutputTokens: 16384,
    temperature: 0.7,
  }
});

// Initialize OpenAI as fallback
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function generateWithOpenAI(prompt: string): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  console.log('3. 🔄 Falling back to OpenAI GPT-4...');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are the editor of "San Luis Way Weekly", a newsletter for expats and locals in San Luis Potosí, Mexico. Generate engaging, informative content in HTML format.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 8000,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || '';
}

// Simplified footer HTML for Beehiiv compatibility (no gradients, no box-shadow)
export const CLOSING_AND_FOOTER_HTML = `
          <!-- EXPLORE SAN LUIS WAY -->
          <tr>
            <td style="padding: 30px; background-color: #F0F9FF;">
              <h2 style="font-size: 18px; color: #1F2937; margin: 0 0 20px 0; text-align: center;">
                🗺️ Explore More on San Luis Way
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/events" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">🎭</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Events</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/blog" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">📖</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Blog</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/directory" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">📍</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Directory</p>
                      </div>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/outdoors" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">🌿</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Outdoors</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/restaurants" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">🍽️</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Restaurants</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/services" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">🛠️</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Services</p>
                      </div>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLOSING -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #F9FAFB;">
              <p style="font-size: 17px; color: #1F2937; margin: 0 0 15px 0; font-weight: 500;">That's a wrap for this week! 🎬</p>
              <p style="font-size: 15px; color: #4B5563; margin: 0 0 12px 0;">Got a tip, event, or story we should know about?</p>
              <p style="font-size: 15px; color: #C75B39; margin: 0 0 20px 0; font-weight: bold;">👉 Just hit reply - we read every message!</p>
              <p style="font-size: 14px; color: #6B7280; margin: 0 0 25px 0;">Love this newsletter? <strong>Forward it to a friend</strong> who's curious about SLP life.</p>

              <!-- Social Links -->
              <p style="font-size: 13px; color: #6B7280; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Follow Us</p>
              <div style="margin-bottom: 25px;">
                <a href="https://www.sanluisway.com" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E5E7EB; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500;">🌐 Website</a>
                <a href="https://www.instagram.com/sanluisway/" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E5E7EB; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500;">📸 Instagram</a>
                <a href="https://www.tiktok.com/@sanluisway" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E5E7EB; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500;">🎵 TikTok</a>
              </div>

              <p style="font-size: 18px; color: #1F2937; margin: 0;">
                Hasta la próxima,<br>
                <strong style="color: #C75B39;">The San Luis Way Team</strong> 🌵
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding: 25px 30px; background-color: #1F2937; text-align: center;">
              <img src="https://www.sanluisway.com/images/logo.jpeg" alt="San Luis Way" width="120" style="max-width: 120px; height: auto; margin-bottom: 15px;">
              <p style="color: #CCCCCC; font-size: 13px; margin: 0 0 10px 0;">
                San Luis Way | Your guide to life in San Luis Potosí
              </p>
              <p style="color: #AAAAAA; font-size: 12px; margin: 0 0 10px 0;">
                SanLuisWay.com keeps expats and locals connected to the stories, spots, and services that define the city.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0 0 15px 0;">
                San Luis Potosí, México
              </p>
              <p style="margin: 0;">
                <a href="[UNSUBSCRIBE_URL]" style="color: #999999; font-size: 12px; text-decoration: underline;">Unsubscribe</a>
                <span style="color: #666666; margin: 0 10px;">|</span>
                <a href="[PREFERENCES_URL]" style="color: #999999; font-size: 12px; text-decoration: underline;">Update Preferences</a>
              </p>
            </td>
          </tr>
`;

export const NEWSLETTER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>San Luis Way Weekly | [DATE_RANGE]</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset */
    body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* Base Styles */
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #1F2937;
      background-color: #F3F4F6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
    }

    .section {
      padding: 25px 30px;
    }

    .section-alt {
      background-color: #F9FAFB;
    }

    h1, h2, h3 { margin: 0 0 15px 0; }
    p { margin: 0 0 15px 0; }

    a { color: #2563EB; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #FFCB05;
      color: #1F2937 !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 14px;
    }

    .btn-secondary {
      background-color: #C75B39;
      color: #FFFFFF !important;
    }

    .card {
      background-color: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
    }

    .event-card {
      border-left: 4px solid #FFCB05;
    }

    .news-card {
      border-left: 4px solid #C75B39;
    }

    .tag {
      display: inline-block;
      padding: 4px 10px;
      background-color: #FEF3C7;
      color: #92400E;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .meta {
      color: #6B7280;
      font-size: 13px;
    }

    .divider {
      border: none;
      border-top: 2px solid #E5E7EB;
      margin: 25px 0;
    }

    .emoji {
      font-size: 20px;
      margin-right: 8px;
    }

    /* Responsive */
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .section { padding: 20px 15px !important; }
      .mobile-full { width: 100% !important; display: block !important; }
      .mobile-hide { display: none !important; }
      .mobile-center { text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6;">

  <!-- Preview Text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    [PREVIEW_TEXT]
  </div>

  <!-- Email Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6;">
    <tr>
      <td align="center" style="padding: 20px 10px;">

        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background-color: #C75B39; padding: 30px; text-align: center;">
              <img src="https://www.sanluisway.com/images/logo.jpeg" alt="San Luis Way" width="200" style="max-width: 200px; height: auto;">
              <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 28px; margin: 20px 0 5px 0;">San Luis Way Weekly</h1>
              <p style="color: #EEEEEE; font-size: 14px; margin: 0;">Your digest of Potosino life</p>
              <p style="color: #DDDDDD; font-size: 13px; margin: 10px 0 0 0; font-weight: bold;">[WEEK_DATE_RANGE]</p>
            </td>
          </tr>

          <!-- OPENING HOOK -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.7;">Hey there! 👋</p>
              <p style="font-size: 16px; line-height: 1.7;">[OPENING_HOOK_TEXT]</p>
              <img
                src="[HERO_IMAGE_URL]"
                alt="[HERO_IMAGE_ALT]"
                style="width: 100%; border-radius: 12px; margin-top: 20px;"
              />
            </td>
          </tr>

          <!-- WEATHER & ENVIRONMENT -->
          <tr>
            <td style="background-color: #F0F9FF; padding: 20px 30px;">
              <h2 style="font-size: 18px; color: #0C4A6E; margin-bottom: 10px;">
                🌦️ Weather Watch
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px; color: #0C4A6E;"><strong>Forecast:</strong> [WEATHER_SUMMARY]</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #0C4A6E;"><strong>Tip:</strong> [WEATHER_RECOMMENDATION]</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEWS SECTION -->
          <tr>
            <td style="background-color: #FEF2F2; padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                📰 The Week in SLP
              </h2>
              <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px;">What you need to know</p>

              <!-- News Item 1 -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #C75B39; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <h3 style="font-size: 16px; margin: 0 0 10px 0; color: #1F2937;">[NEWS_HEADLINE_1]</h3>
                <!-- Optional Image for News 1 -->
                <!-- <img src="[NEWS_IMAGE_1]" style="width: 100%; border-radius: 4px; margin-bottom: 10px;"> -->
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">[NEWS_SUMMARY_1]</p>
                <p style="margin: 0; font-size: 13px; color: #C75B39; font-style: italic;">→ Why it matters: [IMPACT_1]</p>
              </div>

              <!-- News Item 2 -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #C75B39; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <h3 style="font-size: 16px; margin: 0 0 10px 0; color: #1F2937;">[NEWS_HEADLINE_2]</h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">[NEWS_SUMMARY_2]</p>
                <p style="margin: 0; font-size: 13px; color: #C75B39; font-style: italic;">→ Why it matters: [IMPACT_2]</p>
              </div>

              <!-- Quick Hits (Practical Info) -->
              <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; margin-top: 15px;">
                <p style="font-weight: bold; font-size: 14px; margin: 0 0 10px 0; color: #6B7280;">Quick hits:</p>
                <ul style="margin: 0; padding-left: 20px; color: #4B5563; font-size: 14px;">
                  <li style="margin-bottom: 5px;">[QUICK_HIT_1]</li>
                  <li style="margin-bottom: 5px;">[QUICK_HIT_2]</li>
                  <li>[QUICK_HIT_3]</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- TOP PICKS -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                🌟 This Week's Top Picks
              </h2>

              <!-- Event 1 -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_1]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_1]</h3>
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
                  📅 [DATE_TIME_1] &nbsp;|&nbsp; 📍 [VENUE_1]
                </p>
                <img
                  src="[TOP_PICK_IMAGE_URL]"
                  alt="[TOP_PICK_IMAGE_ALT]"
                  style="width: 100%; border-radius: 8px; margin-bottom: 12px;"
                />
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #4B5563;">[EVENT_DESCRIPTION_1]</p>
                <p style="margin: 0; font-size: 13px;">
                  <span style="color: #059669; font-weight: bold;">💰 [COST_1]</span>
                  &nbsp;|&nbsp;
                  <a href="[LINK_1]" style="color: #2563EB;">More info →</a>
                </p>
              </div>

              <!-- Event 2 -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_2]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_2]</h3>
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
                  📅 [DATE_TIME_2] &nbsp;|&nbsp; 📍 [VENUE_2]
                </p>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #4B5563;">[EVENT_DESCRIPTION_2]</p>
                <p style="margin: 0; font-size: 13px;">
                  <span style="color: #059669; font-weight: bold;">💰 [COST_2]</span>
                  &nbsp;|&nbsp;
                  <a href="[LINK_2]" style="color: #2563EB;">More info →</a>
                </p>
              </div>

              <!-- Event 3 -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_3]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_3]</h3>
                <p style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
                  📅 [DATE_TIME_3] &nbsp;|&nbsp; 📍 [VENUE_3]
                </p>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #4B5563;">[EVENT_DESCRIPTION_3]</p>
                <p style="margin: 0; font-size: 13px;">
                  <span style="color: #059669; font-weight: bold;">💰 [COST_3]</span>
                  &nbsp;|&nbsp;
                  <a href="[LINK_3]" style="color: #2563EB;">More info →</a>
                </p>
              </div>

              <div style="text-align: center;">
                <a href="https://www.sanluisway.com/events" style="display: inline-block; padding: 12px 24px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">See All Events →</a>
              </div>
            </td>
          </tr>

          <!-- MORE THIS WEEK -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                🎭 More This Week
              </h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" valign="top" style="padding-right: 10px;">
                    <h4 style="font-size: 14px; color: #C75B39; margin: 0 0 10px 0;">🎭 Culture & Arts</h4>
                    <ul style="margin: 0 0 20px 0; padding-left: 18px; font-size: 13px; color: #4B5563;">
                      <li style="margin-bottom: 5px;">[EVENT] - [DATE]</li>
                      <li>[EVENT] - [DATE]</li>
                    </ul>

                    <h4 style="font-size: 14px; color: #C75B39; margin: 0 0 10px 0;">🍽️ Food & Dining</h4>
                    <ul style="margin: 0 0 20px 0; padding-left: 18px; font-size: 13px; color: #4B5563;">
                      <li>[EVENT] - [DATE]</li>
                    </ul>
                  </td>
                  <td width="50%" valign="top" style="padding-left: 10px;">
                    <h4 style="font-size: 14px; color: #C75B39; margin: 0 0 10px 0;">🎵 Music & Nightlife</h4>
                    <ul style="margin: 0 0 20px 0; padding-left: 18px; font-size: 13px; color: #4B5563;">
                      <li style="margin-bottom: 5px;">[EVENT] - [DATE]</li>
                      <li>[EVENT] - [DATE]</li>
                    </ul>

                    <h4 style="font-size: 14px; color: #C75B39; margin: 0 0 10px 0;">⚽ Sports</h4>
                    <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #4B5563;">
                      <li>[EVENT] - [DATE]</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DID YOU KNOW? -->
          <tr>
            <td style="padding: 30px; background-color: #FFFBEB;">
              <h2 style="font-size: 20px; color: #92400E; margin-bottom: 15px;">
                🧠 Did You Know?
              </h2>
              <h3 style="font-size: 16px; color: #92400E; margin: 0 0 10px 0;">[FACT_TITLE]</h3>
              <p style="font-size: 14px; color: #78350F; margin: 0;">[FACT_BODY]</p>
            </td>
          </tr>

          <!-- AROUND TOWN -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                🏙️ Around Town
              </h2>
              <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px;">What's new in the city</p>

              <div style="background-color: #ECFDF5; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #059669; font-size: 13px;">✨ NOW OPEN</p>
                <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #1F2937;">[NEW_PLACE_NAME]</h4>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">[DESCRIPTION - what it is, why check it out]</p>
                <p style="margin: 0; font-size: 13px; color: #6B7280;">📍 [ADDRESS] | <a href="[LINK]" style="color: #2563EB;">@instagram</a></p>
              </div>

              <div style="background-color: #EFF6FF; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #1D4ED8; font-size: 13px;">📌 GOOD TO KNOW</p>
                <p style="margin: 0; font-size: 14px; color: #4B5563;">[PRACTICAL_CITY_UPDATE]</p>
              </div>
            </td>
          </tr>

          <!-- WEEKEND ESCAPE -->
          <tr>
            <td style="background-color: #F0FDF4; padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                🌿 Weekend Escape
              </h2>
              <h3 style="font-size: 18px; color: #166534; margin: 0 0 15px 0;">[DESTINATION_NAME]</h3>
              <img
                src="[ESCAPE_IMAGE_URL]"
                alt="[ESCAPE_IMAGE_ALT]"
                style="width: 100%; border-radius: 8px; margin-bottom: 15px;"
              />
              <p style="font-size: 14px; color: #4B5563; margin: 0 0 15px 0;">[3-4 sentences about a day trip idea, Huasteca update, or regional attraction. Include practical info.]</p>
              <a href="https://www.sanluisway.com/outdoors" style="color: #166534; font-weight: bold; font-size: 14px;">Explore more day trips →</a>
            </td>
          </tr>

          <!-- COMING UP -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                📅 Coming Up
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #C75B39;">[DATE_1]</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">
                    [UPCOMING_EVENT_1]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #C75B39;">[DATE_2]</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">
                    [UPCOMING_EVENT_2]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #C75B39;">[DATE_3]</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">
                    [UPCOMING_EVENT_3]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #C75B39;">[DATE_4]</strong>
                  </td>
                  <td style="padding: 8px 0; color: #4B5563;">
                    [UPCOMING_EVENT_4]
                  </td>
                </tr>
              </table>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.sanluisway.com/events" style="color: #2563EB; font-weight: bold; font-size: 14px;">Mark your calendar →</a>
              </div>
            </td>
          </tr>

          <!-- PRO TIP -->
          <tr>
            <td style="padding: 30px; background-color: #FEF3C7;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                💡 Expat Pro Tip
              </h2>
              <h3 style="font-size: 16px; color: #92400E; margin: 0 0 10px 0;">[TIP_TITLE]</h3>
              <p style="font-size: 14px; color: #4B5563; margin: 0;">[2-3 sentences with practical advice]</p>
            </td>
          </tr>

          <!-- FROM THE BLOG - Featured Articles -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 5px;">
                📖 From the Blog
              </h2>
              <p style="font-size: 14px; color: #6B7280; margin: 0 0 20px 0;">Fresh reads from San Luis Way</p>

              <!-- Featured Post -->
              <div style="background-color: #FEF3C7; border-radius: 12px; padding: 25px; margin-bottom: 15px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: #C75B39; color: #FFFFFF; border-radius: 12px; font-size: 11px; font-weight: bold; margin-bottom: 12px;">FEATURED</span>
                <h3 style="font-size: 18px; color: #1F2937; margin: 0 0 12px 0;">[BLOG_POST_TITLE]</h3>
                <p style="font-size: 14px; color: #4B5563; margin: 0 0 18px 0; line-height: 1.6;">[ONE_SENTENCE_TEASER]</p>
                <a href="[BLOG_POST_URL]" style="display: inline-block; padding: 12px 24px; background-color: #C75B39; color: #FFFFFF; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Read the Full Story →</a>
              </div>

              <!-- Quick Blog Links -->
              <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px;">
                <p style="font-size: 13px; color: #6B7280; margin: 0 0 12px 0; font-weight: bold;">MORE POPULAR READS:</p>
                <p style="margin: 0 0 8px 0; font-size: 14px;">
                  <a href="https://www.sanluisway.com/blog" style="color: #2563EB; text-decoration: none;">→ Latest articles on expat life in SLP</a>
                </p>
                <p style="margin: 0 0 8px 0; font-size: 14px;">
                  <a href="https://www.sanluisway.com/blog?category=food" style="color: #2563EB; text-decoration: none;">→ Food & restaurant guides</a>
                </p>
                <p style="margin: 0; font-size: 14px;">
                  <a href="https://www.sanluisway.com/blog?category=travel" style="color: #2563EB; text-decoration: none;">→ Day trips & adventures</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- COMUNIDAD SECTION (Custom Content) -->
          <!-- COMUNIDAD_PLACEHOLDER -->

          <!-- CALL TO ACTION -->
          <tr>
            <td style="background-color: #C75B39; text-align: center; padding: 40px 30px;">
              <h2 style="font-size: 24px; color: #FFFFFF; margin-bottom: 15px;">
                [CTA_TITLE]
              </h2>
              <p style="font-size: 16px; color: #EEEEEE; margin: 0 0 25px 0; line-height: 1.6;">
                [CTA_BODY]
              </p>
              <a href="[CTA_BUTTON_LINK]" style="display: inline-block; padding: 14px 32px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                [CTA_BUTTON_LABEL]
              </a>
              <p style="font-size: 13px; color: #CCCCCC; margin: 20px 0 0 0;">
                Join our community discovering the best of San Luis Potosí
              </p>
            </td>
          </tr>

          <!-- CLOSING_FOOTER_PLACEHOLDER -->

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

// Function to clean HTML for Beehiiv compatibility
function cleanHtmlForBeehiiv(html: string): string {
  let cleaned = html;

  // Remove markdown code blocks anywhere in the content
  cleaned = cleaned.replace(/```html\s*/gi, '');
  cleaned = cleaned.replace(/```\s*/gi, '');

  // Remove unreplaced placeholders (text in square brackets that looks like a template variable)
  cleaned = cleaned.replace(/\[(?:NEWS_|EVENT_|BLOG_|LINK_|DATE_|CATEGORY_|VENUE_|COST_|FACT_|TIP_|CTA_|WEATHER_|QUICK_HIT_|PREVIEW_|HERO_|TOP_PICK_|ESCAPE_|NEW_PLACE_|DESTINATION_|UPCOMING_|IMPACT_)[A-Z0-9_]+\]/g, '');

  // Remove generic placeholders like [EVENT], [DATE], [ADDRESS], etc.
  cleaned = cleaned.replace(/\[(?:EVENT|DATE|ADDRESS|DESCRIPTION|LINK|PRACTICAL_CITY_UPDATE)\]/g, '');

  // Remove template instruction comments
  cleaned = cleaned.replace(/\[[\d-]+ sentences[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[[^\]]*what it is[^\]]*\]/gi, '');
  cleaned = cleaned.replace(/\[[^\]]*why check it out[^\]]*\]/gi, '');

  // Remove lines that only contain "→ Why it matters:" with no content
  cleaned = cleaned.replace(/<p[^>]*>→ Why it matters:\s*<\/p>/gi, '');

  // Remove empty list items
  cleaned = cleaned.replace(/<li[^>]*>\s*<\/li>/gi, '');

  // Remove DOCTYPE, html, head, and style tags
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');
  cleaned = cleaned.replace(/<html[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/html>/gi, '');
  cleaned = cleaned.replace(/<head>[\s\S]*?<\/head>/gi, '');
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  cleaned = cleaned.replace(/<body[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/body>/gi, '');

  // Remove MS Office conditional comments
  cleaned = cleaned.replace(/<!--\[if mso\]>[\s\S]*?<!\[endif\]-->/gi, '');
  cleaned = cleaned.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi, '');

  // Remove class attributes (Beehiiv doesn't use them without <style>)
  cleaned = cleaned.replace(/\s+class="[^"]*"/gi, '');

  // Remove role="presentation" attributes
  cleaned = cleaned.replace(/\s+role="presentation"/gi, '');

  // Replace linear-gradient backgrounds with solid colors
  cleaned = cleaned.replace(/background:\s*linear-gradient\([^)]*#C75B39[^)]*\)/gi, 'background-color: #C75B39');
  cleaned = cleaned.replace(/background:\s*linear-gradient\([^)]*#FEF3C7[^)]*\)/gi, 'background-color: #FEF3C7');
  cleaned = cleaned.replace(/background:\s*linear-gradient\([^)]*\)/gi, 'background-color: #F9FAFB');

  // Remove box-shadow (not well supported)
  cleaned = cleaned.replace(/box-shadow:[^;]+;/gi, '');

  // Clean up links with placeholder URLs (href containing brackets or placeholder text)
  cleaned = cleaned.replace(/<a[^>]*href=["'][^"']*\[[^\]]+\][^"']*["'][^>]*>([^<]*)<\/a>/gi, '$1');

  // Remove "More info →" links that point to placeholder URLs
  cleaned = cleaned.replace(/<a[^>]*href=["']#["'][^>]*>[^<]*<\/a>/gi, '');

  // Remove empty lines and trim
  cleaned = cleaned.replace(/^\s*[\r\n]/gm, '');
  cleaned = cleaned.trim();

  return cleaned;
}

// Function to validate and clean URLs in HTML
function validateAndCleanUrls(html: string): string {
  let cleaned = html;

  // Allowed domains for external links
  const allowedDomains = [
    'sanluisway.com',
    'www.sanluisway.com',
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'tiktok.com',
    'google.com',
    'maps.google.com',
    'ticketmaster.com.mx',
    'superboletos.com',
    'eventbrite.com',
    'eventbrite.com.mx',
  ];

  // Find all href attributes and validate them
  const hrefRegex = /href=["']([^"']+)["']/gi;
  cleaned = cleaned.replace(hrefRegex, (match, url) => {
    // Allow anchor links and mailto
    if (url.startsWith('#') || url.startsWith('mailto:')) {
      return match;
    }

    // Allow sanluisway.com URLs
    if (url.includes('sanluisway.com')) {
      return match;
    }

    // Check if URL is from allowed domains
    try {
      const urlObj = new URL(url);
      const isAllowed = allowedDomains.some(domain =>
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      );
      if (isAllowed) {
        return match;
      }
    } catch {
      // Invalid URL - replace with events page
    }

    // For unverified external links, replace with our events page
    return 'href="https://www.sanluisway.com/events"';
  });

  // Remove any remaining placeholder-looking links (containing brackets or suspicious patterns)
  cleaned = cleaned.replace(/href=["'][^"']*(?:\[|\]|example\.com|placeholder|test\.com)[^"']*["']/gi,
    'href="https://www.sanluisway.com/events"');

  return cleaned;
}

// Function to inject the footer into generated HTML
function injectFooterIntoNewsletter(html: string): string {
  // Try to find the placeholder first
  if (html.includes('<!-- CLOSING_FOOTER_PLACEHOLDER -->')) {
    return html.replace('<!-- CLOSING_FOOTER_PLACEHOLDER -->', CLOSING_AND_FOOTER_HTML);
  }

  // If no placeholder, inject before the closing </table> tags
  // Find the pattern: </table> followed by </td> </tr> </table> </body>
  const closingPattern = /<\/table>\s*<\/td>\s*<\/tr>\s*<\/table>\s*<\/body>/i;
  if (closingPattern.test(html)) {
    return html.replace(closingPattern, `${CLOSING_AND_FOOTER_HTML}\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>`);
  }

  // Fallback: inject before </body>
  if (html.includes('</body>')) {
    return html.replace('</body>', `${CLOSING_AND_FOOTER_HTML}\n</body>`);
  }

  // Last resort: append at the end
  return html + CLOSING_AND_FOOTER_HTML;
}

export async function generateWeeklyNewsletter(customContent?: string) {
  const dates = getCurrentNewsletterDates();
  const dateRangeStr = dates.dateRangeStr;
  const supabase = getSupabaseClient();

  if (customContent) {
    console.log('Custom content will be included in newsletter generation');
  }

  console.log('1. Fetching events from DB...');
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', dates.weekStartIso)
    .lte('start_date', dates.weekEndIso)
    .order('start_date', { ascending: true });

  const eventsList = events?.map(e =>
    `- ${e.title} (${format(new Date(e.start_date), 'MMM d')}) @ ${e.location}`
  ).join('\n') || 'No specific DB events.';

  console.log('1.5. Fetching real blog posts from DB...');
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, title, title_en, excerpt, excerpt_en, category')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(10);

  const blogPostsList = blogPosts?.map(post => {
    const title = post.title_en || post.title;
    const excerpt = post.excerpt_en || post.excerpt;
    return `- "${title}" (${post.category || 'general'}) - URL: https://www.sanluisway.com/blog/${post.slug}\n  Excerpt: ${excerpt}`;
  }).join('\n\n') || 'No blog posts available.';

  console.log('1.6. Fetching previously used content to avoid repetition...');

  // Fetch used facts
  const { data: usedFacts } = await supabase
    .from('newsletter_facts')
    .select('fact_title, fact_body')
    .order('used_at', { ascending: false })
    .limit(50);
  const usedFactsList = usedFacts?.map(f => `- ${f.fact_title}`).join('\n') || '';

  // Fetch used tips
  const { data: usedTips } = await supabase
    .from('newsletter_tips')
    .select('tip_title, tip_body')
    .order('used_at', { ascending: false })
    .limit(50);
  const usedTipsList = usedTips?.map(t => `- ${t.tip_title}`).join('\n') || '';

  // Fetch used places
  const { data: usedPlaces } = await supabase
    .from('newsletter_places')
    .select('place_name, place_address')
    .order('used_at', { ascending: false })
    .limit(50);
  const usedPlacesList = usedPlaces?.map(p => `- ${p.place_name}`).join('\n') || '';

  console.log(`   Found: ${usedFacts?.length || 0} facts, ${usedTips?.length || 0} tips, ${usedPlaces?.length || 0} places used previously`);

  console.log('2. 🧠 Performing Deep Research with Gemini Grounding...');

  const prompt = `
    You are the editor of "San Luis Way Weekly".

    ╔══════════════════════════════════════════════════════════════════╗
    ║  CRITICAL DATE/TIME CONTEXT - READ THIS FIRST                   ║
    ╠══════════════════════════════════════════════════════════════════╣
    ║  TODAY'S DATE: ${dates.todayFormatted}
    ║  GENERATION TIME: ${dates.currentDateTime}
    ║  MEXICO CITY LOCAL TIME: ${dates.mexicoCityLocalTime}
    ║  NEWSLETTER COVERS: ${dateRangeStr} (NEXT 7 DAYS)
    ╚══════════════════════════════════════════════════════════════════╝

    TASK: Create a comprehensive weekly digest for San Luis Potosí, Mexico.

    **ABSOLUTELY CRITICAL DATE REQUIREMENTS:**
    1. TODAY is ${dates.todayFormatted} - use this as your reference point
    2. Search for events happening FROM TODAY through ${format(dates.weekEndDate, 'MMMM d, yyyy')}
    3. DO NOT include any events that have ALREADY PASSED (before today)
    4. Only recommend activities for the NEXT 7 DAYS starting from TODAY
    5. When searching, always include the current year (2025) in your queries

    Example: If today is December 21, 2025:
    ✓ Include: Events on December 21, 22, 23, 24, 25, 26, 27, 28
    ✗ Exclude: Events on December 15, 16, 17, 18, 19, 20 (already passed)

    I need information in these 5 areas:

    ═══════════════════════════════════════════════════════════
    SECTION 1: LOCAL NEWS & HEADLINES
    ═══════════════════════════════════════════════════════════

    Search for recent news (past 7 days) about San Luis Potosí:

    TOPICS:
    - City/state government announcements
    - Infrastructure projects and road work
    - New businesses opening or major closings
    - Economic developments and investments
    - Public transportation updates
    - Airport and travel news
    - University news (UASLP, Tec de Monterrey)
    - Tourism initiatives
    - Public safety (relevant updates, not crime reports)

    Also identify 3-4 "Quick Hits": short, practical updates (weather, traffic, construction, small alerts) to include as a bulleted list.

    SOURCES:
    - El Sol de San Luis (elsoldesanluis.com.mx)
    - Pulso SLP (pulsoslp.com.mx)
    - Código San Luis (codigosanluis.com)
    - Plano Informativo (planoinformativo.com)
    - La Jornada San Luis
    - Government sites: slp.gob.mx, sanluis.gob.mx

    FORMAT FOR EACH NEWS ITEM:
    - Headline (translated to English)
    - **Detailed Summary (4-5 sentences)** providing context and depth.
    - Why it matters to residents/expats
    - Source link
    - **Image URL** (if available from search source)

    FORMAT FOR QUICK HITS:
    - List 3-4 short, practical updates.
    - Format each as HTML: "<strong>[Category/Topic]:</strong> [Brief Update text]"
    - Example: "<strong>Traffic Alert:</strong> Continued maintenance on Himno Nacional."

    ═══════════════════════════════════════════════════════════
    SECTION 2: WEATHER FORECAST
    ═══════════════════════════════════════════════════════════

    Search for "Clima San Luis Potosí ${dateRangeStr}" and "Calidad del aire San Luis Potosí".

    FORMAT:
    - General Outlook: (Sunny, rainy, cold front, etc.)
    - High/Low Temps: Range for the week
    - Rain Probability: Days with rain expected
    - Recommendation: (e.g. "Bring a jacket," "High UV warning")

    ═══════════════════════════════════════════════════════════
    SECTION 3: EVENTS & ENTERTAINMENT (NEXT 7 DAYS ONLY)
    ═══════════════════════════════════════════════════════════

    **REMINDER: Today is ${dates.todayFormatted}**

    Search for events happening ONLY from ${format(dates.weekStartDate, 'MMMM d')} through ${format(dates.weekEndDate, 'MMMM d, yyyy')}.

    IMPORTANT SEARCH TIPS:
    - Use search queries like "eventos San Luis Potosí diciembre 2025" or "que hacer en SLP esta semana"
    - Search for "Navidad San Luis Potosí 2025" for Christmas events
    - Check for "posadas", "conciertos", "teatro" happening THIS WEEK
    - DO NOT include events from last week or events that already happened

    CATEGORIES:
    1. CULTURE: festivals, traditions, museum exhibitions, cultural celebrations
    2. MUSIC: concerts, live music, DJ events at venues like Arena Potosí, Teatro de la Paz
    3. FOOD: restaurant events, food festivals, culinary workshops, market specials
    4. SPORTS: Atlético de San Luis games, marathons, cycling, fitness events
    5. FAMILY: kid-friendly activities, workshops, park events
    6. EDUCATIONAL: conferences, workshops, talks, language exchanges
    7. NIGHTLIFE: club events, bar specials, themed nights
    8. WELLNESS: yoga, meditation, health fairs

    SOURCES:
    - Facebook Events in San Luis Potosí
    - Instagram: #sanluispotosi #slpevents #slp
    - Songkick, Bandsintown (concerts)
    - Ticketmaster Mexico, Superboletos
    - Teatro de la Paz (@teatrodelapazslp)
    - Arena Potosí
    - Centro de las Artes (ceartslp.gob.mx)
    - Secretaría de Cultura SLP

    FORMAT FOR EACH EVENT:
    - Event name (English + Spanish if applicable)
    - Date, time, location with address
    - **Detailed description** (3-4 sentences explaining what it is and why it's worth going)
    - Cost/ticket info
    - Website or ticket link
    - **Image URL** (if available)

    DATABASE EVENTS (Include these if relevant):
    ${eventsList}

    ═══════════════════════════════════════════════════════════
    SECTION 4: DID YOU KNOW? (Curious Fact) - MUST BE UNIQUE
    ═══════════════════════════════════════════════════════════

    Search for "datos curiosos San Luis Potosí", "leyendas San Luis Potosí", or "historia San Luis Potosí".

    **CRITICAL: DO NOT REPEAT ANY OF THESE PREVIOUSLY USED FACTS:**
    ${usedFactsList || 'No previous facts recorded yet.'}

    You MUST choose a DIFFERENT fact from the ones listed above. Some topics to explore:
    - Mining history (Real de Catorce, Cerro de San Pedro)
    - Colonial architecture and churches
    - Famous potosinos (Manuel José Othón, Ponciano Arriaga)
    - Traditional cuisine (enchiladas potosinas, gorditas, queso de tuna)
    - Local festivals and traditions
    - Natural wonders (Huasteca Potosina, Tamtoc archaeological site)
    - Local legends and myths
    - Historical events (beyond being Mexico's capital)
    - Cultural traditions (Xantolo, danza de los voladores)
    - Local wildlife and ecosystems

    FORMAT:
    - Title: Catchy header (this will be saved to avoid repetition)
    - Fact: 3-4 sentences explaining the historical or cultural fact.

    ═══════════════════════════════════════════════════════════
    SECTION 5: CITY LIFE & LIFESTYLE - NEW PLACES (NO REPETITION)
    ═══════════════════════════════════════════════════════════

    Search for lifestyle news and updates. Focus on places that opened in the LAST 2-3 MONTHS.

    **CRITICAL: DO NOT REPEAT ANY OF THESE PREVIOUSLY FEATURED PLACES:**
    ${usedPlacesList || 'No previous places recorded yet.'}

    You MUST feature DIFFERENT places from the ones listed above.

    TOPICS TO SEARCH:
    - "nuevos restaurantes San Luis Potosí 2025"
    - "aperturas cafeterías SLP diciembre 2025"
    - "nuevos negocios San Luis Potosí"
    - New shops, boutiques, or services
    - Market schedules and highlights
    - Pop-up events or temporary installations

    **REQUIRED DETAILS FOR EACH PLACE:**
    - Full name of the place
    - Exact address or neighborhood
    - Opening hours (if available)
    - Type of cuisine/products/services
    - Price range ($$, $$$, etc.)
    - Instagram handle or website
    - What makes it special

    SOURCES:
    - Instagram food bloggers in SLP
    - Google Maps new places
    - Local Facebook groups
    - TripAdvisor recent reviews
    - Yelp SLP

    FORMAT:
    - What's new/noteworthy
    - Location and details
    - Why readers should care

    ═══════════════════════════════════════════════════════════
    SECTION 6: EXPLORE & DISCOVER
    ═══════════════════════════════════════════════════════════

    Search for regional tourism and outdoor activities:

    TOPICS:
    - Huasteca Potosina conditions and updates
    - Day trip recommendations for the season
    - Real de Catorce news
    - Xilitla and Las Pozas updates
    - Outdoor activity conditions (hiking, camping)
    - New tours or experiences available
    - Road conditions for popular routes
    - Seasonal natural attractions (waterfalls, blooms, etc.)

    SOURCES:
    - Huasteca tourism sites
    - TripAdvisor
    - Local tour operators
    - Weather services
    - National park announcements

    ═══════════════════════════════════════════════════════════
    SECTION 5: EXPAT ESSENTIALS & PRO TIP (NO REPETITION)
    ═══════════════════════════════════════════════════════════

    Search for practical information AND create ONE unique "Expat Pro Tip".

    **CRITICAL: DO NOT REPEAT ANY OF THESE PREVIOUSLY USED TIPS:**
    ${usedTipsList || 'No previous tips recorded yet.'}

    You MUST provide a DIFFERENT tip from the ones listed above.

    PRO TIP TOPICS TO EXPLORE (choose something NOT used before):
    - How to get a Mexican driver's license in SLP
    - Best money exchange spots (casas de cambio)
    - How to set up utilities (CFE, Interapas, Telmex)
    - Where to find English-speaking doctors/dentists
    - How to use Uber/DiDi effectively in SLP
    - Tips for navigating Mexican bureaucracy
    - Best apps for living in Mexico
    - How to find a good mechanic
    - Tips for renting an apartment
    - Where to find imported products
    - How to deal with Telcel/Movistar
    - Bank account tips for foreigners
    - How to pay bills online
    - Tips for grocery shopping
    - Understanding Mexican holidays and customs

    **REQUIRED FORMAT FOR PRO TIP:**
    - Title: Specific, actionable header (e.g., "Getting Your Mexican Driver's License")
    - Body: 3-4 sentences with SPECIFIC details (addresses, prices, phone numbers if possible)

    SOURCES:
    - INM (immigration) announcements
    - Expat forums and Facebook groups
    - InterNations SLP
    - US/Canadian consulate announcements

    ${customContent ? `
    ═══════════════════════════════════════════════════════════
    ⚠️⚠️⚠️ SECTION 7: COMUNIDAD - THIS IS MANDATORY ⚠️⚠️⚠️
    ═══════════════════════════════════════════════════════════

    **YOU MUST ADD THIS SECTION TO THE NEWSLETTER. DO NOT SKIP IT.**

    The editor provided this content that MUST be included:
    ────────────────────────────────────────
    ${customContent}
    ────────────────────────────────────────

    **HOW TO ADD THE COMUNIDAD SECTION:**

    Find this line in the template:
    <!-- COMUNIDAD_PLACEHOLDER -->

    Replace it ENTIRELY with this HTML (adapt the content from above):

    <tr>
      <td style="padding: 30px; background-color: #FDF4FF;">
        <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">🤝 Comunidad</h2>
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 20px;">From our community to yours</p>
        <div style="background-color: #FFFFFF; border: 1px solid #E9D5FF; border-left: 4px solid #A855F7; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
          <h3 style="font-size: 16px; margin: 0 0 10px 0; color: #7C3AED;">[WRITE ADAPTED TITLE HERE]</h3>
          <p style="margin: 0 0 15px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">[WRITE ADAPTED CONTENT HERE - preserve all dates, codes, prices]</p>
          <p style="margin: 0; font-size: 14px;"><span style="background-color: #F3E8FF; color: #7C3AED; padding: 4px 12px; border-radius: 4px; font-weight: bold;">[DISCOUNT CODE OR HIGHLIGHT IF ANY]</span></p>
        </div>
      </td>
    </tr>

    **CHECKLIST:**
    ✓ Did you include the 🤝 Comunidad header?
    ✓ Did you adapt the custom content naturally?
    ✓ Did you preserve ALL specific details (dates, codes, prices, names)?
    ✓ Is the section placed BEFORE the CTA (terracotta section)?

    ` : ''}

    ═══════════════════════════════════════════════════════════
    FINAL INSTRUCTIONS - READ CAREFULLY
    ═══════════════════════════════════════════════════════════

    **REQUIRED SPECIFIC DETAILS FOR ALL CONTENT:**
    Every event, place, and recommendation MUST include:
    ✓ Exact DATE (e.g., "Saturday, December 23")
    ✓ Exact TIME (e.g., "7:00 PM - 10:00 PM")
    ✓ Full ADDRESS or at least neighborhood (e.g., "Av. Carranza 500, Centro")
    ✓ PRICE/COST when applicable (e.g., "$150 MXN", "Free entry")
    ✓ Contact info when available (phone, Instagram, website)

    DO NOT use vague phrases like "this weekend" or "coming soon" - use SPECIFIC dates.

    **CONTENT REQUIREMENTS:**
    - News items: 4-5 sentences with context and impact
    - Event descriptions: Include what to expect, who it's for, and logistics
    - Pro Tip: Specific, actionable advice with real details
    - Weather: Include temperature range and specific days

    **TEMPLATE INSTRUCTIONS:**
    - Replace [WEATHER_SUMMARY] with 7-day outlook (e.g., "Mostly sunny, 18-25°C, chance of rain Thursday")
    - Replace [FACT_TITLE] and [FACT_BODY] with a NEW curious fact (not from the used list)
    - Replace [TIP_TITLE] with a NEW pro tip title (not from the used list)
    - **REMOVE ALL <img> TAGS** - Images cause loading issues in emails
    ${customContent ? '- **REPLACE <!-- COMUNIDAD_PLACEHOLDER --> with the Comunidad section HTML**' : ''}

    **BLOG SECTION - USE ONLY THESE REAL POSTS:**
    ${blogPostsList}
    Use ONLY the exact URLs above - DO NOT invent URLs.

    **LINKS:**
    - For events: Use verified links from search OR https://www.sanluisway.com/events
    - DO NOT invent fake URLs

    **CTA VALUES:**
    - CTA_TITLE: "Discover More of San Luis Potosí"
    - CTA_BODY: "From hidden gems to local favorites, explore everything the city has to offer"
    - CTA_BUTTON_LABEL: "Visit San Luis Way"
    - CTA_BUTTON_LINK: https://www.sanluisway.com

    **CRITICAL:**
    - Replace ALL [PLACEHOLDER] text with real content
    - Do NOT generate footer/closing - it's added automatically
    - Stop after the CTA section

    HTML TEMPLATE:
    ${NEWSLETTER_TEMPLATE}

    Return ONLY the raw HTML.
  `;

  let htmlContent = '';

  try {
    // Try Gemini first
    const result = await model.generateContent(prompt);
    const response = await result.response;
    htmlContent = response.text();
    console.log('3. ✅ Gemini generation successful');

  } catch (geminiError) {
    console.error("Gemini Generation Error:", geminiError);

    // Fallback to OpenAI
    if (openai) {
      try {
        htmlContent = await generateWithOpenAI(prompt);
        console.log('4. ✅ OpenAI fallback successful');
      } catch (openaiError) {
        console.error("OpenAI Fallback Error:", openaiError);
        throw new Error("Both Gemini and OpenAI failed to generate newsletter");
      }
    } else {
      throw new Error("Gemini failed and OpenAI not configured. Add OPENAI_API_KEY to .env");
    }
  }

  // Clean up markdown code fences if present
  htmlContent = htmlContent.replace(/^```html\n?/i, '').replace(/^```\n?/, '').replace(/\n?```$/i, '');

  // IMPORTANT: Inject the standardized footer/closing section
  // This ensures the footer is ALWAYS included exactly as defined, regardless of AI output
  console.log('4. 📧 Injecting standardized footer and closing section...');
  htmlContent = injectFooterIntoNewsletter(htmlContent);

  // Clean HTML for Beehiiv compatibility (remove <style>, <head>, class attributes)
  console.log('5. 🧹 Cleaning HTML for Beehiiv compatibility...');
  htmlContent = cleanHtmlForBeehiiv(htmlContent);

  // Validate and clean URLs
  console.log('6. 🔗 Validating and cleaning URLs...');
  htmlContent = validateAndCleanUrls(htmlContent);

  // Extract and save content to avoid repetition in future newsletters
  console.log('7. 💾 Extracting and saving content to prevent repetition...');

  // Save "Did You Know?" fact
  try {
    const factTitleMatch = htmlContent.match(/🧠 Did You Know\?[\s\S]*?<h3[^>]*>([^<]+)<\/h3>/i);
    const factBodyMatch = htmlContent.match(/🧠 Did You Know\?[\s\S]*?<\/h3>\s*<p[^>]*>([^<]+)<\/p>/i);

    if (factTitleMatch && factBodyMatch) {
      const factTitle = factTitleMatch[1].trim();
      const factBody = factBodyMatch[1].trim();

      if (factTitle && factBody && factTitle.length > 3 && factBody.length > 20) {
        await supabase.from('newsletter_facts').insert({
          fact_title: factTitle,
          fact_body: factBody,
        });
        console.log(`   ✅ Saved fact: "${factTitle.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save fact:', e);
  }

  // Save "Expat Pro Tip"
  try {
    const tipTitleMatch = htmlContent.match(/💡 Expat Pro Tip[\s\S]*?<h3[^>]*>([^<]+)<\/h3>/i);
    const tipBodyMatch = htmlContent.match(/💡 Expat Pro Tip[\s\S]*?<\/h3>\s*<p[^>]*>([^<]+)<\/p>/i);

    if (tipTitleMatch && tipBodyMatch) {
      const tipTitle = tipTitleMatch[1].trim();
      const tipBody = tipBodyMatch[1].trim();

      if (tipTitle && tipBody && tipTitle.length > 3 && tipBody.length > 20) {
        await supabase.from('newsletter_tips').insert({
          tip_title: tipTitle,
          tip_body: tipBody,
        });
        console.log(`   ✅ Saved tip: "${tipTitle.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save tip:', e);
  }

  // Save "Now Open" place
  try {
    const placeMatch = htmlContent.match(/✨ NOW OPEN[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<p[^>]*>([^<]+)<\/p>/i);

    if (placeMatch) {
      const placeName = placeMatch[1].trim();
      const placeDesc = placeMatch[2].trim();

      if (placeName && placeName.length > 2) {
        await supabase.from('newsletter_places').insert({
          place_name: placeName,
          place_description: placeDesc,
        });
        console.log(`   ✅ Saved place: "${placeName.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save place:', e);
  }

  return {
    subject: `San Luis Way Weekly | ${dateRangeStr}`,
    html_content: htmlContent,
    date_range: dateRangeStr
  };
}
