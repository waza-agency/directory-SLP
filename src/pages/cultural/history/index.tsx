import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  ClockIcon,
  SparklesIcon,
  BookOpenIcon,
  TrophyIcon,
  PhotoIcon,
  MusicalNoteIcon,
  CakeIcon,
  TruckIcon,
  MapIcon,
  CameraIcon,
  MusicalNoteIcon as MusicIcon,
  CakeIcon as FoodIcon,
  TruckIcon as AdventureIcon,
  SparklesIcon as SpecialIcon,
  BuildingLibraryIcon as HeritageIcon,
  MapPinIcon as LocationIcon,
  ClockIcon as TimeIcon,
  BookOpenIcon as CultureIcon,
  TrophyIcon as AwardIcon,
  PhotoIcon as ArchitectureIcon,
  MusicalNoteIcon as FestivalIcon
} from '@heroicons/react/24/outline';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default function History() {
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const timelineEvents = [
    {
      year: '1592',
      title: 'City Founding',
      description: 'San Luis Potosí is founded by Spanish settlers, though indigenous peoples had inhabited the area for centuries.',
      image: '/images/history/timeline/founding.jpg'
    },
    {
      year: '1593',
      title: 'First Silver Discovery',
      description: 'Rich silver deposits are discovered in Cerro de San Pedro, marking the beginning of the city\'s mining era.',
      image: '/images/history/timeline/silver.jpg'
    },
    {
      year: '1656',
      title: 'Cathedral Construction',
      description: 'Construction begins on the Metropolitan Cathedral, a symbol of the city\'s religious and architectural heritage.',
      image: '/images/history/timeline/cathedral.jpg'
    },
    {
      year: '1810',
      title: 'Independence Movement',
      description: 'San Luis Potosí becomes a key strategic point in Mexico\'s War of Independence.',
      image: '/images/history/timeline/independence.jpg'
    },
    {
      year: '1910',
      title: 'Mexican Revolution',
      description: 'The city plays a crucial role in the Mexican Revolution as a center for political meetings and military movements.',
      image: '/images/history/timeline/revolution.jpg'
    },
    {
      year: '2010',
      title: 'UNESCO Recognition',
      description: 'The historic center becomes part of the UNESCO World Heritage site "Camino Real de Tierra Adentro".',
      image: '/images/history/timeline/unesco.jpg'
    }
  ];

  const nextTimelineEvent = () => {
    setCurrentTimelineIndex((prev) => (prev + 1) % timelineEvents.length);
  };

  const prevTimelineEvent = () => {
    setCurrentTimelineIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
  };

  return (
    <>
      <Head>
        <title>History of San Luis Potosí | San Luis Way</title>
        <meta
          name="description"
          content="Discover the rich history of San Luis Potosí, from its founding to modern times. Learn about the city's colonial past, cultural heritage, and historical significance."
        />
        <meta
          name="keywords"
          content="San Luis Potosí history, colonial history, Mexican history, historical landmarks, cultural heritage"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y }}
          >
            <Image
              src="/images/history/hero.jpg"
              alt="Historical San Luis Potosí"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-800/80 to-blue-900/90" />
            {/* Historical pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </motion.div>

          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mr-4">
                  <BuildingLibraryIcon className="w-8 h-8 text-white" />
                </div>
                <motion.h1
                  className="text-6xl md:text-7xl font-bold text-white leading-tight"
                >
                  History of San Luis Potosí
                </motion.h1>
              </motion.div>
              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Journey through time and discover the rich historical tapestry of San Luis Potosí, from its indigenous roots to its colonial grandeur and modern significance.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"
            style={{ opacity }}
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Founding Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Founding of San Luis Potosí</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="prose max-w-none">
                <p>
                  San Luis Potosí was founded in 1592 by Spanish settlers, though the area had been inhabited by indigenous peoples for centuries before. The city's name combines two elements: "San Luis" in honor of King Louis IX of France, and "Potosí" after the rich silver mines of Potosí in Bolivia, which the Spanish hoped to replicate here.
                </p>
                <p>
                  The founding of the city was driven by the discovery of rich silver deposits in the Cerro de San Pedro area. This discovery attracted miners, merchants, and settlers, transforming the region into one of New Spain's most important mining centers.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/history/founding.jpg"
                  alt="Historical founding of San Luis Potosí"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Seven Barrios Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Seven Historical Barrios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'San Miguelito',
                  description: 'Known for its colonial architecture and traditional markets, San Miguelito is one of the oldest neighborhoods in the city.',
                  image: '/images/history/barrios/san-miguelito.jpg',
                  details: 'San Miguelito features some of the city\'s most well-preserved colonial buildings and hosts weekly traditional markets that have been operating for centuries.',
                  style: 'bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500'
                },
                {
                  name: 'San Sebastián',
                  description: 'Famous for its historic churches and traditional festivals, this barrio maintains strong cultural traditions.',
                  image: '/images/history/barrios/san-sebastian.jpg',
                  details: 'The barrio is home to the historic San Sebastián Church and hosts the annual Festival of San Sebastián, one of the city\'s most important religious celebrations.',
                  style: 'bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500'
                },
                {
                  name: 'San Juan de Guadalupe',
                  description: 'Home to important religious sites and colonial-era buildings, this neighborhood has rich historical significance.',
                  image: '/images/history/barrios/san-juan-de-guadalupe.jpg',
                  details: 'San Juan de Guadalupe is known for its important religious sites and colonial-era buildings.',
                  style: 'bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500'
                },
                {
                  name: 'Santiago',
                  description: 'Known for its traditional crafts and local markets, Santiago preserves many colonial-era customs.',
                  image: '/images/history/barrios/santiago.jpg',
                  details: 'Santiago is known for its traditional crafts and local markets.',
                  style: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500'
                },
                {
                  name: 'Tlaxcala',
                  description: 'This barrio is famous for its indigenous heritage and traditional celebrations.',
                  image: '/images/history/barrios/tlaxcala.jpg',
                  details: 'Tlaxcala is famous for its indigenous heritage and traditional celebrations.',
                  style: 'bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500'
                },
                {
                  name: 'San Cristóbal',
                  description: 'Known for its historic architecture and cultural events, this neighborhood has a rich artistic tradition.',
                  image: '/images/history/barrios/san-cristobal.jpg',
                  details: 'San Cristóbal is known for its historic architecture and cultural events.',
                  style: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-500'
                },
                {
                  name: 'Tequisquiapan',
                  description: 'Famous for its colonial-era buildings and traditional festivals, this barrio maintains strong cultural traditions.',
                  image: '/images/history/barrios/tequisquiapan.jpg',
                  details: 'Tequisquiapan is famous for its colonial-era buildings and traditional festivals.',
                  style: 'bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-pink-500'
                }
              ].map((barrio) => (
                <motion.div
                  key={barrio.name}
                  className={`${barrio.style} rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedBarrio(barrio.name)}
                >
                  {/* Decorative corner pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform rotate-45 translate-x-12 -translate-y-12">
                    <div className="w-full h-full border-4 border-current rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors">
                      {barrio.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {barrio.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {selectedBarrio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedBarrio(null)}
                >
                  <motion.div
                    className="bg-white rounded-xl p-8 max-w-2xl w-full"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    <h3 className="text-2xl font-bold mb-4">{selectedBarrio}</h3>
                    <p className="text-gray-600 mb-4">
                      {[
                        {
                          name: 'San Miguelito',
                          details: 'San Miguelito features some of the city\'s most well-preserved colonial buildings and hosts weekly traditional markets that have been operating for centuries.'
                        },
                        {
                          name: 'San Sebastián',
                          details: 'The barrio is home to the historic San Sebastián Church and hosts the annual Festival of San Sebastián, one of the city\'s most important religious celebrations.'
                        },
                        {
                          name: 'San Juan de Guadalupe',
                          details: 'San Juan de Guadalupe is known for its important religious sites and colonial-era buildings.'
                        },
                        {
                          name: 'Santiago',
                          details: 'Santiago is known for its traditional crafts and local markets.'
                        },
                        {
                          name: 'Tlaxcala',
                          details: 'Tlaxcala is famous for its indigenous heritage and traditional celebrations.'
                        },
                        {
                          name: 'San Cristóbal',
                          details: 'San Cristóbal is known for its historic architecture and cultural events.'
                        },
                        {
                          name: 'Tequisquiapan',
                          details: 'Tequisquiapan is famous for its colonial-era buildings and traditional festivals.'
                        }
                      ].find(b => b.name === selectedBarrio)?.details}
                    </p>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setSelectedBarrio(null)}
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Historical Timeline Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Historical Timeline</h2>
            <div className="relative">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={prevTimelineEvent}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                </button>

                <motion.div
                  key={currentTimelineIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full"
                >
                  <div className="relative h-[200px] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={timelineEvents[currentTimelineIndex].image}
                      alt={timelineEvents[currentTimelineIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {timelineEvents[currentTimelineIndex].year}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">
                      {timelineEvents[currentTimelineIndex].title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {timelineEvents[currentTimelineIndex].description}
                    </p>
                  </div>
                </motion.div>

                <button
                  onClick={nextTimelineEvent}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {timelineEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTimelineIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTimelineIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Colonial Era Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Colonial Era</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/history/colonial.jpg"
                  alt="Colonial architecture in San Luis Potosí"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="prose max-w-none">
                <p>
                  During the colonial period, San Luis Potosí became one of New Spain's most important cities. The wealth from its silver mines funded the construction of magnificent churches, palaces, and public buildings that still stand today.
                </p>
                <p>
                  The city's strategic location along the Camino Real de Tierra Adentro (Royal Inland Road) made it a crucial stop for trade between Mexico City and the northern territories. This brought wealth and cultural exchange to the region.
                </p>
                <p>
                  The colonial architecture of San Luis Potosí reflects the city's prosperity during this period, with beautiful examples of Baroque and Neoclassical styles throughout the historic center.
                </p>
              </div>
            </div>
          </section>

          {/* Independence and Revolution Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Independence and Revolution</h2>
            <div className="prose max-w-none">
              <p>
                San Luis Potosí played significant roles in both Mexico's War of Independence and the Mexican Revolution. During the independence movement, the city was a key strategic point, and several important battles were fought in the region.
              </p>
              <p>
                In the Mexican Revolution, San Luis Potosí was the site of important political meetings and military movements. The city's strategic location and economic importance made it a crucial center for revolutionary activities.
              </p>
            </div>
          </section>

          {/* Fun Facts Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Fun Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <HeritageIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">UNESCO World Heritage</h3>
                </div>
                <p className="text-gray-600">
                  The historic center of San Luis Potosí is part of the UNESCO World Heritage site "Camino Real de Tierra Adentro".
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <LocationIcon className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold">City of Gardens</h3>
                </div>
                <p className="text-gray-600">
                  The city is known as "La Ciudad de los Jardines" (The City of Gardens) due to its many beautiful public gardens and parks.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <TimeIcon className="w-6 h-6 text-yellow-600 mr-2" />
                  <h3 className="text-xl font-semibold">Silver Heritage</h3>
                </div>
                <p className="text-gray-600">
                  The city's coat of arms features a mountain with silver and gold, symbolizing its rich mining heritage.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <CultureIcon className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-xl font-semibold">Cultural Capital</h3>
                </div>
                <p className="text-gray-600">
                  San Luis Potosí was named the American Capital of Culture in 2006.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <ArchitectureIcon className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Historic Architecture</h3>
                </div>
                <p className="text-gray-600">
                  The city has over 1,500 historic buildings in its colonial center.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <FestivalIcon className="w-6 h-6 text-pink-600 mr-2" />
                  <h3 className="text-xl font-semibold">Traditional Festivals</h3>
                </div>
                <p className="text-gray-600">
                  The city hosts numerous traditional festivals throughout the year, including the famous Feria Nacional Potosina.
                </p>
              </div>
            </div>
          </section>

          {/* Modern Era Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Modern San Luis Potosí</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="prose max-w-none">
                <p>
                  Today, San Luis Potosí is a thriving modern city that successfully balances its rich historical heritage with contemporary development. The city has become an important industrial and commercial center while preserving its colonial charm and cultural traditions.
                </p>
                <p>
                  The historic center remains one of the best-preserved colonial cities in Mexico, attracting visitors from around the world who come to admire its architecture, experience its culture, and learn about its fascinating history.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/history/modern.jpg"
                  alt="Modern San Luis Potosí"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}