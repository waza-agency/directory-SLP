import { createMockRequest, createMockResponse } from '../helpers/api-test-helpers';

// Use shared mutable refs that jest.mock factories can capture
const mocks = {
  stripeSessionCreate: jest.fn(),
  couponsRetrieve: jest.fn(),
  supabaseFrom: jest.fn(),
};

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: { create: (...args: any[]) => mocks.stripeSessionCreate(...args) },
    },
    coupons: { retrieve: (...args: any[]) => mocks.couponsRetrieve(...args) },
  }));
});

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: (...args: any[]) => mocks.supabaseFrom(...args),
  })),
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

import subscriptionHandler from '@/pages/api/subscriptions/create-subscription';

describe('Subscription Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mocks.stripeSessionCreate.mockResolvedValue({
      id: 'cs_test_session_123',
      url: 'https://checkout.stripe.com/pay/cs_test_session_123',
    });
  });

  describe('POST /api/subscriptions/create-subscription', () => {
    it('returns 405 for non-POST methods', async () => {
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res._json.message).toBe('Method not allowed');
    });

    it('returns 400 when missing required fields', async () => {
      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'monthly' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.message).toContain('Missing required fields');
    });

    it('returns 404 when user not found', async () => {
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'monthly', user_id: 'nonexistent-user' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res._json.message).toContain('User not found');
    });

    it('creates monthly subscription checkout successfully', async () => {
      // Mock user lookup
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-123', email: 'user@example.com' },
          error: null,
        }),
      });

      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'monthly', user_id: 'user-123' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res._json).toMatchObject({
        message: 'Checkout session created successfully',
        sessionId: 'cs_test_session_123',
      });
      expect(mocks.stripeSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          mode: 'subscription',
          customer_email: 'user@example.com',
          metadata: expect.objectContaining({ userId: 'user-123', interval: 'monthly' }),
        })
      );
    });

    it('creates yearly subscription checkout successfully', async () => {
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-456', email: 'yearly@example.com' },
          error: null,
        }),
      });

      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'yearly', user_id: 'user-456' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mocks.stripeSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({ interval: 'yearly' }),
        })
      );
    });

    it('validates and applies coupon code', async () => {
      // Mock user lookup
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-789', email: 'coupon@example.com' },
          error: null,
        }),
      });

      // Mock coupon lookup
      const couponChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'coupon-db-1',
            coupon_code: 'SAVE20',
            stripe_coupon_id: 'stripe_coupon_123',
            is_active: true,
          },
          error: null,
        }),
      };
      mocks.supabaseFrom.mockReturnValueOnce(couponChain);

      // Mock usage check (no existing usage)
      const usageChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      };
      mocks.supabaseFrom.mockReturnValueOnce(usageChain);

      mocks.couponsRetrieve.mockResolvedValueOnce({
        valid: true,
        times_redeemed: 0,
        max_redemptions: 100,
      });

      const req = createMockRequest({
        method: 'POST',
        body: {
          plan: 'monthly',
          user_id: 'user-789',
          coupon_code: 'SAVE20',
        },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mocks.stripeSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          discounts: [{ coupon: 'stripe_coupon_123' }],
        })
      );
    });

    it('rejects already-used coupon', async () => {
      // Mock user lookup
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-789', email: 'coupon@example.com' },
          error: null,
        }),
      });

      // Mock coupon lookup
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'c1', coupon_code: 'USED', stripe_coupon_id: 'sc_1', is_active: true },
          error: null,
        }),
      });

      // Mock usage check - coupon already used
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'usage-1', user_id: 'user-789', coupon_code: 'USED' },
          error: null,
        }),
      });

      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'monthly', user_id: 'user-789', coupon_code: 'USED' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res._json.message).toContain('already used');
    });

    it('returns 500 when Stripe session creation fails', async () => {
      mocks.supabaseFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 'user-123', email: 'user@example.com' },
          error: null,
        }),
      });

      mocks.stripeSessionCreate.mockRejectedValueOnce(new Error('Stripe API error'));

      const req = createMockRequest({
        method: 'POST',
        body: { plan: 'monthly', user_id: 'user-123' },
      });
      const res = createMockResponse();

      await subscriptionHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
