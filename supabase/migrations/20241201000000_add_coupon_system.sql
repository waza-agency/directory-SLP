-- Add coupon tracking to business_profiles
ALTER TABLE public.business_profiles
ADD COLUMN IF NOT EXISTS coupon_used TEXT,
ADD COLUMN IF NOT EXISTS coupon_applied_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS coupon_discount_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS coupon_discount_percent INTEGER;

-- Create coupon usage tracking table
CREATE TABLE IF NOT EXISTS public.coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  business_profile_id UUID REFERENCES public.business_profiles(id),
  coupon_code TEXT NOT NULL,
  stripe_coupon_id TEXT,
  discount_type TEXT NOT NULL, -- 'percent' or 'amount'
  discount_value DECIMAL(10, 2) NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id),
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create admin coupons table for tracking created coupons
CREATE TABLE IF NOT EXISTS public.admin_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_code TEXT UNIQUE NOT NULL,
  stripe_coupon_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL, -- 'percent' or 'amount'
  discount_value DECIMAL(10, 2) NOT NULL,
  duration TEXT NOT NULL, -- 'once', 'repeating', 'forever'
  duration_in_months INTEGER,
  max_redemptions INTEGER,
  times_redeemed INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_coupons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for coupon_usage
CREATE POLICY "Users can view their own coupon usage" ON public.coupon_usage
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage coupon usage" ON public.coupon_usage
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.is_admin = true)
    )
  );

-- RLS Policies for admin_coupons
CREATE POLICY "Anyone can view active coupons" ON public.admin_coupons
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage coupons" ON public.admin_coupons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.is_admin = true)
    )
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user_id ON public.coupon_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon_code ON public.coupon_usage(coupon_code);
CREATE INDEX IF NOT EXISTS idx_admin_coupons_code ON public.admin_coupons(coupon_code);
CREATE INDEX IF NOT EXISTS idx_admin_coupons_active ON public.admin_coupons(is_active);

-- Insert your existing coupon
INSERT INTO public.admin_coupons (
  coupon_code,
  stripe_coupon_id,
  name,
  description,
  discount_type,
  discount_value,
  duration,
  duration_in_months,
  max_redemptions,
  is_active
) VALUES (
  'AMIGOSSLPWAY',
  'promo_1RbsClIg6TQpITo3QPJNyqzF',
  'Amigos SLP Way Discount',
  'Special discount for SLP community members',
  'percent',
  100,
  'repeating',
  3,
  100,
  true
) ON CONFLICT (coupon_code) DO NOTHING;