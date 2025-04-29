-- Add business_category column to business_profiles table
ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS business_category TEXT; 