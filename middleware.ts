import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const isPrivateRoute = request.nextUrl.pathname.startsWith('/private');
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  // Verificar token de acesso (opcional, mas aumenta segurança)
  const authHeader = request.headers.get('authorization');

  // Verificar rotas privadas
  if (isPrivateRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        verifyAccessToken(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        // Token inválido, mas tem refresh token, então deixa passar
        // O cliente tentará refresh
      }
    }
  }
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // Redirecionar usuários autenticados da home para dashboard
    if (request.nextUrl.pathname === '/' && refreshToken && token) {
      return NextResponse.redirect(new URL('/private/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/private/:path*',
    '/',
  ],
};