-- Add Japanese translation columns to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS title_ja TEXT,
ADD COLUMN IF NOT EXISTS content_ja TEXT,
ADD COLUMN IF NOT EXISTS excerpt_ja TEXT,
ADD COLUMN IF NOT EXISTS meta_title_ja TEXT,
ADD COLUMN IF NOT EXISTS meta_description_ja TEXT;

-- Add Japanese translation columns to news_headlines table
ALTER TABLE news_headlines
ADD COLUMN IF NOT EXISTS text_ja TEXT,
ADD COLUMN IF NOT EXISTS summary_ja TEXT;

-- Add Japanese translation columns to community_news table
ALTER TABLE community_news
ADD COLUMN IF NOT EXISTS title_ja TEXT,
ADD COLUMN IF NOT EXISTS summary_ja TEXT;

-- Comment the changes
COMMENT ON COLUMN blog_posts.title_ja IS 'Japanese translation of title';
COMMENT ON COLUMN blog_posts.content_ja IS 'Japanese translation of content';
COMMENT ON COLUMN blog_posts.excerpt_ja IS 'Japanese translation of excerpt';
COMMENT ON COLUMN blog_posts.meta_title_ja IS 'Japanese translation of meta title';
COMMENT ON COLUMN blog_posts.meta_description_ja IS 'Japanese translation of meta description';
COMMENT ON COLUMN news_headlines.text_ja IS 'Japanese translation of headline text';
COMMENT ON COLUMN news_headlines.summary_ja IS 'Japanese translation of summary';
COMMENT ON COLUMN community_news.title_ja IS 'Japanese translation of title';
COMMENT ON COLUMN community_news.summary_ja IS 'Japanese translation of summary';
