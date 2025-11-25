const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY deben estar configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function publishPost() {
  try {
    const contentPath = path.join(__dirname, '..', 'blog-post-costo-de-vida-slp-2025.html');
    const content = fs.readFileSync(contentPath, 'utf-8');

    const postData = {
      title: 'Análisis 2025 del Costo de Vida Real en San Luis Potosí: ¿Cuánto necesitas para vivir cómodamente?',
      slug: 'costo-de-vida-san-luis-potosi-2025',
      excerpt: 'Descubre cuánto dinero necesitas realmente para vivir bien en San Luis Potosí en 2025. Análisis profundo con datos verificables sobre vivienda, alimentación, transporte, salud y más. Incluye 3 presupuestos mensuales completos y comparación con otras ciudades del Bajío.',
      content: content,
      category: 'Expat Guide',
      tags: ['costo de vida', 'expatriados', 'repatriados', 'presupuesto', 'mudanza', 'San Luis Potosí', 'vivienda', 'gastos mensuales'],
      image_url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&h=900&fit=crop&q=80',
      title_en: 'Real Cost of Living Analysis 2025 in San Luis Potosí: How Much Do You Need to Live Comfortably?',
      excerpt_en: 'Discover how much money you really need to live well in San Luis Potosí in 2025. In-depth analysis with verifiable data on housing, food, transportation, healthcare and more. Includes 3 complete monthly budgets and comparison with other cities in the Bajío region.',
      content_en: content,
      status: 'published',
      published_at: new Date().toISOString()
    };

    console.log('Verificando si el post ya existe...');
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('slug, title')
      .eq('slug', postData.slug)
      .single();

    if (existingPost) {
      console.log(`⚠️  El post con slug "${postData.slug}" ya existe.`);
      console.log(`Título existente: "${existingPost.title}"`);
      console.log('\nSi deseas actualizar el post, debes eliminarlo primero o usar un slug diferente.');
      return;
    }

    console.log('Insertando nuevo post en la base de datos...');
    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error al insertar el post:', insertError.message);
      throw insertError;
    }

    console.log('\n✅ ¡Post publicado exitosamente!');
    console.log('\nDetalles del post:');
    console.log('─'.repeat(60));
    console.log(`ID: ${insertedPost.id}`);
    console.log(`Título: ${insertedPost.title}`);
    console.log(`Slug: ${insertedPost.slug}`);
    console.log(`Categoría: ${insertedPost.category}`);
    console.log(`Tags: ${insertedPost.tags.join(', ')}`);
    console.log(`Publicado: ${new Date(insertedPost.published_at).toLocaleString('es-MX')}`);
    console.log('─'.repeat(60));
    console.log(`\n🔗 URL del post: /blog/${insertedPost.slug}`);
    console.log(`\nPuedes ver el post en: http://localhost:3000/blog/${insertedPost.slug}`);
    console.log('\nRecuerda ejecutar "npm run build" para regenerar las páginas estáticas.');

  } catch (error) {
    console.error('\n❌ Error al publicar el post:', error.message);
    process.exit(1);
  }
}

publishPost();
