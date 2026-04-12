import { apiSuccess, apiError, setCacheHeaders } from '../response';

describe('apiSuccess', () => {
  it('wraps data in standard envelope', () => {
    const result = apiSuccess({ items: [1, 2] }, { total: 2, limit: 20 });
    expect(result).toEqual({
      ok: true,
      data: { items: [1, 2] },
      meta: { total: 2, limit: 20 },
      source: 'sanluisway.com',
    });
  });

  it('omits meta when not provided', () => {
    const result = apiSuccess({ temp: 25 });
    expect(result).toEqual({
      ok: true,
      data: { temp: 25 },
      source: 'sanluisway.com',
    });
  });
});

describe('apiError', () => {
  it('builds error envelope', () => {
    const result = apiError('NOT_FOUND', 'Event not found');
    expect(result).toEqual({
      ok: false,
      error: { code: 'NOT_FOUND', message: 'Event not found' },
      source: 'sanluisway.com',
    });
  });
});

describe('setCacheHeaders', () => {
  it('sets Cache-Control header on response', () => {
    const setHeader = jest.fn();
    const res = { setHeader } as any;
    setCacheHeaders(res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );
  });

  it('accepts custom maxAge', () => {
    const setHeader = jest.fn();
    const res = { setHeader } as any;
    setCacheHeaders(res, 60);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=120'
    );
  });
});
