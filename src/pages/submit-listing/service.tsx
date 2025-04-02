import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const serviceCategories = [
  { id: 'relocation', name: 'Relocation Services' },
  { id: 'housing', name: 'Housing Services' },
  { id: 'legal', name: 'Legal Services' },
  { id: 'community', name: 'Community Services' },
  { id: 'family', name: 'Family Services' },
  { id: 'petcare', name: 'Pet Care Services' },
  { id: 'wellness', name: 'Health & Wellness' },
  { id: 'homeservices', name: 'Home Services' },
  { id: 'cultural', name: 'Cultural Services' },
  { id: 'experiences', name: 'Experience Services' }
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
  serviceArea: string;
  languages: string[];
  qualifications: string;
  experience: string;
  pricing: string;
  paymentMethods: string[];
  insurance: string;
  certifications: string[];
  profileImage: File | null;
  documents: File[];
  acceptedTerms: boolean;
}

export default function SubmitServiceListing() {
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
    serviceArea: '',
    languages: [],
    qualifications: '',
    experience: '',
    pricing: '',
    paymentMethods: [],
    insurance: '',
    certifications: [],
    profileImage: null,
    documents: [],
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

  const handleArrayInputChange = (field: 'languages' | 'paymentMethods' | 'certifications', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'documents') => {
    if (e.target.files) {
      if (field === 'profileImage') {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target.files![0]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          documents: Array.from(e.target.files!)
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Upload profile image if selected
      let profileImageUrl = null;
      if (formData.profileImage) {
        const fileExt = formData.profileImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `service-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('service-images')
          .upload(filePath, formData.profileImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('service-images')
          .getPublicUrl(filePath);

        profileImageUrl = publicUrl;
      }

      // Upload documents if any
      const documentUrls = await Promise.all(
        formData.documents.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `service-documents/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('service-documents')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('service-documents')
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
            category: 'service',
            description: formData.description,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
            website: formData.website,
            instagram: formData.instagram,
            hours: formData.hours,
            image_url: profileImageUrl,
            service_info: {
              category: formData.category,
              serviceArea: formData.serviceArea,
              languages: formData.languages,
              qualifications: formData.qualifications,
              experience: formData.experience,
              pricing: formData.pricing,
              paymentMethods: formData.paymentMethods,
              insurance: formData.insurance,
              certifications: formData.certifications,
              documents: documentUrls
            },
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
        <title>Submit Service Provider Listing - San Luis Way</title>
        <meta name="description" content="List your professional services in San Luis Potosí's premier directory." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Submit Your Service Provider Listing</h1>
            <p className="mt-2 text-lg text-gray-600">
              Join San Luis Way's service provider directory and connect with clients
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Provider Name *
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
                    Service Category *
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
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Service Description *
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
                    Service Address *
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

                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
                    Service Area *
                  </label>
                  <input
                    type="text"
                    id="serviceArea"
                    name="serviceArea"
                    required
                    placeholder="e.g., San Luis Potosí City and surrounding areas"
                    value={formData.serviceArea}
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
                    Phone *
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.contactEmail}
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
                    Availability *
                  </label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    required
                    placeholder="e.g., Mon-Fri: 9:00-17:00, Sat: 10:00-14:00"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
                    Qualifications *
                  </label>
                  <textarea
                    id="qualifications"
                    name="qualifications"
                    required
                    rows={3}
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience *
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    required
                    rows={3}
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="pricing" className="block text-sm font-medium text-gray-700">
                    Pricing Information *
                  </label>
                  <textarea
                    id="pricing"
                    name="pricing"
                    required
                    rows={3}
                    value={formData.pricing}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
                    Insurance Information
                  </label>
                  <textarea
                    id="insurance"
                    name="insurance"
                    rows={3}
                    value={formData.insurance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Documents</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                    Profile Image *
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    required
                    onChange={(e) => handleFileChange(e, 'profileImage')}
                    className="mt-1 block w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a professional profile image. Supported formats: JPG, PNG, GIF
                  </p>
                </div>

                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
                    Certificates & Documents
                  </label>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => handleFileChange(e, 'documents')}
                    className="mt-1 block w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload any relevant certificates or documents. Supported formats: PDF, DOC, DOCX
                  </p>
                </div>
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