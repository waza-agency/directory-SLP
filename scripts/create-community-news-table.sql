-- Create community_news table for social/community focused news
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_es TEXT NOT NULL,ya esta 
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
