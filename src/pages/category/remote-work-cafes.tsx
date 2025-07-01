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

const workspaces = [
  {
    id: 'workspace-1',
    name: 'Digital Hub Café',
    description: 'Modern workspace with high-speed internet, plenty of power outlets, and a quiet atmosphere perfect for remote work.',
    image: '/images/workspaces/digital-hub.jpg',
    location: 'Lomas',
    features: ['High-Speed Wi-Fi', 'Power Outlets', 'Meeting Rooms'],
    amenities: ['Coffee & Snacks', 'Printing Services', 'Phone Booths'],
    hours: '7:00 AM - 9:00 PM',
    priceRange: '$$',
  },
  // Add more workspaces here
];

export default function RemoteWorkCafes() {

  return (
    <>
      <Head>
        <title>Remote Work Cafes in San Luis Potosí | SLP Guide</title>
        <meta 
          name="description" 
          content="Find the best cafes and workspaces for digital nomads and remote workers in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/remote-work-cafes.avif"
            alt="Remote Work Cafes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Remote Work Cafes
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Offices with reliable Wi-Fi, ample power outlets, and a work-friendly atmosphere for digital nomads and remote workers.
              </p>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workspaces.map((workspace) => (
                <div 
                  key={workspace.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={workspace.image}
                      alt={workspace.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{workspace.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{workspace.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {workspace.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {workspace.hours}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {workspace.priceRange}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {workspace.features.map((feature) => (
                          <span 
                            key={feature}
                            className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {workspace.amenities.map((amenity) => (
                          <span 
                            key={amenity}
                            className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What Makes a Great Remote Work Space?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Internet</h3>
                <p className="text-gray-600">
                  Reliable high-speed Wi-Fi for video calls and large file transfers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comfortable Setup</h3>
                <p className="text-gray-600">
                  Ergonomic seating and proper desk space for productive work.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Connect with other remote workers and digital nomads.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Nomad Community Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Digital Nomad Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with other remote workers, share tips, and discover the best workspaces in San Luis Potosí.
            </p>
            <Link 
              href="/community" 
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 