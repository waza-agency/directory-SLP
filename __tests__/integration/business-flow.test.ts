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

import businessProfileHandler from '@/pages/api/user/business-profile';
import listingCreateHandler from '@/pages/api/listings/create';

describe('Business Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/user/business-profile', () => {
    it('returns 405 for non-GET methods', async () => {
      const req = createMockRequest({ method: 'POST' });
      const res = createMockResponse();

      await businessProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
    });

    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await businessProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res._json.error).toBe('not_authenticated');
    });

    it('returns business profile for authenticated user', async () => {
      const mockProfile = {
        id: 'bp-1',
        user_id: 'user-1',
        business_name: 'Restaurante SLP',
        subscription_status: 'active',
        active_listings_count: 3,
      };

      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-1' } },
        },
        error: null,
      });

      const chain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(chain);

      const req = createMockRequest({ method: 'GET', query: {} });
      const res = createMockResponse();

      await businessProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json).toMatchObject({
        id: 'bp-1',
        business_name: 'Restaurante SLP',
      });
    });

    it('returns 404 when no business profile exists', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-new' } },
        },
        error: null,
      });

      const chain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { code: 'PGRST116', message: 'No rows returned' },
        }),
      };
      mockSupabase.from.mockReturnValueOnce(chain);

      const req = createMockRequest({ method: 'GET', query: {} });
      const res = createMockResponse();

      await businessProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res._json.error).toBe('not_found');
    });

    it('prevents non-admin access to other user profiles', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-viewer' } },
        },
        error: null,
      });

      // Mock user lookup for admin check
      const userChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-viewer', account_type: 'user' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(userChain);

      const req = createMockRequest({
        method: 'GET',
        query: { user_id: 'other-user' },
      });
      const res = createMockResponse();

      await businessProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res._json.error).toBe('forbidden');
    });
  });

  describe('POST /api/listings/create', () => {
    it('returns 405 for non-POST methods', async () => {
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
    });

    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      const req = createMockRequest({ method: 'POST', body: {} });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('returns 403 when no active subscription', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-nosub' } },
        },
        error: null,
      });

      // Mock business profile (no active subscription)
      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'bp-1', user_id: 'user-nosub', subscription_status: 'inactive' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(profileChain);

      // Mock subscription check (none found)
      const subChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(subChain);

      const req = createMockRequest({
        method: 'POST',
        body: { title: 'Test', description: 'Test listing', category: 'food' },
      });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res._json.error).toBe('subscription_required');
    });

    it('returns 400 when required fields are missing', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-active' } },
        },
        error: null,
      });

      // Mock business profile with active subscription
      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'bp-1', subscription_status: 'active' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(profileChain);

      // Mock listing count
      const countChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 2, error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(countChain);

      const req = createMockRequest({
        method: 'POST',
        body: { title: 'Test' }, // Missing description and category
      });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('creates listing successfully with active subscription', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-active' } },
        },
        error: null,
      });

      // Mock business profile with active subscription
      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'bp-1', subscription_status: 'active' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(profileChain);

      // Mock listing count
      const countChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 3, error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(countChain);

      // Mock listing insert
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'listing-new',
            title: 'Tacos El Patrón',
            category: 'food',
          },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(insertChain);

      // Mock profile update (listings count)
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(updateChain);

      const req = createMockRequest({
        method: 'POST',
        body: {
          title: 'Tacos El Patrón',
          description: 'Best tacos in San Luis Potosí',
          category: 'food',
          price: 150,
          city: 'San Luis Potosí',
        },
      });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res._json).toMatchObject({
        success: true,
        data: expect.objectContaining({ title: 'Tacos El Patrón' }),
      });
    });

    it('enforces listing limit of 10', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: {
          session: { user: { id: 'user-max' } },
        },
        error: null,
      });

      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'bp-max', subscription_status: 'active' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(profileChain);

      // Mock listing count at max
      const countChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 10, error: null }),
      };
      mockSupabase.from.mockReturnValueOnce(countChain);

      const req = createMockRequest({
        method: 'POST',
        body: {
          title: 'One too many',
          description: 'This should be rejected',
          category: 'food',
        },
      });
      const res = createMockResponse();

      await listingCreateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res._json.error).toBe('listings_limit_reached');
    });
  });
});
