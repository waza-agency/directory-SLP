-- Add rainy-day tag to indoor activities
UPDATE places
SET tags = COALESCE(tags, '{}') || '{"rainy-day"}'
WHERE
  -- Art and cultural centers
  (name ILIKE '%centro de las artes%' OR
   name ILIKE '%museo%' OR
   name ILIKE '%gallery%' OR
   name ILIKE '%theatre%' OR
   name ILIKE '%teatro%') OR
  -- Indoor sports and activities
  (name ILIKE '%climbing%' OR
   name ILIKE '%gym%' OR
   name ILIKE '%fitness%') OR
  -- Entertainment venues
  (name ILIKE '%board game%' OR
   name ILIKE '%juegos de mesa%' OR
   name ILIKE '%arcade%') OR
  -- Educational/Workshop venues
  (name ILIKE '%workshop%' OR
   name ILIKE '%taller%' OR
   name ILIKE '%cooking class%' OR
   name ILIKE '%clase de cocina%') OR
  -- Indoor shopping
  (name ILIKE '%mall%' OR
   name ILIKE '%plaza comercial%' OR
   name ILIKE '%shopping center%');

-- Verify the update
SELECT name, tags
FROM places
WHERE tags ? 'rainy-day';