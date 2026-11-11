export type SocialNetwork = 'facebook' | 'twitter' | 'instagram' | 'linkedin';

export type SocialLink = { network: SocialNetwork; href: string };

/** Display order in the footer. */
const ORDER: readonly SocialNetwork[] = ['facebook', 'twitter', 'instagram', 'linkedin'];

function safeHttpsUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Turn the Site Settings `social` group into footer links. Only well-formed
 * https:// URLs are kept, so an empty or mistyped field hides its icon instead
 * of rendering a dead or unsafe link.
 */
export function toSocialLinks(
  social: Partial<Record<SocialNetwork, string | null>> | null | undefined
): SocialLink[] {
  if (!social) return [];
  return ORDER.flatMap((network) => {
    const href = safeHttpsUrl(social[network]);
    return href ? [{ network, href }] : [];
  });
}
