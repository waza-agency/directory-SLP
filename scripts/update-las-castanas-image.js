const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'blog-post-images';
const IMAGE_PATH = path.join(__dirname, '../public/images/blog/cafes/las-castanas-new.jpg');

async function uploadAndUpdate() {
  console.log('1. Uploading new Las Castañas image to bucket...');

  const fileBuffer = fs.readFileSync(IMAGE_PATH);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload('cafes/las-castanas.jpg', fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return;
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl('cafes/las-castanas.jpg');

  console.log('   ✅ Uploaded:', urlData.publicUrl);

  console.log('\n2. Blog post already uses the correct URL, image replaced in bucket.');
  console.log('\n✅ Done! Las Castañas image updated.');
}

uploadAndUpdate();
