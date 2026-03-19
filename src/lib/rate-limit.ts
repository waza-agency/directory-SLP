import { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  store.forEach((entry, key) => {
    if (now > entry.resetAt) store.delete(key);
  });
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress || 'unknown';
}

interface RateLimitOptions {
  /** Max requests per window */
  limit: number;
  /** Window size in seconds */
  windowSec: number;
  /** Optional key prefix for different endpoints */
  prefix?: string;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  limit: 20,
  windowSec: 60,
};

/**
 * Rate limiting for Next.js API routes.
 * Returns true if the request should be blocked (rate limit exceeded).
 */
export function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  options: Partial<RateLimitOptions> = {}
): boolean {
  cleanup();

  const { limit, windowSec, prefix } = { ...DEFAULT_OPTIONS, ...options };
  const ip = getClientIp(req);
  const key = `${prefix || req.url || 'api'}:${ip}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', limit - 1);
    return false;
  }

  entry.count++;

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', 0);
    res.setHeader('Retry-After', retryAfter);
    res.status(429).json({
      error: 'Too many requests',
      retryAfter,
    });
    return true;
  }

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', limit - entry.count);
  return false;
}

/**
 * Stricter rate limit for sensitive endpoints (auth, contact forms).
 */
export function strictRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  prefix?: string
): boolean {
  return rateLimit(req, res, { limit: 5, windowSec: 60, prefix });
}
