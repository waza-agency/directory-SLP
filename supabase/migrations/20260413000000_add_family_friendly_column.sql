-- Add family_friendly boolean column to events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS family_friendly BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN public.events.family_friendly IS 'Marks events suitable for families with children';
