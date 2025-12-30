import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for admin token
  const token = request.cookies.get('admin_token');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  // If trying to access admin pages without token
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If already logged in and trying to access login page
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
