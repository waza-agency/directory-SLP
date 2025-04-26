import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

// Weekend destinations data
const weekendGetaways = [
  {
    id: "real-de-catorce",
    name: "Real de Catorce",
    description: "Magic town nestled in the Sierra del Altiplano Potosino with cobblestone streets and rich mining history.",
    imageUrl: "/images/outdoors/real-de-catorce-main.jpg",
    price: "From $2,850 MXN",
    days: 2,
    activities: [
      "Willy 4x4 Desert Tour",
      "Historic Center Walking Tour",
      "Visit to Tunnel of Ogarrio",
      "Cerro del Quemado Hike"
    ],
    accommodations: [
      "Hotel Real de Catorce",
      "El Mesón de la Abundancia",
      "Local homestays"
    ],
    culturalNotes: "Sacred Wixárika (Huichol) pilgrimage site known as Wirikuta. Famous for its ghost town atmosphere and stunning desert landscapes."
  },
  {
    id: "huasteca-potosina",
    name: "Huasteca Potosina",
    description: "Paradise of turquoise waterfalls, lush jungles, and incredible natural landscapes perfect for adventure seekers.",
    imageUrl: "/images/outdoors/tamul-waterfall.jpg",
    price: "From $2,850 MXN",
    days: 2,
    activities: [
      "Tamul Waterfall Boat Tour",
      "Puente de Dios Waterfall Visit",
      "Swimming in Tamasopo Cascades",
      "Sótano de las Golondrinas (optional)"
    ],
    accommodations: [
      "Huasteca Secreta Ecolodge",
      "Hotel Taninul",
      "Camping options (guided)"
    ],
    culturalNotes: "Region rich in Teenek indigenous culture. During Xantolo (Day of the Dead) celebrations, the area comes alive with unique traditional customs."
  },
  {
    id: "media-luna",
    name: "Media Luna",
    description: "Crystal-clear thermal spring forming a half-moon lagoon perfect for swimming, diving, and underwater exploration.",
    imageUrl: "/images/outdoors/media-luna.jpg",
    price: "From $2,500 MXN",
    days: 2,
    activities: [
      "Snorkeling in thermal waters",
      "Scuba diving (certification required)",
      "Swimming in spring-fed pools",
      "Hiking around the reserve"
    ],
    accommodations: [
      "Cabañas Media Luna",
      "Hotel Quinta Mar",
      "Camping in designated areas"
    ],
    culturalNotes: "Important archaeological site where ancient artifacts have been discovered underwater. The crystal-clear blue waters remain at 27°C year-round."
  }
];

interface WeekendGetawaysPageProps {
  // Props can be extended if needed
}

