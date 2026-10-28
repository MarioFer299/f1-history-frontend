import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  // En middleware de servidor no tenemos localStorage, usamos cookies o header
  const authHeader = request.headers.get('authorization');
  const hasToken = token || authHeader;

  const protectedRoutes = ['/admin', '/mis-interacciones'];
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/mis-interacciones/:path*'],
};