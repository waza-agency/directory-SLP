-- Create marketplace_transactions table for tracking payments to businesses
CREATE TABLE IF NOT EXISTS marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  business_id UUID NOT NULL,
  business_user_id UUID NOT NULL,
  buyer_id UUID NOT NULL,
  product_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  stripe_fee DECIMAL(10, 2) NOT NULL,
  business_payout DECIMAL(10, 2) NOT NULL,
  stripe_connect_account_id TEXT,
  stripe_transfer_id TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS marketplace_transactions_order_id_idx ON marketplace_transactions(order_id);
CREATE INDEX IF NOT EXISTS marketplace_transactions_business_id_idx ON marketplace_transactions(business_id);
CREATE INDEX IF NOT EXISTS marketplace_transactions_buyer_id_idx ON marketplace_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS marketplace_transactions_status_idx ON marketplace_transactions(status);

-- Add comment to explain the purpose of the table
COMMENT ON TABLE marketplace_transactions IS 'Stores information about payments to businesses for marketplace sales'; 