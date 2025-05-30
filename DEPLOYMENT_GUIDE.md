# 🚀 San Luis Way - Deployment Guide

## 🐛 Fixed Docker Build Issue

**Problem**: Docker build was failing with "No such file or directory" error when trying to clean test files.

**Solution**: Updated Dockerfile to handle missing test directories gracefully.

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Make sure these variables are configured in your deployment environment:

#### Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production domain)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

#### Email Configuration (choose one):
- `RESEND_API_KEY` (recommended)
- OR `GMAIL_USER` + `GMAIL_APP_PASSWORD`

#### Optional:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MONTHLY_PRICE_ID`
- `STRIPE_YEARLY_PRICE_ID`

### 2. Build Configuration
- ✅ **Dockerfile fixed**: Now handles missing test directories
- ✅ **Docker-compose updated**: Includes new email environment variables
- ✅ **Node version**: Using Node 18 Alpine

### 3. Production Settings

For production deployment, update your environment:
- Set `NODE_ENV=production`
- Use your production domain in `NEXT_PUBLIC_SITE_URL`
- Ensure Supabase is configured for production use

## 🔧 Troubleshooting

### Docker Build Fails
If you still get build errors:
1. Check that all environment variables are set
2. Ensure Docker has sufficient resources
3. Try building locally first: `docker build -t slp-directory .`

### Email Not Working in Production
1. Verify `RESEND_API_KEY` is set correctly
2. For Resend: Verify domain at resend.com/domains
3. For Gmail: Use app-specific password, not regular password

### Contact Form Issues
1. Check Supabase connection and service role key
2. Verify reCAPTCHA keys match your domain
3. Check browser console for client-side errors

## 📞 Contact System Status
- ✅ Database: Contact inquiries are saved
- ✅ Email: Resend integration working (limited to verified emails in free plan)
- ✅ Fallback: Gmail SMTP configured
- ✅ reCAPTCHA: Spam protection enabled
- ✅ Translations: English/Spanish support

## 🎯 Next Steps After Deployment
1. Test contact form functionality
2. Verify emails are received
3. Set up domain verification for Resend (if using)
4. Monitor error logs for any issues