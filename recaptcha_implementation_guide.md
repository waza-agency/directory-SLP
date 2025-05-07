# reCAPTCHA Implementation Guide

This guide explains how to implement the reCAPTCHA fix across all service pages to resolve the "Missing required parameters: sitekey" error.

## Steps to Fix All Service Pages

1. Make sure the `recaptcha.js` utility file is created in the `src/utils/` directory with the following content:

```javascript
/**
 * Utility functions for working with Google reCAPTCHA
 */

/**
 * Get the reCAPTCHA site key from environment variables
 * Falls back to Google's test key in development mode
 */
export const getRecaptchaSiteKey = () => {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 
    (process.env.NODE_ENV === 'development' ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' : '');
};

/**
 * Check if reCAPTCHA is properly configured
 */
export const isRecaptchaConfigured = () => {
  return !!getRecaptchaSiteKey();
};
```

2. Update each service page that uses reCAPTCHA by following these steps:

   a. Import the utility functions:
   ```javascript
   import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
   ```

   b. Replace the reCAPTCHA component with:
   ```jsx
   <div className="flex justify-center">
     {isRecaptchaConfigured() ? (
       <ReCAPTCHA
         ref={recaptchaRef}
         sitekey={getRecaptchaSiteKey()}
         onChange={handleRecaptchaChange}
       />
     ) : (
       <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6">
         ReCAPTCHA verification is not currently available. Please try again later or contact us directly.
       </div>
     )}
   </div>
   ```

   c. Ensure error states are properly handled:
   ```jsx
   {submitStatus === 'error' && (
     <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
       <p>There was an error submitting your request. Please try again.</p>
     </div>
   )}
   ```

## Service Pages to Update

The following service pages need to be updated:

1. ✅ `src/pages/san-luis-potosi-housing-services/index.tsx` (already updated)
2. ✅ `src/pages/san-luis-potosi-wellness-services/index.tsx` (already updated)
3. `src/pages/san-luis-potosi-experiences/index.tsx`
4. `src/pages/san-luis-potosi-legal-administrative/index.tsx`
5. `src/pages/san-luis-potosi-home-services/index.tsx`
6. `src/pages/san-luis-potosi-community-integration/index.tsx`
7. `src/pages/san-luis-potosi-cultural-services/index.tsx`
8. `src/pages/san-luis-potosi-family-support/index.tsx`
9. `src/pages/local-connections/index.tsx`

## For Production Environment

In production, you should set the actual reCAPTCHA keys in your environment variables:

1. Create a proper `.env` file with:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
   RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
   ```

2. If deploying to Vercel or another platform, add these environment variables in your project settings.

3. Test thoroughly in production to ensure the reCAPTCHA is working correctly.

## Obtaining reCAPTCHA Keys

If you need to obtain proper reCAPTCHA keys:

1. Go to https://www.google.com/recaptcha/admin
2. Sign in with your Google account
3. Register a new site:
   - Choose reCAPTCHA v2 "I'm not a robot" Checkbox type
   - Add your domains (both development and production)
   - Accept the terms
4. You'll receive a Site Key and a Secret Key
5. Add these to your environment variables 