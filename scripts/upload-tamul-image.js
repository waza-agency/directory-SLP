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

const IMAGE_PATH = path.join(__dirname, '../public/images/blog/herencia cultural slp/tamul-23-1-celular__2139x2670.jpg');
const BUCKET_NAME = 'blog-images';
const FILE_NAME = 'cascada-tamul-huasteca.jpg';
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

  // Old image URL to replace
  const oldImageUrl = 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=675&fit=crop&q=80';

  // New figcaption with credit and internal link (Spanish)
  const oldCaptionEs = '<figcaption class="mt-4 text-center text-sm text-gray-600 italic">\n      Las cascadas de la Huasteca Potosina son parte del patrimonio natural del estado\n    </figcaption>';
  const newCaptionEs = `<figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Cascada de Tamul, Huasteca Potosina. Foto: <a href="/places/corazon-de-xoconostle" class="text-blue-600 hover:underline">Corazón de Xoconostle Tours</a>
    </figcaption>`;

  // New figcaption with credit and internal link (English)
  const oldCaptionEn = '<figcaption class="mt-4 text-center text-sm text-gray-600 italic">\n      The waterfalls of the Huasteca Potosina are part of the state\'s natural heritage\n    </figcaption>';
  const newCaptionEn = `<figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Tamul Waterfall, Huasteca Potosina. Photo: <a href="/places/corazon-de-xoconostle" class="text-blue-600 hover:underline">Corazón de Xoconostle Tours</a>
    </figcaption>`;

  let updatedContent = post.content
    .replace(oldImageUrl, publicUrl)
    .replace(oldCaptionEs, newCaptionEs);

  let updatedContentEn = post.content_en
    .replace(oldImageUrl, publicUrl)
    .replace(oldCaptionEn, newCaptionEn);

  console.log('Updating post with new image and credit...');
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
  console.log('Credit: Corazón de Xoconostle Tours');
  console.log('Internal link: /places/corazon-de-xoconostle');
}

uploadAndUpdate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
