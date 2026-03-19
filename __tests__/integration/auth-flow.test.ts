import { createMockRequest, createMockResponse, createMockSupabaseClient } from '../helpers/api-test-helpers';

// Mock Supabase auth helpers
const mockSupabase = createMockSupabaseClient();

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createServerSupabaseClient: jest.fn(() => mockSupabase),
  createPagesServerClient: jest.fn(() => mockSupabase),
  createPagesBrowserClient: jest.fn(() => mockSupabase),
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

import meHandler from '@/pages/api/user/me';

describe('Auth Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/user/me', () => {
    it('returns 405 for non-GET methods', async () => {
      const req = createMockRequest({ method: 'POST' });
      const res = createMockResponse();

      await meHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res._json).toEqual({ error: 'Method not allowed' });
    });

    it('returns 401 when no session exists', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await meHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res._json.error).toBe('not_authenticated');
    });

    it('returns user data when authenticated', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        account_type: 'user',
      };

      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'user-123', email: 'test@example.com' },
            access_token: 'token-abc',
          },
        },
        error: null,
      });

      // Mock the from().select().eq().single() chain
      const chain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockUser,
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(chain);

      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await meHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json.data).toMatchObject({
        id: 'user-123',
        email: 'test@example.com',
      });
    });

    it('returns 500 when user data fetch fails', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'user-123', email: 'test@example.com' },
            access_token: 'token-abc',
          },
        },
        error: null,
      });

      const chain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error', code: '500' },
        }),
      };
      mockSupabase.from.mockReturnValueOnce(chain);

      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await meHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res._json.error).toBe('Error fetching user data');
    });
  });
});
