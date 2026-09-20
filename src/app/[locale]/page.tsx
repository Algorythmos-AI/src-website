import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Hero } from '@/components/Hero';
import { ImpactStats } from '@/components/ImpactStats';
import { CauseCard } from '@/components/CauseCard';

const causes = [
  {
    title: 'Resilient Peacebuilding',
    tag: 'Initiative',
    image:
      'https://images.unsplash.com/photo-1608317544280-9e9916b8c54d?q=80&w=2070&auto=format&fit=crop',
    description:
      'Restoring communal harmony through traditional mediation and youth-led dialogue programs across Darfur and Kordofan.',
  },
  {
    title: 'Rural Education Centers',
    tag: 'Development',
    image:
      'https://images.unsplash.com/photo-1596895307394-1d15bf597744?q=80&w=2070&auto=format&fit=crop',
    description:
      'Tech-enabled learning spaces for children in underserved rural districts, bridging the literacy gap in North Sudan.',
  },
  {
    title: 'Emergency Water Relief',
    tag: 'Humanitarian',
    image:
      'https://images.unsplash.com/photo-1663876458229-4a7ac3e4be45?q=80&w=2070&auto=format&fit=crop',
    description:
      'Solar-powered boreholes and sustainable water management for arid rural communities across North Sudan.',
  },
];

const partners = ['UNICEF', 'WFP', 'OCHA', 'OXFAM', 'IRC', 'UNHCR'];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
      <Hero />

      <ImpactStats />

      {/* Mission */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our mission
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
              Locally led. Globally supported.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-6">
              The Sudanese Rural Community (SRC) works alongside community advisory boards in
              fifteen states to deliver education, water, health, and peacebuilding programs
              designed by Sudanese communities themselves.
            </p>
            <p className="text-lg text-brand-ink/75 dark:text-dark-ink/75 leading-relaxed mb-8">
              Our methodology is grounded in three principles: local ownership of every project,
              transparent reporting to donors and beneficiaries, and durable partnerships with
              traditional leaders, women&apos;s cooperatives, and youth councils.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-primary dark:text-dark-primary font-bold text-sm uppercase tracking-widest border-b border-brand-primary/30 dark:border-dark-primary/40 pb-1 hover:border-brand-primary dark:hover:border-dark-primary transition-colors"
            >
              Read our founding story
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 px-6 bg-brand-surface dark:bg-dark-surface/40 border-y border-brand-primary/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Our programs
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-brand-primary dark:text-dark-primary">
                Where your support goes.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
            >
              View all programs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {causes.map((cause, i) => (
              <CauseCard key={cause.title} {...cause} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Voice / Testimonial */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-secondary dark:text-dark-secondary text-xs font-bold uppercase tracking-[0.3em] mb-6 text-center">
            From our leadership
          </p>
          <blockquote className="text-2xl md:text-3xl font-serif leading-snug text-brand-primary dark:text-dark-primary text-center mb-10">
            &ldquo;Dignity is the foundation of peace. We don&apos;t deliver aid — we partner with
            rural communities to build the tools they need for their own prosperity.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full bg-brand-primary dark:bg-dark-primary text-white flex items-center justify-center font-serif font-bold text-lg"
              aria-hidden="true"
            >
              ON
            </div>
            <div>
              <p className="font-serif font-bold text-brand-primary dark:text-dark-primary">
                Obeid NAEIM
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/50 dark:text-dark-ink/50 font-bold">
                President, SRC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6 border-y border-brand-primary/10 dark:border-white/5 bg-brand-surface/60 dark:bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/50 dark:text-dark-ink/50 mb-8">
            In partnership with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((p) => (
              <span
                key={p}
                className="font-serif font-bold text-xl md:text-2xl text-brand-primary/40 dark:text-dark-primary/50 tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency / Annual Report */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-primary dark:bg-dark-primary rounded-2xl p-10 md:p-12 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-3">
              Transparency
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">
              Annual Report 2024
            </h3>
            <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base">
              A complete breakdown of programs, finances, and impact across all fifteen states where
              SRC operates.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-surface transition-colors"
            >
              Read the report
            </a>
          </div>
          <div className="bg-brand-surface dark:bg-dark-surface rounded-2xl p-10 md:p-12 border border-brand-primary/10 dark:border-white/5">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-secondary dark:text-dark-secondary mb-3">
              Get involved
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-brand-primary dark:text-dark-primary leading-tight">
              Stand with rural Sudan.
            </h3>
            <p className="text-brand-ink/70 dark:text-dark-ink/70 leading-relaxed mb-6 text-sm md:text-base">
              Your support funds clean water, classrooms, and community-led peace councils where
              they&apos;re needed most.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-brand-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors"
            >
              Donate to SRC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
