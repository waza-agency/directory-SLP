import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleBlogPosts = [
  {
    title: 'Bienvenido a San Luis Way',
    slug: 'bienvenido-san-luis-way',
    excerpt: 'Descubre lo mejor de San Luis Potosí con nuestra guía completa de negocios locales, eventos y experiencias.',
    content: `<div class="prose max-w-none">
      <p>Bienvenido a San Luis Way, tu guía definitiva para descubrir lo mejor de San Luis Potosí. Ya seas residente local o visitante, nuestra plataforma te conecta con increíbles negocios locales, eventos emocionantes y experiencias únicas que hacen especial a nuestra ciudad.</p>

      <h2>Qué encontrarás aquí</h2>
      <p>Desde restaurantes tradicionales que sirven auténtica cocina potosina hasta cafés modernos y startups innovadoras, mostramos el diverso panorama empresarial que hace de San Luis Potosí un lugar vibrante para vivir y visitar.</p>

      <h2>Nuestra misión</h2>
      <p>Queremos ser tu compañero confiable para explorar todo lo que San Luis Potosí tiene para ofrecer, desde su rica historia hasta sus propuestas más contemporáneas.</p>

      <p>¡Comienza tu aventura con nosotros!</p>
    </div>`,
    category: 'General',
    status: 'published',
    image_url: '/images/cultural/san-luis-potosi-cathedral.jpg'
  },
  {
    title: 'Explorando la Herencia Cultural de San Luis Potosí',
    slug: 'explorando-herencia-cultural',
    excerpt: 'Sumérgete en la rica herencia cultural de San Luis Potosí, desde arquitectura histórica hasta festivales tradicionales.',
    content: `<div class="prose max-w-none">
      <p>San Luis Potosí es una ciudad llena de historia y cultura. Desde la impresionante arquitectura colonial del centro histórico hasta los vibrantes festivales que celebran nuestras tradiciones, siempre hay algo que descubrir.</p>

      <h2>Arquitectura Colonial</h2>
      <p>El centro histórico de San Luis Potosí es un testimonio viviente de la época colonial. La Catedral Metropolitana, el Teatro de la Paz y la Plaza de Armas son solo algunos de los tesoros arquitectónicos que puedes explorar.</p>

      <h2>Festivales y Tradiciones</h2>
      <p>A lo largo del año, la ciudad se llena de color y música con festivales que celebran nuestras tradiciones. La Feria Nacional Potosina (FENAPO) es uno de los eventos más importantes del año.</p>

      <h2>Museos y Galerías</h2>
      <p>Descubre la historia local en el Museo Nacional de la Máscara, el Museo Federico Silva y muchos otros espacios culturales que guardan los tesoros de nuestra identidad.</p>
    </div>`,
    category: 'Cultura',
    status: 'published',
    image_url: '/images/cultural/cultural-default.jpg'
  },
  {
    title: 'Las Mejores Experiencias Gastronómicas Locales',
    slug: 'mejores-experiencias-gastronomicas',
    excerpt: 'Un viaje culinario por los sabores más auténticos de San Luis Potosí y sus joyas gastronómicas escondidas.',
    content: `<div class="prose max-w-none">
      <p>La escena culinaria de San Luis Potosí es una deliciosa mezcla de sabores tradicionales mexicanos y cocina moderna innovadora. Desde vendedores ambulantes que sirven los mejores tacos de la ciudad hasta restaurantes de alta cocina que reimaginan platos clásicos, nuestra escena gastronómica tiene algo para cada paladar.</p>

      <h2>Platillos Tradicionales</h2>
      <p>No puedes visitar San Luis Potosí sin probar las famosas enchiladas potosinas, el asado de boda y los dulces de leche quemada. Estos platillos representan la esencia de nuestra cocina local.</p>

      <h2>Mercados Locales</h2>
      <p>El Mercado Hidalgo y el Mercado República son lugares perfectos para probar comida auténtica y conocer a los productores locales. Aquí encontrarás desde frutas exóticas hasta especias tradicionales.</p>

      <h2>Restaurantes Recomendados</h2>
      <p>Desde cantinas históricas hasta restaurantes contemporáneos, San Luis Potosí ofrece opciones para todos los gustos y presupuestos. Descubre los lugares que los locales aman pero los turistas rara vez encuentran.</p>

      <h2>Bebidas Tradicionales</h2>
      <p>No olvides probar el pulque, el agua de jamaica y otras bebidas tradicionales que forman parte de nuestra identidad gastronómica.</p>
    </div>`,
    category: 'Gastronomía',
    status: 'published',
    image_url: '/images/food/enchiladas-potosinas.jpg'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if posts already exist
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select("*")
      .eq('status', 'published');

    if (checkError) {
      console.error('Error checking existing posts:', checkError);
      return res.status(500).json({ error: 'Error checking existing posts' });
    }

    const existingSlugs = existingPosts?.map(post => post.slug) || [];
    console.log('Existing slugs:', existingSlugs);

    // Filter out posts that already exist
    const postsToInsert = sampleBlogPosts.filter(post => !existingSlugs.includes(post.slug));

    if (postsToInsert.length === 0) {
      return res.status(200).json({
        message: 'All sample posts already exist',
        existingCount: existingSlugs.length,
        samplePosts: existingSlugs
      });
    }

    // Insert new posts
    const { data: insertedPosts, error: insertError } = await supabase
      .from('blog_posts')
      .insert(postsToInsert.map(post => ({
        ...post,
        published_at: new Date().toISOString()
      })))
      .select();

    if (insertError) {
      console.error('Error inserting posts:', insertError);
      return res.status(500).json({ error: 'Error inserting posts', details: insertError });
    }

    return res.status(200).json({
      message: 'Sample blog posts initialized successfully',
      insertedCount: insertedPosts?.length || 0,
      existingCount: existingSlugs.length,
      totalPosts: existingSlugs.length + (insertedPosts?.length || 0),
      insertedPosts: insertedPosts?.map(p => ({ id: p.id, title: p.title, slug: p.slug }))
    });
  } catch (error) {
    console.error('Error in init-blog-data:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}