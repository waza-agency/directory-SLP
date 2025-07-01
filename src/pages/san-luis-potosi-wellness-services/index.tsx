import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string[];
  healthGoals: string;
  currentPractices: string;
  preferredSchedule: string;
  location: string;
  specialRequirements: string;
  additionalInformation: string;
}

const wellnessServices = [
  {
    title: 'Mental Wellness',
    icon: <AcademicCapIcon className="w-8 h-8 text-purple-500" />,
    description: 'Professional counseling and mental health support services',
  },
  {
    title: 'Physical Wellness',
    icon: <HeartIcon className="w-8 h-8 text-red-500" />,
    description: 'Fitness programs and physical health guidance',
  },
  {
    title: 'Spiritual Wellness',
    icon: <SparklesIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Meditation and spiritual growth programs',
  },
  {
    title: 'Holistic Health',
    icon: <SunIcon className="w-8 h-8 text-orange-500" />,
    description: 'Alternative medicine and holistic healing practices',
  },
  {
    title: 'Sleep Wellness',
    icon: <MoonIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Sleep improvement and relaxation techniques',
  },
  {
    title: 'Energy Management',
    icon: <FireIcon className="w-8 h-8 text-amber-500" />,
    description: 'Energy optimization and stress management',
  },
];

const serviceTypes = [
  'Mental Health Counseling',
  'Fitness Training',
  'Meditation Classes',
  'Holistic Healing',
  'Sleep Therapy',
  'Stress Management',
  'Nutritional Guidance',
  'Yoga Classes',
  'Massage Therapy',
  'Energy Healing',
  'Life Coaching',
  'Wellness Workshops',
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function WellnessServices() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: [],
    healthGoals: '',
    currentPractices: '',
    preferredSchedule: '',
    location: '',
    specialRequirements: '',
    additionalInformation: '',
  });
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
          subject: 'Wellness Services Request',
          message: `
Wellness Service Request Details:
------------------------
Service Types: ${formData.serviceType.join(', ')}
Location: ${formData.location}
Preferred Schedule: ${formData.preferredSchedule}

Health Goals:
${formData.healthGoals}

Current Practices:
${formData.currentPractices}

Special Requirements:
${formData.specialRequirements || 'None specified'}

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
          serviceType: [],
          healthGoals: '',
          currentPractices: '',
          preferredSchedule: '',
          location: '',
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
        <title>Wellness Services in San Luis Potosí | San Luis Way</title>
        <meta 
          name="description" 
          content="Professional wellness services in San Luis Potosí. From mental health to physical fitness, find the perfect wellness program for your needs." 
        />
        <meta 
          name="keywords" 
          content="wellness services, San Luis Potosí, mental health, fitness, meditation, holistic health, wellness programs" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/wellness-services/hero.jpg"
              alt="Wellness Services in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Wellness Services in San Luis Potosí</h1>
              <p className="text-xl mb-8">
                Discover comprehensive wellness services designed to enhance your physical, mental, and spiritual well-being in San Luis Potosí.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Wellness Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellnessServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Wellness Services</h2>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                  <p className="font-medium">Thank you for your wellness inquiry!</p>
                  <p>We've received your request and will contact you shortly.</p>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                      Services Interested In
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      multiple
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                  </div>

                  <div>
                    <label htmlFor="healthGoals" className="block text-sm font-medium text-gray-700 mb-1">
                      Health Goals
                    </label>
                    <textarea
                      id="healthGoals"
                      name="healthGoals"
                      value={formData.healthGoals}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="What are your main health and wellness goals?"
                    />
                  </div>

                  <div>
                    <label htmlFor="currentPractices" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Wellness Practices
                    </label>
                    <textarea
                      id="currentPractices"
                      name="currentPractices"
                      value={formData.currentPractices}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="What wellness practices do you currently engage in?"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredSchedule" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Schedule
                    </label>
                    <select
                      id="preferredSchedule"
                      name="preferredSchedule"
                      value={formData.preferredSchedule}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select preferred schedule</option>
                      <option value="morning">Morning (6am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-5pm)</option>
                      <option value="evening">Evening (5pm-10pm)</option>
                      <option value="weekend">Weekend Only</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Preferred area in San Luis Potosí"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Any other information you'd like to share..."
                    />
                  </div>

                  <div className="flex justify-center">
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
                    disabled={isSubmitting || !recaptchaValue}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
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