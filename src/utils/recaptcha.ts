export function getRecaptchaSiteKey(): string {
  // Use the public site key from environment variables
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
}

export function isRecaptchaConfigured(): boolean {
  // Check if the site key is present
  return Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
}