const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateHalvaImage() {
  console.log('Fetching current blog post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', 'top-5-cozy-cafes-winter-san-luis-potosi')
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    return;
  }

  // Replace .jpg with .png for halva-cafe image
  const updatedContent = post.content.replace(
    '/images/blog/cafes/halva-cafe.jpg',
    '/images/blog/cafes/halva-cafe.png'
  );

  const updatedContentEn = post.content_en.replace(
    '/images/blog/cafes/halva-cafe.jpg',
    '/images/blog/cafes/halva-cafe.png'
  );

  console.log('Updating blog post with new image path...');

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

  console.log('Blog post updated successfully!');
  console.log('Halva Café image changed from .jpg to .png');
}

updateHalvaImage();
