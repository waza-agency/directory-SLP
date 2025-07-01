// @ts-nocheck - Disabling TypeScript temporarily due to deep type instantiation issues with useTranslation
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/supabase-auth';

const serviceCategories = [
  { id: 'health', name: 'Health & Wellness' },
  { id: 'education', name: 'Education & Training' },
  { id: 'legal', name: 'Legal & Administrative' },
  { id: 'design', name: 'Design & Creative' },
  { id: 'tech', name: 'Technology & IT' },
  { id: 'events', name: 'Events & Entertainment' },
  { id: 'home', name: 'Home Services' },
  { id: 'consulting', name: 'Consulting & Professional' },
  { id: 'personal', name: 'Personal Services' },
  { id: 'other', name: 'Other' }
];

interface FormData {
  title: string;
  category: string;
  description: string;
  price: string;
  priceType: string;
  images: File[];
  duration: string;
  location: string;
  availabilityNotes: string;
  serviceDetails: string;
  requirements: string;
  cancellationPolicy: string;
  status: string;
}

// Define types to resolve type errors
interface UserType {
  id: string;
  email?: string;
}

interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  [key: string]: any;
}

export default function CreateServiceListing() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    price: '',
    priceType: 'fixed', // 'fixed', 'hourly', 'custom'
    images: [],
    duration: '',
    location: 'in-person', // 'in-person', 'remote', 'both'
    availabilityNotes: '',
    serviceDetails: '',
    requirements: '',
    cancellationPolicy: '',
    status: 'active'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/listings/create-service');
    } else if (user) {
      // Fetch business profile
      fetchBusinessProfile();
    }
  }, [user, isLoading, router]);

  const fetchBusinessProfile = async () => {
    try {
      // Check if user exists before querying
      if (!user) return;
      
      const { data, error } = await supabase
        .from('business_profiles')
        .select("*")
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      setBusinessProfile(data);
    } catch (err) {
      console.error('Error fetching business profile:', err);
      setError('You need to create a business profile before adding services.');
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
          const filePath = `service-images/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('service-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('service-images')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      // Convert price to number if price type is fixed or hourly
      let priceValue = null;
      if (formData.priceType !== 'custom' && formData.price) {
        priceValue = parseFloat(formData.price);
        if (isNaN(priceValue)) {
          throw new Error('Invalid price value');
        }
      }

      // Insert service data
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
            type: 'service', // Set the type as service
            metadata: {
              price_type: formData.priceType,
              custom_price: formData.priceType === 'custom' ? formData.price : null,
              duration: formData.duration,
              location: formData.location,
              availability_notes: formData.availabilityNotes,
              service_details: formData.serviceDetails,
              requirements: formData.requirements,
              cancellation_policy: formData.cancellationPolicy
            }
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      router.push('/business/dashboard');
    } catch (err) {
      setError('Error creating service listing. Please try again.');
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
              You need to create a business profile and subscribe to a plan before adding services.
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
        <title>Add New Service | Directory SLP</title>
        <meta name="description" content="Add a new service to your business profile" />
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
              <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
              <p className="mt-2 text-lg text-gray-600">
                Create a listing for your service to showcase and offer online
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
              Service successfully created!
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Service Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Service Name *
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
                    {serviceCategories.map(category => (
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
                    placeholder="Provide a detailed description of your service..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="priceType" className="block text-sm font-medium text-gray-700">
                    Price Type *
                  </label>
                  <select
                    id="priceType"
                    name="priceType"
                    required
                    value={formData.priceType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="custom">Custom Quote</option>
                  </select>
                </div>

                <div>
                  {formData.priceType === 'custom' ? (
                    <>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price Description
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="e.g., Starts at $500, Contact for quote"
                      />
                    </>
                  ) : (
                    <>
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
                          required={formData.priceType !== 'custom'}
                          value={formData.price}
                          onChange={handleInputChange}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="0.00"
                        />
                        {formData.priceType === 'hourly' && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">/hour</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Service Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="e.g., 1 hour, 30 minutes, 2-3 days"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Service Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="in-person">In-Person</option>
                    <option value="remote">Remote</option>
                    <option value="both">Both (In-Person & Remote)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="availabilityNotes" className="block text-sm font-medium text-gray-700">
                    Availability Notes
                  </label>
                  <textarea
                    id="availabilityNotes"
                    name="availabilityNotes"
                    rows={2}
                    value={formData.availabilityNotes}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="e.g., Available weekdays 9am-5pm, Weekends by appointment only"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="serviceDetails" className="block text-sm font-medium text-gray-700">
                    Service Details
                  </label>
                  <textarea
                    id="serviceDetails"
                    name="serviceDetails"
                    rows={3}
                    value={formData.serviceDetails}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="What's included in the service, process, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                    Requirements or Prerequisites
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={2}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Any requirements for clients to prepare in advance"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700">
                    Cancellation Policy
                  </label>
                  <textarea
                    id="cancellationPolicy"
                    name="cancellationPolicy"
                    rows={2}
                    value={formData.cancellationPolicy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Your policy for cancellations and rescheduling"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Service Images</h2>
              
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
                  Upload images that represent your service. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Service'}
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