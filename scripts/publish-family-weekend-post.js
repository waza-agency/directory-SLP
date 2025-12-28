require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Read HTML content from file
const contentPath = path.join(__dirname, '..', 'family-weekend-itinerary-post.html');
const htmlContent = fs.readFileSync(contentPath, 'utf8');

const postData = {
  title: "Fin de Semana Familiar en San Luis Potosí: Guía Completa con Parques, Go-Karts, Boliche y Restaurantes para Niños",
  title_en: "The Perfect Family Weekend in San Luis Potosí: Parks, Go-Karts, Bowling & Kid-Friendly Restaurants",
  slug: "fin-de-semana-familiar-san-luis-potosi-parques-go-karts-ninos",
  excerpt: "Descubre el itinerario perfecto de 2 días para familias con niños en San Luis Potosí. Incluye Parque Tangamanga, GoKartMania, Museo Laberinto, Kidiverso, boliche en Alboa, Ciclovía dominical en Carranza, Rancho La Estación y los mejores restaurantes con áreas de juegos como La Parroquia y El Almacén del Bife.",
  excerpt_en: "Discover the perfect 2-day family itinerary in San Luis Potosí with kids. Features Tangamanga Park, GoKartMania, Museo Laberinto, Kidiverso, bowling at Alboa, Sunday Ciclovía on Carranza, Rancho La Estación, and the best restaurants with play areas like La Parroquia and El Almacén del Bife.",
  category: "Guías y Itinerarios",
  tags: [
    "familia",
    "niños",
    "fin de semana",
    "Parque Tangamanga",
    "GoKartMania",
    "Museo Laberinto",
    "Kidiverso",
    "boliche",
    "Alboa",
    "Ciclovía Carranza",
    "Rancho La Estación",
    "restaurantes niños",
    "La Parroquia",
    "El Almacén del Bife",
    "actividades familiares",
    "qué hacer con niños"
  ],
  image_url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600&h=900&fit=crop&q=80",
  content: htmlContent,
  content_en: htmlContent, // Same content for now (mostly English already)
  status: "published",
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  meta_title: "Fin de Semana Familiar en San Luis Potosí | Guía 2024 con Niños",
  meta_description: "Itinerario completo de 2 días para familias: Tangamanga, go-karts, museo interactivo, trampolines, boliche, Ciclovía y restaurantes con área de juegos en SLP."
};

/**
 * Publish or update the family weekend itinerary blog post in the Supabase `blog_posts` table.
 *
 * If a post with the same slug exists, updates that record; otherwise inserts a new record.
 * On failure the function logs the error and terminates the process with exit code 1.
 *
 * @returns {Object} The created or updated blog post record.
 */
async function publishPost() {
  console.log('Publishing family weekend itinerary post...');
  console.log('Slug:', postData.slug);

  try {
    // Check if post already exists
    const { data: existing, error: checkError } = await supabase
      .from('blog_posts')
      .select('id, slug')
      .eq('slug', postData.slug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existing) {
      console.log('Post already exists, updating...');
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString()
        })
        .eq('slug', postData.slug)
        .select()
        .single();

      if (error) throw error;
      console.log('Post updated successfully!');
      console.log('URL:', `/blog/${data.slug}`);
      return data;
    } else {
      console.log('Creating new post...');
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;
      console.log('Post published successfully!');
      console.log('URL:', `/blog/${data.slug}`);
      return data;
    }
  } catch (error) {
    console.error('Error publishing post:', error);
    process.exit(1);
  }
}

publishPost().then(() => {
  console.log('Done!');
  process.exit(0);
});