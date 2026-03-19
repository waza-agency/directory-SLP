import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for debug and auth pages
  if (pathname === '/debug' || pathname === '/signin' || pathname === '/signup') {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Remove server info header
  response.headers.delete('X-Powered-By');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|ads.txt).*)',
  ],
};
