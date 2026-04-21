import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { fetchWeatherForecast, WeatherForecast } from './api/dashboard-data';

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
    } as never,
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
        content: `You are the editor of "San Luis Way Weekly", a newsletter for expats and locals in San Luis Potosí, MEXICO (not USA).

VOICE: Write like a knowledgeable friend who lives in SLP. Casual but informed, use "we" and "our city". Sprinkle Spanish naturally. Always actionable - tell readers what to DO, where to GO.

RULES:
- ALL content must be about San Luis Potosí, MEXICO only (not Arizona, California, or any US location)
- All prices in MXN pesos, phone numbers with +52 country code
- Include specific dates, times, addresses for every event/place
- No vague language - be specific with real details
- No <img> tags
- Generate HTML that fills the provided template placeholders with real content`
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
                    <a href="https://www.sanluisway.com/places" style="text-decoration: none;">
                      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E5E7EB;">
                        <span style="font-size: 24px;">📍</span>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #1F2937; font-weight: bold;">Places</p>
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
            <td bgcolor="#C75B39" style="background-color: #C75B39; padding: 30px; text-align: center;">
              <img src="https://www.sanluisway.com/images/logo.jpeg" alt="San Luis Way" width="200" style="max-width: 200px; height: auto;">
              <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 28px; margin: 20px 0 5px 0;">San Luis Way Weekly</h1>
              <p style="color: #FFE9E0; font-size: 14px; margin: 0;">Your digest of Potosino life</p>
              <p style="color: #FFD9C9; font-size: 13px; margin: 10px 0 0 0; font-weight: bold;">[WEEK_DATE_RANGE]</p>
            </td>
          </tr>

          <!-- OPENING HOOK -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.7;">Hey there! 👋</p>
              <p style="font-size: 16px; line-height: 1.7;">[OPENING_HOOK_TEXT]</p>
            </td>
          </tr>

          <!-- AD_PLACEMENT_TOP -->

          <!-- CARD 1: THIS WEEK AT A GLANCE -->
          <tr>
            <td style="padding: 16px 24px;">
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
                <div bgcolor="#0C4A6E" style="background-color: #0C4A6E; padding: 16px 22px;">
                  <h2 style="margin: 0; color: #FFFFFF; font-size: 20px; font-family: Georgia, serif;">🗞️ This Week at a Glance</h2>
                  <p style="margin: 4px 0 0 0; color: #BAE6FD; font-size: 12px;">The essentials before you start the week</p>
                </div>

                <!-- WEATHER & ENVIRONMENT -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 8px 0; color: #0C4A6E; font-size: 16px;">🌦️ Weather Watch</h3>
                  <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Forecast:</strong> [WEATHER_SUMMARY]</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Tip:</strong> [WEATHER_RECOMMENDATION]</p>
                </div>

                <!-- MARKET WATCH -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 12px 0; color: #166534; font-size: 16px;">💰 Market Watch</h3>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="33%" style="text-align: center; padding: 4px;">
                        <p style="margin: 0; font-size: 11px; color: #6B7280;">USD/MXN</p>
                        <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #166534;">[EXCHANGE_RATE]</p>
                      </td>
                      <td width="34%" style="text-align: center; padding: 4px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
                        <p style="margin: 0; font-size: 11px; color: #6B7280;">Gasolina Regular</p>
                        <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #166534;">[GAS_PRICE] /L</p>
                      </td>
                      <td width="33%" style="text-align: center; padding: 4px;">
                        <p style="margin: 0; font-size: 11px; color: #6B7280;">Gas LP</p>
                        <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #166534;">[LP_GAS_PRICE] /kg</p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #6B7280; text-align: center;">[MARKET_TREND_NOTE]</p>
                </div>

                <!-- NEWS SECTION -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #C75B39; font-size: 16px;">📰 Top News</h3>
                  <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #1F2937;">[NEWS_HEADLINE_1]</h4>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">[NEWS_SUMMARY_1]</p>
                  <p style="margin: 0; font-size: 13px; color: #C75B39; font-style: italic;">→ Why it matters: [IMPACT_1]</p>
                </div>

                <!-- QUICK HITS -->
                <div style="padding: 18px 22px; background-color: #FAFBFC;">
                  <h3 style="margin: 0 0 10px 0; color: #374151; font-size: 15px;">⚡ Quick Hits</h3>
                  <ul style="margin: 0; padding-left: 18px; font-size: 14px; color: #4B5563;">
                    <li style="margin-bottom: 6px;">[QUICK_HIT_1]</li>
                    <li style="margin-bottom: 6px;">[QUICK_HIT_2]</li>
                    <li>[QUICK_HIT_3]</li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>

          <!-- CARD 2: WHAT'S ON -->
          <tr>
            <td style="padding: 16px 24px;">
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
                <div bgcolor="#C75B39" style="background-color: #C75B39; padding: 16px 22px;">
                  <h2 style="margin: 0; color: #FFFFFF; font-size: 20px; font-family: Georgia, serif;">🎟️ What's On</h2>
                  <p style="margin: 4px 0 0 0; color: #FFE9E0; font-size: 12px;">Events, places and openings worth your week</p>
                </div>

                <!-- TOP PICKS -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 14px 0; color: #1F2937; font-size: 16px;">🌟 This Week's Top Picks</h3>

                  <div style="background-color: #FAFBFC; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #FEF3C7; color: #92400E; border-radius: 10px; font-size: 11px; font-weight: bold;">[CATEGORY_1]</span>
                    <h4 style="font-size: 16px; margin: 10px 0 8px 0; color: #1F2937;">[EVENT_NAME_1]</h4>
                    <p style="color: #6B7280; font-size: 12px; margin: 0 0 8px 0;">📅 [DATE_TIME_1] &nbsp;|&nbsp; 📍 [VENUE_1]</p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #4B5563;">[EVENT_DESCRIPTION_1]</p>
                    <p style="margin: 0; font-size: 12px;"><span style="color: #059669; font-weight: bold;">💰 [COST_1]</span> &nbsp;|&nbsp; <a href="[LINK_1]" style="color: #2563EB;">More info →</a></p>
                  </div>

                  <div style="background-color: #FAFBFC; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #FEF3C7; color: #92400E; border-radius: 10px; font-size: 11px; font-weight: bold;">[CATEGORY_2]</span>
                    <h4 style="font-size: 16px; margin: 10px 0 8px 0; color: #1F2937;">[EVENT_NAME_2]</h4>
                    <p style="color: #6B7280; font-size: 12px; margin: 0 0 8px 0;">📅 [DATE_TIME_2] &nbsp;|&nbsp; 📍 [VENUE_2]</p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #4B5563;">[EVENT_DESCRIPTION_2]</p>
                    <p style="margin: 0; font-size: 12px;"><span style="color: #059669; font-weight: bold;">💰 [COST_2]</span> &nbsp;|&nbsp; <a href="[LINK_2]" style="color: #2563EB;">More info →</a></p>
                  </div>

                  <div style="background-color: #FAFBFC; border: 1px solid #E5E7EB; border-left: 4px solid #FFCB05; border-radius: 8px; padding: 16px; margin-bottom: 14px;">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #FEF3C7; color: #92400E; border-radius: 10px; font-size: 11px; font-weight: bold;">[CATEGORY_3]</span>
                    <h4 style="font-size: 16px; margin: 10px 0 8px 0; color: #1F2937;">[EVENT_NAME_3]</h4>
                    <p style="color: #6B7280; font-size: 12px; margin: 0 0 8px 0;">📅 [DATE_TIME_3] &nbsp;|&nbsp; 📍 [VENUE_3]</p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #4B5563;">[EVENT_DESCRIPTION_3]</p>
                    <p style="margin: 0; font-size: 12px;"><span style="color: #059669; font-weight: bold;">💰 [COST_3]</span> &nbsp;|&nbsp; <a href="[LINK_3]" style="color: #2563EB;">More info →</a></p>
                  </div>

                  <div style="text-align: center;">
                    <a href="https://www.sanluisway.com/events" style="display: inline-block; padding: 10px 20px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">See All Events →</a>
                  </div>
                </div>

                <!-- MORE THIS WEEK -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 12px 0; color: #1F2937; font-size: 16px;">🎭 More This Week</h3>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 8px;">
                        <p style="font-size: 13px; color: #C75B39; margin: 0 0 6px 0; font-weight: bold;">🎭 Culture &amp; Arts</p>
                        <ul style="margin: 0 0 14px 0; padding-left: 16px; font-size: 12px; color: #4B5563;">
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                        </ul>
                        <p style="font-size: 13px; color: #C75B39; margin: 0 0 6px 0; font-weight: bold;">🍽️ Food &amp; Dining</p>
                        <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #4B5563;">
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                        </ul>
                      </td>
                      <td width="50%" valign="top" style="padding-left: 8px;">
                        <p style="font-size: 13px; color: #C75B39; margin: 0 0 6px 0; font-weight: bold;">🎵 Music &amp; Nightlife</p>
                        <ul style="margin: 0 0 14px 0; padding-left: 16px; font-size: 12px; color: #4B5563;">
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                        </ul>
                        <p style="font-size: 13px; color: #C75B39; margin: 0 0 6px 0; font-weight: bold;">⚽ Sports</p>
                        <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #4B5563;">
                          <li style="margin-bottom: 6px;"><strong>[EVENT_NAME]</strong><br/><span style="color: #6B7280;">[DATE] @ [VENUE] · [TIME]</span></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- SPOT OF THE WEEK -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #EA580C; font-size: 16px;">📍 Spot of the Week</h3>
                  <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #1F2937;">[SPOT_NAME]</h4>
                  <p style="margin: 0 0 8px 0; font-size: 13px; color: #4B5563; line-height: 1.6;">[SPOT_DESCRIPTION]</p>
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">📍 [SPOT_ADDRESS]</p>
                  <p style="margin: 0 0 6px 0; font-size: 12px; color: #6B7280;">🕐 [SPOT_HOURS]</p>
                  <p style="margin: 0; font-size: 12px;"><a href="[SPOT_MAPS_LINK]" style="color: #EA580C; font-weight: bold;">View on Google Maps →</a></p>
                </div>

                <!-- AROUND TOWN -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #059669; font-size: 16px;">🏙️ Around Town</h3>
                  <div style="background-color: #ECFDF5; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                    <p style="margin: 0 0 4px 0; font-weight: bold; color: #059669; font-size: 11px;">✨ NOW OPEN</p>
                    <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #1F2937;">[NEW_PLACE_NAME]</h4>
                    <p style="margin: 0 0 6px 0; font-size: 13px; color: #4B5563;">[DESCRIPTION - what it is, why check it out]</p>
                    <p style="margin: 0; font-size: 12px; color: #6B7280;">📍 [ADDRESS] | <a href="[LINK]" style="color: #2563EB;">@instagram</a></p>
                  </div>
                  <div style="background-color: #EFF6FF; border-radius: 6px; padding: 12px;">
                    <p style="margin: 0 0 4px 0; font-weight: bold; color: #1D4ED8; font-size: 11px;">📌 GOOD TO KNOW</p>
                    <p style="margin: 0; font-size: 13px; color: #4B5563;">[PRACTICAL_CITY_UPDATE]</p>
                  </div>
                </div>

                <!-- COMING UP -->
                <div style="padding: 18px 22px; background-color: #FAFBFC;">
                  <h3 style="margin: 0 0 10px 0; color: #1F2937; font-size: 16px;">📅 Coming Up</h3>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                    <tr>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB; width: 35%;"><strong style="color: #C75B39;">[DATE_1]</strong></td>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">[UPCOMING_EVENT_1]</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB;"><strong style="color: #C75B39;">[DATE_2]</strong></td>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">[UPCOMING_EVENT_2]</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB;"><strong style="color: #C75B39;">[DATE_3]</strong></td>
                      <td style="padding: 6px 0; border-bottom: 1px solid #E5E7EB; color: #4B5563;">[UPCOMING_EVENT_3]</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0;"><strong style="color: #C75B39;">[DATE_4]</strong></td>
                      <td style="padding: 6px 0; color: #4B5563;">[UPCOMING_EVENT_4]</td>
                    </tr>
                  </table>
                  <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px;"><a href="https://www.sanluisway.com/events" style="color: #2563EB; font-weight: bold;">Mark your calendar →</a></p>
                </div>
              </div>
            </td>
          </tr>

          <!-- AD_PLACEMENT_MIDDLE -->

          <!-- CARD 3: EXPAT TOOLKIT -->
          <tr>
            <td style="padding: 16px 24px;">
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
                <div bgcolor="#5B21B6" style="background-color: #5B21B6; padding: 16px 22px;">
                  <h2 style="margin: 0; color: #FFFFFF; font-size: 20px; font-family: Georgia, serif;">🧭 Expat Toolkit</h2>
                  <p style="margin: 4px 0 0 0; color: #E9D5FF; font-size: 12px;">Things that make living here easier</p>
                </div>

                <!-- ASK AN EXPAT -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #5B21B6; font-size: 16px;">🙋 Ask an Expat</h3>
                  <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #5B21B6;">Q: "[EXPAT_QUESTION]"</p>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">[EXPAT_ANSWER]</p>
                  <p style="margin: 0; font-size: 12px; color: #7C3AED; font-style: italic;">Got a question? Hit reply — we'll answer it in a future edition.</p>
                </div>

                <!-- PRO TIP -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 8px 0; color: #92400E; font-size: 16px;">💡 Expat Pro Tip</h3>
                  <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #78350F;">[TIP_TITLE]</h4>
                  <p style="margin: 0; font-size: 14px; color: #4B5563;">[2-3 sentences with practical advice]</p>
                </div>

                <!-- SPANISH CORNER -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 12px 0; color: #1E40AF; font-size: 16px;">🗣️ Spanish Corner</h3>
                  <div style="background-color: #EFF6FF; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: bold; color: #1E40AF;">"[SPANISH_PHRASE_1]"</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #4B5563;"><strong>Meaning:</strong> [PHRASE_MEANING_1]</p>
                    <p style="margin: 0; font-size: 12px; color: #6B7280; font-style: italic;">💬 [PHRASE_EXAMPLE_1]</p>
                  </div>
                  <div style="background-color: #EFF6FF; border-radius: 6px; padding: 12px;">
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: bold; color: #1E40AF;">"[SPANISH_PHRASE_2]"</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #4B5563;"><strong>Meaning:</strong> [PHRASE_MEANING_2]</p>
                    <p style="margin: 0; font-size: 12px; color: #6B7280; font-style: italic;">💬 [PHRASE_EXAMPLE_2]</p>
                  </div>
                </div>

                <!-- DID YOU KNOW? -->
                <div style="padding: 18px 22px; background-color: #FFFBEB;">
                  <h3 style="margin: 0 0 8px 0; color: #92400E; font-size: 16px;">🧠 Did You Know?</h3>
                  <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #78350F;">[FACT_TITLE]</h4>
                  <p style="margin: 0; font-size: 14px; color: #78350F;">[FACT_BODY]</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- CARD 4: GO DEEPER -->
          <tr>
            <td style="padding: 16px 24px;">
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
                <div bgcolor="#166534" style="background-color: #166534; padding: 16px 22px;">
                  <h2 style="margin: 0; color: #FFFFFF; font-size: 20px; font-family: Georgia, serif;">🧳 Go Deeper</h2>
                  <p style="margin: 4px 0 0 0; color: #BBF7D0; font-size: 12px;">Long reads and community stories</p>
                </div>

                <!-- WEEKEND ESCAPE -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 16px;">🌿 Weekend Escape</h3>
                  <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #1F2937;">[DESTINATION_NAME]</h4>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">[3-4 sentences about a day trip idea, Huasteca update, or regional attraction. Include practical info.]</p>
                  <a href="https://www.sanluisway.com/outdoors" style="color: #166534; font-weight: bold; font-size: 13px;">Explore more day trips →</a>
                </div>

                <!-- FROM THE BLOG - Featured Articles -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #1F2937; font-size: 16px;">📖 From the Blog</h3>
                  <div style="background-color: #FEF3C7; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #C75B39; color: #FFFFFF; border-radius: 10px; font-size: 10px; font-weight: bold; margin-bottom: 8px;">FEATURED</span>
                    <h4 style="font-size: 15px; color: #1F2937; margin: 0 0 8px 0;">[BLOG_POST_TITLE]</h4>
                    <p style="font-size: 13px; color: #4B5563; margin: 0 0 12px 0; line-height: 1.5;">[ONE_SENTENCE_TEASER]</p>
                    <a href="[BLOG_POST_URL]" style="display: inline-block; padding: 8px 16px; background-color: #C75B39; color: #FFFFFF; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">Read the Full Story →</a>
                  </div>
                  <p style="margin: 0 0 6px 0; font-size: 12px; color: #6B7280; font-weight: bold;">MORE POPULAR READS:</p>
                  <p style="margin: 0 0 4px 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog" style="color: #2563EB;">→ Latest articles on expat life in SLP</a></p>
                  <p style="margin: 0 0 4px 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog?category=food" style="color: #2563EB;">→ Food &amp; restaurant guides</a></p>
                  <p style="margin: 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog?category=travel" style="color: #2563EB;">→ Day trips &amp; adventures</a></p>
                </div>

                <!-- COMMUNITY SPOTLIGHT -->
                <div style="padding: 18px 22px; background-color: #FFFBEB;">
                  <h3 style="margin: 0 0 10px 0; color: #92400E; font-size: 16px;">✨ Community Spotlight</h3>
                  <h4 style="margin: 0 0 4px 0; font-size: 15px; color: #1F2937;">[SPOTLIGHT_NAME]</h4>
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #B45309; font-weight: bold;">[SPOTLIGHT_TYPE]</p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">[SPOTLIGHT_STORY]</p>
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">📍 [SPOTLIGHT_ADDRESS]</p>
                  <p style="margin: 0; font-size: 12px; color: #6B7280;">📬 [SPOTLIGHT_CONTACT]</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- COMUNIDAD SECTION (Custom Content) -->
          <!-- COMUNIDAD_PLACEHOLDER -->

          <!-- CALL TO ACTION -->
          <tr>
            <td bgcolor="#C75B39" style="background-color: #C75B39; text-align: center; padding: 40px 30px;">
              <h2 style="font-size: 24px; color: #FFFFFF; margin-bottom: 15px;">
                [CTA_TITLE]
              </h2>
              <p style="font-size: 16px; color: #FFE9E0; margin: 0 0 25px 0; line-height: 1.6;">
                [CTA_BODY]
              </p>
              <a href="[CTA_BUTTON_LINK]" style="display: inline-block; padding: 14px 32px; background-color: #FFCB05; color: #1F2937; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                [CTA_BUTTON_LABEL]
              </a>
              <p style="font-size: 13px; color: #FFD9C9; margin: 20px 0 0 0;">
                Join our community discovering the best of San Luis Potosí
              </p>
            </td>
          </tr>

          <!-- AD_PLACEMENT_BOTTOM -->

          <!-- CLOSING_FOOTER_PLACEHOLDER -->

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

