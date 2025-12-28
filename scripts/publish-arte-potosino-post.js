require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function publishPost() {
  // Load Spanish content
  const htmlPathEs = path.join(__dirname, '../blog-drafts/arte-potosino-deep-dive.html');
  const htmlContentEs = fs.readFileSync(htmlPathEs, 'utf8');
  const contentMatchEs = htmlContentEs.match(/<div class="prose[\s\S]*$/);
  const contentEs = contentMatchEs ? contentMatchEs[0] : htmlContentEs;

  // Load English content
  const htmlPathEn = path.join(__dirname, '../blog-drafts/arte-potosino-deep-dive-en.html');
  const htmlContentEn = fs.readFileSync(htmlPathEn, 'utf8');
  const contentMatchEn = htmlContentEn.match(/<div class="prose[\s\S]*$/);
  const contentEn = contentMatchEn ? contentMatchEn[0] : htmlContentEn;

  const postData = {
    title: 'Arte Potosino: Un Viaje de 3,000 Años de Creatividad',
    title_en: 'Potosino Art: A 3,000-Year Journey of Creativity',
    slug: 'potosino-art-history-artists-sculpture-painting-san-luis-potosi',
    excerpt: 'Desde las monumentales esculturas huastecas de Tamtoc hasta los rebozos de Santa María del Río y el arte wixárika de Wirikuta — el arte potosino es una historia de continuidad, resistencia y creatividad extraordinaria.',
    excerpt_en: 'From the monumental Huastec sculptures of Tamtoc to the rebozos of Santa María del Río and the Wixárika art of Wirikuta — Potosino art is a story of continuity, resistance, and extraordinary creativity.',
    category: 'Culture',
    tags: ['art', 'culture', 'potosino artists', 'huastec art', 'sculpture', 'painting', 'crafts', 'rebozo', 'teenek', 'wixarika', 'San Luis Potosi'],
    image_url: '/images/blog/potosino-art/hero.jpg',
    status: 'published',
    published_at: new Date().toISOString(),
    meta_title: 'Potosino Art: Complete History of Art in San Luis Potosí | Artists & Crafts',
    meta_description: 'Discover 3,000 years of Potosino art: from Huastec sculptures at Tamtoc to contemporary artists. Complete guide with history, artists and places to visit.',
    content: contentEs,
    content_en: contentEn
  };

  // Check if post exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', postData.slug)
    .single();

  let result;
  if (existing) {
    result = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('slug', postData.slug)
      .select();
    console.log('Post updated:', result.data?.[0]?.id || 'unknown');
  } else {
    result = await supabase
      .from('blog_posts')
      .insert(postData)
      .select();
    console.log('Post created:', result.data?.[0]?.id || 'unknown');
  }

  if (result.error) {
    console.error('Error:', result.error.message);
    process.exit(1);
  }

  console.log('Success! Post published:', postData.slug);
}

publishPost().catch(console.error);
