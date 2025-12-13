const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const POST_ID = 'd2ea0f05-5324-4ced-ad37-19b322be66e1';
const IMAGE_BASE_PATH = '/images/blog/leonora carrington';

// Image mappings based on content context
const imageReplacements = [
  {
    // Section 1: Who was Leonora - surrealism art
    oldSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=675&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/leonora_surrealism.webp`,
    newAlt: 'Leonora Carrington y el arte surrealista',
    newCaption: 'El estilo único de Leonora Carrington fusionó mitología celta, alquimia y surrealismo'
  },
  {
    // Section 2: Connection with SLP - dramatic landscapes
    oldSrc: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/San Luis Potosí's dramatic landscapes and rich history attracted many Surrealist artists.webp`,
    newAlt: 'Los dramáticos paisajes de San Luis Potosí que atrajeron a artistas surrealistas',
    newCaption: 'Los paisajes místicos de San Luis Potosí inspiraron a numerosos artistas surrealistas'
  },
  {
    // Section 3: Museo Leonora Carrington
    oldSrc: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&h=675&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/museo-Leonora-Carrinton.webp`,
    newAlt: 'Museo Leonora Carrington en San Luis Potosí',
    newCaption: 'El Museo Leonora Carrington, el primer museo del mundo dedicado a la artista surrealista'
  },
  {
    // Section 4: Centro de las Artes
    oldSrc: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&h=675&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/centro de las artes.jpeg`,
    newAlt: 'Centro de las Artes de San Luis Potosí',
    newCaption: 'El Centro de las Artes, antigua penitenciaría transformada en espacio cultural'
  },
  {
    // Section 5: Xilitla main image
    oldSrc: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=675&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/Xilitla-de-los-mejores-destinos-en-Mexico.jpg`,
    newAlt: 'Xilitla, uno de los mejores destinos en México',
    newCaption: 'Xilitla, en la Huasteca Potosina, hogar del jardín surrealista Las Pozas'
  },
  {
    // Section 5: Las Pozas pools
    oldSrc: 'https://images.unsplash.com/photo-1552537376-3abf35237215?w=700&h=500&fit=crop&q=80',
    newSrc: `${IMAGE_BASE_PATH}/las pozas pools-xilitla.webp`,
    newAlt: 'Las pozas naturales en Xilitla',
    newCaption: 'Las pozas naturales de Xilitla, parte del jardín surrealista de Edward James'
  }
];

async function updateBlogPost() {
  console.log('Fetching blog post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, image_url')
    .eq('id', POST_ID)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    return;
  }

  let updatedContent = post.content;

  // Replace each image
  for (const replacement of imageReplacements) {
    const oldPattern = new RegExp(
      `<img[^>]*src="${replacement.oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
      'g'
    );

    const newImg = `<img
        src="${replacement.newSrc}"
        alt="${replacement.newAlt}"
        class="w-full h-auto"
        loading="lazy"
      />`;

    if (updatedContent.includes(replacement.oldSrc)) {
      updatedContent = updatedContent.replace(oldPattern, newImg);

      // Also update the figcaption if it exists
      const captionPattern = new RegExp(
        `(<figcaption[^>]*>)[^<]*(</figcaption>)`,
        'g'
      );

      // We need to be more careful with captions - find the figure containing our new image
      console.log(`✓ Replaced: ${replacement.oldSrc.substring(0, 50)}...`);
    } else {
      console.log(`✗ Not found: ${replacement.oldSrc.substring(0, 50)}...`);
    }
  }

  // Update figcaptions more precisely
  const figureUpdates = [
    { imgPath: 'leonora_surrealism.webp', caption: 'El estilo único de Leonora Carrington fusionó mitología celta, alquimia y surrealismo' },
    { imgPath: 'dramatic landscapes', caption: 'Los paisajes místicos de San Luis Potosí inspiraron a numerosos artistas surrealistas' },
    { imgPath: 'museo-Leonora-Carrinton.webp', caption: 'El Museo Leonora Carrington, el primer museo del mundo dedicado a la artista surrealista' },
    { imgPath: 'centro de las artes.jpeg', caption: 'El Centro de las Artes, antigua penitenciaría transformada en espacio cultural' },
    { imgPath: 'Xilitla-de-los-mejores-destinos', caption: 'Xilitla, en la Huasteca Potosina, hogar del jardín surrealista Las Pozas' },
    { imgPath: 'las pozas pools', caption: 'Las pozas naturales de Xilitla, parte del jardín surrealista de Edward James' },
  ];

  // Simple caption replacement based on proximity (update figcaption after each image)
  for (const update of figureUpdates) {
    // Find the figure containing our image and update its caption
    const figurePattern = new RegExp(
      `(<figure[^>]*>[\\s\\S]*?${update.imgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?<figcaption[^>]*>)[^<]*(</figcaption>)`,
      'i'
    );

    if (figurePattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(figurePattern, `$1${update.caption}$2`);
      console.log(`✓ Updated caption for: ${update.imgPath.substring(0, 30)}...`);
    }
  }

  // Update the post
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      image_url: `${IMAGE_BASE_PATH}/leonora_principal.jpg`
    })
    .eq('id', POST_ID);

  if (updateError) {
    console.error('Error updating post:', updateError);
    return;
  }

  console.log('\n✅ Blog post updated successfully!');
  console.log(`Main image (image_url) set to: ${IMAGE_BASE_PATH}/leonora_principal.jpg`);

  // Save backup
  fs.writeFileSync('leonora-post-updated.html', updatedContent);
  console.log('Backup saved to leonora-post-updated.html');
}

updateBlogPost().catch(console.error);