/**
 * Injects a <style> block with mobile @media rules + dark-mode opt-out at the
 * top of the cleaned newsletter HTML. Must run AFTER cleanHtmlForBeehiiv,
 * which strips <head> and any AI-returned <style> blocks — otherwise this CSS
 * would never reach the email client.
 *
 * Attribute selectors (e.g. td[style*="padding: 30px"]) are used so we don't
 * depend on class attributes (also stripped by Beehiiv's templating layer).
 * Gmail iOS/Android, Apple Mail, and Yahoo Mail honor @media + color-scheme.
 * Outlook ignores @media but the base inline styles already render fine on
 * desktop widths.
 */
function injectResponsiveStyles(html: string): string {
  const responsiveCss = `
<style>
  :root { color-scheme: light; supported-color-schemes: light; }
  @media only screen and (max-width: 620px) {
    table[width="600"] { width: 100% !important; }
    td[style*="padding: 30px"] { padding: 20px 16px !important; }
    td[style*="padding: 40px 30px"] { padding: 28px 20px !important; }
    td[style*="padding: 20px 30px"] { padding: 16px 18px !important; }
    h1[style*="font-size: 28px"] { font-size: 24px !important; }
    h2[style*="font-size: 24px"] { font-size: 20px !important; }
    h2[style*="font-size: 20px"] { font-size: 18px !important; }
    h2[style*="font-size: 18px"] { font-size: 17px !important; }
    p[style*="font-size: 16px"] { font-size: 15px !important; line-height: 1.6 !important; }
  }
  @media (prefers-color-scheme: dark) {
    /* Apple Mail / iOS Mail force-invert light emails. Forcing light
       color-scheme via the :root rule above handles Gmail + Apple Mail.
       Everything else falls back to the inline light-theme styles. */
  }
</style>
`;
  return responsiveCss + html;
}

// Critical placeholders — if any remain in final HTML the newsletter is broken
// enough that we'd rather fail generation than ship a malformed edition.
const CRITICAL_PLACEHOLDERS = new Set([
  '[WEEK_DATE_RANGE]',
  '[OPENING_HOOK_TEXT]',
  '[CTA_TITLE]',
  '[CTA_BODY]',
  '[CTA_BUTTON_LABEL]',
  '[CTA_BUTTON_LINK]',
  '[BLOG_POST_TITLE]',
  '[BLOG_POST_URL]',
  '[ONE_SENTENCE_TEASER]',
]);

