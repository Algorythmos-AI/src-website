import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getAboutContent, getLeadership } from '@/lib/queries';
import { AboutMandate } from '@/components/AboutMandate';
import type { About as AboutGlobal } from '@/payload-types';
import { mediaUrl } from '@/lib/media';
import { localeAlternates } from '@/lib/seo';
import { About, type LeadItem } from '@/views/About';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [tn, tm] = [
    await getTranslations({ locale, namespace: 'nav' }),
    await getTranslations({ locale, namespace: 'meta' }),
  ];
  return {
    title: `${tn('about')} · ${tm('title')}`,
    description: tm('description'),
    alternates: localeAlternates(locale, '/about'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const [members, content] = await Promise.all([
    getLeadership(locale as Locale),
    // The CMS section is optional; if the read fails, keep the rest of the page.
    getAboutContent(locale as Locale).catch((err: Error): AboutGlobal | null => {
      console.error('About content unavailable:', err.message);
      return null;
    }),
  ]);
  const leadership: LeadItem[] = members.map((m) => ({
    name: m.name,
    role: m.role ?? '',
    image: mediaUrl(m.photo, 'card'),
  }));

  const mandateSection = content ? (
    <AboutMandate
      mission={content.mission}
      mandate={content.mandate}
      whatWeDo={content.whatWeDo}
      labels={{
        eyebrow: t('mandateEyebrow'),
        mission: t('missionHeading'),
        mandate: t('mandateHeading'),
        whatWeDo: t('whatWeDoHeading'),
      }}
    />
  ) : null;

  return <About leadership={leadership} mandateSection={mandateSection} />;
}
