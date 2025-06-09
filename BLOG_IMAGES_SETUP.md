# Blog Images Storage Setup

This guide explains how to set up and use Supabase Storage for blog images instead of external URLs.

## 🎯 Benefits

- ✅ **Better Performance**: Images served from the same CDN
- ✅ **Reliability**: No dependency on external services
- ✅ **Control**: Manage, optimize, and resize images
- ✅ **Security**: Control access policies
- ✅ **Cost Effective**: No external hosting costs

## 📋 Setup Instructions

### 1. Create the Storage Bucket

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/omxporaecrqsqhzjzvnx/sql)
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `create_blog_images_bucket.sql`
4. Click **RUN** to execute the SQL

This will create:
- A public `blog-images` bucket
- Appropriate RLS policies for public read access
- Upload permissions for authenticated users

### 2. Verify the Bucket

1. Go to **Storage** in your Supabase Dashboard
2. You should see a new `blog-images` bucket
3. The bucket should be marked as **Public**

## 🚀 Usage

### Upload Images via Python Script

```bash
# Set your Supabase service role key
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"

# Upload an image
python3 scripts/upload_blog_images.py path/to/image.jpg

# Upload with custom name
python3 scripts/upload_blog_images.py path/to/image.jpg "custom-name.jpg"
```

### Upload Images in Next.js App

```typescript
import { uploadBlogImage } from '@/utils/uploadBlogImage';

// In your component
const handleImageUpload = async (file: File) => {
  const result = await uploadBlogImage(file, 'my-blog-image.jpg');

  if (result.success) {
    console.log('Image uploaded:', result.url);
    // Use result.url in your blog post
  } else {
    console.error('Upload failed:', result.error);
  }
};
```

### Get Image URLs

All uploaded images will be accessible at:
```
https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/filename.jpg
```

## 📝 Best Practices

### Image Naming Convention

Use descriptive, SEO-friendly names:
- ✅ `checklist-mudanza-san-luis-potosi.jpg`
- ✅ `rental-guide-slp-apartments.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `image.png`

### Image Optimization

Before uploading:
1. **Resize** images to appropriate dimensions (max 1920px width)
2. **Compress** images to reduce file size
3. **Use WebP format** when possible for better compression
4. **Alt text** - Always include descriptive alt text in your HTML

### File Size Limits

- Current limit: **10MB per file**
- Recommended: **< 500KB for blog images**
- For larger images, consider using external optimization services

## 🔄 Migration from External URLs

To migrate existing blog posts from external image URLs:

1. Download the external images
2. Upload them to the bucket using the Python script
3. Update the blog post content with new URLs
4. Test that all images load correctly

## 🛠️ Troubleshooting

### Upload Fails
- Check that the bucket exists and is public
- Verify your service role key is correct
- Ensure file size is under 10MB
- Check file format is supported (jpeg, png, webp, gif, svg)

### Images Don't Load
- Verify the bucket is public
- Check the image URL format is correct
- Ensure RLS policies are properly configured

### Permission Denied
- Check that you're using the service role key for uploads
- Verify the upload policies are correctly set

## 📊 Monitoring

Monitor storage usage in your Supabase Dashboard:
- **Storage** tab shows current usage
- **Logs** tab shows upload/access logs
- **Settings** > **Database** for storage quotas

## 💰 Costs

Supabase Storage pricing (as of 2024):
- **Free tier**: 1GB storage + 2GB bandwidth
- **Pro**: $0.021/GB storage + $0.09/GB bandwidth
- **Bandwidth**: Only charged for downloads, not uploads

For a blog with ~100 images (50MB total), monthly costs would be minimal (~$0.01-0.05).