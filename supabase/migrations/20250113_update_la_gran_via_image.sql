-- Update La Gran Vía blog post image to use Supabase Storage
UPDATE public.blog_posts
SET image_url = 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/la-gran-via-restaurant.jpg'
WHERE slug = 'la-gran-via';