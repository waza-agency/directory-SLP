import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  MapIcon,
  CameraIcon,
  MusicalNoteIcon,
  CakeIcon,
  TruckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  experienceType: string[];
  groupSize: string;
  preferredDate: string;
  duration: string;
  interests: string;
  specialRequirements: string;
  additionalInformation: string;
}

const experiences = [
  {
    title: 'Cultural Tours',
    icon: <MapIcon className="w-8 h-8 text-blue-500" />,
    description: 'Guided tours of historical sites and cultural landmarks',
  },
  {
    title: 'Photography Tours',
    icon: <CameraIcon className="w-8 h-8 text-purple-500" />,
    description: 'Professional photography experiences in scenic locations',
  },
  {
    title: 'Music & Arts',
    icon: <MusicalNoteIcon className="w-8 h-8 text-pink-500" />,
    description: 'Local music and arts experiences and workshops',
  },
  {
    title: 'Culinary Adventures',
    icon: <CakeIcon className="w-8 h-8 text-orange-500" />,
    description: 'Food tours and cooking experiences with local chefs',
  },
  {
    title: 'Adventure Tours',
    icon: <TruckIcon className="w-8 h-8 text-green-500" />,
    description: 'Exciting outdoor adventures and nature tours',
  },
  {
    title: 'Special Events',
    icon: <SparklesIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Curated special events and celebrations',
  },
];

const experienceTypes = [
  'Cultural Tours',
  'Photography Tours',
  'Music & Arts Experiences',
  'Culinary Adventures',
  'Adventure Tours',
  'Special Events',
  'Historical Tours',
  'Nature Tours',
  'Artisan Workshops',
  'Festival Experiences',
  'Local Market Tours',
  'Custom Experiences',
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function Experiences() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    experienceType: [],
    groupSize: '',
    preferredDate: '',
    duration: '',
    interests: '',
    specialRequirements: '',
    additionalInformation: '',
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
          to: 'info@sanluisway.com',
          subject: 'Experience Request - San Luis Potosí',
          recaptchaToken: recaptchaValue
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experienceType: [],
          groupSize: '',
          preferredDate: '',
          duration: '',
          interests: '',
          specialRequirements: '',
          additionalInformation: ''
        });
        recaptchaRef.current?.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'select-multiple') {
      const select = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Unique Experiences in San Luis Potosí | San Luis Way</title>
        <meta 
          name="description" 
          content="Discover unique experiences in San Luis Potosí. From cultural tours to culinary adventures, create unforgettable memories with our curated experiences." 
        />
        <meta 
          name="keywords" 
          content="San Luis Potosí experiences, cultural tours, photography tours, culinary adventures, adventure tours, special events" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/experiences/San-Luis-Potosi-Ciudad.webp"
              alt="Unique Experiences in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Unique Experiences in San Luis Potosí</h1>
              <p className="text-xl mb-8">
                Create unforgettable memories with our curated experiences. From cultural tours to culinary adventures, discover the best of San Luis Potosí.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Experiences Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-4">{experience.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                  <p className="text-gray-600">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book an Experience</h2>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="experienceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Type
                  </label>
                  <select
                    id="experienceType"
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {experienceTypes.map((type, index) => (
                      <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select group size</option>
                    <option value="1">Solo</option>
                    <option value="2">Couple</option>
                    <option value="3-5">Small Group (3-5)</option>
                    <option value="6-10">Medium Group (6-10)</option>
                    <option value="11+">Large Group (11+)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="half-day">Half Day (4 hours)</option>
                    <option value="full-day">Full Day (8 hours)</option>
                    <option value="multi-day">Multi-Day Experience</option>
                    <option value="custom">Custom Duration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Interests
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What specific aspects of San Luis Potosí interest you?"
                  />
                </div>

                <div>
                  <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requirements or accommodations needed?"
                  />
                </div>

                <div>
                  <label htmlFor="additionalInformation" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInformation"
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide any additional details about your experience preferences..."
                  />
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaValue}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center">Your request has been sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-center">Failed to send request. Please try again.</p>
                )}
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 