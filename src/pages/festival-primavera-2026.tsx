import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import FestivalHero from '@/components/festival/FestivalHero';
import FestivalLineup from '@/components/festival/FestivalLineup';
import FestivalDetails from '@/components/festival/FestivalDetails';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
});

export default function FestivalPrimavera2026() {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isEs = locale === 'es';

  return (
    <>
      <Head>
        <title>{isEs
          ? 'Festival Internacional San Luis en Primavera 2026 | San Luis Way'
          : 'International Spring Festival San Luis 2026 | San Luis Way'}</title>
        <meta name="description" content={isEs
          ? 'Programa completo del Festival Internacional San Luis en Primavera 2026. Miguel Bosé, Lucero, Mon Laferte, Diego El Cigala y más. 28 marzo - 4 abril. Entrada libre.'
          : 'Full schedule of the International Spring Festival San Luis 2026. Miguel Bosé, Lucero, Mon Laferte, Diego El Cigala and more. March 28 - April 4. Free admission.'} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back nav */}
        <div className="bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              {isEs ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </div>

        <FestivalHero />
        <FestivalLineup />
        <FestivalDetails />
      </div>
    </>
  );
}
