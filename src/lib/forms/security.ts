import { createHash, randomBytes } from 'crypto';

const SALT = process.env.FORM_SALT ?? 'dev-form-salt-change-me';

/** Salted one-way hash of an IP address (GDPR: never store raw IPs). */
export function hashIp(ip: string | null | undefined): string {
  return createHash('sha256')
    .update(`${SALT}:${ip ?? 'unknown'}`)
    .digest('hex');
}

/** A random opaque token (for newsletter confirm/unsubscribe links). */
export function makeToken(): string {
  return randomBytes(24).toString('base64url');
}

/** Hash of a token, stored server-side; the raw token only goes in the email. */
export function hashToken(token: string): string {
  return createHash('sha256').update(`${SALT}:${token}`).digest('hex');
}

/** Best-effort client IP from proxy headers. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}
