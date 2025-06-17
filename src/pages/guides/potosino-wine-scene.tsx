import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

// Wine regions data
const wineRegions = [
  {
    id: "san-miguelito",
    name: "San Miguelito Valley",
    description: "A hidden gem for wine production with unique microclimate and terroir, producing exceptional red varietals and innovative blends.",
    imageUrl: "/images/sponsored/potosino-wine.jpg",
    bestVarietals: "Cabernet Sauvignon, Merlot, Syrah",
    bestFor: "Boutique wineries and stunning landscapes",
    wineries: [
      "Viñedos San Miguelito",
      "Cava Quintanilla",
      "Tierra Adentro"
    ],
    culturalNotes: "This emerging wine region has rapidly gained recognition for its quality wines, with some vineyards dating back several decades but only recently gaining commercial prominence."
  },
  {
    id: "catorce-highlands",
    name: "Catorce Highlands",
    description: "High-altitude vineyards producing distinctive wines with intense minerality and complex flavor profiles due to significant day-night temperature variations.",
    imageUrl: "/images/sponsored/wine-highlands.jpg",
    bestVarietals: "Tempranillo, Grenache, Chardonnay",
    bestFor: "High-altitude wines with mineral character",
    wineries: [
      "Bodegas del Altiplano",
      "Real de Catorce Vinícola",
      "Viñas de la Sierra"
    ],
    culturalNotes: "The arid conditions and mineral-rich soil of this high desert region create challenging growing conditions that result in low yields but exceptionally concentrated flavors."
  },
  {
    id: "rio-verde",
    name: "Río Verde Valley",
    description: "Fertile valleys with a more moderate climate ideal for producing elegant white wines and sparkling varieties with vibrant acidity and fruit forward profiles.",
    imageUrl: "/images/sponsored/wine-valley.jpg",
    bestVarietals: "Sauvignon Blanc, Chenin Blanc, Sparkling varieties",
    bestFor: "Refreshing white wines and vineyard tours",
    wineries: [
      "Viñedos del Río",
      "Espumosos Potosinos",
      "Bodegas La Huasteca"
    ],
    culturalNotes: "This region benefits from the influence of the Río Verde, creating a more temperate microclimate within San Luis Potosí's generally arid environment, perfect for white wine production."
  }
];

interface WineScenePageProps {
  // Props can be extended if needed
}

