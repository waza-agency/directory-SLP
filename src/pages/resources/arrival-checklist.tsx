import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface ChecklistItem {
  id: string;
  link?: string;
}

interface ChecklistCategory {
  id: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}

export default function ArrivalChecklistPage() {
  const { t } = useTranslation('common');
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
      id: 'firstWeek',
      icon: '📱',
      color: 'from-red-500 to-orange-500',
      items: [
        { id: 'sim' },
        { id: 'apps' },
        { id: 'atm' },
        { id: 'cash' },
        { id: 'spanish' },
        { id: 'translate' },
      ]
    },
    {
      id: 'administrative',
      icon: '🏛️',
      color: 'from-purple-500 to-violet-500',
      items: [
        { id: 'inm', link: 'https://www.gob.mx/inm' },
        { id: 'curp', link: 'https://www.gob.mx/curp/' },
        { id: 'rfc', link: 'https://www.sat.gob.mx/' },
        { id: 'consulate' },
        { id: 'license' },
      ]
    },
    {
      id: 'homeServices',
      icon: '🔌',
      color: 'from-amber-500 to-yellow-500',
      items: [
        { id: 'electricity', link: 'https://www.cfe.mx/' },
        { id: 'water', link: 'https://www.interapas.gob.mx/' },
        { id: 'gas' },
        { id: 'internet' },
        { id: 'garrafon' },
        { id: 'dispenser' },
      ]
    },
    {
      id: 'financial',
      icon: '🏦',
      color: 'from-emerald-500 to-green-500',
      items: [
        { id: 'bank' },
        { id: 'mercadoPago' },
        { id: 'spei' },
        { id: 'international' },
        { id: 'bills' },
      ]
    },
    {
      id: 'healthcare',
      icon: '🏥',
      color: 'from-rose-500 to-pink-500',
      items: [
        { id: 'doctor', link: '/category/english-speaking-healthcare' },
        { id: 'dentist' },
        { id: 'pharmacy' },
        { id: 'insurance' },
        { id: 'emergency' },
      ]
    },
    {
      id: 'social',
      icon: '👥',
      color: 'from-orange-500 to-amber-500',
      items: [
        { id: 'facebook' },
        { id: 'exchange', link: '/category/language-exchange-cafes' },
        { id: 'classes' },
        { id: 'neighborhoods' },
        { id: 'events', link: '/events' },
        { id: 'neighbors' },
      ]
    },
    {
      id: 'dailyLife',
      icon: '🛒',
      color: 'from-indigo-500 to-blue-500',
      items: [
        { id: 'supermarkets' },
        { id: 'markets' },
        { id: 'rides' },
        { id: 'gym' },
        { id: 'park' },
        { id: 'amazon' },
      ]
    },
  ];

  const getSectionId = (categoryId: string) => {
    const map: Record<string, string> = {
      firstWeek: 'first-week',
      administrative: 'administrative',
      homeServices: 'home-services',
      financial: 'financial',
      healthcare: 'healthcare',
      social: 'social',
      dailyLife: 'daily-life',
    };
    return map[categoryId] || categoryId;
  };

  return (
    <>
      <Head>
        <title>{t('arrivalChecklist.meta.title')}</title>
        <meta name="description" content={t('arrivalChecklist.meta.description')} />
        <meta name="keywords" content={t('arrivalChecklist.meta.keywords')} />
        <meta property="og:title" content={t('arrivalChecklist.meta.ogTitle')} />
        <meta property="og:description" content={t('arrivalChecklist.meta.ogDescription')} />
        <meta property="og:url" content="https://www.sanluisway.com/resources/arrival-checklist" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              {t('arrivalChecklist.hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('arrivalChecklist.hero.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('arrivalChecklist.hero.subtitle')}
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">{t('arrivalChecklist.hero.categories')}</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">{t('arrivalChecklist.hero.checkboxes')}</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">{t('arrivalChecklist.hero.links')}</span>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="sticky top-16 z-40 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-3 gap-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(getSectionId(category.id))}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === getSectionId(category.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`arrivalChecklist.categories.${category.id}.title`)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Checklist Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {categories.map((category) => (
              <div key={category.id} id={getSectionId(category.id)} className="mb-12">
                <div className={`bg-gradient-to-r ${category.color} p-6 rounded-t-2xl`}>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {t(`arrivalChecklist.categories.${category.id}.title`)}
                  </h2>
                </div>
                <div className="bg-white rounded-b-2xl shadow-lg p-6">
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <label key={item.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100">
                        <input type="checkbox" className="mt-1 w-5 h-5 rounded text-primary" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {t(`arrivalChecklist.categories.${category.id}.items.${item.id}.title`)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {t(`arrivalChecklist.categories.${category.id}.items.${item.id}.description`)}
                            {item.link && (
                              <>
                                {' '}
                                <Link href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} className="text-primary hover:underline">
                                  {t('arrivalChecklist.learnMore')}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('arrivalChecklist.resources.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-3">{t('arrivalChecklist.resources.emergency.title')}</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li><strong>911</strong> - {t('arrivalChecklist.resources.emergency.general')}</li>
                  <li><strong>066</strong> - {t('arrivalChecklist.resources.emergency.police')}</li>
                  <li><strong>065</strong> - {t('arrivalChecklist.resources.emergency.ambulance')}</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-3">{t('arrivalChecklist.resources.guides.title')}</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li><Link href="/resources/neighborhoods-san-luis-potosi" className="hover:underline">{t('arrivalChecklist.resources.guides.neighborhoods')}</Link></li>
                  <li><Link href="/resources/health-guide" className="hover:underline">{t('arrivalChecklist.resources.guides.healthcare')}</Link></li>
                  <li><Link href="/resources/expat-guide" className="hover:underline">{t('arrivalChecklist.resources.guides.expat')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{t('arrivalChecklist.cta.title')}</h2>
            <p className="text-white/90 mb-6">{t('arrivalChecklist.cta.subtitle')}</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors">
              {t('arrivalChecklist.cta.button')}
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
