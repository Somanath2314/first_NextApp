import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = ["/login", "/signup"].includes(request.nextUrl.pathname);
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile');

  // If user is not authenticated and tries to access a protected route, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and tries to access a public route, redirect to profile
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next(); // Allow request to proceed if no redirects are needed
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup']
};
