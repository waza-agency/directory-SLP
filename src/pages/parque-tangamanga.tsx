import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon, SunIcon, UsersIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 3600,
  };
};

export default function ParqueTangamanga() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/parque-tangamanga/hero.jpg"
          alt="Tangamanga Park"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Tangamanga Park
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              The Green Lung of San Luis Potosí - Where Nature Meets Adventure
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="font-semibold text-sm">Mon: 6AM-11AM</p>
                    <p className="font-semibold text-sm">Tue-Sun: 6AM-8PM</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TicketIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Admission</p>
                    <p className="font-semibold text-sm">Free Entry</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-sm">Av. Dr. Salvador Nava</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <SunIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-semibold text-sm">420+ Hectares</p>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section with Image */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">History & Cultural Significance</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/parque-tangamanga/historical.jpg"
                      alt="Historical view of Tangamanga Park"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">The Meaning of "Tangamanga"</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The name "Tangamanga" comes from the Huachichil language, an indigenous group that once inhabited 
                      the region. It translates to "meeting place" or "place of gathering," reflecting the park's role 
                      as a central social and cultural hub for the community.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Creation and Development</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Inaugurated in 1980, Tangamanga Park was created as part of an ambitious urban development project 
                    aimed at providing green spaces for recreation and leisure. The project was a response to the 
                    growing need for public spaces in San Luis Potosí, as the city was experiencing rapid urbanization.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Cultural Impact</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Over the years, Tangamanga Park has become much more than just a green space. It has evolved into 
                    a fundamental gathering point for the Potosino community, hosting countless cultural events, 
                    festivals, and community activities.
                  </p>
                </div>
              </div>
            </section>

            {/* Main Attractions with Images */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Main Attractions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/lake.jpg"
                      alt="Lake at Tangamanga Park"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">Natural Spaces</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Botanical garden with diverse plant species</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Artificial lake for boat rides</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Trails for walking and cycling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Picnic areas and grills</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/sports.jpg"
                      alt="Sports facilities at Tangamanga Park"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">Sports Facilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Sports courts (soccer, volleyball, basketball)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Skatepark</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Running tracks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>Rock climbing area</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Activities Section with Image Gallery */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <UsersIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Activities & Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-sports.jpeg"
                      alt="Sports activities at Tangamanga"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Sports</h3>
                    <ul className="space-y-3 text-sm">
                      <li>Outdoor yoga classes</li>
                      <li>Running and walking groups</li>
                      <li>Zumba and dance classes</li>
                      <li>Team sports practice</li>
                      <li>Rock climbing</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-culture.jpeg"
                      alt="Cultural activities at Tangamanga"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Culture</h3>
                    <ul className="space-y-3 text-sm">
                      <li>Outdoor theater performances</li>
                      <li>Concerts at the amphitheater</li>
                      <li>Art exhibitions</li>
                      <li>Environmental education workshops</li>
                      <li>Cultural festivals</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-family.jpg "
                      alt="Family activities at Tangamanga"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Family</h3>
                    <ul className="space-y-3 text-sm">
                      <li>Children's playground area</li>
                      <li>Boat rides on the lake</li>
                      <li>Guided tours of the botanical garden</li>
                      <li>Environmental education activities</li>
                      <li>Family festivals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Biodiversity Section with Image */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <HeartIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Biodiversity</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The park hosts a rich diversity of flora and fauna. In its more than 420 hectares, 
                  you can find various species of native trees, migratory and resident birds, 
                  as well as small mammals and reptiles. The botanical garden is especially important 
                  for the conservation of endemic species in the region.
                </p>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/parque-tangamanga/biodiversity.jpg"
                    alt="Biodiversity at Tangamanga Park"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Services</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Parking</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Restrooms</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Food Stands</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Bike Rental</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Visitor Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Bring sunscreen and water</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Wear comfortable shoes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Arrive early on weekends</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Check event schedule</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Respect designated areas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Don't leave trash</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 