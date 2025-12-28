-- Create community_news table for social/community focused news
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  summary_es TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'community' CHECK (category IN ('social', 'community', 'culture', 'local')),
  image_url TEXT,
  source TEXT,
  priority INTEGER DEFAULT 10,
  active BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_community_news_active ON community_news(active);
CREATE INDEX IF NOT EXISTS idx_community_news_priority ON community_news(priority);
CREATE INDEX IF NOT EXISTS idx_community_news_published ON community_news(published_at DESC);

-- Enable Row Level Security
ALTER TABLE community_news ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active news
CREATE POLICY "Allow public read access to community news"
  ON community_news
  FOR SELECT
  USING (active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Insert sample community news
INSERT INTO community_news (title_es, title_en, summary_es, summary_en, category, priority) VALUES
(
  'Mercado Tangamanga celebra su 5to aniversario',
  'Tangamanga Market celebrates 5th anniversary',
  'El mercado artesanal más querido de SLP festeja con actividades especiales este fin de semana.',
  'SLP''s beloved artisan market celebrates with special activities this weekend.',
  'community',
  1
),
(
  'Nueva ruta ciclista conecta Lomas con el Centro',
  'New bike route connects Lomas to Downtown',
  'La ciclovía de 8km promete facilitar el transporte sustentable en la ciudad.',
  'The 8km bike lane promises to facilitate sustainable transportation in the city.',
  'local',
  2
),
(
  'Voluntarios limpian el Parque de Morales',
  'Volunteers clean up Morales Park',
  'Más de 200 ciudadanos participaron en la jornada de limpieza comunitaria.',
  'Over 200 citizens participated in the community cleanup day.',
  'social',
  3
);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_community_news_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS trigger_community_news_updated_at ON community_news;
CREATE TRIGGER trigger_community_news_updated_at
  BEFORE UPDATE ON community_news
  FOR EACH ROW
  EXECUTE FUNCTION update_community_news_updated_at();

-- Grant permissions for anon role (for public API access)
GRANT SELECT ON community_news TO anon;
GRANT SELECT ON community_news TO authenticated;
