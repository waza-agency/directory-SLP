-- Add price and inventory fields to places table
ALTER TABLE places 
ADD COLUMN price DECIMAL(10, 2) NULL,
ADD COLUMN inventory INTEGER DEFAULT 0,
ADD COLUMN is_purchasable BOOLEAN DEFAULT FALSE,
ADD COLUMN sku VARCHAR(50) NULL;

-- Update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS update_places_updated_at ON places;
CREATE TRIGGER update_places_updated_at
BEFORE UPDATE ON places
FOR EACH ROW
EXECUTE FUNCTION update_updated_at(); 