import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';

export default function LivingGuidePage() {
  const [activeSection, setActiveSection] = useState('culture');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'culture', name: 'Culture & Lifestyle' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'sports', name: 'Sports & Recreation' },
    { id: 'weather', name: 'Weather & Climate' },
    { id: 'safety', name: 'Safety Tips' },
    { id: 'language', name: 'Language & Communication' },
  ];

  const culturalInfo = {
    festivals: [
      {
        name: 'Feria Nacional Potosina',
        date: 'August',
        description: 'Annual fair featuring cultural events, food, and entertainment',
      },
      {
        name: 'Festival Internacional de Danza Contemporánea',
        date: 'October',
        description: 'International contemporary dance festival',
      },
      {
        name: 'Festival de la Luz',
        date: 'December',
        description: 'Christmas light festival and celebrations',
      },
    ],
    traditions: [
      'Traditional Mexican celebrations (Día de los Muertos, Independence Day)',
      'Local religious festivals and processions',
      'Family-oriented social gatherings',
      'Sunday family outings to parks and plazas',
    ],
  };

  const foodInfo = {
    localDishes: [
      {
        name: 'Enchiladas Potosinas',
        description: 'Red corn tortillas filled with cheese and topped with lettuce, cream, and cheese',
      },
      {
        name: 'Gorditas de Nata',
        description: 'Sweet corn cakes made with cream, served as a dessert',
      },
      {
        name: 'Zacahuil',
        description: 'Large tamale made with pork and spices, wrapped in banana leaves',
      },
    ],
    popularRestaurants: [
      {
        name: 'La Parroquia',
        cuisine: 'Traditional Mexican',
        location: 'Centro Histórico',
        priceRange: '$$',
      },
      {
        name: 'La Antigua',
        cuisine: 'International',
        location: 'Zona Universitaria',
        priceRange: '$$$',
      },
      {
        name: 'El Patio',
        cuisine: 'Mexican Fusion',
        location: 'San Sebastián',
        priceRange: '$$',
      },
    ],
  };

  const shoppingInfo = {
    malls: [
      {
        name: 'Plaza San Luis',
        location: 'Av. Salvador Nava Martínez',
        stores: 'Department stores, restaurants, cinema',
      },
      {
        name: 'Plaza Sendero',
        location: 'Av. Salvador Nava Martínez',
        stores: 'Department stores, restaurants, entertainment',
      },
    ],
    markets: [
      {
        name: 'Mercado Hidalgo',
        location: 'Centro Histórico',
        description: 'Traditional market with local products and crafts',
      },
      {
        name: 'Mercado Arista',
        location: 'Centro Histórico',
        description: 'Fresh produce and local goods',
      },
    ],
  };

  const entertainmentInfo = {
    nightlife: [
      {
        area: 'Centro Histórico',
        description: 'Bars, restaurants, and live music venues',
      },
      {
        area: 'Zona Universitaria',
        description: 'Student-friendly bars and cafes',
      },
      {
        area: 'San Sebastián',
        description: 'Upscale bars and restaurants',
      },
    ],
    culturalVenues: [
      {
        name: 'Teatro de la Paz',
        type: 'Theater',
        description: 'Historic theater hosting performances and concerts',
      },
      {
        name: 'Centro de las Artes',
        type: 'Arts Center',
        description: 'Contemporary art exhibitions and workshops',
      },
      {
        name: 'Cineteca Alameda',
        type: 'Cinema',
        description: 'Art house cinema and cultural events',
      },
    ],
  };

  const sportsInfo = {
    facilities: [
      {
        name: 'Parque Tangamanga I',
        activities: ['Running trails', 'Bike paths', 'Sports fields', 'Lake activities'],
      },
      {
        name: 'Parque Tangamanga II',
        activities: ['Sports complex', 'Swimming pools', 'Tennis courts', 'Soccer fields'],
      },
      {
        name: 'Centro Deportivo Universitario',
        activities: ['Gym', 'Swimming pool', 'Sports courts', 'Fitness classes'],
      },
    ],
    sportsClubs: [
      {
        name: 'Club Campestre',
        type: 'Country Club',
        activities: ['Golf', 'Tennis', 'Swimming', 'Social events'],
      },
      {
        name: 'Club Deportivo Potosino',
        type: 'Sports Club',
        activities: ['Soccer', 'Basketball', 'Volleyball', 'Fitness'],
      },
    ],
  };

  const weatherInfo = {
    climate: {
      description: 'Semi-arid climate with warm summers and mild winters',
      summer: 'March to May: Hot and dry (25-35°C)',
      rainy: 'June to October: Rainy season with moderate temperatures',
      winter: 'November to February: Cool and dry (10-25°C)',
    },
    tips: [
      'Stay hydrated during hot months',
      'Carry an umbrella during rainy season',
      'Layer clothing for temperature changes',
      'Use sunscreen year-round',
    ],
  };

  const safetyInfo = {
    generalTips: [
      'Be aware of your surroundings',
      'Keep valuables secure',
      'Use well-lit and busy streets',
      'Keep emergency numbers handy',
    ],
    areas: [
      {
        name: 'Centro Histórico',
        safety: 'Generally safe, busy during day',
        tips: 'Stay in well-lit areas at night',
      },
      {
        name: 'Residential Areas',
        safety: 'Very safe',
        tips: 'Standard precautions',
      },
      {
        name: 'Shopping Areas',
        safety: 'Safe during business hours',
        tips: 'Watch belongings in crowded areas',
      },
    ],
  };

  const languageInfo = {
    commonPhrases: [
      { spanish: 'Buenos días', english: 'Good morning' },
      { spanish: '¿Cómo estás?', english: 'How are you?' },
      { spanish: 'Gracias', english: 'Thank you' },
      { spanish: 'Por favor', english: 'Please' },
      { spanish: '¿Dónde está...?', english: 'Where is...?' },
    ],
    resources: [
      {
        name: 'Instituto Potosino de Lenguas',
        description: 'Language school offering Spanish classes',
        contact: '444 812 3456',
      },
      {
        name: 'Conversation Groups',
        description: 'Weekly meetups for language practice',
        contact: 'Check local Facebook groups',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Living Guide - SLP Descubre</title>
        <meta name="description" content="Comprehensive guide to living in San Luis Potosí. Learn about culture, food, shopping, entertainment, and daily life in SLP." />
        <meta name="keywords" content="San Luis Potosí living guide, SLP culture, food, shopping, entertainment, lifestyle" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-1.jpg"
              alt="San Luis Potosí lifestyle"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Living in San Luis Potosí
              </h1>
              <p className="text-white text-lg">
                Your guide to culture, lifestyle, and daily life in SLP
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="sticky top-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Cost of Living Callout */}
            <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Planning Your Budget?</h3>
                  <p className="text-gray-700 mb-3">
                    Before moving to SLP, it's essential to understand the real cost of living. Our comprehensive 2025 analysis covers housing, food, transportation, healthcare, and more.
                  </p>
                  <a
                    href="/blog/costo-de-vida-san-luis-potosi-2025"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Read the Complete Cost of Living Analysis →
                  </a>
                </div>
              </div>
            </div>

            {/* Culture & Lifestyle Section */}
            <section id="culture" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Culture & Lifestyle</h2>
              <div className="space-y-6">
                {/* Festivals */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Major Festivals</h3>
                  <div className="space-y-4">
                    {culturalInfo.festivals.map((festival, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{festival.name}</h4>
                        <p className="text-primary text-sm mb-2">{festival.date}</p>
                        <p className="text-gray-600">{festival.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traditions */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Traditions</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {culturalInfo.traditions.map((tradition, index) => (
                      <li key={index}>{tradition}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Food & Dining Section */}
            <section id="food" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Food & Dining</h2>
              <div className="space-y-6">
                {/* Local Dishes */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Specialties</h3>
                  <div className="space-y-4">
                    {foodInfo.localDishes.map((dish, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{dish.name}</h4>
                        <p className="text-gray-600">{dish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restaurants */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Restaurants</h3>
                  <div className="space-y-4">
                    {foodInfo.popularRestaurants.map((restaurant, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{restaurant.name}</h4>
                        <p className="text-gray-600">{restaurant.cuisine}</p>
                        <p className="text-gray-600">{restaurant.location}</p>
                        <p className="text-primary">{restaurant.priceRange}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Shopping Section */}
            <section id="shopping" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping</h2>
              <div className="space-y-6">
                {/* Malls */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shopping Malls</h3>
                  <div className="space-y-4">
                    {shoppingInfo.malls.map((mall, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{mall.name}</h4>
                        <p className="text-gray-600">{mall.location}</p>
                        <p className="text-gray-600">{mall.stores}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Markets */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional Markets</h3>
                  <div className="space-y-4">
                    {shoppingInfo.markets.map((market, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{market.name}</h4>
                        <p className="text-gray-600">{market.location}</p>
                        <p className="text-gray-600">{market.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Entertainment Section */}
            <section id="entertainment" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Entertainment</h2>
              <div className="space-y-6">
                {/* Nightlife */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nightlife Areas</h3>
                  <div className="space-y-4">
                    {entertainmentInfo.nightlife.map((area, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{area.area}</h4>
                        <p className="text-gray-600">{area.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Venues */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultural Venues</h3>
                  <div className="space-y-4">
                    {entertainmentInfo.culturalVenues.map((venue, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{venue.name}</h4>
                        <p className="text-primary text-sm mb-2">{venue.type}</p>
                        <p className="text-gray-600">{venue.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Sports & Recreation Section */}
            <section id="sports" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Sports & Recreation</h2>
              <div className="space-y-6">
                {/* Facilities */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Public Facilities</h3>
                  <div className="space-y-4">
                    {sportsInfo.facilities.map((facility, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{facility.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {facility.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sports Clubs */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sports Clubs</h3>
                  <div className="space-y-4">
                    {sportsInfo.sportsClubs.map((club, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{club.name}</h4>
                        <p className="text-primary text-sm mb-2">{club.type}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {club.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Weather & Climate Section */}
            <section id="weather" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Weather & Climate</h2>
              <div className="bg-white rounded-xl shadow-elegant p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Climate Overview</h3>
                    <p className="text-gray-600 mb-4">{weatherInfo.climate.description}</p>
                    <div className="space-y-2">
                      <p className="text-gray-600"><strong>Summer:</strong> {weatherInfo.climate.summer}</p>
                      <p className="text-gray-600"><strong>Rainy Season:</strong> {weatherInfo.climate.rainy}</p>
                      <p className="text-gray-600"><strong>Winter:</strong> {weatherInfo.climate.winter}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather Tips</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {weatherInfo.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Safety Tips Section */}
            <section id="safety" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Safety Tips</h2>
              <div className="space-y-6">
                {/* General Tips */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">General Safety Tips</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {safetyInfo.generalTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Areas */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Area-Specific Information</h3>
                  <div className="space-y-4">
                    {safetyInfo.areas.map((area, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{area.name}</h4>
                        <p className="text-gray-600"><strong>Safety Level:</strong> {area.safety}</p>
                        <p className="text-gray-600"><strong>Tips:</strong> {area.tips}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Language & Communication Section */}
            <section id="language" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Language & Communication</h2>
              <div className="space-y-6">
                {/* Common Phrases */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Phrases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languageInfo.commonPhrases.map((phrase, index) => (
                      <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                        <p className="font-medium text-gray-900">{phrase.spanish}</p>
                        <p className="text-gray-600">{phrase.english}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-white rounded-xl shadow-elegant p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Language Learning Resources</h3>
                  <div className="space-y-4">
                    {languageInfo.resources.map((resource, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium text-gray-900">{resource.name}</h4>
                        <p className="text-gray-600">{resource.description}</p>
                        <p className="text-primary">{resource.contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
}; 