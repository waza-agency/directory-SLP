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

const IMAGE_PATH = 'C:/Users/sango/Downloads/Templo_del_Carmen,_San_Luis_Potosí (1).jpg';
const BUCKET_NAME = 'blog-images';
const FILE_NAME = 'templo-del-carmen-slp.jpg';
const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

async function uploadAndUpdate() {
  console.log('Reading image file...');
  const fileBuffer = fs.readFileSync(IMAGE_PATH);

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

  // Old image URL in the Templo del Carmen section
  const oldImageUrl = 'https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?w=700&h=500&fit=crop&q=80';

  // Also update the alt text
  const oldAltEs = 'alt="Torre de templo barroco"';
  const newAltEs = 'alt="Templo del Carmen, San Luis Potosí"';

  const oldAltEn = 'alt="Baroque temple tower"';
  const newAltEn = 'alt="Temple of Carmen, San Luis Potosí"';

  let updatedContent = post.content
    .replace(oldImageUrl, publicUrl)
    .replace(oldAltEs, newAltEs);

  let updatedContentEn = post.content_en
    .replace(oldImageUrl, publicUrl)
    .replace(oldAltEn, newAltEn);

  console.log('Updating post with new Templo del Carmen image...');
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
  console.log('Section: Templo del Carmen');
}

uploadAndUpdate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
