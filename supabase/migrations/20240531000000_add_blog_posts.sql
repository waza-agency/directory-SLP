-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author_id UUID REFERENCES public.users(id),
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
CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX blog_posts_status_idx ON public.blog_posts (status);
CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read published posts"
    ON public.blog_posts FOR SELECT
    USING (status = 'published');

CREATE POLICY "Authors can CRUD their own posts"
    ON public.blog_posts FOR ALL
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Admins can CRUD all posts"
    ON public.blog_posts FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE is_admin = true
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT id FROM public.users WHERE is_admin = true
        )
    );

-- Add updated_at trigger
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();