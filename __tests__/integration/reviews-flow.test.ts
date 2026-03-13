import { createMockRequest, createMockResponse, createMockSupabaseClient } from '../helpers/api-test-helpers';

const mockSupabase = createMockSupabaseClient();

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createPagesServerClient: jest.fn(() => mockSupabase),
  createServerSupabaseClient: jest.fn(() => mockSupabase),
  createPagesBrowserClient: jest.fn(() => mockSupabase),
}));

jest.mock('@/lib/rate-limit', () => ({
  rateLimit: jest.fn(() => false),
  strictRateLimit: jest.fn(() => false),
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

import reviewHandler from '@/pages/api/reviews/create';

describe('Reviews Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/reviews/create', () => {
    it('returns 405 for non-POST methods', async () => {
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
    });

    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      const req = createMockRequest({
        method: 'POST',
        body: { place_id: '550e8400-e29b-41d4-a716-446655440000', rating: 5, text: 'Great place to visit!' },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res._json.error).toBe('Authentication required');
    });

    it('returns 400 for invalid input - missing place_id', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-1', email: 'a@b.com', user_metadata: {} } },
        },
        error: null,
      });

      const req = createMockRequest({
        method: 'POST',
        body: { rating: 5, text: 'Great place!' },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Invalid input');
    });

    it('returns 400 for invalid rating (out of range)', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-1', email: 'a@b.com', user_metadata: {} } },
        },
        error: null,
      });

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          rating: 6,
          text: 'Great place to visit!',
        },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Invalid input');
    });

    it('returns 400 for text too short', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-1', email: 'a@b.com', user_metadata: {} } },
        },
        error: null,
      });

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          rating: 4,
          text: 'Short',
        },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Invalid input');
    });

    it('creates review successfully and updates place rating', async () => {
      const placeId = '550e8400-e29b-41d4-a716-446655440000';
      const reviewData = {
        id: 'review-1',
        place_id: placeId,
        author: 'testuser',
        rating: 5,
        text: 'Excellent place to visit in San Luis!',
      };

      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'user-1', email: 'testuser@example.com', user_metadata: {} },
          },
        },
        error: null,
      });

      // Mock insert chain (reviews insert)
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: reviewData, error: null }),
      };

      // Mock select chain (reviews for avg rating)
      const selectChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
          data: [{ rating: 5 }, { rating: 4 }],
          error: null,
        }),
      };

      // Mock update chain (place rating update)
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      };

      mockSupabase.from
        .mockReturnValueOnce(insertChain)   // reviews insert
        .mockReturnValueOnce(selectChain)   // reviews select for avg
        .mockReturnValueOnce(updateChain);  // places update

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: placeId,
          rating: 5,
          text: 'Excellent place to visit in San Luis!',
        },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res._json).toMatchObject({ id: 'review-1', rating: 5 });
    });

    it('returns 500 when review insert fails', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: {
            user: { id: 'user-1', email: 'a@b.com', user_metadata: {} },
          },
        },
        error: null,
      });

      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database constraint violation' },
        }),
      };
      mockSupabase.from.mockReturnValueOnce(insertChain);

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          rating: 4,
          text: 'A solid review text that is long enough',
        },
      });
      const res = createMockResponse();

      await reviewHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res._json.error).toBe('Failed to create review');
    });
  });
});
