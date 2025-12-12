require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const IMAGE_PATH = path.join(__dirname, '../public/images/blog/herencia cultural slp/Mineria-SLP-Mining-Mexico-2.jpeg');
const BUCKET_NAME = 'blog-images';
const FILE_NAME = 'catedral-slp-barroco.jpeg';
const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

async function uploadAndUpdate() {
  console.log('Reading image file...');
  const fileBuffer = fs.readFileSync(IMAGE_PATH);

  console.log('Checking if bucket exists...');
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log('Creating bucket:', BUCKET_NAME);
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true
    });
    if (bucketError) {
      console.error('Error creating bucket:', bucketError);
      process.exit(1);
    }
  }

  console.log('Uploading image to Supabase Storage...');
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(FILE_NAME, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    process.exit(1);
  }

  console.log('Upload successful:', uploadData.path);

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(FILE_NAME);

  const publicUrl = urlData.publicUrl;
  console.log('Public URL:', publicUrl);

  console.log('Fetching current post content...');
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', SLUG)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  // Replace the image in the baroque architecture section
  const oldImagePattern = /https:\/\/images\.unsplash\.com\/photo-1590001155093-a3c66ab0c3ff\?w=1200&h=675&fit=crop&q=80/g;

  const updatedContent = post.content.replace(oldImagePattern, publicUrl);
  const updatedContentEn = post.content_en.replace(oldImagePattern, publicUrl);

  console.log('Updating post with new image URL...');
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn
    })
    .eq('slug', SLUG);

  if (updateError) {
    console.error('Error updating post:', updateError);
    process.exit(1);
  }

  console.log('\nImage uploaded and post updated successfully!');
  console.log('New image URL:', publicUrl);
}

uploadAndUpdate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
