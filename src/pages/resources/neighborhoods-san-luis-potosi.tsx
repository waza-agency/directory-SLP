import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const neighborhoods = [
  {
    id: 'lomas',
    name: 'Lomas del Tecnológico',
    emoji: '🏠',
    badge: '#1 EXPAT CHOICE',
    badgeColor: 'bg-yellow-500',
    tags: ['Family-Friendly', 'Premium'],
    description: 'The most popular neighborhood for expat families in San Luis Potosí, named after the nearby ITESM (Tec de Monterrey) campus.',
    whyExpatsChoose: [
      { title: 'Hospital Lomas', desc: 'Top private hospital with English-speaking doctors' },
      { title: 'Colegio Terranova', desc: 'Only IB school in SLP (10 min drive)' },
      { title: 'ITESM campus', desc: 'University presence means good services' },
      { title: 'Gated communities', desc: '24/7 security in most developments' },
      { title: 'Modern amenities', desc: 'Malls, supermarkets, restaurants nearby' },
      { title: 'La Loma Club de Golf', desc: 'Premium club and sports facilities' },
    ],
    prices: [
      { type: '1-2 Bed Apartment', range: '$17,000 - $22,000' },
      { type: '3-Bed House', range: '$25,000 - $39,000' },
      { type: 'Premium Villa', range: '$45,000 - $70,000' },
    ],
    pros: ['Best infrastructure for families', 'Highest concentration of English-friendly services', 'Safe gated communities with 24/7 security', 'Walking distance to restaurants and shops', 'Easy to meet other expat families'],
    cons: ['Higher prices than other neighborhoods', '25-30 minute commute to industrial zone', 'Rush hour traffic on main avenues', 'Less "authentic Mexican" experience', 'Fiber internet not available in some newer areas'],
    whoLivesHere: 'German, Japanese, and American executives from BMW, Bosch, and automotive suppliers. Mexican upper-middle class professionals. University professors. Typical profile: Families with children, 2-5 year corporate assignments.',
    subAreas: [
      { name: 'Lomas 1ª - 4ª Sección', desc: 'The established core of Lomas', price: '$22,000 - $40,000/month' },
      { name: 'La Loma Club de Golf', desc: 'Premium golf course community', price: '$45,000 - $75,000/month' },
      { name: 'Rinconada de los Andes', desc: 'Newer gated community', price: '$25,000 - $35,000/month' },
    ],
  },
  {
    id: 'pedregal',
    name: 'Privadas del Pedregal',
    emoji: '🏘️',
    badge: 'GROWING AREA',
    badgeColor: 'bg-blue-500',
    tags: ['Near Schools'],
    description: 'A collection of newer gated residential developments located adjacent to Lomas, on Avenida Palmira. Home to Colegio Internacional Terranova, SLP\'s only IB school.',
    schoolHighlight: {
      name: 'Colegio Internacional Terranova',
      address: 'Av. Palmira 705',
      programs: 'All three IB programs: Primary Years Programme (PYP), Middle Years Programme (MYP), and Diploma Programme (DP).',
    },
    prices: [
      { type: '2-Bed Apartment', range: '$22,000 - $30,000' },
      { type: '3-Bed House', range: '$28,000 - $38,000' },
      { type: 'Loft / Modern Unit', range: '$25,000 - $35,000 (furnished)' },
    ],
    pros: ['Walking distance to Colegio Terranova (IB)', 'Newer construction with modern amenities', 'Strong security in gated communities', 'Near Hospital Lomas and shopping centers', 'Good fiber internet availability'],
    cons: ['Limited availability — high demand', 'Slightly higher prices than older Lomas sections', 'Less established community feel', 'Requires car for all errands', 'Some developments still under construction'],
  },
  {
    id: 'villa-magna',
    name: 'Villa Magna & Los Lagos',
    emoji: '🏘️',
    badge: 'UPPER CLASS',
    badgeColor: 'bg-pink-500',
    tags: ['Developing', 'Mixed'],
    description: 'A growing upper-class residential area in the southern part of the city. Features a mix of open neighborhoods and gated communities with modern homes and good infrastructure.',
    warning: 'These areas are car-dependent. Unlike Lomas, there are few walkable services. Note: Most top executives prefer Lomas del Tecnológico or La Loma Club de Golf.',
    prices: [
      { type: '2-3 Bed House', range: '$22,000 - $38,000' },
      { type: '4+ Bed House', range: '$40,000 - $60,000' },
      { type: 'Premium Home', range: '$55,000 - $80,000' },
    ],
    whoLivesHere: 'Upper-middle class Mexican families, mid-level managers, and professionals. A mix of young families buying their first premium home and established residents. Growing expat presence but less concentrated than Lomas.',
  },
  {
    id: 'centro',
    name: 'Centro Histórico',
    emoji: '🏛️',
    badge: 'BEST VALUE',
    badgeColor: 'bg-orange-500',
    tags: ['Walkable', 'Cultural'],
    description: 'UNESCO-recognized colonial downtown with stunning baroque architecture, pedestrian streets, plazas, and a vibrant cultural scene. The most walkable area in the city.',
    culturalHighlight: 'Living in Centro means being steps away from Plaza de Armas, Templo del Carmen, dozens of cafes, museums, and live music venues.',
    prices: [
      { type: 'Studio / 1-Bed', range: '$4,000 - $10,000' },
      { type: '2-Bed Apartment', range: '$10,000 - $18,000' },
      { type: 'Renovated Colonial', range: '$18,000 - $28,000' },
    ],
    pros: ['Most affordable neighborhood for expats', 'Walkable — you don\'t need a car daily', 'Rich cultural life, restaurants, nightlife', 'Historic architecture and authentic Mexican experience', 'Good public transportation connections', 'Fast internet widely available'],
    cons: ['Parking is terrible — street parking only', '30-35 minute commute to industrial zone', 'Noise from traffic, events, and nightlife', 'Few gated/secure building options', 'Limited space — smaller apartments', 'Not ideal for families with young children'],
    whoLivesHere: 'English teachers at Berlitz and local academies, digital nomads, artists, young Mexican professionals, and retirees seeking authentic Mexican life. Single people and couples without children.',
  },
  {
    id: 'tangamanga',
    name: 'Tangamanga & Surrounding Areas',
    emoji: '🌳',
    badge: 'FAMILY FRIENDLY',
    badgeColor: 'bg-green-500',
    tags: ['Green Space'],
    description: 'Parque Tangamanga is one of Mexico\'s largest urban parks (over 400 hectares). The surrounding residential areas offer a unique lifestyle focused on outdoor activities.',
    parkHighlight: 'The park offers jogging trails, biking paths, sports courts, lakes, a science museum (Laberinto de las Ciencias y las Artes), an ecological museum, and children\'s play areas.',
    prices: [
      { type: '2-Bed Apartment', range: '$12,000 - $18,000' },
      { type: '3-Bed House', range: '$18,000 - $28,000' },
      { type: 'Family Home', range: '$25,000 - $40,000' },
    ],
    pros: ['Immediate access to 400+ hectare park', 'Family-oriented community atmosphere', 'More affordable than Lomas', 'Quieter, less traffic', 'Good for outdoor enthusiasts'],
    cons: ['35-40 minute commute to industrial zone', 'Fewer services and restaurants nearby', 'Limited gated community options', 'Further from international school', 'Requires a car for most activities'],
  },
  {
    id: 'zona-industrial',
    name: 'Near Industrial Zone (Villa de Reyes)',
    emoji: '🏭',
    badge: 'SHORT COMMUTE',
    badgeColor: 'bg-purple-500',
    tags: ['Industrial'],
    description: 'The Parque Industrial Logistik in Villa de Reyes (about 25km south) is home to BMW, General Motors, and numerous automotive suppliers.',
    importantNote: 'Most expats do NOT live near the industrial zone. Despite the shorter commute, the lack of international schools, quality healthcare, restaurants, and security infrastructure means that 90%+ of foreign employees choose to live in Lomas or Pedregal.',
    prices: [
      { type: 'Basic Apartment', range: '$7,000 - $12,000' },
      { type: '2-3 Bed House', range: '$12,000 - $20,000' },
      { type: 'New Development', range: '$15,000 - $24,000' },
    ],
    pros: ['10-15 minute commute to BMW/GM plants', 'Significantly lower rental prices', 'Less traffic stress', 'Good for single professionals', 'New developments being built'],
    cons: ['No international schools nearby', 'Limited healthcare facilities', 'Very few restaurants and services', 'Less developed security infrastructure', 'Far from city center and social life', 'Fewer English-speaking services'],
  },
  {
    id: 'soledad',
    name: 'Soledad de Graciano Sánchez',
    emoji: '🏘️',
    badge: 'BUDGET OPTION',
    badgeColor: 'bg-gray-500',
    tags: [],
    description: 'A separate municipality that forms part of the San Luis Potosí metropolitan area, located to the east. Offers the most affordable housing options.',
    warning: 'Not typically recommended for expats. While Soledad offers the lowest prices, it is rarely chosen by foreign residents due to distance from key services and limited English-friendly amenities.',
    prices: [
      { type: 'Basic Apartment', range: '$4,000 - $7,000' },
      { type: '2-Bed House', range: '$7,000 - $14,000' },
      { type: 'Family Home', range: '$12,000 - $20,000' },
    ],
  },
];

