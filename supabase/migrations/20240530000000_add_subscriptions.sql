-- Add subscriptions related tables

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2) NOT NULL,
  price_yearly DECIMAL(10, 2) NOT NULL,
  max_listings INTEGER NOT NULL DEFAULT 10,
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create subscriptions table 
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  payment_method_id TEXT,
  interval TEXT NOT NULL, -- 'monthly' or 'yearly'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create business_profiles table to store business-specific info
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  business_description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  business_category TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  phone TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  active_listings_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add business_profile_id to products/listings table if it doesn't exist
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS business_profile_id UUID REFERENCES public.business_profiles(id);

-- Add subscription-related fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS has_active_subscription BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_id UUID REFERENCES public.subscriptions(id),
ADD COLUMN IF NOT EXISTS is_business BOOLEAN DEFAULT false NOT NULL;

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, max_listings, features, is_active)
VALUES 
('Business Profile', 'Create your business profile and list up to 10 services or products', 250.00, 2500.00, 10, 
  '{"custom_profile": true, "analytics_dashboard": true, "priority_support": false}'::jsonb, 
  true);

-- Create RLS policies for subscription tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans
  FOR SELECT USING (true);

-- Only admins can modify subscription plans
CREATE POLICY "Only admins can modify subscription plans" ON public.subscription_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Only admins can modify subscriptions
CREATE POLICY "Only admins can modify subscriptions" ON public.subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Policies for business_profiles
CREATE POLICY "Anyone can view business profiles" ON public.business_profiles
  FOR SELECT USING (true);

-- Users can update their own business profile
CREATE POLICY "Users can update their own business profile" ON public.business_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Users can insert their own business profile
CREATE POLICY "Users can insert their own business profile" ON public.business_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for the subscriptions and plans tables
CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON public.subscription_plans
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_business_profiles_updated_at
BEFORE UPDATE ON public.business_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 