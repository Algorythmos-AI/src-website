import Stripe from 'stripe';

const KEY = process.env.STRIPE_SECRET_KEY;

/** Stripe client instance, or null when not configured (dev/CI). */
export const stripe = KEY ? new Stripe(KEY) : null;

export const stripeEnabled = Boolean(KEY);

/** Random 8-letter suffix for the Dashboard integration label. */
function randomSuffix(): string {
  const a = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: 8 }, () => a[Math.floor(Math.random() * a.length)]).join('');
}

export const INTEGRATION_IDENTIFIER = `src-donations-${randomSuffix()}`;