/**
 * Finds every unfilled [ALL_CAPS_PLACEHOLDER] left in the HTML. Previously
 * these were silently stripped by cleanHtmlForBeehiiv, causing sections to
 * render empty or half-filled without any warning to the admin.
 */
function detectUnfilledPlaceholders(html: string): string[] {
  const matches = html.match(/\[[A-Z][A-Z0-9_]{2,}\]/g);
  if (!matches) return [];
  return Array.from(new Set(matches)).sort();
}

// Function to clean HTML for Beehiiv compatibility
function cleanHtmlForBeehiiv(html: string): string {
  let cleaned = html;

  // Remove markdown code blocks anywhere in the content
  cleaned = cleaned.replace(/```html\s*/gi, '');
  cleaned = cleaned.replace(/```\s*/gi, '');

  // Remove unreplaced placeholders (text in square brackets that looks like a template variable)
  cleaned = cleaned.replace(/\[(?:NEWS_|EVENT_|BLOG_|LINK_|DATE_|CATEGORY_|VENUE_|COST_|FACT_|TIP_|CTA_|WEATHER_|QUICK_HIT_|PREVIEW_|HERO_|TOP_PICK_|ESCAPE_|NEW_PLACE_|DESTINATION_|UPCOMING_|IMPACT_|HISTORY_|SPOTLIGHT_|EXCHANGE_|GAS_|LP_GAS_|MARKET_|SPOT_|SPANISH_|PHRASE_|EXPAT_)[A-Z0-9_]+\]/g, '');

  // Remove generic placeholders like [EVENT], [DATE], [ADDRESS], [VENUE], [TIME], etc.
  cleaned = cleaned.replace(/\[(?:EVENT|EVENT_NAME|DATE|ADDRESS|DESCRIPTION|LINK|PRACTICAL_CITY_UPDATE|VENUE|TIME)\]/g, '');

  // Remove template instruction comments
  cleaned = cleaned.replace(/\[[\d-]+ sentences[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[[^\]]*what it is[^\]]*\]/gi, '');
  cleaned = cleaned.replace(/\[[^\]]*why check it out[^\]]*\]/gi, '');

  // Remove lines that only contain "→ Why it matters:" with no content
  cleaned = cleaned.replace(/<p[^>]*>→ Why it matters:\s*<\/p>/gi, '');

  // Remove empty list items
  cleaned = cleaned.replace(/<li[^>]*>\s*<\/li>/gi, '');

  // Remove DOCTYPE, html, head, body, and any AI-emitted <style> blocks —
  // Beehiiv supplies its own outer chrome, and we inject a clean responsive
  // <style> right after this pass via injectResponsiveStyles().
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

  // Ensure bgcolor attribute on rust-colored <td>s so the header & CTA stay
  // visible even if email clients strip inline styles or Beehiiv re-serializes.
  // Without this, white H1/H2 text renders on the container's white background.
  cleaned = cleaned.replace(
    /<td([^>]*?)style="([^"]*background-color:\s*#C75B39[^"]*)"([^>]*)>/gi,
    (match, before, style, after) => {
      if (/bgcolor\s*=/i.test(before + after)) return match;
      return `<td${before}bgcolor="#C75B39" style="${style}"${after}>`;
    }
  );

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

export interface AdPlacementData {
  ad_id: string;
  placement: 'top' | 'middle' | 'bottom';
  html: string;
}

export function injectAdsIntoHtml(html: string, ads: AdPlacementData[]): string {
  let result = html;

  const sectionMarkers: Record<string, { top: RegExp; bottom: RegExp | null }> = {
    top: {
      top: /Hey there![\s\S]{0,500}?<\/td>\s*<\/tr>/i,
      bottom: /Hey there![\s\S]{0,500}?<\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*style="[^"]*background/i
    },
    middle: {
      top: /📖 From the Blog[\s\S]{0,1000}?<\/td>\s*<\/tr>\s*<tr>\s*<td/i,
      bottom: /📖 From the Blog[\s\S]{0,1000}?<\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*style="[^"]*background.*?C75B39/i
    },
    bottom: {
      top: /cta[\s\S]{0,500}?<\/td>\s*<\/tr>/i,
      bottom: null
    }
  };

  for (const ad of ads) {
    const adHtml = `
          <tr>
            <td style="padding: 20px 30px; background-color: #F9FAFB; text-align: center;">
              <div style="max-width: 600px; margin: 0 auto; border: 1px dashed #d1d5db; border-radius: 8px; padding: 15px;">
                <p style="font-size: 10px; color: #9ca3af; margin: 0 0 10px 0; text-transform: uppercase;">Sponsored</p>
                ${wrapAdWithTracking(ad.html, ad.ad_id)}
              </div>
            </td>
          </tr>
        `;

    const markers = sectionMarkers[ad.placement];
    if (!markers) continue;

    const insertionPoint = findInsertionPoint(result, ad.placement, markers);
    
    if (insertionPoint) {
      result = result.slice(0, insertionPoint) + adHtml + result.slice(insertionPoint);
    }
  }

  return result;
}

function findInsertionPoint(html: string, placement: string, markers: { top: RegExp; bottom: RegExp | null }): number | null {
  if (placement === 'top') {
    const match = html.match(/Hey there![\s\S]{0,200}?<\/td>\s*<\/tr>/i);
    if (match && match.index !== undefined) {
      return match.index + match[0].length;
    }
  }

  if (placement === 'middle') {
    // Primary marker sits at a clean <tr>-boundary between Card 2 ("What's On")
    // and Card 3 ("Expat Toolkit") — the structural middle of the newsletter.
    // Fallbacks cover legacy templates and any edition where the AI drops the
    // marker. They still target true <tr>-boundaries to keep HTML well-formed.
    const middleMarkers = [
      '<!-- AD_PLACEMENT_MIDDLE -->',
      '<!-- CARD 3: EXPAT TOOLKIT -->',
      '<!-- CARD 4: GO DEEPER -->',
      '<!-- WEEKEND ESCAPE -->',
      '<!-- ASK AN EXPAT -->',
    ];
    for (const marker of middleMarkers) {
      const idx = html.indexOf(marker);
      if (idx !== -1) {
        return idx + marker.length;
      }
    }
  }

  if (placement === 'bottom') {
    const ctaMatch = html.match(/Discover More of San Luis/i);
    if (ctaMatch && ctaMatch.index !== undefined) {
      const afterCta = html.slice(ctaMatch.index);
      const closingMatch = afterCta.match(/<\/td>\s*<\/tr>\s*<\/table>/i);
      if (closingMatch && closingMatch.index !== undefined) {
        return ctaMatch.index + closingMatch.index + closingMatch[0].length;
      }
    }
    const lastTable = html.lastIndexOf('</table>');
    if (lastTable !== -1) {
      return lastTable;
    }
  }

  return null;
}

function wrapAdWithTracking(html: string, adId: string): string {
  const trackingUrl = `/api/newsletter/ad-click?ad_id=${encodeURIComponent(adId)}`;
  const regex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi;
  
  return html.replace(regex, (match, before, href, after) => {
    if (href.startsWith('/') || href.startsWith('#')) {
      return match;
    }
    const trackingHref = `${trackingUrl}&original_url=${encodeURIComponent(href)}`;
    return `<a ${before}href="${trackingHref}"${after}>`;
  });
}

export async function fetchAdsForPlacement(
  placement: 'top' | 'middle' | 'bottom'
): Promise<AdPlacementData[]> {
  try {
    const supabase = getSupabaseClient();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('sponsor_ads')
      .select('id, ad_type, html_content, image_url, image_alt, link_url, link_target, width, height')
      .eq('active', true)
      .eq('placement', placement)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .order('priority', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return [];
    }

    const ad = data[0];
    let adHtml = '';

    if (ad.ad_type === 'html' && ad.html_content) {
      adHtml = ad.html_content as string;
    } else if (ad.ad_type === 'image' && ad.image_url) {
      const imgTag = `<img src="${ad.image_url}" alt="${ad.image_alt || 'Advertisement'}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
      adHtml = ad.link_url
        ? `<a href="${ad.link_url}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`
        : imgTag;
    }

    if (!adHtml) {
      return [];
    }

    return [{
      ad_id: ad.id as string,
      placement,
      html: adHtml
    }];
  } catch (error) {
    console.error(`Failed to fetch ads for placement ${placement}:`, error);
    return [];
  }
}

// Known-good fallback URLs for broken/unverified links
const FALLBACK_URL = 'https://www.sanluisway.com/events';

// Allowed external domains (links to these are kept even if we can't HEAD-check them).
// Keep this in sync with the news / ticket / gov sources the AI prompt instructs
// Gemini to cite — otherwise the validator silently swaps legitimate citations
// for FALLBACK_URL and reads like we made the quotes up.
const ALLOWED_EXTERNAL_DOMAINS = [
  // Social + maps
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'tiktok.com',
  'youtube.com',
  'youtu.be',
  'google.com',
  'maps.google.com',
  'maps.app.goo.gl',
  'goo.gl',
  'wa.me',

  // Ticketing
  'ticketmaster.com.mx',
  'superboletos.com',
  'eventbrite.com',
  'eventbrite.com.mx',
  'boletia.com',

  // Local news sources cited in the AI prompt
  'elsoldesanluis.com.mx',
  'pulsoslp.com.mx',
  'codigosanluis.com',
  'planoinformativo.com',
  'lajornadasanluis.com.mx',
  'quadratin.com.mx',
  'elexpres.com',
  'elheraldoslp.com.mx',
  'elmanana.com.mx',

  // Government + institutional
  'slp.gob.mx',
  'sanluis.gob.mx',
  'gob.mx',
  'inegi.org.mx',
  'visitmexico.com',
  'visitsanluispotosi.com',
  'uaslp.mx',

  // Airlines / transport referenced for expat advice
  'aeromexico.com',
  'volaris.com',
  'vivaaerobus.com',
  'aa.com',

  // Banks / SAT often referenced in Ask an Expat
  'sat.gob.mx',
  'condusef.gob.mx',
];

// Template placeholders that are legitimate and should be skipped by the validator.
// These are replaced later in the pipeline (e.g., by Beehiiv for unsubscribe/preferences).
const LEGITIMATE_PLACEHOLDERS = new Set([
  '[UNSUBSCRIBE_URL]',
  '[PREFERENCES_URL]',
]);

