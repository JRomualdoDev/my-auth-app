
import { sign, verify } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Chaves secretas (idealmente deveriam vir de variáveis de ambiente)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

// Duração dos tokens
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutos
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 dias

// Verificar senha
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(plainPassword, hashedPassword);
}

// Gerar hash de senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcryptjs.hash(password, saltRounds);
}

// Gerar tokens de acesso e refresh
export function generateTokens(user: { id: string; email: string }) {
  const accessToken = sign(
    { id: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = sign(
    { id: user.id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}

// Verificar token de acesso
export function verifyAccessToken(token: string) {
  try {
    return verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

// Verificar token de refresh
export function verifyRefreshToken(token: string) {
  try {
    return verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}
