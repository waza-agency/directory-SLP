import { createMockRequest, createMockResponse } from '../helpers/api-test-helpers';

// Shared mutable mock refs - avoids jest.mock hoisting issues
const mocks = {
  constructEvent: jest.fn(),
  listLineItems: jest.fn().mockResolvedValue({ data: [] }),
  supabaseBrowserFrom: jest.fn(),
  supabaseAdminFrom: jest.fn(),
};

jest.mock('micro', () => ({
  buffer: jest.fn().mockResolvedValue(Buffer.from('raw-body')),
}));

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: { constructEvent: (...args: any[]) => mocks.constructEvent(...args) },
    checkout: { sessions: { listLineItems: (...args: any[]) => mocks.listLineItems(...args) } },
  }));
});

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: (...args: any[]) => mocks.supabaseAdminFrom(...args),
  })),
}));

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createPagesBrowserClient: jest.fn(() => ({
    from: (...args: any[]) => mocks.supabaseBrowserFrom(...args),
  })),
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: (...args: any[]) => mocks.supabaseBrowserFrom(...args),
  },
}));

jest.mock('@/lib/logger', () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

import webhookHandler from '@/pages/api/webhook/stripe';

describe('Stripe Webhook Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const req = createMockRequest({ method: 'GET' });
    const res = createMockResponse();

    await webhookHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('returns 400 when signature verification fails', async () => {
    mocks.constructEvent.mockImplementationOnce(() => {
      throw new Error('Invalid signature');
    });

    const req = createMockRequest({
      method: 'POST',
      headers: { 'stripe-signature': 'sig_invalid' },
    });
    const res = createMockResponse();

    await webhookHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('handles checkout.session.completed - creates new order', async () => {
    mocks.constructEvent.mockReturnValueOnce({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_completed',
          payment_status: 'paid',
          amount_total: 5000,
          metadata: { user_id: 'user-123' },
          customer_details: { email: 'buyer@example.com' },
          payment_intent: 'pi_test_123',
          mode: 'payment',
        },
      },
    });

    // Mock existing order check - not found
    const existingOrderChain = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
    };
    mocks.supabaseBrowserFrom.mockReturnValueOnce(existingOrderChain);

    // Mock order insert
    const insertChain = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: 'order-new', order_number: 'SLP-123456', status: 'completed' },
        error: null,
      }),
    };
    mocks.supabaseBrowserFrom.mockReturnValueOnce(insertChain);

    const req = createMockRequest({
      method: 'POST',
      headers: { 'stripe-signature': 'sig_valid' },
    });
    const res = createMockResponse();

    await webhookHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  it('handles checkout.session.completed - updates existing order', async () => {
    mocks.constructEvent.mockReturnValueOnce({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_existing',
          payment_status: 'paid',
          metadata: { user_id: 'user-123' },
          mode: 'payment',
        },
      },
    });

    // Mock existing order check - found
    const existingOrderChain = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: 'order-existing', status: 'pending' },
        error: null,
      }),
    };
    mocks.supabaseBrowserFrom.mockReturnValueOnce(existingOrderChain);

    // Mock order update
    const updateChain = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: 'order-existing', status: 'completed' },
        error: null,
      }),
    };
    mocks.supabaseBrowserFrom.mockReturnValueOnce(updateChain);

    const req = createMockRequest({
      method: 'POST',
      headers: { 'stripe-signature': 'sig_valid' },
    });
    const res = createMockResponse();

    await webhookHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  it('handles unrecognized event types gracefully', async () => {
    mocks.constructEvent.mockReturnValueOnce({
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_test' } },
    });

    const req = createMockRequest({
      method: 'POST',
      headers: { 'stripe-signature': 'sig_valid' },
    });
    const res = createMockResponse();

    await webhookHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ received: true });
  });

  it('handles subscription created event', async () => {
    mocks.constructEvent.mockReturnValueOnce({
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_test_new',
          customer: 'cus_test_123',
          status: 'active',
          current_period_end: Math.floor(Date.now() / 1000) + 86400 * 30,
        },
      },
    });

    // Mock user lookup by stripe_customer_id
    mocks.supabaseAdminFrom.mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: 'user-sub-1' },
        error: null,
      }),
    });

    // Mock business profile lookup
    mocks.supabaseAdminFrom.mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: 'bp-1', user_id: 'user-sub-1' },
        error: null,
      }),
    });

    // Mock business profile update
    mocks.supabaseAdminFrom.mockReturnValueOnce({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    });

    // Mock subscriptions table upsert
    mocks.supabaseAdminFrom.mockReturnValueOnce({
      upsert: jest.fn().mockResolvedValue({ error: null }),
    });

    const req = createMockRequest({
      method: 'POST',
      headers: { 'stripe-signature': 'sig_valid' },
    });
    const res = createMockResponse();

    await webhookHandler(req, res);

    // Subscription events don't explicitly return json on success, they break
    // The handler should not have returned a 500
    expect(res.status).not.toHaveBeenCalledWith(500);
  });
});
