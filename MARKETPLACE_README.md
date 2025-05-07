# Directory SLP Marketplace Setup

This document explains how to set up and configure the marketplace functionality for Directory SLP. The marketplace allows sellers to register, list products, and receive payments through Stripe Connect.

## Implemented Features

- Seller onboarding with Stripe Connect
- Marketplace product management
- Automated payments and commission handling (5% platform fee)
- Seller dashboard with sales stats and transaction history
- Marketplace checkout flow

## Prerequisites

Before starting, you need to:

1. Have a Stripe account with Connect functionality enabled
2. Create a Stripe Connect application in the Stripe Dashboard
3. Set up webhook endpoints

## Environment Variables

Add the following variables to your `.env` file:

```
# Existing Stripe variables
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Stripe Connect - for marketplace functionality
STRIPE_PLATFORM_ACCOUNT=acct_your_platform_account_id
STRIPE_CONNECT_CLIENT_ID=ca_your_connect_client_id
```

## Database Setup

A migration file has been created at `supabase/migrations/20240615_marketplace.sql`. Run this migration against your Supabase database to set up the necessary tables and fields.

This migration will:
- Add seller fields to the users table
- Create the seller_products table
- Create the marketplace_transactions table
- Set up the necessary RLS policies

## Stripe Configuration

### In your Stripe Dashboard:

1. **Create a Connect Application**:
   - Go to Stripe Dashboard > Connect > Settings
   - Set up your Connect application branding
   - Configure the OAuth redirects to your domain:
     - `https://yourdomain.com/account/seller`

2. **Configure Webhook Endpoints**:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add an endpoint pointing to `https://yourdomain.com/api/webhook/stripe`
   - Subscribe to the following events:
     - `checkout.session.completed`
     - `account.updated`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

3. **Testing Stripe Connect**:
   - Use Stripe's test mode to test the seller onboarding flow
   - Use test cards like `4242 4242 4242 4242` for payments

## User Flow

1. **Seller Registration**:
   - User navigates to `/account/seller`
   - User connects their Stripe account
   - User completes Stripe's onboarding process

2. **Adding Products**:
   - Seller navigates to `/account/seller/add-product`
   - Seller fills out product information and uploads images
   - Products appear in the marketplace

3. **Purchasing Products**:
   - Buyer adds products to cart
   - Buyer completes checkout with Stripe
   - Platform automatically takes 5% commission
   - Funds are transferred to seller's Stripe account

## Commission Structure

The platform charges a 5% commission on all marketplace sales:

- 5% goes to the platform
- Stripe processing fees (typically 2.9% + 30¢) are covered by the seller
- The rest of the payment goes to the seller

This structure can be customized by modifying the `PLATFORM_FEE_PERCENTAGE` constant in `src/pages/api/checkout/process-marketplace-payment.ts`.

## Testing the Marketplace

1. Create at least two accounts:
   - A seller account
   - A buyer account

2. With the seller account:
   - Go to `/account/seller`
   - Connect to Stripe
   - Add some products

3. With the buyer account:
   - Browse products
   - Add products to cart
   - Complete checkout

4. Verify in Stripe Dashboard:
   - That payments were processed
   - That transfers were made to the connected account

## Troubleshooting

- **Webhook Errors**: Check your STRIPE_WEBHOOK_SECRET is correctly set
- **Payment Failures**: Ensure the connected account has completed all requirements
- **Missing Transfers**: Check the marketplace_transactions table for records with 'failed' status 