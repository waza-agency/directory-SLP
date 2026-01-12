/**
 * Newsletter Section Parser and Regenerator
 * Parses newsletter HTML into editable sections and regenerates individual sections
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { format, addDays } from 'date-fns';
import { fetchWeatherForecast } from './api/dashboard-data';

// Helper to get current dates for prompts
function getCurrentDates() {
  const now = new Date();
  const endDate = addDays(now, 7);

  const currentYear = now.getFullYear();
  const currentMonth = format(now, 'MMMM');

  const monthsInSpanish: Record<string, string> = {
    'January': 'enero', 'February': 'febrero', 'March': 'marzo', 'April': 'abril',
    'May': 'mayo', 'June': 'junio', 'July': 'julio', 'August': 'agosto',
    'September': 'septiembre', 'October': 'octubre', 'November': 'noviembre', 'December': 'diciembre'
  };
  const spanishMonth = monthsInSpanish[currentMonth] || currentMonth.toLowerCase();

  // Calculate previous months
  const prevMonth1 = new Date(now);
  prevMonth1.setMonth(prevMonth1.getMonth() - 1);
  const prevMonth2 = new Date(now);
  prevMonth2.setMonth(prevMonth2.getMonth() - 2);

  return {
    todayFormatted: format(now, 'EEEE, MMMM d, yyyy'),
    dateRange: `${format(now, 'MMMM d')} - ${format(endDate, 'MMMM d, yyyy')}`,
    currentMonth,
    currentYear,
    spanishMonth,
    prevMonthName1: format(prevMonth1, 'MMMM yyyy'),
    prevMonthName2: format(prevMonth2, 'MMMM yyyy'),
    prevMonthSpanish1: monthsInSpanish[format(prevMonth1, 'MMMM')] || format(prevMonth1, 'MMMM').toLowerCase(),
    prevMonthSpanish2: monthsInSpanish[format(prevMonth2, 'MMMM')] || format(prevMonth2, 'MMMM').toLowerCase(),
  };
}

export interface NewsletterSection {
  id: string;
  name: string;
  type: 'opening' | 'weather' | 'news' | 'events' | 'fact' | 'around_town' | 'escape' | 'coming_up' | 'tip' | 'blog' | 'comunidad' | 'cta';
  html: string;
  editable: boolean;
}

// Section markers for parsing
const SECTION_PATTERNS: { id: string; name: string; type: NewsletterSection['type']; startPattern: RegExp; endPattern: RegExp; editable: boolean }[] = [
  {
    id: 'opening',
    name: 'Opening Hook',
    type: 'opening',
    startPattern: /<!-- OPENING HOOK -->/i,
    endPattern: /<!-- WEATHER/i,
    editable: true
  },
  {
    id: 'weather',
    name: 'Weather Watch',
    type: 'weather',
    startPattern: /<!-- WEATHER/i,
    endPattern: /<!-- NEWS SECTION/i,
    editable: true
  },
  {
    id: 'news',
    name: 'The Week in SLP',
    type: 'news',
    startPattern: /<!-- NEWS SECTION/i,
    endPattern: /<!-- TOP PICKS/i,
    editable: true
  },
  {
    id: 'events',
    name: "This Week's Top Picks",
    type: 'events',
    startPattern: /<!-- TOP PICKS/i,
    endPattern: /<!-- MORE THIS WEEK/i,
    editable: true
  },
  {
    id: 'more_events',
    name: 'More This Week',
    type: 'events',
    startPattern: /<!-- MORE THIS WEEK/i,
    endPattern: /<!-- DID YOU KNOW/i,
    editable: true
  },
  {
    id: 'fact',
    name: 'Did You Know?',
    type: 'fact',
    startPattern: /<!-- DID YOU KNOW/i,
    endPattern: /<!-- AROUND TOWN/i,
    editable: true
  },
  {
    id: 'around_town',
    name: 'Around Town',
    type: 'around_town',
    startPattern: /<!-- AROUND TOWN/i,
    endPattern: /<!-- WEEKEND ESCAPE/i,
    editable: true
  },
  {
    id: 'escape',
    name: 'Weekend Escape',
    type: 'escape',
    startPattern: /<!-- WEEKEND ESCAPE/i,
    endPattern: /<!-- COMING UP/i,
    editable: true
  },
  {
    id: 'coming_up',
    name: 'Coming Up',
    type: 'coming_up',
    startPattern: /<!-- COMING UP/i,
    endPattern: /<!-- PRO TIP/i,
    editable: true
  },
  {
    id: 'tip',
    name: 'Expat Pro Tip',
    type: 'tip',
    startPattern: /<!-- PRO TIP/i,
    endPattern: /<!-- FROM THE BLOG/i,
    editable: true
  },
  {
    id: 'blog',
    name: 'From the Blog',
    type: 'blog',
    startPattern: /<!-- FROM THE BLOG/i,
    endPattern: /<!-- COMUNIDAD|<!-- CALL TO ACTION/i,
    editable: false
  },
  {
    id: 'comunidad',
    name: 'Comunidad',
    type: 'comunidad',
    startPattern: /<!-- COMUNIDAD/i,
    endPattern: /<!-- CALL TO ACTION/i,
    editable: true
  },
  {
    id: 'cta',
    name: 'Call to Action',
    type: 'cta',
    startPattern: /<!-- CALL TO ACTION/i,
    endPattern: /<!-- EXPLORE SAN LUIS|<!-- CLOSING/i,
    editable: false
  }
];

/**
 * Parse newsletter HTML into sections
 */
