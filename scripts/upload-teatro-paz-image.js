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

const IMAGE_PATH = path.join(__dirname, '../public/images/blog/herencia cultural slp/48-1-1024x685.jpg');
const BUCKET_NAME = 'blog-images';
const FILE_NAME = 'teatro-paz-plaza-carmen-slp.jpg';
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

  // Old image URL - the panoramic view in the mining history section
  const oldImageUrl = 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80';

  // Update alt text
  const oldAltEs = 'alt="Vista panorámica de San Luis Potosí al atardecer"';
  const newAltEs = 'alt="Teatro de la Paz y Plaza del Carmen, San Luis Potosí"';

  const oldAltEn = 'alt="Panoramic view of San Luis Potosí at sunset"';
  const newAltEn = 'alt="Teatro de la Paz and Plaza del Carmen, San Luis Potosí"';

  // Update caption
  const oldCaptionEs = 'Vista de la ciudad de San Luis Potosí, cuyo origen está ligado a la riqueza mineral de la región';
  const newCaptionEs = 'Teatro de la Paz y Plaza del Carmen, corazón cultural de San Luis Potosí';

  const oldCaptionEn = 'View of the city of San Luis Potosí, whose origin is linked to the region\'s mineral wealth';
  const newCaptionEn = 'Teatro de la Paz and Plaza del Carmen, cultural heart of San Luis Potosí';

  let updatedContent = post.content
    .replace(oldImageUrl, publicUrl)
    .replace(oldAltEs, newAltEs)
    .replace(oldCaptionEs, newCaptionEs);

  let updatedContentEn = post.content_en
    .replace(oldImageUrl, publicUrl)
    .replace(oldAltEn, newAltEn)
    .replace(oldCaptionEn, newCaptionEn);

  console.log('Updating post...');
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
  console.log('Section: Historia Minera - Vista de la ciudad');
}

uploadAndUpdate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
