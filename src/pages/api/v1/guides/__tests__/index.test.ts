import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../index';

function createMocks(method = 'GET', query: Record<string, string> = {}) {
  const req = { method, query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

describe('GET /api/v1/guides', () => {
  it('returns guides list in standard envelope', async () => {
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

  it('filters guides by tag', async () => {
    const { req, res, json } = createMocks('GET', { tag: 'family' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.ok).toBe(true);
    const data = payload.data as Array<{ tags: string[] }>;
    expect(data.length).toBeGreaterThan(0);
    data.forEach((g) => expect(g.tags).toContain('family'));
  });

  it('returns empty array for tag with no matches', async () => {
    const { req, res, json } = createMocks('GET', { tag: 'nonexistent-tag-xyz' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.ok).toBe(true);
    expect(payload.data).toHaveLength(0);
  });

  it('resolves i18n keys — returns string titles for all guides', async () => {
    const { req, res, json } = createMocks('GET');
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    const data = payload.data as Array<{ title: string; slug: string }>;
    expect(data.length).toBeGreaterThan(0);
    data.forEach((g) => {
      // titles must be non-empty strings
      expect(typeof g.title).toBe('string');
      expect(g.title.length).toBeGreaterThan(0);
    });
    // guides with homepage.* keys should resolve to real text
    const familyGuide = data.find((g) => g.slug === 'family-activities');
    expect(familyGuide?.title).toBe('Family Activities');
  });

  it('includes meta with total and limit', async () => {
    const { req, res, json } = createMocks('GET', { limit: '3' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.meta).toMatchObject({ limit: 3 });
    expect(payload.data.length).toBeLessThanOrEqual(3);
  });

  it('sets cache headers on success', async () => {
    const { req, res, setHeader } = createMocks('GET');
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });

  it('returns 400 for invalid limit param', async () => {
    const { req, res, status } = createMocks('GET', { limit: 'bad' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
  });
});
