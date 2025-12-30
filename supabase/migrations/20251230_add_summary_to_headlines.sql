-- Add summary fields to news_headlines table
ALTER TABLE news_headlines ADD COLUMN IF NOT EXISTS summary_es TEXT DEFAULT '';
ALTER TABLE news_headlines ADD COLUMN IF NOT EXISTS summary_en TEXT DEFAULT '';
