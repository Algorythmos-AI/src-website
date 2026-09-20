import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? 'SRC <onboarding@resend.dev>';
const resend = API_KEY ? new Resend(API_KEY) : null;

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Send an email via Resend. When no key is configured (dev/CI), the message is
 * logged instead of sent and reported as success so flows still complete.
 * Returns false only on a real send failure, so callers can flag it.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  if (!resend) {
    console.info(`[email:stub] to=${to} subject="${subject}"`);
    return true;
  }
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html, replyTo });
    if (error) {
      console.error(`[email] Resend error: ${error.message}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] send failed: ${(err as Error).message}`);
    return false;
  }
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

export function contactEmailHtml(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): string {
  return `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="color:#6f1e0c">New contact message</h2>
      <p><strong>From:</strong> ${escape(input.name)} &lt;${escape(input.email)}&gt;</p>
      ${input.subject ? `<p><strong>Subject:</strong> ${escape(input.subject)}</p>` : ''}
      <p style="white-space:pre-wrap">${escape(input.message)}</p>
    </div>`;
}

export function confirmEmailHtml(confirmUrl: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="color:#6f1e0c">Confirm your subscription</h2>
      <p>Please confirm you'd like to receive the SRC quarterly impact report.</p>
      <p><a href="${confirmUrl}" style="background:#6f1e0c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none">Confirm subscription</a></p>
      <p style="font-size:12px;color:#666">If you didn't request this, you can ignore this email.</p>
    </div>`;
}
