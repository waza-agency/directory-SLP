-- This migration fixes issues with subscription status synchronization
-- and ensures business listings are properly related to their business profiles

-- Step 1: Update business_profiles from subscriptions table for accurate statuses
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
    
    RAISE NOTICE 'Updated business profile and user for user_id: %', sub_record.user_id;
  END LOOP;
END;
$$;

-- Step 2: Fix the business_listings counter for each business profile
DO $$
DECLARE
  profile_record RECORD;
  active_count INTEGER;
BEGIN
  FOR profile_record IN 
    SELECT id, user_id
    FROM public.business_profiles
  LOOP
    SELECT COUNT(*) INTO active_count
    FROM public.business_listings
    WHERE business_id = profile_record.id
    AND status = 'active';
    
    UPDATE public.business_profiles
    SET active_listings_count = active_count
    WHERE id = profile_record.id;
    
    RAISE NOTICE 'Updated listing count for business profile %: %', profile_record.id, active_count;
  END LOOP;
END;
$$;

-- Step 3: Create or replace function to keep subscriptions and business_profiles in sync
-- This ensures that when a subscription is updated, the business profile is also updated
CREATE OR REPLACE FUNCTION sync_subscription_to_business_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    -- Update the business_profile when a subscription is updated
    UPDATE public.business_profiles
    SET 
      subscription_status = NEW.status,
      subscription_id = NEW.stripe_subscription_id,
      subscription_start_date = NEW.current_period_start,
      subscription_end_date = NEW.current_period_end,
      stripe_customer_id = NEW.stripe_customer_id
    WHERE user_id = NEW.user_id;
    
    -- Also update the user's subscription flags
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

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS sync_subscription_to_business_profile ON public.subscriptions;
CREATE TRIGGER sync_subscription_to_business_profile
AFTER INSERT OR UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION sync_subscription_to_business_profile();

-- Step 4: Create or replace function to keep business_listings count accurate
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
  ELSIF (TG_OP = 'UPDATE' AND (OLD.status != NEW.status OR OLD.business_id != NEW.business_id)) THEN
    -- If status changes or business_id changes, update counts for both old and new business_id
    
    -- Update count for old business_id
    UPDATE public.business_profiles
    SET active_listings_count = (
      SELECT COUNT(*) 
      FROM public.business_listings 
      WHERE business_id = OLD.business_id
      AND status = 'active'
    )
    WHERE id = OLD.business_id;
    
    -- If business_id changed, also update count for new business_id
    IF OLD.business_id != NEW.business_id THEN
      UPDATE public.business_profiles
      SET active_listings_count = (
        SELECT COUNT(*) 
        FROM public.business_listings 
        WHERE business_id = NEW.business_id
        AND status = 'active'
      )
      WHERE id = NEW.business_id;
    END IF;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_listings_count ON public.business_listings;
CREATE TRIGGER update_listings_count
AFTER INSERT OR UPDATE OR DELETE ON public.business_listings
FOR EACH ROW
EXECUTE FUNCTION update_business_listings_count(); 