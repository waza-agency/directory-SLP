import { createMockRequest, createMockResponse } from '../helpers/api-test-helpers';

// Mock dependencies before importing handler
const mockInsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();
const mockRpc = jest.fn().mockResolvedValue({ error: null });

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: mockInsert.mockReturnValue({
        select: mockSelect.mockReturnValue({
          single: mockSingle,
        }),
      }),
    })),
    rpc: mockRpc,
  })),
}));

jest.mock('@/lib/rate-limit', () => ({
  rateLimit: jest.fn(() => false),
  strictRateLimit: jest.fn(() => false),
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

// Set env vars needed by handler
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.NODE_ENV = 'test';

import contactHandler from '@/pages/api/contact';

describe('Contact Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSingle.mockResolvedValue({
      data: {
        id: 'inquiry-1',
        customer_name: 'Test User',
        created_at: '2026-01-01T00:00:00Z',
      },
      error: null,
    });
  });

  describe('POST /api/contact', () => {
    it('returns 405 for non-POST methods', async () => {
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
    });

    it('returns 400 for missing required fields', async () => {
      const req = createMockRequest({
        method: 'POST',
        body: { message: 'hello' },
      });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.message).toBe('Invalid input');
    });

    it('returns 400 for invalid email format', async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'not-an-email',
          message: 'Hello there',
        },
      });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.message).toBe('Invalid input');
    });

    it('successfully saves contact inquiry', async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'María García',
          email: 'maria@example.com',
          phone: '+52 444 123 4567',
          subject: 'Consulting about tours',
          message: 'I would like to book a tour in San Luis Potosí',
        },
      });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json.data).toBeDefined();
      expect(res._json.data.contact_id).toBe('inquiry-1');
    });

    it('saves inquiry with business-specific fields', async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'John Smith',
          email: 'john@example.com',
          subject: 'Booking inquiry',
          businessId: '550e8400-e29b-41d4-a716-446655440000',
          businessName: 'Hotel Boutique SLP',
          businessTitle: 'Premium Room',
          listingCategory: 'accommodation',
          groupSize: '4',
          preferredDates: '2026-04-15',
        },
      });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockInsert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            customer_name: 'John Smith',
            customer_email: 'john@example.com',
            additional_data: expect.objectContaining({
              businessId: '550e8400-e29b-41d4-a716-446655440000',
              businessName: 'Hotel Boutique SLP',
            }),
          }),
        ])
      );
    });

    it('returns 500 when database insert fails', async () => {
      mockSingle.mockResolvedValueOnce({
        data: null,
        error: { message: 'Database connection failed' },
      });

      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
        },
      });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res._json.message).toBe('Failed to store contact inquiry');
    });

    it('handles CORS preflight OPTIONS request', async () => {
      const req = createMockRequest({ method: 'OPTIONS' });
      const res = createMockResponse();

      await contactHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Methods',
        'POST, OPTIONS'
      );
    });
  });
});
