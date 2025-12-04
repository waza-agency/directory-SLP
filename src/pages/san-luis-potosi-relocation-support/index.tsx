import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  TruckIcon,
  HomeIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  originCity: string;
  destinationCity: string;
  moveDate: string;
  servicesNeeded: string[];
  numberOfPeople: string;
  hasPets: string;
  specialRequirements: string;
}

const relocationServices = [
  {
    title: 'Moving Services',
    icon: <TruckIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Comprehensive packing and moving solutions'
  },
  {
    title: 'Housing Assistance',
    icon: <HomeIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Find temporary or permanent housing'
  },
  {
    title: 'Document Processing',
    icon: <DocumentTextIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Help with visas, permits, and other paperwork'
  },
  {
    title: 'Cultural Orientation',
    icon: <GlobeAltIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Settle in smoothly with cultural guidance'
  },
  {
    title: 'Language Support',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Access to language classes and tutors'
  },
  {
    title: 'Settling-in Services',
    icon: <SparklesIcon className="w-8 h-8 text-indigo-500" />,
    description: 'Bank accounts, driver\'s licenses, and more'
  }
];

const serviceOptions = [
  'Full-Service Moving',
  'Packing & Unpacking',
  'Furniture Assembly',
  'Vehicle Transport',
  'Storage Solutions',
  'Customs Clearance',
  'Home Finding',
  'School Search'
];


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default function RelocationSupport() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    originCity: '',
    destinationCity: 'San Luis Potosí',
    moveDate: '',
    servicesNeeded: [],
    numberOfPeople: '',
    hasPets: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        servicesNeeded: checkbox.checked
          ? [...prev.servicesNeeded, value]
          : prev.servicesNeeded.filter(service => service !== value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
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
          subject: 'Relocation Support Request',
          message: `
Relocation Support Request:
---------------------------
Origin: ${formData.originCity}
Destination: ${formData.destinationCity}
Move Date: ${formData.moveDate}
Services: ${formData.servicesNeeded.join(', ')}
Household Size: ${formData.numberOfPeople} people
Pets: ${formData.hasPets}

Special Requirements:
${formData.specialRequirements}
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          originCity: '',
          destinationCity: 'San Luis Potosí',
          moveDate: '',
          servicesNeeded: [],
          numberOfPeople: '',
          hasPets: '',
          specialRequirements: ''
        });
        recaptchaRef.current?.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Relocation Support | San Luis Way</title>
        <meta name="description" content="Seamless relocation services to San Luis Potosí, from moving and housing to cultural orientation." />
      </Head>

      <div className="bg-gray-50 text-gray-800 py-16">
        <div className="container mx-auto px-4">
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Relocation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="originCity" className="block text-sm font-medium text-gray-700 mb-1">Origin City</label>
                    <input type="text" id="originCity" name="originCity" value={formData.originCity} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700 mb-1">Destination City</label>
                    <input type="text" id="destinationCity" name="destinationCity" value={formData.destinationCity} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
                  </div>
                </div>
                <div>
                  <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-1">Estimated Move Date</label>
                  <input type="date" id="moveDate" name="moveDate" value={formData.moveDate} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Services Needed</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {serviceOptions.map(option => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option}
                          name="servicesNeeded"
                          value={option}
                          checked={formData.servicesNeeded.includes(option)}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={option} className="ml-2 text-sm text-gray-700">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                    <input type="number" id="numberOfPeople" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="hasPets" className="block text-sm font-medium text-gray-700 mb-1">Bringing Pets?</label>
                    <select id="hasPets" name="hasPets" value={formData.hasPets} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                  <textarea id="specialRequirements" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Any special items, requests, or questions..."></textarea>
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
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Relocation Quote'}
                </button>
                {submitStatus === 'success' && <p className="text-green-600 text-center">Your request has been sent! We will contact you shortly.</p>}
                {submitStatus === 'error' && <p className="text-red-600 text-center">Sorry, we couldn't send your request. Please try again.</p>}
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}