const WeekendGetawaysPage: NextPage<WeekendGetawaysPageProps> = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Weekend Getaways in San Luis Potosí | Sponsored by Corazón de Xoconostle</title>
        <meta 
          name="description" 
          content="Discover the perfect weekend escapes in San Luis Potosí with expert-crafted itineraries by Corazón de Xoconostle. Explore majestic waterfalls, magical towns, and natural wonders." 
        />
        <meta name="keywords" content="weekend getaways, San Luis Potosí, Corazón de Xoconostle, Huasteca Potosina, Real de Catorce, Media Luna, travel, adventure, tourism, Mexico" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              SPONSORED CONTENT
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Weekend Getaways in San Luis Potosí
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              As the week comes to an end, there's a whisper among the cobblestone streets of San Luis Potosí—a call to adventure just a short drive away. Escape the routine with these carefully curated weekend adventures by <Link href="https://www.corazondexoconostle.com/index.php/en/" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">Corazón de Xoconostle</Link>, the premier adventure guides who have spent over a decade discovering the hidden gems and secret paths of this magnificent region.
            </p>
            <div className="flex justify-center mt-6">
              <a 
                href="https://www.corazondexoconostle.com/index.php/en/" 
                className="bg-primary text-white py-2 px-6 rounded-lg shadow hover:bg-primary-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Adventure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About the Sponsor */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 relative h-64">
              <Image 
                src="/images/brands/corazon-de-xoconostle-logo.png" 
                alt="Corazón de Xoconostle Logo" 
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About Corazón de Xoconostle</h2>
              <p className="text-gray-700 mb-4">
                The story begins in 2014, when a group of dreamers with a profound love for their homeland came together in the heart of San Luis Potosí. Like the xoconostle—a resilient native fruit that thrives in the challenging terrain of central Mexico—they grew from a small hospitality project into something extraordinary. Today, Corazón de Xoconostle's certified professional guides (NOM-09-TUR-2002 and NOM-011-TUR-2017) have become the heartbeat of authentic travel experiences in the region.
              </p>
              <p className="text-gray-700 mb-4">
                "We don't just show you places; we help you feel their soul," explains one of their founders. Their journeys were born from countless personal expeditions—scaling the rugged mountains, swimming in hidden cenotes, and sharing meals with local artisans. Each route they've crafted contains pieces of their own stories, passed on to travelers seeking to connect with the authentic spirit of San Luis Potosí in a way no guidebook could capture.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certified Guides
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                    <path d="M10 4a1 1 0 00-1 1v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 8.586V5a1 1 0 00-1-1z" />
                  </svg>
                  10+ Years Experience
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
                  </svg>
                  Travel Insurance
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-auto inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V8a1 1 0 00-.293-.707l-2-2A1 1 0 0017 5h-5a1 1 0 00-1-1H3z" />
                  </svg>
                  Transportation Included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekend Getaways List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perfect Weekend Escapes</h2>

          {weekendGetaways.map((getaway, index) => (
            <div key={getaway.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-16 pb-16 ${index < weekendGetaways.length - 1 ? 'border-b border-gray-200' : ''}`}>
              {/* Images Gallery - Replace single image with vertical gallery */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative h-72 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={getaway.imageUrl}
                    alt={`${getaway.name} - Main view`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Secondary Images */}
                {getaway.id === "real-de-catorce" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/real-de-catorce-street.jpg"
                        alt="Cobblestone streets of Real de Catorce"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/real-de-catorce-church.jpg"
                        alt="Historic church in Real de Catorce"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe 
                        src="https://www.youtube-nocookie.com/embed/8upHqJYzTko" 
                        title="Discover Real de Catorce" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </>
                )}
                
                {getaway.id === "huasteca-potosina" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/huasteca-waterfall.jpg"
                        alt="Cascading waterfall in Huasteca Potosina"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/huasteca-jungle.jpg"
                        alt="Lush jungle trails in Huasteca Potosina"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe 
                        src="https://www.youtube-nocookie.com/embed/B0W00hc_G1s" 
                        title="Explore Huasteca Potosina" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </>
                )}
                
                {getaway.id === "media-luna" && (
                  <>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/media-luna-underwater.jpg"
                        alt="Underwater view of Media Luna springs"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/outdoors/media-luna-pool.jpg"
                        alt="Crystal clear pools at Media Luna"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md h-96">
                      <iframe 
                        src="https://www.youtube-nocookie.com/embed/-Nf7OZlIsAA" 
                        title="Discover Media Luna" 
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{getaway.name}</h3>
                <p className="text-primary font-semibold mb-4">{getaway.price} | {getaway.days}-day adventure</p>
                
                {getaway.id === "real-de-catorce" && (
                  <p className="text-gray-700 mb-6">
                    The moment you emerge from the Ogarrio Tunnel, it feels like stepping through a portal in time. Real de Catorce greets you with whispers of its silver mining past, where fortunes were made and lost. The ghosts of Spanish colonials, revolutionary soldiers, and silver barons seem to linger in the mist that often envelops this magical town perched at 9,000 feet above sea level. As you walk the uneven cobblestone streets worn smooth by centuries of footsteps, you'll discover a place where time moves differently—a town that died when the silver ran out and was mysteriously reborn as a spiritual haven and artistic refuge.
                  </p>
                )}
                
                {getaway.id === "huasteca-potosina" && (
                  <p className="text-gray-700 mb-6">
                    The first time you glimpse the otherworldly turquoise waters of the Huasteca Potosina, you might wonder if you're still in Mexico or have somehow been transported to a secret corner of paradise. This lush region feels like nature's finest watercolor painting brought to life—cascades of crystal-clear water plunge from limestone cliffs into pools so perfectly blue they seem illuminated from within. Here, the ancient Teenek people have lived in harmony with these sacred waters for centuries, and their traditions continue to infuse the region with mystical energy. The rhythmic sounds of the jungle and the cooling mist from the waterfalls create a symphony for the senses that stays with you long after you've returned to city life.
                  </p>
                )}
                
                {getaway.id === "media-luna" && (
                  <p className="text-gray-700 mb-6">
                    Beneath the surface of Media Luna's crystalline waters lies a mysterious underwater world that has captivated divers and scientists alike for generations. This half-moon shaped lagoon, formed by thermal springs that maintain a perfect 27°C year-round, reveals its secrets slowly. As you float in its transparent blue waters, you're suspended above an archaeological treasure trove where pre-Hispanic offerings rest alongside modern legends. Local stories tell of underwater passageways leading to distant lagoons and caves—some explored, others still waiting for brave souls to discover their wonders. The surrounding landscape, with its desert vegetation contrasting dramatically with the oasis-like water, creates a surreal setting that feels both ancient and timeless.
                  </p>
                )}

                <h4 className="font-bold text-gray-800 mb-2">Perfect Weekend Itinerary:</h4>
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">Day 1</h5>
                  
                  {getaway.id === "real-de-catorce" && (
                    <p className="text-gray-700 mb-2">
                      Your journey begins as morning light bathes the desert in gold. After an early departure from San Luis Potosí, you'll travel through the changing landscapes of the altiplano until reaching the famous Ogarrio Tunnel—the only entrance to this mystical town. As you check into your historic accommodation, you can already feel the unique energy that has drawn seekers and adventurers here for generations.
                    </p>
                  )}
                  
                  {getaway.id === "huasteca-potosina" && (
                    <p className="text-gray-700 mb-2">
                      Dawn breaks with the chorus of tropical birds as you begin your journey into the emerald heart of San Luis Potosí. Leaving the city behind, the landscape transforms dramatically from semi-desert to lush jungle as you descend into the Huasteca region. By mid-morning, you'll be settling into your eco-friendly accommodation nestled among the verdant hills, where the air is perfumed with tropical flowers and the distant sound of rushing water hints at adventures to come.
                    </p>
                  )}
                  
                  {getaway.id === "media-luna" && (
                    <p className="text-gray-700 mb-2">
                      The journey to Media Luna takes you through the changing landscapes of central San Luis Potosí, where cacti and desert scrub gradually give way to the surprising oasis that contains one of Mexico's most extraordinary natural springs. As you arrive and catch your first glimpse of the luminous blue waters forming their perfect half-moon shape, you'll understand why this place has drawn visitors for thousands of years—from ancient indigenous peoples to modern-day underwater explorers.
                    </p>
                  )}
                  
                  <ul className="list-disc list-inside text-gray-700 ml-2 mb-2">
                    <li>Early departure from San Luis Potosí city</li>
                    <li>Arrival and check-in at accommodation</li>
                    <li>Guided tour of main attractions</li>
                    <li>Traditional local lunch</li>
                    <li>Afternoon exploration of {getaway.activities[0]}</li>
                    <li>Dinner and cultural experience</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">Day 2</h5>
                  
                  {getaway.id === "real-de-catorce" && (
                    <p className="text-gray-700 mb-2">
                      Wake to the sound of distant church bells in a town where centuries overlap. After breakfast at a local café where the aroma of fresh pan dulce fills the air, you'll set out to experience Real de Catorce's dual nature—both historical treasure and spiritual sanctuary. Your Corazón de Xoconostle guide will reveal stories behind the weathered facades and introduce you to local artisans whose crafts continue traditions that have survived the town's many transformations.
                    </p>
                  )}
                  
                  {getaway.id === "huasteca-potosina" && (
                    <p className="text-gray-700 mb-2">
                      Your second day in paradise begins with the soft morning light filtering through the jungle canopy. After a breakfast featuring tropical fruits and local specialties, you'll venture deeper into the Huasteca's water world. Each waterfall and natural pool you visit has its own character and legend, shared by guides who grew up swimming in these sacred waters and learned their secrets from generations past.
                    </p>
                  )}
                  
                  {getaway.id === "media-luna" && (
                    <p className="text-gray-700 mb-2">
                      The morning light creates ever-changing patterns on Media Luna's surface as you prepare for a day of aquatic exploration. After breakfast overlooking the lagoon, you'll have the opportunity to see this underwater wonderland from different perspectives—whether snorkeling above the mesmerizing springs where you can watch water bubble up from the depths, or hiking the surrounding trails for panoramic views of this geological marvel.
                    </p>
                  )}
                  
                  <ul className="list-disc list-inside text-gray-700 ml-2 mb-2">
                    <li>Breakfast at local eatery</li>
                    <li>Morning adventure: {getaway.activities[1]}</li>
                    <li>Lunch at scenic location</li>
                    <li>Afternoon visit to {getaway.activities[2]}</li>
                    <li>Free time for shopping or relaxation</li>
                    <li>Return to San Luis Potosí city</li>
                  </ul>
                </div>

                <h4 className="font-bold text-gray-800 mb-2">Accommodation Options:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-2 mb-4">
                  {getaway.accommodations.map((accommodation, i) => (
                    <li key={i}>{accommodation}</li>
                  ))}
                </ul>

                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <h4 className="font-bold text-gray-800 mb-2">Cultural Highlights:</h4>
                  <p className="text-gray-700">{getaway.culturalNotes}</p>
                  
                  {getaway.id === "real-de-catorce" && (
                    <p className="text-gray-700 mt-2">
                      During your visit, you might witness Wixárika pilgrims completing their 450 km journey to collect peyote and leave offerings at sacred sites. Their colorful beadwork and profound spiritual traditions offer a glimpse into pre-Columbian beliefs that have survived against all odds. Meanwhile, the crumbling grandeur of colonial buildings tells the story of European influence and the boom-and-bust cycle of mining towns throughout Mexican history.
                    </p>
                  )}
                  
                  {getaway.id === "huasteca-potosina" && (
                    <p className="text-gray-700 mt-2">
                      The Huasteca is not just a natural wonder but a cultural crossroads where indigenous traditions blend with colonial influences. You'll see evidence of this in everything from the bright embroidery of local textiles to the fusion cuisine that combines native ingredients with Spanish techniques. If you visit during Xantolo (Day of the Dead), you'll witness one of Mexico's most authentic celebrations, with unique costumes, dances, and customs found nowhere else.
                    </p>
                  )}
                  
                  {getaway.id === "media-luna" && (
                    <p className="text-gray-700 mt-2">
                      Beyond its natural beauty, Media Luna holds archaeological significance as a site where ancient civilizations conducted rituals and left offerings. Underwater archaeological expeditions have recovered artifacts dating back thousands of years, including evidence of some of the earliest human presence in central Mexico. The contrast between the arid surroundings and this life-giving water source has made it a place of spiritual importance throughout human history in the region.
                    </p>
                  )}
                </div>

                <div>
                  <a 
                    href={`https://www.corazondexoconostle.com/index.php/en/`}
                    className="inline-flex items-center bg-primary text-white py-2 px-6 rounded-lg shadow hover:bg-primary-dark transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book This Getaway
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  
                  <div className="flex items-center mt-4">
                    <p className="text-gray-600 text-sm mr-2">Powered by:</p>
                    <Image 
                      src="/images/brands/corazon-de-xoconostle-logo.png" 
                      alt="Corazon de Xoconostle" 
                      width={120} 
                      height={40} 
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose a Weekend Getaway */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose a Weekend Getaway in San Luis Potosí</h2>
            
            <p className="text-gray-700 mb-8 text-center italic">
              "Sometimes the most profound journeys are those that don't take you far in distance, 
              but transport you worlds away in experience."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Accessibility</h3>
                <p className="text-gray-700">
                  Imagine leaving your home after breakfast and by lunchtime, standing in a 
                  completely different world. San Luis Potosí's treasure troves of adventure 
                  lie just 2-3 hours from the city center—close enough for a weekend escape, 
                  yet far enough to disconnect completely from urban routines. While others plan 
                  elaborate vacations waiting for "someday," you can be swimming beneath a waterfall 
                  or wandering a ghost town by this afternoon.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Natural Diversity</h3>
                <p className="text-gray-700">
                  Few places on earth offer the environmental contrasts you'll find within 
                  this single state. In a single weekend, you could wake up in the mystical fog 
                  of a high-altitude desert where silver miners once sought fortune, then the 
                  next morning dive into turquoise waters surrounded by lush jungle. Each landscape 
                  tells a different story, hosts unique wildlife, and presents its own rhythms—a 
                  lifetime of exploration waiting just beyond the city limits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Cultural Richness</h3>
                <p className="text-gray-700">
                  Every cobblestone in San Luis Potosí's towns holds centuries of stories—tales of 
                  indigenous wisdom, Spanish conquest, revolutionary heroes, and modern artistic 
                  revival. A weekend getaway here isn't just about seeing beautiful places; it's about 
                  walking through living history where ancient traditions continue alongside contemporary 
                  life. You might share a meal with a family whose cooking techniques haven't changed in 
                  500 years, or watch artisans create crafts using methods passed down through generations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-2">Expert Guidance</h3>
                <p className="text-gray-700">
                  Anyone can visit a destination, but truly experiencing it requires a key that unlocks 
                  its secrets. With <Link href="https://www.corazondexoconostle.com/index.php/en/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Corazón de Xoconostle</Link>'s 
                  certified guides, places that might seem like beautiful but silent landscapes come alive 
                  with stories, hidden pathways reveal themselves, and chance encounters become meaningful 
                  connections. Their intimate knowledge transforms tourist stops into personal discoveries, 
                  offering perspectives that no guidebook or self-directed tour could provide.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">The Corazón de Xoconostle Difference</h3>
              <p className="text-gray-700 mb-4">
                When Adriana, one of Corazón de Xoconostle's founders, talks about her first visit to the misty heights of Real de Catorce as a child, her eyes still light up. "I remember thinking the clouds had come down to embrace the mountains," she says. "I promised myself I would learn every story this magical place had to tell." This personal connection to the land defines every experience their team creates. Their guides don't just show you tourist attractions—they introduce you to Don Miguel, whose family has baked bread in the same wood-fired oven for four generations; they know exactly which rock offers the perfect view of sunset over the desert; they understand when to speak and when to let the power of a place speak for itself.
              </p>
              <p className="text-gray-700 mb-4">
                Years before becoming certified guides, the Corazón de Xoconostle team spent countless weekends exploring every corner of the region—swimming in hidden cenotes, camping under star-filled skies, and sharing meals with local families. These weren't business trips; they were personal quests to understand the soul of their homeland. This authentic passion permeates each itinerary they design, transforming what could be ordinary sightseeing into transformative journeys.
              </p>
              <p className="text-gray-700">
                As their name suggests—Xoconostle being a native fruit that symbolizes the resilience and distinctive character of the region—they embody the spirit of San Luis Potosí in every adventure they create. Like the fruit that thrives in challenging conditions, they've mastered the art of finding beauty and meaning in both celebrated landmarks and overlooked corners, crafting weekend escapes that remain with you long after you've returned home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore More Adventures</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image 
                  src="/images/outdoors/hiking.jpg" 
                  alt="Outdoor Activities" 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Outdoor Activities</h3>
                <p className="text-gray-600 mb-4">Discover hiking trails, climbing spots, and natural wonders throughout San Luis Potosí.</p>
                <Link href="/outdoors" className="text-primary hover:underline font-medium inline-flex items-center">
                  Explore Outdoors
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
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
                <p className="text-gray-600 mb-4">Immerse yourself in the rich cultural heritage, museums, and historical sites of the region.</p>
                <Link href="/cultural-experiences" className="text-primary hover:underline font-medium inline-flex items-center">
                  Discover Culture
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
                <h3 className="font-bold text-xl mb-2">Upcoming Events</h3>
                <p className="text-gray-600 mb-4">Plan your visit around festivals, cultural events, and seasonal celebrations.</p>
                <Link href="/events" className="text-primary hover:underline font-medium inline-flex items-center">
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
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for Your Weekend Escape?</h2>
            <p className="text-lg text-gray-700 mb-6">
              The morning commute. The endless meetings. The routine that blends one day into the next until weeks blur together. 
              Somewhere, just a few hours from your doorstep, waterfalls are cascading into turquoise pools. Ancient 
              stories are waiting to be heard on cobblestone streets. Adventures are unfolding that could become 
              your most treasured memories.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              This weekend could be different. The team at Corazón de Xoconostle is ready to transform your 
              Saturday and Sunday from ordinary to extraordinary—to help you discover that sometimes the most 
              meaningful journeys don't require plane tickets or vacation days, just the decision to see what 
              wonders lie beyond the familiar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.corazondexoconostle.com/index.php/en/" 
                className="bg-primary text-white py-3 px-8 rounded-lg shadow hover:bg-primary-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Begin Your Story
              </a>
              <a 
                href="https://wa.me/5214446571872" 
                className="bg-white text-primary border border-primary py-3 px-8 rounded-lg shadow hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +52 1 444 657 1872
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60, // Revalidate every minute
  };
};

export default WeekendGetawaysPage; 