import { paginationSchema, parseQuery } from '../validate';

describe('paginationSchema', () => {
  it('parses valid limit', () => {
    const result = paginationSchema.safeParse({ limit: '10' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(10);
  });

  it('defaults limit to 20', () => {
    const result = paginationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(20);
  });

  it('caps limit at 100', () => {
    const result = paginationSchema.safeParse({ limit: '500' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(100);
  });

  it('rejects non-numeric limit', () => {
    const result = paginationSchema.safeParse({ limit: 'abc' });
    expect(result.success).toBe(false);
  });
});

describe('parseQuery', () => {
  it('returns parsed data on success', () => {
    const result = parseQuery(paginationSchema, { limit: '5' });
    expect(result).toEqual({ success: true, data: { limit: 5 } });
  });

  it('returns error message on failure', () => {
    const result = parseQuery(paginationSchema, { limit: 'bad' });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBeDefined();
  });
});
