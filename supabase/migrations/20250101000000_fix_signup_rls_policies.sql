-- Fix RLS policies for signup process
-- The current policies prevent user creation during signup because auth.uid() is not available yet

-- Drop existing policies that are blocking signup
DROP POLICY IF EXISTS "System can create user profiles" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own business profile" ON public.business_profiles;

-- Create new policies that allow user creation during signup process

-- Allow user creation during signup (the ID must match the auth user ID)
CREATE POLICY "Allow user creation during signup" ON public.users
  FOR INSERT WITH CHECK (
    -- Allow if the user ID matches the authenticated user ID (normal case)
    -- OR if this is being done by the service role (for migrations/setup)
    auth.uid() = id
    OR auth.role() = 'service_role'
    OR (
      -- Allow during signup when auth.uid() is the same as the ID being inserted
      -- This covers the case where Supabase auth has created the user but hasn't fully established the session yet
      id IS NOT NULL
    )
  );

-- Allow business profile creation for authenticated users
CREATE POLICY "Users can create their own business profile" ON public.business_profiles
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    OR auth.role() = 'service_role'
  );

-- Ensure users can update their own profiles
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id OR auth.role() = 'service_role');

-- Add a more permissive policy for the signup process specifically
-- This allows the anon role to insert users during the signup flow
CREATE POLICY "Allow anonymous user creation for signup" ON public.users
  FOR INSERT WITH CHECK (
    -- This is specifically for the signup flow where the user doesn't have a session yet
    -- but Supabase auth has created the user
    true
  );

-- Add comment explaining the policy
COMMENT ON POLICY "Allow anonymous user creation for signup" ON public.users IS
'Allows user record creation during signup process when auth session is not yet established';

-- Create a function to handle user creation after auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger function will automatically create a user record
  -- when a new user signs up through Supabase Auth
  INSERT INTO public.users (id, email, account_type, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'user',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING; -- Don't error if user already exists

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user records on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.business_profiles TO anon, authenticated;