-- Newsletter Facts Table
-- Stores "Did You Know?" facts that have been used to avoid repetition

CREATE TABLE IF NOT EXISTS newsletter_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fact_title TEXT NOT NULL,
  fact_body TEXT NOT NULL,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_facts_title ON newsletter_facts(fact_title);
CREATE INDEX IF NOT EXISTS idx_newsletter_facts_used_at ON newsletter_facts(used_at);

ALTER TABLE newsletter_facts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage newsletter_facts" ON newsletter_facts;
CREATE POLICY "Service role can manage newsletter_facts" ON newsletter_facts
  FOR ALL USING (auth.role() = 'service_role');

-- Newsletter Pro Tips Table
-- Stores Expat Pro Tips that have been used to avoid repetition

CREATE TABLE IF NOT EXISTS newsletter_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_title TEXT NOT NULL,
  tip_body TEXT NOT NULL,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_tips_title ON newsletter_tips(tip_title);
CREATE INDEX IF NOT EXISTS idx_newsletter_tips_used_at ON newsletter_tips(used_at);

ALTER TABLE newsletter_tips ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage newsletter_tips" ON newsletter_tips;
CREATE POLICY "Service role can manage newsletter_tips" ON newsletter_tips
  FOR ALL USING (auth.role() = 'service_role');

-- Newsletter Places Table
-- Stores "Now Open" places that have been featured to avoid repetition

CREATE TABLE IF NOT EXISTS newsletter_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_name TEXT NOT NULL,
  place_description TEXT,
  place_address TEXT,
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_places_name ON newsletter_places(place_name);
CREATE INDEX IF NOT EXISTS idx_newsletter_places_used_at ON newsletter_places(used_at);

ALTER TABLE newsletter_places ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage newsletter_places" ON newsletter_places;
CREATE POLICY "Service role can manage newsletter_places" ON newsletter_places
  FOR ALL USING (auth.role() = 'service_role');

-- Add index for newsletter history queries
CREATE INDEX IF NOT EXISTS idx_newsletters_created_at ON newsletters(created_at DESC);
