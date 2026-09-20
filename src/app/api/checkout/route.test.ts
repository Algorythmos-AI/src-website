import { describe, expect, it, vi, beforeEach } from 'vitest';

const { create, findGlobal } = vi.hoisted(() => ({
  create: vi.fn(),
  findGlobal: vi.fn(),
}));

vi.mock('@/lib/donate/stripe', () => ({
  stripe: { checkout: { sessions: { create } } },
  stripeEnabled: true,
  INTEGRATION_IDENTIFIER: 'test',
}));

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn().mockResolvedValue({ findGlobal, logger: { error: vi.fn() } }),
}));

import { POST } from './route';

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  );

describe('POST /api/checkout', () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({ url: 'https://checkout.stripe.com/x' });
    findGlobal.mockReset().mockResolvedValue({
      currencies: ['usd', 'eur'],
      minAmount: 5,
      maxAmount: 10000,
      monthlyEnabled: true,
    });
  });

  it('creates a session for a valid one-time donation', async () => {
    const res = await post({ amount: 50, currency: 'usd', mode: 'one-time', locale: 'en' });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, url: expect.stringContaining('stripe') });
    const params = create.mock.calls[0][0];
    expect(params.mode).toBe('payment');
    expect(params.line_items[0].price_data.unit_amount).toBe(5000); // integer cents
  });

  it('uses subscription mode for monthly', async () => {
    await post({ amount: 100, currency: 'usd', mode: 'monthly', locale: 'en' });
    expect(create.mock.calls[0][0].mode).toBe('subscription');
    expect(create.mock.calls[0][0].line_items[0].price_data.recurring).toEqual({
      interval: 'month',
    });
  });

  it('rejects an amount below the minimum', async () => {
    const res = await post({ amount: 1, currency: 'usd', mode: 'one-time' });
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects an amount above the maximum', async () => {
    const res = await post({ amount: 999999, currency: 'usd', mode: 'one-time' });
    expect(res.status).toBe(400);
  });

  it('rejects a disallowed currency', async () => {
    const res = await post({ amount: 50, currency: 'gbp', mode: 'one-time' });
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects monthly when disabled', async () => {
    findGlobal.mockResolvedValueOnce({
      currencies: ['usd'],
      minAmount: 5,
      maxAmount: 10000,
      monthlyEnabled: false,
    });
    const res = await post({ amount: 50, currency: 'usd', mode: 'monthly' });
    expect(res.status).toBe(400);
  });
});
