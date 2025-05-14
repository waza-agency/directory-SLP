-- Clean up pending orders that are older than 24 hours
DELETE FROM orders
WHERE status = 'pending'
AND created_at < NOW() - INTERVAL '24 hours';

-- Drop the constraint if it exists and recreate it
DO $$
BEGIN
    -- Try to drop the constraint if it exists
    ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

    -- Create the constraint
    ALTER TABLE orders
    ADD CONSTRAINT orders_status_check
    CHECK (status IN ('completed', 'processing', 'cancelled'));

EXCEPTION
    WHEN others THEN
        -- If there's any error, just log it and continue
        RAISE NOTICE 'Error updating constraint: %', SQLERRM;
END $$;