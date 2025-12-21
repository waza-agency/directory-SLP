import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function LivingGuidePage() {
  const [activeSection, setActiveSection] = useState('overview');

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
    { id: 'visas', name: 'Visas & Immigration' },
    { id: 'cost', name: 'Cost of Living' },
    { id: 'neighborhoods', name: 'Neighborhoods' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'banking', name: 'Banking' },
    { id: 'transport', name: 'Transportation' },
    { id: 'utilities', name: 'Internet & Phone' },
    { id: 'safety', name: 'Safety' },
    { id: 'faq', name: 'FAQ' },
  ];

  const quickStats = [
    { label: 'Monthly Budget', value: '$800-$1,500 USD' },
    { label: '1BR Rent', value: '$300-$600 USD/mo' },
    { label: 'Meal Out', value: '$5-$15 USD' },
    { label: 'Population', value: '1.29 million' },
    { label: 'Altitude', value: '1,864m (6,115 ft)' },
    { label: 'Climate', value: 'Semi-arid, avg 17°C' },
  ];

  const visaTypes = [
    { type: 'Tourist (FMM)', duration: '180 days', work: 'No', bestFor: 'Short visits' },
    { type: 'Temporary Resident', duration: '1-4 years', work: 'With permit', bestFor: 'Long-term expats' },
    { type: 'Permanent Resident', duration: 'Indefinite', work: 'Yes', bestFor: 'Retirees, long-term' },
    { type: 'Work Visa', duration: '1-4 years', work: 'Yes (employer-specific)', bestFor: 'Employment' },
  ];

  const neighborhoods = [
    {
      name: 'Lomas',
      rent: '$800-$1,500 USD',
      bestFor: 'Families, professionals',
      safety: 5,
      description: 'Upscale, family-friendly with tree-lined streets, modern shopping, excellent schools',
      pros: ['Very safe', 'Gated communities', 'Near Plaza Citadina', 'Excellent schools'],
      cons: ['Higher prices', 'Car-dependent', 'Far from center', 'Less authentic'],
    },
    {
      name: 'Centro Histórico',
      rent: '$400-$800 USD',
      bestFor: 'Culture lovers, singles',
      safety: 4,
      description: 'UNESCO World Heritage historic center, colonial architecture, best restaurants',
      pros: ['Walkable', 'Rich culture', 'Beautiful architecture', 'Best dining'],
      cons: ['Noisy', 'Limited parking', 'Older buildings', 'Fewer modern amenities'],
    },
    {
      name: 'Tangamanga',
      rent: '$500-$900 USD',
      bestFor: 'Active lifestyle, nature lovers',
      safety: 4,
      description: 'Adjacent to Parque Tangamanga (one of Mexico\'s largest urban parks)',
      pros: ['Near massive park', 'Great for jogging/cycling', 'Mid-range prices', 'Good restaurants'],
      cons: ['Less walkable', 'Fewer nightlife', 'Traffic', 'Limited transit'],
    },
    {
      name: 'Zona Industrial / Morales',
      rent: '$350-$600 USD',
      bestFor: 'Budget-conscious, workers',
      safety: 3,
      description: 'Near industrial parks, excellent value, new construction',
      pros: ['Very affordable', 'Near major employers', 'New construction', 'Good highway access'],
      cons: ['Far from center', 'Less character', 'Industrial area', 'Fewer restaurants'],
    },
  ];

  const hospitals = [
    { name: 'Hospital Ángeles', type: 'Private', specialties: 'Full-service, emergency, specialists', english: 'Yes' },
    { name: 'Hospital Lomas', type: 'Private', specialties: 'General, maternity, pediatrics', english: 'Some' },
    { name: 'Star Médica', type: 'Private', specialties: 'Full-service, modern', english: 'Yes' },
    { name: 'Hospital Central (IMSS)', type: 'Public', specialties: 'Emergency, general care', english: 'Limited' },
    { name: 'Beneficencia Española', type: 'Private', specialties: 'General, affordable', english: 'Some' },
  ];

  const banks = [
    { name: 'BBVA México', rating: 5, englishApp: 'Yes', notes: 'Most popular for expats' },
    { name: 'Santander', rating: 4, englishApp: 'Yes', notes: 'International transfers' },
    { name: 'Citibanamex', rating: 4, englishApp: 'Yes', notes: 'Wide ATM network' },
    { name: 'HSBC', rating: 5, englishApp: 'Yes', notes: 'Good for Premier customers' },
    { name: 'Banorte', rating: 3, englishApp: 'Limited', notes: 'Largest Mexican bank' },
  ];

  const faqs = [
    { q: 'Do I need to speak Spanish?', a: 'While English is available in tourist areas, Spanish is essential for daily life. Unlike San Miguel de Allende, there\'s limited English infrastructure. Consider classes at CELE (UASLP) or private tutors (~$10-15 USD/hour).' },
    { q: 'Can I work remotely on a tourist visa?', a: 'Working remotely on a tourist visa is technically a gray area. While enforcement is minimal for remote workers earning from abroad, obtaining Temporary Residency is safer for long-term stays and provides access to banking and healthcare.' },
    { q: 'Is tap water safe?', a: 'No. Use garrafones (20L jugs of purified water) delivered home (~35-50 MXN each). Most restaurants use purified ice.' },
    { q: 'What\'s the expat community like?', a: 'Small but growing, consisting of: professionals (BMW, GM, aerospace), retirees, digital nomads, and spouses of Mexican nationals. Facebook groups and informal meetups exist.' },
    { q: 'Can I bring pets?', a: 'Yes. Requirements: health certificate (within 10 days), current rabies vaccination (15 days to 1 year before travel). Many apartments allow pets. Good veterinary care: $30-50 USD for routine visits.' },
    { q: 'Are there international schools?', a: 'Yes: Instituto Potosino (bilingual), Colegio Motolinia (Catholic, bilingual), American School of San Luis Potosí. Tuition: $3,000-$10,000 USD/year.' },
    { q: 'Can I use my foreign driver\'s license?', a: 'Valid for 6 months as tourist. Once resident, obtain Mexican license (proof of residency, medical exam, written/practical tests). Cost: ~$50-100 USD total.' },
  ];

  return (
    <>
      <Head>
        <title>Ultimate Guide to Living in San Luis Potosí | Expat Guide 2025</title>
        <meta name="description" content="Comprehensive expat guide to San Luis Potosí covering visas, cost of living, neighborhoods, healthcare, banking, transportation. 35-50% lower cost than Mexico City." />
        <meta name="keywords" content="San Luis Potosí expat guide, living in SLP, cost of living Mexico, expat visa Mexico, neighborhoods SLP" />
        <meta property="og:title" content="Ultimate Guide to Living in San Luis Potosí | Expat Guide 2025" />
        <meta property="og:url" content="https://www.sanluisway.com/resources/living-guide" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Ultimate Guide to Living in San Luis Potosí as an Expat (2025)",
              "description": "Comprehensive guide covering visas, cost of living, neighborhoods, healthcare, and practical information for expats.",
              "datePublished": "2025-01-01",
              "dateModified": "2025-12-19"
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/resources" className="text-gray-500 hover:text-primary">Resources</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Living Guide</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/expat-guide-infographic.png"
              alt="Living in San Luis Potosí"
              fill
              className="object-cover blur-sm opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ultimate Guide to Living in San Luis Potosí
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Everything you need to know about expat life in SLP (2025)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickStats.map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3">
                    <div className="text-white font-bold text-sm md:text-base">{stat.value}</div>
                    <div className="text-white/70 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm ${
                    activeSection === section.id ? 'bg-terracotta text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why San Luis Potosí?</h2>
              <div className="bg-white rounded-xl shadow-elegant p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Advantages</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>~26% lower cost of living than Mexico City (housing up to 55% cheaper)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>Growing expat community without over-tourism</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>UNESCO World Heritage historic center</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>Modern healthcare facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>Strategic central location</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Strategic Location</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Mexico City: 420 km (4-5 hours)</li>
                      <li>• Guadalajara: 330 km (3.5-4 hours)</li>
                      <li>• Aguascalientes: 200 km (2.5 hours)</li>
                      <li>• Zacatecas: 193 km (2.5 hours)</li>
                      <li>• Monterrey: 521 km (5-6 hours)</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Economic Stability:</strong> The state's GDP grew 7.9% in 2023, making it Mexico's third-fastest growing economy (after Quintana Roo and Oaxaca). Key sectors include automotive (BMW, GM), aerospace, logistics, and business services.
                  </p>
                </div>
              </div>
            </section>

            {/* Visas */}
            <section id="visas" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visas & Immigration</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Visa Types Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Duration</th>
                          <th className="text-left py-3 px-4 font-semibold">Work Allowed</th>
                          <th className="text-left py-3 px-4 font-semibold">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visaTypes.map((visa, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4 font-medium text-gray-900">{visa.type}</td>
                            <td className="py-3 px-4 text-gray-600">{visa.duration}</td>
                            <td className="py-3 px-4 text-gray-600">{visa.work}</td>
                            <td className="py-3 px-4 text-gray-600">{visa.bestFor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Temporary Resident Visa Process</h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'Schedule Consulate Appointment', desc: 'Book 2-4 weeks in advance through SRE Consulate Directory' },
                      { step: 2, title: 'Gather Documents', desc: 'Valid passport (6+ months validity), completed application, passport photo, proof of financial solvency, visa fee ($50-$80 USD)' },
                      { step: 3, title: 'Prove Financial Solvency', desc: 'Bank statements: ~$69,750 USD average balance (12 months), OR monthly income: ~$4,185 USD for 6 months' },
                      { step: 4, title: 'Attend Consulate Interview', desc: 'Present documents and discuss plans' },
                      { step: 5, title: 'Exchange Visa Upon Entry', desc: 'Visit INM office within 30 days (Av. Venustiano Carranza 2395, Tel: 444 812-3556)' },
                      { step: 6, title: 'Receive Resident Card', desc: 'Valid for 1 year, renewable up to 4 years' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Warning:</strong> Working remotely on a tourist visa while earning from Mexico technically violates immigration law, though enforcement is limited. Obtain proper residency status for work activities.
                  </p>
                </div>
              </div>
            </section>

            {/* Cost of Living */}
            <section id="cost" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost of Living</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Comparison Index (NYC = 100)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { city: 'San Luis Potosí', index: 26.8 },
                      { city: 'Mexico City', index: 35.2 },
                      { city: 'Guadalajara', index: 32.1 },
                      { city: 'San Miguel de Allende', index: 41.5 },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-terracotta">{item.index}</div>
                        <div className="text-gray-600 text-sm">{item.city}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Housing & Rent (December 2025)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">City Center</th>
                          <th className="text-left py-3 px-4 font-semibold">Outside Center</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="py-3 px-4">1BR Apartment</td><td className="py-3 px-4">$580 USD</td><td className="py-3 px-4">$300 USD</td></tr>
                        <tr className="border-b"><td className="py-3 px-4">3BR Apartment</td><td className="py-3 px-4">$900 USD</td><td className="py-3 px-4">$550 USD</td></tr>
                        <tr><td className="py-3 px-4">3BR House</td><td className="py-3 px-4">$1,200 USD</td><td className="py-3 px-4">$700 USD</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Food & Groceries</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Restaurant meal</span><span className="font-medium">$5 USD</span></li>
                      <li className="flex justify-between"><span>Mid-range (2 people)</span><span className="font-medium">$25 USD</span></li>
                      <li className="flex justify-between"><span>Domestic beer</span><span className="font-medium">$2.50 USD</span></li>
                      <li className="flex justify-between"><span>Cappuccino</span><span className="font-medium">$3 USD</span></li>
                      <li className="flex justify-between"><span>Monthly groceries</span><span className="font-medium">$150-200 USD</span></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilities & Services</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Electricity/water/gas</span><span className="font-medium">$40 USD</span></li>
                      <li className="flex justify-between"><span>Internet (60+ Mbps)</span><span className="font-medium">$28 USD</span></li>
                      <li className="flex justify-between"><span>Mobile (unlimited)</span><span className="font-medium">$20 USD</span></li>
                      <li className="flex justify-between"><span>Gym membership</span><span className="font-medium">$30 USD</span></li>
                      <li className="flex justify-between"><span>Cinema ticket</span><span className="font-medium">$4 USD</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Monthly Budgets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-lg font-bold text-gray-900 mb-1">Budget</div>
                      <div className="text-terracotta font-semibold mb-3">$800-$1,000 USD</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 1BR outside center</li>
                        <li>• Cook at home mostly</li>
                        <li>• Public transportation</li>
                        <li>• IMSS public healthcare</li>
                      </ul>
                      <p className="mt-3 text-xs text-gray-500">Best for: Digital nomads, students</p>
                    </div>
                    <div className="border-2 border-terracotta rounded-lg p-4 bg-terracotta/5">
                      <div className="text-lg font-bold text-gray-900 mb-1">Comfortable</div>
                      <div className="text-terracotta font-semibold mb-3">$1,200-$1,800 USD</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Nice 1-2BR in good area</li>
                        <li>• Mix of cooking & dining</li>
                        <li>• Uber/occasional rental</li>
                        <li>• Private health insurance</li>
                      </ul>
                      <p className="mt-3 text-xs text-gray-500">Most common for expats</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-lg font-bold text-gray-900 mb-1">Premium</div>
                      <div className="text-terracotta font-semibold mb-3">$2,500+ USD</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Luxury apartment/house</li>
                        <li>• Fine dining regularly</li>
                        <li>• Own car or driver</li>
                        <li>• Premium healthcare plan</li>
                      </ul>
                      <p className="mt-3 text-xs text-gray-500">Best for: Executives, families</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Neighborhoods */}
            <section id="neighborhoods" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Neighborhoods for Expats</h2>
              <div className="space-y-6">
                {neighborhoods.map((hood, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-elegant p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{hood.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{hood.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-terracotta font-semibold">{hood.rent}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <svg key={j} className={`w-4 h-4 ${j < hood.safety ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{hood.bestFor}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2 text-sm">Pros</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {hood.pros.map((pro, j) => <li key={j}>+ {pro}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700 mb-2 text-sm">Cons</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {hood.cons.map((con, j) => <li key={j}>- {con}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">How to Find Housing</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Use local platforms: Inmuebles24.com, Segundamano.mx, Vivanuncios.com, Facebook groups</li>
                    <li>• Arrive first and search in person (book Airbnb for 2-4 weeks)</li>
                    <li>• Understand lease terms: 1-year minimum, 1-2 months deposit, may need guarantor</li>
                    <li>• Negotiate prices, especially for longer leases or upfront payments</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Healthcare */}
            <section id="healthcare" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Healthcare System</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Public: IMSS (Annual Costs 2024)</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Age 0-19</span><span>~$240 USD</span></li>
                      <li className="flex justify-between"><span>Age 20-39</span><span>~$310 USD</span></li>
                      <li className="flex justify-between"><span>Age 40-59</span><span>~$405 USD</span></li>
                      <li className="flex justify-between"><span>Age 60+</span><span>~$525 USD</span></li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">Covers: consultations, hospitalization, surgery, medications, lab work, maternity</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Private Insurance (Monthly)</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Basic (high deductible)</span><span>$50-80 USD</span></li>
                      <li className="flex justify-between"><span>Standard coverage</span><span>$100-150 USD</span></li>
                      <li className="flex justify-between"><span>Comprehensive</span><span>$150-250 USD</span></li>
                      <li className="flex justify-between"><span>Premium (international)</span><span>$300+ USD</span></li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">Providers: GNP, AXA, Seguros Monterrey, BUPA, Cigna</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Hospitals & Clinics</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold">Hospital</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Specialties</th>
                          <th className="text-left py-3 px-4 font-semibold">English</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospitals.map((h, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4 font-medium text-gray-900">{h.name}</td>
                            <td className="py-3 px-4"><span className={`px-2 py-1 rounded text-xs ${h.type === 'Private' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{h.type}</span></td>
                            <td className="py-3 px-4 text-gray-600">{h.specialties}</td>
                            <td className="py-3 px-4 text-gray-600">{h.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                  <p className="text-emerald-800 text-sm">
                    <strong>Dual Coverage Strategy:</strong> Many expats use IMSS for routine care + high-deductible private policy for emergencies (typically $600-800 USD/year total).
                  </p>
                </div>

                <div className="text-center">
                  <Link href="/resources/health-guide" className="inline-flex items-center text-terracotta hover:text-terracotta/80 font-semibold">
                    View Complete Health Services Guide →
                  </Link>
                </div>
              </div>
            </section>

            {/* Banking */}
            <section id="banking" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Banking & Finances</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Opening a Bank Account</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Passport (original and copy)</li>
                        <li>• Visa/Resident Card</li>
                        <li>• Proof of address (utility bill &lt;3 months)</li>
                        <li>• RFC (Tax ID) - some banks help obtain</li>
                        <li>• Initial deposit: 1,000-5,000 MXN</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Money Transfer Options</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>Wise:</strong> Best exchange rates, low fees</li>
                        <li>• <strong>Remitly:</strong> Good for recurring transfers</li>
                        <li>• <strong>XE:</strong> Competitive for larger amounts</li>
                        <li>• <strong>Charles Schwab:</strong> No ATM fees (US citizens)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Bank Recommendations</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold">Bank</th>
                          <th className="text-left py-3 px-4 font-semibold">Expat Friendly</th>
                          <th className="text-left py-3 px-4 font-semibold">English App</th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banks.map((b, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3 px-4 font-medium text-gray-900">{b.name}</td>
                            <td className="py-3 px-4">{'★'.repeat(b.rating)}{'☆'.repeat(5-b.rating)}</td>
                            <td className="py-3 px-4 text-gray-600">{b.englishApp}</td>
                            <td className="py-3 px-4 text-gray-600">{b.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>What is an RFC?</strong> The Registro Federal de Contribuyentes is Mexico's tax identification number. Essential for banking, leases, and financial transactions. Obtain from SAT offices or online at sat.gob.mx with CURP.
                  </p>
                </div>
              </div>
            </section>

            {/* Transportation */}
            <section id="transport" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transportation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Transit (MetroRed)</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>Single ride</span><span>15.50 MXN (~$0.75 USD)</span></li>
                    <li className="flex justify-between"><span>Monthly pass</span><span>~500 MXN ($25 USD)</span></li>
                    <li className="flex justify-between"><span>Hours</span><span>5:00 AM - 11:00 PM</span></li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride-Sharing (Uber/DiDi)</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>Base fare</span><span>~25-30 MXN</span></li>
                    <li className="flex justify-between"><span>Per km</span><span>~8-10 MXN</span></li>
                    <li className="flex justify-between"><span>Centro to Lomas</span><span>~80-100 MXN</span></li>
                    <li className="flex justify-between"><span>Wait time</span><span>3-8 minutes typical</span></li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Traditional Taxis</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>Starting fare</span><span>30 MXN (~$1.50 USD)</span></li>
                    <li className="flex justify-between"><span>Per km</span><span>~12 MXN</span></li>
                    <li className="flex justify-between"><span>Airport to Centro</span><span>~250 MXN ($12 USD)</span></li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Agree on price if no meter</p>
                </div>
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Driving/Car Rental</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>Daily rental</span><span>~$30-50 USD</span></li>
                    <li className="flex justify-between"><span>Gas (per liter)</span><span>~22 MXN ($1.10 USD)</span></li>
                    <li className="flex justify-between"><span>Insurance (annual)</span><span>~$300 USD</span></li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Foreign license valid 6 months</p>
                </div>
              </div>
            </section>

            {/* Utilities */}
            <section id="utilities" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Internet & Phone</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Internet Providers</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4">Provider</th>
                          <th className="text-left py-3 px-4">Speed Options</th>
                          <th className="text-left py-3 px-4">Monthly Cost</th>
                          <th className="text-left py-3 px-4">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="py-3 px-4">Telmex (Infinitum)</td><td className="py-3 px-4">20-200 Mbps</td><td className="py-3 px-4">$350-700 MXN</td><td className="py-3 px-4 text-gray-600">Widest coverage</td></tr>
                        <tr className="border-b"><td className="py-3 px-4">Totalplay</td><td className="py-3 px-4">100-500 Mbps</td><td className="py-3 px-4">$450-900 MXN</td><td className="py-3 px-4 text-gray-600">Fiber optic</td></tr>
                        <tr className="border-b"><td className="py-3 px-4">Izzi</td><td className="py-3 px-4">50-300 Mbps</td><td className="py-3 px-4">$400-800 MXN</td><td className="py-3 px-4 text-gray-600">Good value bundles</td></tr>
                        <tr><td className="py-3 px-4">Megacable</td><td className="py-3 px-4">50-200 Mbps</td><td className="py-3 px-4">$400-700 MXN</td><td className="py-3 px-4 text-gray-600">Regional provider</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Phone Plans</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex justify-between"><span><strong>Telcel:</strong> Best coverage</span><span>~400-600 MXN/month</span></li>
                    <li className="flex justify-between"><span><strong>AT&T México:</strong> Good in cities</span><span>~350-500 MXN/month</span></li>
                    <li className="flex justify-between"><span><strong>Movistar:</strong> Budget-friendly</span><span>~250-400 MXN/month</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Safety */}
            <section id="safety" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Security</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Index Comparison (Numbeo 2024)</h3>
                  <p className="text-gray-500 text-sm mb-4">Higher score = safer (scale 0-100)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { city: 'San Luis Potosí', score: 52.4 },
                      { city: 'Mexico City', score: 41.2 },
                      { city: 'Guadalajara', score: 44.8 },
                      { city: 'Mérida (safest)', score: 72.1 },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{item.score}</div>
                        <div className="text-gray-600 text-sm">{item.city}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Tips</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Stick to known areas: Centro Histórico, Lomas, Tangamanga</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Use Uber at night instead of hailing street taxis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Avoid flashy displays and expensive jewelry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Learn basic Spanish for daily interactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Register with your embassy (US: STEP program)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>Store digital copies of documents in cloud</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-terracotta to-terracotta/80 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Explore More Resources</h3>
              <p className="text-white/90 mb-6">Check out our other comprehensive guides for life in San Luis Potosí</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/resources/expat-guide" className="px-6 py-3 bg-white text-terracotta font-semibold rounded-full hover:bg-gray-100 transition-colors">
                  Expat Essentials
                </Link>
                <Link href="/resources/school-guide" className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
                  School Guide
                </Link>
                <Link href="/resources/health-guide" className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
                  Health Services
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
