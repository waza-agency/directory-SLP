import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../weather';

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

describe('GET /api/v1/weather', () => {
  const originalKey = process.env.OPENWEATHERMAP_API_KEY;

  beforeEach(() => {
    process.env.OPENWEATHERMAP_API_KEY = 'test-key';
  });

  afterEach(() => {
    process.env.OPENWEATHERMAP_API_KEY = originalKey;
    jest.restoreAllMocks();
  });

  it('returns weather data in standard envelope', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(
      mockFetchResponse({
        main: { temp: 22.5, feels_like: 21.0, humidity: 40 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 3.5 },
      })
    );

    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        source: 'sanluisway.com',
        data: expect.objectContaining({
          temperature: 22.5,
          feels_like: 21.0,
          humidity: 40,
          condition: 'Clear',
          description: 'clear sky',
          wind_speed: 3.5,
          city: 'San Luis Potosí',
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

  it('returns 503 when OPENWEATHERMAP_API_KEY is not set', async () => {
    delete process.env.OPENWEATHERMAP_API_KEY;
    const { req, res, status, json } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(503);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        error: expect.objectContaining({ code: 'SERVICE_UNAVAILABLE' }),
      })
    );
  });

  it('sets 3-minute cache headers on success', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(
      mockFetchResponse({
        main: { temp: 25, feels_like: 24, humidity: 35 },
        weather: [{ main: 'Sunny', description: 'sunny' }],
        wind: { speed: 2 },
      })
    );

    const { req, res, setHeader } = createMocks('GET');
    await handler(req, res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage=180')
    );
  });

  it('returns 500 when fetch throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    const { req, res, status } = createMocks('GET');
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(500);
  });
});
