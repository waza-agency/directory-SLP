# Facebook Lead Ads → Beehiiv Integration

## Overview
This integration automatically adds Facebook Lead Ad submissions to your Beehiiv subscriber list.

## Setup Steps

### 1. Create Facebook App (if you don't have one)
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app → Select "Business" type
3. Add the "Webhooks" product to your app
4. Add the "Facebook Login" product (needed for access token)

### 2. Configure Environment Variables
Add these to your `.env` file:

```env
FACEBOOK_WEBHOOK_VERIFY_TOKEN=your_random_string_here
FACEBOOK_ACCESS_TOKEN=your_page_access_token
```

**Generate verify token:** Use any random string (e.g., `slw_fb_verify_2025`)

**Get Page Access Token:**
1. Go to Graph API Explorer: https://developers.facebook.com/tools/explorer/
2. Select your app
3. Add permissions: `pages_manage_ads`, `leads_retrieval`, `pages_show_list`
4. Generate token and exchange for long-lived token

### 3. Deploy Your Site
Deploy to Netlify so the webhook URL is live:
```
https://www.sanluisway.com/api/newsletter/facebook-lead-webhook
```

### 4. Configure Webhook in Facebook
1. Go to your Facebook App Dashboard
2. Webhooks → Page → Subscribe
3. Configure:
   - **Callback URL:** `https://www.sanluisway.com/api/newsletter/facebook-lead-webhook`
   - **Verify Token:** Same as `FACEBOOK_WEBHOOK_VERIFY_TOKEN` in your .env
4. Subscribe to the `leadgen` field

### 5. Subscribe Your Page
1. In Graph API Explorer, run:
```
POST /{page-id}/subscribed_apps?subscribed_fields=leadgen&access_token={page_access_token}
```

### 6. Test the Integration
1. Create a test Lead Ad or use Facebook's Lead Ads Testing Tool
2. Submit a test lead
3. Check Beehiiv dashboard for new subscriber
4. Check Netlify function logs for any errors

## Webhook Endpoint Details

**URL:** `/api/newsletter/facebook-lead-webhook`

**GET Request (Verification):**
- Facebook sends `hub.mode`, `hub.verify_token`, `hub.challenge`
- Returns challenge if token matches

**POST Request (Lead Notification):**
- Receives lead notification with `leadgen_id`
- Fetches full lead data from Graph API
- Adds subscriber to Beehiiv with:
  - `utm_source`: `facebook_ads`
  - `utm_medium`: `lead_ad`

## Troubleshooting

**Webhook not verifying?**
- Check `FACEBOOK_WEBHOOK_VERIFY_TOKEN` matches exactly
- Ensure site is deployed and URL is accessible

**Leads not appearing in Beehiiv?**
- Check Netlify function logs for errors
- Verify `FACEBOOK_ACCESS_TOKEN` has correct permissions
- Token may have expired (use long-lived token)

**Permission errors?**
- Ensure you have `leads_retrieval` permission
- Page must be linked to the Facebook App
