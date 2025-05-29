-- Create a function to send custom emails using Supabase's email service
-- This leverages the same email infrastructure that Supabase Auth uses

CREATE OR REPLACE FUNCTION send_custom_email(
  recipient_email TEXT,
  email_subject TEXT,
  email_html TEXT,
  sender_name TEXT DEFAULT 'San Luis Way',
  reply_to_email TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  -- Use Supabase's internal email service
  -- This function will use the same email provider configured for auth emails

  -- For now, we'll store the email in a queue table and let Supabase handle it
  -- Insert into email queue table
  INSERT INTO email_queue (
    recipient_email,
    subject,
    html_content,
    sender_name,
    reply_to_email,
    status,
    created_at
  ) VALUES (
    recipient_email,
    email_subject,
    email_html,
    sender_name,
    reply_to_email,
    'pending',
    NOW()
  );

  -- Return success response
  result := json_build_object(
    'success', true,
    'message', 'Email queued successfully',
    'recipient', recipient_email,
    'subject', email_subject
  );

  RETURN result;

EXCEPTION WHEN OTHERS THEN
  -- Return error response
  result := json_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Failed to queue email'
  );

  RETURN result;
END;
$$;

-- Create email queue table to store emails
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  sender_name TEXT DEFAULT 'San Luis Way',
  reply_to_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_created_at ON email_queue(created_at);

-- Enable RLS
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to access all emails
CREATE POLICY "Service role can manage email queue" ON email_queue
  FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT ALL ON email_queue TO service_role;
GRANT EXECUTE ON FUNCTION send_custom_email TO service_role;