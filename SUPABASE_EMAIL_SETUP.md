# Supabase Email Service Setup

This project uses Supabase's built-in email service for sending contact form emails. This leverages the same email infrastructure that Supabase Auth uses for verification emails.

## How It Works

The system uses:
- **Supabase Edge Functions** to handle email requests
- **PostgreSQL functions** to queue emails in the database
- **Supabase's built-in email service** (same as auth emails)

This approach is simpler and more integrated since you're already using Supabase for user verification emails.

## Setup Instructions

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Run the Database Migration

Apply the migration that creates the email queue and functions:

```bash
supabase db push
```

This will create:
- `email_queue` table to store outgoing emails
- `send_custom_email()` PostgreSQL function
- Proper permissions and policies

### 4. Deploy the Email Edge Function

```bash
supabase functions deploy send-email
```

### 5. Test the Email Function

You can test the email function by making a POST request to:
`https://omxporaecrqsqhzjzvnx.supabase.co/functions/v1/send-email`

With the following JSON body:
```json
{
  "to": "test@example.com",
  "subject": "Test Email",
  "html": "<h1>Test</h1><p>This is a test email from San Luis Way</p>",
  "from": "San Luis Way <info@sanluisway.com>",
  "replyTo": "customer@example.com"
}
```

## Email Features

### Enhanced Business Lead Emails

The new email system sends beautifully formatted emails to businesses that include:

- **San Luis Way Branding**: Clear identification that the lead came through the platform
- **Lead Alert**: Prominent notification that this is a new customer lead
- **Customer Information**: Name, email, phone, and inquiry details
- **Business Context**: Which listing/service the customer is interested in
- **Next Steps**: Clear instructions on how to respond to the customer
- **Reply-To**: Customer's email is set as reply-to for easy response

### Email Content Types

The system supports different types of inquiries:
- General business inquiries
- Cultural experience requests
- Relocation support requests
- Local connections services

Each type includes relevant fields and information specific to that service.

## Benefits of Using Supabase's Built-in Email Service

1. **Consistency**: Uses the same email service as your auth verification emails
2. **No External Dependencies**: No need for additional API keys or services
3. **Cost-Effective**: Included with your Supabase plan
4. **Integrated**: Seamlessly works with your existing Supabase setup
5. **Reliable**: Same deliverability as your user verification emails
6. **Simple Setup**: No additional configuration required

## Email Queue System

Emails are queued in the `email_queue` table with the following statuses:
- `pending`: Email is queued and waiting to be sent
- `sent`: Email has been successfully sent
- `failed`: Email sending failed

You can monitor email delivery by querying this table in your Supabase dashboard.

## Troubleshooting

- **Function not found**: Make sure you've deployed the function with `supabase functions deploy send-email`
- **Permission errors**: Ensure the database migration has been applied with `supabase db push`
- **Email not delivered**: Check the `email_queue` table for status and error messages
- **Auth emails work but contact emails don't**: Verify the Edge Function is deployed and the database migration is applied

## Monitoring Emails

You can monitor email delivery through the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to "Table Editor"
3. Select the `email_queue` table
4. Check the `status` column for delivery status

This provides visibility into all contact form emails sent through your system.