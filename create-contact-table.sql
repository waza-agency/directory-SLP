-- Create contact_inquiries table for storing contact form submissions
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  subject TEXT NOT NULL,
  message TEXT,
  business_email TEXT NOT NULL,
  service_type TEXT DEFAULT 'general',
  additional_data JSONB,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_business_email ON contact_inquiries(business_email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to access all inquiries
DROP POLICY IF EXISTS "Service role can manage contact inquiries" ON contact_inquiries;
CREATE POLICY "Service role can manage contact inquiries" ON contact_inquiries
  FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT ALL ON contact_inquiries TO service_role;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_contact_inquiries_updated_at ON contact_inquiries;
CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_inquiries_updated_at();

-- Display success message
SELECT 'Contact inquiries table created successfully!' as message;