const WineScenePage: NextPage<WineScenePageProps> = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Discover the Potosino Wine Scene | Sponsored by La Gran Vía</title>
        <meta
          name="description"
          content="Explore the emerging wine regions of San Luis Potosí, from boutique vineyards to stunning wineries, and discover the unique terroir that's putting Potosino wines on the map."
        />
        <meta name="keywords" content="San Luis Potosí wine, Potosino vineyards, Mexican wine regions, wine tourism Mexico, San Miguelito wines, Catorce wine region, wine tasting in SLP, La Gran Vía restaurant" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-50 to-red-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-red-700 text-sm font-medium uppercase tracking-wider">
              SPONSORED CONTENT
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Discover the Potosino Wine Scene
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              The sun dips below the horizon as you raise your glass, capturing the last golden rays through the ruby-red Tempranillo in your hand. Here, in the emerging vineyards of San Luis Potosí, you're witnessing the birth of Mexico's newest wine story—one that local winemakers have been quietly crafting for decades, now finally ready to be savored and shared.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Beyond its rich cultural heritage and stunning landscapes, San Luis Potosí harbors a blossoming wine scene that's capturing the attention of enthusiasts and connoisseurs. Join us on a journey through the region's emerging vineyards, curated by <Link href="https://lagranviaslp.com/" className="text-red-700 hover:underline font-medium" target="_blank" rel="noopener noreferrer">La Gran Vía</Link>, where ancient lands and modern techniques are producing uniquely Potosino expressions of the vine.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              The region is home to a variety of wineries, each offering a distinct taste of the land. From the high-altitude vineyards of the Catorce Highlands, known for their intense minerality and complex flavor profiles, to the fertile Río Verde Valley, where elegant white wines and sparkling varieties flourish, San Luis Potosí is a haven for wine enthusiasts.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              San Luis Potosí hosts various wine events throughout the year, showcasing the diversity and quality of regional wines. These events are a testament to the region's growing reputation in the world of viticulture, drawing wine lovers from near and far to experience the vibrant flavors and rich cultural heritage of San Luis Potosí.
            </p>
            <div className="flex justify-center mt-6">
              <a
                href="https://lagranviaslp.com/"
                className="bg-red-800 text-white py-2 px-6 rounded-lg shadow hover:bg-red-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit La Gran Vía
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About La Gran Vía & Wine Pairings */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 relative h-64">
              <Image
                src="/images/brands/la-gran-via-logo.jpg"
                alt="La Gran Vía Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About La Gran Vía & Wine Pairings</h2>
              <p className="text-gray-700 mb-4">
                You push open the heavy wooden door of La Gran Vía and are immediately enveloped in the warm aromas of saffron, garlic, and the unmistakable scent of Spanish tradition that has filled this space since 1979. The restaurant has been a cornerstone of San Luis Potosí's culinary scene, specializing in Spanish and international cuisine, and recognized as one of Mexico's "100 Imperdibles" (100 Must-Visit Places) in 2017.
              </p>
              <p className="text-gray-700 mb-4">
                As you settle into your chair, the sommelier approaches with a knowing smile and a bottle of local Tempranillo from the Catorce Highlands. "This one," they say, "was made for our paella." And they're right—the wine's bold flavors and mineral notes perfectly balance the rich, savory taste of La Gran Vía's signature dish, creating a harmony that could only exist here, where the terroir of San Luis Potosí meets generations of Spanish culinary expertise.
              </p>
              <p className="text-gray-700 mb-4">
                Later, as you move to a crisp Sauvignon Blanc from the Río Verde Valley, you notice how its vibrant acidity cuts through the creamy texture of the traditional Spanish tortilla on your plate. Each sip and bite reveals new dimensions of flavor, telling the story of this unique culinary landscape.
              </p>
              <p className="text-gray-700 mb-4">
                For those seeking a truly immersive experience, La Gran Vía offers curated wine pairings, allowing diners to explore the symbiotic relationship between Potosino wines and the restaurant's carefully crafted dishes. As you sip and savor, you'll find that each pairing tells a story, weaving together the flavors of the land with the artistry of the kitchen—a journey of taste that stays with you long after the last glass is empty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wine Regions List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">A Journey Through Potosino Wine Regions</h2>

          {wineRegions.map((region, index) => (
            <div key={region.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-16 pb-16 ${index < wineRegions.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="relative h-72 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={region.imageUrl}
                    alt={`${region.name} - Vineyard view`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{region.name}</h3>
                <p className="text-gray-700 mb-6">{region.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">A Taste of the Region</h4>
                  <p className="text-gray-600">As you wander through the {region.name}, the air carries hints of {region.id === "san-miguelito" ? "wild herbs and sun-warmed earth" : region.id === "catorce-highlands" ? "mountain minerals and alpine flowers" : "riverside vegetation and orchard fruits"}. The wines here reflect their surroundings, with {region.bestVarietals} expressing the soul of this unique landscape.</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Best Varietals</h4>
                  <p className="text-gray-600">{region.bestVarietals}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Known For</h4>
                  <p className="text-gray-600">{region.bestFor}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Wineries to Visit</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {region.id === "san-miguelito" ? (
                      <>
                        <li key="Viñedos San Miguelito">
                          <span className="font-medium">Viñedos San Miguelito</span> - A pioneering estate where you might find the winemaker eager to share stories of their family's connection to this land, offering intimate tastings of their exceptional red varietals.
                        </li>
                        <li key="Cava Quintanilla">
                          <span className="font-medium">Cava Quintanilla</span> - Known for its elegant cellar and meticulous aging process, this boutique winery focuses on small-batch production with remarkable attention to detail.
                        </li>
                        <li key="Tierra Adentro">
                          <span className="font-medium">Tierra Adentro</span> - A newer arrival to the scene but already making waves with innovative blending techniques that showcase the unique microclimate of the valley.
                        </li>
                      </>
                    ) : region.id === "catorce-highlands" ? (
                      <>
                        <li key="Bodegas del Altiplano">
                          <span className="font-medium">Bodegas del Altiplano</span> - Perched at one of the highest elevations in the region, tastings here take place with breathtaking panoramic views of the surrounding mountains.
                        </li>
                        <li key="Real de Catorce Vinícola">
                          <span className="font-medium">Real de Catorce Vinícola</span> - Housed in a restored hacienda, this winery combines historical charm with modern winemaking, specializing in robust Tempranillos that express the mineral-rich soil.
                        </li>
                        <li key="Viñas de la Sierra">
                          <span className="font-medium">Viñas de la Sierra</span> - A family-run operation that embraces the extreme growing conditions to produce limited quantities of intensely flavored wines with remarkable complexity.
                        </li>
                      </>
                    ) : (
                      <>
                        <li key="Viñedos del Río">
                          <span className="font-medium">Viñedos del Río</span> - Set alongside the flowing waters that give this valley its name, this winery specializes in crisp white wines that capture the freshness of the region.
                        </li>
                        <li key="Espumosos Potosinos">
                          <span className="font-medium">Espumosos Potosinos</span> - Pioneering sparkling wine production in the region, using traditional methods combined with local grape varieties to create unique bubblies.
                        </li>
                        <li key="Bodegas La Huasteca">
                          <span className="font-medium">Bodegas La Huasteca</span> - Where traditional methods meet innovative approaches, this winery embraces sustainable practices to create wines that truly express the terroir of Río Verde.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Cultural Notes</h4>
                  <p className="text-gray-700">{region.culturalNotes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wine Tourism Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Wine Journey Awaits</h2>
            <p className="text-gray-700 mb-8 text-center">
              The sun is setting as you stand among the vines, glass in hand, listening to the passionate winemaker describe how this very slope catches the morning light just right. This is wine tourism in San Luis Potosí—intimate, authentic, and far from the crowds of more established regions. Here's how to craft your own viticultural adventure:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Guided Wine Tours</h3>
                <p className="text-gray-700 mb-4">
                  Several operators now offer specialized wine tours that take you through the vineyards of San Luis Potosí, with expert guides explaining the unique characteristics of the region.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Ruta del Vino Potosino</li>
                  <li>SLP Wine Adventures</li>
                  <li>Enoturismo Central</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Wine Festivals</h3>
                <p className="text-gray-700 mb-4">
                  Throughout the year, San Luis Potosí hosts several wine festivals where you can sample local vintages and meet the winemakers.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Vendimia San Miguelito (August)</li>
                  <li>Expo Vino Potosino (November)</li>
                  <li>Various seasonal wine tastings throughout the year</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Planning Your Visit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Best Time to Visit</h4>
                  <p className="text-gray-600 mb-4">
                    October to May offers the most pleasant weather. August-September is harvest season - exciting but busy.
                  </p>

                  <h4 className="font-medium text-gray-900 mb-2">Getting Around</h4>
                  <p className="text-gray-600">
                    Most wineries are located 30-90 minutes from San Luis Potosí city. Consider hiring a driver or joining an organized tour.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Reservations</h4>
                  <p className="text-gray-600 mb-4">
                    Most wineries require advance reservations for tastings and tours. Book at least one week ahead.
                  </p>

                  <h4 className="font-medium text-gray-900 mb-2">What to Bring</h4>
                  <p className="text-gray-600">
                    Sun protection, comfortable shoes, and a designated driver or tour reservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-800 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Wines of San Luis Potosí</h2>
          <p className="max-w-2xl mx-auto mb-8">
            From boutique vineyards to innovative winemaking techniques, the Potosino wine scene offers a fresh perspective on Mexican viticulture. Sample a selection at La Gran Vía restaurant or plan your own wine tour to discover why enthusiasts are taking notice of this emerging region.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://lagranviaslp.com/"
              className="inline-block bg-white text-red-800 font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve at La Gran Vía
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent border border-white text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-white/10 transition-colors"
            >
              Plan Your Wine Tour
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default WineScenePage;