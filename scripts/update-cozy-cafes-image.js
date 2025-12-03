const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'blog-post-images';
const HEADER_IMAGE_PATH = path.join(__dirname, '../public/images/blog/cozy-cafes-slp-header.jpg');

async function uploadHeaderAndUpdatePost() {
  console.log('1. Uploading header image to Supabase Storage...');

  const fileBuffer = fs.readFileSync(HEADER_IMAGE_PATH);
  const fileName = 'cozy-cafes-slp-header.jpg';

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return;
  }

  const headerImageUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
  console.log('   ✅ Header uploaded:', headerImageUrl);

  console.log('\n2. Finding blog post "cozy-cafes-san-luis-potosi"...');

  const { data: post, error: findError } = await supabase
    .from('blog_posts')
    .select('id, slug, title, image_url')
    .eq('slug', 'cozy-cafes-san-luis-potosi')
    .single();

  if (findError) {
    console.error('Find error:', findError);
    return;
  }

  console.log('   Found post:', post.title);
  console.log('   Current image_url:', post.image_url);

  console.log('\n3. Updating image_url in database...');

  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({ image_url: headerImageUrl })
    .eq('slug', 'cozy-cafes-san-luis-potosi');

  if (updateError) {
    console.error('Update error:', updateError);
    return;
  }

  console.log('   ✅ Blog post updated with new image URL!');
  console.log('\n--- DONE ---');
  console.log('New image URL:', headerImageUrl);
}

uploadHeaderAndUpdatePost();
