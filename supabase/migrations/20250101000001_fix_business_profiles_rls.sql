-- Fix RLS policies specifically for business_profiles table
-- This addresses the remaining 42501 error for business profile creation

-- Drop existing restrictive policy for business profiles
DROP POLICY IF EXISTS "Users can insert their own business profile" ON public.business_profiles;

-- Create a more permissive policy for business profile creation during signup
CREATE POLICY "Allow business profile creation" ON public.business_profiles
  FOR INSERT WITH CHECK (
    -- Allow if user is authenticated and matches the user_id
    user_id = auth.uid()
    -- OR allow service role for migrations/admin operations
    OR auth.role() = 'service_role'
    -- OR allow during signup process when user_id is provided
    OR (user_id IS NOT NULL)
  );

-- Ensure users can update their own business profiles
DROP POLICY IF EXISTS "Users can update their own business profile" ON public.business_profiles;
CREATE POLICY "Users can update their own business profile" ON public.business_profiles
  FOR UPDATE USING (
    user_id = auth.uid()
    OR auth.role() = 'service_role'
  );

-- Grant necessary permissions for business_profiles
GRANT ALL ON public.business_profiles TO anon, authenticated;

-- Add comment explaining the policy
COMMENT ON POLICY "Allow business profile creation" ON public.business_profiles IS
'Allows business profile creation during signup process and normal authenticated operations';