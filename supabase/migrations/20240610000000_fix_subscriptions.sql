-- Add subscription-related fields to business_profiles table
ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create function to sync subscription status with business_profiles
CREATE OR REPLACE FUNCTION sync_subscription_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the business_profile when a subscription is inserted or updated
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    UPDATE public.business_profiles
    SET 
      subscription_status = NEW.status,
      subscription_id = NEW.stripe_subscription_id,
      subscription_start_date = NEW.current_period_start,
      subscription_end_date = NEW.current_period_end,
      stripe_customer_id = NEW.stripe_customer_id
    WHERE user_id = NEW.user_id;
    
    -- Also update the user's has_active_subscription flag
    UPDATE public.users
    SET 
      has_active_subscription = (NEW.status = 'active'),
      subscription_id = NEW.id,
      is_business = true
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync subscription status
DROP TRIGGER IF EXISTS sync_subscription_to_business_profile ON public.subscriptions;
CREATE TRIGGER sync_subscription_to_business_profile
AFTER INSERT OR UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION sync_subscription_status();

-- Fix any existing subscriptions with missing links
DO $$
DECLARE
  sub_record RECORD;
BEGIN
  FOR sub_record IN 
    SELECT s.id, s.user_id, s.status, s.stripe_subscription_id, s.stripe_customer_id, 
           s.current_period_start, s.current_period_end
    FROM public.subscriptions s
    WHERE s.status = 'active'
  LOOP
    UPDATE public.business_profiles
    SET 
      subscription_status = sub_record.status,
      subscription_id = sub_record.stripe_subscription_id,
      subscription_start_date = sub_record.current_period_start,
      subscription_end_date = sub_record.current_period_end,
      stripe_customer_id = sub_record.stripe_customer_id
    WHERE user_id = sub_record.user_id;
    
    UPDATE public.users
    SET 
      has_active_subscription = true,
      subscription_id = sub_record.id,
      is_business = true
    WHERE id = sub_record.user_id;
  END LOOP;
END;
$$;

-- Create function to update business_listings count
CREATE OR REPLACE FUNCTION update_business_listings_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'DELETE') THEN
    UPDATE public.business_profiles
    SET active_listings_count = (
      SELECT COUNT(*) 
      FROM public.business_listings 
      WHERE business_id = CASE 
        WHEN TG_OP = 'INSERT' THEN NEW.business_id
        WHEN TG_OP = 'DELETE' THEN OLD.business_id
      END
      AND status = 'active'
    )
    WHERE id = CASE 
      WHEN TG_OP = 'INSERT' THEN NEW.business_id
      WHEN TG_OP = 'DELETE' THEN OLD.business_id
    END;
  ELSIF (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
    UPDATE public.business_profiles
    SET active_listings_count = (
      SELECT COUNT(*) 
      FROM public.business_listings 
      WHERE business_id = NEW.business_id
      AND status = 'active'
    )
    WHERE id = NEW.business_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update business_listings count
DROP TRIGGER IF EXISTS update_listings_count ON public.business_listings;
CREATE TRIGGER update_listings_count
AFTER INSERT OR UPDATE OR DELETE ON public.business_listings
FOR EACH ROW
EXECUTE FUNCTION update_business_listings_count(); 