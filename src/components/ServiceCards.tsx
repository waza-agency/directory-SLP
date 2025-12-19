import Link from 'next/link';
import { HomeIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

export default function ServiceCards() {
  const { t } = useTranslation('common');

  const services = [
    {
      title: t('serviceCards.localConnections.title'),
      description: t('serviceCards.localConnections.description'),
      icon: <HomeIcon className="w-12 h-12 text-yellow-500" />,
      buttonText: t('serviceCards.localConnections.button'),
      href: '/local-connections',
      buttonClass: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: t('serviceCards.culturalImmersion.title'),
      description: t('serviceCards.culturalImmersion.description'),
      icon: <UserGroupIcon className="w-12 h-12 text-orange-500" />,
      buttonText: t('serviceCards.culturalImmersion.button'),
      href: '/cultural-experiences',
      buttonClass: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: t('serviceCards.relocationSupport.title'),
      description: t('serviceCards.relocationSupport.description'),
      icon: <ShieldCheckIcon className="w-12 h-12 text-blue-500" />,
      buttonText: t('serviceCards.relocationSupport.button'),
      href: '/relocation-support',
      buttonClass: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="p-8">
            <div className="mb-6">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-8">
              {service.description}
            </p>
            <Link
              href={service.href}
              className={`inline-block w-full text-center px-6 py-3 text-white font-semibold rounded-full transition-colors ${service.buttonClass}`}
            >
              {service.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
