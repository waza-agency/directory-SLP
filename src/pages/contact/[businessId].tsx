import { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { supabase } from '@/lib/supabase';
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

// Business Listing type definition
type BusinessListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  images?: string[];
  price?: string;
  status: string;
  created_at: string;
  business_id: string;
  business_profiles?: {
    business_name: string;
    phone?: string;
    website?: string;
    email?: string;
    address?: string;
    city?: string;
  };
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

type ContactPageProps = {
  businessListing: BusinessListing | null;
};

export default function BusinessContactPage({ businessListing }: ContactPageProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  // Handle loading state and fallback
  if (router.isFallback || !businessListing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="ml-4 text-gray-600">{t('listings.loading', 'Cargando...')}</p>
      </div>
    );
  }

  const businessName = businessListing.business_profiles?.business_name || businessListing.title;

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaValue) {
      setSubmitError(t('listings.contactForm.error', 'Please verify that you are not a robot'));
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          service: `Business Contact: ${businessName}`,
          to: 'info@sanluisway.com',
          businessId: businessListing.id,
          businessName: businessName,
          businessTitle: businessListing.title,
          listingCategory: businessListing.category,
          recaptchaToken: recaptchaValue
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('listings.contactForm.error', 'Failed to send message. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
    if (!token) {
      setSubmitError(t('listings.contactForm.recaptchaError', 'Please verify that you are not a robot'));
    } else {
      setSubmitError('');
    }
  };

  const currentImage = businessListing.images && businessListing.images.length > 0
    ? businessListing.images[0]
    : null;

  return (
    <>
      <Head>
        <title>{t('listings.contactForm.title', { businessName })} | Directory SLP</title>
        <meta name="description" content={`Contact ${businessName} - ${businessListing.description}`} />
        {currentImage && <meta property="og:image" content={currentImage} />}
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="flex gap-4 mb-8">
            <Link href="/listings" className="inline-flex items-center text-primary hover:text-primary-dark transition duration-200">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              {t('listings.backToListings', 'Volver a Negocios')}
            </Link>
            <Link href={`/listings/${businessListing.id}`} className="inline-flex items-center text-primary hover:text-primary-dark transition duration-200">
              {t('featuredPlaces.viewDetails', 'Ver Detalles')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Information Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Business Image */}
              <div className="relative h-48">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={businessName}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">{t('listings.noImageAvailable', 'Sin imagen disponible')}</span>
                  </div>
                )}
              </div>

              {/* Business Details */}
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {businessListing.category}
                  </span>
                  {businessListing.type && (
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {businessListing.type === 'service' ? t('listings.service', 'Servicio') : t('listings.product', 'Producto')}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessListing.title}</h1>
                {businessListing.business_profiles?.business_name && (
                  <p className="text-lg text-gray-600 mb-4">{businessListing.business_profiles.business_name}</p>
                )}

                <p className="text-gray-600 mb-6">{businessListing.description}</p>

                {businessListing.price && (
                  <div className="mb-6">
                    <span className="text-xl font-bold text-green-600">{businessListing.price}</span>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('listings.contactInformation', 'Información de Contacto')}</h3>
                  <div className="space-y-3">
                    {/* Address */}
                    {(businessListing.address || businessListing.business_profiles?.address) && (
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-800">{businessListing.address || businessListing.business_profiles?.address}</p>
                          {(businessListing.city || businessListing.business_profiles?.city) && (
                            <p className="text-gray-600">{businessListing.city || businessListing.business_profiles?.city}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {(businessListing.phone || businessListing.business_profiles?.phone) && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                        <a
                          href={`tel:${businessListing.phone || businessListing.business_profiles?.phone}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {businessListing.phone || businessListing.business_profiles?.phone}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    {businessListing.email && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={`mailto:${businessListing.email}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {businessListing.email}
                        </a>
                      </div>
                    )}

                    {/* Website */}
                    {(businessListing.website || businessListing.business_profiles?.website) && (
                      <div className="flex items-center">
                        <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                        <a
                          href={businessListing.website || businessListing.business_profiles?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {(businessListing.website || businessListing.business_profiles?.website)?.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Direct Contact Actions */}
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {(businessListing.phone || businessListing.business_profiles?.phone) && (
                      <a
                        href={`tel:${businessListing.phone || businessListing.business_profiles?.phone}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-center font-medium transition-colors flex items-center justify-center"
                      >
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {t('listings.callBusiness', 'Llamar')}
                      </a>
                    )}

                    {(businessListing.website || businessListing.business_profiles?.website) && (
                      <a
                        href={businessListing.website || businessListing.business_profiles?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-center font-medium transition-colors flex items-center justify-center"
                      >
                        <GlobeAltIcon className="h-4 w-4 mr-2" />
                        {t('listings.visitWebsite', 'Visitar Sitio Web')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

                        {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('listings.contactForm.title', { businessName })}
                </h2>
                <p className="text-gray-600">
                  {t('listings.contactForm.description', { businessName })}
                </p>
              </div>

              {submitSuccess ? (
                                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <div className="font-medium mb-1">{t('listings.contactForm.success', '¡Tu mensaje ha sido enviado exitosamente!')}</div>
                    <div className="text-sm">{t('listings.contactForm.successDetail', { businessName })}</div>
                  </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('listings.contactForm.name', 'Tu Nombre')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('listings.contactForm.email', 'Tu Email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('listings.contactForm.phone', 'Tu Teléfono (opcional)')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('listings.contactForm.subject', 'Asunto')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('listings.contactForm.message', 'Mensaje')}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* ReCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                      onChange={handleRecaptchaChange}
                    />
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !recaptchaValue}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('listings.contactForm.sending', 'Enviando...') : t('listings.contactForm.send', 'Enviar Mensaje')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  if (!params?.businessId) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: businessListing, error } = await supabase
      .from('business_listings')
      .select(`
        *,
        business_profiles (
          business_name,
          phone,
          website,
          email,
          address,
          city
        )
      `)
      .eq('id', params.businessId)
      .eq('status', 'active')
      .single();

    if (error || !businessListing) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        businessListing,
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      }
    };
  } catch (error) {
    console.error('Error fetching business listing:', error);
    return {
      notFound: true,
    };
  }
};