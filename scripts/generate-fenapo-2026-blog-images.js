require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const MODEL = 'gemini-3-pro-image-preview';
const SLUG = 'fenapo-2026-cartel-guia-completa';

const images = [
  {
    name: 'hero',
    prompt: 'Photorealistic cinematic 16:9 wide shot of a massive outdoor Mexican festival crowd at Teatro del Pueblo FENAPO San Luis Potosí at night. Tens of thousands of people with arms raised, colorful stage lighting in purple magenta and gold, fog machines, large LED screens. Energy of a sold-out Mexican regional concert. Confetti in the air, mariachi band elements subtly integrated. Festival atmosphere, warm cinematic color grading, film still aesthetic. No visible text, no watermarks. 4K high detail.',
  },
  {
    name: 'palenque',
    prompt: 'Photorealistic interior shot of a Mexican palenque (cockfighting arena converted to concert venue) during a regional Mexican music concert. Round wooden arena with circular bleachers packed with people wearing cowboy hats and boots, stage in the center with a norteño band (accordion, bajo sexto, bass, drums) playing. Warm amber stage lighting, haze in the air. Intimate packed venue atmosphere of 5,000 people. Traditional Mexican regional concert energy. Editorial photo journalism style, cinematic.',
  },
  {
    name: 'fairgrounds',
    prompt: 'Photorealistic aerial drone view at dusk of the Recinto Ferial FENAPO San Luis Potosí fairgrounds. Ferris wheel and mechanical rides with colorful neon lights, long row of food stalls with string lights, massive concert venue rooftop visible, parked cars everywhere, crowds walking between attractions. Mexican state fair atmosphere. Purple-blue twilight sky. Bird\'s eye view, cinematic, travel magazine quality. 16:9 aspect ratio.',
  },
];

async function generate(cfg) {
  console.log(`Generating: ${cfg.name}...`);
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GOOGLE_API_KEY}`,
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
  fs.writeFileSync('scripts/fenapo-2026-blog-image-urls.json', JSON.stringify(urls, null, 2));
  console.log('\nDone. URLs saved.');
})().catch(e => { console.error('Fatal:', e); process.exit(1); });
