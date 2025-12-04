// Global jest setup
import '@testing-library/jest-dom';

// Provide dummy env vars used by lib code to avoid runtime failures
process.env.NEXT_PUBLIC_SUPABASE_URL ||= 'http://localhost';
process.env.SUPABASE_SERVICE_ROLE_KEY ||= 'test-service-role-key';
process.env.GOOGLE_API_KEY ||= 'test-google-api-key';

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