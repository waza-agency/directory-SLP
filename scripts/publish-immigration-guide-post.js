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
const contentPath = path.join(__dirname, '..', 'blog-posts', 'navigating-mexican-immigration-system-slp.html');
const htmlContent = fs.readFileSync(contentPath, 'utf8');

const postData = {
  title: "El Desafío de la Burocracia: Cómo Navegar el Sistema Migratorio Mexicano desde SLP",
  title_en: "The Bureaucracy Challenge: How to Navigate Mexico's Immigration System from SLP",
  slug: "navigating-mexican-immigration-system-slp",
  excerpt: "Una guía completa para entender y navegar exitosamente el sistema migratorio de México desde San Luis Potosí. Desde visas de turista hasta residencia permanente, aprende los procesos, requisitos y consejos para hacer tu trámite migratorio más sencillo.",
  excerpt_en: "A comprehensive guide to understanding and successfully navigating Mexico's immigration system from San Luis Potosí. From tourist visas to permanent residency, learn the processes, requirements, and insider tips to make your immigration journey smoother.",
  category: "Expat Life",
  tags: [
    "immigration",
    "visa",
    "residency",
    "INM",
    "bureaucracy",
    "legal",
    "expat guide",
    "documentation",
    "temporary resident",
    "permanent resident",
    "San Luis Potosí",
    "Mexico"
  ],
  image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=900&fit=crop&q=80",
  content: htmlContent,
  content_en: htmlContent,
  status: "published",
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  meta_title: "Guide to Mexico Immigration from SLP | Visa & Residency 2024",
  meta_description: "Complete guide to navigating Mexico's immigration system from San Luis Potosí. Step-by-step visa process, INM office info, costs, timeline & insider tips for expats."
};

/**
 * Publish or update the immigration guide blog post identified by postData.slug.
 *
 * If a post with the slug exists, it will be updated; otherwise a new post will be inserted.
 * On error the process logs the error and exits with code 1.
 * @returns {Object} The created or updated blog post record.
 */
async function publishPost() {
  console.log('Publishing immigration guide post...');
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