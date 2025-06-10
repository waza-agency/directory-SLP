const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkStorageBuckets() {
  console.log('🗂️ Checking storage buckets...');

  try {
    // List all storage buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError);
      return;
    }

    console.log('📦 Available storage buckets:');
    buckets.forEach(bucket => {
      console.log(`  - ${bucket.name} (ID: ${bucket.id}, Public: ${bucket.public})`);
    });

    // Check if service-images bucket exists
    const serviceImagesBucket = buckets.find(b => b.name === 'service-images');

    if (!serviceImagesBucket) {
      console.log('\n❌ service-images bucket NOT found!');
      console.log('This is likely the cause of the error. Creating service-images bucket...');

      // Try to create the bucket
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('service-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (createError) {
        console.error('❌ Error creating service-images bucket:', createError);
        console.log(`
Manual bucket creation needed:
1. Go to your Supabase dashboard: Storage section
2. Create a new bucket named "service-images"
3. Make it public
4. Set allowed file types: image/jpeg, image/png, image/gif, image/webp
5. Set file size limit: 10MB
        `);
      } else {
        console.log('✅ Created service-images bucket successfully');
      }
    } else {
      console.log('✅ service-images bucket exists');

      // Test upload permissions
      console.log('\n🧪 Testing upload permissions...');

      const testFileName = `test-${Date.now()}.txt`;
      const testContent = 'test file';

      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(testFileName, testContent);

      if (uploadError) {
        console.error('❌ Upload test failed:', uploadError);
        console.log('This suggests permission issues with the bucket');
      } else {
        console.log('✅ Upload test successful');

        // Clean up test file
        await supabase.storage
          .from('service-images')
          .remove([testFileName]);
        console.log('🧹 Cleaned up test file');
      }
    }

    // Also check listing-images bucket (used by existing listings)
    const listingImagesBucket = buckets.find(b => b.name === 'listing-images');
    if (listingImagesBucket) {
      console.log('✅ listing-images bucket exists (used by existing listings)');
    } else {
      console.log('ℹ️ listing-images bucket not found (might be needed for other listings)');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkStorageBuckets().catch(console.error);