// Substrings that mark a URL as an unfilled placeholder or obvious dummy.
// Used only when the href is NOT in LEGITIMATE_PLACEHOLDERS.
const PLACEHOLDER_SUBSTRINGS = ['example.com', 'placeholder', 'test.com', 'your-site', 'yoursite'];

function looksLikePlaceholder(url: string): boolean {
  if (LEGITIMATE_PLACEHOLDERS.has(url)) return false;
  if (/\[[^\]]+\]/.test(url)) return true;
  const lowered = url.toLowerCase();
  return PLACEHOLDER_SUBSTRINGS.some((p) => lowered.includes(p));
}

function isDomainAllowed(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_EXTERNAL_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Verifies a single sanluisway.com URL by issuing a HEAD request.
 * Follows redirects (a 200 after redirect is still considered valid).
 * Times out after 5 seconds to avoid hanging the newsletter build.
 */
async function isSanluiswayUrlValid(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return resp.ok;
  } catch {
    return false;
  }
}

/**
 * Statically cleans placeholder/suspicious URLs. Synchronous pass used for
 * obvious pattern-based cleanup before we call the async validator.
 */
function staticallyCleanUrls(html: string): string {
  const hrefRegex = /href=["']([^"']+)["']/gi;
  return html.replace(hrefRegex, (match, url) => {
    // Allow anchor links and mailto
    if (url.startsWith('#') || url.startsWith('mailto:')) {
      return match;
    }

    // Allow legitimate template placeholders (Beehiiv replaces these later)
    if (LEGITIMATE_PLACEHOLDERS.has(url)) {
      return match;
    }

    // Catch unfilled placeholders and obvious dummies (e.g. [LINK_1], example.com)
    if (looksLikePlaceholder(url)) {
      return `href="${FALLBACK_URL}"`;
    }

    // Allow sanluisway.com URLs (the async validator will HEAD-check these)
    if (url.includes('sanluisway.com')) {
      return match;
    }

    if (isDomainAllowed(url)) {
      return match;
    }

    // Unknown external domain - replace with fallback
    return `href="${FALLBACK_URL}"`;
  });
}

export interface LinkValidationResult {
  html: string;
  brokenLinks: string[];
  totalSanluiswayLinks: number;
}

/**
 * Asynchronously verifies every sanluisway.com link in the HTML by issuing
 * HEAD requests. Any link that returns non-2xx is replaced with FALLBACK_URL.
 * Deduplicates URLs so we don't check the same one twice.
 */
async function verifySanluiswayLinks(html: string): Promise<LinkValidationResult> {
  const hrefRegex = /href=["'](https?:\/\/(?:www\.)?sanluisway\.com[^"']*)["']/gi;
  const urlsInHtml = new Set<string>();
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    urlsInHtml.add(match[1]);
  }

  if (urlsInHtml.size === 0) {
    return { html, brokenLinks: [], totalSanluiswayLinks: 0 };
  }

  const uniqueUrls = Array.from(urlsInHtml);
  console.log(`   🔍 Verifying ${uniqueUrls.length} sanluisway.com link(s)...`);

  const results = await Promise.all(
    uniqueUrls.map(async (url) => ({ url, valid: await isSanluiswayUrlValid(url) }))
  );

  const brokenUrls = results.filter((r) => !r.valid).map((r) => r.url);
  if (brokenUrls.length === 0) {
    console.log('   ✅ All sanluisway.com links verified (200 OK)');
    return { html, brokenLinks: [], totalSanluiswayLinks: uniqueUrls.length };
  }

  console.warn(`   ⚠️ Found ${brokenUrls.length} broken link(s), replacing with fallback:`);
  brokenUrls.forEach((u) => console.warn(`      - ${u} → ${FALLBACK_URL}`));

  let cleaned = html;
  for (const brokenUrl of brokenUrls) {
    // Replace only the href="..." occurrences, preserve the rest of the HTML
    const escaped = brokenUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const replaceRegex = new RegExp(`href=["']${escaped}["']`, 'gi');
    cleaned = cleaned.replace(replaceRegex, `href="${FALLBACK_URL}"`);
  }

  return { html: cleaned, brokenLinks: brokenUrls, totalSanluiswayLinks: uniqueUrls.length };
}

/**
 * Full URL validation pipeline: static cleanup followed by async HEAD
 * verification of all remaining sanluisway.com links. Returns the cleaned
 * HTML plus diagnostic info (broken links that were replaced).
 */
async function validateAndCleanUrls(html: string): Promise<LinkValidationResult> {
  const staticPass = staticallyCleanUrls(html);
  return verifySanluiswayLinks(staticPass);
}

// Function to rewrite custom content in a friendly tone using AI
async function rewriteContentInFriendlyTone(customContent: string): Promise<{ title: string; body: string; cta?: string }> {
  console.log('   📝 rewriteContentInFriendlyTone called with:', customContent.substring(0, 100) + '...');

  if (!customContent || !customContent.trim()) {
    console.log('   ⚠️ No custom content to rewrite');
    return { title: '', body: '' };
  }

  const rewritePrompt = `
You are the friendly editor of "San Luis Way Weekly", a newsletter for expats and locals in San Luis Potosí, México.

Rewrite the following content in a warm, friendly, conversational tone. Make it sound like a friend sharing a tip, not a corporate announcement.

ORIGINAL CONTENT:
${customContent}

INSTRUCTIONS:
1. Create an engaging TITLE (short, catchy, with an emoji)
2. Rewrite the BODY in a friendly tone (2-3 sentences max)
3. If there's a discount code, special offer, or call-to-action, include it as CTA
4. Keep ALL specific details: dates, prices, codes, names, addresses
5. Write in English

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{"title":"Your catchy title here","body":"Your friendly rewritten content here.","cta":"CODE123 or special offer if any"}

If there's no special code/offer, set cta to null.
`;

  try {
    const rewriteModel = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!).getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
    });

    console.log('   🤖 Calling Gemini to rewrite content...');
    const result = await rewriteModel.generateContent(rewritePrompt);
    const response = await result.response;
    let text = response.text().trim();
    console.log('   📄 Gemini response:', text.substring(0, 200) + '...');

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

    const parsed = JSON.parse(text);
    console.log('   ✅ Parsed result - Title:', parsed.title, '| Body length:', parsed.body?.length || 0);

    return {
      title: parsed.title || '🤝 Community Update',
      body: parsed.body || customContent,
      cta: parsed.cta || undefined
    };
  } catch (error) {
    console.error('   ❌ Error rewriting content:', error);
    // Fallback to original content if AI fails
    console.log('   ⚠️ Using fallback - original content');
    return {
      title: '🤝 Community Update',
      body: customContent,
      cta: undefined
    };
  }
}

// Function to generate Comunidad section HTML from rewritten content
function generateComunidadSection(title: string, body: string, cta?: string): string {
  if (!body || !body.trim()) {
    return '';
  }

  const ctaHtml = cta
    ? `<p style="margin: 15px 0 0 0; font-size: 14px;"><span style="background-color: #F3E8FF; color: #7C3AED; padding: 6px 14px; border-radius: 4px; font-weight: bold;">${cta}</span></p>`
    : '';

  return `
          <!-- COMUNIDAD SECTION - CUSTOM CONTENT -->
          <tr>
            <td style="padding: 30px; background-color: #FDF4FF;">
              <h2 style="font-size: 20px; color: #1F2937; margin-bottom: 15px;">
                🤝 Comunidad
              </h2>
              <p style="font-size: 14px; color: #6B7280; margin-bottom: 20px;">From our community to yours</p>
              <div style="background-color: #FFFFFF; border: 1px solid #E9D5FF; border-left: 4px solid #A855F7; border-radius: 8px; padding: 20px;">
                <h3 style="font-size: 16px; margin: 0 0 12px 0; color: #7C3AED;">${title}</h3>
                <p style="margin: 0; font-size: 14px; color: #4B5563; line-height: 1.7;">${body}</p>
                ${ctaHtml}
              </div>
            </td>
          </tr>
`;
}