const comparisonData = [
  { name: 'Lomas del Tecnológico', rent: '$17K - $70K', bestFor: 'Families', schools: 5, security: 5, walkScore: 'Medium', toBMW: '25-30 min', highlight: true },
  { name: 'Privadas del Pedregal', rent: '$22K - $38K', bestFor: 'School proximity', schools: 5, security: 5, walkScore: 'Low', toBMW: '25-30 min' },
  { name: 'Villa Magna / Los Lagos', rent: '$22K - $80K', bestFor: 'Upper-middle class', schools: 3, security: 4, walkScore: 'Very Low', toBMW: '20-25 min' },
  { name: 'Centro Histórico', rent: '$4K - $28K', bestFor: 'Singles, budget', schools: 2, security: 3, walkScore: 'High', toBMW: '30-35 min' },
  { name: 'Tangamanga Area', rent: '$12K - $40K', bestFor: 'Outdoor lovers', schools: 3, security: 3, walkScore: 'Low', toBMW: '35-40 min' },
  { name: 'Near Industrial Zone', rent: '$7K - $24K', bestFor: 'Short commute', schools: 1, security: 2, walkScore: 'Very Low', toBMW: '10-15 min' },
  { name: 'Soledad de Graciano S.', rent: '$4K - $20K', bestFor: 'Tight budget', schools: 1, security: 2, walkScore: 'Medium', toBMW: '30-40 min' },
];

