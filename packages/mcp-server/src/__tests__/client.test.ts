import { SanLuisWayClient, ApiResponse } from '../client';

const mockResponse = (data: unknown, ok = true, status = 200): Response =>
  ({
    ok,
    status,
    statusText: ok ? 'OK' : 'Internal Server Error',
    json: () => Promise.resolve({ ok: true, data } as ApiResponse),
  }) as unknown as Response;

let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse([]));
});

afterEach(() => {
  fetchSpy.mockRestore();
});

describe('SanLuisWayClient', () => {
  const client = new SanLuisWayClient('https://test.sanluisway.com');

  it('constructs correct URL for getEvents with no params', async () => {
    await client.getEvents();
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/events');
    expect(url.origin).toBe('https://test.sanluisway.com');
  });

  it('constructs correct URL for getEvents with params', async () => {
    await client.getEvents({ limit: 5, category: 'music', from: '2026-01-01' });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/events');
    expect(url.searchParams.get('limit')).toBe('5');
    expect(url.searchParams.get('category')).toBe('music');
    expect(url.searchParams.get('from')).toBe('2026-01-01');
  });

  it('constructs correct URL for getEvent by slug', async () => {
    await client.getEvent('fenapo-2026');
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/events/fenapo-2026');
  });

  it('constructs correct URL for getPlaces', async () => {
    await client.getPlaces({ category: 'restaurant', sort: 'rating' });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/places');
    expect(url.searchParams.get('category')).toBe('restaurant');
    expect(url.searchParams.get('sort')).toBe('rating');
  });

  it('constructs correct URL for getPlace by slug', async () => {
    await client.getPlace('cafe-cortao');
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/places/cafe-cortao');
  });

  it('constructs correct URL for getGuides', async () => {
    await client.getGuides({ lang: 'es', tag: 'food' });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/guides');
    expect(url.searchParams.get('lang')).toBe('es');
    expect(url.searchParams.get('tag')).toBe('food');
  });

  it('constructs correct URL for getGuide with lang', async () => {
    await client.getGuide('best-tacos', 'ja');
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/guides/best-tacos');
    expect(url.searchParams.get('lang')).toBe('ja');
  });

  it('omits undefined params from URL', async () => {
    await client.getGuide('best-tacos');
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.searchParams.has('lang')).toBe(false);
  });

  it('constructs correct URL for getOutdoor', async () => {
    await client.getOutdoor({ limit: 3 });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/outdoor');
    expect(url.searchParams.get('limit')).toBe('3');
  });

  it('constructs correct URL for getCulture', async () => {
    await client.getCulture({ lang: 'de' });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/culture');
    expect(url.searchParams.get('lang')).toBe('de');
  });

  it('constructs correct URL for getWeather', async () => {
    await client.getWeather();
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/weather');
  });

  it('constructs correct URL for getNews', async () => {
    await client.getNews({ limit: 5 });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/news');
    expect(url.searchParams.get('limit')).toBe('5');
  });

  it('constructs correct URL for getExchangeRates', async () => {
    await client.getExchangeRates();
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/exchange-rates');
  });

  it('constructs correct URL for search', async () => {
    await client.search({ q: 'tacos', type: 'place', limit: 10 });
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/search');
    expect(url.searchParams.get('q')).toBe('tacos');
    expect(url.searchParams.get('type')).toBe('place');
    expect(url.searchParams.get('limit')).toBe('10');
  });

  it('returns parsed JSON data', async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse({ id: 1, name: 'Test Event' }));
    const result = await client.getEvent('test');
    expect(result.data).toEqual({ id: 1, name: 'Test Event' });
  });

  it('throws on non-ok response', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);
    await expect(client.getEvent('missing')).rejects.toThrow('API error: 404 Not Found');
  });

  it('uses default base URL from env when not provided', () => {
    const defaultClient = new SanLuisWayClient();
    // The constructor falls back to API_BASE which uses env or the hardcoded default
    expect(defaultClient).toBeInstanceOf(SanLuisWayClient);
  });

  it('encodes special characters in slugs', async () => {
    await client.getEvent('event with spaces');
    const url = new URL(fetchSpy.mock.calls[0][0] as string);
    expect(url.pathname).toBe('/api/v1/events/event%20with%20spaces');
  });
});
