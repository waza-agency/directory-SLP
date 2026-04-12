import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({
      data: [{ id: '1', title: 'Fenapo 2026', start_date: '2026-08-01' }],
      error: null,
    }),
    single: jest.fn().mockResolvedValue({
      data: { id: '1', title: 'Fenapo 2026', description: 'Annual fair' },
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

describe('GET /api/v1/events/[slug]', () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        ilike: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: '1', title: 'Fenapo 2026', description: 'Annual fair' },
          error: null,
        }),
      },
    }));
    handler = require('../[slug]').default;
  });

  it('returns event detail in standard envelope', async () => {
    const { req, res, status, json } = createMocks('GET', { slug: 'fenapo-2026' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        data: expect.objectContaining({ title: 'Fenapo 2026' }),
        source: 'sanluisway.com',
      })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST', { slug: 'fenapo-2026' });
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

  it('returns 404 when event is not found', async () => {
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
    const { req, res, status, json } = createMocks('GET', { slug: 'nonexistent-event' });
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
    const { req, res, setHeader } = createMocks('GET', { slug: 'fenapo-2026' });
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });
});
