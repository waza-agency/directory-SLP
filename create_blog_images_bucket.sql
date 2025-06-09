-- Run this SQL in your Supabase Dashboard SQL Editor
-- Go to: https://supabase.com/dashboard/project/omxporaecrqsqhzjzvnx/sql

-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING; -- Prevent duplicate errors

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

-- Policy to allow public read access to blog images
CREATE POLICY "Public read access for blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

-- Policy to allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to update their uploaded blog images
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images' AND
  auth.role() = 'authenticated'
);