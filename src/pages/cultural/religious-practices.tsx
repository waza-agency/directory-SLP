import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export default function ReligiousPracticesPage() {

  return (
    <>
      <Head>
        <title>Spiritual Traditions in San Luis Potosí - SLP Descubre</title>
        <meta name="description" content="Explore the rich pre-Hispanic spiritual heritage and Indigenous traditions of San Luis Potosí, from Huichol ceremonies to desert rituals and contemporary practices." />
        <meta name="keywords" content="San Luis Potosí spirituality, Huichol traditions, pre-Hispanic ceremonies, desert rituals, Wixárika pilgrimages" />
        <meta property="og:title" content="Spiritual Traditions in San Luis Potosí - SLP Descubre" />
        <meta property="og:description" content="Discover the ancient spiritual practices and Indigenous traditions that shape the cultural identity of San Luis Potosí." />
        <meta property="og:image" content="/images/cultural/spiritual-traditions.jpeg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/spiritual-traditions.jpeg"
              alt="Huichol ceremony in San Luis Potosí"
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
                Spiritual Traditions
              </h1>
              <p className="text-white text-lg">
                Discover the ancient practices and sacred connections that form the spiritual foundation of San Luis Potosí.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Spiritual Heritage Overview
              </h2>
              <p className="text-gray-600 mb-6">
                The spiritual landscape of San Luis Potosí is deeply rooted in the pre-Hispanic traditions of its Indigenous peoples, particularly the Huichol (Wixárika) and Teenek cultures. The desert regions and sacred natural sites have shaped spiritual practices for millennia, creating a rich tapestry of beliefs that continues to thrive alongside introduced Catholic elements.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Huichol (Wixárika) Traditions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The Wixárika people maintain one of Mexico's most vibrant and intact Indigenous spiritual traditions in the region.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Annual pilgrimages to sacred sites like Wirikuta in the desert</li>
                    <li>Elaborate yarn paintings (nierika) representing spiritual visions</li>
                    <li>Peyote (hikuri) ceremonies for communion with ancestral deities</li>
                    <li>Seasonal agricultural rituals tied to corn cultivation</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Desert Spirituality
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The vast desert landscapes of San Luis Potosí are considered powerful sacred spaces with deep spiritual significance.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Wirikuta desert as a primary pilgrimage destination</li>
                    <li>Sacred mountains believed to house ancestor spirits</li>
                    <li>Natural springs and oases as ritual purification sites</li>
                    <li>Astronomical alignments and solstice ceremonies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/cultural/huichol-ceremony.jpeg"
                  alt="Huichol ceremony in San Luis Potosí"
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
                  Visitor Etiquette
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Sacred Sites</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      When visiting Indigenous sacred sites, always seek permission from local communities. Many areas are restricted during ceremonies and some may not be open to visitors at all.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Ceremonies</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Photography is often prohibited during traditional ceremonies. Never participate in rituals without explicit invitation, and always follow the guidance of community leaders.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Cultural Respect</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Understand that spiritual items, symbols, and practices have deep meaning. Avoid treating them as tourist curiosities and approach with genuine respect for their cultural significance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Spiritual Traditions Sections */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Key Spiritual Traditions in San Luis Potosí
            </h2>
            
            {/* Huichol Pilgrimage to Wirikuta */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/wirikuta-pilgrimage.jpeg"
                    alt="Huichol pilgrimage to Wirikuta desert"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pilgrimage to Wirikuta</h3>
                  <p className="text-gray-600 mb-4">
                    The annual Huichol pilgrimage to Wirikuta in the desert of San Luis Potosí is one of Mexico's most significant spiritual journeys. Pilgrims travel over 400 kilometers to collect hikuri (peyote) and communicate with their deities in this sacred landscape.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">When:</span> Typically during the dry season (October to April)
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Where:</span> Real de Catorce region in the Wirikuta desert
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Highlights:</span> Ceremonial hunt for hikuri (peyote), offerings at sacred springs, prayers at Cerro Quemado (Burnt Mountain)
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Significance:</span> Reconnects the Wixárika people with their origin stories and ensures the continuation of life cycles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agricultural Ceremonies */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Agricultural Ceremonies</h3>
                  <p className="text-gray-600 mb-4">
                    For Indigenous communities in San Luis Potosí, agriculture is deeply intertwined with spirituality. These ceremonies mark key moments in the agricultural cycle and establish balance between people, nature, and cosmic forces.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">When:</span> Following the agricultural calendar, with major ceremonies at planting and harvest
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Where:</span> Community ceremonial centers and agricultural fields
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Highlights:</span> Corn blessing ceremonies, rain petitions, first fruits offerings
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Significance:</span> Maintains the sacred relationship between humans and the natural world that sustains them
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/agricultural-ceremony.jpeg"
                    alt="Indigenous agricultural ceremony"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Día de los Muertos - Indigenous Roots */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/dia-muertos-indigenous.jpeg"
                    alt="Indigenous Day of the Dead traditions in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Xantolo: Indigenous Day of the Dead</h3>
                  <p className="text-gray-600 mb-4">
                    In the Huasteca region, the pre-Hispanic traditions of honoring ancestors are preserved in Xantolo celebrations. While sharing some elements with the national Día de los Muertos, these ceremonies maintain distinct Indigenous elements and beliefs about the afterlife.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">When:</span> Late October through early November
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Where:</span> Throughout the Huasteca Potosina region
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Highlights:</span> Complex altar construction, traditional dances, unique regional foods
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Significance:</span> Maintains the cosmic cycle by honoring ancestors who temporarily return to the earthly realm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Syncretism with Catholic Traditions */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Spiritual Syncretism</h3>
                  <p className="text-gray-600 mb-4">
                    Over centuries, Indigenous spiritual practices have blended with introduced Catholic elements, creating unique syncretic traditions. Rather than simple replacement, this process often involved creative reinterpretation of Christian symbols within Indigenous worldviews.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Examples:</span> The Virgin of Guadalupe identified with earth goddesses, Christ associated with the sun deity
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Practices:</span> Christian saints incorporated into Indigenous ceremonial cycles
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Expressions:</span> Traditional dances performed during Catholic feast days, Indigenous symbols in church decorations
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Significance:</span> Represents cultural resilience and adaptation that preserved core spiritual concepts
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/syncretism.jpeg"
                    alt="Syncretic spiritual traditions in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Healing Practices */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/traditional-healing.jpeg"
                    alt="Traditional healing ceremony in San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Healing Practices</h3>
                  <p className="text-gray-600 mb-4">
                    Traditional healers (curanderos) in San Luis Potosí preserve ancient knowledge of medicinal plants, spiritual cleansing, and balancing energies. These practices view health holistically, addressing physical, emotional, and spiritual dimensions simultaneously.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Practitioners:</span> Curanderos, hueseros (bone-setters), parteras (midwives), herbalists
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Methods:</span> Herbal medicine, energy balancing, limpia (spiritual cleansing), sweat lodges
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Materials:</span> Regional medicinal plants, copal incense, ritual objects
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Significance:</span> Preserves ancient knowledge systems and maintains harmony between body, mind, spirit, and nature
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sacred Sites */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sacred Sites of San Luis Potosí</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wirikuta Desert</h3>
                <p className="text-gray-600">
                  This vast desert region is the most sacred site for the Huichol people, where they collect peyote and commune with their deities. The area encompasses the mountain Cerro Quemado, believed to be where the sun was born.
                </p>
                <p className="text-gray-600 mt-4">
                  <span className="font-semibold">Location:</span> Near Real de Catorce in the Altiplano region
                </p>
                <p className="text-gray-600">
                  {/* Wirikuta Desert details */}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cave of Swallows (Sótano de las Golondrinas)</h3>
                <p className="text-gray-600">
                  This enormous natural shaft is considered a portal to the underworld in Indigenous cosmology. The daily flight of thousands of birds from the cave symbolizes the journey between worlds.
                </p>
                <p className="text-gray-600 mt-4">
                  <span className="font-semibold">Location:</span> Municipality of Aquismón in the Huasteca region
                </p>
                <p className="text-gray-600">
                  {/* Cave of Swallows details */}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tamtoc Archaeological Site</h3>
                <p className="text-gray-600">
                  This ancient Huastec ceremonial center features structures aligned with astronomical events and includes the Monument of the Scarified Woman, reflecting the site's importance in fertility rituals and goddess worship.
                </p>
                <p className="text-gray-600 mt-4">
                  <span className="font-semibold">Location:</span> Near Tamuín in the eastern part of the state
                </p>
                <p className="text-gray-600">
                  {/* Tamtoc Archaeological Site details */}
                </p>
              </div>
            </div>
          </div>

          {/* Seasonal Ceremonial Calendar */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Indigenous Ceremonial Calendar
            </h2>
            <div className="overflow-hidden bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Season
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ceremony
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Early Dry Season
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Wirikuta Pilgrimage
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Collection of sacred hikuri (peyote) and renewal of connection with deities
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Before Rainy Season
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Tatei Neixa (Dance of Our Mother)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Preparation of corn fields and petition for favorable rains
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rainy Season
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Hikuli Neixa (Dance of the Peyote)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Thanks for rainfall and seeking guidance for successful crop growth
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Harvest Time
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Namestixa (Toasted Corn Feast)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Thanksgiving for harvest and sharing of first fruits with community
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Late October
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Xantolo Preparations
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Preparation of altars and spaces for returning ancestors
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      November 1-2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Xantolo (Day of the Dead)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Honoring ancestors who return to visit the living during this period
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Winter Solstice
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Mara'akáme (Shamanic Rituals)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Ceremonies for the return of the sun and preparation for the new annual cycle
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Spring Equinox
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Awakening of the Earth
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      Rituals at sacred sites to align with solar energy and prepare for planting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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