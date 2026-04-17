require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!GOOGLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing credentials'); process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const MODEL = 'gemini-3-pro-image-preview';
const SLUG = 'ultimate-guide-living-san-luis-potosi-2026';

const images = [
  {
    name: 'hero',
    prompt: 'Photorealistic wide-angle cinematic 16:9 shot of San Luis Potosí historic center at golden hour. Pink cantera stone baroque cathedral (Catedral de San Luis Potosí) with twin towers dominating the skyline, Plaza de Armas with fountain in foreground, mix of locals and international visitors walking, modern digital nomad with laptop bag passing by a traditional Mexican family, warm sunset light creating long shadows. Editorial travel magazine quality, National Geographic style. Palette: warm pink cantera stone, deep blue sky, golden light. No text, no watermarks. 4K hyper-detailed.',
  },
  {
    name: 'cost-dashboard',
    prompt: 'Clean modern infographic illustration on white background. Top half: "San Luis Potosí 2026 Cost of Living" title in bold sans-serif. Center: large clean bar chart comparing monthly costs in three colors — blue for solo expat ($1,200 USD), green for digital nomad ($1,800 USD), orange for family of four ($2,400 USD). Below: six simple line icons with labels: apartment key (rent), fork (food), wifi (internet), bus (transit), heart-plus (healthcare), sun (utilities). Minimalist flat design, generous whitespace, Nordic design aesthetic. No photorealism, pure illustration. 16:9 landscape.',
  },
  {
    name: 'nomad-coworking',
    prompt: 'Photorealistic interior of a modern coworking space in San Luis Potosí historic center. Exposed pink cantera stone walls combined with minimalist Scandinavian furniture. Several digital nomads at their laptops: a Latina woman with headphones, an American man in his 30s, a European couple collaborating. Large industrial windows showing colonial street outside. Plants, brass fixtures, good natural light. Open laptop showing spreadsheet. Coffee cups, notebooks. Travel lifestyle editorial photography, shallow depth of field, natural colors.',
  },
  {
    name: 'tourist-huasteca',
    prompt: 'Photorealistic aerial drone view of Cascada de Tamul waterfall in the Huasteca Potosina region, San Luis Potosí. Massive 105-meter turquoise waterfall plunging into a narrow canyon surrounded by lush green tropical jungle. Small traditional wooden boat with 6 tourists in orange life vests floating on the vivid blue-green river below the falls. Misty spray rising, sunbeams through canopy. National Geographic adventure travel style, cinematic and awe-inspiring. 16:9 aspect ratio, 4K.',
  },
  {
    name: 'neighborhoods',
    prompt: 'Photorealistic split-panel comparison of three San Luis Potosí neighborhoods, 16:9 aspect ratio. LEFT THIRD: Centro Histórico — colonial pink cantera stone pedestrian street with colorful colonial buildings, wrought-iron lamps, cobblestones, small cafés. CENTER THIRD: Lomas — tree-lined wide avenue with modern gated community, palm trees, contemporary Mexican architecture, well-dressed woman walking a dog. RIGHT THIRD: Tangamanga — residential street adjacent to massive green park with 400,000 trees visible in background, family cycling, fitness runners. Clean vertical dividers between panels. Editorial travel photography style.',
  },
];

async function generate(cfg) {
  console.log(`Generating: ${cfg.name}...`);
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: cfg.prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } }) }
  );
  const data = await r.json();
  if (data.error) { console.error('  Error:', data.error.message); return null; }
  const parts = data.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    if (p.inlineData) {
      const buf = Buffer.from(p.inlineData.data, 'base64');
      const fn = `${SLUG}-${cfg.name}.png`;
      const lp = path.join('public', 'images', 'blog', fn);
      fs.mkdirSync(path.dirname(lp), { recursive: true });
      fs.writeFileSync(lp, buf);
      console.log(`  Saved: ${lp} (${buf.length}b)`);
      return { buffer: buf, filename: fn };
    }
  }
  return null;
}

async function upload(r) {
  const sp = `posts/${r.filename}`;
  const { error } = await supabase.storage.from('blog-images').upload(sp, r.buffer, { contentType: 'image/png', upsert: true });
  if (error) { console.error('  Upload error:', error.message); return null; }
  const { data } = supabase.storage.from('blog-images').getPublicUrl(sp);
  console.log(`  URL: ${data.publicUrl}`);
  return data.publicUrl;
}

(async () => {
  const urls = {};
  for (const img of images) {
    const r = await generate(img);
    if (!r) { console.error(`Failed ${img.name}, aborting`); process.exit(1); }
    const url = await upload(r);
    if (!url) { console.error(`Failed upload ${img.name}, aborting`); process.exit(1); }
    urls[img.name] = url;
  }
  fs.writeFileSync('scripts/ultimate-guide-2026-image-urls.json', JSON.stringify(urls, null, 2));
  console.log('\nImage URLs saved.');
  console.log(JSON.stringify(urls, null, 2));
})().catch(e => { console.error('Fatal:', e); process.exit(1); });
