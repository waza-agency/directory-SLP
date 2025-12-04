import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CustomsEtiquettePage() {

  return (
    <>
      <Head>
        <title>Customs & Etiquette in San Luis Potosí - SLP Descubre</title>
        <meta name="description" content="Learn about local customs, social etiquette, and cultural norms in San Luis Potosí to help you integrate smoothly into the local community." />
        <meta name="keywords" content="San Luis Potosí customs, Mexican etiquette, cultural norms, social customs, expat guide" />
        <meta property="og:title" content="Customs & Etiquette in San Luis Potosí - SLP Descubre" />
        <meta property="og:description" content="Navigate local customs and cultural norms in San Luis Potosí with our comprehensive guide for newcomers and visitors." />
        <meta property="og:image" content="/images/cultural/customs-etiquette.jpeg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/customs-etiquette.jpeg"
              alt="Cultural customs in San Luis Potosí"
              fill
              className="object-cover opacity-50"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = target.src.replace('.jpeg', '.png');
              }}
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Customs & Etiquette
              </h1>
              <p className="text-white text-lg">
                Navigate local customs and cultural norms in San Luis Potosí like a local.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Understanding Local Customs
              </h2>
              <p className="text-gray-600 mb-6">
                Familiarize yourself with the cultural norms and social expectations in San Luis Potosí to build meaningful connections and avoid misunderstandings.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Social Greetings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Greetings are an important part of Mexican culture and set the tone for interactions.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Women often greet with a kiss on the cheek</li>
                    <li>Men typically shake hands or embrace with a pat on the back</li>
                    <li>Using formal titles (Señor, Señora) shows respect</li>
                    <li>Greetings are expected even in brief encounters</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Family Values
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Family is the cornerstone of Mexican society and influences many aspects of daily life.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Extended family relationships are highly valued</li>
                    <li>Family events and gatherings take priority</li>
                    <li>Respect for elders is fundamental</li>
                    <li>Children are warmly welcomed in most settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/cultural/family-gathering.jpeg"
                  alt="Family gathering in San Luis Potosí"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = target.src.replace('.jpeg', '.png');
                  }}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Etiquette Tips
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Punctuality</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Social events often start 30-60 minutes later than the stated time, while business meetings typically require punctuality.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Dining Etiquette</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Wait for the host to indicate where to sit and when to start eating. Keeping hands visible on the table (not in your lap) is customary.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Gift Giving</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Bringing a small gift when invited to someone's home is appreciated. Flowers, wine, or sweets are safe choices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Customs Sections */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Cultural Customs in San Luis Potosí
            </h2>
            
            {/* Business Etiquette */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/business-meeting.jpeg"
                    alt="Business meeting in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Etiquette</h3>
                  <p className="text-gray-600 mb-4">
                    Understanding business customs in Mexico can help you navigate professional relationships successfully. Business in San Luis Potosí, as in most of Mexico, is relationship-oriented and often proceeds at a more measured pace than in some other countries.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Introductions:</span> Use formal titles and last names until invited to use first names
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Meetings:</span> Begin with personal conversation before business matters
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Communication:</span> Direct criticism is avoided; disagreements are expressed indirectly
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Dress Code:</span> Conservative business attire is expected in formal settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Gatherings */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Gatherings</h3>
                  <p className="text-gray-600 mb-4">
                    Social events are central to life in San Luis Potosí and provide opportunities to build relationships. Understanding the expectations around these gatherings will help you feel comfortable and make a positive impression.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Home Invitations:</span> Arrive 15-30 minutes late for dinner parties
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Compliments:</span> Admiring a host's possessions is common, but be prepared if they insist you take it!
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Conversation:</span> Safe topics include Mexican culture, food, and tourist attractions; avoid politics
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Departures:</span> Leaving an event often involves extended goodbyes to everyone present
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/social-gathering.jpeg"
                    alt="Social gathering in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Religious Customs */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/religious-customs.jpeg"
                    alt="Religious customs in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Religious Customs</h3>
                  <p className="text-gray-600 mb-4">
                    Catholicism plays a significant role in the cultural fabric of San Luis Potosí. Understanding religious customs will help you appreciate many local traditions and celebrations.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Church Visits:</span> Dress modestly when visiting churches, covering shoulders and knees
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Religious Holidays:</span> Many businesses close during major religious holidays
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Processions:</span> Religious processions may cause temporary street closures
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Respect:</span> Show respect during religious ceremonies, even if you don't participate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Everyday Etiquette */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Everyday Etiquette</h3>
                  <p className="text-gray-600 mb-4">
                    Day-to-day interactions in San Luis Potosí follow certain cultural norms that may differ from what you're accustomed to. Being aware of these can help you navigate daily life more smoothly.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Personal Space:</span> People often stand closer together than in some cultures
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Public Behavior:</span> Public displays of affection are common between couples
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Queuing:</span> Lines may be less orderly than in some countries; assert your place politely
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Tipping:</span> 10-15% is standard in restaurants; small tips for service providers are appreciated
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/street-scene.jpeg"
                    alt="Street scene in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Language and Communication */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/communication.jpeg"
                    alt="Communication in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Language and Communication</h3>
                  <p className="text-gray-600 mb-4">
                    While Spanish is the primary language in San Luis Potosí, communication extends beyond words. Understanding both verbal and non-verbal communication styles will help you connect with locals.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Basic Spanish:</span> Learning a few key phrases shows respect and effort
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Gestures:</span> Hand gestures differ; be aware that some common gestures elsewhere may be offensive
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Directness:</span> Communication tends to be less direct to avoid confrontation
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Eye Contact:</span> Maintain respectful eye contact during conversations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Newcomers */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Newcomers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Be Patient</h3>
                <p className="text-gray-600">
                  Things may move at a different pace than you're used to. Embrace the rhythm of life in San Luis Potosí and avoid showing frustration.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Show Respect</h3>
                <p className="text-gray-600">
                  Demonstrating respect for local customs, even when they differ from your own, will help you build positive relationships.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Observe First</h3>
                <p className="text-gray-600">
                  When in doubt, observe how locals behave in various situations and follow their lead until you're comfortable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
}; 