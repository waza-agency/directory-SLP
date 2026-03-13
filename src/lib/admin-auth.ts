import { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext } from 'next';
import { timingSafeEqual } from 'crypto';

const ADMIN_COOKIE_NAME = 'directory_slp_admin_auth';
const COOKIE_MAX_AGE_SEC = 86400; // 24 hours

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD environment variable is not set');
  return pw;
}

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Set admin authentication cookie (server-side, httpOnly)
 */
export function setAdminCookie(res: NextApiResponse): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookie = [
    `${ADMIN_COOKIE_NAME}=authenticated`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Strict`,
    `Max-Age=${COOKIE_MAX_AGE_SEC}`,
    isProduction ? 'Secure' : '',
  ].filter(Boolean).join('; ');
  res.setHeader('Set-Cookie', cookie);
}

/**
 * Remove admin authentication cookie (server-side)
 */
export function clearAdminCookie(res: NextApiResponse): void {
  const cookie = `${ADMIN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
  res.setHeader('Set-Cookie', cookie);
}

/**
 * Check if user is authenticated as admin from request cookies
 */
export function isAdminAuthenticated(req: NextApiRequest): boolean {
  return req.cookies[ADMIN_COOKIE_NAME] === 'authenticated';
}

/**
 * Verify admin password with timing-safe comparison
 */
export function verifyAdminPassword(password: string): boolean {
  try {
    return safeCompare(password, getAdminPassword());
  } catch {
    return false;
  }
}

/**
 * Middleware for protecting API routes
 */
export function withAdminApiAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const adminCookie = req.cookies[ADMIN_COOKIE_NAME];

    if (adminCookie !== 'authenticated') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
  };
}

/**
 * Middleware for protecting admin pages
 */
export function withAdminPageAuth(getServerSidePropsFunc?: any) {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const adminCookie = req.cookies[ADMIN_COOKIE_NAME];

    if (adminCookie !== 'authenticated') {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    if (getServerSidePropsFunc) {
      return getServerSidePropsFunc(context);
    }

    return { props: {} };
  };
}
