import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';

export default function AddProduct() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSellerAccount, setIsSellerAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '1',
    category: '',
    active: true,
    image: null as File | null,
  });

  // Check if user is authenticated and a seller
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else {
        checkSellerStatus();
      }
    }
  }, [user, isLoading, router]);

  const checkSellerStatus = async () => {
    try {
      const response = await fetch('/api/user/check-connect-account', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check Connect account status');
      }

      const data = await response.json();
      
      // If not a seller or account not enabled, redirect to seller dashboard
      if (!data.isSeller || !data.accountStatus?.chargesEnabled) {
        router.push('/account/seller');
        return;
      }
      
      setIsSellerAccount(true);
    } catch (error) {
      console.error('Error checking seller status:', error);
      setError('Failed to verify seller account status');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setUploadProgress(0);

    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Validation
      if (!formData.name || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      let imageUrl = null;

      // Upload image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${user.id}/${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('marketplace')
          .upload(filePath, formData.image, {
            cacheControl: '3600',
            upsert: false,
            onUploadProgress: (progress) => {
              setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
            },
          });

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('marketplace')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // Generate SKU
      const sku = `PRD-${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(-4).toUpperCase()}`;

      // Create product in the database
      const { error: insertError } = await supabase
        .from('seller_products')
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          inventory: parseInt(formData.inventory, 10),
          category: formData.category,
          active: formData.active,
          image_url: imageUrl,
          sku: sku,
        });

      if (insertError) {
        throw new Error(`Error creating product: ${insertError.message}`);
      }

      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        inventory: '1',
        category: '',
        active: true,
        image: null,
      });

      // Redirect after a delay
      setTimeout(() => {
        router.push('/account/seller');
      }, 2000);
    } catch (error: any) {
      console.error('Error adding product:', error);
      setError(error.message || 'Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in or not a seller, don't render anything (redirect will happen)
  if (!user || (!isSellerAccount && !isLoading)) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{'Add Product'} | Directory SLP</title>
        <meta name="description" content={'Add a new product to your marketplace listings.'} />
      </Head>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <a href="/account/seller" className="text-primary hover:text-primary-dark">
              &larr; {'Back to Seller Dashboard'}
            </a>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {'Add Product'}
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
              {'Product added successfully! Redirecting to dashboard...'}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {'Product Name'} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Product Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {'Product Description'}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Price and Inventory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    {'Price ($)'} *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
                    {'Inventory'}
                  </label>
                  <input
                    type="number"
                    id="inventory"
                    name="inventory"
                    value={formData.inventory}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  {'Category'}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">{'Select a category'}</option>
                  <option value="Technology">{'Technology'}</option>
                  <option value="Food">{'Food'}</option>
                  <option value="Clothing">{'Clothing'}</option>
                  <option value="Services">{'Services'}</option>
                  <option value="Home">{'Home'}</option>
                  <option value="Other">{'Other'}</option>
                </select>
              </div>

              {/* Product Image */}
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  {'Product Image'}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.image.name} ({Math.round(formData.image.size / 1024)} KB)
                  </p>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                  </div>
                )}
              </div>

              {/* Active Status */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                    {'Make product available for purchase'}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-70"
                >
                  {isSubmitting
                    ? 'Adding Product...'
                    : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ }: { locale: string }) {
  return {
    props: {
    },
  };
} 