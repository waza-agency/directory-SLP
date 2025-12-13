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

export function getCurrentNewsletterDates(referenceDate = new Date()) {
  const nextMonday = startOfWeek(addDays(referenceDate, 7), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(nextMonday, { weekStartsOn: 1 });

  return {
    currentDate: format(referenceDate, 'MMMM d, yyyy'),
    weekStartDate: nextMonday,
    weekEndDate: weekEnd,
    weekStartIso: nextMonday.toISOString(),
    weekEndIso: weekEnd.toISOString(),
    dateRangeStr: `${format(nextMonday, 'MMMM d')} - ${format(weekEnd, 'MMMM d, yyyy')}`,
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
  ]
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

// Exact HTML Template from Style Guide
export const CLOSING_AND_FOOTER_HTML = `
          <!-- EXPLORE SAN LUIS WAY - Promotional Section -->
          <tr>
            <td class="section" style="padding: 30px; background-color: #F0F9FF;">
              <h2 style="font-size: 18px; color: #1F2937; margin: 0 0 20px 0; text-align: center;">
                🗺️ Explore More on San Luis Way
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/events" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <span style="font-size: 24px;">🎭</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Events</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/blog" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <span style="font-size: 24px;">📖</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Blog</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/directory" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <span style="font-size: 24px;">📍</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Directory</p>
                      </div>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/outdoors" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <span style="font-size: 24px;">🌿</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Outdoors</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/restaurants" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <span style="font-size: 24px;">🍽️</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Restaurants</p>
                      </div>
                    </a>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <a href="https://www.sanluisway.com/services" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
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
            <td class="section" style="padding: 30px; text-align: center; background-color: #F9FAFB;">
              <p style="font-size: 17px; color: #1F2937; margin: 0 0 15px 0; font-weight: 500;">That's a wrap for this week! 🎬</p>
              <p style="font-size: 15px; color: #4B5563; margin: 0 0 12px 0;">Got a tip, event, or story we should know about?</p>
              <p style="font-size: 15px; color: #C75B39; margin: 0 0 20px 0; font-weight: bold;">👉 Just hit reply - we read every message!</p>
              <p style="font-size: 14px; color: #6B7280; margin: 0 0 25px 0;">Love this newsletter? <strong>Forward it to a friend</strong> who's curious about SLP life.</p>

              <!-- Social Links - Enhanced -->
              <p style="font-size: 13px; color: #6B7280; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Follow Us</p>
              <div style="margin-bottom: 25px;">
                <a href="https://www.sanluisway.com" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🌐 Website</a>
                <a href="https://www.instagram.com/sanluisway/" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📸 Instagram</a>
                <a href="https://www.tiktok.com/@sanluisway" style="display: inline-block; margin: 0 8px; padding: 10px 15px; background-color: #FFFFFF; border-radius: 8px; color: #1F2937; text-decoration: none; font-size: 13px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🎵 TikTok</a>
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
              <img src="https://www.sanluisway.com/images/logo.jpeg" alt="San Luis Way" width="120" style="max-width: 120px; height: auto; margin-bottom: 15px; opacity: 0.9;">
              <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0 0 10px 0;">
                San Luis Way | Your guide to life in San Luis Potosí
              </p>
              <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 0 10px 0;">
                SanLuisWay.com keeps expats and locals connected to the stories, spots, and services that define the city.
              </p>
              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 15px 0;">
                San Luis Potosí, México
              </p>
              <p style="margin: 0;">
                <a href="[UNSUBSCRIBE_URL]" style="color: rgba(255,255,255,0.6); font-size: 12px; text-decoration: underline;">Unsubscribe</a>
                <span style="color: rgba(255,255,255,0.4); margin: 0 10px;">|</span>
                <a href="[PREFERENCES_URL]" style="color: rgba(255,255,255,0.6); font-size: 12px; text-decoration: underline;">Update Preferences</a>
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

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #C75B39 0%, #FFCB05 100%); padding: 30px; text-align: center;">
              <img src="https://www.sanluisway.com/images/logo.jpeg" alt="San Luis Way" width="200" style="max-width: 200px; height: auto;">
              <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 28px; margin: 20px 0 5px 0;">San Luis Way Weekly</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0;">Your digest of Potosino life</p>
              <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 10px 0 0 0; font-weight: bold;">[WEEK_DATE_RANGE]</p>
            </td>
          </tr>

          <!-- OPENING HOOK -->
          <tr>
            <td class="section" style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.7;">Hey there! 👋</p>
              <p style="font-size: 16px; line-height: 1.7;">[OPENING_HOOK_TEXT]</p>
              <img
                src="[HERO_IMAGE_URL]"
                alt="[HERO_IMAGE_ALT]"
                style="width: 100%; border-radius: 12px; margin-top: 20px;"
              />
            </td>
          </tr>

          <!-- WEATHER & ENVIRONMENT (New Pillar 2) -->
          <tr>
            <td class="section section-alt" style="background-color: #F0F9FF; padding: 20px 30px;">
              <h2 style="font-size: 18px; color: #0C4A6E; margin-bottom: 10px;">
                <span class="emoji">🌦️</span> Weather Watch
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
            <td class="section section-alt" style="background-color: #FEF2F2;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                <span class="emoji">📰</span> The Week in SLP
              </h2>
              <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px;">What you need to know</p>

              <!-- News Item 1 -->
              <div class="card news-card" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #C75B39; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <h3 style="font-size: 16px; margin: 0 0 10px 0; color: #1F2937;">[NEWS_HEADLINE_1]</h3>
                <!-- Optional Image for News 1 -->
                <!-- <img src="[NEWS_IMAGE_1]" style="width: 100%; border-radius: 4px; margin-bottom: 10px;"> -->
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">[NEWS_SUMMARY_1]</p>
                <p style="margin: 0; font-size: 13px; color: #C75B39; font-style: italic;">→ Why it matters: [IMPACT_1]</p>
              </div>

              <!-- News Item 2 -->
              <div class="card news-card" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #C75B39; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
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
            <td class="section" style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                <span class="emoji">🌟</span> This Week's Top Picks
              </h2>

              <!-- Event 1 -->
              <div class="card event-card" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <span class="tag" style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_1]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_1]</h3>
                <p class="meta" style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
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
              <div class="card event-card" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <span class="tag" style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_2]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_2]</h3>
                <p class="meta" style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
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
              <div class="card event-card" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <span class="tag" style="display: inline-block; padding: 4px 10px; background-color: #FEF3C7; color: #92400E; border-radius: 12px; font-size: 12px; font-weight: bold;">[CATEGORY_3]</span>
                <h3 style="font-size: 18px; margin: 12px 0 10px 0; color: #1F2937;">[EVENT_NAME_3]</h3>
                <p class="meta" style="color: #6B7280; font-size: 13px; margin: 0 0 10px 0;">
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
                <a href="https://www.sanluisway.com/events" class="btn" style="display: inline-block; padding: 12px 24px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">See All Events →</a>
              </div>
            </td>
          </tr>

          <!-- MORE THIS WEEK -->
          <tr>
            <td class="section section-alt" style="background-color: #F9FAFB; padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                <span class="emoji">🎭</span> More This Week
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

          <!-- DID YOU KNOW? (New Pillar 4) -->
          <tr>
            <td class="section" style="padding: 30px; background-color: #FFFBEB;">
              <h2 style="font-size: 20px; color: #92400E; margin-bottom: 15px;">
                <span class="emoji">🧠</span> Did You Know?
              </h2>
              <h3 style="font-size: 16px; color: #92400E; margin: 0 0 10px 0;">[FACT_TITLE]</h3>
              <p style="font-size: 14px; color: #78350F; margin: 0;">[FACT_BODY]</p>
            </td>
          </tr>

          <!-- AROUND TOWN -->
          <tr>
            <td class="section" style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                <span class="emoji">🏙️</span> Around Town
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
            <td class="section section-alt" style="background-color: #F0FDF4; padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                <span class="emoji">🌿</span> Weekend Escape
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
            <td class="section" style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 20px;">
                <span class="emoji">📅</span> Coming Up
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

          <!-- MEME OF THE WEEK (New Pillar 6) -->
          <tr>
            <td class="section" style="padding: 20px 30px; text-align: center; background-color: #FFFFFF;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                <span class="emoji">😂</span> Potosino Humor
              </h2>
              <!-- <img src="[MEME_IMAGE_URL]" style="max-width: 100%; border-radius: 8px; margin-bottom: 10px;"> -->
              <p style="font-size: 14px; color: #4B5563; font-style: italic;">[MEME_DESCRIPTION_OR_JOKE]</p>
            </td>
          </tr>

          <!-- PRO TIP -->
          <tr>
            <td class="section" style="padding: 30px; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                <span class="emoji">💡</span> Expat Pro Tip
              </h2>
              <h3 style="font-size: 16px; color: #92400E; margin: 0 0 10px 0;">[TIP_TITLE]</h3>
              <p style="font-size: 14px; color: #4B5563; margin: 0;">[2-3 sentences with practical advice]</p>
            </td>
          </tr>

          <!-- FROM THE BLOG - Featured Articles -->
          <tr>
            <td class="section" style="padding: 30px;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 5px;">
                <span class="emoji">📖</span> From the Blog
              </h2>
              <p style="font-size: 14px; color: #6B7280; margin: 0 0 20px 0;">Fresh reads from San Luis Way</p>

              <!-- Featured Post -->
              <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 12px; padding: 25px; margin-bottom: 15px;">
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

          <!-- CALL TO ACTION - Engaging -->
          <tr>
            <td class="section section-alt" style="background: linear-gradient(135deg, #C75B39 0%, #E07A5F 100%); text-align: center; padding: 40px 30px;">
              <h2 style="font-size: 24px; color: #FFFFFF; margin-bottom: 15px;">
                [CTA_TITLE]
              </h2>
              <p style="font-size: 16px; color: rgba(255,255,255,0.9); margin: 0 0 25px 0; line-height: 1.6;">
                [CTA_BODY]
              </p>
              <a href="[CTA_BUTTON_LINK]" style="display: inline-block; padding: 14px 32px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                [CTA_BUTTON_LABEL]
              </a>
              <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin: 20px 0 0 0;">
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

export async function generateWeeklyNewsletter() {
  const dates = getCurrentNewsletterDates();
  const dateRangeStr = dates.dateRangeStr;
  const supabase = getSupabaseClient();

  console.log('1. Fetching events from DB...');
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', dates.weekStartIso)
    .lte('start_date', addDays(dates.weekEndDate, 14).toISOString())
    .order('start_date', { ascending: true });

  const eventsList = events?.map(e =>
    `- ${e.title} (${format(new Date(e.start_date), 'MMM d')}) @ ${e.location}`
  ).join('\n') || 'No specific DB events.';

  console.log('2. 🧠 Performing Deep Research with Gemini Grounding...');

  const prompt = `
    You are the editor of "San Luis Way Weekly".

    TASK: Create a comprehensive weekly digest for San Luis Potosí, Mexico for the week of ${dateRangeStr}.
    Use today's date: ${dates.currentDate} so the newsletter reflects the current context.

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
    SECTION 3: EVENTS & ENTERTAINMENT
    ═══════════════════════════════════════════════════════════

    Search for events happening ${dateRangeStr} + preview next 2 weeks:

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
    SECTION 4: DID YOU KNOW? (Curious Fact)
    ═══════════════════════════════════════════════════════════

    Search for "datos curiosos San Luis Potosí", "leyendas San Luis Potosí", or "historia San Luis Potosí".

    FORMAT:
    - Title: Catchy header
    - Fact: 3-4 sentences explaining the historical or cultural fact.

    ═══════════════════════════════════════════════════════════
    SECTION 5: CITY LIFE & LIFESTYLE
    ═══════════════════════════════════════════════════════════

    Search for lifestyle news and updates:

    TOPICS:
    - New restaurant/cafe/bar openings in SLP
    - Restaurant closings or relocations
    - New shops or services
    - Market schedules and highlights
    - Neighborhood developments
    - Local business spotlights
    - Seasonal specialties available
    - Local trends and what's popular

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
    SECTION 6: MEME / HUMOR
    ═══════════════════════════════════════════════════════════

    Search for "memes San Luis Potosí", "chistes potosinos", or relate to a current event (e.g. cold weather, traffic).

    FORMAT:
    - Title: "Meme of the Week" or "Potosino Humor"
    - Description: Text describing the humorous situation or meme image.
    - Image URL: Link to a relevant funny image if found (or use a placeholder).

    ═══════════════════════════════════════════════════════════
    SECTION 7: EXPLORE & DISCOVER
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
    SECTION 5: EXPAT ESSENTIALS
    ═══════════════════════════════════════════════════════════

    Search for practical information:

    TOPICS:
    - Immigration/visa news affecting Mexico
    - Currency exchange rates and trends
    - New services useful for expats
    - Healthcare updates
    - Networking events for internationals
    - Language exchange meetups
    - Expat community gatherings
    - Useful local tips

    SOURCES:
    - INM (immigration) announcements
    - Expat forums and Facebook groups
    - InterNations SLP
    - US/Canadian consulate announcements

    INSTRUCTIONS:
    - Fill in the HTML template below with detailed information.
    - **EXPAND** all summaries. News items should be 4-5 sentences long. Event descriptions should be detailed.
    - Replace [WEATHER_SUMMARY] with a 7-day outlook (temps, rain) and [WEATHER_TIP] with a recommendation.
    - Replace [FACT_TITLE] and [FACT_BODY] with the curious fact found.
    - Replace [MEME_DESCRIPTION] with a text description of a funny situation or meme relevant to SLP (e.g. about the weather, Enchiladas Potosinas, traffic).
    - Replace [HERO_IMAGE_URL] and [HERO_IMAGE_ALT] with a hero image that captures the week's story along with accessible alt text.
    - Replace [TOP_PICK_IMAGE_URL] and [TOP_PICK_IMAGE_ALT] with a striking image for the lead event card and descriptive alt text.
    - Replace [ESCAPE_IMAGE_URL] and [ESCAPE_IMAGE_ALT] with the photo used in the Weekend Escape section plus alt text.
    - Provide actual URLs (not placeholders) for the images and cite the source if available; duplicates of the same URL are okay if two images are themed differently.
    - Ensure the "Why it matters" section explains the local impact clearly.
    - Replace [QUICK_HIT_1], [QUICK_HIT_2], [QUICK_HIT_3] with the practical updates found.
    - Replace [BLOG_POST_TITLE], [ONE_SENTENCE_TEASER], and [BLOG_POST_URL] with a promoted blog post worth reading.
    - Craft the CTA content ([CTA_TITLE], [CTA_BODY], [CTA_BUTTON_LABEL], [CTA_BUTTON_LINK]) as a bold invitation to read the blog or take another high-value action.
    - IMPORTANT: Do NOT generate any closing section, footer, social links, or "Hasta la próxima" signature. Stop after the CTA section. The closing/footer will be added automatically by the system.

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

  return {
    subject: `San Luis Way Weekly | ${dateRangeStr}`,
    html_content: htmlContent,
    date_range: dateRangeStr
  };
}