// Function to inject Comunidad section into newsletter HTML
async function injectComunidadSection(html: string, customContent: string): Promise<string> {
  if (!customContent || !customContent.trim()) {
    console.log('   ⚠️ No custom content provided, skipping Comunidad section');
    return html;
  }

  // Rewrite content in friendly tone using AI
  console.log('   🎨 Rewriting custom content in friendly tone...');
  const { title, body, cta } = await rewriteContentInFriendlyTone(customContent);
  console.log(`   ✅ Rewritten: "${title.substring(0, 30)}..."`);

  const comunidadHtml = generateComunidadSection(title, body, cta);

  if (!comunidadHtml || !comunidadHtml.trim()) {
    console.log('   ⚠️ Generated Comunidad HTML is empty');
    return html;
  }

  console.log(`   📝 Comunidad HTML generated (${comunidadHtml.length} chars)`);

  // Try multiple injection patterns in order of preference

  // Pattern 1: Look for the placeholder comment
  if (html.includes('<!-- COMUNIDAD_PLACEHOLDER -->')) {
    console.log('   ✅ Found COMUNIDAD_PLACEHOLDER, injecting there');
    return html.replace('<!-- COMUNIDAD_PLACEHOLDER -->', comunidadHtml);
  }

  // Pattern 2: Look for <!-- CALL TO ACTION --> comment
  if (html.includes('<!-- CALL TO ACTION -->')) {
    console.log('   ✅ Found CALL TO ACTION comment, injecting before it');
    return html.replace('<!-- CALL TO ACTION -->', comunidadHtml + '\n\n          <!-- CALL TO ACTION -->');
  }

  // Pattern 3: Look for CTA section by background color #C75B39
  const ctaByColorPattern = /(<tr>\s*<td[^>]*background-color:\s*#C75B39)/i;
  if (ctaByColorPattern.test(html)) {
    console.log('   ✅ Found CTA by background color, injecting before it');
    return html.replace(ctaByColorPattern, comunidadHtml + '\n\n          $1');
  }

  // Pattern 4: Look for "From the Blog" section and inject after it
  const blogEndPattern = /(📖 From the Blog[\s\S]*?<\/div>\s*<\/td>\s*<\/tr>)/i;
  if (blogEndPattern.test(html)) {
    console.log('   ✅ Found From the Blog section, injecting after it');
    return html.replace(blogEndPattern, '$1\n\n' + comunidadHtml);
  }

  // Pattern 5: Look for Pro Tip section and inject after it
  const proTipEndPattern = /(💡 Expat Pro Tip[\s\S]*?<\/td>\s*<\/tr>)/i;
  if (proTipEndPattern.test(html)) {
    console.log('   ✅ Found Pro Tip section, injecting after it');
    return html.replace(proTipEndPattern, '$1\n\n' + comunidadHtml);
  }

  // Pattern 6: Look for any section with terracotta/CTA background
  const terracottaPattern = /(<tr>\s*<td[^>]*style="[^"]*background[^"]*#[Cc]75[Bb]39)/i;
  if (terracottaPattern.test(html)) {
    console.log('   ✅ Found terracotta section, injecting before it');
    return html.replace(terracottaPattern, comunidadHtml + '\n\n          $1');
  }

  // Pattern 7: Fallback - inject before CLOSING_FOOTER_PLACEHOLDER
  if (html.includes('<!-- CLOSING_FOOTER_PLACEHOLDER -->')) {
    console.log('   ✅ Found CLOSING_FOOTER_PLACEHOLDER, injecting before it');
    return html.replace('<!-- CLOSING_FOOTER_PLACEHOLDER -->', comunidadHtml + '\n\n          <!-- CLOSING_FOOTER_PLACEHOLDER -->');
  }

  // Pattern 8: Last resort - inject before the last </table>
  const lastTablePattern = /(<\/table>\s*<\/td>\s*<\/tr>\s*<\/table>)/i;
  if (lastTablePattern.test(html)) {
    console.log('   ✅ Found closing table structure, injecting before it');
    return html.replace(lastTablePattern, comunidadHtml + '\n\n          $1');
  }

  console.log('   ⚠️ Could not find ANY injection point for Comunidad section!');
  console.log('   📄 HTML snippet (first 500 chars):', html.substring(0, 500));

  // Absolute fallback - append before </body>
  if (html.includes('</body>')) {
    console.log('   ✅ Fallback: injecting before </body>');
    return html.replace('</body>', comunidadHtml + '\n</body>');
  }

  return html;
}

// Function to remove all images from HTML
function removeAllImages(html: string): string {
  // Remove <img> tags completely
  let cleaned = html.replace(/<img[^>]*>/gi, '');

  // Remove empty image containers that might be left
  cleaned = cleaned.replace(/<div[^>]*>\s*<\/div>/gi, '');

  // Remove hero image placeholder rows if empty
  cleaned = cleaned.replace(/<tr>\s*<td[^>]*>\s*<\/td>\s*<\/tr>/gi, '');

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

  const eventsList = events?.map((e) =>
    `- ${e.title} (${format(new Date(e.start_date as string), 'MMM d')}) @ ${e.location}`
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

  // Fetch used facts (with error handling for missing tables)
  let usedFactsList = '';
  let usedTipsList = '';
  let usedPlacesList = '';
  let factsCount = 0, tipsCount = 0, placesCount = 0;

  try {
    const { data: usedFacts, error: factsError } = await supabase
      .from('newsletter_facts')
      .select('fact_title, fact_body')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!factsError && usedFacts) {
      usedFactsList = usedFacts.map(f => `- ${f.fact_title}`).join('\n');
      factsCount = usedFacts.length;
    } else if (factsError) {
      console.log('   ⚠️ newsletter_facts table not available:', factsError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch facts:', e);
  }

  try {
    const { data: usedTips, error: tipsError } = await supabase
      .from('newsletter_tips')
      .select('tip_title, tip_body')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!tipsError && usedTips) {
      usedTipsList = usedTips.map(t => `- ${t.tip_title}`).join('\n');
      tipsCount = usedTips.length;
    } else if (tipsError) {
      console.log('   ⚠️ newsletter_tips table not available:', tipsError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch tips:', e);
  }

  try {
    const { data: usedPlaces, error: placesError } = await supabase
      .from('newsletter_places')
      .select('place_name, place_address')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!placesError && usedPlaces) {
      usedPlacesList = usedPlaces.map(p => `- ${p.place_name}`).join('\n');
      placesCount = usedPlaces.length;
    } else if (placesError) {
      console.log('   ⚠️ newsletter_places table not available:', placesError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch places:', e);
  }



  // Fetch used spots (Spot of the Week)
  let usedSpotsList = '';
  let spotsCount = 0;
  try {
    const { data: usedSpots, error: spotsError } = await supabase
      .from('newsletter_spots')
      .select('spot_name')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!spotsError && usedSpots) {
      usedSpotsList = usedSpots.map(s => `- ${s.spot_name}`).join('\n');
      spotsCount = usedSpots.length;
    } else if (spotsError) {
      console.log('   ⚠️ newsletter_spots table not available:', spotsError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch spots:', e);
  }

  // Fetch used phrases (Spanish Corner)
  let usedPhrasesList = '';
  let phrasesCount = 0;
  try {
    const { data: usedPhrases, error: phrasesError } = await supabase
      .from('newsletter_phrases')
      .select('phrase')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!phrasesError && usedPhrases) {
      usedPhrasesList = usedPhrases.map(p => `- "${p.phrase}"`).join('\n');
      phrasesCount = usedPhrases.length;
    } else if (phrasesError) {
      console.log('   ⚠️ newsletter_phrases table not available:', phrasesError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch phrases:', e);
  }

  // Fetch used questions (Ask an Expat)
  let usedQuestionsList = '';
  let questionsCount = 0;
  try {
    const { data: usedQuestions, error: questionsError } = await supabase
      .from('newsletter_questions')
      .select('question')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!questionsError && usedQuestions) {
      usedQuestionsList = usedQuestions.map(q => `- "${q.question}"`).join('\n');
      questionsCount = usedQuestions.length;
    } else if (questionsError) {
      console.log('   ⚠️ newsletter_questions table not available:', questionsError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch questions:', e);
  }

  // Fetch used spotlights (Community Spotlight)
  let usedSpotlightsList = '';
  let spotlightsCount = 0;
  try {
    const { data: usedSpotlights, error: spotlightsError } = await supabase
      .from('newsletter_spotlights')
      .select('spotlight_name, spotlight_type')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!spotlightsError && usedSpotlights) {
      usedSpotlightsList = usedSpotlights.map(s => `- ${s.spotlight_name} (${s.spotlight_type})`).join('\n');
      spotlightsCount = usedSpotlights.length;
    } else if (spotlightsError) {
      console.log('   ⚠️ newsletter_spotlights table not available:', spotlightsError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch spotlights:', e);
  }

  // Fetch used escapes (Weekend Escape)
  let usedEscapesList = '';
  let escapesCount = 0;
  try {
    const { data: usedEscapes, error: escapesError } = await supabase
      .from('newsletter_escapes')
      .select('escape_name')
      .order('used_at', { ascending: false })
      .limit(50);
    if (!escapesError && usedEscapes) {
      usedEscapesList = usedEscapes.map(e => `- ${e.escape_name}`).join('\n');
      escapesCount = usedEscapes.length;
    } else if (escapesError) {
      console.log('   ⚠️ newsletter_escapes table not available:', escapesError.message);
    }
  } catch (e) {
    console.log('   ⚠️ Could not fetch escapes:', e);
  }

  console.log(`   Found: ${factsCount} facts, ${tipsCount} tips, ${placesCount} places, ${spotsCount} spots, ${phrasesCount} phrases, ${questionsCount} questions, ${spotlightsCount} spotlights, ${escapesCount} escapes used previously`);

  // Fetch real weather data from OpenWeatherMap API
  console.log('2. 🌤️ Fetching real weather forecast from OpenWeatherMap...');
  let weatherForecast: WeatherForecast | null = null;
  let weatherDataStr = '';
  try {
    weatherForecast = await fetchWeatherForecast();
    if (weatherForecast) {
      const dailyForecast = weatherForecast.daily.map(d =>
        `  - ${d.dayName}: ${d.tempMin}°C - ${d.tempMax}°C, ${d.condition} (${d.conditionEs}), ${d.chanceOfRain}% rain chance`
      ).join('\n');
      weatherDataStr = `
📊 REAL WEATHER DATA FROM OPENWEATHERMAP API (USE THIS - DO NOT SEARCH FOR WEATHER):
Current Temperature: ${weatherForecast.current.temp}°C
Current Condition: ${weatherForecast.current.conditionEn} (${weatherForecast.current.conditionEs})
Humidity: ${weatherForecast.current.humidity}%
Sunrise: ${weatherForecast.current.sunrise} / Sunset: ${weatherForecast.current.sunset}

5-Day Forecast for San Luis Potosí, México:
${dailyForecast}

Overall Summary: ${weatherForecast.summary}
`;
      console.log('   ✅ Real weather data fetched successfully');
      console.log(`   📊 Temperature range: ${Math.min(...weatherForecast.daily.map(d => d.tempMin))}°C - ${Math.max(...weatherForecast.daily.map(d => d.tempMax))}°C`);
    } else {
      console.log('   ⚠️ Could not fetch weather forecast - AI will search for weather');
      weatherDataStr = '⚠️ Weather API unavailable - Search for "Clima San Luis Potosí" to get current weather.';
    }
  } catch (error) {
    console.error('   ❌ Weather fetch error:', error);
    weatherDataStr = '⚠️ Weather API error - Search for "Clima San Luis Potosí" to get current weather.';
  }

  console.log('3. 🧠 Performing Deep Research with Gemini Grounding...');
  console.log(`   📅 Newsletter date range: ${dateRangeStr}`);
  console.log(`   📅 Today is: ${dates.todayFormatted}`);
  console.log(`   📅 Current month: ${dates.weekStartDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`);

  // Get current year and month for search queries
  const currentYear = dates.weekStartDate.getFullYear();
  const currentMonth = format(dates.weekStartDate, 'MMMM');
  const currentMonthSpanish = format(dates.weekStartDate, 'MMMM', { locale: undefined }); // Will use default

  // Map English months to Spanish for search queries
  const monthsInSpanish: Record<string, string> = {
    'January': 'enero', 'February': 'febrero', 'March': 'marzo', 'April': 'abril',
    'May': 'mayo', 'June': 'junio', 'July': 'julio', 'August': 'agosto',
    'September': 'septiembre', 'October': 'octubre', 'November': 'noviembre', 'December': 'diciembre'
  };
  const spanishMonth = monthsInSpanish[currentMonth] || currentMonth.toLowerCase();

  // Calculate previous months dynamically to reject old content
  const prevMonth1 = new Date(dates.weekStartDate);
  prevMonth1.setMonth(prevMonth1.getMonth() - 1);
  const prevMonth2 = new Date(dates.weekStartDate);
  prevMonth2.setMonth(prevMonth2.getMonth() - 2);
  const prevMonthName1 = format(prevMonth1, 'MMMM yyyy');
  const prevMonthName2 = format(prevMonth2, 'MMMM yyyy');
  const prevMonthSpanish1 = monthsInSpanish[format(prevMonth1, 'MMMM')] || format(prevMonth1, 'MMMM').toLowerCase();
  const prevMonthSpanish2 = monthsInSpanish[format(prevMonth2, 'MMMM')] || format(prevMonth2, 'MMMM').toLowerCase();

  const prompt = `
    You are the editor of "San Luis Way Weekly".

    ═══════════════════════════════════════════════════════════
    SYSTEM RULES (apply to ALL sections below)
    ═══════════════════════════════════════════════════════════

    📅 DATE RULES:
    - TODAY: ${dates.todayFormatted} | LOCAL TIME: ${dates.mexicoCityLocalTime}
    - THIS NEWSLETTER COVERS: ${dateRangeStr} (next 7 days)
    - ONLY include content dated within ${dateRangeStr}
    - REJECT anything from ${prevMonthName1}, ${prevMonthName2}, or earlier
    - REJECT dates in "${prevMonthSpanish1}", "${prevMonthSpanish2}", or past Spanish months
    - ALWAYS append "${spanishMonth} ${currentYear}" or "${currentMonth} ${currentYear}" to search queries

    📍 GEOGRAPHIC RULES:
    - EXCLUSIVELY about San Luis Potosí CITY & STATE, MEXICO
    - Include: SLP city, Soledad de Graciano Sánchez, Huasteca Potosina
    - EXCLUDE: San Luis AZ, San Luis Obispo CA, any US/non-Mexico location
    - EXCLUDE: prices in USD (must be MXN), US phone numbers (must be +52), US state abbreviations

    🔍 SEARCH RULES:
    - ✅ "eventos San Luis Potosí México ${spanishMonth} ${currentYear}"
    - ✅ "noticias SLP ${spanishMonth} ${currentYear}"
    - ❌ "eventos San Luis Potosí" (without date = old results)

    ═══════════════════════════════════════════════════════════
    VOICE & TONE GUIDE
    ═══════════════════════════════════════════════════════════

    Write like a knowledgeable friend who lives in SLP and genuinely loves the city.
    - CASUAL BUT INFORMED: Not corporate, not too informal. Like texting a well-read friend.
    - COMMUNITY FEEL: Use "we", "our city", "around here" to build belonging.
    - BILINGUAL FLAVOR: Sprinkle Spanish naturally. "Head to the mercado", "the centro histórico".
    - ALWAYS ACTIONABLE: Don't just inform - tell readers what to DO, where to GO, what to TRY.
    - SPECIFIC > VAGUE: "The tacos al pastor at Don Beto's on Carranza ($25 MXN)" beats "great tacos in town".

    GOOD EXAMPLE: "The city just opened a new 3km bike lane on Av. Carranza - perfect timing if you've been meaning to dust off that bicycle. Runs from Centro to Lomas, with dedicated signals at every intersection."
    BAD EXAMPLE: "There are new developments in San Luis Potosí regarding infrastructure improvements."

    TASK: Create the weekly digest. Fill the HTML template below with real, verified content.

    ═══════════════════════════════════════════════════════════
    OPENING HOOK (replace [OPENING_HOOK_TEXT])
    ═══════════════════════════════════════════════════════════

    Write a warm, 2-3 sentence opening that connects to something SPECIFIC happening THIS week:
    - A big event coming up ("Arena Potosí is about to get loud this Friday...")
    - The weather/season ("Those cool mornings are finally here...")
    - A holiday or tradition ("Semana Santa vibes are already in the air...")
    - A city milestone ("The new bike lane on Carranza just opened and we're here for it")
    Do NOT write a generic greeting. Reference something real and timely.

    ═══════════════════════════════════════════════════════════
    SECTION 1: LOCAL NEWS & HEADLINES
    ═══════════════════════════════════════════════════════════

    🔍 REQUIRED SEARCH QUERIES (use these EXACT queries):
    - "noticias San Luis Potosí ${spanishMonth} ${currentYear}"
    - "últimas noticias SLP México ${spanishMonth} ${currentYear}"
    - "San Luis Potosí noticias hoy ${currentYear}"

    Search for recent news (past 7 days) about San Luis Potosí:

    PRIORITIZE news that DIRECTLY AFFECTS DAILY LIFE for residents and expats:
    - Water supply alerts (Interapas), power outages (CFE)
    - Road closures, construction, traffic changes
    - New transit routes, airport updates, bus terminal changes
    - Cost of living: rent trends, utility rate changes, market prices
    - Immigration updates (INM, visa changes, consulate news)
    - Safety alerts relevant to neighborhoods (not crime reports)
    - New businesses opening or major closings
    - Infrastructure projects with real impact on commutes
    - University news only if it affects the broader community
    AVOID: Pure political news without practical impact, crime blotters, national news unrelated to SLP

    Identify exactly 3 "Quick Hits": one-line practical updates (traffic, construction, transit, utilities, weather alerts, small neighborhood news).

    SOURCES:
    - El Sol de San Luis (elsoldesanluis.com.mx)
    - Pulso SLP (pulsoslp.com.mx)
    - Código San Luis (codigosanluis.com)
    - Plano Informativo (planoinformativo.com)
    - La Jornada San Luis
    - Government sites: slp.gob.mx, sanluis.gob.mx

    FORMAT FOR THE ONE TOP NEWS ITEM (fills [NEWS_HEADLINE_1] / [NEWS_SUMMARY_1] / [IMPACT_1]):
    - Headline (translated to English) in [NEWS_HEADLINE_1]
    - **Summary (3-4 sentences)** with context + source name inline in [NEWS_SUMMARY_1]
    - One-sentence "Why it matters to residents/expats" in [IMPACT_1]
    - Do NOT include <img> tags

    FORMAT FOR QUICK HITS (fills [QUICK_HIT_1] / [QUICK_HIT_2] / [QUICK_HIT_3]):
    - Exactly 3 items, one sentence each.
    - Each starts with a bold category/topic prefix.
    - Example: "<strong>Traffic:</strong> Continued maintenance on Himno Nacional this week."
    - Example: "<strong>Utilities:</strong> Interapas water cut Tuesday 8 AM – 4 PM, zonas norte."

    ═══════════════════════════════════════════════════════════
    SECTION 2: WEATHER FORECAST (USE REAL DATA PROVIDED BELOW)
    ═══════════════════════════════════════════════════════════

    🚨 IMPORTANT: Use the REAL WEATHER DATA provided below. DO NOT search for weather.
    This data comes directly from OpenWeatherMap API and is accurate.

    ${weatherDataStr}

    FORMAT YOUR OUTPUT AS:
    - General Outlook: Use the condition from the data above
    - High/Low Temps: Use the EXACT temperature range from the forecast data
    - Rain Probability: Mention specific days with >30% rain chance
    - Recommendation: Based on temperatures (if cold: "Bundle up", if rain: "Bring umbrella")

    ═══════════════════════════════════════════════════════════
    SECTION: MARKET WATCH (Economic Snapshot)
    ═══════════════════════════════════════════════════════════

    Search for current economic data relevant to SLP residents:
    - "tipo de cambio dólar peso hoy" or "USD MXN exchange rate today"
    - "precio gasolina San Luis Potosí hoy ${currentYear}"
    - "precio gas LP San Luis Potosí ${spanishMonth} ${currentYear}"

    REQUIRED DATA:
    - [EXCHANGE_RATE]: Current USD to MXN rate (e.g., "$17.25 MXN")
    - [GAS_PRICE]: Regular gasoline per liter in SLP (e.g., "$24.50 MXN")
    - [LP_GAS_PRICE]: LP gas price per kg in SLP (e.g., "$14.80 MXN")
    - [MARKET_TREND_NOTE]: One-sentence trend note (e.g., "The peso strengthened 1.2% this week against the dollar")

    SOURCES: Banco de México (banxico.org.mx), CRE (cre.gob.mx), Profeco

    ═══════════════════════════════════════════════════════════
    SECTION 3: EVENTS & ENTERTAINMENT
    ═══════════════════════════════════════════════════════════

    Apply DATE RULES and GEOGRAPHIC RULES from System Rules above.

    🔍 SEARCH QUERIES:
    - "eventos San Luis Potosí México ${spanishMonth} ${currentYear}"
    - "que hacer en SLP México ${spanishMonth} ${currentYear}"
    - "conciertos San Luis Potosí ${spanishMonth} ${currentYear}"
    - "teatro San Luis Potosí ${currentMonth} ${currentYear}"
    - "agenda cultural SLP ${spanishMonth} ${currentYear}"

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

    EDITOR'S PICK: The FIRST event in "Top Picks" should be your #1 recommendation.
    Add a personal note: "Why we love it: [1 sentence explaining why this stands out]"
    Replace the [CATEGORY_1] tag with "⭐ EDITOR'S PICK" for the first event.

    FORMAT FOR EACH EVENT:
    - Event name (English + Spanish if applicable)
    - Date, time, location with address
    - **Detailed description** (3-4 sentences explaining what it is and why it's worth going)
    - Cost/ticket info
    - Website or ticket link

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
    SECTION: SPOT OF THE WEEK (Hidden Gem)
    ═══════════════════════════════════════════════════════════

    Feature ONE established but lesser-known place in SLP city.
    NOT about new openings (that's "Around Town"). This is about places locals love but newcomers miss.

    PREVIOUSLY FEATURED (DO NOT REPEAT):
    ${usedSpotsList || 'No previous spots recorded yet.'}

    Types: scenic viewpoints, hidden courtyards, neighborhood parks, traditional market stalls,
    quiet cafés, street art corridors, lesser-known museums, artisan workshops.

    REQUIRED:
    - [SPOT_NAME]: Name of the place
    - [SPOT_DESCRIPTION]: 3-4 sentences - what makes it special, insider tips
    - [SPOT_ADDRESS]: Full address in SLP
    - [SPOT_HOURS]: When to visit
    - [SPOT_MAPS_LINK]: Google Maps URL for the place

    TONE: "One of those places you stumble upon and wonder why nobody told you sooner..."

    ═══════════════════════════════════════════════════════════
    SECTION 5: AROUND TOWN - RECENTLY OPENED PLACES ONLY
    ═══════════════════════════════════════════════════════════

    **⚠️ CRITICAL: This section is ONLY for places that OPENED IN 2024 or 2025.**

    DO NOT feature established restaurants/cafes that have been open for years.
    We need FRESH discoveries - places that opened in the last 6 months maximum.

    **PREVIOUSLY FEATURED (DO NOT REPEAT):**
    ${usedPlacesList || 'No previous places recorded yet.'}

    **HOW TO FIND RECENTLY OPENED PLACES:**
    Search queries to use:
    - "inauguración restaurante San Luis Potosí 2025"
    - "nuevo café SLP diciembre 2025"
    - "apertura negocio San Luis Potosí noviembre 2025"
    - "recién abierto San Luis Potosí"
    - Instagram: #nuevoenslp #aaboraenslp #slpnuevo

    **VERIFICATION:**
    Before including a place, verify it opened recently by:
    - Checking their Instagram for "gran apertura" or opening posts
    - Looking for news articles about their inauguration
    - Confirming opening date is 2024 or 2025

    **IF YOU CANNOT FIND A RECENTLY OPENED PLACE:**
    Instead of featuring an old establishment, write about:
    - A pop-up event or temporary installation
    - A seasonal menu launch at a restaurant
    - A renovation or new location of an existing business
    - A trending spot that's gaining popularity

    **REQUIRED INFO:**
    - Name + OPENING DATE (month/year they opened)
    - Address
    - Hours
    - What they offer
    - Price range
    - Instagram/contact

    FORMAT:
    - What's new/noteworthy
    - Location and details
    - Why readers should care

    ═══════════════════════════════════════════════════════════
    SECTION 6: WEEKEND ESCAPE (Season-Aware, NO REPEATS)
    ═══════════════════════════════════════════════════════════

    Recommend ONE day trip or weekend escape. MUST be different from previous editions.

    🚨 PREVIOUSLY FEATURED (DO NOT REPEAT ANY OF THESE):
    ${usedEscapesList || 'No previous escapes recorded yet.'}

    Pick a destination NOT on the list above. There are dozens of options beyond Real de Catorce and the Huasteca.

    CONSIDER THE CURRENT SEASON:
    🌧️ RAINY (Jun-Oct): Warn about rivers/floods. Prefer museums, pueblos, hot springs, covered sites.
    ☀️ HOT (Mar-May): Higher elevations, shady spots, water. Sunscreen reminder.
    🍂 COOL (Nov-Feb): Desert hikes, outdoor markets, layering tips.

    DESTINATIONS (grouped by region - ROTATE, don't repeat):

    🏔️ SLP STATE - HUASTECA POTOSINA:
    - Cascada de Tamul (boat ride through Cañón del Río Santa María)
    - Tamasopo waterfalls (Puente de Dios, El Trampolín)
    - Cascadas de Micos (7 waterfalls, cliff jumping)
    - Sótano de las Golondrinas (bird watching at dawn)
    - Xilitla / Jardín Escultórico de Edward James (Las Pozas)
    - Aquismón (caving, Cueva del Agua, Sótano de las Huahuas)
    - Tanchachín / Río Gallinas waterfalls
    - Ciudad Valles (base camp, rafting, zip-lining)

    🏜️ SLP STATE - ALTIPLANO & DESERT:
    - Real de Catorce (pueblo mágico, Wirikuta, tunnel, horse rides)
    - Sierra de Catorce (hiking, desert landscapes)
    - Guadalcázar (mining town, bat caves, Sótano del Barro)
    - Cerro de San Pedro (ghost mining town, 20 min from SLP)
    - Laguna de la Media Luna (diving, snorkeling in Rioverde)
    - Rioverde (springs, pozas, agricultural valley)

    🌲 SLP STATE - ZONA MEDIA & SIERRA:
    - Sierra de Álvarez (hiking, camping, pine forests)
    - Parque Nacional Gogorrón (trails, rock formations)
    - Santa María del Río (rebozos, hot springs, pueblo mágico)
    - Villa de Reyes (haciendas, vineyards, Gogorrón)
    - Armadillo de los Infante (colonial town, peach orchards)
    - La Joya Honda (extinct volcano crater hike, 30 min from SLP)

    🗺️ NEARBY STATES (2-4 hr drive from SLP):
    - Guanajuato city (UNESCO, mummies, underground streets) ~2.5h
    - San Miguel de Allende (art, food, hot springs) ~3h
    - Mineral de Pozos (ghost town, lavender fields) ~3h
    - Peña de Bernal (3rd largest monolith, pueblo mágico, Querétaro) ~3h
    - Bernal + Tequisquiapan wine route (Querétaro) ~3.5h
    - Sierra Gorda Biosphere (Querétaro: Jalpan, missions) ~4h
    - Zacatecas city (colonial, mines, teleférico) ~3h
    - Aguascalientes (thermal baths, San Marcos) ~2.5h
    - Real de Asientos (Aguascalientes: mining town) ~3h
    - Jalpa (Zacatecas: Cañón de Juchipila) ~3h
    - Wirikuta desert crossing (Estación Catorce to Real) ~4h

    REQUIRED INFO:
    - Destination name and what makes it special (3-4 sentences)
    - Driving time from SLP city
    - Road conditions / route tips
    - Best time to visit / seasonal considerations
    - Approximate cost (entry fees, tolls, food)

    TONE: "Pack a cooler, grab your sunnies, and head out early - trust us on this one."

    ═══════════════════════════════════════════════════════════
    SECTION: ASK AN EXPAT (Q&A)
    ═══════════════════════════════════════════════════════════

    Answer ONE common question that expats or newcomers frequently ask about living in SLP.

    PREVIOUSLY ANSWERED (DO NOT REPEAT):
    ${usedQuestionsList || 'No previous questions answered yet.'}

    QUESTION BANK (choose one NOT previously used):
    - "Is tap water safe to drink in SLP?"
    - "How do I find a reliable housekeeper/cleaning person?"
    - "What's the best neighborhood for expats?"
    - "Can I use my foreign driver's license?"
    - "How do I set up internet at home?"
    - "Where can I find a good English-speaking doctor?"
    - "Is SLP safe for walking at night?"
    - "How do I get a Mexican phone number?"
    - "Where do expats hang out in SLP?"
    - "How does trash collection work?"
    - "Can I bring my pet to Mexico?"
    - "How do I get a bank account as a foreigner?"
    - "What's the deal with propinas (tips)?"
    - "How do I get my car registered in Mexico?"
    - "Where can I find good coffee beans?"
    - "Is Uber reliable in SLP?"
    - "How do I deal with noisy neighbors?"
    - "Where can I recycle in SLP?"
    - "How do I find a gym?"
    - "What's the altitude and how does it affect me?"

    FORMAT:
    - [EXPAT_QUESTION]: The question in natural language
    - [EXPAT_ANSWER]: 3-4 sentences with a practical, specific answer. Include at least one specific detail (address, app name, price, phone number).

    TONE: Friendly, been-there-done-that. Like a friend who moved to SLP two years ago sharing what they learned.

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
    - Body: 3-4 sentences with SPECIFIC details. MUST include at least ONE of:
      - A real address (e.g., "The IMSS clinic at Av. Carranza 500")
      - A phone number (e.g., "+52 444 123 4567")
      - A website/app (e.g., "Download the CFE Contigo app")
      - A price (e.g., "costs $580 MXN for the tramite")

    GOOD: "Need to pay your water bill? Skip the line at Interapas (Av. Muñoz 435, Centro) and use their app instead. Download 'Interapas Móvil', enter your account number, and pay with any Mexican debit card. Takes 2 minutes."
    BAD: "You can pay your water bill online or at various locations around the city."

    SOURCES:
    - INM (immigration) announcements
    - Expat forums and Facebook groups
    - InterNations SLP
    - US/Canadian consulate announcements

    ═══════════════════════════════════════════════════════════
    SECTION: SPANISH CORNER (Potosino Expressions)
    ═══════════════════════════════════════════════════════════

    Teach readers 2 Mexican Spanish expressions commonly used in San Luis Potosí.

    PREVIOUSLY USED (DO NOT REPEAT):
    ${usedPhrasesList || 'No previous phrases recorded yet.'}

    REQUIREMENTS:
    - Choose expressions specifically Potosino or commonly heard in SLP
    - Include regional slang, market phrases, food terms, or social expressions
    - Mix difficulty: one easier, one more advanced

    EXAMPLES: "¡Órale pues!", "Echar la hueva", "Está bien chido", "Quedamos al tiro"

    FORMAT:
    - [SPANISH_PHRASE_1]: The expression | [PHRASE_MEANING_1]: English meaning with context | [PHRASE_EXAMPLE_1]: Realistic SLP scenario
    - [SPANISH_PHRASE_2]: Second expression | [PHRASE_MEANING_2]: Translation | [PHRASE_EXAMPLE_2]: Usage example

    ${customContent ? `
    NOTE: A Comunidad section with custom content will be added automatically.
    Do NOT generate a Comunidad section - it will be injected programmatically.
    ` : ''}

    ═══════════════════════════════════════════════════════════
    SECTION: COMMUNITY SPOTLIGHT
    ═══════════════════════════════════════════════════════════

    Profile ONE local business, artisan, or community initiative worth knowing about.
    This is NOT limited to new places - feature established gems that deserve recognition.

    PREVIOUSLY FEATURED (DO NOT REPEAT):
    ${usedSpotlightsList || 'No previous spotlights recorded yet.'}

    TYPES OF FEATURES:
    - A family-run restaurant with decades of history
    - A local artisan or craftsperson (pottery, textiles, leather)
    - A community organization or charity
    - A local artist, musician, or cultural figure
    - A traditional market vendor with a great story
    - A small business doing something unique
    - A local sustainability or social initiative

    SEARCH: "emprendedores San Luis Potosí", "negocios locales SLP", "artesanos SLP", "historias SLP"

    FORMAT:
    - [SPOTLIGHT_NAME]: Business/person name
    - [SPOTLIGHT_TYPE]: Category (e.g., "Family Restaurant · Est. 1985", "Local Artisan · Ceramics", "Community Initiative")
    - [SPOTLIGHT_STORY]: 3-4 sentences telling their story - what they do, why they're special, what makes them worth visiting/supporting
    - [SPOTLIGHT_ADDRESS]: Full address
    - [SPOTLIGHT_CONTACT]: Instagram, phone, or website

    TONE: Celebratory and genuine. "We've been fans since day one..." or "If you haven't discovered this gem yet..."

    ═══════════════════════════════════════════════════════════
    FINAL INSTRUCTIONS
    ═══════════════════════════════════════════════════════════

    **DETAIL REQUIREMENTS (all events, places, recommendations):**
    - Exact DATE (e.g., "Saturday, March 30") - no "this weekend" or "coming soon"
    - Exact TIME (e.g., "7:00 PM - 10:00 PM")
    - Full ADDRESS in SLP (e.g., "Av. Carranza 500, Centro, SLP")
    - PRICE in MXN (e.g., "$150 MXN", "Entrada libre")
    - Contact when available (+52 phone, Instagram, website)

    **MORE THIS WEEK events:** Each MUST have event name, date, venue, and time.
    Format: <strong>Event Name</strong><br/><span style="color: #6B7280;">Date @ Venue · Time</span>
    If you can't find venue/time for an event, SKIP it and find another.

    **NO IMAGES:** Do NOT include <img> tags. They will be stripped.

    **BLOG SECTION - USE ONLY THESE REAL POSTS:**
    ${blogPostsList}
    Use ONLY the exact URLs above - DO NOT invent URLs.

    **LINKS:** Use verified links from search OR https://www.sanluisway.com/events. Never invent URLs.

    **CTA VALUES:**
    - CTA_TITLE: "Discover More of San Luis Potosí"
    - CTA_BODY: "From hidden gems to local favorites, explore everything the city has to offer"
    - CTA_BUTTON_LABEL: "Visit San Luis Way"
    - CTA_BUTTON_LINK: https://www.sanluisway.com

    **OUTPUT:** Replace ALL [PLACEHOLDER] text. Stop after CTA. No footer (added automatically). Return raw HTML only.

    ✅ PRE-FLIGHT: Verify all System Rules (dates in range, geography = Mexico, MXN prices, no images, no placeholders).

    HTML TEMPLATE:
    ${NEWSLETTER_TEMPLATE}

    Return ONLY the raw HTML.
  `;

  let htmlContent = '';

  // Validate API key before attempting generation
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY is not set');
    throw new Error('GOOGLE_API_KEY environment variable is required');
  }

  try {
    console.log('2.5. 🔑 Using Gemini API with key starting with:', process.env.GOOGLE_API_KEY?.substring(0, 8) + '...');

    // Try Gemini first
    const result = await model.generateContent(prompt);
    const response = await result.response;
    htmlContent = response.text();

    // Check if response looks like an HTML error page
    if (htmlContent.trim().toLowerCase().startsWith('<html') || htmlContent.trim().toLowerCase().startsWith('<!doctype')) {
      if (htmlContent.includes('error') || htmlContent.includes('Error') || htmlContent.length < 1000) {
        console.error('⚠️ Gemini returned what looks like an HTML error page');
        throw new Error('Gemini returned an HTML error page instead of newsletter content');
      }
    }

    console.log('3. ✅ Gemini generation successful, content length:', htmlContent.length);

  } catch (geminiError: unknown) {
    const errorMessage = geminiError instanceof Error ? geminiError.message : String(geminiError);
    console.error("Gemini Generation Error:", errorMessage);

    // Log more details if available
    if (geminiError && typeof geminiError === 'object') {
      const errObj = geminiError as Record<string, unknown>;
      if (errObj.status) console.error('Status:', errObj.status);
      if (errObj.statusText) console.error('Status Text:', errObj.statusText);
      if (errObj.response) console.error('Response:', errObj.response);
    }

    // Fallback to OpenAI
    if (openai) {
      try {
        htmlContent = await generateWithOpenAI(prompt);
        console.log('4. ✅ OpenAI fallback successful');
      } catch (openaiError) {
        console.error("OpenAI Fallback Error:", openaiError);
        throw new Error(`Both Gemini and OpenAI failed. Gemini error: ${errorMessage}`);
      }
    } else {
      throw new Error(`Gemini failed: ${errorMessage}. Add OPENAI_API_KEY to .env as fallback`);
    }
  }

  // Clean up markdown code fences if present
  htmlContent = htmlContent.replace(/^```html\n?/i, '').replace(/^```\n?/, '').replace(/\n?```$/i, '');

  // REMOVE ALL IMAGES - This is done FIRST to ensure no images slip through
  console.log('4. 🖼️ Removing all images from newsletter...');
  htmlContent = removeAllImages(htmlContent);

  // INJECT COMUNIDAD SECTION - Programmatically inject custom content
  // This GUARANTEES the custom content appears, regardless of what AI generated
  if (customContent) {
    console.log('4.5. 🤝 Injecting Comunidad section with custom content...');
    htmlContent = await injectComunidadSection(htmlContent, customContent);
    console.log('   ✅ Comunidad section injected successfully');
  }

  // IMPORTANT: Inject the standardized footer/closing section
  // This ensures the footer is ALWAYS included exactly as defined, regardless of AI output
  console.log('5. 📧 Injecting standardized footer and closing section...');
  htmlContent = injectFooterIntoNewsletter(htmlContent);

  // Validate that the AI filled every placeholder before we strip the leftovers.
  // cleanHtmlForBeehiiv silently removes [PLACEHOLDER] patterns, which used to
  // produce half-filled sections with no signal that anything went wrong.
  const unfilledPlaceholders = detectUnfilledPlaceholders(htmlContent);
  const missingCritical = unfilledPlaceholders.filter((p) => CRITICAL_PLACEHOLDERS.has(p));
  if (unfilledPlaceholders.length > 0) {
    console.warn('   ⚠️ Unfilled placeholders remaining after generation:');
    for (const p of unfilledPlaceholders) {
      const critical = CRITICAL_PLACEHOLDERS.has(p) ? ' (CRITICAL)' : '';
      console.warn(`      - ${p}${critical}`);
    }
  }
  if (missingCritical.length > 0) {
    throw new Error(
      `AI left ${missingCritical.length} critical placeholder(s) unfilled: ${missingCritical.join(', ')}. ` +
      `Re-run generation; if it persists, simplify the prompt or add examples for these fields.`
    );
  }

  // Clean HTML for Beehiiv compatibility (remove <head>, class attributes)
  console.log('6. 🧹 Cleaning HTML for Beehiiv compatibility...');
  htmlContent = cleanHtmlForBeehiiv(htmlContent);

  // Inject responsive + dark-mode-safe styles. MUST happen after cleaning —
  // cleanHtmlForBeehiiv wipes the <head>, which is where any AI-returned
  // @media rules would have lived.
  console.log('6.5. 📱 Injecting responsive styles...');
  htmlContent = injectResponsiveStyles(htmlContent);

  // Validate and clean URLs (static cleanup + async HEAD verification of sanluisway.com links)
  console.log('7. 🔗 Validating and cleaning URLs...');
  const linkValidation = await validateAndCleanUrls(htmlContent);
  htmlContent = linkValidation.html;

  // Extract and save content to avoid repetition in future newsletters
  console.log('7. 💾 Extracting and saving content to prevent repetition...');

  // Save "Did You Know?" fact
  // In the 4-card layout, the emoji title lives in <h3> and the actual
  // fact title/body live in <h4>/<p>. Extract from those inner elements.
  try {
    const factTitleMatch = htmlContent.match(/🧠 Did You Know\?[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/i);
    const factBodyMatch = htmlContent.match(/🧠 Did You Know\?[\s\S]*?<\/h4>\s*<p[^>]*>([^<]+)<\/p>/i);

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
    const tipTitleMatch = htmlContent.match(/💡 Expat Pro Tip[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/i);
    const tipBodyMatch = htmlContent.match(/💡 Expat Pro Tip[\s\S]*?<\/h4>\s*<p[^>]*>([^<]+)<\/p>/i);

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

  // Save "Weekend Escape" destination
  try {
    const escapeNameMatch = htmlContent.match(/🌿 Weekend Escape[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/i);
    if (escapeNameMatch) {
      const escapeName = escapeNameMatch[1].trim();
      if (escapeName && escapeName.length > 2) {
        await supabase.from('newsletter_escapes').insert({ escape_name: escapeName });
        console.log(`   ✅ Saved escape: "${escapeName.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save escape:', e);
  }

  // Save "Spot of the Week"
  try {
    const spotNameMatch = htmlContent.match(/📍 Spot of the Week[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/i);
    const spotDescMatch = htmlContent.match(/📍 Spot of the Week[\s\S]*?<\/h4>\s*<p[^>]*>([^<]+)<\/p>/i);
    if (spotNameMatch) {
      const spotName = spotNameMatch[1].trim();
      const spotDesc = spotDescMatch ? spotDescMatch[1].trim() : '';
      if (spotName && spotName.length > 2) {
        await supabase.from('newsletter_spots').insert({ spot_name: spotName, spot_description: spotDesc });
        console.log(`   ✅ Saved spot: "${spotName.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save spot:', e);
  }

  // Save "Spanish Corner" phrases
  try {
    const phrase1Match = htmlContent.match(/🗣️ Spanish Corner[\s\S]*?"([^"]{2,50})"/i);
    const phrase2Match = htmlContent.match(/🗣️ Spanish Corner[\s\S]*?<div[^>]*>[\s\S]*?<\/div>\s*<div[^>]*>[\s\S]*?"([^"]{2,50})"/i);
    const phrases = [phrase1Match?.[1], phrase2Match?.[1]].filter(Boolean);
    for (const phrase of phrases) {
      if (phrase && phrase.length > 2) {
        await supabase.from('newsletter_phrases').insert({ phrase });
        console.log(`   ✅ Saved phrase: "${phrase}"`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save phrases:', e);
  }

  // Save "Ask an Expat" question
  try {
    const questionMatch = htmlContent.match(/🙋 Ask an Expat[\s\S]*?Q: "([^"]+)"/i);
    const answerMatch = htmlContent.match(/🙋 Ask an Expat[\s\S]*?Q: "[^"]*"[\s\S]*?<p[^>]*>([^<]+)<\/p>/i);

    if (questionMatch && answerMatch) {
      const question = questionMatch[1].trim();
      const answerSummary = answerMatch[1].trim().substring(0, 200);

      if (question && question.length > 5) {
        await supabase.from('newsletter_questions').insert({
          question: question,
          answer_summary: answerSummary,
        });
        console.log(`   ✅ Saved question: "${question.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save question:', e);
  }

  // Save "Community Spotlight" entry
  try {
    const spotlightNameMatch = htmlContent.match(/✨ Community Spotlight[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/i);
    const spotlightTypeMatch = htmlContent.match(/✨ Community Spotlight[\s\S]*?<\/h4>\s*<p[^>]*>([^<]+)<\/p>/i);

    if (spotlightNameMatch) {
      const spotlightName = spotlightNameMatch[1].trim();
      const spotlightType = spotlightTypeMatch ? spotlightTypeMatch[1].trim() : '';

      if (spotlightName && spotlightName.length > 2) {
        await supabase.from('newsletter_spotlights').insert({
          spotlight_name: spotlightName,
          spotlight_type: spotlightType,
        });
        console.log(`   ✅ Saved spotlight: "${spotlightName.substring(0, 40)}..."`);
      }
    }
  } catch (e) {
    console.error('   ⚠️ Could not save spotlight:', e);
  }

  return {
    subject: `San Luis Way Weekly | ${dateRangeStr}`,
    html_content: htmlContent,
    date_range: dateRangeStr,
    link_validation: {
      total_sanluisway_links: linkValidation.totalSanluiswayLinks,
      broken_links_replaced: linkValidation.brokenLinks,
    },
    unfilled_placeholders: unfilledPlaceholders,
  };
}
