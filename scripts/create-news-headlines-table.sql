-- Create news_headlines table for the ticker
CREATE TABLE IF NOT EXISTS news_headlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_es TEXT NOT NULL,
  text_en TEXT NOT NULL,
  source TEXT,
  source_url TEXT,
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Create index for active headlines sorted by priority
CREATE INDEX IF NOT EXISTS idx_news_headlines_active
ON news_headlines (active, priority DESC, created_at DESC);

-- Enable RLS
ALTER TABLE news_headlines ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active headlines
CREATE POLICY "Allow public read access to active headlines"
ON news_headlines FOR SELECT
USING (active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Allow service role full access
CREATE POLICY "Allow service role full access"
ON news_headlines FOR ALL
USING (auth.role() = 'service_role');

-- Insert initial headlines
INSERT INTO news_headlines (text_es, text_en, source, priority) VALUES
('ECOM Expocomic San Luis 2025 llega el 18 y 19 de diciembre al Centro de Convenciones', 'ECOM Expocomic San Luis 2025 arrives Dec 18-19 at Convention Center', 'Local Events', 1),
('Nuevo hospital IMSS-Bienestar iniciará construcción en 2026 para SLP', 'New IMSS-Bienestar hospital construction begins 2026 for SLP', 'Government', 2),
('SLP entre los 10 mejores destinos turísticos de México para 2025', 'SLP among top 10 tourist destinations in Mexico for 2025', 'Tourism', 3),
('Inversión extranjera en SLP crece 15% en el último trimestre', 'Foreign investment in SLP grows 15% in last quarter', 'Economy', 4),
('Festival de la Luz 2025: más de 50 eventos culturales en diciembre', 'Festival of Light 2025: over 50 cultural events in December', 'Culture', 5);
