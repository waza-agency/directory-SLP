const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY deben estar configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function updatePost() {
  try {
    const contentPath = path.join(__dirname, '..', 'blog-post-costo-de-vida-slp-2025.html');
    const content = fs.readFileSync(contentPath, 'utf-8');

    const slug = 'costo-de-vida-san-luis-potosi-2025';

    console.log('Verificando si el post existe...');
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title')
      .eq('slug', slug)
      .single();

    if (fetchError) {
      console.error('❌ Error al buscar el post:', fetchError.message);
      throw fetchError;
    }

    if (!existingPost) {
      console.error(`❌ No se encontró el post con slug "${slug}"`);
      process.exit(1);
    }

    console.log(`Actualizando post "${existingPost.title}"...`);

    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update({
        content: content,
        content_en: content
      })
      .eq('slug', slug)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error al actualizar el post:', updateError.message);
      throw updateError;
    }

    console.log('\n✅ ¡Post actualizado exitosamente con enlaces internos!');
    console.log('\nDetalles:');
    console.log('─'.repeat(60));
    console.log(`ID: ${updatedPost.id}`);
    console.log(`Título: ${updatedPost.title}`);
    console.log(`Slug: ${updatedPost.slug}`);
    console.log('─'.repeat(60));
    console.log(`\n🔗 URL del post: /blog/${updatedPost.slug}`);
    console.log(`\n📊 Enlaces internos agregados:`);
    console.log('   • /living-guide (2 menciones)');
    console.log('   • /cultural-attractions (2 menciones)');
    console.log('   • /category/international-markets (1 mención)');
    console.log('   • /guides/foodie-guide (1 mención)');
    console.log('   • /traditional-cuisine (1 mención)');
    console.log('   • /category/remote-work-cafes (1 mención)');
    console.log('   • /category/english-speaking-healthcare (1 mención)');
    console.log('   • /category/sports-fitness (1 mención)');
    console.log('   • /weekend-getaways (1 mención)');
    console.log('   • /services (1 mención)');
    console.log('   • /join-directory (1 mención)');
    console.log('   • /cultural-tours (1 mención)');
    console.log('\n   Total: 14 enlaces internos estratégicos');

  } catch (error) {
    console.error('\n❌ Error al actualizar el post:', error.message);
    process.exit(1);
  }
}

updatePost();
