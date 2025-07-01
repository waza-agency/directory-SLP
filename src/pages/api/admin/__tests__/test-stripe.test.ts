import { NextApiRequest, NextApiResponse } from 'next';
let handler: any;

// Add Stripe secret key mock at the top
beforeAll(async () => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_mockkey';

  const module = await import('nodemailer');
  handler = module.default;
});

// Update the test to mock Stripe API calls
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    subscriptions: {
      list: jest.fn().mockResolvedValue({
        data: [{
          id: 'sub_1',
          status: 'active',
          current_period_end: 1893456000,
          items: {
            data: [{
              price: {
                id: 'price_1',
                product: 'prod_1'
              }
            }]
          }
        }],
        has_more: false,
        url: '/v1/subscriptions'
      })
    }
  }));
});

// Mock the admin auth middleware
jest.mock('@/lib/admin-auth', () => ({
  withAdminApiAuth: (handler) => handler
}));

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
});

afterEach(() => {
  jest.clearAllMocks();
  delete process.env.STRIPE_SECRET_KEY;
});

const mockRequest = {
  method: 'POST',
  headers: {
    authorization: 'Bearer valid-token'
  }
} as unknown as NextApiRequest;

const mockResponse = () => {
  const res = {} as Partial<NextApiResponse>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as NextApiResponse;
};

describe('/api/admin/test-stripe', () => {
  it('should return Stripe connection status', async () => {
    const req = mockRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Stripe connection successful',
        subscriptionCount: expect.any(Number)
      })
    );
  });

  it('should handle missing Stripe key', async () => {
    // We need to re-import the handler after deleting the key
    // to ensure the module-level variable is updated
    delete process.env.STRIPE_SECRET_KEY;

    // Re-import to get a fresh handler with the updated environment
    const freshModule = await import('nodemailer');
    const freshHandler = freshModule.default;

    const req = mockRequest;
    const res = mockResponse();

    await freshHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Stripe configuration missing'
      })
    );
  });
});