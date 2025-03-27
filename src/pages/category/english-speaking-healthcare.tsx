import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

const facilities = [
  {
    id: 'facility-1',
    name: 'International Medical Center',
    description: 'Modern medical facility with English-speaking doctors and staff, accepting international insurance.',
    image: '/images/healthcare/international-medical.jpg',
    location: 'Lomas 2da Sección',
    features: ['English-Speaking Staff', 'International Insurance', '24/7 Emergency'],
    specialties: ['General Medicine', 'Pediatrics', 'Cardiology'],
    hours: '24/7',
    insuranceAccepted: ['Cigna', 'Aetna', 'Blue Cross'],
    emergencyNumber: '+52 444 123 4567',
  },
  // Add more facilities here
];

export default function EnglishSpeakingHealthcare() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>English-Speaking Healthcare in San Luis Potosí | SLP Guide</title>
        <meta 
          name="description" 
          content="Find medical facilities, clinics, and pharmacies with English-speaking staff and international insurance acceptance in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/english-speaking-healthcare.jpg"
            alt="English-Speaking Healthcare"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                English-Speaking Healthcare
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Medical facilities, clinics, and pharmacies with English-speaking staff and international insurance acceptance.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Contact Banner */}
        <section className="bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-red-700 font-medium">Emergency Numbers:</span>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-2 md:mt-0">
                <div className="flex items-center">
                  <span className="text-red-600 font-medium mr-2">Ambulance:</span>
                  <a href="tel:911" className="text-red-700 hover:text-red-800">911</a>
                </div>
                <div className="flex items-center">
                  <span className="text-red-600 font-medium mr-2">Red Cross:</span>
                  <a href="tel:065" className="text-red-700 hover:text-red-800">065</a>
                </div>
                <div className="flex items-center">
                  <span className="text-red-600 font-medium mr-2">24/7 Medical Assistance:</span>
                  <a href="tel:+524441234567" className="text-red-700 hover:text-red-800">+52 444 123 4567</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility) => (
                <div 
                  key={facility.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {facility.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {facility.hours}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {facility.emergencyNumber}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {facility.features.map((feature) => (
                          <span 
                            key={feature}
                            className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {facility.specialties.map((specialty) => (
                          <span 
                            key={specialty}
                            className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium mb-2">Accepted Insurance:</p>
                        <div className="flex flex-wrap gap-2">
                          {facility.insuranceAccepted.map((insurance) => (
                            <span 
                              key={insurance}
                              className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {insurance}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Healthcare Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">General Medicine</h3>
                <p className="text-gray-600">
                  Primary care, check-ups, and preventive medicine.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Emergency Care</h3>
                <p className="text-gray-600">
                  24/7 emergency services with English-speaking staff.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialist Care</h3>
                <p className="text-gray-600">
                  Access to English-speaking specialists across various fields.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pharmacy Services</h3>
                <p className="text-gray-600">
                  English-speaking pharmacists and international prescriptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Information Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Insurance Information</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Accepted Insurance Providers</h3>
                  <p className="text-gray-600 mb-4">
                    Most facilities accept major international insurance providers including:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Cigna', 'Aetna', 'Blue Cross', 'Bupa', 'MetLife', 'AXA'].map((provider) => (
                      <span 
                        key={provider}
                        className="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {provider}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Payment Information</h3>
                  <p className="text-gray-600">
                    Most facilities accept credit cards, cash, and direct insurance billing. Some may require upfront payment with reimbursement through your insurance provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Medical Assistance?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team can help you find the right healthcare provider and assist with insurance coordination.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Contact Our Healthcare Liaison
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 