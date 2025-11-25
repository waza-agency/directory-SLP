const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Variables de entorno de Supabase no están configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAllBlogImages() {
  console.log('Verificando todas las imágenes de blog posts...\n');

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, image_url, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al consultar la base de datos:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('No se encontraron posts');
    return;
  }

  console.log(`Total de posts: ${data.length}\n`);
  console.log('═'.repeat(100));

  let postsWithImages = 0;
  let postsWithoutImages = 0;

  data.forEach((post, index) => {
    console.log(`\n${index + 1}. ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Status: ${post.status}`);
    console.log(`   Created: ${new Date(post.created_at).toLocaleDateString()}`);

    if (post.image_url) {
      console.log(`   ✅ Image URL: ${post.image_url}`);
      postsWithImages++;
    } else {
      console.log(`   ❌ NO IMAGE`);
      postsWithoutImages++;
    }
  });

  console.log('\n' + '═'.repeat(100));
  console.log(`\nResumen:`);
  console.log(`  Total posts: ${data.length}`);
  console.log(`  ✅ Con imagen: ${postsWithImages}`);
  console.log(`  ❌ Sin imagen: ${postsWithoutImages}`);
  console.log('');
}

checkAllBlogImages().catch(console.error);
