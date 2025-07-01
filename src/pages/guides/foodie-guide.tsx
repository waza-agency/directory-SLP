import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

// Food destinations data
const foodExperiences = [
  {
    id: "traditional-potosino",
    name: "Traditional Potosino Cuisine",
    description: "Authentic flavors that have defined San Luis Potosí for generations, from enchiladas potosinas to asado de boda.",
    imageUrl: "/images/food/traditional-potosino-main.jpg",
    pairings: "La Legendaria Dorada or Rubia",
    bestFor: "Cultural immersion and authentic local flavors",
    locations: [
      "Restaurante La Oruga y La Cebada",
      "La Parroquia Potosina",
      "El Rincón Huasteco"
    ],
    culturalNotes: "Traditional Potosino cuisine reflects the region's rich history, blending indigenous ingredients with Spanish influences. Many recipes have been preserved across generations."
  },
  {
    id: "modern-fusion",
    name: "Modern & Fusion Gastronomy",
    description: "Innovative restaurants combining traditional ingredients with contemporary techniques and global influences.",
    imageUrl: "/images/food/modern-fusion-main.jpg",
    pairings: "La Legendaria IPA or La Noche",
    bestFor: "Adventurous foodies and special occasions",
    locations: [
      "Hidalgo 26",
      "Saffron",
      "Eureka Cocina de Autor"
    ],
    culturalNotes: "San Luis Potosí's modern dining scene has exploded in recent years, with talented chefs returning from international training to reimagine local cuisine."
  },
  {
    id: "street-food",
    name: "Street Food & Markets",
    description: "The heart of Potosino cuisine beats in its vibrant street food scene. Explore bustling markets and neighborhood corners for delicious, affordable bites from iconic tacos al pastor and gorditas to legendary tortas.",
    imageUrl: "/images/food/street-food-main.jpg",
    pairings: "La Legendaria Weiss, Clara, or Session IPA",
    bestFor: "Casual dining, authentic local experiences, and late-night cravings",
    locations: [
      "Mercado República (Variety)",
      "Callejón San Francisco (Evening tacos)",
      "Gorditas de Morales (Famous gordita street)",
      "Tortas Oscar's (Multiple locations - Lomo, Choriqueso)",
      "Tacos La Esquinita (Multiple locations - Pastor)",
      "El Chiapaneco (Cochito Horneado Tacos/Tortas)",
      "Tacos El Pata (Late night)"
    ],
    culturalNotes: "Street food in San Luis Potosí reflects the daily life and culinary traditions of the region. Many vendors, like those in the famous 'Gorditas de Morales' area, are family legacies using recipes passed down through generations, creating bustling community hubs."
  }
];

interface FoodieGuidePageProps {
  // Props can be extended if needed
}

