import { NextRequest, NextResponse } from 'next/server';

// This middleware is simplified to avoid potential build issues
export function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname);
  
  // Always allow debug page to load without redirects
  if (request.nextUrl.pathname === '/debug') {
    console.log('Debug page detected, skipping middleware');
    return NextResponse.next();
  }
  
  // Always allow auth pages to load without redirects
  if (
    request.nextUrl.pathname === '/signin' || 
    request.nextUrl.pathname === '/signup'
  ) {
    console.log('Auth page detected, skipping middleware');
    return NextResponse.next();
  }
  
  // Simply continue to the next middleware for all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths and static files, but include all pages
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 