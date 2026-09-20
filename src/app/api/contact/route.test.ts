import { describe, expect, it, vi, beforeEach } from 'vitest';

const { create, update, logger, sendEmail } = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  logger: { error: vi.fn(), info: vi.fn() },
  sendEmail: vi.fn(),
}));

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn().mockResolvedValue({ create, update, logger }),
}));

vi.mock('@/lib/forms/email', () => ({
  sendEmail,
  contactEmailHtml: () => '<p>x</p>',
}));

import { POST } from './route';

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Partnership inquiry',
  message: 'Hello, this is a genuine message with enough length.',
  startedAt: Date.now() - 5000, // slow enough to pass min-fill
};

const post = (body: unknown, ip = '1.2.3.4') =>
  POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(body),
    })
  );

describe('POST /api/contact', () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({ id: 1 });
    update.mockReset().mockResolvedValue({ id: 1 });
    sendEmail.mockReset().mockResolvedValue(true);
  });

  it('stores the submission and sends email on a valid request', async () => {
    const res = await post(valid, '10.0.0.1');
    expect(res.status).toBe(200);
    expect(create).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it('rejects invalid input with 400 and does not store', async () => {
    const res = await post({ email: 'nope' }, '10.0.0.2');
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('silently drops a filled honeypot without storing', async () => {
    const res = await post({ ...valid, company: 'spammer inc' }, '10.0.0.3');
    expect(res.status).toBe(200);
    expect(create).not.toHaveBeenCalled();
  });

  it('drops a too-fast submission', async () => {
    const res = await post({ ...valid, startedAt: Date.now() }, '10.0.0.4');
    expect(res.status).toBe(200);
    expect(create).not.toHaveBeenCalled();
  });

  it('still stores when email sending fails', async () => {
    sendEmail.mockResolvedValueOnce(false);
    const res = await post(valid, '10.0.0.5');
    expect(res.status).toBe(200);
    expect(create).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalled(); // flags emailStatus: failed
  });

  it('rate-limits after 5 requests from the same IP', async () => {
    const ip = '10.9.9.9';
    for (let i = 0; i < 5; i++) {
      const ok = await post(valid, ip);
      expect(ok.status).toBe(200);
    }
    const sixth = await post(valid, ip);
    expect(sixth.status).toBe(429);
  });
});
