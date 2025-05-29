-- Disable marketplace fields in places table
-- This migration comments out marketplace-related fields while preserving data

-- Add comments to indicate these fields are temporarily disabled
COMMENT ON COLUMN public.places.price IS 'MARKETPLACE DISABLED - Field temporarily inactive';
COMMENT ON COLUMN public.places.inventory IS 'MARKETPLACE DISABLED - Field temporarily inactive';
COMMENT ON COLUMN public.places.is_purchasable IS 'MARKETPLACE DISABLED - Field temporarily inactive';
COMMENT ON COLUMN public.places.sku IS 'MARKETPLACE DISABLED - Field temporarily inactive';

-- Set all places to non-purchasable
UPDATE public.places
SET is_purchasable = false
WHERE is_purchasable = true;

-- Add a note to the places table
COMMENT ON TABLE public.places IS 'Directory table for places in San Luis Potosí. Marketplace functionality temporarily disabled.';