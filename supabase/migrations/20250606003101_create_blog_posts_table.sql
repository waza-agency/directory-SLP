-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author_id UUID,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft, published, archived
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[]
);

-- Add indexes
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON public.blog_posts (published_at);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read published posts"
    ON public.blog_posts FOR SELECT
    USING (status = 'published');

-- Insert some sample blog posts to prevent empty state
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, status, published_at) VALUES
(
    'Welcome to San Luis Way',
    'welcome-to-san-luis-way',
    'Discover the best of San Luis Potosí with our comprehensive guide to local businesses, events, and experiences.',
    '<p>Welcome to San Luis Way, your ultimate guide to discovering the best of San Luis Potosí. Whether you''re a local resident or a visitor, our platform connects you with amazing local businesses, exciting events, and unique experiences that make our city special.</p><p>From traditional restaurants serving authentic Potosino cuisine to modern cafes and innovative startups, we showcase the diverse business landscape that makes San Luis Potosí a vibrant place to live and visit.</p>',
    'General',
    'published',
    now()
),
(
    'Exploring San Luis Potosí''s Cultural Heritage',
    'exploring-cultural-heritage',
    'Dive deep into the rich cultural heritage of San Luis Potosí, from historic architecture to traditional festivals.',
    '<p>San Luis Potosí is a city steeped in history and culture. From the stunning colonial architecture of the historic center to the vibrant festivals that celebrate our traditions, there''s always something to discover.</p><p>Join us as we explore the cultural treasures that make our city unique, including museums, galleries, theaters, and the stories behind our most beloved landmarks.</p>',
    'Culture',
    'published',
    now()
),
(
    'The Best Local Food Experiences in SLP',
    'best-local-food-experiences',
    'A culinary journey through San Luis Potosí''s most authentic flavors and hidden gastronomic gems.',
    '<p>San Luis Potosí''s culinary scene is a delightful blend of traditional Mexican flavors and innovative modern cuisine. From street food vendors serving the best tacos in the city to upscale restaurants reimagining classic dishes, our food scene has something for every palate.</p><p>Discover the must-try dishes, the best local markets, and the restaurants that locals love but tourists rarely find.</p>',
    'Food',
    'published',
    now()
);
