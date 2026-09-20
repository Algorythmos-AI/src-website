import { z } from 'zod';

// Remove control characters (keeping tab/newline/CR) to block header injection
// and odd payloads, without a control-char regex. Applied to free-text fields.
const stripControl = (s: string) =>
  Array.from(s)
    .filter((ch) => {
      if (ch === '\t' || ch === '\n' || ch === '\r') return true;
      const code = ch.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join('')
    .trim();

const clean = (max: number) => z.string().transform(stripControl).pipe(z.string().max(max));

const email = z.string().trim().toLowerCase().email().max(200);

// Anti-spam fields shared by every form.
const antiSpam = {
  // Honeypot: must stay empty (bots fill it).
  company: z.string().optional(),
  // Client timestamp when the form was first rendered (ms epoch).
  startedAt: z.coerce.number().optional(),
  // Cloudflare Turnstile token (verified server-side when configured).
  turnstileToken: z.string().optional(),
};

export const contactSchema = z.object({
  name: clean(100).pipe(z.string().min(1)),
  email,
  subject: clean(150).optional(),
  message: clean(5000).pipe(z.string().min(10)),
  locale: z.string().max(5).optional(),
  ...antiSpam,
});

export const newsletterSchema = z.object({
  email,
  locale: z.string().max(5).optional(),
  consent: z.coerce.boolean().refine((v) => v === true, 'Consent is required'),
  ...antiSpam,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Minimum ms a genuine human takes to fill a form; faster = likely a bot. */
export const MIN_FILL_MS = 2000;
