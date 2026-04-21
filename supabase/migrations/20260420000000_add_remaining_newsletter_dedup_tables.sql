-- Missing newsletter dedup tables referenced by newsletter-generator.ts.
-- Without these, Supabase returns "relation does not exist" and the generator
-- silently falls back to "No previous X recorded", letting the AI re-use
-- content across editions (e.g. repeating Real de Catorce as weekend escape).

-- Weekend Escape destinations
CREATE TABLE IF NOT EXISTS newsletter_escapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escape_name TEXT NOT NULL,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_escapes_name ON newsletter_escapes(escape_name);
CREATE INDEX IF NOT EXISTS idx_newsletter_escapes_used_at ON newsletter_escapes(used_at);

-- Spot of the Week
CREATE TABLE IF NOT EXISTS newsletter_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_name TEXT NOT NULL,
  spot_description TEXT,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_spots_name ON newsletter_spots(spot_name);
CREATE INDEX IF NOT EXISTS idx_newsletter_spots_used_at ON newsletter_spots(used_at);

-- Spanish Corner phrases
CREATE TABLE IF NOT EXISTS newsletter_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase TEXT NOT NULL,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_phrases_phrase ON newsletter_phrases(phrase);
CREATE INDEX IF NOT EXISTS idx_newsletter_phrases_used_at ON newsletter_phrases(used_at);

-- Ask an Expat questions
CREATE TABLE IF NOT EXISTS newsletter_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer_summary TEXT,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_questions_question ON newsletter_questions(question);
CREATE INDEX IF NOT EXISTS idx_newsletter_questions_used_at ON newsletter_questions(used_at);

-- Community Spotlight features
CREATE TABLE IF NOT EXISTS newsletter_spotlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spotlight_name TEXT NOT NULL,
  spotlight_type TEXT,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_spotlights_name ON newsletter_spotlights(spotlight_name);
CREATE INDEX IF NOT EXISTS idx_newsletter_spotlights_used_at ON newsletter_spotlights(used_at);

-- RLS: service role only (matches pattern from newsletter_facts/tips/places)
ALTER TABLE newsletter_escapes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_spots     ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_phrases   ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_spotlights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage newsletter_escapes" ON newsletter_escapes;
CREATE POLICY "Service role can manage newsletter_escapes" ON newsletter_escapes
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage newsletter_spots" ON newsletter_spots;
CREATE POLICY "Service role can manage newsletter_spots" ON newsletter_spots
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage newsletter_phrases" ON newsletter_phrases;
CREATE POLICY "Service role can manage newsletter_phrases" ON newsletter_phrases
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage newsletter_questions" ON newsletter_questions;
CREATE POLICY "Service role can manage newsletter_questions" ON newsletter_questions
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can manage newsletter_spotlights" ON newsletter_spotlights;
CREATE POLICY "Service role can manage newsletter_spotlights" ON newsletter_spotlights
  FOR ALL USING (auth.role() = 'service_role');
