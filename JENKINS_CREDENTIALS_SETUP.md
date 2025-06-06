# Jenkins Credentials Setup Guide

To avoid hardcoding sensitive information in the Jenkinsfile, you need to set up credentials in Jenkins.

## Required Credentials

Go to **Jenkins Dashboard > Manage Jenkins > Credentials > System > Global credentials** and add the following **Secret text** credentials:

### Supabase Credentials
| Credential ID | Value |
|---------------|-------|
| `SUPABASE_URL` | `https://omxporaecrqsqhzjzvnx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Use your actual Supabase anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Use your actual Supabase service role key) |

### Stripe Credentials
| Credential ID | Value |
|---------------|-------|
| `STRIPE_SECRET_KEY` | `sk_live_...` (Use your actual Stripe secret key) |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (Use your actual Stripe publishable key) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (Use your actual Stripe webhook secret) |

### Other Credentials
| Credential ID | Value |
|---------------|-------|
| `RECAPTCHA_SECRET_KEY` | `6Lfe7QArAAAAA...` (Use your actual reCAPTCHA secret key) |
| `SMTP_PASSWORD` | `Your-SMTP-Password` (Use your actual SMTP password) |

## Steps to Add Credentials

1. **Login to Jenkins** as an administrator
2. **Navigate to**: Jenkins Dashboard → Manage Jenkins → Credentials
3. **Click on**: System → Global credentials → Add Credentials
4. **For each credential**:
   - **Kind**: Secret text
   - **Scope**: Global
   - **Secret**: [paste the actual value from your environment]
   - **ID**: [use the exact ID from the table above]
   - **Description**: [optional, but helpful for identification]
5. **Click**: OK

## Where to Find Your Actual Values

If you need to find your actual credential values, check your existing `.env` file or the environment variables you used when manually deploying:

```bash
# Your actual values should look like this pattern:
NEXT_PUBLIC_SUPABASE_URL=https://omxporaecrqsqhzjzvnx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Alternative: Using .env File Approach

If you prefer to use a `.env` file in your Jenkins environment, you can:

1. Create a `.env` file in your Jenkins workspace
2. Update the deployment script to use it
3. Remove the `withCredentials` block from Jenkinsfile

## Testing

After setting up credentials, trigger a Jenkins build to verify that:
1. All credentials are properly loaded
2. The deployment script receives the environment variables
3. The application starts successfully with all integrations working

## Security Notes

- ✅ **Credentials are encrypted** in Jenkins
- ✅ **Not visible in build logs**
- ✅ **Access controlled by Jenkins permissions**
- ⚠️ **Remember to rotate keys regularly**