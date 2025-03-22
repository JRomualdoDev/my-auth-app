import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Criar cliente Redis (use variáveis de ambiente em produção)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://your-redis-url',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'your-token',
});

// Criar limitador para login (10 tentativas por minuto)
export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:login',
});

// Criar limitador para refresh (30 tentativas por minuto)
export const refreshLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:refresh',
});