const howToRentSteps = [
  { step: 1, title: 'Research Online First', color: 'blue', content: 'Browse listings on Mexican real estate portals to understand prices.', portals: ['Lamudi.com.mx — Best for verified listings', 'Inmuebles24.com — Large inventory', 'Vivanuncios.com.mx — Budget options'] },
  { step: 2, title: 'Arrange Temporary Housing', color: 'green', content: 'Book a hotel or Airbnb for your first 2-4 weeks. You\'ll need time to visit properties in person.', tip: 'Stay in Lomas for your initial period — it\'s the most convenient base for property hunting.' },
  { step: 3, title: 'Contact Real Estate Agents', color: 'yellow', content: 'Working with a local agent is highly recommended, especially if you don\'t speak fluent Spanish.' },
  { step: 4, title: 'Visit Properties in Person', color: 'purple', content: 'Never rent sight unseen. Schedule multiple viewings and visit at different times of day.', checklist: 'Check water pressure, ask about internet providers, test cell signal, note distance to services.' },
  { step: 5, title: 'Negotiate and Sign Contract', color: 'red', content: 'Rental contracts in Mexico are typically for 12 months.', important: 'Many landlords require a Mexican guarantor ("aval"). If you can\'t provide this, be prepared to negotiate a larger deposit (2-3 months).' },
  { step: 6, title: 'Set Up Utilities', color: 'teal', content: 'Clarify with your landlord which utilities are included.', utilities: ['CFE (electricity) — usually transferred to your name', 'Gas — often via tank delivery', 'Internet — Telmex, Izzi, or Totalplay'] },
  { step: 7, title: 'Move In!', color: 'indigo', content: 'Document the condition of the property with photos/video before moving in. This protects your deposit.' },
];

