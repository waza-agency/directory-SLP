import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { createClient } from '@supabase/supabase-js';
import ProductCard from '@/components/common/ProductCard';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  shipping_fee: number;
  product_type: string;
  stock_quantity: number;
  business_name?: string;
};

type ShopPageProps = {
  products: Product[];
  categories: string[];
};

export default function ShopPage({ products, categories }: ShopPageProps) {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>{t('marketplace.shopTitle', 'Shop')} | Directory SLP</title>
        <meta name="description" content={t('marketplace.shopDescription', 'Browse products from local businesses in San Luis Potosi')} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t('marketplace.shopTitle', 'Shop')}
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              {t('marketplace.shopSubtitle', 'Discover products from local businesses')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              id="shop-search-001"
              type="text"
              placeholder={t('marketplace.searchProducts', 'Search products...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
            <select
              id="shop-filter-001"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="all">{t('marketplace.allCategories', 'All Categories')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {t('marketplace.noProducts', 'No products found')}
              </h2>
              <p className="mt-2 text-gray-600">
                {t('marketplace.noProductsDescription', 'Try adjusting your search or filter criteria')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.images?.[0]}
                  category={product.category}
                  shipping_fee={product.shipping_fee}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: listings } = await supabase
    .from('business_listings')
    .select('id, title, description, price, images, category, shipping_fee, product_type, stock_quantity, business_profiles!inner(business_name)')
    .eq('is_sellable', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  const products = (listings || []).map((listing: any) => ({
    id: listing.id,
    title: listing.title,
    description: listing.description || '',
    price: listing.price || 0,
    images: listing.images || [],
    category: listing.category || '',
    shipping_fee: listing.shipping_fee || 0,
    product_type: listing.product_type || 'physical',
    stock_quantity: listing.stock_quantity ?? -1,
    business_name: listing.business_profiles?.business_name || '',
  }));

  const categories = Array.from(new Set(products.map((p: Product) => p.category).filter(Boolean)));

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      products,
      categories,
    },
  };
};
