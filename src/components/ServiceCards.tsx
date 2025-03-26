import Link from 'next/link';
import { HomeIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Local Connections',
    description: "We'll introduce you to our trusted network of service providers, from plumbers and electricians to language tutors and childcare professionals.",
    icon: <HomeIcon className="w-12 h-12 text-yellow-500" />,
    buttonText: 'Connect Me',
    href: '/local-connections',
    buttonClass: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    title: 'Cultural Immersion',
    description: 'Experience the rich traditions, history and authentic culture of San Luis Potosí through guided immersion services like cooking classes with local chefs or social gatherings with both locals and fellow expats.',
    icon: <UserGroupIcon className="w-12 h-12 text-orange-500" />,
    buttonText: 'Join an Experience',
    href: '/cultural-experiences',
    buttonClass: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    title: 'Relocation Support',
    description: 'Navigate bureaucratic processes, banking setup, and essential services to smoothly integrate into the Potosino lifestyle.',
    icon: <ShieldCheckIcon className="w-12 h-12 text-blue-500" />,
    buttonText: 'Get Support',
    href: '/relocation-support',
    buttonClass: 'bg-blue-500 hover:bg-blue-600'
  }
];

export default function ServiceCards() {
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