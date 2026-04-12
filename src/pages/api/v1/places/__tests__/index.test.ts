import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({
      data: [{ id: '1', name: 'La Oruga y La Cebra', category: 'food', city: 'San Luis Potosí' }],
      error: null,
    }),
  },
}));

function createMocks(method = 'GET', query: Record<string, string> = {}) {
  const req = { method, query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

describe('GET /api/v1/places', () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: [{ id: '1', name: 'La Oruga y La Cebra', category: 'food', city: 'San Luis Potosí' }],
          error: null,
        }),
      },
    }));
    handler = require('../index').default;
  });

  it('returns places list in standard envelope', async () => {
    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        data: expect.any(Array),
        source: 'sanluisway.com',
      })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('returns 400 for invalid limit param', async () => {
    const { req, res, status, json } = createMocks('GET', { limit: 'bad' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  it('returns 400 when limit is a non-numeric string', async () => {
    const { req, res, status } = createMocks('GET', { limit: 'abc' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
  });

  it('includes meta with total and limit', async () => {
    const { req, res, json } = createMocks('GET', { limit: '5' });
    await handler(req, res);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({ limit: 5 }),
      })
    );
  });

  it('sets cache headers on success', async () => {
    const { req, res, setHeader } = createMocks('GET');
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });
});
