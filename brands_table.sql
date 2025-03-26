-- Create brands table in Supabase
CREATE TABLE IF NOT EXISTS public.brands (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text NOT NULL,
    year_founded text,
    address text,
    city text,
    phone text,
    website text,
    instagram text,
    description text,
    notable_products text,
    where_to_buy text,
    image_url text,
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Set RLS policies
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Allow public read access" 
    ON public.brands FOR SELECT 
    USING (true);

-- Allow insert, update, delete only for authenticated users
CREATE POLICY "Allow authenticated insert" 
    ON public.brands FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update" 
    ON public.brands FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Allow authenticated delete" 
    ON public.brands FOR DELETE 
    TO authenticated 
    USING (true);

-- Create index on name for faster searches
CREATE INDEX IF NOT EXISTS brands_name_idx ON public.brands (name);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS brands_category_idx ON public.brands (category);

-- Create index on featured for filtering featured brands
CREATE INDEX IF NOT EXISTS brands_featured_idx ON public.brands (featured);

COMMENT ON TABLE public.brands IS 'Table for Potosino brands'; 