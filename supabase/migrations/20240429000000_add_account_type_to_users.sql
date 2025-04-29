-- Migration to add account_type column to users table

-- First, create the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Check if users table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        -- Create users table with all required columns
        CREATE TABLE public.users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            phone TEXT,
            address TEXT,
            city TEXT,
            country TEXT,
            zip_code TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            stripe_customer_id TEXT UNIQUE,
            is_admin BOOLEAN DEFAULT false NOT NULL,
            account_type VARCHAR(20) DEFAULT 'user' NOT NULL
        );

        -- Add RLS policies for the new users table
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

        -- Policy: Users can read all user profiles
        CREATE POLICY "Users can read all user profiles" ON public.users
            FOR SELECT USING (true);

        -- Policy: Users can update only their own profile
        CREATE POLICY "Users can update own profile" ON public.users
            FOR UPDATE USING (auth.uid() = id);

        -- Policy: System can create user profiles
        CREATE POLICY "System can create user profiles" ON public.users
            FOR INSERT WITH CHECK (auth.uid() = id);

        -- Create trigger for updated_at
        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON public.users
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

        RAISE NOTICE 'Created users table with account_type column';
    ELSE
        -- Check if account_type column exists
        IF NOT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'users' 
            AND column_name = 'account_type'
        ) THEN
            -- Add account_type column if it doesn't exist
            ALTER TABLE public.users
            ADD COLUMN account_type VARCHAR(20) DEFAULT 'user' NOT NULL;
            
            -- Add comment to the column
            COMMENT ON COLUMN public.users.account_type IS 'Type of account (user or business)';
            
            -- Update existing records to have the default 'user' value
            UPDATE public.users
            SET account_type = 'user'
            WHERE account_type IS NULL;
            
            RAISE NOTICE 'Added account_type column to existing users table';
        ELSE
            RAISE NOTICE 'account_type column already exists in users table';
        END IF;
    END IF;
END
$$; 