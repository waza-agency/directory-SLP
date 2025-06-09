-- Update Corazón de Xoconostle blog post image to use Supabase Storage
UPDATE public.blog_posts
SET image_url = 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg'
WHERE slug = 'corazon-de-xoconostle';