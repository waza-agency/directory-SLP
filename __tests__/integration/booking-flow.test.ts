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

import createHandler from '@/pages/api/bookings/create';
import listHandler from '@/pages/api/bookings/list';
import cancelHandler from '@/pages/api/bookings/cancel';

describe('Booking Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/bookings/create', () => {
    it('returns 405 for non-POST methods', async () => {
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(405);
    });

    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });
      const req = createMockRequest({ method: 'POST', body: {} });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('returns 400 for invalid input', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });
      const req = createMockRequest({
        method: 'POST',
        body: { place_id: 'not-a-uuid' },
      });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Invalid input');
    });

    it('returns 400 for past booking date', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });
      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          booking_date: '2020-01-01',
          booking_time: '19:00',
          party_size: 2,
          contact_name: 'Test',
          contact_email: 'test@example.com',
        },
      });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Booking must be in the future');
    });

    it('returns 404 when place does not exist', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      // Mock place lookup - not found
      const placeChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      };
      mockSupabase.from.mockReturnValueOnce(placeChain);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const dateStr = futureDate.toISOString().split('T')[0];

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          booking_date: dateStr,
          booking_time: '19:00',
          party_size: 4,
          contact_name: 'María García',
          contact_email: 'maria@example.com',
        },
      });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('creates booking successfully', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      // Mock place exists
      const placeChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Restaurant SLP' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(placeChain);

      // Mock booking insert
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'booking-1',
            place_id: '550e8400-e29b-41d4-a716-446655440000',
            booking_date: '2026-04-15',
            booking_time: '19:00',
            party_size: 4,
            status: 'pending',
          },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(insertChain);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const dateStr = futureDate.toISOString().split('T')[0];

      const req = createMockRequest({
        method: 'POST',
        body: {
          place_id: '550e8400-e29b-41d4-a716-446655440000',
          booking_date: dateStr,
          booking_time: '19:00',
          party_size: 4,
          contact_name: 'María García',
          contact_email: 'maria@example.com',
          contact_phone: '+52 444 123 4567',
          notes: 'Window seat preferred',
        },
      });
      const res = createMockResponse();
      await createHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res._json.data).toBeDefined();
      expect(res._json.data.status).toBe('pending');
    });
  });

  describe('GET /api/bookings/list', () => {
    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();
      await listHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('returns user bookings', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      const chain: any = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: [
            { id: 'b1', booking_date: '2026-04-15', status: 'pending', places: { name: 'Cafe SLP' } },
            { id: 'b2', booking_date: '2026-04-20', status: 'confirmed', places: { name: 'Hotel SLP' } },
          ],
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(chain);

      const req = createMockRequest({ method: 'GET', query: {} });
      const res = createMockResponse();
      await listHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json).toHaveLength(2);
    });
  });

  describe('POST /api/bookings/cancel', () => {
    it('returns 401 when not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });
      const req = createMockRequest({ method: 'POST', body: {} });
      const res = createMockResponse();
      await cancelHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('returns 400 when booking_id is missing', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });
      const req = createMockRequest({ method: 'POST', body: {} });
      const res = createMockResponse();
      await cancelHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 404 when booking not found', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      const findChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      };
      mockSupabase.from.mockReturnValueOnce(findChain);

      const req = createMockRequest({
        method: 'POST',
        body: { booking_id: 'nonexistent' },
      });
      const res = createMockResponse();
      await cancelHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('prevents cancelling already cancelled booking', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      const findChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'b1', status: 'cancelled', user_id: 'user-1' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(findChain);

      const req = createMockRequest({
        method: 'POST',
        body: { booking_id: 'b1' },
      });
      const res = createMockResponse();
      await cancelHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.error).toBe('Booking is already cancelled');
    });

    it('cancels booking successfully', async () => {
      mockSupabase.auth.getSession.mockResolvedValueOnce({
        data: { session: { user: { id: 'user-1' } } },
        error: null,
      });

      // Find booking
      const findChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'b1', status: 'pending', user_id: 'user-1' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(findChain);

      // Update booking
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'b1', status: 'cancelled' },
          error: null,
        }),
      };
      mockSupabase.from.mockReturnValueOnce(updateChain);

      const req = createMockRequest({
        method: 'POST',
        body: { booking_id: 'b1' },
      });
      const res = createMockResponse();
      await cancelHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json.data.status).toBe('cancelled');
    });
  });
});
