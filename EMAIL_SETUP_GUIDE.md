# Email Setup Guide for San Luis Way Contact Forms

## Current Issue
The contact form emails are not sending because the domain `sanluisway.com` does not have SMTP (email server) services configured. When the application tries to connect to `sanluisway.com` on standard email ports (25, 465, 587), the connection is refused.

## Diagnosis Results
- **Domain**: sanluisway.com
- **MX Records**: None configured
- **SMTP Ports Tested**: 25, 465, 587 - all refused connections
- **Error**: `connect ECONNREFUSED 64.23.130.119:25/465/587`

## Solutions (Choose One)

### Option 1: Use Gmail SMTP (Quick Setup)
**Best for**: Testing and small-scale use

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password
3. **Update .env file**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   SMTP_SECURE=false
   ```

### Option 2: Use SendGrid (Recommended for Production)
**Best for**: Production use, better deliverability

1. **Sign up** at https://sendgrid.com
2. **Create API Key** in SendGrid dashboard
3. **Update .env file**:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   SMTP_SECURE=false
   ```

### Option 3: Configure SMTP on Your Hosting Provider
**Best for**: Using your domain email

1. **Contact your hosting provider** (where sanluisway.com is hosted)
2. **Request SMTP service setup** for your domain
3. **Get SMTP credentials** from your provider
4. **Update .env file** with provided credentials

### Option 4: Use Mailgun
**Best for**: High-volume transactional emails

1. **Sign up** at https://www.mailgun.com
2. **Verify your domain** in Mailgun
3. **Get SMTP credentials** from Mailgun dashboard
4. **Update .env file**:
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your-mailgun-username
   SMTP_PASSWORD=your-mailgun-password
   SMTP_SECURE=false
   ```

## Current Code Status
✅ **Fixed Issues**:
- Fixed `createTransporter` → `createTransport` typo
- Added proper error handling and logging
- Added support for different SMTP configurations
- Disabled reCAPTCHA in development mode for testing

✅ **Working Features**:
- Contact form data collection
- Business information integration
- Form validation
- API endpoint structure

❌ **Remaining Issue**:
- SMTP server configuration needed

## Testing the Fix
After updating your SMTP credentials:

1. **Restart the development server**:
   ```bash
   npm run dev
   ```

2. **Test the API directly**:
   ```bash
   curl -X POST http://localhost:3000/api/contact/ \
     -H "Content-Type: application/json" \
     -d '{"name": "Test User", "email": "test@example.com", "subject": "Test Contact", "message": "Test message", "recaptchaToken": "test-token"}'
   ```

3. **Expected success response**:
   ```json
   {"message": "Email sent successfully"}
   ```

## Next Steps
1. Choose one of the SMTP solutions above
2. Update your `.env` file with the correct credentials
3. Test the contact form
4. Consider setting up proper domain email for production use

## Production Recommendations
- Use SendGrid or Mailgun for better deliverability
- Set up SPF, DKIM, and DMARC records for your domain
- Monitor email delivery rates and bounces
- Consider using your domain email address (info@sanluisway.com) as the "from" address even with third-party SMTP