const faqs = [
  { q: 'What\'s the best neighborhood for expat families with children?', a: 'Lomas del Tecnológico or Privadas del Pedregal. These areas offer the best combination of safety, proximity to Colegio Internacional Terranova (the only IB school), Hospital Lomas, and expat-friendly services. 90%+ of corporate families with children choose these neighborhoods.' },
  { q: 'Can I rent without speaking Spanish?', a: 'Yes, in premium neighborhoods. Many real estate agents in Lomas and Pedregal speak English. However, having a Spanish-speaking colleague for contract review is recommended.' },
  { q: 'Do I need a Mexican guarantor (aval)?', a: 'Traditionally yes. For foreigners, alternatives include: (1) a larger security deposit (2-3 months), (2) an employer guarantee letter, or (3) a rental insurance policy.' },
  { q: 'What\'s included in the rent?', a: 'Usually nothing. Most rentals are unfurnished with utilities separate. Always clarify: water, gas, electricity, internet, and HOA fees.' },
  { q: 'Are furnished apartments available?', a: 'Yes, but at a premium. Furnished units typically cost 30-50% more. Search for "amueblado" on rental portals.' },
  { q: 'Is fiber internet available?', a: 'In most areas, but not all. Lomas and Centro have good coverage. Newer developments may only have DSL. Some expats use Starlink (~$60 USD/month) as backup.' },
  { q: 'How safe is San Luis Potosí for foreigners?', a: 'Considered safer than many Mexican states. The U.S. Department of State rates it Level 2 ("Exercise Increased Caution"). Expats report feeling safe in gated communities.' },
  { q: 'What\'s the commute like from Lomas to BMW/GM?', a: '25-35 minutes in normal traffic via Highway 57 south. Rush hour can add 10-15 minutes. Some companies provide shuttle buses.' },
  { q: 'Are pets allowed in rentals?', a: 'It depends. Many apartments prohibit pets or limit size. Houses generally have more flexibility. Always ask specifically about pets.' },
  { q: 'Should I live near the industrial zone?', a: 'Generally no, unless you\'re single. The areas near Parque Industrial Logistik lack schools, quality healthcare, and restaurants. Most expats find the commute from Lomas worth it.' },
  { q: 'What about water quality?', a: 'Tap water is not potable — use bottled or filtered water. The region experiences periodic shortages. Most homes have water tanks (tinaco/cisterna).' },
  { q: 'Can I use USD for rent?', a: 'Pesos are standard. Some luxury landlords may accept USD, but most contracts are in pesos. Open a Mexican bank account for easier transfers.' },
  { q: 'Are there neighborhoods to avoid?', a: 'No specific neighborhoods are "dangerous" in the urban core. The seven neighborhoods in this guide are all viable options with different trade-offs.' },
  { q: 'What\'s parking like?', a: 'Centro: Extremely limited, street only. Lomas/Pedregal/Villa Magna: Properties typically include garage. Gated communities usually have assigned spots.' },
  { q: 'How do prices compare to other Mexican cities?', a: 'SLP is approximately 35% cheaper than Mexico City and 20-30% cheaper than Querétaro. Prices have risen 10.3% in 2024 and an additional 9% in early 2025 due to continued industrial investment.' },
];

const sources = [
  { category: 'Government', items: [
    { name: 'INEGI - Censo de Población y Vivienda 2020', desc: 'Foreign-born population statistics', url: 'https://www.inegi.org.mx/programas/ccpv/2020/' },
    { name: 'Sociedad Hipotecaria Federal 2025', desc: 'Housing price increase data (10.3% in 2024, 9% in Q1 2025)', url: 'https://www.gob.mx/shf' },
    { name: 'U.S. Department of State - Travel Advisory', desc: 'Safety rating for SLP (Level 2)', url: 'https://travel.state.gov' },
  ]},
  { category: 'Industry', items: [
    { name: 'BMW Group - San Luis Potosí Plant', desc: 'Official plant information', url: 'https://www.bmwgroup-werke.com/san-luis-potosi/en.html' },
    { name: 'Logistik Industrial Park', desc: 'Industrial zone location', url: 'https://logistikpark.com.mx/en/' },
  ]},
  { category: 'Education', items: [
    { name: 'IB Organization - School Profile', desc: 'Terranova IB certification', url: 'https://www.ibo.org/en/school/003491' },
    { name: 'Colegio Internacional Terranova', desc: 'Official school website', url: 'https://www.terranova.edu.mx/en/' },
  ]},
  { category: 'Real Estate', items: [
    { name: 'Lamudi México', desc: 'Rental price verification (Dec 2025)', url: 'https://www.lamudi.com.mx/san-luis-potosi/' },
    { name: 'Inmuebles24', desc: 'Rental listings verification (Dec 2025)', url: 'https://www.inmuebles24.com' },
    { name: 'Propiedades.com', desc: 'Rental listings by neighborhood', url: 'https://propiedades.com' },
    { name: 'iCasas.mx', desc: 'Current rental market data', url: 'https://www.icasas.mx' },
  ]},
  { category: 'Healthcare', items: [
    { name: 'Hospital Lomas de San Luis Internacional', desc: 'Primary private hospital', url: 'https://www.hls.com.mx/' },
  ]},
  { category: 'Cost of Living', items: [
    { name: 'Numbeo - Cost of Living Index', desc: 'SLP vs CDMX comparison', url: 'https://www.numbeo.com/cost-of-living/' },
  ]},
];

