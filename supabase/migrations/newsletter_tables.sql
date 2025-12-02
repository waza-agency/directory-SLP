-- Newsletter System Migration
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- ============================================
-- 1. Newsletter Subscribers Table
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'website',
  ip_address TEXT,
  user_agent TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  confirmation_token TEXT,
  preferences JSONB DEFAULT '{"weekly_digest": true, "event_alerts": true, "promotions": false}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for subscribers
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at);

-- ============================================
-- 2. Newsletters Table
-- ============================================
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  preview_text TEXT,
  html_content TEXT NOT NULL,
  plain_text_content TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  week_start DATE,
  week_end DATE,
  stats JSONB DEFAULT '{"sent": 0, "delivered": 0, "opened": 0, "clicked": 0, "bounced": 0, "unsubscribed": 0}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for newsletters
CREATE INDEX IF NOT EXISTS idx_newsletters_status ON newsletters(status);
CREATE INDEX IF NOT EXISTS idx_newsletters_scheduled_for ON newsletters(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_newsletters_sent_at ON newsletters(sent_at);

-- ============================================
-- 3. Newsletter Sends Table (for tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  error_message TEXT,
  resend_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for sends
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_newsletter_id ON newsletter_sends(newsletter_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber_id ON newsletter_sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_status ON newsletter_sends(status);

-- ============================================
-- 4. Enable Row Level Security
-- ============================================
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. RLS Policies
-- ============================================
-- Subscribers: Service role can do everything, anon can insert
DROP POLICY IF EXISTS "Service role can manage subscribers" ON newsletter_subscribers;
CREATE POLICY "Service role can manage subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Anon can insert subscribers" ON newsletter_subscribers;
CREATE POLICY "Anon can insert subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Newsletters: Service role only
DROP POLICY IF EXISTS "Service role can manage newsletters" ON newsletters;
CREATE POLICY "Service role can manage newsletters" ON newsletters
  FOR ALL USING (auth.role() = 'service_role');

-- Sends: Service role only
DROP POLICY IF EXISTS "Service role can manage sends" ON newsletter_sends;
CREATE POLICY "Service role can manage sends" ON newsletter_sends
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 6. Updated At Trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON newsletter_subscribers;
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_newsletters_updated_at ON newsletters;
CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Done! Your newsletter tables are ready.
-- ============================================
