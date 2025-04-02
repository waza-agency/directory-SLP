import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function TangamangaBanner() {
  const { t } = useTranslation('common');

  return (
    <section className="relative w-full py-16 bg-gradient-to-r from-green-600 to-green-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Parque Tangamanga
            </h2>
            <p className="text-lg mb-6">
              El pulmón verde más importante de San Luis Potosí, con más de 420 hectáreas de áreas verdes, 
              lagos artificiales, canchas deportivas y senderos para disfrutar de la naturaleza.
            </p>
            <Link 
              href="/parque-tangamanga"
              className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Descubre más
            </Link>
          </div>
          <div className="flex-1 relative h-64 md:h-96">
            <Image
              src="/images/parque-tangamanga/banner.jpg"
              alt="Parque Tangamanga"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 