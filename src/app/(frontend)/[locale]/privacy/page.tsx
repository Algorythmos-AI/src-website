import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 markdown-body text-brand-ink/80 dark:text-dark-ink/80">
        <h1 className="text-brand-primary dark:text-dark-primary">Privacy Policy</h1>
        <p>
          The Sudanese Rural Community (SRC) respects your privacy. This page explains what personal
          data we collect through this website and how we use it.
        </p>
        <h2>Information we collect</h2>
        <p>
          When you contact us or subscribe to our newsletter we collect the details you provide
          (such as your name and email address) together with a one-way hashed record of your IP
          address for security and abuse prevention. We do not sell your data or share it with third
          parties for marketing.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your contact details only to respond to your message or, for newsletter subscribers
          who have confirmed by email (double opt-in), to send our quarterly impact report. You can
          unsubscribe at any time using the link in every email.
        </p>
        <h2>Payments</h2>
        <p>
          Donations are processed by Stripe. SRC never receives or stores your full card details.
        </p>
        <h2>Retention & your rights</h2>
        <p>
          We keep submissions only as long as needed to respond and meet our record-keeping
          obligations. You may request access to, correction of, or deletion of your personal data
          by contacting us.
        </p>
        <p>
          <em>
            This is a template policy — SRC should review and adapt it with legal counsel before
            launch.
          </em>
        </p>
      </div>
    </div>
  );
}
