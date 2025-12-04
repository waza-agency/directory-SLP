const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_BASE = 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-post-images';

const imageReplacements = [
  { old: '/images/blog/cafes/capital-coffee.jpg', new: `${BUCKET_BASE}/cafes/capital-coffee.jpg` },
  { old: '/images/blog/cafes/cafe-sideral.jpg', new: `${BUCKET_BASE}/cafes/cafe-sideral.jpg` },
  { old: '/images/blog/cafes/500-noches.jpg', new: `${BUCKET_BASE}/cafes/500-noches.jpg` },
  { old: '/images/blog/cafes/las-castanas.jpg', new: `${BUCKET_BASE}/cafes/las-castanas.jpg` },
  { old: '/images/blog/cafes/halva-cafe.png', new: `${BUCKET_BASE}/cafes/halva-cafe.png` },
  { old: '/images/blog/cafes/halva-cafe.jpg', new: `${BUCKET_BASE}/cafes/halva-cafe.png` },
  { old: '/images/blog/cafes/hot-chocolate-slp.jpg', new: `${BUCKET_BASE}/cafes/hot-chocolate-slp.jpg` },
];

async function updateBlogPostUrls() {
  console.log('Fetching blog post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', 'top-5-cozy-cafes-winter-san-luis-potosi')
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    return;
  }

  let updatedContent = post.content;
  let updatedContentEn = post.content_en;

  console.log('\nReplacing image URLs...');
  for (const replacement of imageReplacements) {
    if (updatedContent.includes(replacement.old)) {
      updatedContent = updatedContent.replace(new RegExp(replacement.old, 'g'), replacement.new);
      console.log(`  ✅ Replaced: ${replacement.old}`);
    }
    if (updatedContentEn.includes(replacement.old)) {
      updatedContentEn = updatedContentEn.replace(new RegExp(replacement.old, 'g'), replacement.new);
    }
  }

  console.log('\nUpdating blog post in database...');

  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn
    })
    .eq('slug', 'top-5-cozy-cafes-winter-san-luis-potosi');

  if (updateError) {
    console.error('Error updating post:', updateError);
    return;
  }

  console.log('\n✅ Blog post updated with Supabase bucket URLs!');
}

updateBlogPostUrls();
