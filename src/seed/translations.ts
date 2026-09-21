// French + Arabic translations for the seeded CMS content, applied by
// `npm run seed:i18n` (src/scripts/localize.ts). English is the source of truth
// and lives in ./data.ts and the collections; this only fills the fr/ar locales.
//
// Scope: plain-text fields on the already-localized pages (home, work, donate,
// about, news list). Rich-text bodies (post/event/press bodies) are a follow-up.

type FrAr<T> = { fr: T; ar: T };

// Programs — keyed by slug (slugified English title).
export const programTranslations: Record<
  string,
  FrAr<{ title: string; tag: string; summary: string }>
> = {
  'resilient-peacebuilding': {
    fr: {
      title: 'Consolidation d’une paix durable',
      tag: 'Initiative',
      summary:
        'Rétablir l’harmonie communautaire par la médiation traditionnelle et des programmes de dialogue menés par les jeunes, au Darfour et au Kordofan.',
    },
    ar: {
      title: 'بناء سلام صامد',
      tag: 'مبادرة',
      summary:
        'استعادة الوئام المجتمعي عبر الوساطة التقليدية وبرامج الحوار بقيادة الشباب في دارفور وكردفان.',
    },
  },
  'rural-education-centers': {
    fr: {
      title: 'Centres d’éducation rurale',
      tag: 'Développement',
      summary:
        'Des espaces d’apprentissage équipés en technologie pour les enfants des districts ruraux défavorisés, afin de combler le déficit d’alphabétisation au nord du Soudan.',
    },
    ar: {
      title: 'مراكز التعليم الريفي',
      tag: 'تنمية',
      summary:
        'مساحات تعلّم مزوّدة بالتقنية لأطفال المناطق الريفية المحرومة، لسدّ فجوة الأمّية في شمال السودان.',
    },
  },
  'emergency-water-relief': {
    fr: {
      title: 'Secours d’urgence en eau',
      tag: 'Humanitaire',
      summary:
        'Forages solaires et gestion durable de l’eau pour les communautés rurales arides du nord du Soudan.',
    },
    ar: {
      title: 'إغاثة مائية طارئة',
      tag: 'إنساني',
      summary:
        'آبار تعمل بالطاقة الشمسية وإدارة مستدامة للمياه للمجتمعات الريفية الجافة في شمال السودان.',
    },
  },
  'mobile-health-clinics': {
    fr: {
      title: 'Cliniques mobiles de santé',
      tag: 'Santé',
      summary:
        'Atteindre les zones isolées avec des soins primaires, la santé maternelle et des campagnes de vaccination.',
    },
    ar: {
      title: 'عيادات صحية متنقّلة',
      tag: 'صحة',
      summary: 'الوصول إلى التجمّعات النائية بالرعاية الأولية وصحة الأمومة وحملات التطعيم.',
    },
  },
  'sustainable-agriculture': {
    fr: {
      title: 'Agriculture durable',
      tag: 'Moyens de subsistance',
      summary:
        'Former les agriculteurs aux techniques résistantes à la sécheresse et relier les coopératives aux marchés.',
    },
    ar: {
      title: 'زراعة مستدامة',
      tag: 'سبل العيش',
      summary: 'تدريب المزارعين على تقنيات مقاومة الجفاف وربط التعاونيات بالأسواق.',
    },
  },
  'womens-cooperatives': {
    fr: {
      title: 'Coopératives de femmes',
      tag: 'Autonomisation',
      summary:
        'Micro-subventions et formation professionnelle pour donner aux femmes rurales les moyens de leur autonomie économique.',
    },
    ar: {
      title: 'تعاونيات نسائية',
      tag: 'تمكين',
      summary: 'منح صغيرة وتدريب مهني يمنحان المرأة الريفية زمام قرارها الاقتصادي.',
    },
  },
};

// Impact stats — keyed by English label.
export const statTranslations: Record<string, FrAr<string>> = {
  'People reached': { fr: 'Personnes touchées', ar: 'أشخاص جرى الوصول إليهم' },
  'Active programs': { fr: 'Programmes actifs', ar: 'برامج نشطة' },
  'Field sites': { fr: 'Sites de terrain', ar: 'مواقع ميدانية' },
  Volunteers: { fr: 'Bénévoles', ar: 'متطوّعون' },
};

// Donate tiers — keyed by amount.
export const tierTranslations: Record<number, FrAr<{ label: string; impact: string }>> = {
  25: {
    fr: { label: 'Ami', impact: 'Des fournitures scolaires pour un enfant pendant un trimestre.' },
    ar: { label: 'صديق', impact: 'لوازم مدرسية لطفل واحد لفصل دراسي.' },
  },
  50: {
    fr: {
      label: 'Soutien',
      impact: 'Un mois d’eau potable pour une famille rurale.',
    },
    ar: { label: 'داعم', impact: 'شهر من المياه النظيفة لأسرة ريفية.' },
  },
  100: {
    fr: { label: 'Partenaire', impact: 'Une indemnité pour un médiateur de paix communautaire.' },
    ar: { label: 'شريك', impact: 'مكافأة لوسيط سلام مجتمعي.' },
  },
  250: {
    fr: { label: 'Champion', impact: 'Un éclairage solaire pour une salle de classe rurale.' },
    ar: { label: 'نصير', impact: 'إنارة شمسية لفصل دراسي ريفي.' },
  },
};

// Team-member roles — keyed by English role. Names are not translated.
export const roleTranslations: Record<string, FrAr<string>> = {
  President: { fr: 'Président', ar: 'الرئيس' },
  'Secretary General': { fr: 'Secrétaire général', ar: 'الأمين العام' },
  Treasurer: { fr: 'Trésorier', ar: 'أمين الصندوق' },
  'Project Manager & Awareness Officer': {
    fr: 'Chef de projet & responsable de la sensibilisation',
    ar: 'مدير المشاريع ومسؤول التوعية',
  },
  'Official Spokesperson': { fr: 'Porte-parole officiel', ar: 'المتحدث الرسمي' },
};

// Categories — keyed by slug.
export const categoryTranslations: Record<string, FrAr<string>> = {
  'field-updates': { fr: 'Nouvelles du terrain', ar: 'أخبار الميدان' },
  announcements: { fr: 'Annonces', ar: 'إعلانات' },
  partnerships: { fr: 'Partenariats', ar: 'شراكات' },
};
