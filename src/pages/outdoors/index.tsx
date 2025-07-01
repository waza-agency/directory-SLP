import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import SEO from '@/components/common/SEO';

export default function OutdoorsPage() {

  return (
    <>
      <SEO
        title="Outdoor Activities & Adventures in San Luis Potosí"
        description="Discover outdoor activities in San Luis Potosí, from hiking trails and running groups to camping spots and adventure sports, with expert guidance from local specialists."
        keywords="San Luis Potosí outdoors, hiking trails, running groups, camping spots, adventure sports, Sierra de Álvarez, Huasteca Potosina, outdoor experiences, adventure tours, local guides"
        ogImage="/images/outdoors/hero.webp"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/outdoors/hero.webp"
              alt="Outdoor activities in San Luis Potosí"
              fill
              sizes="100vw"
              className="object-cover opacity-50"
              priority
              quality={90}
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Outdoor Activities & Adventures
              </h1>
              <p className="text-white text-lg">
                Discover the natural wonders and outdoor activities of San Luis Potosí
              </p>
              <div className="flex items-center mt-6">
                <p className="text-white text-sm font-medium mr-3">In collaboration with</p>
                <div className="relative w-40 h-16 bg-white/10 rounded-md p-1">
                  <Image 
                    src="/images/brands/corazon-de-xoconostle-logo.png"
                    alt="Corazón de Xoconostle Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Link href="#hiking" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">Hiking</h3>
            </Link>
            <Link href="#running" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">Running</h3>
            </Link>
            <Link href="#camping" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">Camping</h3>
            </Link>
            <Link href="#adventures" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">More Adventures</h3>
            </Link>
          </div>

          {/* Hiking Section */}
          <section id="hiking" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src="/images/outdoors/hiking-detail.jpg"
                  alt="Hiking trails in Sierra de Álvarez"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Hiking Trails</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Sierra de Álvarez</h3>
                    <p className="text-gray-600">
                      Explore the scenic trails of Sierra de Álvarez, featuring diverse flora and fauna, panoramic views, and varying difficulty levels.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Difficulty: Moderate to Difficult</li>
                      <li>Best time: October to March</li>
                      <li>Trail length: 5-15 km</li>
                    </ul>
                    <p className="text-sm text-gray-500 italic mt-2">
                      Expert guided treks available through Corazón de Xoconostle, including the popular Picacho de Bernalejo route.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Huasteca Potosina</h3>
                    <p className="text-gray-600">
                      Discover the stunning waterfalls and jungle trails of the Huasteca region.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Difficulty: Easy to Moderate</li>
                      <li>Best time: Year-round</li>
                      <li>Trail length: 2-8 km</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Running Section */}
          <section id="running" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Running Groups & Routes</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Running Groups</h3>
                    <p className="text-gray-600">
                      Join one of several running groups in the city, catering to all levels from beginners to marathon runners.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Weekly group runs</li>
                      <li>Training programs</li>
                      <li>Social events</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Popular Routes</h3>
                    <p className="text-gray-600">
                      Discover the best running routes in and around the city.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Parque Tangamanga</li>
                      <li>Historic Center loop</li>
                      <li>Riverside trails</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/images/outdoors/running-detail.webp"
                  alt="Running in San Luis Potosí"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>
          </section>

          {/* Camping Section */}
          <section id="camping" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src="/images/outdoors/camping-detail.jpg"
                  alt="Camping in San Luis Potosí"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Camping Spots</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Designated Camping Areas</h3>
                    <p className="text-gray-600">
                      Find safe and well-maintained camping locations throughout the region.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Facilities available</li>
                      <li>Fire pits</li>
                      <li>Water sources</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Backcountry Camping</h3>
                    <p className="text-gray-600">
                      Experience remote camping in natural areas.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Permit requirements</li>
                      <li>Safety guidelines</li>
                      <li>Leave no trace principles</li>
                    </ul>
                    <p className="text-sm text-gray-500 italic mt-2">
                      Special guided camping experiences available with Corazón de Xoconostle, including their popular Xilitla climbing camp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* More Adventures Section */}
          <section id="adventures" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">More Outdoor Adventures</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rock Climbing</h3>
                    <p className="text-gray-600">
                      Discover climbing spots for all skill levels.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Indoor climbing gyms</li>
                      <li>Natural climbing areas</li>
                      <li>Guided experiences</li>
                    </ul>
                    <p className="text-sm text-gray-500 italic mt-2">
                      Technical climbing sessions in Guadalcázar available with certified instructors from Corazón de Xoconostle.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cycling</h3>
                    <p className="text-gray-600">
                      Explore the region on two wheels.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Mountain biking trails</li>
                      <li>Road cycling routes</li>
                      <li>Cycling groups</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Water Activities</h3>
                    <p className="text-gray-600">
                      Enjoy water-based adventures.
                    </p>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      <li>Kayaking</li>
                      <li>Swimming spots</li>
                      <li>Waterfall exploration</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/images/outdoors/adventures-detail.jpg"
                  alt="Outdoor adventures in San Luis Potosí"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>
          </section>

          {/* Day Trips Section */}
          <section id="day-trips" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Day Trips from San Luis Potosí</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cerro de San Pedro */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/cerro-san-pedro.jpg"
                    alt="Cerro de San Pedro"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cerro de San Pedro</h3>
                  <p className="text-gray-600 mb-4">
                    Historic mining town with colonial architecture and scenic views.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 45 minutes</p>
                    <p><span className="font-semibold">Distance:</span> 35 km</p>
                    <p><span className="font-semibold">Highlights:</span> Colonial church, mining history, panoramic views</p>
                  </div>
                </div>
              </div>

              {/* Armadillo de los Infante */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/armadillo.jpg"
                    alt="Armadillo de los Infante"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Armadillo de los Infante</h3>
                  <p className="text-gray-600 mb-4">
                    Charming colonial town known for its traditional architecture and local crafts.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 1 hour</p>
                    <p><span className="font-semibold">Distance:</span> 65 km</p>
                    <p><span className="font-semibold">Highlights:</span> Colonial buildings, artisan workshops, local cuisine</p>
                  </div>
                </div>
              </div>

              {/* Laguna de la Media Luna */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/media-luna.jpg"
                    alt="Laguna de la Media Luna"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Laguna de la Media Luna</h3>
                  <p className="text-gray-600 mb-4">
                    Crystal-clear spring-fed lake perfect for swimming and diving.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 2.5 hours</p>
                    <p><span className="font-semibold">Distance:</span> 180 km</p>
                    <p><span className="font-semibold">Highlights:</span> Swimming, diving, camping, natural beauty</p>
                  </div>
                </div>
              </div>

              {/* San Miguel de Allende */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/san-miguel.jpg"
                    alt="San Miguel de Allende"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">San Miguel de Allende</h3>
                  <p className="text-gray-600 mb-4">
                    UNESCO World Heritage city with colonial architecture and vibrant arts scene.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 3 hours</p>
                    <p><span className="font-semibold">Distance:</span> 220 km</p>
                    <p><span className="font-semibold">Highlights:</span> Historic center, art galleries, restaurants</p>
                  </div>
                </div>
              </div>

              {/* Real de Catorce */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/real-catorce.jpg"
                    alt="Real de Catorce"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real de Catorce</h3>
                  <p className="text-gray-600 mb-4">
                    Ghost town turned tourist destination with rich mining history.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 3.5 hours</p>
                    <p><span className="font-semibold">Distance:</span> 250 km</p>
                    <p><span className="font-semibold">Highlights:</span> Historic buildings, desert landscape, spiritual tourism</p>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-2">
                    Guided tours with Jeep vehicles (Willys) available through Corazón de Xoconostle.
                  </p>
                </div>
              </div>

              {/* Xilitla */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/outdoors/xilitla.webp"
                    alt="Xilitla"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Xilitla</h3>
                  <p className="text-gray-600 mb-4">
                    Home to Edward James' surrealist garden and Huasteca culture.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Drive time:</span> 4 hours</p>
                    <p><span className="font-semibold">Distance:</span> 280 km</p>
                    <p><span className="font-semibold">Highlights:</span> Las Pozas garden, waterfalls, Huasteca culture</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                Note: Drive times are approximate and may vary depending on traffic and road conditions.
                We recommend starting early for longer trips and checking weather conditions before departure.
              </p>
            </div>
          </section>

          {/* Resources Section */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety Guidelines</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Weather considerations</li>
                  <li>Emergency contacts</li>
                  <li>First aid basics</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Equipment Rental</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Local gear shops</li>
                  <li>Rental services</li>
                  <li>Equipment lists</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Guided Tours</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Professional guides</li>
                  <li>Group tours</li>
                  <li>Custom experiences</li>
                </ul>
                <div className="mt-4 text-sm text-gray-500">
                  <p>For expert-led adventures with certified local guides, we recommend our partners at 
                  <a href="https://www.corazondexoconostle.com/index.php/en/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> Corazón de Xoconostle</a>, who specialize in authentic outdoor experiences throughout San Luis Potosí.</p>
                </div>
              </div>
            </div>
          </section>
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