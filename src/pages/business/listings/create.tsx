import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/supabase-auth';

const productCategories = [
  { id: 'clothing', name: 'Clothing & Apparel' },
  { id: 'jewelry', name: 'Jewelry & Accessories' },
  { id: 'food', name: 'Food & Beverages' },
  { id: 'handicrafts', name: 'Handicrafts & Artisan Goods' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'electronics', name: 'Electronics & Tech' },
  { id: 'books', name: 'Books & Media' },
  { id: 'marketing', name: 'Marketing & Advertising' },
  { id: 'arts', name: 'Arts & Entertainment' },
  { id: 'services', name: 'Services' },
  { id: 'other', name: 'Other' }
];

interface FormData {
  title: string;
  category: string;
  description: string;
  price: string;
  images: File[];
  specifications: string;
  dimensions: string;
  weight: string;
  shippingInfo: string;
  returnPolicy: string;
  status: string;
  shippingFee?: string;
  type: string;
  digitalDownloadUrl?: string;
}

export default function CreateProductListing() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    price: '',
    images: [],
    specifications: '',
    dimensions: '',
    weight: '',
    shippingInfo: '',
    returnPolicy: '',
    status: 'active',
    shippingFee: '',
    type: 'physical',
    digitalDownloadUrl: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/listings/create');
    } else if (user) {
      // Fetch business profile
      fetchBusinessProfile();
    }
  }, [user, isLoading, router]);

  const fetchBusinessProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select("*")
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      setBusinessProfile(data);
    } catch (err) {
      console.error('Error fetching business profile:', err);
      setError('You need to create a business profile before adding products.');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!businessProfile) {
      setError('Business profile not found. Please create a business profile first.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload images
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const fileExt = file.name.split.pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('listing-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('listing-images')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      // Convert price to number
      const priceValue = parseFloat(formData.price);
      
      if (isNaN(priceValue)) {
        throw new Error('Invalid price value');
      }

      // Convert shipping fee to number
      const shippingFeeValue = formData.shippingFee ? parseFloat(formData.shippingFee) : null;

      // Insert product data
      const { data, error: insertError } = await supabase
        .from('business_listings')
        .insert([
          {
            business_id: businessProfile.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            price: priceValue,
            images: imageUrls,
            status: formData.status,
            type: formData.type,
            digital_download_url: formData.type === 'digital' ? formData.digitalDownloadUrl : null,
            shipping_fee: formData.type === 'physical' ? shippingFeeValue : null,
            metadata: {
              specifications: formData.specifications,
              dimensions: formData.dimensions,
              weight: formData.weight,
              return_policy: formData.returnPolicy
            }
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      router.push('/business/dashboard');
    } catch (err) {
      setError('Error creating product listing. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="ml-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // If user is not logged in, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  // If no business profile, show error message
  if (!isLoadingProfile && !businessProfile) {
    return (
      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">No Business Profile</h1>
            <p className="text-gray-600 mb-6">
              You need to create a business profile and subscribe to a plan before adding products.
            </p>
            <button
              onClick={() => router.push('/business/subscription')}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Create Business Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Add New Product | Directory SLP</title>
        <meta name="description" content="Add a new product to your business profile" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              &larr; Back to Dashboard
            </button>
            <div className="text-center mt-4">
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="mt-2 text-lg text-gray-600">
                Create a listing for your product to showcase and sell online
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
              Product successfully created!
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Product Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    {productCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Provide a detailed description of your product..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (MXN) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      id="price"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Product Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Product Images</h2>
              
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Upload Images *
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  required
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Upload at least one image of your product. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
                    Product Specifications
                  </label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    rows={3}
                    value={formData.specifications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Material, color, features, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="e.g., 10 x 5 x 2 cm"
                    />
                  </div>

                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="e.g., 500g"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-700">
                    Shipping Information
                  </label>
                  <textarea
                    id="shippingInfo"
                    name="shippingInfo"
                    rows={2}
                    value={formData.shippingInfo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Delivery options, shipping costs, etc."
                  />
                </div>

                <div>
                  <label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700">
                    Return Policy
                  </label>
                  <textarea
                    id="returnPolicy"
                    name="returnPolicy"
                    rows={2}
                    value={formData.returnPolicy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Return conditions, warranty information, etc."
                  />
                </div>
              </div>
            </div>

            {formData.type === 'physical' && (
              <div>
                <label htmlFor="shippingFee" className="block text-sm font-medium text-gray-700">
                  Shipping Fee (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="shippingFee"
                  name="shippingFee"
                  value={formData.shippingFee}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="e.g., 5.99"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank or 0 to include shipping in the price or if not applicable.</p>
              </div>
            )}

            {formData.type === 'digital' && (
              <div>
                <label htmlFor="digitalDownloadUrl" className="block text-sm font-medium text-gray-700">
                  Digital Download URL
                </label>
                <input
                  type="url"
                  id="digitalDownloadUrl"
                  name="digitalDownloadUrl"
                  value={formData.digitalDownloadUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="https://..."
                  required={formData.type === 'digital'}
                />
                <p className="text-xs text-gray-500 mt-1">Provide a download link or file URL for digital products.</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ }: { locale: string }) {
  return {
    props: {
    },
  };
} 