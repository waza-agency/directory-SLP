-- Add slug column to brands table for SEO-friendly URLs
ALTER TABLE brands ADD COLUMN slug VARCHAR(255);

-- Create unique index on slug for performance and uniqueness
CREATE UNIQUE INDEX idx_brands_slug ON brands(slug);

-- Update existing brands with SEO-friendly slugs
-- Note: You'll need to run a script to populate these based on name, category, and city

-- Example updates for common Potosino brands:
UPDATE brands SET slug = 'botanas-provi-food-san-luis-potosi' WHERE name ILIKE '%botanas%provi%';
UPDATE brands SET slug = 'panaderias-la-superior-food-san-luis-potosi' WHERE name ILIKE '%panader%superior%';
UPDATE brands SET slug = 'aguas-de-lourdes-beverages-san-luis-potosi' WHERE name ILIKE '%aguas%lourdes%';
UPDATE brands SET slug = 'chocolates-costanzo-food-san-luis-potosi' WHERE name ILIKE '%chocolates%costanzo%';
UPDATE brands SET slug = 'quesos-carranco-food-san-luis-potosi' WHERE name ILIKE '%quesos%carranco%';
UPDATE brands SET slug = 'cajeta-coronado-food-san-luis-potosi' WHERE name ILIKE '%cajeta%coronado%';
UPDATE brands SET slug = 'bicicletas-mercurio-automotive-san-luis-potosi' WHERE name ILIKE '%bicicletas%mercurio%';
UPDATE brands SET slug = 'canels-food-san-luis-potosi' WHERE name ILIKE '%canel%';

-- Make slug column NOT NULL after populating
ALTER TABLE brands ALTER COLUMN slug SET NOT NULL;