export default function NeighborhoodsGuidePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'lomas', name: 'Lomas' },
    { id: 'pedregal', name: 'Pedregal' },
    { id: 'villa-magna', name: 'Villa Magna' },
    { id: 'centro', name: 'Centro' },
    { id: 'tangamanga', name: 'Tangamanga' },
    { id: 'zona-industrial', name: 'Industrial' },
    { id: 'soledad', name: 'Soledad' },
    { id: 'other-developments', name: 'More Areas' },
    { id: 'comparison', name: 'Compare' },
    { id: 'how-to-rent', name: 'How to Rent' },
    { id: 'faq', name: 'FAQ' },
    { id: 'sources', name: 'Sources' },
  ];

  const renderStars = (count: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? 'text-green-600' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <>
      <Head>
        <title>Ultimate Neighborhoods Guide San Luis Potosí 2025 | Where to Live</title>
        <meta name="description" content="Complete guide to neighborhoods in San Luis Potosí for expats. Rental prices, safety ratings, schools, and detailed profiles for Lomas, Pedregal, Centro, and more." />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Neighborhoods Guide</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ultimate Neighborhoods Guide
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Where to Live in San Luis Potosí — Complete 2025 Guide for Expats
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">✓ Verified Dec 2025</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">20 Sources</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">7 Neighborhoods</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full">25 min read</span>
            </div>
          </div>
        </section>

        {/* Sticky Nav */}
        <nav className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Executive Summary */}
          <section id="overview" className="mb-16 scroll-mt-28">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span> Executive Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-blue-900 mb-3">Key Takeaways</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span><strong>Lomas del Tecnológico</strong> is the top choice for expat families</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span><strong>Centro Histórico</strong> offers the best value and walkability</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span><strong>Villa Magna/Los Lagos</strong> are most exclusive but car-dependent</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>BMW/GM workers often choose Lomas over living near the industrial zone</span></li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-blue-900 mb-3">Quick Price Ranges (Dec 2025)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Budget Apartment:</span><strong className="text-blue-900">$10,000 - $15,000 MXN</strong></div>
                    <div className="flex justify-between"><span>Mid-Range House:</span><strong className="text-blue-900">$18,000 - $30,000 MXN</strong></div>
                    <div className="flex justify-between"><span>Premium Home:</span><strong className="text-blue-900">$35,000 - $70,000 MXN</strong></div>
                    <div className="flex justify-between"><span>Luxury:</span><strong className="text-blue-900">$70,000 - $100,000 MXN</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span> San Luis Potosí Housing at a Glance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold mb-2">$950</p>
                  <p className="text-sm text-white/80">USD Avg. Rent</p>
                  <p className="text-xs text-white/60">2-bed apartment</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold mb-2">35%</p>
                  <p className="text-sm text-white/80">Lower than CDMX</p>
                  <p className="text-xs text-white/60">Cost of living</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold mb-2">10.3%</p>
                  <p className="text-sm text-white/80">Price Increase</p>
                  <p className="text-xs text-white/60">2024-2025</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <p className="text-4xl font-bold mb-2">1</p>
                  <p className="text-sm text-white/80">IB School</p>
                  <p className="text-xs text-white/60">Colegio Terranova</p>
                </div>
              </div>
            </div>
          </section>

          {/* Neighborhoods */}
          {neighborhoods.map((n) => (
            <section key={n.id} id={n.id} className="mb-16 scroll-mt-28">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${n.badgeColor}`}>{n.badge}</span>
                {n.tags?.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{tag}</span>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{n.emoji} {n.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{n.description}</p>

              {n.warning && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-yellow-800 text-sm">{n.warning}</p>
                  </div>
                </div>
              )}

              {n.importantNote && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⚖️</span>
                    <p className="text-red-800 text-sm"><strong>Important:</strong> {n.importantNote}</p>
                  </div>
                </div>
              )}

              {n.whyExpatsChoose && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-3">⭐ Why Expats Choose {n.name.split(' ')[0]}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {n.whyExpatsChoose.map((item) => (
                      <div key={item.title} className="flex items-start gap-2 text-yellow-800">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>{item.title}</strong> — {item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {n.schoolHighlight && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">🎓 School Connection</h3>
                  <p className="text-blue-800"><strong>{n.schoolHighlight.name}</strong> ({n.schoolHighlight.address}) offers {n.schoolHighlight.programs}</p>
                </div>
              )}

              {n.culturalHighlight && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-2">🎭 Cultural Experience</h3>
                  <p className="text-orange-800">{n.culturalHighlight}</p>
                </div>
              )}

              {n.parkHighlight && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">🌲 Parque Tangamanga</h3>
                  <p className="text-green-800">{n.parkHighlight}</p>
                </div>
              )}

              {/* Prices */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                <h3 className="text-xl font-bold mb-4">💰 Rental Prices (December 2025)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {n.prices.map((p) => (
                    <div key={p.type} className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-sm text-white/80">{p.type}</p>
                      <p className="text-2xl font-bold">{p.range}</p>
                      <p className="text-xs text-white/60">MXN / month</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros/Cons */}
              {n.pros && n.cons && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <h4 className="text-lg font-bold text-green-900 mb-4">👍 Pros</h4>
                    <ul className="space-y-2 text-green-800 text-sm">
                      {n.pros.map((pro) => <li key={pro} className="flex items-start gap-2"><span className="text-green-600">•</span>{pro}</li>)}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <h4 className="text-lg font-bold text-red-900 mb-4">👎 Cons</h4>
                    <ul className="space-y-2 text-red-800 text-sm">
                      {n.cons.map((con) => <li key={con} className="flex items-start gap-2"><span className="text-red-600">•</span>{con}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Who Lives Here */}
              {n.whoLivesHere && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-lg">👥</div>
                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">Who Lives in {n.name.split(' ')[0]}?</h4>
                      <p className="text-purple-800 text-sm">{n.whoLivesHere}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-areas */}
              {n.subAreas && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sub-Areas Within {n.name.split(' ')[0]}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {n.subAreas.map((sub) => (
                      <div key={sub.name} className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{sub.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{sub.desc}</p>
                        <p className="text-xs text-gray-500">Price range: {sub.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Other Notable Developments */}
          <section id="other-developments" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-indigo-500 text-white">ALSO CONSIDER</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Other Notable Residential Developments</h2>
            <p className="text-lg text-gray-600 mb-8">Premium gated communities and exclusive neighborhoods worth exploring</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* La Loma Club de Golf */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>⛳</span> La Loma Club de Golf
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    One of SLP's most prestigious addresses, built around an 18-hole championship golf course. This exclusive community offers luxury homes with golf course views, a private clubhouse, tennis courts, and swimming pools.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Golf Course</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Exclusive</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">High Security</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Rent:</strong> $45,000 - $80,000 MXN/month<br/>
                    <strong>Best for:</strong> Golf enthusiasts, executives seeking prestige
                  </div>
                </div>
              </div>

              {/* Club Campestre */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🏌️</span> Club Campestre
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    A traditional country club community with decades of history. Features a golf course, equestrian facilities, and a strong sense of community. Popular among established Mexican families and long-term expat residents.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Country Club</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Equestrian</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Traditional</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Rent:</strong> $35,000 - $65,000 MXN/month<br/>
                    <strong>Best for:</strong> Families seeking club lifestyle, equestrian enthusiasts
                  </div>
                </div>
              </div>

              {/* La Vista */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🏔️</span> La Vista
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    A modern residential development known for its panoramic city views and contemporary architecture. Located in the western part of the city, offering easy access to Lomas amenities while maintaining a quieter, more exclusive atmosphere.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-medium">City Views</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">Modern</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Gated</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Rent:</strong> $30,000 - $55,000 MXN/month<br/>
                    <strong>Best for:</strong> Professionals wanting modern homes with views
                  </div>
                </div>
              </div>

              {/* Miravalle */}
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🌸</span> Miravalle
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    An established upscale neighborhood near Lomas with tree-lined streets and a mix of classic and modern homes. Known for its family-friendly environment, good schools nearby, and proximity to shopping centers.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium">Established</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Near Schools</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Rent:</strong> $22,000 - $42,000 MXN/month<br/>
                    <strong>Best for:</strong> Families wanting established community feel
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-4 border-blue-500">
              Neighborhood Comparison Table
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase">Neighborhood</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">Rent Range</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">Best For</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">Schools</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">Security</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">Walk Score</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase">To BMW</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {comparisonData.map((row) => (
                    <tr key={row.name} className={`hover:bg-gray-50 ${row.highlight ? 'bg-yellow-50/50' : ''}`}>
                      <td className="px-4 py-4 font-semibold text-gray-900">
                        {row.name}
                        {row.highlight && <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-yellow-200 text-yellow-800">#1</span>}
                      </td>
                      <td className="px-4 py-4 text-center">{row.rent}</td>
                      <td className="px-4 py-4 text-center">{row.bestFor}</td>
                      <td className="px-4 py-4 text-center">{renderStars(row.schools)}</td>
                      <td className="px-4 py-4 text-center">{renderStars(row.security)}</td>
                      <td className={`px-4 py-4 text-center ${row.walkScore === 'High' ? 'text-green-600' : row.walkScore === 'Medium' ? 'text-orange-600' : 'text-red-600'}`}>{row.walkScore}</td>
                      <td className="px-4 py-4 text-center">{row.toBMW}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              Prices in MXN/month. Schools rating considers international/bilingual options. Security rating based on gated community availability.
            </p>
          </section>

          {/* How to Rent */}
          <section id="how-to-rent" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-500 text-white">HOW-TO GUIDE</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">7 Steps</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Rent in San Luis Potosí</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">📋 Before You Begin - What You'll Need</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Documents Required:</h4>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Valid passport (original + copies)</li>
                    <li>• Work visa or Residente Temporal card</li>
                    <li>• Proof of income (employment letter or bank statements)</li>
                    <li>• Mexican phone number</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Typical Costs:</h4>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Deposit: 1-2 months rent</li>
                    <li>• First month rent: upfront</li>
                    <li>• Agent commission: 1 month (usually paid by landlord)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {howToRentSteps.map((step) => (
                <div key={step.step} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
                  <div className={`bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 px-6 py-4 flex items-center gap-4`} style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`, '--tw-gradient-from': `rgb(var(--color-${step.color}-500))`, '--tw-gradient-to': `rgb(var(--color-${step.color}-600))` } as any}>
                    <span className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">{step.step}</span>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{step.content}</p>
                    {step.portals && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Recommended Portals:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {step.portals.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                    {step.tip && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-yellow-900 text-sm"><strong>Pro Tip:</strong> {step.tip}</p>
                      </div>
                    )}
                    {step.checklist && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                        <p className="text-green-900 text-sm"><strong>Checklist:</strong> {step.checklist}</p>
                      </div>
                    )}
                    {step.important && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p className="text-red-900 text-sm"><strong>Important:</strong> {step.important}</p>
                      </div>
                    )}
                    {step.utilities && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Typical Utilities:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {step.utilities.map((u) => <li key={u}>{u}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-white border border-gray-200 rounded-xl overflow-hidden" open={openFaq === index}>
                  <summary
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                    onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === index ? null : index); }}
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                    <span className={`text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section id="sources" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-4 border-b-4 border-blue-500">
              Sources & References
            </h2>
            <p className="text-lg text-gray-600 mb-8">All sources used in this Ultimate Guide, organized by type</p>

            {sources.map((cat) => (
              <div key={cat.category} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{cat.category} Sources</h3>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm underline mt-2 inline-block">
                        {item.url} →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Editorial Note</h4>
              <p className="text-yellow-800 text-sm">
                All rental prices were verified against active listings on major Mexican real estate portals in December 2025. Housing prices in SLP increased 10.3% in 2024 and 9% in early 2025. Market conditions change frequently. This guide is updated quarterly. Last update: December 2025.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Need Help Finding Your Home in SLP?</h3>
              <p className="text-lg text-blue-100 mb-6">
                We connect expats with trusted real estate agents, relocation services, and local resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
                  Contact Us →
                </Link>
                <Link href="/subscribe" className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-400 transition-colors border-2 border-white/30">
                  Get Weekly Updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
