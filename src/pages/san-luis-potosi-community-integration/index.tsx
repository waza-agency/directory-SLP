import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  UserGroupIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  HeartIcon,
  LanguageIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interestAreas: string[];
  languageLevel: string;
  familyMembers: string;
  preferredActivities: string[];
  availability: string;
  culturalInterests: string;
  additionalInformation: string;
}

const communityServices = [
  {
    title: 'Expat Groups',
    icon: <UserGroupIcon className="w-8 h-8 text-red-500" />,
    description: 'Connect with fellow expatriates in San Luis Potosí',
  },
  {
    title: 'Cultural Exchange',
    icon: <GlobeAltIcon className="w-8 h-8 text-red-500" />,
    description: 'Participate in local cultural activities and events',
  },
  {
    title: 'Language Exchange',
    icon: <LanguageIcon className="w-8 h-8 text-red-500" />,
    description: 'Practice Spanish and meet native speakers',
  },
  {
    title: 'Social Activities',
    icon: <CalendarIcon className="w-8 h-8 text-red-500" />,
    description: 'Join regular social events and meetups',
  },
  {
    title: 'Educational Programs',
    icon: <AcademicCapIcon className="w-8 h-8 text-red-500" />,
    description: 'Learn about Mexican culture and traditions',
  },
  {
    title: 'Community Support',
    icon: <HeartIcon className="w-8 h-8 text-red-500" />,
    description: 'Access support networks and resources',
  },
];

const activityTypes = [
  'Social Gatherings',
  'Cultural Workshops',
  'Language Exchange',
  'Sports Activities',
  'Professional Networking',
  'Family Events',
  'Volunteer Opportunities',
  'Art & Music Events',
  'Food & Cooking',
  'Local Traditions',
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function CommunityIntegration() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    interestAreas: [],
    languageLevel: '',
    familyMembers: '',
    preferredActivities: [],
    availability: '',
    culturalInterests: '',
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
          recaptchaToken: recaptchaValue,
          to: 'info@sanluisway.com',
          subject: 'Community Integration Request',
          message: `
Community Integration Request Details:
------------------------
Interest Areas: ${formData.interestAreas.join(', ')}
Language Level: ${formData.languageLevel}
Family Members: ${formData.familyMembers}
Preferred Activities: ${formData.preferredActivities.join(', ')}
Availability: ${formData.availability}

Cultural Interests:
${formData.culturalInterests}

Additional Information:
${formData.additionalInformation || 'None provided'}
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          interestAreas: [],
          languageLevel: '',
          familyMembers: '',
          preferredActivities: [],
          availability: '',
          culturalInterests: '',
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
        <title>Community Integration | San Luis Way - Connect & Thrive</title>
        <meta 
          name="description" 
          content="Join our vibrant expat community in San Luis Potosí. Connect with fellow expatriates, participate in cultural exchanges, and make lasting friendships." 
        />
        <meta 
          name="keywords" 
          content="community integration, San Luis Potosí, expat community, cultural exchange, social activities, language exchange" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/community-integration/hero.jpg"
              alt="Community Integration in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Community Integration</h1>
              <p className="text-xl mb-8">
                Connect with fellow expatriates and locals in San Luis Potosí. 
                Join our vibrant community and make the most of your experience in Mexico.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Community Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Our Community</h2>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="interestAreas" className="block text-sm font-medium text-gray-700 mb-1">
                    Areas of Interest
                  </label>
                  <select
                    id="interestAreas"
                    name="interestAreas"
                    value={formData.interestAreas}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {activityTypes.map((activity, index) => (
                      <option key={index} value={activity}>
                        {activity}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="languageLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Spanish Language Level
                  </label>
                  <select
                    id="languageLevel"
                    name="languageLevel"
                    value={formData.languageLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select your level</option>
                    <option value="none">No Spanish</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="native">Native/Fluent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700 mb-1">
                    Family Members in San Luis Potosí
                  </label>
                  <select
                    id="familyMembers"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select family size</option>
                    <option value="single">Just me</option>
                    <option value="couple">Couple</option>
                    <option value="small-family">Small family (3-4 members)</option>
                    <option value="large-family">Large family (5+ members)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    Availability for Activities
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings only</option>
                    <option value="flexible">Flexible schedule</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="culturalInterests" className="block text-sm font-medium text-gray-700 mb-1">
                    Cultural Interests
                  </label>
                  <textarea
                    id="culturalInterests"
                    name="culturalInterests"
                    value={formData.culturalInterests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell us about your interests in Mexican culture, traditions, or specific activities you'd like to participate in..."
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Any other information you'd like to share about your community integration needs..."
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
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Join Our Community'}
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