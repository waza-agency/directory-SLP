import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Brand, getAllBrands, getBrandById } from '@/lib/brands';

interface BrandPageProps {
  brand: Brand;
}

export default function BrandPage({ brand }: BrandPageProps) {
  const { t } = useTranslation('common');

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <>
      <Head>
        <title>{brand.name} | {t('brands.title')} | SLP Tundra</title>
        <meta name="description" content={brand.description || t('brands.description')} />
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
    
    const paths = brands.map(brand => ({
      params: { id: brand.id }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Unexpected error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const id = params?.id as string;
    
    // Fetch the brand from Supabase
    const brand = await getBrandById(id);
    
    if (!brand) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        brand,
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Unexpected error in getStaticProps:', error);
    return {
      notFound: true
    };
  }
}; 