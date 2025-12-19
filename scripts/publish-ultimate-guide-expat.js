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
const contentPath = path.join(__dirname, '..', 'ultimate-guide-expat-slp.html');
const htmlContent = fs.readFileSync(contentPath, 'utf8');

const postData = {
  title: "The Ultimate Guide to Living in San Luis Potosí as an Expat (2025)",
  title_en: "The Ultimate Guide to Living in San Luis Potosí as an Expat (2025)",
  slug: "ultimate-guide-living-san-luis-potosi-expat",
  excerpt: "La guía definitiva para expatriados: todo sobre visas, costo de vida, colonias, sistema de salud, bancos, transporte y más. Información verificada de fuentes oficiales (INM, INEGI, Numbeo). Incluye presupuestos mensuales, comparativas de costos, y respuestas a más de 20 preguntas frecuentes.",
  excerpt_en: "The definitive expat guide: everything about visas, cost of living, neighborhoods, healthcare, banking, transportation and more. Verified information from official sources (INM, INEGI, Numbeo). Includes monthly budgets, cost comparisons, and answers to 20+ frequently asked questions.",
  category: "Ultimate Guides",
  tags: [
    "expat guide",
    "living abroad",
    "moving to Mexico",
    "cost of living",
    "visa Mexico",
    "temporary resident",
    "permanent resident",
    "healthcare Mexico",
    "IMSS",
    "neighborhoods SLP",
    "Lomas",
    "Centro Histórico",
    "banking Mexico",
    "transportation",
    "safety",
    "expat community",
    "digital nomad",
    "retirement Mexico",
    "San Luis Potosí"
  ],
  image_url: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600&h=900&fit=crop&q=80",
  content: htmlContent,
  content_en: htmlContent,
  status: "published",
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  meta_title: "Ultimate Guide to Living in San Luis Potosí as an Expat | 2025",
  meta_description: "Complete expat guide to SLP: visas, cost of living ($800-1,500/month), best neighborhoods, healthcare (IMSS & private), banking, safety. 25+ verified sources."
};

/**
 * Publish the prepared blog post to the Supabase "blog_posts" table by updating an existing record with the same slug or inserting a new one.
 *
 * On error the process will be terminated with exit code 1.
 * @returns {Object} The created or updated blog post record as returned by the database.
 */
async function publishPost() {
  console.log('Publishing Ultimate Guide: Living in San Luis Potosí as an Expat...');
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