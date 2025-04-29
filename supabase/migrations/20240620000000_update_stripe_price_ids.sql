-- Update subscription plans with Stripe price IDs

-- Create temporary function to update or insert subscription plans
CREATE OR REPLACE FUNCTION update_subscription_plan_price_ids()
RETURNS void AS $$
DECLARE
    existing_plan_id UUID;
BEGIN
    -- Check if we have an existing plan
    SELECT id INTO existing_plan_id FROM public.subscription_plans LIMIT 1;
    
    IF existing_plan_id IS NULL THEN
        -- If no plan exists, insert one with default values
        INSERT INTO public.subscription_plans (
            name, 
            description, 
            price_monthly, 
            price_yearly, 
            max_listings, 
            features, 
            is_active,
            stripe_monthly_price_id,
            stripe_yearly_price_id
        ) VALUES (
            'Business Profile', 
            'Create your business profile and list up to 10 services or products', 
            250.00, 
            2500.00, 
            10, 
            '{"custom_profile": true, "analytics_dashboard": true, "priority_support": false}'::jsonb, 
            true,
            'price_monthly_REPLACE_WITH_YOUR_PRICE_ID', -- Replace with your actual Stripe price ID
            'price_yearly_REPLACE_WITH_YOUR_PRICE_ID'   -- Replace with your actual Stripe price ID
        );
    ELSE
        -- Update existing plans with price IDs if they're not set
        UPDATE public.subscription_plans
        SET 
            stripe_monthly_price_id = COALESCE(stripe_monthly_price_id, 'price_monthly_REPLACE_WITH_YOUR_PRICE_ID'),
            stripe_yearly_price_id = COALESCE(stripe_yearly_price_id, 'price_yearly_REPLACE_WITH_YOUR_PRICE_ID')
        WHERE 
            stripe_monthly_price_id IS NULL OR 
            stripe_yearly_price_id IS NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT update_subscription_plan_price_ids();

-- Drop the temporary function
DROP FUNCTION update_subscription_plan_price_ids();

-- Add a comment to remind to update the price IDs
COMMENT ON TABLE public.subscription_plans IS 'Remember to update the Stripe price IDs with your actual values'; 