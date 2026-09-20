const SECRET = process.env.TURNSTILE_SECRET_KEY;

/**
 * Verify a Cloudflare Turnstile token server-side. When no secret is configured
 * (dev/CI), verification is skipped and treated as passing.
 */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  if (!SECRET) return true; // not configured → skip
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: SECRET,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Whether Turnstile is configured (so the client renders the widget). */
export const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
