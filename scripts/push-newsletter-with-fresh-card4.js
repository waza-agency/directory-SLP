/**
 * One-off: regenerate Card 4 (Weekend Escape + From the Blog + Community
 * Spotlight) via Gemini using real blog data from Supabase, stitch it into
 * the saved draft HTML, and push the result to Beehiiv as a draft post.
 *
 * Inputs:
 *   - scripts/draft-newsletter.html (the current draft with <!-- CARD_4_PLACEHOLDER -->)
 * Outputs:
 *   - Creates a draft in Beehiiv
 *   - Logs the Beehiiv edit URL
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

const DRAFT_PATH = path.join(__dirname, 'draft-newsletter.html');
const CARD4_MARKER = '<!-- CARD_4_PLACEHOLDER -->';
const POST_TITLE = 'San Luis Way Weekly | April 20 - April 27, 2026';
const POST_SUBTITLE = 'Your weekly guide to San Luis Potosí for April 20 - April 27, 2026';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const BEEHIIV_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUB = process.env.BEEHIIV_PUBLICATION_ID;

for (const [name, val] of Object.entries({
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SUPABASE_KEY,
  OPENAI_API_KEY: OPENAI_KEY,
  BEEHIIV_API_KEY: BEEHIIV_KEY,
  BEEHIIV_PUBLICATION_ID: BEEHIIV_PUB,
})) {
  if (!val) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
}

const openai = new OpenAI({ apiKey: OPENAI_KEY });

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function pickBlogPost() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, title_en, excerpt, excerpt_en, category')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(5);
  if (error || !data || data.length === 0) {
    throw new Error(`Could not fetch a blog post: ${error?.message || 'no rows'}`);
  }
  const post = data[0];
  return {
    title: post.title_en || post.title,
    excerpt: post.excerpt_en || post.excerpt || '',
    url: `https://www.sanluisway.com/blog/${post.slug}`,
  };
}

async function generateCard4Content(blogPost) {
  const systemPrompt = `You write the "Go Deeper" section of the San Luis Way Weekly, an English
newsletter for expats and locals in San Luis Potosí, México. You know the city — Huasteca
Potosina, Altiplano, Zona Media, centro histórico, pueblos mágicos nearby — and you write
in a warm, casual, specific tone. Prices in MXN, addresses in SLP, phone numbers with +52.
Return only valid JSON, no prose.`;

  const userPrompt = `Week of April 20 - April 27, 2026. Fill these three sub-sections:

1) WEEKEND ESCAPE — pick ONE destination within 3 hours of San Luis Potosí, México.
   EXCLUDE: Real de Catorce (featured recently). Prefer Huasteca options, Rioverde,
   Guadalcázar, Laguna de la Media Luna, or a nearby pueblo mágico.
   Body: 3-4 sentences with driving time from SLP, road conditions, best time to visit,
   and approximate cost (entry fees + tolls + food) in MXN.

2) FROM THE BLOG — use EXACTLY this featured post (do NOT invent a different one):
   Title: "${blogPost.title}"
   Excerpt: "${blogPost.excerpt}"
   URL: ${blogPost.url}
   Write ONE sentence teaser (under 25 words) that makes readers click.

3) COMMUNITY SPOTLIGHT — pick ONE local business, artisan, or initiative in SLP worth
   knowing about (family restaurant, artisan, small shop, community org, cultural figure).
   Include real address in SLP, type (e.g. "Family Restaurant · Est. 1992"), a 3-4 sentence
   story, and one contact (Instagram handle or +52 phone).

Return JSON in this exact shape:
{
  "escape": {
    "destination": "Destination name",
    "body": "3-4 sentences with driving time, cost, tips."
  },
  "blog": {
    "teaser": "One-sentence teaser under 25 words"
  },
  "spotlight": {
    "name": "Business or person name",
    "type": "Family Restaurant · Est. 1992",
    "story": "3-4 sentences about them",
    "address": "Full SLP address",
    "contact": "@instagram_handle or +52 phone"
  }
}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.75,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  const text = res.choices[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI');
  return JSON.parse(text);
}

function buildCard4Html(content, blogPost) {
  const esc = (s) => String(s ?? '').replace(/[<>]/g, (c) => ({ '<': '&lt;', '>': '&gt;' }[c]));
  return `          <!-- CARD 4: GO DEEPER -->
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
                  <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #1F2937;">${esc(content.escape.destination)}</h4>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">${esc(content.escape.body)}</p>
                  <a href="https://www.sanluisway.com/outdoors" style="color: #166534; font-weight: bold; font-size: 13px;">Explore more day trips →</a>
                </div>
                <!-- FROM THE BLOG - Featured Articles -->
                <div style="padding: 18px 22px; border-bottom: 1px solid #F3F4F6;">
                  <h3 style="margin: 0 0 10px 0; color: #1F2937; font-size: 16px;">📖 From the Blog</h3>
                  <div style="background-color: #FEF3C7; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #C75B39; color: #FFFFFF; border-radius: 10px; font-size: 10px; font-weight: bold; margin-bottom: 8px;">FEATURED</span>
                    <h4 style="font-size: 15px; color: #1F2937; margin: 0 0 8px 0;">${esc(blogPost.title)}</h4>
                    <p style="font-size: 13px; color: #4B5563; margin: 0 0 12px 0; line-height: 1.5;">${esc(content.blog.teaser)}</p>
                    <a href="${blogPost.url}" style="display: inline-block; padding: 8px 16px; background-color: #C75B39; color: #FFFFFF; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">Read the Full Story →</a>
                  </div>
                  <p style="margin: 0 0 6px 0; font-size: 12px; color: #6B7280; font-weight: bold;">MORE POPULAR READS:</p>
                  <p style="margin: 0 0 4px 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog" style="color: #2563EB;">→ Latest articles on expat life in SLP</a></p>
                  <p style="margin: 0 0 4px 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog?category=food" style="color: #2563EB;">→ Food &amp; restaurant guides</a></p>
                  <p style="margin: 0; font-size: 13px;"><a href="https://www.sanluisway.com/blog?category=travel" style="color: #2563EB;">→ Day trips &amp; adventures</a></p>
                </div>
                <!-- COMMUNITY SPOTLIGHT -->
                <div style="padding: 18px 22px; background-color: #FFFBEB;">
                  <h3 style="margin: 0 0 10px 0; color: #92400E; font-size: 16px;">✨ Community Spotlight</h3>
                  <h4 style="margin: 0 0 4px 0; font-size: 15px; color: #1F2937;">${esc(content.spotlight.name)}</h4>
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #B45309; font-weight: bold;">${esc(content.spotlight.type)}</p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">${esc(content.spotlight.story)}</p>
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">📍 ${esc(content.spotlight.address)}</p>
                  <p style="margin: 0; font-size: 12px; color: #6B7280;">📬 ${esc(content.spotlight.contact)}</p>
                </div>
              </div>
            </td>
          </tr>`;
}

async function createBeehiivDraft(html) {
  const res = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BEEHIIV_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: POST_TITLE,
      subtitle: POST_SUBTITLE,
      status: 'draft',
      content: { free: { web: html, email: html } },
      audience: 'all',
    }),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

async function main() {
  const template = fs.readFileSync(DRAFT_PATH, 'utf8');
  if (!template.includes(CARD4_MARKER)) {
    throw new Error(`Marker ${CARD4_MARKER} not found in ${DRAFT_PATH}`);
  }

  console.log('1/4 Fetching latest blog post from Supabase...');
  const blogPost = await pickBlogPost();
  console.log(`    Using: "${blogPost.title}"`);

  console.log('2/4 Generating Card 4 content via OpenAI...');
  const content = await generateCard4Content(blogPost);
  console.log(`    Escape: "${content.escape.destination}"`);
  console.log(`    Spotlight: "${content.spotlight.name}"`);

  console.log('3/4 Stitching HTML...');
  const card4Html = buildCard4Html(content, blogPost);
  const finalHtml = template.replace(CARD4_MARKER, card4Html);

  // Always save the final HTML locally so the user has a copy regardless of API outcome
  const outPath = path.join(__dirname, 'draft-newsletter-final.html');
  fs.writeFileSync(outPath, finalHtml);
  console.log(`    Saved final HTML: ${outPath}`);

  console.log('4/4 Creating Beehiiv draft via API...');
  const result = await createBeehiivDraft(finalHtml);
  if (result.ok) {
    const data = JSON.parse(result.body);
    const postId = data.data?.id;
    const editUrl = postId
      ? `https://app.beehiiv.com/publications/${BEEHIIV_PUB}/posts/${postId}`
      : null;
    console.log('\n✅ Beehiiv draft created');
    if (editUrl) console.log(`   Edit: ${editUrl}`);
    console.log(`   Post ID: ${postId}`);
    return;
  }

  // 403 = plan doesn't support the POST /posts endpoint. Fall back to manual paste.
  console.log(`\n⚠️  Beehiiv API responded ${result.status}:`);
  console.log(`   ${result.body}`);
  console.log('\n   The HTML is ready at:');
  console.log(`     ${outPath}`);
  console.log('\n   Manual next step:');
  console.log(`     1. Go to https://app.beehiiv.com/publications/${BEEHIIV_PUB}/posts`);
  console.log('     2. Click "New Post" → "Start from scratch"');
  console.log('     3. Switch editor to "HTML" / "Code" mode');
  console.log(`     4. Paste contents of draft-newsletter-final.html`);
  console.log(`     5. Title: "${POST_TITLE}"`);
  console.log(`     6. Subtitle: "${POST_SUBTITLE}"`);
}

main().catch((e) => {
  console.error('\n❌', e.message);
  process.exit(1);
});
