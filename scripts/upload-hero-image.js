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

const IMAGE_PATH = path.join(__dirname, '../public/images/blog/herencia cultural slp/4232726390_36fbc653b5.jpg');
const BUCKET_NAME = 'blog-images';
const FILE_NAME = 'hero-historia-slp.jpg';
const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

async function uploadAndUpdate() {
  console.log('Reading image file...');
  const fileBuffer = fs.readFileSync(IMAGE_PATH);

  console.log('Uploading hero image to Supabase Storage...');
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

  console.log('Updating post image_url field...');
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      image_url: publicUrl
    })
    .eq('slug', SLUG);

  if (updateError) {
    console.error('Error updating post:', updateError);
    process.exit(1);
  }

  console.log('\nHero image uploaded and post updated successfully!');
  console.log('New hero image URL:', publicUrl);
}

uploadAndUpdate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
