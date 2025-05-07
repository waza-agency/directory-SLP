import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  HomeIcon,
  KeyIcon,
  WrenchIcon,
  CurrencyDollarIcon,
  MapIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  budget: string;
  propertyType: string;
  location: string;
  furnishingPreference: string;
  numberOfBedrooms: string;
  additionalRequirements: string;
  message: string;
}

const housingServices = [
  {
    title: 'Property Search',
    icon: <HomeIcon className="w-8 h-8 text-green-500" />,
    description: 'Find your ideal home in San Luis Potosí',
  },
  {
    title: 'Rental Agreements',
    icon: <KeyIcon className="w-8 h-8 text-green-500" />,
    description: 'Expert assistance with lease negotiations and contracts',
  },
  {
    title: 'Utilities Setup',
    icon: <WrenchIcon className="w-8 h-8 text-green-500" />,
    description: 'Help with setting up electricity, water, internet, and more',
  },
  {
    title: 'Cost Analysis',
    icon: <CurrencyDollarIcon className="w-8 h-8 text-green-500" />,
    description: 'Transparent breakdown of housing costs and fees',
  },
  {
    title: 'Area Orientation',
    icon: <MapIcon className="w-8 h-8 text-green-500" />,
    description: 'Guided tours of neighborhoods and local amenities',
  },
  {
    title: 'Property Management',
    icon: <BuildingOfficeIcon className="w-8 h-8 text-green-500" />,
    description: 'Ongoing support with property maintenance and issues',
  },
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function HousingServices() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    budget: '',
    propertyType: '',
    location: '',
    furnishingPreference: '',
    numberOfBedrooms: '',
    additionalRequirements: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaValue) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaValue,
          to: 'info@sanluisway.com',
          subject: 'Housing Service Request',
          message: `
Housing Service Request Details:
------------------------
Move-in Date: ${formData.moveInDate}
Budget: ${formData.budget}
Property Type: ${formData.propertyType}
Location: ${formData.location}
Furnishing Preference: ${formData.furnishingPreference}
Number of Bedrooms: ${formData.numberOfBedrooms}

Additional Requirements:
${formData.additionalRequirements || 'None provided'}
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          moveInDate: '',
          budget: '',
          propertyType: '',
          location: '',
          furnishingPreference: '',
          numberOfBedrooms: '',
          additionalRequirements: '',
          message: '',
        });
        recaptchaRef.current?.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>Housing Services | San Luis Way - Expert Housing Solutions</title>
        <meta 
          name="description" 
          content="Find your perfect home in San Luis Potosí with our comprehensive housing services. Expert assistance with property search, rental agreements, and utilities setup." 
        />
        <meta 
          name="keywords" 
          content="housing services, San Luis Potosí, property search, rental agreements, utilities setup, expat housing" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/housing-services/hero.png"
              alt="Housing Services in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Housing Services</h1>
              <p className="text-xl mb-8">
                Find your perfect home in San Luis Potosí with our comprehensive housing services. 
                We handle everything from property search to move-in support.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {housingServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Housing Services</h2>
              {submitStatus === 'success' ? (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                  <p className="font-medium">Thank you for your inquiry!</p>
                  <p>We've received your housing request and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Desired Move-in Date
                    </label>
                    <input
                      type="date"
                      id="moveInDate"
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="0-10000">$0 - $10,000 MXN</option>
                      <option value="10000-15000">$10,000 - $15,000 MXN</option>
                      <option value="15000-20000">$15,000 - $20,000 MXN</option>
                      <option value="20000-30000">$20,000 - $30,000 MXN</option>
                      <option value="30000+">$30,000+ MXN</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condominium</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select preferred location</option>
                      <option value="centro">Centro Histórico</option>
                      <option value="lomas">Lomas</option>
                      <option value="tangamanga">Tangamanga</option>
                      <option value="industrial">Zona Industrial</option>
                      <option value="other">Other Areas</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="furnishingPreference" className="block text-sm font-medium text-gray-700 mb-1">
                      Furnishing Preference
                    </label>
                    <select
                      id="furnishingPreference"
                      name="furnishingPreference"
                      value={formData.furnishingPreference}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select furnishing preference</option>
                      <option value="furnished">Fully Furnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="numberOfBedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Bedrooms
                    </label>
                    <select
                      id="numberOfBedrooms"
                      name="numberOfBedrooms"
                      value={formData.numberOfBedrooms}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select number of bedrooms</option>
                      <option value="studio">Studio</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4+">4+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Please specify any additional requirements (e.g., parking, pet-friendly, security features, etc.)"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Any other details about your housing needs..."
                    />
                  </div>

                  <div className="mb-6">
                    {isRecaptchaConfigured() ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={getRecaptchaSiteKey()}
                        onChange={handleRecaptchaChange}
                      />
                    ) : (
                      <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6">
                        ReCAPTCHA verification is not currently available. Please try again later or contact us directly.
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    disabled={isSubmitting || !recaptchaValue}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>

                  {submitStatus === 'error' && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                      <p>There was an error submitting your request. Please try again.</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 