import { render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../messages/en.json';
import { Footer } from './Footer';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock('@/components/forms/NewsletterForm', () => ({ NewsletterForm: () => null }));

function renderFooter(props: React.ComponentProps<typeof Footer>) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Footer {...props} />
    </NextIntlClientProvider>
  );
}

describe('Footer social links', () => {
  it('hides the social list when no links are configured', () => {
    renderFooter({});
    expect(screen.queryByRole('list', { name: 'Follow SRC' })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="#"]')).toBeNull();
  });

  it('renders only configured networks as safe external links', () => {
    renderFooter({
      social: [
        { network: 'facebook', href: 'https://www.facebook.com/src' },
        { network: 'twitter', href: 'https://x.com/src' },
      ],
    });
    const list = screen.getByRole('list', { name: 'Follow SRC' });
    const links = within(list).getAllByRole('link');
    expect(links).toHaveLength(2);
    const fb = within(list).getByRole('link', { name: 'Facebook' });
    expect(fb).toHaveAttribute('href', 'https://www.facebook.com/src');
    expect(fb).toHaveAttribute('target', '_blank');
    expect(fb).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(list).getByRole('link', { name: 'X (Twitter)' })).toBeInTheDocument();
    expect(within(list).queryByRole('link', { name: 'Instagram' })).not.toBeInTheDocument();
  });

  it('uses the Site Settings email and falls back to the default', () => {
    const { unmount } = renderFooter({ email: 'info@src-rural.org' });
    expect(screen.getByRole('link', { name: 'info@src-rural.org' })).toHaveAttribute(
      'href',
      'mailto:info@src-rural.org'
    );
    unmount();
    renderFooter({ email: '  ' });
    expect(screen.getByRole('link', { name: 'hello@src-sudan.org' })).toBeInTheDocument();
  });
});
