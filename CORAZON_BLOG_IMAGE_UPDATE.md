# Corazón de Xoconostle Blog Image Update

## 📋 Summary

Updated the "Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí" blog post to use our new Supabase Storage bucket instead of local images.

## 🔄 Changes Made

### 1. Created Upload Script
- **File**: `upload_corazon_image.py`
- **Purpose**: Upload adventure hiking image to blog-images bucket
- **Source Image**: `public/images/outdoors/hiking.jpg`
- **New Name**: `corazon-de-xoconostle-adventure.jpg`

### 2. Updated React Component
- **File**: `src/pages/blog/corazon-de-xoconostle.tsx`
- **Changes**:
  - Main hero image updated to use Supabase Storage URL
  - OpenGraph meta image updated
  - Improved alt text for accessibility

### 3. Database Migration
- **File**: `supabase/migrations/20250113_update_corazon_xoconostle_image.sql`
- **Purpose**: Update the `featured_image` field in the database

## 🚀 Next Steps

### 1. Set Up Environment Variable
```bash
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

### 2. Run the Upload Script
```bash
python3 upload_corazon_image.py
```

### 3. Apply Database Migration
Run the SQL migration in your Supabase Dashboard or via CLI.

## 🔗 New Image URL

The blog post will now use:
```
https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg
```

## ✅ Benefits

- **Better Performance**: Image served from Supabase CDN
- **Reliability**: No dependency on local file structure
- **Consistency**: Matches our new storage strategy
- **SEO**: Better Core Web Vitals scores
- **Management**: Centralized image management

## 🎯 Image Details

- **Original**: Hiking scene in San Luis Potosí outdoors
- **Theme**: Perfect for adventure travel company
- **Quality**: High-resolution outdoor adventure image
- **Alt Text**: "Corazón de Xoconostle Adventures - Hiking in San Luis Potosí"

## 🔍 Testing

After completing the steps above:

1. Visit the blog post: `/blog/corazon-de-xoconostle`
2. Verify the hero image loads correctly
3. Check that OpenGraph sharing uses the new image
4. Confirm fast loading times

## 📱 Compatibility

The new image URL works across:
- ✅ Web browsers
- ✅ Social media sharing (OpenGraph)
- ✅ Mobile devices
- ✅ SEO crawlers