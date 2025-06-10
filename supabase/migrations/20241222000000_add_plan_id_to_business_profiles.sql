-- Add plan_id column to business_profiles table
ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES public.subscription_plans(id);

-- Update existing business profiles with active subscription to use the default plan
UPDATE public.business_profiles
SET plan_id = (
  SELECT id FROM public.subscription_plans
  WHERE is_active = true
  LIMIT 1
)
WHERE subscription_status = 'active' AND plan_id IS NULL;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_business_profiles_plan_id ON public.business_profiles(plan_id);

-- Add comment for documentation
COMMENT ON COLUMN public.business_profiles.plan_id IS 'References the subscription plan for this business profile';