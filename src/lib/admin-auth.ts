import { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';

// Admin authentication password - in a real app, store this in environment variables
const ADMIN_PASSWORD = 'directoryslp2024';

// Cookie name for admin authentication
const ADMIN_COOKIE_NAME = 'directory_slp_admin_auth';

// Cookie expiration time (24 hours)
const COOKIE_EXPIRATION_DAYS = 1;

/**
 * Set admin authentication cookie
 */
export function setAdminAuth() {
  Cookies.set(ADMIN_COOKIE_NAME, 'authenticated', { 
    expires: COOKIE_EXPIRATION_DAYS,
    path: '/'
  });
}

/**
 * Remove admin authentication cookie
 */
export function removeAdminAuth() {
  Cookies.remove(ADMIN_COOKIE_NAME, { path: '/' });
}

/**
 * Check if user is authenticated as admin (client-side)
 */
export function isAdminAuthenticated(): boolean {
  return Cookies.get(ADMIN_COOKIE_NAME) === 'authenticated';
}

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Middleware for protecting API routes
 */
export function withAdminApiAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check for admin cookie
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
    const { req, res } = context;
    const adminCookie = req.cookies[ADMIN_COOKIE_NAME];
    
    if (adminCookie !== 'authenticated') {
      // Redirect to admin login
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    // Call the original getServerSideProps if it exists
    if (getServerSidePropsFunc) {
      return getServerSidePropsFunc(context);
    }

    // Otherwise return empty props
    return { props: {} };
  };
} 