/**
 * Script to create newsletter tables in Supabase
 * Run with: node scripts/create-newsletter-tables.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTables() {
  console.log('Creating newsletter tables...\n');

  // Create newsletter_subscribers table
  const { error: subscribersError } = await supabase.rpc('exec_sql', {
    sql: `
      -- Newsletter Subscribers Table
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

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at);

      -- Enable RLS
      ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

      -- Policies
      DROP POLICY IF EXISTS "Service role can manage subscribers" ON newsletter_subscribers;
      CREATE POLICY "Service role can manage subscribers" ON newsletter_subscribers
        FOR ALL USING (auth.role() = 'service_role');

      DROP POLICY IF EXISTS "Anon can insert subscribers" ON newsletter_subscribers;
      CREATE POLICY "Anon can insert subscribers" ON newsletter_subscribers
        FOR INSERT WITH CHECK (true);
    `
  });

  if (subscribersError) {
    console.error('Error creating newsletter_subscribers table:', subscribersError);
  } else {
    console.log('✅ newsletter_subscribers table created');
  }

  // Create newsletters table
  const { error: newslettersError } = await supabase.rpc('exec_sql', {
    sql: `
      -- Newsletters Table
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

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_newsletters_status ON newsletters(status);
      CREATE INDEX IF NOT EXISTS idx_newsletters_scheduled_for ON newsletters(scheduled_for);
      CREATE INDEX IF NOT EXISTS idx_newsletters_sent_at ON newsletters(sent_at);

      -- Enable RLS
      ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

      -- Policies
      DROP POLICY IF EXISTS "Service role can manage newsletters" ON newsletters;
      CREATE POLICY "Service role can manage newsletters" ON newsletters
        FOR ALL USING (auth.role() = 'service_role');
    `
  });

  if (newslettersError) {
    console.error('Error creating newsletters table:', newslettersError);
  } else {
    console.log('✅ newsletters table created');
  }

  // Create newsletter_sends table (tracking individual sends)
  const { error: sendsError } = await supabase.rpc('exec_sql', {
    sql: `
      -- Newsletter Sends Table (for tracking)
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

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_newsletter_sends_newsletter_id ON newsletter_sends(newsletter_id);
      CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber_id ON newsletter_sends(subscriber_id);
      CREATE INDEX IF NOT EXISTS idx_newsletter_sends_status ON newsletter_sends(status);

      -- Enable RLS
      ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

      -- Policies
      DROP POLICY IF EXISTS "Service role can manage sends" ON newsletter_sends;
      CREATE POLICY "Service role can manage sends" ON newsletter_sends
        FOR ALL USING (auth.role() = 'service_role');
    `
  });

  if (sendsError) {
    console.error('Error creating newsletter_sends table:', sendsError);
  } else {
    console.log('✅ newsletter_sends table created');
  }

  // Create updated_at trigger function
  const { error: triggerFnError } = await supabase.rpc('exec_sql', {
    sql: `
      -- Updated at trigger function
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `
  });

  if (triggerFnError) {
    console.error('Error creating trigger function:', triggerFnError);
  } else {
    console.log('✅ update_updated_at_column function created');
  }

  // Apply triggers
  const { error: triggersError } = await supabase.rpc('exec_sql', {
    sql: `
      -- Apply triggers
      DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON newsletter_subscribers;
      CREATE TRIGGER update_newsletter_subscribers_updated_at
        BEFORE UPDATE ON newsletter_subscribers
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_newsletters_updated_at ON newsletters;
      CREATE TRIGGER update_newsletters_updated_at
        BEFORE UPDATE ON newsletters
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `
  });

  if (triggersError) {
    console.error('Error creating triggers:', triggersError);
  } else {
    console.log('✅ Triggers created');
  }

  console.log('\n✅ All newsletter tables created successfully!');
}

// Alternative: Create tables directly with Supabase client if RPC doesn't exist
async function createTablesDirectly() {
  console.log('Creating tables directly...\n');

  // Check if tables exist by trying to select from them
  const { error: checkSubscribers } = await supabase
    .from('newsletter_subscribers')
    .select('id')
    .limit(1);

  if (checkSubscribers && checkSubscribers.code === '42P01') {
    console.log('newsletter_subscribers table does not exist, needs manual creation in Supabase dashboard');
    console.log('\nPlease run the following SQL in your Supabase SQL editor:\n');
    console.log(`
-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
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

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON newsletter_subscribers(status);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Newsletters Table
CREATE TABLE newsletters (
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

CREATE INDEX idx_newsletters_status ON newsletters(status);
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Newsletter Sends Table
CREATE TABLE newsletter_sends (
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

CREATE INDEX idx_newsletter_sends_newsletter_id ON newsletter_sends(newsletter_id);
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Service role can manage subscribers" ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Anon can insert subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can manage newsletters" ON newsletters FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage sends" ON newsletter_sends FOR ALL USING (auth.role() = 'service_role');
    `);
  } else {
    console.log('✅ Tables appear to exist or can be accessed');
  }
}

async function main() {
  try {
    await createTables();
  } catch (error) {
    console.log('RPC method not available, trying direct approach...');
    await createTablesDirectly();
  }
}

main().catch(console.error);
