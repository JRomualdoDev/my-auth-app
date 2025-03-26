import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isPrivateRoute = request.nextUrl.pathname.startsWith('/private');
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Verificar rotas privadas
  if (isPrivateRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } 
  
  if (request.nextUrl.pathname === '/' && refreshToken) {
    return NextResponse.redirect(new URL('/private/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/private/:path*',
    '/api/:path*',
    '/',
  ],
};