import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';

export default function LanguagePage() {
  const [activeCategory, setActiveCategory] = useState('restaurant');

  const essentialPhrases = {
    restaurant: [
      { spanish: "Una mesa para dos, por favor", english: "A table for two, please", phonetic: "OO-nah MEH-sah PAH-rah dohs, pohr fah-VOHR" },
      { spanish: "¿Qué me recomienda?", english: "What do you recommend?", phonetic: "keh meh reh-koh-mee-EN-dah" },
      { spanish: "La cuenta, por favor", english: "The check, please", phonetic: "lah KWEN-tah, pohr fah-VOHR" },
      { spanish: "¿Tienen menú en inglés?", english: "Do you have a menu in English?", phonetic: "tee-EH-nen meh-NOO en een-GLEHS" },
      { spanish: "Soy alérgico/a a...", english: "I'm allergic to...", phonetic: "soy ah-LEHR-hee-koh/kah ah" },
      { spanish: "Está delicioso", english: "It's delicious", phonetic: "es-TAH deh-lee-see-OH-soh" },
    ],
    shopping: [
      { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", phonetic: "KWAN-toh KWES-tah" },
      { spanish: "¿Tiene otro color/talla?", english: "Do you have another color/size?", phonetic: "tee-EH-neh OH-troh koh-LOHR/TAH-yah" },
      { spanish: "Sólo estoy mirando", english: "I'm just looking", phonetic: "SOH-loh es-TOY mee-RAHN-doh" },
      { spanish: "¿Puedo probármelo?", english: "Can I try it on?", phonetic: "PWEH-doh proh-BAHR-meh-loh" },
      { spanish: "¿Aceptan tarjeta?", english: "Do you accept cards?", phonetic: "ah-SEP-tahn tar-HEH-tah" },
      { spanish: "¿Me da un descuento?", english: "Can you give me a discount?", phonetic: "meh dah oon des-KWEN-toh" },
    ],
    taxi: [
      { spanish: "¿Cuánto cuesta ir a...?", english: "How much to go to...?", phonetic: "KWAN-toh KWES-tah eer ah" },
      { spanish: "Por favor, use el taxímetro", english: "Please use the meter", phonetic: "pohr fah-VOHR, OO-seh el tak-SEE-meh-troh" },
      { spanish: "Aquí está bien", english: "Here is fine", phonetic: "ah-KEE es-TAH bee-EN" },
      { spanish: "¿Puede esperarme?", english: "Can you wait for me?", phonetic: "PWEH-deh es-peh-RAHR-meh" },
      { spanish: "Voy a...", english: "I'm going to...", phonetic: "voy ah" },
      { spanish: "¿Conoce esta dirección?", english: "Do you know this address?", phonetic: "koh-NOH-seh ES-tah dee-rek-see-OHN" },
    ],
    emergencies: [
      { spanish: "¡Ayuda!", english: "Help!", phonetic: "ah-YOO-dah" },
      { spanish: "Necesito un doctor", english: "I need a doctor", phonetic: "neh-seh-SEE-toh oon dohk-TOHR" },
      { spanish: "¿Dónde está el hospital?", english: "Where is the hospital?", phonetic: "DOHN-deh es-TAH el ohs-pee-TAHL" },
      { spanish: "Llame a la policía", english: "Call the police", phonetic: "YAH-meh ah lah poh-lee-SEE-ah" },
      { spanish: "No hablo español", english: "I don't speak Spanish", phonetic: "noh AH-bloh es-pah-NYOHL" },
      { spanish: "¿Habla inglés?", english: "Do you speak English?", phonetic: "AH-blah een-GLEHS" },
    ],
  };

  const localSlang = [
    { term: "¿Qué onda?", meaning: "What's up? / How's it going?", usage: "Casual greeting among friends" },
    { term: "Chido/a", meaning: "Cool / Nice", usage: "¡Qué chido! (That's cool!)" },
    { term: "No manches", meaning: "No way! / You're kidding!", usage: "Expression of disbelief or surprise" },
    { term: "Ahorita", meaning: "Right now (but not really)", usage: "Can mean now, later, or never - context matters!" },
    { term: "¿Mande?", meaning: "What? / Pardon?", usage: "Polite way to ask someone to repeat" },
    { term: "Provecho", meaning: "Enjoy your meal", usage: "Said when passing someone eating" },
    { term: "Con permiso", meaning: "Excuse me (to pass)", usage: "Used when passing by someone" },
    { term: "Güey", meaning: "Dude / Buddy", usage: "Very casual, use only with friends" },
  ];

  return (
    <>
      <Head>
        <title>Spanish Survival Guide for Expats | San Luis Potosí</title>
        <meta name="description" content="Essential Spanish phrases, local slang, and communication tips for expats living in San Luis Potosí. Your practical guide to daily life in Mexico." />
        <meta name="keywords" content="Spanish phrases, San Luis Potosí slang, expat communication, essential Spanish, survival Spanish, Mexican expressions" />
        <meta property="og:title" content="Spanish Survival Guide for Expats | San Luis Potosí" />
        <meta property="og:description" content="Essential Spanish phrases, local slang, and communication tips for expats living in San Luis Potosí." />
        <meta property="og:image" content="/images/language.jpg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/language.jpg"
              alt="Spanish communication in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = target.src.replace('.jpg', '.png');
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />

          <div className="relative container mx-auto px-6 md:px-12 lg:px-20 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
                <span className="text-white font-medium text-sm tracking-wider uppercase">Essential Spanish</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Spanish Survival Guide
              </h1>
              <p className="text-white/90 text-xl leading-relaxed">
                Essential phrases, local slang, and practical tips to navigate daily life in San Luis Potosí with confidence
              </p>
            </div>
          </div>
        </section>

        {/* Essential Phrases Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Daily Essentials</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Phrases You'll Use Every Day
              </h2>
              <p className="text-xl text-gray-600">
                Master these essential phrases for restaurants, shopping, transportation, and emergencies
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(essentialPhrases).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Phrases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {essentialPhrases[activeCategory as keyof typeof essentialPhrases].map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-serif font-bold text-gray-900 mb-2">{phrase.spanish}</p>
                      <p className="text-lg text-gray-600 mb-2">{phrase.english}</p>
                      <p className="text-sm text-gray-500 italic">{phrase.phonetic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Slang Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Sound Like a Local</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Potosino Slang & Expressions
              </h2>
              <p className="text-xl text-gray-600">
                Common expressions and slang unique to San Luis Potosí and Mexico
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {localSlang.map((slang, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 mb-4">
                    <p className="text-2xl font-bold text-primary text-center">{slang.term}</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{slang.meaning}</p>
                  <p className="text-sm text-gray-600 italic">{slang.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication Tips */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Pro Tips</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Communicating Without Fluent Spanish
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Use Translation Apps</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Google Translate has offline mode - download Spanish
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Camera translation works great for menus and signs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Voice translation helps with pronunciation
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Body Language Works</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Pointing and gestures are universally understood
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Smiling goes a long way - Mexicans are friendly!
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Write numbers down to avoid confusion
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Start Simple</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Learn greetings first: "Hola", "Buenos días", "Gracias"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Master numbers 1-100 for shopping and taxis
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Practice one new phrase daily
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Connect with Community</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Join expat groups - they've been where you are
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Ask locals to correct you - they appreciate the effort
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Don't be afraid to make mistakes!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Dos and Don'ts */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Cultural Etiquette</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Communication Dos & Don'ts
              </h2>
              <p className="text-xl text-gray-600">
                Navigate conversations and social situations with cultural awareness
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* DO's */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900">DO</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Greet everyone", desc: "Say 'Buenos días' when entering shops or restaurants" },
                    { title: "Use formal 'Usted'", desc: "Especially with elders, officials, and service staff" },
                    { title: "Say 'Provecho'", desc: "When passing people eating - it's polite!" },
                    { title: "Be patient", desc: "Mexican pace is slower - embrace it" },
                    { title: "Use 'Por favor' and 'Gracias'", desc: "Politeness is highly valued" },
                    { title: "Make small talk", desc: "Mexicans value personal connection before business" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-green-100">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DON'Ts */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900">DON'T</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Rush conversations", desc: "Mexicans value warmth over efficiency" },
                    { title: "Use 'Tú' with everyone", desc: "Wait for the other person to suggest informal" },
                    { title: "Raise your voice", desc: "It's seen as aggressive - stay calm" },
                    { title: "Point with your index finger", desc: "Use your whole hand instead" },
                    { title: "Say 'No' too directly", desc: "Soften refusals: 'Quizás' (maybe) or 'Ahorita no' (not right now)" },
                    { title: "Expect punctuality", desc: "'Ahorita' rarely means 'right now'" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-red-100">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Practice Your Spanish?
              </h2>
              <p className="text-xl text-white/90 mb-10">
                Join our expat community and connect with locals who can help you improve
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center gap-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Join the Community
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary"
                >
                  Find Language Meetups
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