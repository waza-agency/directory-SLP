-- Add business_category column to business_profiles table
-- This migration adds the business_category column that is referenced in the signup process

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Add business_category column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'business_profiles' 
        AND column_name = 'business_category'
    ) THEN
        ALTER TABLE public.business_profiles ADD COLUMN business_category TEXT;
    END IF;
END $$; 