import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Creates a mock NextApiRequest for testing API routes.
 */
export function createMockRequest(overrides: Partial<NextApiRequest> = {}): NextApiRequest {
  return {
    method: 'GET',
    headers: {},
    query: {},
    body: {},
    cookies: {},
    socket: { remoteAddress: '127.0.0.1' } as any,
    ...overrides,
  } as unknown as NextApiRequest;
}

/**
 * Creates a mock NextApiResponse with jest spies for status, json, etc.
 */
export function createMockResponse(): NextApiResponse & {
  _status: number;
  _json: any;
  _headers: Record<string, string | number>;
} {
  const res: any = {
    _status: 200,
    _json: null,
    _headers: {} as Record<string, string | number>,
  };

  res.status = jest.fn((code: number) => {
    res._status = code;
    return res;
  });

  res.json = jest.fn((data: any) => {
    res._json = data;
    return res;
  });

  res.send = jest.fn((data: any) => {
    res._json = data;
    return res;
  });

  res.end = jest.fn(() => res);

  res.setHeader = jest.fn((key: string, value: string | number) => {
    res._headers[key] = value;
    return res;
  });

  res.getHeader = jest.fn((key: string) => res._headers[key]);

  return res as NextApiResponse & {
    _status: number;
    _json: any;
    _headers: Record<string, string | number>;
  };
}

/**
 * Creates a mock Supabase client with chainable query methods.
 */
export function createMockSupabaseClient(overrides: Record<string, any> = {}) {
  const mockChain = (resolvedValue: { data: any; error: any }) => {
    const chain: any = {};
    const methods = ['select', 'insert', 'update', 'upsert', 'delete', 'eq', 'neq',
      'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in', 'or', 'and',
      'order', 'limit', 'range', 'single', 'maybeSingle'];

    methods.forEach(method => {
      chain[method] = jest.fn().mockReturnValue(chain);
    });

    // Terminal methods resolve the value
    chain.single = jest.fn().mockResolvedValue(resolvedValue);
    chain.maybeSingle = jest.fn().mockResolvedValue(resolvedValue);

    // Make the chain itself thenable (for await without terminal method)
    chain.then = (resolve: Function) => resolve(resolvedValue);

    return chain;
  };

  const defaultData = { data: null, error: null };

  return {
    from: jest.fn(() => mockChain(defaultData)),
    rpc: jest.fn().mockResolvedValue(defaultData),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signUp: jest.fn().mockResolvedValue({ data: null, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ data: null, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: jest.fn().mockResolvedValue({ data: null, error: null }),
      updateUser: jest.fn().mockResolvedValue({ data: null, error: null }),
    },
    ...overrides,
  };
}

/**
 * Creates a mock Stripe instance for testing.
 */
export function createMockStripe() {
  return {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'cs_test_123', url: 'https://checkout.stripe.com/test' }),
        retrieve: jest.fn().mockResolvedValue({ id: 'cs_test_123', payment_status: 'paid' }),
        listLineItems: jest.fn().mockResolvedValue({ data: [] }),
      },
    },
    subscriptions: {
      retrieve: jest.fn().mockResolvedValue({ id: 'sub_test_123', status: 'active' }),
      update: jest.fn().mockResolvedValue({ id: 'sub_test_123', cancel_at_period_end: true }),
      cancel: jest.fn().mockResolvedValue({ id: 'sub_test_123', status: 'canceled' }),
    },
    coupons: {
      retrieve: jest.fn().mockResolvedValue({ id: 'coupon_test', valid: true, times_redeemed: 0 }),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  };
}
