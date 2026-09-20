import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import type Stripe from 'stripe';
import { getPayloadClient } from '@/lib/payload';
import { stripe } from '@/lib/donate/stripe';

export const runtime = 'nodejs';

type Body = {
  amount?: number;
  currency?: string;
  mode?: 'one-time' | 'monthly';
  locale?: string;
};

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: 'donate-settings', depth: 0 });

  const allowed = (settings.currencies ?? ['usd', 'eur']) as string[];
  const min = settings.minAmount ?? 5;
  const max = settings.maxAmount ?? 10000;
  const monthlyEnabled = settings.monthlyEnabled ?? true;

  const amount = Number(body.amount);
  const currency = String(body.currency ?? 'usd').toLowerCase();
  const mode = body.mode === 'monthly' ? 'monthly' : 'one-time';
  const locale = body.locale && /^[a-z]{2}$/.test(body.locale) ? body.locale : 'en';

  // Server-side validation — never trust the client.
  if (!Number.isFinite(amount) || amount < min || amount > max) {
    return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 });
  }
  if (!allowed.includes(currency)) {
    return NextResponse.json({ ok: false, error: 'invalid_currency' }, { status: 400 });
  }
  if (mode === 'monthly' && !monthlyEnabled) {
    return NextResponse.json({ ok: false, error: 'monthly_disabled' }, { status: 400 });
  }

  const unitAmount = Math.round(amount * 100); // integer cents
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price_data: {
      currency,
      unit_amount: unitAmount,
      product_data: { name: 'Donation to SRC' },
      ...(mode === 'monthly' ? { recurring: { interval: 'month' } } : {}),
    },
  };

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: mode === 'monthly' ? 'subscription' : 'payment',
    line_items: [lineItem],
    success_url: `${origin}/${locale}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/donate/cancel`,
    metadata: { locale, mode },
    ...(mode === 'one-time' ? { submit_type: 'donate' as const } : {}),
  };

  try {
    const session = await stripe.checkout.sessions.create(params, {
      idempotencyKey: randomUUID(),
    });
    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    payload.logger.error(`Stripe checkout failed: ${(err as Error).message}`);
    return NextResponse.json({ ok: false, error: 'checkout_failed' }, { status: 502 });
  }
}
