-- Migration to add enhanced profile fields to users table

-- Add fields to the users table if they don't exist
DO $$ 
BEGIN
    -- Add profile_picture_url if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'profile_picture_url'
    ) THEN
        ALTER TABLE public.users ADD COLUMN profile_picture_url TEXT;
    END IF;

    -- Add bio if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'bio'
    ) THEN
        ALTER TABLE public.users ADD COLUMN bio TEXT;
    END IF;

    -- Add occupation if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'occupation'
    ) THEN
        ALTER TABLE public.users ADD COLUMN occupation TEXT;
    END IF;

    -- Add interests if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'interests'
    ) THEN
        ALTER TABLE public.users ADD COLUMN interests TEXT[];
    END IF;
END $$;

-- Add comments to the columns
COMMENT ON COLUMN public.users.profile_picture_url IS 'URL to the user profile picture';
COMMENT ON COLUMN public.users.bio IS 'User biography or description';
COMMENT ON COLUMN public.users.occupation IS 'User occupation or job title';
COMMENT ON COLUMN public.users.interests IS 'Array of user interests'; 