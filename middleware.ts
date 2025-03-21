import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'de', 'ja'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Get the preferred locale from the Accept-Language header or use default
  const acceptLanguage = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || '';
  const locale = locales.includes(acceptLanguage) ? acceptLanguage : defaultLocale;
  
  // Create a URL object from the request URL
  const url = request.nextUrl.clone();
  
  // Add the locale to the pathname
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  // Redirect to the locale-prefixed URL
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 