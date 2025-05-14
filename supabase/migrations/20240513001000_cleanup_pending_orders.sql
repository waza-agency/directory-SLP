-- Update any existing pending orders to completed status
UPDATE orders
SET
  status = 'completed',
  payment_status = COALESCE(payment_status, 'processing'),
  updated_at = NOW()
WHERE status = 'pending' OR status = 'awaiting_payment';

-- Add a check constraint to prevent invalid status values
DO $$
BEGIN
    -- Try to drop the constraint if it exists
    ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

    -- Create the constraint
    ALTER TABLE orders
    ADD CONSTRAINT orders_status_check
    CHECK (status IN ('completed', 'cancelled'));

EXCEPTION
    WHEN others THEN
        -- If there's any error, just log it and continue
        RAISE NOTICE 'Error updating constraint: %', SQLERRM;
END $$;