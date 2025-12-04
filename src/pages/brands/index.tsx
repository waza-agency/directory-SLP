import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import { Brand, getAllBrands, generateBrandSlug } from '@/lib/brands';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface BrandsPageProps {
  brands: Brand[];
}

export default function BrandsPage({ brands }: BrandsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from brands
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(brands.map(brand => brand.category))].filter(Boolean);
    return ['all', ...uniqueCategories];
  }, [brands]);

  // Filter brands based on search term and category
  const filteredBrands = useMemo(() => {
    return brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [brands, searchTerm, selectedCategory]);

  return (
    <>
      <SEO
        title="Potosino Brands | Authentic Local Businesses | San Luis Way"
        description="Discover authentic brands born in San Luis Potosí. Explore local artisans, traditional products, and the creativity of Potosino entrepreneurs."
        keywords="San Luis Potosí brands, local businesses, Potosino products, Mexican artisans, authentic brands"
      />

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/listings-hero.jpg"
            alt="Potosino Brands"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Potosino Brands
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Discover authentic brands born in San Luis Potosí, showcasing the creativity and craftsmanship of local artisans and entrepreneurs.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <label htmlFor="search" className="sr-only">Search brands</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search brands..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="md:w-64">
                  <label htmlFor="category" className="sr-only">Filter by category</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredBrands.length} of {brands.length} brands
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Brands Grid */}
          {filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrands.map(brand => (
                <div key={brand.id} className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift group">
                  {/* Brand Image */}
                  <div className="relative h-48">
                    <Image
                      src={brand.image_url || "/images/placeholder.jpg"}
                      alt={brand.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured Badge */}
                    {brand.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Brand Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {brand.category}
                      </span>
                      {brand.year_founded && (
                        <span className="text-gray-500 text-xs">
                          Since {brand.year_founded}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {brand.description}
                    </p>

                    {/* Location */}
                    {(brand.address || brand.city) && (
                      <div className="flex items-center text-gray-500 text-xs mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {brand.address}{brand.city ? `, ${brand.city}` : ''}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/brands/${brand.slug || generateBrandSlug(brand.name, brand.category, brand.city)}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      {/* External Links */}
                      <div className="flex items-center space-x-2">
                        {brand.website && (
                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="Visit Website"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {brand.instagram && (
                          <a
                            href={`https://instagram.com/${brand.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="Follow on Instagram"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'No brands are currently available.'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Brands Section */}
      {brands.some(brand => brand.featured) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Brands</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Highlighted brands that represent the best of Potosino craftsmanship and tradition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brands.filter(brand => brand.featured).slice(0, 3).map(brand => (
                <div key={`featured-${brand.id}`} className="bg-white rounded-xl overflow-hidden shadow-elegant hover-lift">
                  <div className="relative h-48">
                    <Image
                      src={brand.image_url || "/images/placeholder.jpg"}
                      alt={brand.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{brand.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{brand.description}</p>
                    <Link
                      href={`/brands/${brand.slug || generateBrandSlug(brand.name, brand.category, brand.city)}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Are you a Potosino brand?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our directory and showcase your authentic products to the expatriate community in San Luis Potosí.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Listed
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    // Fetch all brands from Supabase
    const fetchedBrands = await getAllBrands();

    console.log('Fetched brands from Supabase:', fetchedBrands.length);

    // If no brands found, throw error to use fallback
    if (!fetchedBrands || fetchedBrands.length === 0) {
      throw new Error('No brands found in Supabase');
    }

    // Ensure all brands have slugs
    const brands = fetchedBrands.map(brand => ({
      ...brand,
      slug: brand.slug || generateBrandSlug(brand.name, brand.category, brand.city)
    }));

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        brands,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching brands from Supabase:', error);

    // Return empty brands array if database connection fails
    // This should rarely happen as the connection is configured correctly
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        brands: [],
      },
      revalidate: 60,
    };
  }
};
