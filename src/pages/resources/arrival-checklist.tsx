import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ChecklistItem {
  title: string;
  description: string;
  link?: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}

export default function ArrivalChecklistPage() {
  const [activeSection, setActiveSection] = useState('first-week');

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

  const categories: ChecklistCategory[] = [
    {
      id: 'first-week',
      title: 'First Week Essentials',
      icon: '📱',
      color: 'from-red-500 to-orange-500',
      items: [
        { title: 'Get a Mexican SIM card', description: 'Telcel (best coverage), AT&T, or Movistar. Available at OXXO or carrier stores. $150-300 MXN.' },
        { title: 'Download essential apps', description: 'Uber, DiDi (rides), Rappi (delivery), Google Maps, WhatsApp (primary messaging).' },
        { title: 'Withdraw pesos from ATM', description: 'Use ATMs inside banks (Santander, BBVA). Decline conversion to home currency.' },
        { title: 'Keep cash on hand', description: 'Many places are cash-only. Keep $500-1,000 MXN for daily needs.' },
        { title: 'Learn basic Spanish phrases', description: '"Buenos días", "Gracias", "¿Cuánto cuesta?", "La cuenta, por favor".' },
        { title: 'Download Google Translate', description: 'Get the Spanish offline pack. Camera feature helps with menus and signs.' },
      ]
    },
    {
      id: 'administrative',
      title: 'Administrative Tasks',
      icon: '🏛️',
      color: 'from-purple-500 to-violet-500',
      items: [
        { title: 'INM address registration', description: 'Required within 90 days if you have residency. Bring passport, residency card, proof of address.', link: 'https://www.gob.mx/inm' },
        { title: 'Get your CURP', description: 'Mexico\'s population ID. Free at Registro Civil with passport and residency card.', link: 'https://www.gob.mx/curp/' },
        { title: 'Obtain RFC (if working)', description: 'Tax ID for employment. Apply at SAT office with CURP, passport, proof of address.', link: 'https://www.sat.gob.mx/' },
        { title: 'Register at your consulate', description: 'For emergency assistance and voting abroad. Most done online.' },
        { title: 'Mexican driver\'s license (optional)', description: 'Apply at Secretaría de Seguridad Pública. Cost: ~$800-1,200 MXN.' },
      ]
    },
    {
      id: 'home-services',
      title: 'Home & Services',
      icon: '🔌',
      color: 'from-amber-500 to-yellow-500',
      items: [
        { title: 'Set up electricity (CFE)', description: 'Transfer account at CFE office with lease and ID. Pay at OXXO or online.', link: 'https://www.cfe.mx/' },
        { title: 'Set up water (INTERAPAS)', description: 'Transfer at INTERAPAS office. Bills typically $150-400 MXN/month.', link: 'https://www.interapas.gob.mx/' },
        { title: 'Arrange gas delivery', description: 'Providers: Gas Express Nieto, Zeta Gas. Stationary tanks refilled, portable exchanged.' },
        { title: 'Set up internet', description: 'Telmex (most coverage), Totalplay (fiber), Izzi. Plans $400-800 MXN/month.' },
        { title: 'Buy water garrafones', description: 'Tap water NOT drinkable. Buy 5-gallon jugs from Bonafont, Ciel. ~$30-40 MXN each.' },
        { title: 'Get a garrafón dispenser', description: 'Available at Soriana, Walmart, Amazon Mexico. $500-2,000 MXN.' },
      ]
    },
    {
      id: 'financial',
      title: 'Financial Setup',
      icon: '🏦',
      color: 'from-emerald-500 to-green-500',
      items: [
        { title: 'Open Mexican bank account', description: 'BBVA, Santander (expat-friendly), Banorte. Need: passport, residency, CURP, proof of address.' },
        { title: 'Set up Mercado Pago', description: 'Mexico\'s popular digital wallet. Works at many stores, transfers to friends, pay bills.' },
        { title: 'Learn SPEI transfers', description: 'Mexico\'s instant bank transfer system. Free, fast, widely used for rent and services.' },
        { title: 'Set up international transfers', description: 'Wise (best rates), Remitly, or wire transfer for regular transfers.' },
        { title: 'Understand bill payments', description: 'Pay at OXXO (24/7), bank apps, online portals. OXXO is easiest for most services.' },
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      icon: '🏥',
      color: 'from-rose-500 to-pink-500',
      items: [
        { title: 'Find a general doctor', description: 'Ask in expat groups for English speakers. Consultations: $400-800 MXN.', link: '/category/english-speaking-healthcare' },
        { title: 'Find a dentist', description: 'Dental care is excellent and affordable. Cleaning: $400-800 MXN.' },
        { title: 'Locate pharmacies', description: 'Farmacias Guadalajara, Farmacias del Ahorro. Many meds available without prescription.' },
        { title: 'Set up health insurance', description: 'IMSS (~$6,000 MXN/year) or private: GNP, Seguros Monterrey, Bupa.' },
        { title: 'Save emergency numbers', description: '911 (emergency), 066 (police), 065 (ambulance/Red Cross).' },
      ]
    },
    {
      id: 'social',
      title: 'Social & Community',
      icon: '👥',
      color: 'from-orange-500 to-amber-500',
      items: [
        { title: 'Join expat Facebook groups', description: 'Search "Expats in San Luis Potosí". Great for advice and meeting others.' },
        { title: 'Find language exchange partners', description: 'Practice Spanish, help with English. Check Meetup, university boards, cafes.', link: '/category/language-exchange-cafes' },
        { title: 'Enroll in Spanish classes', description: 'UASLP offers courses. Private tutors: $150-300 MXN/hour.' },
        { title: 'Explore neighborhoods', description: 'Walk Centro Histórico, Parque Tangamanga, Lomas. Best way to feel at home.' },
        { title: 'Attend local events', description: 'Check our events calendar. FENAPO (August) is the biggest annual fair.', link: '/events' },
        { title: 'Meet your neighbors', description: 'A simple "Buenos días" goes a long way. Neighbors are valuable for recommendations.' },
      ]
    },
    {
      id: 'daily-life',
      title: 'Practical Daily Life',
      icon: '🛒',
      color: 'from-indigo-500 to-blue-500',
      items: [
        { title: 'Find supermarkets', description: 'Soriana (local), Walmart, HEB (premium), Costco (membership).' },
        { title: 'Explore local markets', description: 'Mercado Hidalgo (Centro), Mercado República. Fresh produce at better prices.' },
        { title: 'Download ride apps', description: 'Uber and DiDi work throughout the city. Safer than street taxis.' },
        { title: 'Find a gym', description: 'Smart Fit ($400-600 MXN/mo), Sport City (premium), local gyms ($300-500 MXN/mo).' },
        { title: 'Explore Parque Tangamanga', description: 'One of Mexico\'s largest urban parks. Running, cycling, picnics. Free entry.' },
        { title: 'Set up Amazon Mexico', description: 'Delivery available. Prime offers faster shipping. Great for hard-to-find items.' },
      ]
    },
  ];

  const sections = categories.map(c => ({ id: c.id, name: c.title }));

  return (
    <>
      <Head>
        <title>Arrival Checklist: Your First 30 Days in San Luis Potosí | San Luis Way</title>
        <meta name="description" content="Complete 45+ item checklist for newcomers to San Luis Potosí. Covers essentials, bureaucratic tasks, utilities, banking, healthcare, and social integration." />
        <meta name="keywords" content="San Luis Potosí arrival checklist, expat checklist Mexico, moving to SLP, first days San Luis Potosí" />
        <meta property="og:title" content="Arrival Checklist: Your First 30 Days in San Luis Potosí" />
        <meta property="og:description" content="Your complete checklist for settling in San Luis Potosí." />
        <meta property="og:url" content="https://www.sanluisway.com/resources/arrival-checklist" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Your First 30 Days
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Arrival Checklist
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              45+ actionable items to help you settle into San Luis Potosí successfully
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">7 Categories</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">Interactive Checkboxes</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">Official Links</span>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="sticky top-16 z-40 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-3 gap-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Checklist Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {categories.map((category) => (
              <div key={category.id} id={category.id} className="mb-12">
                <div className={`bg-gradient-to-r ${category.color} p-6 rounded-t-2xl`}>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {category.title}
                  </h2>
                </div>
                <div className="bg-white rounded-b-2xl shadow-lg p-6">
                  <div className="space-y-4">
                    {category.items.map((item, idx) => (
                      <label key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100">
                        <input type="checkbox" className="mt-1 w-5 h-5 rounded text-primary" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                            {item.link && (
                              <>
                                {' '}
                                <Link href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} className="text-primary hover:underline">
                                  Learn more →
                                </Link>
                              </>
                            )}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-3">Emergency Numbers</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li><strong>911</strong> - General Emergency</li>
                  <li><strong>066</strong> - Police</li>
                  <li><strong>065</strong> - Red Cross / Ambulance</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-3">San Luis Way Guides</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li><Link href="/resources/neighborhoods-san-luis-potosi" className="hover:underline">Neighborhoods Guide →</Link></li>
                  <li><Link href="/resources/health-guide" className="hover:underline">Healthcare Guide →</Link></li>
                  <li><Link href="/resources/expat-guide" className="hover:underline">Expat Essentials →</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Personalized Help?</h2>
            <p className="text-white/90 mb-6">Our local experts can guide you through the settling process.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
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
