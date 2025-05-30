import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import AdUnit from '../components/common/AdUnit';

export default function ExpatGuidePage() {
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState('emergency');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'emergency', name: 'Emergency Contacts' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'housing', name: 'Housing' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'banking', name: 'Banking & Finance' },
    { id: 'immigration', name: 'Immigration' },
    { id: 'education', name: 'Education' },
    { id: 'utilities', name: 'Utilities' },
  ];

  const emergencyContacts = [
    { name: 'Emergency Services (General)', number: '911' },
    { name: 'Police', number: '444 826 8300' },
    { name: 'Fire Department', number: '444 812 4344' },
    { name: 'Red Cross', number: '444 815 0808' },
    { name: 'Tourist Police', number: '444 834 1115' },
    { name: 'U.S. Embassy in Mexico City', number: '55 5080 2000' },
    { name: 'Canadian Embassy in Mexico City', number: '55 5724 7900' },
  ];

  const hospitals = [
    {
      name: 'Hospital Central "Dr. Ignacio Morones Prieto"',
      address: 'Av. Venustiano Carranza 2395',
      phone: '444 834 2700',
      type: 'Public',
    },
    {
      name: 'Hospital Lomas de San Luis',
      address: 'Av. Sierra Leona 550',
      phone: '444 824 2424',
      type: 'Private',
    },
    {
      name: 'Hospital Angeles',
      address: 'Av. Benito Juárez 1210',
      phone: '444 813 1717',
      type: 'Private',
    },
  ];

  const immigrationInfo = {
    office: 'Instituto Nacional de Migración (INM)',
    address: 'Av. Mariano Otero 455, Tequisquiapan',
    phone: '444 813 6748',
    website: 'https://www.gob.mx/inm',
    requirements: [
      'Valid passport',
      'Visa application form',
      'Proof of economic solvency',
      'Proof of residence',
      'Employment contract (if applicable)',
    ],
  };

  const bankingInfo = [
    {
      name: 'BBVA',
      requirements: [
        'Valid passport',
        'Immigration document (FM2/FM3)',
        'Proof of address',
        'Minimum deposit',
      ],
      website: 'https://www.bbva.mx',
    },
    {
      name: 'Santander',
      requirements: [
        'Valid passport',
        'Immigration document',
        'Proof of address',
        'Tax ID (RFC)',
      ],
      website: 'https://www.santander.com.mx',
    },
  ];

  const transportationInfo = {
    taxi: [
      { name: 'Taxi Seguro', phone: '444 817 2111' },
      { name: 'Radio Taxi', phone: '444 812 0000' },
    ],
    apps: [
      { name: 'Uber', available: true },
      { name: 'DiDi', available: true },
      { name: 'Beat', available: true },
    ],
    busCompanies: [
      { name: 'Primera Plus', website: 'https://www.primeraplus.com.mx' },
      { name: 'ETN', website: 'https://etn.com.mx' },
    ],
  };

  const utilities = {
    electricity: {
      provider: 'CFE (Comisión Federal de Electricidad)',
      website: 'https://www.cfe.mx',
      phone: '071',
    },
    water: {
      provider: 'INTERAPAS',
      website: 'https://www.interapas.mx',
      phone: '444 811 6230',
    },
    internet: [
      { provider: 'Telmex', website: 'https://telmex.com', phone: '800 123 2222' },
      { provider: 'Totalplay', website: 'https://totalplay.com.mx', phone: '800 510 0510' },
    ],
  };

  return (
    <>
      <Head>
        <title>{t('expatGuide.meta.title')}</title>
        <meta name="description" content={t('expatGuide.meta.description')} />
        <meta name="keywords" content="San Luis Potosí expat guide, living in SLP, healthcare, housing, transportation, banking" />
      </Head>

      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-2.jpg"
              alt="San Luis Potosí city life"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Expat Guide to San Luis Potosí
              </h1>
              <p className="text-white text-lg">
                Your comprehensive resource for living and thriving in SLP
              </p>
            </div>
          </div>
        </section>

        {/* Ad after hero */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <AdUnit
              adSlot="1234567893"
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </div>
        </section>

        {/* Navigation */}
        <div className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            {/* Emergency Contacts Section */}
            <section id="emergency" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Emergency Contacts</h2>
              <div className="bg-white rounded-xl shadow-elegant p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <p className="text-primary font-medium">{contact.number}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Healthcare Section */}
            <section id="healthcare" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Healthcare</h2>
              <div className="space-y-6">
                {hospitals.map((hospital, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-elegant p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                        <p className="text-gray-600 mb-2">{hospital.address}</p>
                        <p className="text-primary font-medium">{hospital.phone}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        hospital.type === 'Private' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Immigration Section */}
            <section id="immigration" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Immigration</h2>
              <div className="bg-white rounded-xl shadow-elegant p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{immigrationInfo.office}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Address:</strong> {immigrationInfo.address}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> {immigrationInfo.phone}
                  </p>
                  <p className="text-gray-600">
                    <strong>Website:</strong>{' '}
                    <a href={immigrationInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {immigrationInfo.website}
                    </a>
                  </p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {immigrationInfo.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Banking Section */}
            <section id="banking" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Banking & Finance</h2>
              <div className="space-y-6">
                {bankingInfo.map((bank, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-elegant p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{bank.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {bank.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-gray-600">
                        <strong>Website:</strong>{' '}
                        <a href={bank.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {bank.website}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Transportation Section */}
            <section id="transportation" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Transportation</h2>
              <div className="space-y-6">
                {/* Taxis */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Taxi Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transportationInfo.taxi.map((service, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-primary">{service.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ride-hailing Apps */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ride-hailing Apps</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {transportationInfo.apps.map((app, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-900">{app.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bus Companies */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Bus Companies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transportationInfo.busCompanies.map((company, index) => (
                      <div key={index}>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Visit Website
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Utilities Section */}
            <section id="utilities" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Utilities</h2>
              <div className="space-y-6">
                {/* Electricity */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Electricity</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600"><strong>Provider:</strong> {utilities.electricity.provider}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {utilities.electricity.phone}</p>
                    <p className="text-gray-600">
                      <strong>Website:</strong>{' '}
                      <a href={utilities.electricity.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {utilities.electricity.website}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Water */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Water</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600"><strong>Provider:</strong> {utilities.water.provider}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {utilities.water.phone}</p>
                    <p className="text-gray-600">
                      <strong>Website:</strong>{' '}
                      <a href={utilities.water.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {utilities.water.website}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Internet */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Internet Providers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {utilities.internet.map((provider, index) => (
                      <div key={index} className="space-y-2">
                        <p className="font-medium text-gray-900">{provider.provider}</p>
                        <p className="text-gray-600">{provider.phone}</p>
                        <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Visit Website
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Ad in the middle of content */}
            <section className="my-8">
              <AdUnit
                adSlot="1234567894"
                adFormat="rectangle"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  margin: '30px auto',
                  maxWidth: '750px',
                  backgroundColor: '#f8fafc',
                  padding: '20px',
                  borderRadius: '8px'
                }}
              />
            </section>
          </div>

          {/* Bottom ad */}
          <section className="mt-12 mb-8">
            <AdUnit
              adSlot="1234567895"
              style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};