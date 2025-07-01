import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllBrands, getBrandBySlug, generateBrandSlug, Brand } from '../../lib/brands';

interface BrandPageProps {
  brand: Brand;
}

export default function BrandPage({ brand }: BrandPageProps) {

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <>
      <Head>
        <title>{brand.name} | "TEXT" | SLP Tundra</title>
        <meta name="description" content={brand.description || "DEFAULT"} />
      </Head>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={brand.image_url || '/images/placeholder.jpg'}
          alt={brand.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 px-4 py-8">
          <div className="container mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-2">
              {brand.name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                {brand.category}
              </span>
              {brand.year_founded && (
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                  Since {brand.year_founded}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-600 mb-8">
                {brand.description}
              </p>

              {/* Notable Products */}
              {brand.notable_products && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Notable Products</h3>
                  <p className="text-gray-600">{brand.notable_products}</p>
                </div>
              )}

              {/* Where to Buy */}
              {brand.where_to_buy && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Where to Buy</h3>
                  <p className="text-gray-600">{brand.where_to_buy}</p>
                </div>
              )}

              {/* Location */}
              {brand.address && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
                  <p className="text-gray-600">{brand.address}{brand.city ? `, ${brand.city}` : ''}</p>
                </div>
              )}

              {/* Contact Information */}
              {(brand.phone || brand.website || brand.instagram) && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                  {brand.phone && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Phone:</span> {brand.phone}
                    </p>
                  )}
                  {brand.website && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Website:</span>{' '}
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        {brand.website}
                      </a>
                    </p>
                  )}
                  {brand.instagram && (
                    <p className="text-gray-600">
                      <span className="font-medium">Instagram:</span>{' '}
                      <a
                        href={`https://instagram.com/${brand.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        {brand.instagram}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all brands
    const brands = await getAllBrands();

    // Filter and generate slugs for brands that might not have them
    const paths = brands
      .filter(brand => brand.name && brand.category) // Ensure required data exists
      .map(brand => {
        // Generate slug if it doesn't exist
        const slug = brand.slug || generateBrandSlug(brand.name, brand.category, brand.city);
        return {
          params: { slug }
        };
      })
      .filter(path => path.params.slug); // Remove any entries with empty slugs

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Unexpected error in getStaticPaths:', error);

    // Fallback paths for development
    const fallbackPaths = [
      { params: { slug: 'botanas-provi-food-san-luis-potosi' } },
      { params: { slug: 'panaderias-la-superior-food-san-luis-potosi' } },
      { params: { slug: 'aguas-de-lourdes-beverages-san-luis-potosi' } },
      { params: { slug: 'chocolates-costanzo-food-san-luis-potosi' } },
      { params: { slug: 'quesos-carranco-food-san-luis-potosi' } },
      { params: { slug: 'cajeta-coronado-food-san-luis-potosi' } },
      { params: { slug: 'bicicletas-mercurio-automotive-san-luis-potosi' } },
      { params: { slug: 'canels-food-san-luis-potosi' } }
    ];

    return {
      paths: fallbackPaths,
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  try {
    const slug = params?.slug as string;

    if (!slug) {
      return { notFound: true };
    }

    // Try to fetch the brand from Supabase by slug
    let brand = await getBrandBySlug(slug);

    // If brand not found by slug, try to find by matching a generated slug
    if (!brand) {
      const allBrands = await getAllBrands();
      brand = allBrands.find(b => {
        const generatedSlug = b.slug || generateBrandSlug(b.name, b.category, b.city);
        return generatedSlug === slug;
      }) || null;
    }

    // If brand still not found in database, try fallback data
    if (!brand) {
      const fallbackBrands = [
        {
          id: 'botanas-provi',
          name: 'Botanas Provi',
          slug: 'botanas-provi-food-san-luis-potosi',
          category: 'food',
          address: 'Centro Histórico, San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Traditional Mexican snacks and treats made with authentic recipes passed down through generations.',
          notable_products: 'Chicharrones, cacahuates, dulces típicos',
          where_to_buy: 'Tiendas de abarrotes en SLP, mercado República',
          image_url: '/images/brands/botanas-provi.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'panaderia-la-superior',
          name: 'Panaderías La Superior',
          slug: 'panaderias-la-superior-food-san-luis-potosi',
          category: 'food',
          address: 'Av. Carranza 150, Centro',
          city: 'San Luis Potosí',
          description: 'Artisanal bakery offering fresh bread, pastries, and traditional Mexican baked goods since 1950.',
          notable_products: 'Pan dulce, conchas, birotes',
          where_to_buy: 'Sucursales en toda la ciudad',
          image_url: '/images/brands/panaderia-la-superior.jpg',
          featured: true,
          year_founded: '1950',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'aguas-de-lourdes',
          name: 'Aguas de Lourdes',
          slug: 'aguas-de-lourdes-beverages-san-luis-potosi',
          category: 'beverages',
          address: 'Calle Universidad 205',
          city: 'San Luis Potosí',
          description: 'Refreshing traditional Mexican aguas frescas and beverages made with natural ingredients.',
          notable_products: 'Agua de jamaica, horchata, limón con chía',
          where_to_buy: 'Puestos en el centro, mercados locales',
          image_url: '/images/brands/aguas-de-lourdes.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'chocolates-costanzo',
          name: 'Chocolates Costanzo',
          slug: 'chocolates-costanzo-food-san-luis-potosi',
          category: 'food',
          address: 'San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Artisanal chocolate factory producing fine Mexican chocolates and traditional sweets with authentic Potosino recipes.',
          notable_products: 'Chocolates, dulces tradicionales, bombones',
          where_to_buy: 'Tiendas de dulces, mercados',
          image_url: '/images/brands/chocolates-costanzo.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'quesos-carranco',
          name: 'Quesos Carranco',
          slug: 'quesos-carranco-food-san-luis-potosi',
          category: 'food',
          address: 'San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Premium cheese producer creating artisanal and aged cheeses using traditional methods and local milk.',
          notable_products: 'Queso fresco, queso añejo, queso asadero',
          where_to_buy: 'Mercado República, supermercados locales',
          image_url: '/images/brands/quesos-carranco.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'cajeta-coronado',
          name: 'Cajeta Coronado',
          slug: 'cajeta-coronado-food-san-luis-potosi',
          category: 'food',
          address: 'San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Makers of the famous Potosino caramel spread made from goat\'s milk, following century-old recipes.',
          notable_products: 'Cajeta envinada, cajeta quemada, cajeta de vainilla',
          where_to_buy: 'Supermercados, tiendas de abarrotes',
          image_url: '/images/brands/cajeta-coronado.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'bicicletas-mercurio',
          name: 'Bicicletas Mercurio',
          slug: 'bicicletas-mercurio-automotive-san-luis-potosi',
          category: 'automotive',
          address: 'San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Historic bicycle manufacturer producing quality bicycles for Mexican families since 1949.',
          notable_products: 'Bicicletas urbanas, bicicletas de montaña, bicicletas para niños',
          where_to_buy: 'Tiendas deportivas, distribuidores autorizados',
          image_url: '/images/brands/bicicletas-mercurio.jpg',
          featured: true,
          year_founded: '1949',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'canels',
          name: 'Canel\'s',
          slug: 'canels-food-san-luis-potosi',
          category: 'food',
          address: 'San Luis Potosí',
          city: 'San Luis Potosí',
          description: 'Famous candy and chewing gum brand known for their colorful packaging and traditional Mexican flavors.',
          notable_products: 'Chicles, caramelos, dulces tradicionales',
          where_to_buy: 'Tiendas de conveniencia, supermercados',
          image_url: '/images/brands/canels.jpg',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      brand = fallbackBrands.find(b => b.slug === slug) || null;
    }

    if (!brand) {
      return {
        notFound: true
      };
    }

    // Ensure the brand has a slug (generate one if missing)
    if (!brand.slug && brand.name && brand.category) {
      brand.slug = generateBrandSlug(brand.name, brand.category, brand.city);
    }

    return {
      props: {
        brand,
      },
    };
  } catch (error) {
    console.error('Unexpected error in getStaticProps:', error);
    return {
      notFound: true
    };
  }
};