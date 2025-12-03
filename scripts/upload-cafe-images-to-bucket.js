const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'blog-post-images';
const IMAGES_DIR = path.join(__dirname, '../public/images/blog/cafes');

const images = [
  { file: 'capital-coffee.jpg', name: 'cafes/capital-coffee.jpg' },
  { file: 'cafe-sideral.jpg', name: 'cafes/cafe-sideral.jpg' },
  { file: '500-noches.jpg', name: 'cafes/500-noches.jpg' },
  { file: 'las-castanas.jpg', name: 'cafes/las-castanas.jpg' },
  { file: 'halva-cafe.png', name: 'cafes/halva-cafe.png' },
  { file: 'hot-chocolate-slp.jpg', name: 'cafes/hot-chocolate-slp.jpg' },
];

async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('Error listing buckets:', error);
    return [];
  }
  console.log('Available buckets:', data.map(b => b.name));
  return data;
}

async function uploadImages() {
  console.log('Checking available buckets...');
  const buckets = await listBuckets();

  const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
  if (!bucketExists) {
    console.log(`Bucket "${BUCKET_NAME}" not found. Creating it...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true
    });
    if (createError) {
      console.error('Error creating bucket:', createError);
      return;
    }
    console.log(`Bucket "${BUCKET_NAME}" created successfully!`);
  }

  console.log('\nUploading images to bucket...\n');

  const uploadedUrls = {};

  for (const img of images) {
    const filePath = path.join(IMAGES_DIR, img.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${img.file}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = img.file.endsWith('.png') ? 'image/png' : 'image/jpeg';

    console.log(`Uploading ${img.file}...`);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(img.name, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`  ❌ Error uploading ${img.file}:`, error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(img.name);

      uploadedUrls[img.file] = urlData.publicUrl;
      console.log(`  ✅ Uploaded: ${urlData.publicUrl}`);
    }
  }

  console.log('\n--- Upload Summary ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  return uploadedUrls;
}

uploadImages();
