import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {
  WrenchIcon,
  HomeIcon,
  UserIcon,
  BuildingOfficeIcon,
  TruckIcon,
  AcademicCapIcon,
  HeartIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import ReCAPTCHA from "react-google-recaptcha";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  specificService: string;
  urgencyLevel: string;
  message: string;
}

const serviceCategories = [
  {
    title: 'Home Services',
    icon: <HomeIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Professional home maintenance and repair services',
    services: [
      'Plumbing',
      'Electrical Work',
      'Carpentry',
      'Painting',
      'Air Conditioning',
      'General Maintenance'
    ]
  },
  {
    title: 'Professional Services',
    icon: <BuildingOfficeIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Expert professional and legal services',
    services: [
      'Notary Services',
      'Legal Consultation',
      'Accounting',
      'Tax Services',
      'Insurance Agents',
      'Real Estate Agents'
    ]
  },
  {
    title: 'Personal Services',
    icon: <UserIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Reliable personal assistance services',
    services: [
      'Private Drivers',
      'Personal Assistants',
      'Housekeeping',
      'Childcare',
      'Pet Care',
      'Personal Training'
    ]
  },
  {
    title: 'Technical Services',
    icon: <WrenchIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Specialized technical support and repairs',
    services: [
      'Computer Repair',
      'Phone Repair',
      'Car Mechanics',
      'Electronics Repair',
      'Security Systems',
      'Internet Setup'
    ]
  }
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function LocalConnections() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceCategory: '',
    specificService: '',
    urgencyLevel: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFormData(prev => ({
      ...prev,
      serviceCategory: category,
      specificService: ''
    }));
  };

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
          subject: `Local Service Request: ${formData.serviceCategory} - ${formData.specificService}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceCategory: '',
          specificService: '',
          urgencyLevel: '',
          message: ''
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>Local Connections | San Luis Way - Trusted Service Providers</title>
        <meta 
          name="description" 
          content="Connect with our network of trusted local service providers in San Luis Potosí. From home maintenance to professional services, find reliable experts for all your needs." 
        />
        <meta 
          name="keywords" 
          content="local services, San Luis Potosí, home maintenance, professional services, personal services, technical services, trusted providers" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/local-connections/hero.jpg"
              alt="Local Connections in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Local Connections</h1>
              <p className="text-xl mb-8">
                Access our carefully vetted network of service providers. We connect you with reliable 
                professionals who understand expat needs and meet our quality standards.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Why Choose Us Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Network?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ScaleIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vetted & Trusted</h3>
                <p className="text-gray-600">
                  All service providers undergo thorough background checks and must maintain high quality standards.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expat-Friendly</h3>
                <p className="text-gray-600">
                  Our providers are experienced in working with expats and understand international standards.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Support</h3>
                <p className="text-gray-600">
                  We personally handle your request and ensure you're matched with the right provider.
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl
                    ${selectedCategory === category.title ? 'ring-2 ring-yellow-500' : ''}`}
                  onClick={() => handleCategoryChange(category.title)}
                >
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Service</h2>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Category
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {serviceCategories.map((category, index) => (
                      <option key={index} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.serviceCategory && (
                  <div>
                    <label htmlFor="specificService" className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Service
                    </label>
                    <select
                      id="specificService"
                      name="specificService"
                      value={formData.specificService}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {serviceCategories
                        .find(category => category.title === formData.serviceCategory)
                        ?.services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    id="urgencyLevel"
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select urgency level</option>
                    <option value="emergency">Emergency (Within 24 hours)</option>
                    <option value="urgent">Urgent (2-3 days)</option>
                    <option value="normal">Normal (Within a week)</option>
                    <option value="flexible">Flexible (Anytime)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Please provide details about your service request..."
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
                  className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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