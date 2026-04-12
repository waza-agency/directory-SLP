const API_BASE = process.env.SANLUISWAY_API_URL || 'https://www.sanluisway.com';

export interface ApiResponse {
  ok: boolean;
  data: unknown;
  meta?: { total: number; limit: number };
  error?: { code: string; message: string };
}

export class SanLuisWayClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE;
  }

  private async request(
    path: string,
    params: Record<string, string | number | undefined> = {},
  ): Promise<ApiResponse> {
    const url = new URL(`/api/v1${path}`, this.baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<ApiResponse>;
  }

  async getEvents(params?: { limit?: number; category?: string; from?: string; to?: string }) {
    return this.request('/events', params);
  }

  async getEvent(slug: string) {
    return this.request(`/events/${encodeURIComponent(slug)}`);
  }

  async getPlaces(params?: { limit?: number; category?: string; sort?: string }) {
    return this.request('/places', params);
  }

  async getPlace(slug: string) {
    return this.request(`/places/${encodeURIComponent(slug)}`);
  }

  async getGuides(params?: { limit?: number; tag?: string; lang?: string }) {
    return this.request('/guides', params);
  }

  async getGuide(slug: string, lang?: string) {
    return this.request(`/guides/${encodeURIComponent(slug)}`, { lang });
  }

  async getOutdoor(params?: { limit?: number; lang?: string }) {
    return this.request('/outdoor', params);
  }

  async getCulture(params?: { limit?: number; lang?: string }) {
    return this.request('/culture', params);
  }

  async getWeather() {
    return this.request('/weather');
  }

  async getNews(params?: { limit?: number; lang?: string }) {
    return this.request('/news', params);
  }

  async getExchangeRates() {
    return this.request('/exchange-rates');
  }

  async search(params: { q: string; limit?: number; type?: string; lang?: string }) {
    return this.request('/search', params);
  }
}
