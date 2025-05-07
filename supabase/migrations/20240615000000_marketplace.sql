-- Marketplace functionality migration
-- This script extends the existing business_listings table with marketplace capabilities

-- 1. Add seller fields to the users table
ALTER TABLE IF EXISTS public.users 
ADD COLUMN IF NOT EXISTS is_seller BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stripe_connect_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS seller_account_status TEXT,
ADD COLUMN IF NOT EXISTS seller_charges_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS seller_payouts_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS seller_details_submitted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS seller_requirements_due JSONB,
ADD COLUMN IF NOT EXISTS seller_verification_status TEXT;

-- 2. Add marketplace fields to business_listings table
ALTER TABLE IF EXISTS public.business_listings
ADD COLUMN IF NOT EXISTS is_sellable BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS product_type TEXT, -- 'physical', 'digital', 'service'
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER,
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,
ADD COLUMN IF NOT EXISTS shipping_info JSONB,
ADD COLUMN IF NOT EXISTS specifications JSONB,
ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'physical',
ADD COLUMN IF NOT EXISTS digital_download_url TEXT;

-- 3. Create the marketplace_transactions table
CREATE TABLE IF NOT EXISTS public.marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.business_listings(id) NOT NULL,
  business_id UUID REFERENCES public.business_profiles(id) NOT NULL,
  buyer_id UUID REFERENCES public.users(id) NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  quantity INTEGER DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  stripe_fee DECIMAL(10, 2),
  seller_payout DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  shipping_address JSONB,
  shipping_status TEXT DEFAULT 'not_shipped',
  tracking_number TEXT,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create RLS policies for marketplace_transactions
ALTER TABLE public.marketplace_transactions ENABLE ROW LEVEL SECURITY;

-- Users can see their own transactions (as buyer or seller via business profile)
CREATE POLICY "Users can see their own transactions as buyer" ON public.marketplace_transactions
  FOR SELECT USING (buyer_id = auth.uid());

-- Sellers can see transactions for their business
CREATE POLICY "Sellers can see transactions for their business" ON public.marketplace_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.business_profiles
      WHERE business_profiles.id = marketplace_transactions.business_id
      AND business_profiles.user_id = auth.uid()
    )
  );

-- Only authorized systems can insert or modify transactions
CREATE POLICY "Only authorized systems or admins can insert transactions" ON public.marketplace_transactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Only authorized systems can update transactions
CREATE POLICY "Only authorized systems or admins can update transactions" ON public.marketplace_transactions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- 4. Create shopping cart table
CREATE TABLE IF NOT EXISTS public.shopping_cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  listing_id UUID REFERENCES public.business_listings(id) NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, listing_id)
);

-- Create RLS policies for shopping_cart
ALTER TABLE public.shopping_cart ENABLE ROW LEVEL SECURITY;

-- Users can manage their own cart
CREATE POLICY "Users can manage their own cart" ON public.shopping_cart
  FOR ALL USING (user_id = auth.uid());

-- 5. Create triggers for marketplace tables
CREATE TRIGGER update_marketplace_transactions_updated_at
BEFORE UPDATE ON public.marketplace_transactions
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_shopping_cart_updated_at
BEFORE UPDATE ON public.shopping_cart
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. Create function to update listing sales count
CREATE OR REPLACE FUNCTION update_listing_sales_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.status = 'completed') OR 
     (TG_OP = 'UPDATE' AND NEW.status = 'completed' AND OLD.status != 'completed') THEN
    UPDATE public.business_listings
    SET sales_count = COALESCE(sales_count, 0) + NEW.quantity
    WHERE id = NEW.listing_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating sales count
CREATE TRIGGER update_listing_sales_after_transaction
AFTER INSERT OR UPDATE ON public.marketplace_transactions
FOR EACH ROW EXECUTE FUNCTION update_listing_sales_count();

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_listings_business_id ON public.business_listings(business_id);
CREATE INDEX IF NOT EXISTS idx_business_listings_is_sellable ON public.business_listings(is_sellable);
CREATE INDEX IF NOT EXISTS idx_business_listings_product_type ON public.business_listings(product_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_buyer_id ON public.marketplace_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_business_id ON public.marketplace_transactions(business_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_listing_id ON public.marketplace_transactions(listing_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_status ON public.marketplace_transactions(status);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_user_id ON public.shopping_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_listing_id ON public.shopping_cart(listing_id); 