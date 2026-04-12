import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../exchange-rates';

function createMocks(method = 'GET') {
  const req = { method, query: {} } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

const mockFetchResponse = (body: unknown) =>
  Promise.resolve({ json: () => Promise.resolve(body) } as Response);

const sampleRates = {
  base: 'MXN',
  date: '2026-04-11',
  rates: { USD: 0.049, EUR: 0.045, GBP: 0.039, JPY: 7.42, CNY: 0.356 },
};

describe('GET /api/v1/exchange-rates', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns exchange rates in standard envelope', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(mockFetchResponse(sampleRates));
    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        source: 'sanluisway.com',
        data: expect.objectContaining({
          base: 'MXN',
          rates: expect.objectContaining({ USD: 0.049, EUR: 0.045 }),
          date: '2026-04-11',
          updated_at: expect.any(String),
        }),
      })
    );
  });

  it('rejects non-GET methods with 405', async () => {
    const { req, res, status } = createMocks('POST');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('sets 10-minute cache headers on success', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(mockFetchResponse(sampleRates));
    const { req, res, setHeader } = createMocks('GET');
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage=600')
    );
  });

  it('returns empty rates object when API returns nothing', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(mockFetchResponse({ date: '2026-04-11' }));
    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    const payload = json.mock.calls[0][0];
    expect(payload.data.rates).toEqual({});
  });

  it('returns 500 when fetch throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    const { req, res, status } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(500);
  });
});
