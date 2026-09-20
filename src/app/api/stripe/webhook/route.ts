import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getPayloadClient } from '@/lib/payload';
import { stripe } from '@/lib/donate/stripe';

export const runtime = 'nodejs';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!stripe || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const sig = req.headers.get('stripe-signature');
  const raw = await req.text(); // raw body required for signature verification
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `signature: ${(err as Error).message}` }, { status: 400 });
  }

  const payload = await getPayloadClient();

  /** Upsert a donation by session id, recording the event id for idempotency. */
  async function record(sessionId: string, data: Record<string, unknown>): Promise<void> {
    const existing = await payload.find({
      collection: 'donations',
      where: { stripeSessionId: { equals: sessionId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const doc = existing.docs[0];
    const priorEvents: string[] = Array.isArray(doc?.stripeEventIds)
      ? (doc!.stripeEventIds as string[])
      : [];
    if (priorEvents.includes(event.id)) return; // already processed
    const stripeEventIds = [...priorEvents, event.id];

    if (doc) {
      await payload.update({
        collection: 'donations',
        id: doc.id,
        overrideAccess: true,
        data: { ...data, stripeEventIds },
      });
    } else {
      await payload.create({
        collection: 'donations',
        overrideAccess: true,
        data: { stripeSessionId: sessionId, ...data, stripeEventIds },
      });
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const s = event.data.object as Stripe.Checkout.Session;
        // Only fulfill when actually paid.
        if (s.payment_status === 'paid' || s.payment_status === 'no_payment_required') {
          await record(s.id, {
            stripeCustomerId: typeof s.customer === 'string' ? s.customer : undefined,
            subscriptionId: typeof s.subscription === 'string' ? s.subscription : undefined,
            amount: s.amount_total ?? undefined,
            currency: s.currency ?? undefined,
            mode: s.metadata?.mode === 'monthly' ? 'monthly' : 'one-time',
            status: 'succeeded',
            email: s.customer_details?.email ?? undefined,
            name: s.customer_details?.name ?? undefined,
            locale: s.metadata?.locale ?? undefined,
          });
        }
        break;
      }
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        // `subscription` field shape varies across API versions; read defensively.
        const subId = (inv as unknown as { subscription?: string }).subscription;
        if (typeof subId === 'string') {
          const found = await payload.find({
            collection: 'donations',
            where: { subscriptionId: { equals: subId } },
            limit: 1,
            depth: 0,
            overrideAccess: true,
          });
          if (found.docs[0]) {
            await record(found.docs[0].stripeSessionId, { status: 'payment_failed' });
          }
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const found = await payload.find({
          collection: 'donations',
          where: { subscriptionId: { equals: sub.id } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        });
        if (found.docs[0]) {
          await record(found.docs[0].stripeSessionId, { status: 'canceled' });
        }
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const found = await payload.find({
          collection: 'donations',
          where: { stripeCustomerId: { equals: String(charge.customer ?? '') } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        });
        if (found.docs[0]) await record(found.docs[0].stripeSessionId, { status: 'refunded' });
        break;
      }
      default:
        break;
    }
  } catch (err) {
    payload.logger.error(`Webhook handler error (${event.type}): ${(err as Error).message}`);
    // 500 so Stripe retries.
    return NextResponse.json({ error: 'handler_failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
