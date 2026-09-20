import { describe, expect, it, vi, beforeEach } from 'vitest';

const { constructEvent, find, create, update } = vi.hoisted(() => {
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
  return { constructEvent: vi.fn(), find: vi.fn(), create: vi.fn(), update: vi.fn() };
});

vi.mock('@/lib/donate/stripe', () => ({
  stripe: { webhooks: { constructEvent } },
  stripeEnabled: true,
  INTEGRATION_IDENTIFIER: 'test',
}));

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn().mockResolvedValue({ find, create, update, logger: { error: vi.fn() } }),
}));

import { POST } from './route';

const event = {
  id: 'evt_1',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_1',
      payment_status: 'paid',
      amount_total: 5000,
      currency: 'usd',
      metadata: { mode: 'one-time', locale: 'en' },
      customer_details: { email: 'donor@example.com', name: 'Donor' },
      customer: 'cus_1',
      subscription: null,
    },
  },
};

const post = () =>
  POST(
    new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      headers: { 'stripe-signature': 'sig' },
      body: 'raw',
    })
  );

describe('POST /api/stripe/webhook', () => {
  beforeEach(() => {
    constructEvent.mockReset().mockReturnValue(event);
    create.mockReset().mockResolvedValue({ id: 1 });
    update.mockReset().mockResolvedValue({ id: 1 });
    find.mockReset();
  });

  it('rejects a bad signature with 400', async () => {
    constructEvent.mockImplementationOnce(() => {
      throw new Error('bad sig');
    });
    const res = await post();
    expect(res.status).toBe(400);
  });

  it('creates a donation on first delivery', async () => {
    find.mockResolvedValueOnce({ docs: [] }); // no existing donation
    const res = await post();
    expect(res.status).toBe(200);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0].data).toMatchObject({
      stripeSessionId: 'cs_1',
      amount: 5000,
      status: 'succeeded',
      email: 'donor@example.com',
    });
  });

  it('is idempotent when the same event is replayed', async () => {
    // Donation already exists and has already recorded evt_1.
    find.mockResolvedValueOnce({
      docs: [{ id: 1, stripeSessionId: 'cs_1', stripeEventIds: ['evt_1'] }],
    });
    const res = await post();
    expect(res.status).toBe(200);
    expect(create).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });
});
