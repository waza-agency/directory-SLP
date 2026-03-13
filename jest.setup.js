// Global jest setup
import '@testing-library/jest-dom';

// Provide dummy env vars used by lib code to avoid runtime failures
process.env.NEXT_PUBLIC_SUPABASE_URL ||= 'http://localhost';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY ||= 'test-service-role-key';
process.env.GOOGLE_API_KEY ||= 'test-google-api-key';
process.env.STRIPE_SECRET_KEY ||= 'sk_test_dummy';
process.env.STRIPE_WEBHOOK_SECRET ||= 'whsec_test';
process.env.NEXT_PUBLIC_SITE_URL ||= 'http://localhost:3000';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn()
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null)
  }),
}));