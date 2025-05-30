import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import AdUnit from '../components/common/AdUnit';
// ... existing imports ...

export default function CulturalExperiences() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('culturalExperiences.meta.title')}</title>
        <meta name="description" content={t('culturalExperiences.meta.description')} />
      </Head>

      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{t('culturalExperiences.title')}</h1>
            <p className="text-xl">{t('culturalExperiences.subtitle')}</p>
          </div>
        </section>

        {/* Regular ad after hero */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>

        {/* Main content sections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* First content section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{t('culturalExperiences.section1.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Content items */}
              </div>
            </div>

            {/* Relaxed ad unit between content sections */}
            <div className="my-12">
              <AdUnit isRelaxed={true} style={{ display: 'block', margin: '40px 0' }} />
            </div>

            {/* Second content section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{t('culturalExperiences.section2.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Content items */}
              </div>
            </div>
          </div>
        </section>

        {/* Regular ad at the bottom */}
        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>
      </main>
    </>
  );
}