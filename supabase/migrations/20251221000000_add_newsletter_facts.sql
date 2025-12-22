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

-- Index for checking existing facts
CREATE INDEX IF NOT EXISTS idx_newsletter_facts_title ON newsletter_facts(fact_title);
CREATE INDEX IF NOT EXISTS idx_newsletter_facts_used_at ON newsletter_facts(used_at);

-- Enable RLS
ALTER TABLE newsletter_facts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Service role can manage facts
DROP POLICY IF EXISTS "Service role can manage newsletter_facts" ON newsletter_facts;
CREATE POLICY "Service role can manage newsletter_facts" ON newsletter_facts
  FOR ALL USING (auth.role() = 'service_role');

-- Add index for newsletter history queries
CREATE INDEX IF NOT EXISTS idx_newsletters_created_at ON newsletters(created_at DESC);
