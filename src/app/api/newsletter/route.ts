import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { newsletterSchema, MIN_FILL_MS } from '@/lib/forms/validation';
import { checkRateLimit } from '@/lib/forms/rate-limit';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { sendEmail, confirmEmailHtml, confirmEmailSubject } from '@/lib/forms/email';
import { clientIp, hashIp, hashToken, makeToken } from '@/lib/forms/security';

export const runtime = 'nodejs';

// Always return the same generic response so we never reveal whether an address
// is already subscribed.
const generic = () => NextResponse.json({ ok: true });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
  }
  const data = parsed.data;

  const tooFast = data.startedAt ? Date.now() - data.startedAt < MIN_FILL_MS : false;
  if (data.company || tooFast) return generic();

  const ip = clientIp(req.headers);
  if (!(await checkRateLimit(`newsletter:${hashIp(ip)}`))) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: 'Verification failed' }, { status: 400 });
  }

  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection: 'newsletter-subscribers',
    where: { email: { equals: data.email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const current = existing.docs[0];

  // Already confirmed → do nothing, but respond generically.
  if (current?.status === 'confirmed') return generic();

  const token = makeToken();
  const tokenHash = hashToken(token);
  const values = {
    email: data.email,
    locale: data.locale,
    status: 'pending' as const,
    tokenHash,
  };

  if (current) {
    await payload.update({
      collection: 'newsletter-subscribers',
      id: current.id,
      overrideAccess: true,
      data: values,
    });
  } else {
    await payload.create({
      collection: 'newsletter-subscribers',
      overrideAccess: true,
      data: values,
    });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const locale = data.locale ?? 'en';
  const confirmUrl = `${origin}/api/newsletter/confirm?token=${token}&email=${encodeURIComponent(data.email)}&locale=${locale}`;
  await sendEmail({
    to: data.email,
    subject: confirmEmailSubject(locale),
    html: confirmEmailHtml(confirmUrl, locale),
  });

  return generic();
}
