const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadAndUpdateImage() {
  try {
    console.log('Reading image file...');
    const imagePath = '/Users/santiagogonzalez/Downloads/Gemini_Generated_Image_6roxej6roxej6rox.png';
    const imageBuffer = fs.readFileSync(imagePath);

    // Generate filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-cost-of-living-san-luis-potosi.png`;

    console.log('Uploading image to Supabase storage...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Upload error:', uploadError.message);
      throw uploadError;
    }

    console.log('✅ Image uploaded successfully!');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;
    console.log(`📷 Image URL: ${imageUrl}`);

    // Update blog post
    console.log('\nUpdating blog post with new image...');
    const { data: updateData, error: updateError } = await supabase
      .from('blog_posts')
      .update({
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'cost-of-living-san-luis-potosi-2025')
      .select();

    if (updateError) {
      console.error('❌ Update error:', updateError.message);
      throw updateError;
    }

    console.log('✅ Blog post updated successfully!');
    console.log('\nUpdated post:');
    console.log('─'.repeat(60));
    console.log(`Title: ${updateData[0].title}`);
    console.log(`Image URL: ${updateData[0].image_url}`);
    console.log('─'.repeat(60));
    console.log('\n🔗 View post at: http://localhost:3000/blog/cost-of-living-san-luis-potosi-2025');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

uploadAndUpdateImage();
