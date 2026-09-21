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

// News posts — keyed by slug (title, excerpt, body).
export const postTranslations: Record<
  string,
  FrAr<{ title: string; excerpt: string; body: string }>
> = {
  'new-water-points-reach-three-villages-in-north-darfur': {
    fr: {
      title: 'De nouveaux points d’eau desservent trois villages du Darfour du Nord',
      excerpt:
        'Des forages solaires desservent désormais plus de 4 000 personnes dans trois villages jusque-là mal desservis.',
      body: 'Ce trimestre, SRC a achevé trois forages solaires au Darfour du Nord, offrant aux familles un accès fiable à l’eau potable à distance de marche de leur domicile.',
    },
    ar: {
      title: 'نقاط مياه جديدة تصل إلى ثلاث قرى في شمال دارفور',
      excerpt:
        'آبار تعمل بالطاقة الشمسية تخدم الآن أكثر من 4000 شخص في ثلاث قرى كانت محرومة من الخدمات.',
      body: 'أنجزت SRC هذا الربع ثلاثة آبار تعمل بالطاقة الشمسية في شمال دارفور، ما أتاح للأسر وصولًا موثوقًا إلى المياه النظيفة على مسافة سير من منازلها.',
    },
  },
  'src-joins-the-sudan-education-coalition': {
    fr: {
      title: 'SRC rejoint la Coalition soudanaise pour l’éducation',
      excerpt:
        'Un nouveau partenariat pour élargir l’accès aux salles de classe rurales dans cinq États.',
      body: 'Nous sommes fiers d’annoncer que SRC a rejoint la Coalition soudanaise pour l’éducation, un réseau d’organisations œuvrant à maintenir les enfants ruraux à l’école.',
    },
    ar: {
      title: 'SRC تنضمّ إلى التحالف السوداني للتعليم',
      excerpt: 'شراكة جديدة لتوسيع الوصول إلى الفصول الدراسية الريفية في خمس ولايات.',
      body: 'يسعدنا أن نعلن انضمام SRC إلى التحالف السوداني للتعليم، وهو شبكة من المنظمات تعمل على إبقاء أطفال الريف في المدارس.',
    },
  },
  'quarterly-impact-report-now-available': {
    fr: {
      title: 'Le rapport d’impact trimestriel est disponible',
      excerpt:
        'Notre dernier rapport détaille les dépenses et les résultats des programmes dans quinze États.',
      body: 'Le rapport d’impact du premier trimestre est désormais publié, avec les finances par projet et des témoignages de bénéficiaires de l’ensemble de nos programmes.',
    },
    ar: {
      title: 'تقرير الأثر الربع سنوي متاح الآن',
      excerpt: 'يفصّل تقريرنا الأخير نفقات البرامج ونتائجها في خمس عشرة ولاية.',
      body: 'نُشر تقرير الأثر للربع الأول، متضمّنًا البيانات المالية على مستوى المشاريع وقصص المستفيدين من مختلف برامجنا.',
    },
  },
};

// Events — keyed by slug (title, location, body).
export const eventTranslations: Record<
  string,
  FrAr<{ title: string; location: string; body: string }>
> = {
  'annual-community-leaders-forum': {
    fr: {
      title: 'Forum annuel des responsables communautaires',
      location: 'Paris, France',
      body: 'Une rencontre des membres des conseils consultatifs communautaires, des partenaires et de l’équipe pour dresser le bilan de l’année et planifier la suite.',
    },
    ar: {
      title: 'المنتدى السنوي لقادة المجتمع',
      location: 'باريس، فرنسا',
      body: 'لقاء يجمع أعضاء المجالس الاستشارية المجتمعية والشركاء والفريق لمراجعة العام والتخطيط للمستقبل.',
    },
  },
  'webinar-rural-water-resilience': {
    fr: {
      title: 'Webinaire : résilience de l’eau en milieu rural',
      location: 'En ligne',
      body: 'Un webinaire public sur les techniques de gestion durable de l’eau dans les régions arides.',
    },
    ar: {
      title: 'ندوة عبر الإنترنت: صمود المياه في الريف',
      location: 'عبر الإنترنت',
      body: 'ندوة عامة حول تقنيات الإدارة المستدامة للمياه في المناطق الجافة.',
    },
  },
};

// Press releases — keyed by slug (title, body).
export const pressTranslations: Record<string, FrAr<{ title: string; body: string }>> = {
  'src-responds-to-flooding-in-eastern-sudan': {
    fr: {
      title: 'SRC répond aux inondations dans l’est du Soudan',
      body: 'SRC a déployé des équipes d’urgence eau et assainissement en réponse aux inondations saisonnières touchant les communautés rurales de l’est du Soudan.',
    },
    ar: {
      title: 'SRC تستجيب للفيضانات في شرق السودان',
      body: 'نشرت SRC فرق طوارئ للمياه والإصحاح استجابةً للفيضانات الموسمية التي تؤثّر على المجتمعات الريفية في شرق السودان.',
    },
  },
  'statement-on-the-2024-annual-audit': {
    fr: {
      title: 'Déclaration sur l’audit annuel 2024',
      body: 'SRC se félicite de l’achèvement de son audit annuel indépendant, réaffirmant son engagement en faveur de la transparence et de la responsabilité.',
    },
    ar: {
      title: 'بيان بشأن التدقيق السنوي 2024',
      body: 'ترحّب SRC بإتمام تدقيقها السنوي المستقل، مؤكّدةً التزامها بالشفافية والمساءلة.',
    },
  },
};

// Publications — keyed by slug (title, summary).
export const publicationTranslations: Record<string, FrAr<{ title: string; summary: string }>> = {
  'annual-report-2024': {
    fr: {
      title: 'Rapport annuel 2024',
      summary:
        'Un aperçu complet des programmes, des finances et de l’impact dans les quinze États.',
    },
    ar: {
      title: 'التقرير السنوي 2024',
      summary: 'تفصيل كامل للبرامج والموارد المالية والأثر في جميع الولايات الخمس عشرة.',
    },
  },
  'water-resilience-field-brief': {
    fr: {
      title: 'Note de terrain sur la résilience de l’eau',
      summary:
        'Enseignements de trois années de projets de forages solaires dans des districts ruraux arides.',
    },
    ar: {
      title: 'موجز ميداني عن صمود المياه',
      summary:
        'دروس من ثلاث سنوات من مشاريع الآبار العاملة بالطاقة الشمسية في المناطق الريفية الجافة.',
    },
  },
};
