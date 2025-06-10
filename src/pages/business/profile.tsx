// @ts-nocheck - Disabling TypeScript temporarily due to deep type instantiation issues with useTranslation
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';
import { BuildingStorefrontIcon, CameraIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const businessCategories = [
  { id: 'retail', name: 'Retail' },
  { id: 'food_beverage', name: 'Food & Beverage' },
  { id: 'services', name: 'Services' },
  { id: 'health_wellness', name: 'Health & Wellness' },
  { id: 'education', name: 'Education & Training' },
  { id: 'technology', name: 'Technology' },
  { id: 'arts_entertainment', name: 'Arts & Entertainment' },
  { id: 'tourism', name: 'Tourism & Hospitality' },
  { id: 'professional', name: 'Professional Services' },
  { id: 'construction', name: 'Construction & Home Improvement' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'other', name: 'Other' }
];

// Business hours options
const daysOfWeek = [
  { id: 'monday', name: 'Monday' },
  { id: 'tuesday', name: 'Tuesday' },
  { id: 'wednesday', name: 'Wednesday' },
  { id: 'thursday', name: 'Thursday' },
  { id: 'friday', name: 'Friday' },
  { id: 'saturday', name: 'Saturday' },
  { id: 'sunday', name: 'Sunday' }
];

// Expanded interface to match all fields in the database
interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  description?: string;
  logo_url?: string;
  cover_image_url?: string;
  business_category: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  business_hours?: BusinessHours;
  tax_id?: string;
  year_established?: number;
  number_of_employees?: string;
  payment_methods?: string[];
  languages_spoken?: string[];
  certifications?: string[];
  is_verified?: boolean;
  is_featured?: boolean;
  active_listings_count?: number;
  subscription_status?: string;
  subscription_id?: string;
  subscription_end_date?: string;
  plan_id?: string;
  latitude?: number;
  longitude?: number;
  stripe_connect_account_id?: string;
  stripe_connect_status?: string;
  stripe_connect_onboarded_at?: string;
  created_at: string;
  updated_at: string;
}

interface BusinessHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

