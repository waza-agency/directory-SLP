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

const facilities = [
  {
    id: 'facility-1',
    name: 'Elite Fitness Center',
    description: 'Modern gym with international standard equipment and English-speaking trainers.',
    image: '/images/sports/elite-fitness.jpg',
    location: 'Lomas 3ra Sección',
    features: ['Modern Equipment', 'Personal Training', 'Group Classes'],
    amenities: ['Locker Rooms', 'Showers', 'Towel Service'],
    hours: '5:00 AM - 11:00 PM',
    priceRange: '$$$',
    classes: ['Yoga', 'CrossFit', 'Spinning'],
  },
  // Add more facilities here
];

const categories = [
  {
    name: 'Gyms',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    name: 'Yoga Studios',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    name: 'Sports Clubs',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'Swimming Pools',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
];

export default function SportsFitness() {

  return (
    <>
      <Head>
        <title>Sports & Fitness in San Luis Potosí | SLP Guide</title>
        <meta
          name="description"
          content="Find gyms, sports clubs, and fitness centers with international standards and English-speaking trainers in San Luis Potosí."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <Image
            src="/images/practical-categories/sports-fitness.jpg"
            alt="Sports & Fitness"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sports & Fitness
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Gyms, sports clubs, and fitness centers with international standards and English-speaking trainers.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
              ))}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {facility.priceRange}
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
                        {facility.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {facility.classes.map((className) => (
                          <span
                            key={className}
                            className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {className}
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
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Facilities?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">International Standards</h3>
                <p className="text-gray-600">
                  Modern equipment and facilities meeting global fitness standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
                <p className="text-gray-600">
                  Certified, English-speaking trainers and instructors.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diverse Programs</h3>
                <p className="text-gray-600">
                  Wide range of classes and training programs for all fitness levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Membership Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Day Pass</h3>
                  <p className="text-gray-600 text-sm">Perfect for trying out facilities</p>
                  <p className="text-3xl font-bold text-primary mt-4">$20</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full facility access
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Group classes included
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-primary relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Monthly</h3>
                  <p className="text-gray-600 text-sm">Most flexible option</p>
                  <p className="text-3xl font-bold text-primary mt-4">$60</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited access
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All classes included
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personal training session
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Annual</h3>
                  <p className="text-gray-600 text-sm">Best value for money</p>
                  <p className="text-3xl font-bold text-primary mt-4">$500</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All monthly benefits
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2 months free
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guest passes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a free consultation with our fitness experts and find the perfect program for you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}