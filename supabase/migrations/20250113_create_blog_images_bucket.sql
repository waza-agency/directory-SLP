-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

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