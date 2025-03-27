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

const attractions = [
  {
    id: 'attraction-1',
    name: 'Huasteca Potosina',
    description: 'A natural paradise with turquoise waterfalls, rivers, and lush vegetation. Perfect for adventure sports and nature exploration.',
    image: '/images/outdoors/huasteca-potosina.jpg',
    location: 'Ciudad Valles Region',
    activities: ['Rafting', 'Rappelling', 'Swimming', 'Hiking'],
    difficulty: 'Moderate',
    bestTime: 'October to April',
    duration: '1-3 days recommended',
    distance: '250 km from SLP city',
    type: 'Natural Wonder',
  },
  // Add more attractions here
];

const categories = [
  {
    name: 'Natural Wonders',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    count: 12,
  },
  {
    name: 'Adventure Sports',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    count: 8,
  },
  {
    name: 'Hiking Trails',
    icon: 'M13.752 3.751l-3.75 3.75L6 3.75m4.002 13.501l3.75-3.75L18 17.251',
    count: 15,
  },
  {
    name: 'Camping Sites',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    count: 6,
  },
];

const seasonalTips = [
  {
    season: 'Spring (March-May)',
    weather: 'Warm and dry',
    activities: ['Hiking', 'Rock Climbing', 'Photography'],
    tips: 'Best time for wildflower viewing. Bring sun protection.',
  },
  {
    season: 'Summer (June-August)',
    weather: 'Hot with afternoon showers',
    activities: ['Swimming', 'Early Morning Hikes', 'Waterfall Visits'],
    tips: 'Start early to avoid afternoon heat and rain. Bring rain gear.',
  },
  {
    season: 'Fall (September-November)',
    weather: 'Mild and pleasant',
    activities: ['Hiking', 'Camping', 'Mountain Biking'],
    tips: 'Perfect weather for most outdoor activities. Popular season - book in advance.',
  },
  {
    season: 'Winter (December-February)',
    weather: 'Cool and dry',
    activities: ['Desert Exploration', 'Photography', 'Rock Climbing'],
    tips: 'Bring layers for temperature changes. Clear skies great for photography.',
  },
];

export default function Outdoors() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Outdoor Activities in San Luis Potosí | SLP Guide</title>
        <meta 
          name="description" 
          content="Discover the natural wonders and outdoor activities in San Luis Potosí, from the Huasteca Potosina to desert adventures."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <Image
            src="/images/practical-categories/outdoors.jpg"
            alt="Outdoors"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Explore the Outdoors
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Discover natural wonders, adventure sports, and outdoor activities in the diverse landscapes of San Luis Potosí.
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">{category.count} locations</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Attractions */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((attraction) => (
                <div 
                  key={attraction.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{attraction.name}</h3>
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {attraction.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{attraction.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {attraction.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {attraction.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Difficulty: {attraction.difficulty}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {attraction.activities.map((activity) => (
                          <span 
                            key={activity}
                            className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {activity}
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

        {/* Seasonal Guide */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Seasonal Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {seasonalTips.map((season) => (
                <div 
                  key={season.season}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">{season.season}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Weather</p>
                      <p className="text-gray-600">{season.weather}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Best Activities</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {season.activities.map((activity) => (
                          <li key={activity}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Tips</p>
                      <p className="text-gray-600">{season.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Safety Tips</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Before You Go</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Check weather conditions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Inform someone about your plans</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Pack appropriate gear and clothing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">During Activity</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Stay hydrated and carry water</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Follow marked trails and signs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Respect wildlife and nature</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Planning Your Adventure?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized recommendations and expert advice for your outdoor activities.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Contact an Expert
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 