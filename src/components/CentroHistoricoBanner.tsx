import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function CentroHistoricoBanner() {
  const { t } = useTranslation('common');

  return (
    <section className="relative w-full py-16 bg-gradient-to-r from-amber-600 to-amber-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {t('centroHistoricoBanner.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('centroHistoricoBanner.title')}
            </h2>
            <p className="text-lg mb-6 text-amber-100">
              {t('centroHistoricoBanner.description')}
            </p>
            <Link
              href="/centro-historico"
              className="inline-block bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              {t('centroHistoricoBanner.cta')}
            </Link>
          </div>
          <div className="flex-1 relative h-64 md:h-96">
            <Image
              src="/images/centro-historico/banner.jpg"
              alt={t('centroHistoricoBanner.title')}
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
