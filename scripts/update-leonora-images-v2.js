const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE' : 'ANON');

const supabase = createClient(supabaseUrl, supabaseKey);

const POST_ID = 'd2ea0f05-5324-4ced-ad37-19b322be66e1';
const IMAGE_BASE_PATH = '/images/blog/leonora carrington';

async function updateBlogPost() {
  console.log('\n1. Fetching blog post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', POST_ID)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    return;
  }

  console.log('Post found:', post.title);
  console.log('Current image_url:', post.image_url);
  console.log('Content length:', post.content?.length);

  let updatedContent = post.content;

  // Image replacements
  const replacements = [
    {
      old: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=675&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/leonora_surrealism.webp`,
      alt: 'Leonora Carrington y el arte surrealista',
      caption: 'El estilo único de Leonora Carrington fusionó mitología celta, alquimia y surrealismo'
    },
    {
      old: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/San Luis Potosí's dramatic landscapes and rich history attracted many Surrealist artists.webp`,
      alt: 'Los dramáticos paisajes de San Luis Potosí que atrajeron a artistas surrealistas',
      caption: 'Los paisajes místicos de San Luis Potosí inspiraron a numerosos artistas surrealistas'
    },
    {
      old: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&h=675&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/museo-Leonora-Carrinton.webp`,
      alt: 'Museo Leonora Carrington en San Luis Potosí',
      caption: 'El Museo Leonora Carrington, el primer museo del mundo dedicado a la artista surrealista'
    },
    {
      old: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&h=675&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/centro de las artes.jpeg`,
      alt: 'Centro de las Artes de San Luis Potosí',
      caption: 'El Centro de las Artes, antigua penitenciaría transformada en espacio cultural'
    },
    {
      old: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=675&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/Xilitla-de-los-mejores-destinos-en-Mexico.jpg`,
      alt: 'Xilitla, uno de los mejores destinos en México',
      caption: 'Xilitla, en la Huasteca Potosina, hogar del jardín surrealista Las Pozas'
    },
    {
      old: 'https://images.unsplash.com/photo-1552537376-3abf35237215?w=700&h=500&fit=crop&q=80',
      new: `${IMAGE_BASE_PATH}/las pozas pools-xilitla.webp`,
      alt: 'Las pozas naturales en Xilitla',
      caption: 'Las pozas naturales de Xilitla, parte del jardín surrealista de Edward James'
    }
  ];

  console.log('\n2. Replacing images...');

  for (const r of replacements) {
    if (updatedContent.includes(r.old)) {
      // Replace the src attribute
      updatedContent = updatedContent.replace(
        new RegExp(`src="${r.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
        `src="${r.new}"`
      );
      // Replace the alt attribute in the same img tag context
      updatedContent = updatedContent.replace(
        new RegExp(`(src="${r.new.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*alt=")[^"]*"`, 'g'),
        `$1${r.alt}"`
      );
      console.log(`  ✓ Replaced: ${r.old.substring(30, 60)}...`);
    } else {
      console.log(`  ✗ Not found: ${r.old.substring(30, 60)}...`);
    }
  }

  // Verify replacements
  const unsplashCount = (updatedContent.match(/unsplash/g) || []).length;
  console.log(`\n3. Remaining unsplash references: ${unsplashCount}`);

  if (unsplashCount > 0) {
    console.log('Some images were not replaced. Checking...');
    const matches = updatedContent.match(/https:\/\/images\.unsplash\.com[^"]+/g);
    if (matches) {
      matches.forEach(m => console.log('  Still present:', m));
    }
  }

  console.log('\n4. Updating database...');

  const { data: updateData, error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      image_url: `${IMAGE_BASE_PATH}/leonora_principal.jpg`,
      updated_at: new Date().toISOString()
    })
    .eq('id', POST_ID)
    .select();

  if (updateError) {
    console.error('Update error:', updateError);
    return;
  }

  console.log('Update response:', updateData ? 'Success' : 'No data returned');

  // Verify the update
  console.log('\n5. Verifying update...');
  const { data: verifyPost, error: verifyError } = await supabase
    .from('blog_posts')
    .select('image_url, content')
    .eq('id', POST_ID)
    .single();

  if (verifyError) {
    console.error('Verify error:', verifyError);
    return;
  }

  console.log('Verified image_url:', verifyPost.image_url);
  const newUnsplashCount = (verifyPost.content.match(/unsplash/g) || []).length;
  console.log('Verified unsplash references:', newUnsplashCount);

  if (newUnsplashCount === 0) {
    console.log('\n✅ All images successfully updated!');
  } else {
    console.log('\n⚠️ Some unsplash images remain');
  }

  // Save the updated content for inspection
  fs.writeFileSync('leonora-post-final.html', verifyPost.content);
  console.log('Final content saved to leonora-post-final.html');
}

updateBlogPost().catch(console.error);
