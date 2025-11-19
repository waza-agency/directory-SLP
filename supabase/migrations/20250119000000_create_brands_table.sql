-- Create brands table
CREATE TABLE IF NOT EXISTS public.brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    year_founded TEXT,
    address TEXT,
    city TEXT DEFAULT 'San Luis Potosí',
    phone TEXT,
    website TEXT,
    instagram TEXT,
    description TEXT,
    notable_products TEXT,
    where_to_buy TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger
CREATE TRIGGER handle_brands_updated_at
    BEFORE UPDATE ON public.brands
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON public.brands
    FOR SELECT USING (true);

-- Insert brands with available images
INSERT INTO public.brands (id, name, slug, category, year_founded, address, city, description, notable_products, where_to_buy, image_url, featured) VALUES

('aeromexico', 'Aeroméxico', 'aeromexico-aviation-san-luis-potosi', 'aviation', '1934', 'San Luis Potosí', 'San Luis Potosí', 'Mexico''s global airline carrier with extensive domestic and international routes, offering premium service and connectivity.', 'Domestic and international flights, cargo services', 'aeromexico.com', '/images/brands/aeromexico-logo.png', true),

('aguas-de-lourdes', 'Aguas de Lourdes', 'aguas-de-lourdes-beverages-san-luis-potosi', 'beverages', NULL, 'Calle Universidad 205', 'San Luis Potosí', 'Refreshing traditional Mexican aguas frescas and beverages made with natural ingredients.', 'Agua de jamaica, horchata, limón con chía', 'Puestos en el centro, mercados locales', '/images/brands/aguas-de-lourdes.jpg', true),

('bicicletas-mercurio', 'Bicicletas Mercurio', 'bicicletas-mercurio-automotive-san-luis-potosi', 'automotive', '1949', 'San Luis Potosí', 'San Luis Potosí', 'Historic bicycle manufacturer producing quality bicycles for Mexican families since 1949.', 'Bicicletas urbanas, bicicletas de montaña, bicicletas para niños', 'Tiendas deportivas, distribuidores autorizados', '/images/brands/bicicletas-mercurio.jpg', true),

('botanas-provi', 'Botanas Provi', 'botanas-provi-food-san-luis-potosi', 'food', NULL, 'Centro Histórico, San Luis Potosí', 'San Luis Potosí', 'Traditional Mexican snacks and treats made with authentic recipes passed down through generations.', 'Chicharrones, cacahuates, dulces típicos', 'Tiendas de abarrotes en SLP, mercado República', '/images/brands/botanas-provi.jpg', true),

('chocolates-costanzo', 'Chocolates Costanzo', 'chocolates-costanzo-food-san-luis-potosi', 'food', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Artisanal chocolate factory producing fine Mexican chocolates and traditional sweets with authentic Potosino recipes.', 'Chocolates, dulces tradicionales, bombones', 'Tiendas de dulces, mercados', '/images/brands/chocolates-costanzo.jpg', true),

('corazon-de-xoconostle', 'Corazón de Xoconostle', 'corazon-de-xoconostle-food-san-luis-potosi', 'food', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Innovative Potosino brand creating artisanal products from xoconostle, a traditional regional ingredient with unique flavor and health benefits.', 'Mermeladas de xoconostle, productos artesanales', 'Mercados locales, tiendas gourmet', '/images/brands/corazon-de-xoconostle-logo.png', true),

('la-gran-via', 'La Gran Vía', 'la-gran-via-food-san-luis-potosi', 'food', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Traditional Potosino bakery known for authentic Mexican pastries and breads made with time-honored recipes.', 'Pan dulce, conchas, bolillos, pasteles', 'Sucursales en San Luis Potosí', '/images/brands/la-gran-via-logo.jpg', true),

('la-legendaria', 'La Legendaria', 'la-legendaria-beverages-san-luis-potosi', 'beverages', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Craft beer brewery producing exceptional beers inspired by Potosino culture and Mexican brewing traditions.', 'Cervezas artesanales, seasonal brews', 'Bares locales, tiendas especializadas', '/images/brands/la-legendaria-logo.png', true),

('las-sevillanas', 'Las Sevillanas', 'las-sevillanas-food-san-luis-potosi', 'food', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Traditional bakery specializing in regional pastries and cookies that reflect Potosino culinary heritage.', 'Galletas tradicionales, polvorones, dulces regionales', 'Tiendas de dulces, mercados', '/images/brands/las-sevillanas.jpg', true),

('panaderia-la-superior', 'Panaderías La Superior', 'panaderias-la-superior-food-san-luis-potosi', 'food', '1950', 'Av. Carranza 150, Centro', 'San Luis Potosí', 'Artisanal bakery offering fresh bread, pastries, and traditional Mexican baked goods since 1950.', 'Pan dulce, conchas, birotes', 'Sucursales en toda la ciudad', '/images/brands/panaderia-la-superior.jpg', true),

('productos-don-tacho', 'Productos Don Tacho', 'productos-don-tacho-food-san-luis-potosi', 'food', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Producer of authentic regional foods including traditional mole, salsas, and dried chiles.', 'Mole potosino, salsas artesanales, chiles secos', 'Mercados locales, supermercados', '/images/brands/productos-don-tacho.jpg', true),

('ron-potosi', 'Ron Potosí', 'ron-potosi-beverages-san-luis-potosi', 'beverages', NULL, 'San Luis Potosí', 'San Luis Potosí', 'Distillery producing fine rum with a distinctive Potosino character and smooth finish.', 'Ron añejo, ron blanco, ron especiado', 'Licorerías, supermercados', '/images/brands/ron-potosi.jpg', true),

('san-luis-rey-tranvia', 'San Luis Rey Tranvía', 'san-luis-rey-tranvia-tourism-san-luis-potosi', 'tourism', NULL, 'Centro Histórico, San Luis Potosí', 'San Luis Potosí', 'Historic streetcar offering guided tours through the beautiful historic center of San Luis Potosí.', 'Tours turísticos, recorridos históricos', 'Centro Histórico, punto de partida Plaza de Armas', '/images/brands/san-luis-rey-tranvia-logo.jpg', true);

-- Create index on slug for faster lookups
CREATE INDEX idx_brands_slug ON public.brands(slug);
CREATE INDEX idx_brands_category ON public.brands(category);
CREATE INDEX idx_brands_featured ON public.brands(featured);
