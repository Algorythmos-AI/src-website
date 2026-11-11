import { RichTextBlock } from '@/components/RichTextBlock';

export type WorkArea = { title: string; text?: string | null };

type Props = {
  mission?: unknown;
  mandate?: unknown;
  whatWeDo?: WorkArea[] | null;
  labels: { eyebrow: string; mission: string; mandate: string; whatWeDo: string };
};

/** Lexical stores an empty editor as a root with one empty paragraph. */
export function hasRichText(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const root = (value as { root?: { children?: unknown[] } }).root;
  const children = root?.children ?? [];
  return children.some((node) => {
    const n = node as { type?: string; children?: unknown[] };
    return n.type !== 'paragraph' || (n.children?.length ?? 0) > 0;
  });
}

/**
 * CMS-driven Mission / Mandate / What we do section for the About page.
 * Renders nothing until at least one part has content.
 */
export function AboutMandate({ mission, mandate, whatWeDo, labels }: Props) {
  const areas = (whatWeDo ?? []).filter((a) => a.title?.trim());
  const showMission = hasRichText(mission);
  const showMandate = hasRichText(mandate);
  if (!showMission && !showMandate && areas.length === 0) return null;

  return (
    <section
      aria-labelledby="about-mandate"
      className="py-20 md:py-28 px-6 border-b border-brand-primary/5 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <p
          id="about-mandate"
          className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-10"
        >
          {labels.eyebrow}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {showMission && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight">
                {labels.mission}
              </h2>
              <RichTextBlock
                data={mission}
                className="text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed"
              />
            </div>
          )}
          {showMandate && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brand-primary dark:text-dark-primary leading-tight">
                {labels.mandate}
              </h2>
              <RichTextBlock
                data={mandate}
                className="text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed"
              />
            </div>
          )}
        </div>
        {areas.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-brand-primary dark:text-dark-primary leading-tight">
              {labels.whatWeDo}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area, i) => (
                <li
                  key={`${area.title}-${i}`}
                  className="rounded-xl p-6 bg-brand-surface dark:bg-dark-surface/40"
                >
                  <h3 className="text-lg font-serif font-bold mb-2 text-brand-primary dark:text-dark-primary">
                    {area.title}
                  </h3>
                  {area.text && (
                    <p className="text-sm text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed">
                      {area.text}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
