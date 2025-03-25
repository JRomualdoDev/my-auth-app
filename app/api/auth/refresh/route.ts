import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateTokens, verifyRefreshToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST() {
  // Use the cookies function from next/headers instead
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get('refreshToken')?.value;
  
  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token required' }, { status: 401 });
  }
  
  try {
    // Verificar token e obter payload
    const payload = verifyRefreshToken(refreshToken);
    
    // Verificar se o token existe no banco de dados e não foi usado
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken, revoked: false },
      include: { user: true }
    });
    
    if (!tokenRecord) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }
    
    // Revogar o token atual
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { revoked: true }
    });
    
    // Gerar novos tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      id: tokenRecord.user.id,
      email: tokenRecord.user.email
    });
    
    // Salvar novo refresh token
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: tokenRecord.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      }
    });
    
    return NextResponse.json(
      { accessToken },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${newRefreshToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
        }
      }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}