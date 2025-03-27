import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  WrenchIcon,
  HomeIcon,
  TruckIcon,
  PaintBrushIcon,
  BoltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string[];
  propertyType: string;
  urgencyLevel: string;
  preferredSchedule: string;
  propertyDetails: {
    address: string;
    size: string;
    access: string;
  };
  serviceDescription: string;
  budget: string;
  additionalInformation: string;
}

const homeServices = [
  {
    title: 'Electrical Services',
    icon: <BoltIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Professional electrical repairs and installations',
  },
  {
    title: 'Plumbing',
    icon: <WrenchIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Expert plumbing solutions and maintenance',
  },
  {
    title: 'Moving Services',
    icon: <TruckIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Reliable moving and relocation assistance',
  },
  {
    title: 'Interior Design',
    icon: <PaintBrushIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Creative interior design and decoration',
  },
  {
    title: 'Property Maintenance',
    icon: <HomeIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Comprehensive property maintenance services',
  },
  {
    title: 'Security Solutions',
    icon: <ShieldCheckIcon className="w-8 h-8 text-yellow-500" />,
    description: 'Home security systems and installations',
  },
];

const serviceTypes = [
  'Electrical Work',
  'Plumbing',
  'Moving Services',
  'Interior Design',
  'Painting',
  'Carpentry',
  'Appliance Installation',
  'Security Systems',
  'General Maintenance',
  'Furniture Assembly',
  'Cleaning Services',
  'Pest Control',
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function HomeServices() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: [],
    propertyType: '',
    urgencyLevel: '',
    preferredSchedule: '',
    propertyDetails: {
      address: '',
      size: '',
      access: '',
    },
    serviceDescription: '',
    budget: '',
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
          subject: 'Home Services Request',
          message: `
Home Service Request Details:
------------------------
Service Types: ${formData.serviceType.join(', ')}
Property Type: ${formData.propertyType}
Urgency Level: ${formData.urgencyLevel}
Preferred Schedule: ${formData.preferredSchedule}

Property Details:
Address: ${formData.propertyDetails.address}
Size: ${formData.propertyDetails.size}
Access: ${formData.propertyDetails.access}

Service Description:
${formData.serviceDescription}

Budget: ${formData.budget}

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
          propertyType: '',
          urgencyLevel: '',
          preferredSchedule: '',
          propertyDetails: {
            address: '',
            size: '',
            access: ''
          },
          serviceDescription: '',
          budget: '',
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
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'propertyDetails') {
        setFormData(prev => ({
          ...prev,
          propertyDetails: {
            ...prev.propertyDetails,
            [child]: value
          }
        }));
      }
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
        <title>Home Services Network | San Luis Way - Professional Home Solutions</title>
        <meta 
          name="description" 
          content="Trusted home services network in San Luis Potosí. From electrical and plumbing to moving and interior design, we connect you with vetted professionals." 
        />
        <meta 
          name="keywords" 
          content="home services, San Luis Potosí, electrical, plumbing, moving services, interior design, property maintenance, home security" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/home-services/hero.jpg"
              alt="Home Services Network in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Home Services Network</h1>
              <p className="text-xl mb-8">
                Connect with trusted home service professionals in San Luis Potosí. 
                Quality solutions for all your home maintenance and improvement needs.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Home Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Home Services</h2>
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
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Services Needed
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="office">Office</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyDetails.address" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address
                  </label>
                  <textarea
                    id="propertyDetails.address"
                    name="propertyDetails.address"
                    value={formData.propertyDetails.address}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="propertyDetails.size" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Size
                  </label>
                  <input
                    type="text"
                    id="propertyDetails.size"
                    name="propertyDetails.size"
                    value={formData.propertyDetails.size}
                    onChange={handleChange}
                    placeholder="e.g., 100 m², 3 bedrooms, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="propertyDetails.access" className="block text-sm font-medium text-gray-700 mb-1">
                    Access Instructions
                  </label>
                  <textarea
                    id="propertyDetails.access"
                    name="propertyDetails.access"
                    value={formData.propertyDetails.access}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Any specific instructions for accessing the property..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

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
                    <option value="standard">Standard (Within a week)</option>
                    <option value="flexible">Flexible (Anytime)</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select preferred schedule</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-4pm)</option>
                    <option value="evening">Evening (4pm-8pm)</option>
                    <option value="weekend">Weekend Only</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Description
                  </label>
                  <textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Please describe the service you need in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="0-1000">$0 - $1,000 MXN</option>
                    <option value="1000-5000">$1,000 - $5,000 MXN</option>
                    <option value="5000-10000">$5,000 - $10,000 MXN</option>
                    <option value="10000-20000">$10,000 - $20,000 MXN</option>
                    <option value="20000+">$20,000+ MXN</option>
                    <option value="quote">Need a Quote</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Any other details or special requirements..."
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