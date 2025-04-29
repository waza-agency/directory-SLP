-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT false NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL,
  place_id TEXT REFERENCES public.places(id),
  featured BOOLEAN DEFAULT false NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  status TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  payment_id TEXT,
  stripe_session_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(order_id, product_id)
);

-- Add user_id to reviews table
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id);

-- Create RLS policies for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all user profiles
CREATE POLICY "Users can read all user profiles" ON public.users
  FOR SELECT USING (true);

-- Policy: Users can update only their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Policy: System can create user profiles
CREATE POLICY "System can create user profiles" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active products
CREATE POLICY "Anyone can read active products" ON public.products
  FOR SELECT USING (active = true);

-- Policy: Only admins can modify products
CREATE POLICY "Only admins can modify products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Create RLS policies for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see only their own orders
CREATE POLICY "Users can see own orders" ON public.orders
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Policy: Users can create orders
CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can update only their own orders with pending status
CREATE POLICY "Users can update own pending orders" ON public.orders
  FOR UPDATE USING (
    auth.uid()::text = user_id::text AND
    status = 'pending'
  );

-- Create RLS policies for order items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see only their own order items
CREATE POLICY "Users can see own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND
      orders.user_id::text = auth.uid()::text
    )
  );

-- Policy: Users can create order items for their own orders
CREATE POLICY "Users can create order items for own orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND
      orders.user_id::text = auth.uid()::text AND
      orders.status = 'pending'
    )
  );

-- Policy: Users can update order items for their own pending orders
CREATE POLICY "Users can update order items for own pending orders" ON public.order_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND
      orders.user_id::text = auth.uid()::text AND
      orders.status = 'pending'
    )
  );

-- Create functions and triggers to update the 'updated_at' field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at
BEFORE UPDATE ON public.order_items
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 