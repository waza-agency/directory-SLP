import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

const parkingSpots = [
  {
    id: 'parking-1',
    name: 'Plaza San Luis',
    description: 'Large parking facility with easy access and security, located in the heart of the city.',
    image: '/images/parking/plaza-san-luis.jpg',
    location: 'Centro',
    features: ['24/7 Security', 'Covered Parking', 'Well Lit'],
    capacity: '500+ spots',
    rates: 'First 2 hours free with purchase',
    hours: '24/7',
  },
  // Add more parking spots here
];

export default function EasyParkingSpots() {

  return (
    <>
      <Head>
        <title>Easy Parking Spots in San Luis Potosí | SLP Guide</title>
        <meta 
          name="description" 
          content="Find convenient parking spots in San Luis Potosí. Discover secure and easily accessible parking locations throughout the city."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/easy-parking-spots.png"
            alt="Easy Parking Spots"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Easy Parking Spots
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Find parking spots easily in San Luis Potosí with these convenient locations.
              </p>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parkingSpots.map((spot) => (
                <div 
                  key={spot.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{spot.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {spot.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {spot.hours}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18v18H3V3z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8h18M8 3v18" />
                        </svg>
                        {spot.capacity}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {spot.rates}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {spot.features.map((feature) => (
                        <span 
                          key={feature}
                          className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Parking Tips in San Luis Potosí</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Times</h3>
                <p className="text-gray-600">
                  Arrive early to secure spots, especially during peak hours (11 AM - 2 PM).
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">
                  Choose well-lit, monitored parking areas, especially at night.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Money</h3>
                <p className="text-gray-600">
                  Look for validation options and early bird specials at shopping centers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Download Our Parking App</h2>
            <p className="text-lg text-gray-600 mb-8">
              Find real-time parking availability, reserve spots in advance, and get turn-by-turn directions to the best parking spots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#" 
                className="inline-block bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Download on App Store
              </Link>
              <Link 
                href="#" 
                className="inline-block bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Get it on Google Play
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 