import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const businessCategories = [
  { id: 'food', name: 'Food & Dining' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'sports-fitness', name: 'Sports & Fitness' },
  { id: 'outdoor-activities', name: 'Outdoor Activities' },
  { id: 'private-dining-rooms', name: 'Private Dining Rooms' },
  { id: 'language-exchange-cafes', name: 'Language Exchange Cafes' },
  { id: 'family-activities', name: 'Family Activities' },
  { id: 'terraces', name: 'Terraces' },
  { id: 'live-music', name: 'Live Music Venues' },
  { id: 'other', name: 'Other' }
];

interface FormData {
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  instagram: string;
  hours: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  priceRange: string;
  images: File[];
  acceptedTerms: boolean;
}

export default function SubmitBusinessListing() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    description: '',
    address: '',
    city: 'San Luis Potosí',
    phone: '',
    website: '',
    instagram: '',
    hours: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    priceRange: '',
    images: [],
    acceptedTerms: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

    try {
      // Upload images
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `business-images/${fileName}`;

          const { error: uploadError, data } = await supabase.storage
            .from('business-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('business-images')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      // Insert place data
      const { data, error: insertError } = await supabase
        .from('places')
        .insert([
          {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
            website: formData.website,
            instagram: formData.instagram,
            hours: formData.hours,
            image_url: imageUrls[0], // Use first image as main image
            price_level: formData.priceRange === '$' ? 1 : 
                        formData.priceRange === '$$' ? 2 :
                        formData.priceRange === '$$$' ? 3 : 4,
            contact_info: {
              name: formData.contactName,
              phone: formData.contactPhone,
              email: formData.contactEmail
            }
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      router.push('/submit-listing/success');
    } catch (err) {
      setError('Error submitting listing. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Submit Business Listing - San Luis Way</title>
        <meta name="description" content="List your business in San Luis Potosí's premier directory." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Submit Your Business Listing</h1>
            <p className="mt-2 text-lg text-gray-600">
              Join San Luis Way's business directory and reach new customers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Business Category *
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
                    {businessCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Business Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Location Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Business Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                    Opening Hours *
                  </label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    required
                    placeholder="e.g., Mon-Fri: 9:00-18:00, Sat: 10:00-14:00"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Person</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Information</h2>
              
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Select price range</option>
                  <option value="$">$ (Budget-friendly)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (High-end)</option>
                  <option value="$$$$">$$$$ (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Business Images</h2>
              
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
                  Upload at least one image of your business. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptedTerms"
                  name="acceptedTerms"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    acceptedTerms: e.target.checked
                  }))}
                  className="mt-1 mr-2"
                />
                <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-primary hover:text-primary-dark">Terms and Conditions</a> and confirm that all provided information is accurate.
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
} 