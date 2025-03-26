import crypto from 'crypto';

export function generateCsrfToken(): string {
  // Gerar um token aleatório de 32 bytes e convertê-lo para hexadecimal
  return crypto.randomBytes(32).toString('hex');
}

export function validateCsrfToken(cookieToken: string, headerToken: string): boolean {
  // Comparação de tempo constante para evitar ataques de timing
  return crypto.timingSafeEqual(
    Buffer.from(cookieToken, 'utf8'),
    Buffer.from(headerToken, 'utf8')
  );
}