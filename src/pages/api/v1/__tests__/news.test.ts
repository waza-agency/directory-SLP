import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../news';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

import { supabaseAdmin } from '@/lib/api/supabase-admin';

const mockFrom = supabaseAdmin.from as jest.Mock;

function buildChain(result: { data: unknown; error: unknown }) {
  const chain = {
    select: jest.fn(),
    eq: jest.fn(),
    order: jest.fn(),
    limit: jest.fn().mockResolvedValue(result),
  };
  chain.select.mockReturnValue(chain);
  chain.eq.mockReturnValue(chain);
  chain.order.mockReturnValue(chain);
  return chain;
}

function createMocks(method = 'GET', query: Record<string, string> = {}) {
  const req = { method, query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

const sampleHeadlines = [
  {
    id: '1',
    text_en: 'English title',
    text_es: 'Título en español',
    text_de: 'Deutscher Titel',
    text_ja: '日本語タイトル',
    summary_en: 'English summary',
    summary_es: 'Resumen en español',
    summary_de: 'Deutsche Zusammenfassung',
    summary_ja: '日本語の要約',
    source: 'Test Source',
    source_url: 'https://example.com',
    created_at: '2026-04-11T00:00:00Z',
  },
];

describe('GET /api/v1/news', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns news in standard envelope with default lang=en', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    expect(payload.ok).toBe(true);
    expect(payload.source).toBe('sanluisway.com');
    expect(payload.data[0].title).toBe('English title');
    expect(payload.meta).toMatchObject({ total: 1, limit: 20 });
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('returns 400 for invalid limit param', async () => {
    const { req, res, status } = createMocks('GET', { limit: 'bad' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
  });

  it('returns localized title for lang=es', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, json } = createMocks('GET', { lang: 'es' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data[0].title).toBe('Título en español');
  });

  it('returns localized title for lang=de', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, json } = createMocks('GET', { lang: 'de' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data[0].title).toBe('Deutscher Titel');
  });

  it('returns localized title for lang=ja', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, json } = createMocks('GET', { lang: 'ja' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.data[0].title).toBe('日本語タイトル');
  });

  it('respects limit param', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, json } = createMocks('GET', { limit: '5' });
    await handler(req, res);
    const payload = json.mock.calls[0][0];
    expect(payload.meta).toMatchObject({ limit: 5 });
  });

  it('returns 500 on DB error', async () => {
    mockFrom.mockReturnValue(buildChain({ data: null, error: { message: 'DB failure' } }));
    const { req, res, status } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(500);
  });

  it('sets cache headers on success', async () => {
    mockFrom.mockReturnValue(buildChain({ data: sampleHeadlines, error: null }));
    const { req, res, setHeader } = createMocks('GET');
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage')
    );
  });
});
