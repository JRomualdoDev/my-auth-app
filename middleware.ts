import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const isPrivateRoute = request.nextUrl.pathname.startsWith('/private');
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  // Verificar rotas privadas
  if (isPrivateRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Verificar token de acesso (opcional, mas aumenta segurança)
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        verifyAccessToken(token);
      } catch (error: unknown) {
        // Token inválido, mas tem refresh token, então deixa passar
        // O cliente tentará refresh
      }
    }
  }
  
  // Redirecionar usuários autenticados da home para dashboard
  if (request.nextUrl.pathname === '/' && refreshToken) {
    return NextResponse.redirect(new URL('/private/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/private/:path*',
    '/',
  ],
};