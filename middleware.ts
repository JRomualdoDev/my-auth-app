import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  // Verificar se a rota é privada
  const isPrivateRoute = request.nextUrl.pathname.startsWith('/private');
  
  // Verificar se o usuário tem um refreshToken
  const refreshToken = request.cookies.get('refreshToken')?.value;

   // Se a rota for o login e já tiver um token, redirecionar para o dashbooard
   if (request.nextUrl.pathname === '/' && refreshToken) {
    const dashboardUrl = new URL('/private/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Se for rota privada e não tiver token, redirecionar para login
  if (isPrivateRoute && !refreshToken) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    // Aplicar a todas as rotas privadas
    '/private/:path*',
    // Excluir rotas de API e recursos estáticos
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};