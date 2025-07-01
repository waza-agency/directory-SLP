import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function CulinaryTraditionsPage() {

  return (
    <>
      <Head>
        <title>Culinary Traditions of San Luis Potosí - SLP Descubre</title>
        <meta name="description" content="Explore the rich culinary traditions and regional dishes of San Luis Potosí, from enchiladas potosinas to traditional huasteca cuisine." />
        <meta name="keywords" content="San Luis Potosí food, Mexican cuisine, regional dishes, traditional recipes, food culture" />
        <meta property="og:title" content="Culinary Traditions of San Luis Potosí - SLP Descubre" />
        <meta property="og:description" content="Discover the flavors, ingredients, and culinary heritage that define San Luis Potosí's unique food culture." />
        <meta property="og:image" content="/images/cultural/culinary-traditions.jpeg" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/culinary-traditions.jpeg"
              alt="Traditional dishes from San Luis Potosí"
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
                Culinary Traditions
              </h1>
              <p className="text-white text-lg">
                Discover the rich and diverse flavors of San Luis Potosí's food culture.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Regional Cuisine Overview
              </h2>
              <p className="text-gray-600 mb-6">
                San Luis Potosí's cuisine is characterized by its geographical diversity, with distinct culinary traditions from the altiplano, media, and huasteca regions. Each area brings unique ingredients, techniques, and flavors to the table.
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Signature Dishes
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The state is known for several iconic dishes that represent its culinary heritage.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Enchiladas Potosinas (red corn tortillas filled with cheese)</li>
                    <li>Zacahuil (giant tamale from the Huasteca region)</li>
                    <li>Gorditas de horno (oven-baked corn masa cakes)</li>
                    <li>Asado de boda (traditional wedding stew)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Indigenous Influences
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The indigenous roots of San Luis Potosí's cuisine are evident in many traditional dishes and cooking methods.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Use of native corn varieties and nixtamalization</li>
                    <li>Wild herbs and plants like chepil and hoja santa</li>
                    <li>Cooking methods like pit ovens and stone grinding</li>
                    <li>Traditional ingredients like insects and cactus</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/cultural/enchiladas-potosinas.jpeg"
                  alt="Traditional enchiladas potosinas"
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
                  Local Food Experiences
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Traditional Markets</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Visit Mercado República or Mercado Hidalgo to experience local ingredients, spices, and prepared foods in their authentic setting.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Food Festivals</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The annual Festival Gastronómico showcases local chefs and traditional cooking techniques from across the state.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Cooking Classes</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Several local culinary schools and restaurants offer cooking classes where you can learn to prepare regional specialties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Cuisine Sections */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Regional Culinary Traditions
            </h2>

            {/* Altiplano Region */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/altiplano-cuisine.jpeg"
                    alt="Altiplano regional cuisine"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Altiplano Region</h3>
                  <p className="text-gray-600 mb-4">
                    The high plateau region's cuisine is defined by its arid climate and cattle-raising traditions. The food here tends to be heartier with more meat-based dishes compared to other regions of the state.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Signature Dishes:</span> Asado de boda, gorditas de horno, empanadas de calabaza
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Key Ingredients:</span> Goat, lamb, corn, squash, chiles
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Cooking Methods:</span> Slow-roasting, clay ovens, open fire cooking
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Local Specialties:</span> Queso de tuna (cactus fruit cheese), cabuches (cactus flower buds)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zona Media */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Zona Media</h3>
                  <p className="text-gray-600 mb-4">
                    The middle zone represents a culinary transition between the arid altiplano and the lush huasteca. This region is known for its agricultural production and diverse influences.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Signature Dishes:</span> Enchiladas potosinas, gorditas de maíz quebrado, turrón de nuez
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Key Ingredients:</span> Corn, chilies, nopal, beans, regional cheeses
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Cooking Methods:</span> Griddle cooking, steaming, baking
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Local Specialties:</span> Chile ancho, queso de vaca, dulces de leche
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/zona-media-cuisine.jpeg"
                    alt="Zona Media regional cuisine"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Huasteca Region */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/huasteca-cuisine.jpeg"
                    alt="Huasteca regional cuisine"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Huasteca Region</h3>
                  <p className="text-gray-600 mb-4">
                    The tropical Huasteca region offers the most diverse and vibrant cuisine in San Luis Potosí. With abundant rainfall, lush vegetation, and strong indigenous influences, the food here is colorful, flavorful, and distinctive.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Signature Dishes:</span> Zacahuil, bocoles, enchiladas huastecas, palmito soup
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Key Ingredients:</span> Tropical fruits, herbs like epazote and hoja santa, fish, wild game
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Cooking Methods:</span> Banana leaf wrapping, pit cooking, steaming
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Local Specialties:</span> Pemoles, atole de cacahuate, cecina huasteca
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional Beverages */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Beverages</h3>
                  <p className="text-gray-600 mb-4">
                    San Luis Potosí has a rich tradition of both alcoholic and non-alcoholic beverages that complement its cuisine and reflect seasonal ingredients.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Alcoholic:</span> Mezcal potosino, colonche (fermented cactus fruit drink), pulque
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Non-Alcoholic:</span> Agua de tuna, atole de diferentes sabores, chocolate caliente
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Ceremonial:</span> Mezcal with damiana herb, aguardiente during festivals
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Modern Adaptations:</span> Cactus fruit liqueurs, regional craft beers
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/cultural/traditional-beverages.jpeg"
                    alt="Traditional beverages from San Luis Potosí"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Desserts and Sweets */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/desserts-sweets.jpeg"
                    alt="Traditional desserts and sweets"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Desserts and Sweets</h3>
                  <p className="text-gray-600 mb-4">
                    The sweet traditions of San Luis Potosí reflect both indigenous and colonial influences, with many recipes passed down through generations and still made using traditional methods.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Traditional Candies:</span> Charamuscas, cajeta, dulces de leche quemada
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Pastries:</span> Empanadas de calabaza, turrón de almendra, gorditas de piloncillo
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Seasonal Treats:</span> Capirotada during Lent, pan de muerto for Day of the Dead
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Indigenous Sweets:</span> Candy made from cactus fruits, honey, and native nuts
                    </p>
                    <p className="text-gray-600 mt-4">
                      Don't miss <Link href="/brands/chocolates-costanzo-food-san-luis-potosi" className="text-secondary hover:underline">Chocolates Costanzo</Link>, a renowned local chocolatier producing artisanal chocolates and traditional sweets using authentic Potosino recipes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Recipe */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Recipe: Enchiladas Potosinas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/cultural/enchiladas-recipe.jpeg"
                    alt="Enchiladas Potosinas recipe"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingredients</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>2 cups masa harina (corn flour)</li>
                      <li>1/4 cup chile ancho paste</li>
                      <li>1 cup warm water (approximately)</li>
                      <li>1/2 teaspoon salt</li>
                      <li>1 cup queso fresco, crumbled</li>
                      <li>1/2 onion, finely chopped</li>
                      <li>Vegetable oil for frying</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside text-gray-600">
                      <li>Mix masa harina with chile ancho paste, salt, and enough warm water to form a soft dough</li>
                      <li>Form small balls of dough and press into thin circles (using a tortilla press or rolling pin)</li>
                      <li>Place a spoonful of cheese and onion mixture in the center of each circle</li>
                      <li>Fold in half to form a half-moon shape and seal edges well</li>
                      <li>Heat oil in a pan and lightly fry each enchilada until crisp (about 2 minutes per side)</li>
                      <li>Drain on paper towels and serve with sliced avocado, sour cream, and salsa</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Where to Experience */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Where to Experience Local Cuisine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Traditional Restaurants</h3>
                <p className="text-gray-600 mb-4">
                  For authentic regional dishes served in welcoming atmospheres:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <Link href="/places/la-oruga-y-la-cebada" className="text-secondary hover:underline">
                      La Oruga y La Cebada
                    </Link>
                  </li>
                  <li>
                    <Link href="/places/la-parroquia-potosina" className="text-secondary hover:underline">
                      La Parroquia Potosina
                    </Link>
                  </li>
                  <li>
                    <Link href="/places/el-rincon-huasteco" className="text-secondary hover:underline">
                      El Rincón Huasteco
                    </Link>
                  </li>
                  <li>
                    <Link href="/places/la-casa-del-portal" className="text-secondary hover:underline">
                      La Casa del Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Markets & Street Food</h3>
                <p className="text-gray-600 mb-4">
                  Experience local flavors in bustling, authentic settings:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Mercado República</li>
                  <li>Mercado Hidalgo</li>
                  <li>Street food stalls on Plaza de Armas</li>
                  <li>Sunday tianguis (street markets)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Culinary Experiences</h3>
                <p className="text-gray-600 mb-4">
                  Interactive ways to deepen your understanding of local cuisine:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Cooking classes at La Cocina Potosina</li>
                  <li>Food tours with local guides</li>
                  <li>Visit to traditional pulque producers</li>
                  <li>Seasonal food festivals</li>
                </ul>
              </div>
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