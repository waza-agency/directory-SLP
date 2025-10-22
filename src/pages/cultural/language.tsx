import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';

export default function MusicDancePage() {
  const [activeGenre, setActiveGenre] = useState('mariachi');

  const musicGenres = {
    mariachi: {
      name: "Mariachi",
      description: "The iconic sound of Mexico, featuring trumpets, violins, and guitars",
      origins: "Jalisco, 18th century",
      characteristics: [
        "Typically 6-8 musicians in traditional charro suits",
        "Features trumpets, violins, guitars, vihuela, and guitarrón",
        "Songs about love, patriotism, and Mexican pride",
        "Performed at celebrations, weddings, and serenades"
      ],
      etiquette: [
        "It's customary to tip mariachis generously after a song",
        "You can request specific songs - classics like 'Cielito Lindo' or 'La Bamba'",
        "Traditional to hire mariachis for serenades (las mañanitas for birthdays)",
        "Show respect during Mexican national anthem performances"
      ],
      whereToExperience: [
        "Plaza de Armas on weekend evenings",
        "Traditional restaurants and cantinas",
        "Festivals and celebrations throughout the year",
        "Private events and serenades (can be hired)"
      ]
    },
    huapango: {
      name: "Huapango Huasteco",
      description: "Traditional folk music from the Huasteca region, including parts of SLP",
      origins: "Huasteca region (SLP, Veracruz, Hidalgo)",
      characteristics: [
        "Features violin, jarana huasteca (small guitar), and huapanguera",
        "Falsetto singing style (unique vocal technique)",
        "Complex rhythms and improvisational verses",
        "Often performed with zapateado (rhythmic footwork dancing)"
      ],
      etiquette: [
        "Zapateado dancing on wooden platform is traditional - join if invited!",
        "Verses are often improvised and can be poetic or humorous",
        "Respectful silence during falsetto passages shows appreciation",
        "Common at regional festivals and traditional celebrations"
      ],
      whereToExperience: [
        "Huasteca Potosina cultural events",
        "Traditional festivals in Ciudad Valles and Tamazunchale",
        "Cultural centers showcasing regional traditions",
        "Special performances during Xantolo (Day of the Dead)"
      ]
    },
    norteno: {
      name: "Norteño",
      description: "Accordion-driven music from Northern Mexico, popular across SLP",
      origins: "Northern Mexico, late 19th century",
      characteristics: [
        "Accordion and bajo sexto (12-string bass guitar) are key",
        "Polka and waltz rhythms from European immigrants",
        "Storytelling lyrics about daily life, love, and struggle",
        "Energetic and danceable - corridos and rancheras"
      ],
      etiquette: [
        "Perfect for dancing - cumbia norteña is very popular",
        "Songs often tell stories - listen to the lyrics",
        "Common at family gatherings and parties",
        "Respectful to dance when invited, even if you're a beginner"
      ],
      whereToExperience: [
        "Local dance halls and salones de baile",
        "Family parties and celebrations",
        "Bars and cantinas throughout SLP",
        "Regional festivals and fairs"
      ]
    },
    son: {
      name: "Son Mexicano",
      description: "Traditional folk music blending indigenous, Spanish, and African influences",
      origins: "Various regions of Mexico, colonial period",
      characteristics: [
        "Diverse regional styles (son jarocho, son huasteco, etc.)",
        "Call-and-response singing patterns",
        "Improvised verses and poetic dueling (trovadores)",
        "Often accompanied by traditional dancing"
      ],
      etiquette: [
        "Participatory music - clapping and dancing encouraged",
        "Verses can be improvised on the spot",
        "Traditional at community gatherings and fiestas",
        "Learning basic steps shows cultural appreciation"
      ],
      whereToExperience: [
        "Community fiestas and celebrations",
        "Cultural events at Casa de la Cultura",
        "Traditional festivals throughout the year",
        "Regional museums with live demonstrations"
      ]
    }
  };

  const traditionalDances = [
    {
      name: "Jarabe Tapatío",
      aka: "Mexican Hat Dance",
      description: "Mexico's national folk dance, recognized worldwide",
      attire: "Women in colorful china poblana dresses, men in charro suits",
      significance: "Courtship dance symbolizing Mexican identity and pride"
    },
    {
      name: "Danza de los Viejitos",
      aka: "Dance of the Little Old Men",
      description: "Playful dance from Michoacán featuring masked dancers",
      attire: "Wooden masks, traditional clothing, and walking sticks",
      significance: "Satirizes old age while celebrating wisdom and vitality"
    },
    {
      name: "Huapango Dance",
      aka: "Zapateado Huasteco",
      description: "Traditional dance from the Huasteca region with rhythmic footwork",
      attire: "White traditional clothing, often with colorful embroidery",
      significance: "Regional identity and indigenous heritage celebration"
    },
    {
      name: "Danza de los Concheros",
      aka: "Aztec Dance",
      description: "Pre-Hispanic ceremonial dance with indigenous roots",
      attire: "Feathered headdresses, traditional indigenous costumes",
      significance: "Spiritual connection to indigenous ancestors and traditions"
    }
  ];

  return (
    <>
      <Head>
        <title>Traditional Music & Dance | San Luis Potosí Culture</title>
        <meta name="description" content="Discover the rich musical traditions of San Luis Potosí - from mariachi and huapango to traditional dances. Your guide to experiencing authentic Mexican music and culture." />
        <meta name="keywords" content="mariachi San Luis Potosí, huapango huasteco, Mexican traditional music, folk dances Mexico, norteño music, son mexicano, cultural traditions SLP" />
        <meta property="og:title" content="Traditional Music & Dance | San Luis Potosí Culture" />
        <meta property="og:description" content="Discover the rich musical traditions of San Luis Potosí - from mariachi and huapango to traditional dances." />
        <meta property="og:image" content="/images/music-dance.jpg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-amber-600 to-red-600 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/music-dance.jpg"
              alt="Traditional Mexican music and dance in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/language.jpg';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />

          <div className="relative container mx-auto px-6 md:px-12 lg:px-20 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
                <span className="text-white font-medium text-sm tracking-wider uppercase">Cultural Traditions</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Music & Dance Traditions
              </h1>
              <p className="text-white/90 text-xl leading-relaxed">
                Discover the vibrant sounds and movements that define Mexican culture, from mariachi serenades to regional huapango
              </p>
            </div>
          </div>
        </section>

        {/* Music Genres Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Traditional Sounds</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Musical Traditions of Mexico
              </h2>
              <p className="text-xl text-gray-600">
                Explore the diverse musical styles that bring Mexican culture to life
              </p>
            </div>

            {/* Genre Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(musicGenres).map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeGenre === genre
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {musicGenres[genre as keyof typeof musicGenres].name}
                </button>
              ))}
            </div>

            {/* Genre Details */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 border border-amber-100">
                <div className="mb-8">
                  <h3 className="font-serif text-3xl font-bold text-gray-900 mb-3">
                    {musicGenres[activeGenre as keyof typeof musicGenres].name}
                  </h3>
                  <p className="text-xl text-gray-700 mb-2">
                    {musicGenres[activeGenre as keyof typeof musicGenres].description}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Origins: {musicGenres[activeGenre as keyof typeof musicGenres].origins}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Characteristics */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg">Characteristics</h4>
                    </div>
                    <ul className="space-y-2">
                      {musicGenres[activeGenre as keyof typeof musicGenres].characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Etiquette */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg">Cultural Etiquette</h4>
                    </div>
                    <ul className="space-y-2">
                      {musicGenres[activeGenre as keyof typeof musicGenres].etiquette.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Where to Experience */}
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">Where to Experience</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {musicGenres[activeGenre as keyof typeof musicGenres].whereToExperience.map((place, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
                        <span className="text-blue-500 mt-1">📍</span>
                        <span>{place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Dances Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Movement & Expression</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Traditional Mexican Dances
              </h2>
              <p className="text-xl text-gray-600">
                Discover the folk dances that tell stories of Mexico's rich heritage and regional identity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {traditionalDances.map((dance, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-red-500 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">{dance.name}</h3>
                    <p className="text-white/90 text-sm italic">{dance.aka}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">{dance.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600">👗</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Traditional Attire</p>
                          <p className="text-sm text-gray-600">{dance.attire}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600">⭐</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Cultural Significance</p>
                          <p className="text-sm text-gray-600">{dance.significance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Tips Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Experience It Yourself</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How to Enjoy Music & Dance in SLP
              </h2>
              <p className="text-xl text-gray-600">
                Practical tips for experiencing traditional music and dance as an expat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Where to Find It</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Plaza de Armas on weekend evenings for mariachi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Traditional restaurants often have live music
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Casa de la Cultura for cultural performances
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Annual festivals showcase regional music
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Participation Tips</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Don't be shy - clapping along is encouraged
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Dancing is social - join in even as a beginner
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Tip musicians generously if they take requests
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Ask about dance lessons at cultural centers
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Cultural Respect</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Show respect during traditional ceremonies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Ask before taking photos of performers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Appreciate the cultural significance, not just entertainment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Support local musicians and dancers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-600 to-red-600">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Experience Traditional Music?
              </h2>
              <p className="text-xl text-white/90 mb-10">
                Discover live performances, cultural events, and traditional celebrations in San Luis Potosí
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-3 bg-white text-amber-600 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Browse Cultural Events
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/cultural"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-amber-600"
                >
                  Explore More Culture
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};