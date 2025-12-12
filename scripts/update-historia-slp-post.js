require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

// New hero image - Baroque church facade in San Luis Potosí
const NEW_IMAGE_URL = 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=1600&h=900&fit=crop&q=80';

function removeEmbeddedTOC(content) {
  // Remove the embedded TOC section (from <!-- TABLE OF CONTENTS --> to closing </div>)
  const tocPattern = /<!-- TABLE OF CONTENTS -->[\s\S]*?<\/nav>\s*<p class="mt-4 text-sm text-gray-600 italic">.*?<\/p>\s*<\/div>/g;
  return content.replace(tocPattern, '');
}

async function updatePost() {
  console.log('Fetching current post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', SLUG)
    .single();

  if (fetchError || !post) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  console.log('Current image URL:', post.image_url);
  console.log('Removing embedded TOC from content...');

  const updatedContent = removeEmbeddedTOC(post.content);
  const updatedContentEn = removeEmbeddedTOC(post.content_en);

  console.log('Updating post with new image and cleaned content...');

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      image_url: NEW_IMAGE_URL,
      content: updatedContent,
      content_en: updatedContentEn
    })
    .eq('slug', SLUG)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    process.exit(1);
  }

  console.log('\nPost updated successfully!');
  console.log('New image URL:', data.image_url);
  console.log('Post URL: /blog/' + data.slug);
  return data;
}

updatePost()
  .then(() => {
    console.log('\nChanges applied:');
    console.log('1. Removed embedded TOC from content (both ES and EN)');
    console.log('2. Updated hero image to baroque church facade');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed to update post:', err.message);
    process.exit(1);
  });
