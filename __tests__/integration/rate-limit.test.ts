import { createMockRequest, createMockResponse } from '../helpers/api-test-helpers';
import { rateLimit, strictRateLimit } from '@/lib/rate-limit';

describe('Rate Limiting Integration Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rateLimit', () => {
    it('allows requests under the limit', () => {
      const req = createMockRequest({
        socket: { remoteAddress: '10.0.0.1' } as any,
        url: '/api/test-rate',
      });
      const res = createMockResponse();

      const blocked = rateLimit(req, res, { limit: 5, windowSec: 60, prefix: 'test-allow' });

      expect(blocked).toBe(false);
      expect(res.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', 5);
      expect(res.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 4);
    });

    it('blocks requests over the limit', () => {
      const makeReq = () => createMockRequest({
        socket: { remoteAddress: '10.0.0.2' } as any,
        url: '/api/test-block',
      });

      // Exhaust the limit
      for (let i = 0; i < 3; i++) {
        const res = createMockResponse();
        rateLimit(makeReq(), res, { limit: 3, windowSec: 60, prefix: 'test-block' });
      }

      // This one should be blocked
      const res = createMockResponse();
      const blocked = rateLimit(makeReq(), res, { limit: 3, windowSec: 60, prefix: 'test-block' });

      expect(blocked).toBe(true);
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res._json.error).toBe('Too many requests');
    });

    it('resets after window expires', () => {
      const makeReq = () => createMockRequest({
        socket: { remoteAddress: '10.0.0.3' } as any,
        url: '/api/test-reset',
      });

      // Exhaust limit
      for (let i = 0; i < 3; i++) {
        rateLimit(makeReq(), createMockResponse(), { limit: 3, windowSec: 60, prefix: 'test-reset' });
      }

      // Blocked
      const blockedRes = createMockResponse();
      expect(rateLimit(makeReq(), blockedRes, { limit: 3, windowSec: 60, prefix: 'test-reset' })).toBe(true);

      // Advance time past window
      jest.advanceTimersByTime(61000);

      // Should be allowed again
      const allowedRes = createMockResponse();
      expect(rateLimit(makeReq(), allowedRes, { limit: 3, windowSec: 60, prefix: 'test-reset' })).toBe(false);
    });

    it('uses x-forwarded-for header for IP detection', () => {
      const req = createMockRequest({
        headers: { 'x-forwarded-for': '203.0.113.50, 70.41.3.18' },
        url: '/api/test-xff',
      });
      const res = createMockResponse();

      const blocked = rateLimit(req, res, { limit: 10, windowSec: 60, prefix: 'test-xff' });

      expect(blocked).toBe(false);
    });

    it('isolates rate limits by prefix', () => {
      const req = createMockRequest({
        socket: { remoteAddress: '10.0.0.4' } as any,
      });

      // Exhaust prefix A
      for (let i = 0; i < 2; i++) {
        rateLimit(req, createMockResponse(), { limit: 2, windowSec: 60, prefix: 'prefix-a' });
      }

      // Prefix A blocked
      const blockedRes = createMockResponse();
      expect(rateLimit(req, blockedRes, { limit: 2, windowSec: 60, prefix: 'prefix-a' })).toBe(true);

      // Prefix B still allowed
      const allowedRes = createMockResponse();
      expect(rateLimit(req, allowedRes, { limit: 2, windowSec: 60, prefix: 'prefix-b' })).toBe(false);
    });
  });

  describe('strictRateLimit', () => {
    it('applies stricter limits (5 req / 60s)', () => {
      const makeReq = () => createMockRequest({
        socket: { remoteAddress: '10.0.0.5' } as any,
      });

      // 5 requests should pass
      for (let i = 0; i < 5; i++) {
        const res = createMockResponse();
        expect(strictRateLimit(makeReq(), res, 'strict-test')).toBe(false);
      }

      // 6th should be blocked
      const res = createMockResponse();
      expect(strictRateLimit(makeReq(), res, 'strict-test')).toBe(true);
      expect(res.status).toHaveBeenCalledWith(429);
    });
  });
});