export default function BusinessProfilePage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [newCertification, setNewCertification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // New state for Stripe Connect
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);

  // Expanded form data state to include all fields
  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    business_category: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    whatsapp: '',
    business_hours: {} as BusinessHours,
    tax_id: '',
    year_established: '',
    number_of_employees: '',
    payment_methods: [] as string[],
    languages_spoken: [] as string[],
    certifications: [] as string[],
    stripe_connect_account_id: ''
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/profile');
    } else if (user) {
      fetchBusinessProfile();
    }
  }, [user, isLoading, router]);

  const fetchBusinessProfile = async () => {
    try {
      setIsLoadingProfile(true);

      // Fetch business profile
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // PGRST116 means no rows returned (profile doesn't exist)
          setError('No business profile found. Please create a subscription first.');
          router.push('/business/subscription');
          return;
        }
        throw error;
      }

      // Set the business profile data
      setBusinessProfile(data);

      // Set form data with all available fields
      setFormData({
        business_name: data.business_name || '',
        description: data.description || '',
        business_category: data.business_category || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip_code: data.postal_code || '', // Map postal_code to zip_code
        country: data.country || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
        instagram: data.instagram_handle || '', // Map instagram_handle to instagram
        facebook: data.facebook_url || '', // Map facebook_url to facebook
        twitter: data.twitter_handle || '', // Map twitter_handle to twitter
        linkedin: data.linkedin_url || '', // Map linkedin_url to linkedin
        youtube: data.youtube || '',
        tiktok: data.tiktok || '',
        whatsapp: data.whatsapp || '',
        business_hours: data.hours_of_operation || data.business_hours || {}, // Try both fields
        tax_id: data.tax_id || '',
        year_established: data.year_established ? String(data.year_established) : '',
        number_of_employees: data.number_of_employees || '',
        payment_methods: data.payment_methods || [],
        languages_spoken: data.languages_spoken || [],
        certifications: data.certifications || [],
        stripe_connect_account_id: data.stripe_connect_account_id || ''
      });

      // Set image URLs
      if (data.logo_url) {
        setLogoUrl(data.logo_url);
      }

      if (data.cover_image_url) {
        setCoverImageUrl(data.cover_image_url);
      }
    } catch (err) {
      console.error('Error fetching business profile:', err);
      setError('Failed to load business profile. Please try again.');
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

  const handleLogoClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleCoverClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setUploadingLogo(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${businessProfile?.id}-logo-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      console.log('Logo uploaded successfully:', publicUrl);

      // Update the logo URL
      setLogoUrl(publicUrl);

      // Also update the business profile with the new logo URL
      const { error: updateError } = await supabase
        .from('business_profiles')
        .update({ logo_url: publicUrl })
        .eq('id', businessProfile?.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      setError('Failed to upload logo. Please try again.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setUploadingCover(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${businessProfile?.id}-cover-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', publicUrl);

      // Update the cover image URL
      setCoverImageUrl(publicUrl);

      // Also update the business profile with the new cover image URL
      const { error: updateError } = await supabase
        .from('business_profiles')
        .update({ cover_image_url: publicUrl })
        .eq('id', businessProfile?.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }
    } catch (error) {
      console.error('Error uploading cover image:', error);
      setError('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      // Process year_established to ensure it's a number if provided
      const yearEstablished = formData.year_established ?
        parseInt(formData.year_established, 10) : null;

      // Validate year if provided
      if (yearEstablished && (isNaN(yearEstablished) || yearEstablished < 1800 || yearEstablished > new Date().getFullYear())) {
        throw new Error('Please enter a valid year established');
      }

      // Map form fields to database column names
      const dataToUpdate = {
        business_name: formData.business_name,
        description: formData.description,
        business_category: formData.business_category,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zip_code, // Map zip_code to postal_code
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        instagram_handle: formData.instagram, // Map instagram to instagram_handle
        facebook_url: formData.facebook, // Map facebook to facebook_url
        twitter_handle: formData.twitter, // Map twitter to twitter_handle
        linkedin_url: formData.linkedin, // Map linkedin to linkedin_url
        hours_of_operation: formData.business_hours, // Map business_hours to hours_of_operation
        tax_id: formData.tax_id,
        year_established: yearEstablished,
        number_of_employees: formData.number_of_employees,
        payment_methods: formData.payment_methods,
        languages_spoken: formData.languages_spoken,
        certifications: formData.certifications,
        youtube: formData.youtube,
        tiktok: formData.tiktok,
        whatsapp: formData.whatsapp,
        logo_url: logoUrl,
        cover_image_url: coverImageUrl,
        stripe_connect_account_id: formData.stripe_connect_account_id,
        updated_at: new Date().toISOString()
      };

      console.log('Updating business profile with data:', dataToUpdate);

      const { error } = await supabase
        .from('business_profiles')
        .update(dataToUpdate)
        .eq('id', businessProfile?.id);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      setSuccess(true);
      // Refresh business profile data
      fetchBusinessProfile();
    } catch (err) {
      console.error('Error updating business profile:', err);
      setError(err.message || 'Failed to update business profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle array field additions and removals
  const handleAddCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (certToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove)
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages_spoken.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages_spoken: [...prev.languages_spoken, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages_spoken: prev.languages_spoken.filter(lang => lang !== langToRemove)
    }));
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.trim() && !formData.payment_methods.includes(newPaymentMethod.trim())) {
      setFormData(prev => ({
        ...prev,
        payment_methods: [...prev.payment_methods, newPaymentMethod.trim()]
      }));
      setNewPaymentMethod('');
    }
  };

  const handleRemovePaymentMethod = (methodToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      payment_methods: prev.payment_methods.filter(method => method !== methodToRemove)
    }));
  };

  // Handle business hours changes
  const handleBusinessHoursChange = (day: string, field: 'open' | 'close', value: string) => {
    setFormData(prev => {
      const updatedHours = { ...prev.business_hours };
      if (!updatedHours[day]) {
        updatedHours[day] = { open: '', close: '' };
      }
      updatedHours[day][field] = value;
      return {
        ...prev,
        business_hours: updatedHours
      };
    });
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
              You need to create a business profile by subscribing to a plan first.
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
        <title>Business Profile | Directory SLP</title>
        <meta name="description" content="Manage your business profile on Directory SLP" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Profile</h1>
            <p className="text-gray-600">
              Manage your business information, images, and contact details.
            </p>
          </div>

          {/* Business Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{businessProfile?.business_name || 'Your Business'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <Link href="/business/dashboard" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.dashboard', 'Dashboard')}
                  </Link>
                  <Link href="/business/profile" className="block w-full py-2 px-3 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
                    {t('business.profile', 'Business Profile')}
                  </Link>
                  <Link href="/business/subscription" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.subscription', 'Subscription')}
                  </Link>
                  <Link href="/account" className="block w-full py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                    {t('business.backToAccount', 'Back to Account')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                  Business profile updated successfully!
                </div>
              )}

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Cover Image */}
                <div
                  className="relative h-64 w-full cursor-pointer group bg-gray-200"
                  onClick={handleCoverClick}
                >
                  {coverImageUrl ? (
                    <Image
                      src={coverImageUrl}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <CameraIcon className="h-20 w-20 text-gray-400" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white">
                      <CameraIcon className="h-8 w-8 mx-auto" />
                      <p className="mt-2 text-center">Change Cover Image</p>
                    </div>
                  </div>

                  {uploadingCover && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </div>

                {/* Logo */}
                <div className="relative -mt-16 ml-8">
                  <div
                    className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden cursor-pointer group"
                    onClick={handleLogoClick}
                  >
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo"
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100">
                        <BuildingStorefrontIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <CameraIcon className="h-8 w-8 text-white" />
                    </div>

                    {uploadingLogo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={logoInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-8">
                  {/* Business Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
                          Business Name*
                        </label>
                        <input
                          type="text"
                          id="business_name"
                          name="business_name"
                          required
                          value={formData.business_name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Business Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="Describe your business, services, and what makes you unique..."
                        />
                      </div>

                      <div>
                        <label htmlFor="business_category" className="block text-sm font-medium text-gray-700">
                          Business Category*
                        </label>
                        <select
                          id="business_category"
                          name="business_category"
                          required
                          value={formData.business_category}
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
                        <label htmlFor="year_established" className="block text-sm font-medium text-gray-700">
                          Year Established
                        </label>
                        <input
                          type="number"
                          id="year_established"
                          name="year_established"
                          min="1800"
                          max={new Date().getFullYear()}
                          value={formData.year_established}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="e.g., 2010"
                        />
                      </div>

                      <div>
                        <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700">
                          Tax ID / Business Registration
                        </label>
                        <input
                          type="text"
                          id="tax_id"
                          name="tax_id"
                          value={formData.tax_id}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="e.g., RFC, NIT, EIN"
                        />
                      </div>

                      <div>
                        <label htmlFor="number_of_employees" className="block text-sm font-medium text-gray-700">
                          Number of Employees
                        </label>
                        <select
                          id="number_of_employees"
                          name="number_of_employees"
                          value={formData.number_of_employees}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        >
                          <option value="">Select range</option>
                          <option value="1">Just me</option>
                          <option value="2-10">2-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201+">201+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Location & Address</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          id="zip_code"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="e.g., Mexico"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
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
                          placeholder="https://example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="Include country code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                          Instagram
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                          Facebook
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            facebook.com/
                          </span>
                          <input
                            type="text"
                            id="facebook"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="page.name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                          Twitter / X
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            id="twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                          LinkedIn
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            linkedin.com/company/
                          </span>
                          <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="company"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
                          YouTube
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            youtube.com/
                          </span>
                          <input
                            type="text"
                            id="youtube"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="channel"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
                          TikTok
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            id="tiktok"
                            name="tiktok"
                            value={formData.tiktok}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary"
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Business Hours</h2>

                    <div className="space-y-4">
                      {daysOfWeek.map(day => (
                        <div key={day.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">{day.name}</label>
                          </div>
                          <div className="md:col-span-2">
                            <input
                              type="time"
                              value={formData.business_hours[day.id]?.open || ''}
                              onChange={(e) => handleBusinessHoursChange(day.id, 'open', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                              placeholder="Opening time"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input
                              type="time"
                              value={formData.business_hours[day.id]?.close || ''}
                              onChange={(e) => handleBusinessHoursChange(day.id, 'close', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                              placeholder="Closing time"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Business Details */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Business Details</h2>

                    <div className="space-y-6">
                      {/* Payment Methods */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Methods
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.payment_methods.map((method, index) => (
                            <div
                              key={index}
                              className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                            >
                              {method}
                              <button
                                type="button"
                                className="ml-2 text-primary hover:text-primary-dark"
                                onClick={() => handleRemovePaymentMethod(method)}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            value={newPaymentMethod}
                            onChange={(e) => setNewPaymentMethod(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Add payment method (e.g. Cash, Credit Card, PayPal)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddPaymentMethod();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddPaymentMethod}
                            className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Languages Spoken */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Languages Spoken
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.languages_spoken.map((language, index) => (
                            <div
                              key={index}
                              className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                            >
                              {language}
                              <button
                                type="button"
                                className="ml-2 text-primary hover:text-primary-dark"
                                onClick={() => handleRemoveLanguage(language)}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Add language (e.g. Spanish, English)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddLanguage();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddLanguage}
                            className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certifications & Credentials
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                            >
                              {cert}
                              <button
                                type="button"
                                className="ml-2 text-primary hover:text-primary-dark"
                                onClick={() => handleRemoveCertification(cert)}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            value={newCertification}
                            onChange={(e) => setNewCertification(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Add certification (e.g. ISO 9001, Industry certificate)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCertification();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddCertification}
                            className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Stripe Connect Account Section right before the submit button */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCardIcon className="h-6 w-6 mr-2 text-primary" />
                      {t('business.payments', 'Payment Settings')}
                    </h3>

                    <div className="mb-6">
                      <p className="text-gray-700 mb-4">
                        {t('business.stripeConnectInfo', 'To receive payments for your items sold in the shop, you need to connect your business to our payment processor, Stripe. This allows us to securely transfer funds to your bank account when customers purchase your products.')}
                      </p>

                      {businessProfile?.stripe_connect_account_id ? (
                        <div>
                          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">
                                  {t('business.stripeConnected', 'Stripe account connected')}
                                </h3>
                                <div className="mt-2 text-sm text-green-700">
                                  <p>
                                    {t('business.stripeConnectedInfo', 'Your Stripe account is connected and ready to receive payments.')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label htmlFor="stripe_connect_account_id" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('business.stripeConnectId', 'Stripe Connect Account ID')}
                            </label>
                            <input
                              type="text"
                              id="stripe_connect_account_id"
                              name="stripe_connect_account_id"
                              value={formData.stripe_connect_account_id}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              {t('business.stripeConnectIdInfo', 'This is your Stripe Connect account ID. You can find this in your Stripe dashboard.')}
                            </p>
                          </div>

                          <div className="mb-4">
                            <Link
                              href="https://dashboard.stripe.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {t('business.stripeManage', 'Manage Stripe Account')}
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  {t('business.stripeNotConnected', 'Stripe account not connected')}
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                  <p>
                                    {t('business.stripeNotConnectedInfo', 'You need to connect a Stripe account to receive payments for your sold items. Without this, you will not be able to receive funds from sales.')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label htmlFor="stripe_connect_account_id" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('business.stripeConnectId', 'Stripe Connect Account ID')}
                            </label>
                            <input
                              type="text"
                              id="stripe_connect_account_id"
                              name="stripe_connect_account_id"
                              value={formData.stripe_connect_account_id}
                              onChange={handleInputChange}
                              placeholder="acct_..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              {t('business.stripeConnectIdHelp', 'Enter your Stripe Connect account ID. This starts with "acct_" and can be found in your Stripe Dashboard.')}
                            </p>
                          </div>

                          <div className="mb-4 space-y-4">
                            <p className="text-sm text-gray-600">
                              {t('business.stripeConnectSteps', 'To connect your Stripe account:')}
                            </p>
                            <ol className="list-decimal list-inside text-sm text-gray-600 pl-4 space-y-2">
                              <li>{t('business.stripeStep1', 'Create a Stripe account if you don\'t have one')}</li>
                              <li>{t('business.stripeStep2', 'Find your Connect account ID in the Stripe Dashboard')}</li>
                              <li>{t('business.stripeStep3', 'Enter the ID above and save your profile')}</li>
                            </ol>
                          </div>

                          <a
                            href="https://dashboard.stripe.com/account"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            {t('business.createStripeAccount', 'Create or Access Stripe Account')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}