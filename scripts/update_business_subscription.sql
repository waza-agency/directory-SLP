-- Function to update a business subscription status
-- This needs to be run against your Supabase database
CREATE OR REPLACE FUNCTION update_business_subscription(business_id_param UUID)
RETURNS VOID AS $$
DECLARE
    now_timestamp TIMESTAMP WITH TIME ZONE := now();
    end_timestamp TIMESTAMP WITH TIME ZONE := now() + INTERVAL '30 days';
BEGIN
    -- Update the business profile with the active subscription
    UPDATE public.business_profiles
    SET 
        -- Try text first, if that fails the column might be an enum
        subscription_status = 'active',
        subscription_start_date = now_timestamp,
        subscription_end_date = end_timestamp
    WHERE id = business_id_param;
    
    -- Also update the user's subscription status
    UPDATE public.users
    SET 
        has_active_subscription = TRUE,
        account_type = 'business'
    FROM public.business_profiles
    WHERE business_profiles.id = business_id_param
    AND users.id = business_profiles.user_id;
    
    RAISE NOTICE 'Subscription activated for business ID: %', business_id_param;
END;
$$ LANGUAGE plpgsql; 