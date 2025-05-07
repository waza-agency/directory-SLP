-- Add Stripe Connect Account ID to business_profiles table
ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS stripe_connect_account_id TEXT;
ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS stripe_connect_status TEXT DEFAULT 'pending';
ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS stripe_connect_onboarded_at TIMESTAMP WITH TIME ZONE;

-- Add comment to explain the purpose of the field
COMMENT ON COLUMN business_profiles.stripe_connect_account_id IS 'Stripe Connect account ID used for processing payments to businesses';
COMMENT ON COLUMN business_profiles.stripe_connect_status IS 'Status of Stripe Connect onboarding (pending, complete, rejected)';
COMMENT ON COLUMN business_profiles.stripe_connect_onboarded_at IS 'Timestamp when the business completed Stripe Connect onboarding'; 