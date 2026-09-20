import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = { title: 'Terms of Use' };

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="bg-brand-bg dark:bg-dark-bg pt-24 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 markdown-body text-brand-ink/80 dark:text-dark-ink/80">
        <h1 className="text-brand-primary dark:text-dark-primary">Terms of Use</h1>
        <p>
          By using this website you agree to these terms. The content is provided for information
          about the Sudanese Rural Community (SRC) and its programs.
        </p>
        <h2>Donations</h2>
        <p>
          Donations made through this site support SRC&apos;s programs. Recurring donations can be
          cancelled at any time; contact us for assistance. Tax-deductibility depends on your
          jurisdiction.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the site, attempt to disrupt it, or submit unlawful content
          through our forms.
        </p>
        <h2>Content</h2>
        <p>
          Text and images on this site are the property of SRC or used with permission. Please
          contact us before reusing material.
        </p>
        <p>
          <em>
            This is a template — SRC should review and adapt it with legal counsel before launch.
          </em>
        </p>
      </div>
    </div>
  );
}
