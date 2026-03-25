-- Sponsor Ads Table for Newsletter
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS sponsor_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  ad_type TEXT DEFAULT 'html' CHECK (ad_type IN ('html', 'image')),
  html_content TEXT,
  image_url TEXT,
  image_alt TEXT,
  link_url TEXT,
  link_target TEXT DEFAULT '_blank' CHECK (link_target IN ('_blank', '_self')),
  width TEXT DEFAULT '100%',
  height TEXT,
  placement TEXT DEFAULT 'middle' CHECK (placement IN ('top', 'middle', 'bottom')),
  section_anchor TEXT,
  priority INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  impressions_limit INT,
  impressions_count INT DEFAULT 0,
  clicks_count INT DEFAULT 0,
  rotation_group TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sponsor_ads_active ON sponsor_ads(active);
CREATE INDEX IF NOT EXISTS idx_sponsor_ads_placement ON sponsor_ads(placement);
CREATE INDEX IF NOT EXISTS idx_sponsor_ads_dates ON sponsor_ads(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_sponsor_ads_rotation_group ON sponsor_ads(rotation_group);

ALTER TABLE sponsor_ads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage sponsor ads" ON sponsor_ads;
CREATE POLICY "Service role can manage sponsor ads" ON sponsor_ads
  FOR ALL USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION update_sponsor_ads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_sponsor_ads_updated_at ON sponsor_ads;
CREATE TRIGGER update_sponsor_ads_updated_at
  BEFORE UPDATE ON sponsor_ads
  FOR EACH ROW EXECUTE FUNCTION update_sponsor_ads_updated_at();

-- Newsletter Ad Placements Table (tracks which ads are placed in which newsletters)
CREATE TABLE IF NOT EXISTS newsletter_ad_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE CASCADE,
  sponsor_ad_id UUID REFERENCES sponsor_ads(id) ON DELETE CASCADE,
  placement TEXT NOT NULL,
  impressions_count INT DEFAULT 0,
  clicks_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(newsletter_id, sponsor_ad_id, placement)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_ad_placements_newsletter ON newsletter_ad_placements(newsletter_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_ad_placements_ad ON newsletter_ad_placements(sponsor_ad_id);

ALTER TABLE newsletter_ad_placements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage ad placements" ON newsletter_ad_placements;
CREATE POLICY "Service role can manage ad placements" ON newsletter_ad_placements
  FOR ALL USING (auth.role() = 'service_role');
