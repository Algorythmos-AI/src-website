import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { contactSchema, MIN_FILL_MS } from '@/lib/forms/validation';
import { checkRateLimit } from '@/lib/forms/rate-limit';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { sendEmail, contactEmailHtml } from '@/lib/forms/email';
import { clientIp, hashIp } from '@/lib/forms/security';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot or too-fast submit → silently accept, drop (don't tip off bots).
  const tooFast = data.startedAt ? Date.now() - data.startedAt < MIN_FILL_MS : false;
  if (data.company || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req.headers);
  if (!(await checkRateLimit(`contact:${hashIp(ip)}`))) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: 'Verification failed' }, { status: 400 });
  }

  const payload = await getPayloadClient();
  let emailStatus: 'sent' | 'failed' = 'sent';

  // Store first so a mail outage never loses the message.
  const submission = await payload.create({
    collection: 'form-submissions',
    overrideAccess: true,
    data: {
      type: 'contact',
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      locale: data.locale,
      ipHash: hashIp(ip),
      consentAt: new Date().toISOString(),
      emailStatus,
    },
  });

  const sent = await sendEmail({
    to: process.env.CONTACT_INBOX ?? 'hello@src-sudan.org',
    replyTo: data.email,
    subject: `[SRC contact] ${data.subject ?? 'New message'}`,
    html: contactEmailHtml(data),
  });

  if (!sent) {
    emailStatus = 'failed';
    await payload
      .update({
        collection: 'form-submissions',
        id: submission.id,
        overrideAccess: true,
        data: { emailStatus },
      })
      .catch(() => {});
    payload.logger.error(`Contact email failed for submission ${submission.id}`);
  }

  return NextResponse.json({ ok: true });
}
