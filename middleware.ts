import { NextRequest, NextResponse } from 'next/server';

// This middleware is simplified to avoid potential build issues
export function middleware(request: NextRequest) {
  // Simply continue to the next middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths and static files
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 