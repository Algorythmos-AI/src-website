// Content lifted from the previously hard-coded components so nothing is lost
// when the frontend switches to the CMS (Phase 4). Sources:
//   src/app/(frontend)/[locale]/page.tsx, src/views/Work.tsx, Impact.tsx,
//   About.tsx, Donate.tsx.

export const programs = [
  {
    title: 'Resilient Peacebuilding',
    tag: 'Initiative',
    summary:
      'Restoring communal harmony through traditional mediation and youth-led dialogue programs across Darfur and Kordofan.',
    order: 1,
    image:
      'https://images.unsplash.com/photo-1608317544280-9e9916b8c54d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Rural Education Centers',
    tag: 'Development',
    summary:
      'Tech-enabled learning spaces for children in underserved rural districts, bridging the literacy gap in North Sudan.',
    order: 2,
    image:
      'https://images.unsplash.com/photo-1596895307394-1d15bf597744?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Emergency Water Relief',
    tag: 'Humanitarian',
    summary:
      'Solar-powered boreholes and sustainable water management for arid rural communities across North Sudan.',
    order: 3,
    image:
      'https://images.unsplash.com/photo-1663876458229-4a7ac3e4be45?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Mobile Health Clinics',
    tag: 'Health',
    summary:
      'Reaching remote settlements with primary care, maternal health, and vaccination drives.',
    order: 4,
    image:
      'https://images.unsplash.com/photo-1705676112042-4fb11cade8d4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Sustainable Agriculture',
    tag: 'Livelihoods',
    summary:
      'Training farmers in drought-resistant techniques and connecting cooperatives to markets.',
    order: 5,
    image:
      'https://images.unsplash.com/photo-1633215357805-310e47d9c72e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: "Women's Cooperatives",
    tag: 'Empowerment',
    summary:
      'Micro-grants and vocational training that put economic agency in the hands of rural women.',
    order: 6,
    image:
      'https://plus.unsplash.com/premium_photo-1699535657712-02fe404e916f?q=80&w=2070&auto=format&fit=crop',
  },
];

export const partners = ['UNICEF', 'WFP', 'OCHA', 'OXFAM', 'IRC', 'UNHCR'].map((name, i) => ({
  name,
  order: i + 1,
}));

export const leadership = [
  { name: 'Obeid NAEIM', role: 'President', file: 'Obeid-NAEIM.webp' },
  { name: 'Elzubier MOHAMED', role: 'Secretary General', file: 'Elzubier-MOHAMED.webp' },
  { name: 'Nasradine Ibrahim', role: 'Treasurer', file: 'Nasradine-Ibrahim.webp' },
  { name: 'Musab ALALIM', role: 'Project Manager & Awareness Officer', file: 'Musab-ALALIM.webp' },
  { name: 'Assamani BASHIR', role: 'Official Spokesperson', file: 'Assamani-BASHIR.webp' },
].map((m, i) => ({ ...m, order: i + 1, group: 'leadership' as const }));

export const impactStats = [
  { value: '125,000+', label: 'People reached' },
  { value: '45', label: 'Active programs' },
  { value: '18', label: 'Field sites' },
  { value: '800+', label: 'Volunteers' },
];

export const donateTiers = [
  { amount: 25, label: 'Friend', impact: 'School supplies for one child for a term.' },
  { amount: 50, label: 'Supporter', impact: 'A month of clean water for a rural family.' },
  { amount: 100, label: 'Partner', impact: 'Stipend for a community peace mediator.' },
  { amount: 250, label: 'Champion', impact: 'Solar lighting for a rural classroom.' },
];

export const categories = [
  { title: 'Field Updates' },
  { title: 'Announcements' },
  { title: 'Partnerships' },
];

export const posts = [
  {
    title: 'New water points reach three villages in North Darfur',
    excerpt:
      'Solar-powered boreholes now serve over 4,000 people across three previously underserved villages.',
    category: 'Field Updates',
    body: 'This quarter SRC completed three solar-powered boreholes in North Darfur, giving families reliable access to clean water within walking distance of their homes.',
    daysAgo: 5,
  },
  {
    title: 'SRC joins the Sudan Education Coalition',
    excerpt: 'A new partnership to expand rural classroom access across five states.',
    category: 'Partnerships',
    body: 'We are proud to announce that SRC has joined the Sudan Education Coalition, a network of organizations working to keep rural children in school.',
    daysAgo: 18,
  },
  {
    title: 'Quarterly impact report now available',
    excerpt: 'Our latest report details program spending and outcomes across fifteen states.',
    category: 'Announcements',
    body: 'The Q1 impact report is now published, with project-level financials and beneficiary stories from across our programs.',
    daysAgo: 32,
  },
];

export const events = [
  {
    title: 'Annual community leaders forum',
    location: 'Paris, France',
    online: false,
    body: 'A gathering of community advisory board members, partners, and staff to review the year and plan ahead.',
    startInDays: 21,
    durationHours: 6,
  },
  {
    title: 'Webinar: rural water resilience',
    location: 'Online',
    online: true,
    registrationUrl: 'https://example.org/register',
    body: 'A public webinar on sustainable water management techniques for arid regions.',
    startInDays: -30,
    durationHours: 2,
  },
];

export const pressReleases = [
  {
    title: 'SRC responds to flooding in eastern Sudan',
    body: 'SRC has deployed emergency water and sanitation teams in response to seasonal flooding affecting rural communities in eastern Sudan.',
    contact: 'press@src-sudan.org',
    daysAgo: 10,
  },
  {
    title: 'Statement on the 2024 annual audit',
    body: 'SRC welcomes the completion of its independent annual audit, reaffirming our commitment to transparency and accountability.',
    contact: 'press@src-sudan.org',
    daysAgo: 40,
  },
];

export const publications = [
  {
    title: 'Annual Report 2024',
    type: 'annual-report',
    year: 2024,
    summary: 'A complete breakdown of programs, finances, and impact across all fifteen states.',
  },
  {
    title: 'Water resilience field brief',
    type: 'brief',
    year: 2025,
    summary: 'Lessons from three years of solar-powered borehole projects in arid rural districts.',
  },
];