const FoodieGuidePage: NextPage<FoodieGuidePageProps> = () => {

  return (
    <>
      <Head>
        <title>The Ultimate Foodie Guide to SLP | Sponsored by La Legendaria</title>
        <meta
          name="description"
          content="Explore San Luis Potosí's vibrant culinary scene from street tacos to fine dining, paired with local craft beers from La Legendaria Microbrewery."
        />
        <meta name="keywords" content="San Luis Potosí food, SLP cuisine, Mexican gastronomy, La Legendaria beer pairings, enchiladas potosinas, restaurants in SLP, street food, craft beer, food tourism Mexico" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-amber-50/80 to-amber-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-amber-700 text-sm font-medium uppercase tracking-wider">
              SPONSORED CONTENT
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              The Ultimate Foodie Guide to San Luis Potosí
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              As the aromas of slow-simmered moles and freshly made corn tortillas drift through the historic streets of San Luis Potosí, the city reveals itself as one of Mexico's hidden culinary treasures. Join us on a gastronomic journey curated by <Link href="https://lalegendaria.com/nuestras-cervezas/" className="text-amber-700 hover:underline font-medium" target="_blank" rel="noopener noreferrer">La Legendaria Microcervecería</Link>, where every traditional dish and innovative creation finds its perfect craft beer companion.
            </p>
            <div className="flex justify-center mt-6">
              <a
                href="https://lalegendaria.com/nuestras-cervezas/"
                className="bg-amber-700 text-white py-2 px-6 rounded-lg shadow hover:bg-amber-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discover Our Craft Beers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About the Sponsor */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 relative h-64">
              <Image
                src="/images/brands/la-legendaria-logo.png"
                alt="La Legendaria Microcervecería Logo"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About La Legendaria</h2>
              <p className="text-gray-700 mb-4">
                The story of La Legendaria begins with a passion for authentic flavors and traditional brewing methods. Nestled in the heart of San Luis Potosí, this artisanal microbrewery has become synonymous with quality and innovation in the Mexican craft beer scene. Each batch is carefully crafted using locally sourced ingredients and time-honored techniques, resulting in beers that tell the story of the region.
              </p>
              <p className="text-gray-700 mb-4">
                "We don't just make beer; we create experiences that complement the rich culinary traditions of San Luis Potosí," explains the brewery's founder. "Our craft beers are designed to enhance the flavors of local cuisine, creating perfect pairings that elevate both the food and the drink."
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                  Artisanal Process
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  Local Ingredients
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                  Award-Winning
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  Diverse Styles
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Experiences List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Culinary Journeys & Perfect Pairings</h2>

          {foodExperiences.map((experience, index) => (
            <div key={experience.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-16 pb-16 ${index < foodExperiences.length - 1 ? 'border-b border-gray-200' : ''}`}>
              {/* Images Gallery - Vertical gallery with images and video */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative h-72 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={experience.imageUrl}
                    alt={`${experience.name} - Main view`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Secondary Images & Video */}
                {experience.id === "traditional-potosino" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/enchiladas-potosinas.jpg"
                        alt="Traditional enchiladas potosinas"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/asado-de-boda.jpg"
                        alt="Asado de boda potosino"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/cyhvB9HbmKg"
                        title="Discover Traditional Potosino Cuisine"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </>
                )}

                {experience.id === "modern-fusion" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/modern-presentation.jpg"
                        alt="Artfully plated modern Potosino fusion dish"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/fusion-restaurant.jpg"
                        alt="Modern restaurant interior in San Luis Potosí"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/N3hPoQ1v_Gg"
                        title="Experience Modern Fusion Cuisine in SLP"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </>
                )}

                {experience.id === "street-food" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/tacos-street.jpg"
                        alt="Street tacos in San Luis Potosí"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/food/mercado-republica.jpg"
                        alt="Colorful market stalls at Mercado República"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/zgz5iamCjSE"
                        title="Street Food Tour of San Luis Potosí"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{experience.name}</h3>
                <p className="text-amber-700 font-semibold mb-4">Perfect with: {experience.pairings}</p>

                {experience.id === "traditional-potosino" && (
                  <p className="text-gray-700 mb-6">
                    The first bite of a properly made enchilada potosina is a revelation. As the fragrant corn masa, tinged red with chile ancho and filled with queso fresco, meets your palate, you understand why these iconic creations have become the culinary ambassadors of San Luis Potosí. In the kitchens of traditional restaurants like La Oruga y La Cebada, these recipes aren't just food—they're cultural heritage preserved through generations, each dish carrying stories of family gatherings and ancient techniques passed from mother to daughter.
                  </p>
                )}

                {experience.id === "modern-fusion" && (
                  <p className="text-gray-700 mb-6">
                    Within the elegant interior of Hidalgo 26, where contemporary design meets colonial architecture, a culinary revolution quietly unfolds. Here, chefs trained in international kitchens return to their Potosino roots, reimagining traditional ingredients through modern techniques. Watch as a humble nopal cactus becomes a sophisticated carpaccio, or as the smoky essence of mezcal elevates a sauce to sublime heights. These dining experiences represent San Luis Potosí's evolving identity—respectful of tradition yet boldly innovative, just like the craft beers of La Legendaria that accompany them.
                  </p>
                )}

                {experience.id === "street-food" && (
                  <p className="text-gray-700 mb-6">
                    The true soul of Potosino cuisine isn't confined to white-tablecloth establishments but thrives in the bustling corridors of Mercado República, the famous street dedicated to Gorditas de Morales, and the steam rising from street carts as the sun sets. Here, gorditas stuffed with diverse guisados simmer on ancient comals, tacos al pastor are expertly carved from the trompo at spots like Tacos La Esquinita, and legendary tortas like those from Tortas Oscar's are assembled with generations of expertise. Each vendor specializes in their signature creation, often using recipes unchanged for decades. The flavors are bold and honest, the portions generous, and the experience immersive—a symphony of aromas, calls from vendors, and the satisfying crunch of freshly made tortillas or the warm embrace of a perfect torta, best enjoyed with a refreshing La Legendaria Weiss or Clara.
                  </p>
                )}

                <h4 className="font-bold text-gray-800 mb-2">Your Culinary Adventure:</h4>
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">What to Expect</h5>

                  {experience.id === "traditional-potosino" && (
                    <p className="text-gray-700 mb-2">
                      Traditional Potosino restaurants embrace you with warm hospitality and family-style service. Many establishments have been operated by the same families for generations, with recipes closely guarded and passed down through time. The atmosphere is often relaxed and conversational, with meals meant to be enjoyed slowly and savored.
                    </p>
                  )}

                  {experience.id === "modern-fusion" && (
                    <p className="text-gray-700 mb-2">
                      San Luis Potosí's modern dining establishments offer sophisticated atmospheres where culinary artistry takes center stage. Expect thoughtful presentations, innovative flavor combinations, and menus that change with the seasons. Chefs often emerge from the kitchen to explain their creations, sharing the inspiration and techniques behind each dish.
                    </p>
                  )}

                  {experience.id === "street-food" && (
                    <p className="text-gray-700 mb-2">
                      Street food vendors and small eateries are essential cultural ambassadors in San Luis Potosí. Many stalls, especially in areas like the renowned 'Gorditas de Morales', represent family legacies spanning decades, with specialties that draw regulars from across the city. The vendor-customer relationship is often personal—regulars are greeted by name, and their usual orders remembered. Joining this vibrant community, even temporarily as a visitor, offers insight into everyday Potosino life that few tourist experiences can match.
                    </p>
                  )}

                  <ul className="list-disc list-inside text-gray-700 ml-2 mb-2">
                    <li>Best time to visit: {experience.id === "street-food" ? "Lunchtime (Gorditas), Early evening & late night (Tacos, Tortas)" : "Lunch (1-3pm) or Dinner (7-9pm)"}</li>
                    <li>Average cost: {experience.id === "modern-fusion" ? "$$$" : experience.id === "traditional-potosino" ? "$$" : "$"}</li>
                    <li>Reservation needed: {experience.id === "modern-fusion" ? "Yes, 1-2 weeks in advance" : experience.id === "traditional-potosino" ? "Recommended on weekends" : "No"}</li>
                    <li>Best for: {experience.bestFor}</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">Must-Try Dishes & Pairings</h5>

                  {experience.id === "traditional-potosino" && (
                    <p className="text-gray-700 mb-2">
                      The enchiladas potosinas, with their distinctive red-tinged masa and queso fresco filling, are a must—especially when paired with La Legendaria's crisp Dorada, whose subtle malt sweetness balances the chile heat. For heartier appetites, the asado de boda potosino (wedding stew) offers rich, complex flavors from dried chiles and pork that find their perfect companion in the caramel notes of La Legendaria's amber Rubia.
                    </p>
                  )}

                  {experience.id === "modern-fusion" && (
                    <p className="text-gray-700 mb-2">
                      Look for dishes that showcase local ingredients in surprising ways, like cactus gazpacho or guajillo-glazed duck breast. These bold flavors stand up beautifully to La Legendaria's hop-forward IPA, creating a dancing interplay between bitterness and spice. For dessert courses featuring chocolate (often sourced from southern Mexico), La Legendaria's dark and roasty La Noche creates an indulgent experience.
                    </p>
                  )}

                  {experience.id === "street-food" && (
                    <p className="text-gray-700 mb-2">
                      Seek out the legendary Gorditas de Morales – try fillings like chicharrón prensado (pressed pork rinds in chile sauce) or rajas con queso (poblano strips with cheese); their richness is perfectly cut by the light, citrusy notes of La Legendaria's Weiss beer. Don't miss the Tacos al Pastor from Tacos La Esquinita, paired with a crisp La Legendaria Clara. For a substantial meal, grab a Torta de Lomo or Choriqueso from Tortas Oscar's, complemented by the balanced hops of a La Legendaria Session IPA. Explore unique regional flavors with a Torta de Cochito Horneado (Chiapanecan baked pork) from El Chiapaneco.
                    </p>
                  )}

                  <ul className="list-disc list-inside text-gray-700 ml-2 mb-2">
                    <li>{experience.id === "traditional-potosino" ? "Enchiladas potosinas + La Legendaria Dorada" : experience.id === "modern-fusion" ? "Duck with guajillo glaze + La Legendaria IPA" : "Gorditas de Morales (Chicharrón/Rajas) + La Legendaria Weiss"}</li>
                    <li>{experience.id === "traditional-potosino" ? "Asado de boda + La Legendaria Rubia" : experience.id === "modern-fusion" ? "Chocolate desserts + La Legendaria La Noche" : "Tacos al Pastor (La Esquinita) + La Legendaria Clara"}</li>
                    <li>{experience.id === "traditional-potosino" ? "Caldo de rata (pork soup) + La Legendaria Amber" : experience.id === "modern-fusion" ? "Cactus carpaccio + La Legendaria Pilsner" : "Tortas Oscar's (Lomo/Choriqueso) + La Legendaria Session IPA"}</li>
                    <li>{experience.id === "street-food" ? "Torta de Cochito Horneado (El Chiapaneco) + La Legendaria Amber" : ""}</li>
                  </ul>
                </div>

                <h4 className="font-bold text-gray-800 mb-2">Where to Go:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-2 mb-4">
                  {experience.locations.map((location, i) => (
                    <li key={i}>{location}</li>
                  ))}
                </ul>

                <div className="p-4 bg-amber-50 rounded-lg mb-6">
                  <h4 className="font-bold text-gray-800 mb-2">Cultural Insight:</h4>
                  <p className="text-gray-700">{experience.culturalNotes}</p>

                  {experience.id === "traditional-potosino" && (
                    <p className="text-gray-700 mt-2">
                      Many traditional restaurants in San Luis Potosí are located in historic buildings that tell their own stories. As you dine, take note of the architecture—from colonial-era courtyards to hacienda-style kitchens where you can sometimes peek at the comal (griddle) where tortillas are made by hand, just as they have been for centuries. These dining experiences offer not just a meal, but a connection to Potosino history.
                    </p>
                  )}

                  {experience.id === "modern-fusion" && (
                    <p className="text-gray-700 mt-2">
                      The modern culinary movement in San Luis Potosí parallels the craft beer revolution championed by breweries like La Legendaria. Both represent a new generation of Potosinos who have traveled the world, bringing back techniques and ideas while maintaining deep respect for local ingredients and traditions. This balance between innovation and heritage defines the city's emerging identity as a gastronomic destination.
                    </p>
                  )}

                  {experience.id === "street-food" && (
                    <p className="text-gray-700 mt-2">
                      Street food vendors and small eateries are essential cultural ambassadors in San Luis Potosí. Many stalls, especially in areas like the renowned 'Gorditas de Morales', represent family legacies spanning decades, with specialties that draw regulars from across the city. The vendor-customer relationship is often personal—regulars are greeted by name, and their usual orders remembered. Joining this vibrant community, even temporarily as a visitor, offers insight into everyday Potosino life that few tourist experiences can match. Asking locals for their favorite 'puesto' (stall) often leads to the best hidden gems.
                    </p>
                  )}
                </div>

                <div>
                  <a
                    href="https://lalegendaria.com/brewpub/"
                    className="inline-flex items-center bg-amber-700 text-white py-2 px-6 rounded-lg shadow hover:bg-amber-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Our BrewPub
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why San Luis Potosí is a Foodie Destination */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why San Luis Potosí is Mexico's Hidden Culinary Gem</h2>

            <p className="text-gray-700 mb-8 text-center italic">
              "To understand San Luis Potosí is to taste it—each dish tells a story of history, geography, and the blending of cultures that makes this region unique."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Geographical Diversity</h3>
                <p className="text-gray-700">
                  The state's remarkable geography—from the highlands of the Altiplano to the lush Huasteca region—has created distinct culinary microclimates. This diversity brings together desert ingredients like cactus and chilies with tropical fruits and herbs from the eastern slopes, creating a unique pantry unlike any other in Mexico. The result is a cuisine of striking contrasts and harmonious combinations that surprises even the most experienced food travelers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Historical Influences</h3>
                <p className="text-gray-700">
                  As a crossroads of pre-Hispanic trade routes and later as a colonial mining center, San Luis Potosí absorbed culinary influences from across Mexico and Spain. The wealthy silver barons imported ingredients and techniques from Europe, while indigenous traditions remained strong in local communities. This culinary conversation across centuries has created dishes that reflect both sophisticated colonial tastes and the profound wisdom of native cooking methods.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Culinary Conservation</h3>
                <p className="text-gray-700">
                  Unlike some regions where traditional recipes are fading, San Luis Potosí has maintained its culinary heritage with remarkable fidelity. Family recipes are treated as treasured heirlooms, passed down with precise instructions and cultural context. Local institutions regularly document these traditions, while cooking schools ensure that young chefs master traditional techniques before exploring innovation. This dedication to preservation means you can taste dishes today that would be recognized by Potosinos from centuries past.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">The Perfect Pairing Culture</h3>
                <p className="text-gray-700">
                  In San Luis Potosí, food is rarely experienced in isolation. The culture of pairing—whether with traditional beverages like colonial-era liqueurs or modern craft beers from <Link href="https://lalegendaria.com/nuestras-cervezas/" className="text-amber-700 hover:underline" target="_blank" rel="noopener noreferrer">La Legendaria</Link>—enhances the dining experience. This attention to how flavors complement each other extends beyond beverages to the careful composition of salsas, sides, and accompanying dishes that create a complete sensory experience greater than the sum of its parts.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">The La Legendaria Connection</h3>
              <p className="text-gray-700 mb-4">
                When Juan Carlos founded La Legendaria Microcervecería after years of experimenting with home brewing, his vision extended beyond simply making good beer. "I wanted to create something that would complement and celebrate our incredible local cuisine," he explains. This philosophy guided the development of each beer style, with the brewing team regularly collaborating with local chefs to understand the nuances of traditional dishes and create beers that would enhance their flavors.
              </p>
              <p className="text-gray-700 mb-4">
                The brewery's signature Dorada was specifically crafted to complement the complex spice profiles of Potosino cuisine, with subtle malt sweetness and balanced hop character that neither overwhelms nor disappears against bold flavors. The deeper amber Rubia, with its caramel notes, was designed with the region's rich stews in mind, while the refreshing Weiss beer offers the perfect counterpoint to street food's satisfying richness.
              </p>
              <p className="text-gray-700">
                Today, La Legendaria's BrewPub has become a culinary destination in its own right, where the food menu is designed with the same care as the beer list, creating harmonious pairings that showcase the best of both. "We're not just serving beer with food," notes the BrewPub's chef, "we're creating conversations between flavors that tell the story of San Luis Potosí."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore More San Luis Potosí</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/cultural/museum.jpg"
                  alt="Cultural Experiences"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Cultural Experiences</h3>
                <p className="text-gray-600 mb-4">Discover museums, galleries, and historic sites that showcase the rich cultural heritage of San Luis Potosí.</p>
                <Link href="/cultural-experiences" className="text-amber-700 hover:underline font-medium inline-flex items-center">
                  Explore Culture
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/outdoors/hiking.jpg"
                  alt="Weekend Getaways"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Weekend Getaways</h3>
                <p className="text-gray-600 mb-4">Find perfect weekend escapes to destinations like Real de Catorce, Huasteca Potosina, and Media Luna.</p>
                <Link href="/weekend-getaways" className="text-amber-700 hover:underline font-medium inline-flex items-center">
                  Plan Your Escape
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/events/festival.jpg"
                  alt="Upcoming Events"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Local Events</h3>
                <p className="text-gray-600 mb-4">Stay updated on festivals, cultural celebrations, and events happening across San Luis Potosí.</p>
                <Link href="/events" className="text-amber-700 hover:underline font-medium inline-flex items-center">
                  View Events Calendar
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Taste the Perfect Pairing</h2>
            <p className="text-lg text-gray-700 mb-6">
              In a world of mass-produced flavors and hurried meals, San Luis Potosí invites you to slow down, savor each bite, and appreciate the stories behind your food. Whether you're enjoying a traditional meal in a colonial courtyard or sampling street food from a generations-old family stall, pairing your experience with the right craft beer elevates the moment from a meal to a memory.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              La Legendaria's BrewPub in the heart of the city offers the perfect introduction to these pairings—a place where culinary tradition meets brewing innovation, and where every sip and bite reveals another facet of Potosino culture. Come taste the legend for yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://lalegendaria.com/brewpub/"
                className="bg-amber-700 text-white py-3 px-8 rounded-lg shadow hover:bg-amber-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Our BrewPub
              </a>
              <a
                href="https://lalegendaria.com/nuestras-cervezas/"
                className="bg-white text-amber-700 border border-amber-700 py-3 px-8 rounded-lg shadow hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Our Beers
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default FoodieGuidePage;