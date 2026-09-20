import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Upstash Redis when configured (production); otherwise an in-memory fallback so
// dev/CI still rate-limit within a single process.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const upstash =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(5, '10 m'),
        prefix: 'ratelimit:forms',
      })
    : null;

const memory = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) {
    memory.set(key, hits);
    return false;
  }
  hits.push(now);
  memory.set(key, hits);
  return true;
}

/** Returns true when the request is allowed, false when rate-limited. */
export async function checkRateLimit(key: string): Promise<boolean> {
  if (upstash) {
    const { success } = await upstash.limit(key);
    return success;
  }
  return memoryLimit(key);
}
