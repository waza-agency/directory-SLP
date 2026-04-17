require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const MODEL = 'gemini-3-pro-image-preview';
const SLUG = 'san-luis-potosi-vs-san-miguel-allende-expats-2026';

const images = [
  {
    name: 'hero',
    prompt: 'Photorealistic wide-angle split-screen comparison, 16:9 cinematic. LEFT HALF: San Luis Potosi Mexico historic center, pink cantera stone colonial architecture, baroque Cathedral of San Luis Potosi twin towers, bustling Plaza de Armas with fountain, Mexican flag waving, golden hour warm light, locals walking. RIGHT HALF: San Miguel de Allende iconic pink neo-gothic Parroquia de San Miguel Arcangel with spires towering over cobblestone Plaza Principal, bougainvillea vines, colonial buildings in ochre and terracotta, warm golden sunset. Clean centered vertical divider line with white thin "VS" text in elegant serif font. Travel magazine cover quality, National Geographic style, hyper-detailed, 4K.',
  },
  {
    name: 'slp-lifestyle',
    prompt: 'Photorealistic editorial photograph of daily life in San Luis Potosi Mexico. A modern young professional expat couple walking through the Centro Historico, pink cantera stone buildings, Templo del Carmen visible in background with pink-stone facade and baroque details. Cobblestone streets, warm afternoon light, authentic Mexican city vibe, not touristy. Locals in background, street vendors. Shot on full frame camera, 35mm lens, travel lifestyle photography, natural colors.',
  },
  {
    name: 'sma-lifestyle',
    prompt: 'Photorealistic editorial photograph of daily life in San Miguel de Allende Mexico. American and European expats sitting at an upscale rooftop cafe with view of the pink Parroquia church spires in the background, colorful colonial buildings, bougainvillea flowers. Tourists with cameras in background, cobblestone streets, boutique shops. Bright midday sun, vibrant colors, gentrified charming atmosphere. Shot on full frame camera, 35mm lens, travel lifestyle magazine style.',
  },
  {
    name: 'cost-comparison',
    prompt: 'Minimalist infographic-style flat illustration on clean white background. Two columns comparing Mexican city cost of living. LEFT COLUMN: blue accent color, "San Luis Potosi" title, simple line icon of pink stone colonial building, dollar sign with "$" symbol (showing affordable), text showing monthly costs. RIGHT COLUMN: pink accent color, "San Miguel de Allende" title, simple line icon of gothic church spire, three dollar signs "$$$" symbol (showing expensive). Clean geometric design, modern flat illustration style, lots of whitespace, professional infographic, no text except titles and currency symbols, Bajio region map silhouette at bottom.',
  },
  {
    name: 'food-culture',
    prompt: 'Photorealistic overhead flat lay food photography comparison split in two. LEFT SIDE on rustic wooden table: authentic San Luis Potosi cuisine - enchiladas potosinas with red salsa and fresh cheese, gorditas stuffed with beans, tacos de cecina, tamales, horchata in clay cup, traditional Mexican dishes with vibrant colors. RIGHT SIDE on elegant marble table: San Miguel de Allende upscale international cuisine - artisan avocado toast, craft cocktail, gourmet salad with edible flowers, specialty coffee latte art, modern fusion presentation. Thin dividing line. Overhead shot, natural window light, food magazine styling, vivid colors.',
  },
];

async function generateImage(imageCfg) {
  console.log(`Generating image: ${imageCfg.name}...`);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: imageCfg.prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    }
  );

  const data = await response.json();
  if (data.error) {
    console.error(`  Error generating ${imageCfg.name}:`, data.error.message);
    return null;
  }

  const parts = data.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    if (p.inlineData) {
      const buf = Buffer.from(p.inlineData.data, 'base64');
      const filename = `${SLUG}-${imageCfg.name}.png`;
      const localPath = path.join('public', 'images', 'blog', filename);
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      fs.writeFileSync(localPath, buf);
      console.log(`  Saved locally: ${localPath} (${buf.length} bytes)`);
      return { buffer: buf, filename, localPath };
    }
  }
  return null;
}

async function uploadToSupabase(result) {
  const storagePath = `posts/${result.filename}`;
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(storagePath, result.buffer, {
      contentType: 'image/png',
      upsert: true,
    });
  if (error) {
    console.error(`  Upload error:`, error.message);
    return null;
  }
  const { data } = supabase.storage.from('blog-images').getPublicUrl(storagePath);
  console.log(`  Uploaded: ${data.publicUrl}`);
  return data.publicUrl;
}

async function main() {
  console.log('=== Generating San Luis Way Comparison Blog Post ===\n');

  const imageUrls = {};
  for (const img of images) {
    const result = await generateImage(img);
    if (!result) {
      console.error(`Failed to generate ${img.name}, aborting`);
      process.exit(1);
    }
    const url = await uploadToSupabase(result);
    if (!url) {
      console.error(`Failed to upload ${img.name}, aborting`);
      process.exit(1);
    }
    imageUrls[img.name] = url;
  }

  console.log('\n=== Image URLs ===');
  console.log(JSON.stringify(imageUrls, null, 2));

  fs.writeFileSync(
    path.join('scripts', 'slp-vs-sma-image-urls.json'),
    JSON.stringify(imageUrls, null, 2)
  );
  console.log('\nSaved URLs to scripts/slp-vs-sma-image-urls.json');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
