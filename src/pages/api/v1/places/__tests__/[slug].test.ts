import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: { id: '1', name: 'La Oruga y La Cebra', category: 'food', reviews: [] },
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

describe('GET /api/v1/places/[slug]', () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        ilike: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: '1', name: 'La Oruga y La Cebra', category: 'food', reviews: [] },
          error: null,
        }),
      },
    }));
    handler = require('../[slug]').default;
  });

  it('returns place detail in standard envelope', async () => {
    const { req, res, status, json } = createMocks('GET', { slug: 'la-oruga-y-la-cebra' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        data: expect.objectContaining({ name: 'La Oruga y La Cebra' }),
        source: 'sanluisway.com',
      })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST', { slug: 'la-oruga-y-la-cebra' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('returns 400 when slug is missing', async () => {
    const { req, res, status, json } = createMocks('GET', {});
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  it('returns 404 when place is not found', async () => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        ilike: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
      },
    }));
    const notFoundHandler = require('../[slug]').default;
    const { req, res, status, json } = createMocks('GET', { slug: 'nonexistent-place' });
    await notFoundHandler(req, res);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        error: expect.objectContaining({ code: 'NOT_FOUND' }),
      })
    );
  });

  it('sets cache headers on success', async () => {
    const { req, res, setHeader } = createMocks('GET', { slug: 'la-oruga-y-la-cebra' });
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });
});
