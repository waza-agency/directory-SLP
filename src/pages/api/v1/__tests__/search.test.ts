import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({ data: [], error: null }),
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

describe('GET /api/v1/search', () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: [], error: null }),
      },
    }));
    handler = require('../search').default;
  });

  it('returns results in standard envelope for valid query', async () => {
    const { req, res, status, json } = createMocks('GET', { q: 'hiking' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        data: expect.any(Array),
        source: 'sanluisway.com',
        meta: expect.objectContaining({ limit: expect.any(Number) }),
      })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status, json } = createMocks('POST', { q: 'hiking' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ ok: false }));
  });

  it('returns 400 when q is missing', async () => {
    const { req, res, status, json } = createMocks('GET', {});
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        error: expect.objectContaining({ code: 'INVALID_PARAMS' }),
      })
    );
  });

  it('returns 400 when q is too short (1 char)', async () => {
    const { req, res, status, json } = createMocks('GET', { q: 'a' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  it('respects type=outdoor filter — returns only outdoor results', async () => {
    const { req, res, status, json } = createMocks('GET', { q: 'hiking', type: 'outdoor' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ type: string }>;
    data.forEach((item) => expect(item.type).toBe('outdoor'));
  });

  it('respects type=culture filter — returns only culture results', async () => {
    const { req, res, status, json } = createMocks('GET', { q: 'history', type: 'culture' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ type: string }>;
    data.forEach((item) => expect(item.type).toBe('culture'));
  });

  it('respects type=guides filter — returns only guide results', async () => {
    const { req, res, status, json } = createMocks('GET', { q: 'family', type: 'guides' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ type: string }>;
    data.forEach((item) => expect(item.type).toBe('guide'));
  });

  it('all results have required shape (type, slug, title)', async () => {
    const { req, res, json } = createMocks('GET', { q: 'san luis', type: 'all' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ type: string; slug: string; title: string }>;
    data.forEach((item) => {
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('slug');
      expect(item).toHaveProperty('title');
    });
  });

  it('sets cache headers on successful response', async () => {
    const { req, res, setHeader } = createMocks('GET', { q: 'hiking' });
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });

  it('respects limit param', async () => {
    const { req, res, json } = createMocks('GET', { q: 'san', limit: '2' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data.length).toBeLessThanOrEqual(2);
    expect(payload.meta).toMatchObject({ limit: 2 });
  });

  it('returns events from Supabase when type=events', async () => {
    jest.resetModules();
    jest.mock('@/lib/api/supabase-admin', () => ({
      supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: [{ title: 'Fenapo 2026', description: 'Big fair', category: 'fair', start_date: '2026-08-01' }],
          error: null,
        }),
      },
    }));
    handler = require('../search').default;

    const { req, res, status, json } = createMocks('GET', { q: 'fenapo', type: 'events' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ type: string; title: string }>;
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].type).toBe('event');
    expect(data[0].title).toBe('Fenapo 2026');
  });
});
