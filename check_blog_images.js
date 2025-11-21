const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBlogImages() {
  const slugs = ['san-luis-rey-tranvia', 'corazon-de-xoconostle', 'la-gran-via'];

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, image_url')
    .in('slug', slugs);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Blog posts with images:');
  data.forEach(post => {
    console.log(`\nSlug: ${post.slug}`);
    console.log(`Title: ${post.title}`);
    console.log(`Image URL: ${post.image_url || 'MISSING'}`);
  });
}

checkBlogImages();