export function parseNewsletterSections(html: string): NewsletterSection[] {
  const sections: NewsletterSection[] = [];

  // Add section markers if they don't exist (for older newsletters)
  let markedHtml = html;

  // Try to find sections by content patterns if markers don't exist
  if (!html.includes('<!-- OPENING HOOK -->')) {
    markedHtml = markedHtml.replace(/(Hey there! 👋)/i, '<!-- OPENING HOOK -->\n$1');
  }
  if (!html.includes('<!-- WEATHER')) {
    markedHtml = markedHtml.replace(/(🌦️ Weather Watch)/i, '<!-- WEATHER & ENVIRONMENT -->\n$1');
  }
  if (!html.includes('<!-- NEWS SECTION')) {
    markedHtml = markedHtml.replace(/(📰 The Week in SLP)/i, '<!-- NEWS SECTION -->\n$1');
  }
  if (!html.includes('<!-- TOP PICKS')) {
    markedHtml = markedHtml.replace(/(🌟 This Week's Top Picks)/i, '<!-- TOP PICKS -->\n$1');
  }
  if (!html.includes('<!-- DID YOU KNOW')) {
    markedHtml = markedHtml.replace(/(🧠 Did You Know)/i, '<!-- DID YOU KNOW -->\n$1');
  }
  if (!html.includes('<!-- AROUND TOWN')) {
    markedHtml = markedHtml.replace(/(🏙️ Around Town)/i, '<!-- AROUND TOWN -->\n$1');
  }
  if (!html.includes('<!-- WEEKEND ESCAPE')) {
    markedHtml = markedHtml.replace(/(🌿 Weekend Escape)/i, '<!-- WEEKEND ESCAPE -->\n$1');
  }
  if (!html.includes('<!-- COMING UP')) {
    markedHtml = markedHtml.replace(/(📅 Coming Up)/i, '<!-- COMING UP -->\n$1');
  }
  if (!html.includes('<!-- PRO TIP')) {
    markedHtml = markedHtml.replace(/(💡 Expat Pro Tip)/i, '<!-- PRO TIP -->\n$1');
  }
  if (!html.includes('<!-- FROM THE BLOG')) {
    markedHtml = markedHtml.replace(/(📖 From the Blog)/i, '<!-- FROM THE BLOG -->\n$1');
  }
  if (!html.includes('<!-- COMUNIDAD')) {
    markedHtml = markedHtml.replace(/(🤝 Comunidad)/i, '<!-- COMUNIDAD SECTION -->\n$1');
  }

  for (const pattern of SECTION_PATTERNS) {
    const startMatch = markedHtml.match(pattern.startPattern);
    if (startMatch && startMatch.index !== undefined) {
      const startIndex = startMatch.index;
      const endMatch = markedHtml.substring(startIndex + 1).match(pattern.endPattern);

      let endIndex: number;
      if (endMatch && endMatch.index !== undefined) {
        endIndex = startIndex + 1 + endMatch.index;
      } else {
        // If no end pattern found, take until end or a reasonable length
        endIndex = Math.min(startIndex + 5000, markedHtml.length);
      }

      const sectionHtml = markedHtml.substring(startIndex, endIndex).trim();

      if (sectionHtml.length > 50) { // Only add if section has meaningful content
        sections.push({
          id: pattern.id,
          name: pattern.name,
          type: pattern.type,
          html: sectionHtml,
          editable: pattern.editable
        });
      }
    }
  }

  return sections;
}

/**
 * Regenerate a specific section of the newsletter
 */
export async function regenerateSection(
  sectionType: NewsletterSection['type'],
  sectionId: string,
  currentHtml: string,
  context?: string
): Promise<string> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is required');
  }

  // Get current dates - calculated fresh each time
  const dates = getCurrentDates();
  console.log(`Regenerating section with dates: ${dates.todayFormatted}, range: ${dates.dateRange}`);

  // Fetch real weather data if regenerating weather section
  let weatherDataStr = '';
  if (sectionType === 'weather') {
    console.log('Fetching real weather data for weather section...');
    try {
      const forecast = await fetchWeatherForecast();
      if (forecast) {
        const dailyForecast = forecast.daily.map(d =>
          `  - ${d.dayName}: ${d.tempMin}°C - ${d.tempMax}°C, ${d.condition} (${d.conditionEs}), ${d.chanceOfRain}% rain chance`
        ).join('\n');
        weatherDataStr = `
📊 REAL WEATHER DATA FROM OPENWEATHERMAP API (USE THIS DATA):
Current Temperature: ${forecast.current.temp}°C
Current Condition: ${forecast.current.conditionEn} (${forecast.current.conditionEs})
Humidity: ${forecast.current.humidity}%

5-Day Forecast:
${dailyForecast}

Summary: ${forecast.summary}
`;
        console.log('Real weather data fetched successfully');
      }
    } catch (error) {
      console.error('Could not fetch weather data:', error);
    }
  }

  const model = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY).getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { maxOutputTokens: 2000, temperature: 0.8 }
  });

  const prompts: Record<string, string> = {
    opening: `Generate a new friendly opening hook for a San Luis Potosí, México newsletter.
Write 2-3 engaging sentences that welcome readers and tease what's in this week's newsletter.
Keep it warm, conversational, and relevant to life in SLP.
Return ONLY the HTML for the opening paragraph (no <tr> wrapper needed, just the <p> tags).`,

    weather: `Generate a weather section for San Luis Potosí, México.
📅 TODAY IS: ${dates.todayFormatted}
📅 FORECAST PERIOD: ${dates.dateRange}

🚨 IMPORTANT: Use the REAL WEATHER DATA below. DO NOT make up temperatures.
${weatherDataStr || '⚠️ Weather API unavailable - use realistic winter temperatures for SLP (around 5-15°C in January)'}

Include forecast summary, temperature range in Celsius (USE THE EXACT VALUES FROM DATA ABOVE), and a practical tip.
Format as HTML with the 🌦️ Weather Watch header.
Return the complete <tr> section HTML.`,

    news: `Generate 2 local news items for San Luis Potosí, MÉXICO (NOT USA).

🚨 CRITICAL DATE REQUIREMENT:
📅 TODAY IS: ${dates.todayFormatted}
📅 CURRENT MONTH: ${dates.currentMonth} ${dates.currentYear}
⛔ REJECT any news from ${dates.prevMonthName1} or ${dates.prevMonthName2}
⛔ REJECT any news with dates in "${dates.prevMonthSpanish1}" or "${dates.prevMonthSpanish2}"
✅ ONLY include news from ${dates.currentMonth} ${dates.currentYear}

Search for: "noticias San Luis Potosí ${dates.spanishMonth} ${dates.currentYear}"

Focus on: city announcements, infrastructure, business news, or community events.
Each news item should have: headline, 3-4 sentence summary, and "why it matters" explanation.
Also include 3 "Quick Hits" - short practical updates.
Return the complete <tr> section HTML with the 📰 The Week in SLP header.`,

    events: `Generate 3 events happening in San Luis Potosí, MÉXICO.

🚨🚨🚨 ABSOLUTELY CRITICAL DATE REQUIREMENT 🚨🚨🚨
📅 TODAY IS: ${dates.todayFormatted}
📅 THIS NEWSLETTER COVERS: ${dates.dateRange}
📅 CURRENT MONTH: ${dates.currentMonth} ${dates.currentYear}

⛔ REJECT ANY EVENT FROM ${dates.prevMonthName1} OR ${dates.prevMonthName2}
⛔ REJECT ANY EVENT with dates in "${dates.prevMonthSpanish1}" or "${dates.prevMonthSpanish2}"
⛔ IF YOU SEE "octubre" or "octubre 2025" in event dates → SKIP IT!
⛔ IF YOU SEE "noviembre" or "noviembre 2025" in event dates → SKIP IT!
✅ ONLY include events happening in ${dates.currentMonth} ${dates.currentYear}
✅ Events must be between ${dates.dateRange}

Search queries to use:
- "eventos San Luis Potosí México ${dates.spanishMonth} ${dates.currentYear}"
- "conciertos SLP ${dates.spanishMonth} ${dates.currentYear}"
- "agenda cultural San Luis Potosí ${dates.currentMonth} ${dates.currentYear}"

Include: event name, date/time, venue with address, description, and cost in MXN pesos.
Categories: culture, music, food, sports, family, or nightlife.
Return the complete <tr> section HTML.`,

    fact: `Generate a unique "Did You Know?" fact about San Luis Potosí, México.
Topics: history, culture, famous potosinos, local traditions, architecture, cuisine, or nature.
Make it interesting and educational.
Return the complete <tr> section HTML with the 🧠 Did You Know? header.`,

    around_town: `Generate an "Around Town" section featuring:
1. A NEW place that recently opened in San Luis Potosí (2024-2025)
2. A "Good to Know" practical city update
Include specific addresses and details.
Return the complete <tr> section HTML with the 🏙️ Around Town header.`,

    escape: `Generate a "Weekend Escape" section about a day trip destination near San Luis Potosí.
Options: Huasteca Potosina, Real de Catorce, Xilitla, local hot springs, hiking spots.
Include practical info: distance, travel time, what to do, costs.
Return the complete <tr> section HTML with the 🌿 Weekend Escape header.`,

    coming_up: `Generate a "Coming Up" section with 4 upcoming events in San Luis Potosí, MÉXICO.

🚨 CRITICAL DATE REQUIREMENT:
📅 TODAY IS: ${dates.todayFormatted}
📅 SHOW EVENTS FOR: Next 2-4 weeks starting from today
⛔ NO events from ${dates.prevMonthName1} or ${dates.prevMonthName2}
✅ All dates must be in ${dates.currentMonth} ${dates.currentYear} or later

Search for: "eventos San Luis Potosí ${dates.spanishMonth} ${dates.currentYear}"

List events with dates and brief descriptions.
Return the complete <tr> section HTML with the 📅 Coming Up header.`,

    tip: `Generate an "Expat Pro Tip" for living in San Luis Potosí, México.
Topics: navigating bureaucracy, finding services, local customs, money-saving tips, etc.
Be specific with addresses, phone numbers, or websites when possible.
Return the complete <tr> section HTML with the 💡 Expat Pro Tip header.`,

    comunidad: `Generate a "Comunidad" section with a community announcement or local business feature.
Make it friendly and engaging, like a friend sharing a recommendation.
${context ? `Use this content as inspiration: ${context}` : 'Create a general community update.'}
Return the complete <tr> section HTML with the 🤝 Comunidad header.`
  };

  const prompt = prompts[sectionType] || prompts['news'];

  const fullPrompt = `
You are the editor of "San Luis Way Weekly", a newsletter for expats and locals in San Luis Potosí, MÉXICO.

╔══════════════════════════════════════════════════════════════════════════╗
║  🚨 CRITICAL: DATE AND LOCATION REQUIREMENTS 🚨                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  📅 TODAY IS: ${dates.todayFormatted}
║  📅 CURRENT MONTH: ${dates.currentMonth} ${dates.currentYear}
║                                                                          ║
║  ⛔ REJECT content from ${dates.prevMonthName1} or ${dates.prevMonthName2}
║  ⛔ REJECT content with "${dates.prevMonthSpanish1}" or "${dates.prevMonthSpanish2}" dates
║  ✅ ONLY include content from ${dates.currentMonth} ${dates.currentYear}
║                                                                          ║
║  🇲🇽 ALL content must be about SAN LUIS POTOSÍ, MÉXICO                   ║
║  ❌ NOT Arizona, California, Texas, or any US location                   ║
║  💰 Prices in MXN (Mexican pesos) | 📞 Phone numbers start with +52     ║
╚══════════════════════════════════════════════════════════════════════════╝

${prompt}

Current section being replaced:
${currentHtml.substring(0, 500)}...

Generate a fresh, engaging replacement. Match the HTML structure and styling of the original.
Return ONLY the raw HTML, no markdown code blocks.
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    let newHtml = response.text().trim();

    // Clean up markdown if present
    newHtml = newHtml.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

    // Remove any images
    newHtml = newHtml.replace(/<img[^>]*>/gi, '');

    return newHtml;
  } catch (error) {
    console.error('Error regenerating section:', error);
    throw new Error('Failed to regenerate section');
  }
}

/**
 * Reconstruct newsletter HTML from sections
 */
export function reconstructNewsletter(sections: NewsletterSection[], originalHtml: string): string {
  let newHtml = originalHtml;

  for (const section of sections) {
    // Find and replace the section in the original HTML
    const pattern = SECTION_PATTERNS.find(p => p.id === section.id);
    if (pattern) {
      const startMatch = newHtml.match(pattern.startPattern);
      if (startMatch && startMatch.index !== undefined) {
        const startIndex = startMatch.index;
        const endMatch = newHtml.substring(startIndex + 1).match(pattern.endPattern);

        if (endMatch && endMatch.index !== undefined) {
          const endIndex = startIndex + 1 + endMatch.index;
          const before = newHtml.substring(0, startIndex);
          const after = newHtml.substring(endIndex);
          newHtml = before + section.html + '\n\n          ' + after;
        }
      }
    }
  }

  return newHtml;
}
