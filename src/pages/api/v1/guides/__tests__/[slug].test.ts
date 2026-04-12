import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../[slug]';

function createMocks(method = 'GET', query: Record<string, string> = {}) {
  const req = { method, query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

describe('GET /api/v1/guides/:slug', () => {
  it('returns a guide by slug', async () => {
    const { req, res, status, json } = createMocks('GET', { slug: 'foodie-guide' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    expect(payload.ok).toBe(true);
    expect(payload.data).toMatchObject({ slug: 'foodie-guide' });
  });

  it('returns 404 for unknown slug', async () => {
    const { req, res, status, json } = createMocks('GET', { slug: 'does-not-exist' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false, error: expect.objectContaining({ code: 'NOT_FOUND' }) })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST', { slug: 'foodie-guide' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('resolves i18n keys — title is actual text', async () => {
    const { req, res, json } = createMocks('GET', { slug: 'family-activities' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data.title).toBe('Family Activities');
    expect(payload.data.title).not.toContain('homepage.');
  });

  it('resolves i18n in Spanish when lang=es', async () => {
    const { req, res, json } = createMocks('GET', { slug: 'family-activities', lang: 'es' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(typeof payload.data.title).toBe('string');
    expect(payload.data.title.length).toBeGreaterThan(0);
  });

  it('includes badge field', async () => {
    const { req, res, json } = createMocks('GET', { slug: 'foodie-guide' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data).toHaveProperty('badge');
    expect(typeof payload.data.badge).toBe('string');
  });

  it('sets cache headers on success', async () => {
    const { req, res, setHeader } = createMocks('GET', { slug: 'foodie-guide' });
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });
});
