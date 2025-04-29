import { useEffect, useState } from 'react';
import Head from 'next/head';
// @ts-ignore - Ignoring type issues with i18next integration
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import BuyButton from '@/components/common/BuyButton';

// Definición del tipo de producto
interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  images?: string[];
  price?: number;
  status: string;
}

export default function ShopPage() {
  // @ts-ignore - Ignoring deep type instantiation issue with i18next
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener productos de la base de datos
  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Consultar los productos de business_listings
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar productos por categoría
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Obtener categorías únicas
  const uniqueCategories = ['all'];
  products.forEach(product => {
    if (product.category && !uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });

  return (
    <>
      <Head>
        <title>Tienda | Directory SLP</title>
        <meta name="description" content="Explora y compra productos en San Luis Potosí." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Tienda
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Descubre y compra productos y servicios locales en San Luis Potosí.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filtro de Categorías */}
          {uniqueCategories.length > 1 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Filtrar por Categoría</h2>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' 
                      ? 'Todas las Categorías' 
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Estado de Carga */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          )}

          {/* Estado de Error */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Sin Productos */}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeCategory === 'all'
                  ? 'No hay productos disponibles en este momento. Por favor, vuelve más tarde.'
                  : `No hay productos disponibles en la categoría "${activeCategory}".`}
              </p>
            </div>
          )}

          {/* Cuadrícula de Productos */}
          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/listings/${product.id}`} className="block">
                    <div className="relative h-48">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">Sin imagen</span>
                        </div>
                      )}
                      
                      {product.category && (
                        <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                      )}
                      
                      {product.price && (
                        <span className="absolute bottom-2 left-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded">
                          ${parseFloat(product.price.toString()).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})} MXN
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/listings/${product.id}`} className="block">
                      <h3 className="text-lg font-semibold mb-1 hover:text-primary">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    </Link>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/listings/${product.id}`}
                          className="text-primary text-sm hover:underline"
                        >
                          Ver Detalles
                        </Link>
                        
                        <span className="text-gray-700 font-medium">
                          ${parseFloat(product.price?.toString() || "0").toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})} MXN
                        </span>
                      </div>
                      
                      {/* Botones de compra */}
                      <div className="flex items-center justify-between space-x-2">
                        <BuyButton
                          productId={product.id}
                          name={product.title}
                          price={parseFloat(product.price?.toString() || "100")}
                          imageUrl={product.images && product.images.length > 0 ? product.images[0] : undefined}
                          mode="cart"
                          className="text-sm py-1.5 flex-1"
                        />
                        <BuyButton
                          productId={product.id}
                          name={product.title}
                          price={parseFloat(product.price?.toString() || "100")}
                          imageUrl={product.images && product.images.length > 0 ? product.images[0] : undefined}
                          mode="buy"
                          className="text-sm py-1.5 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
    // Revalidar cada hora
    revalidate: 3600,
  };
} 