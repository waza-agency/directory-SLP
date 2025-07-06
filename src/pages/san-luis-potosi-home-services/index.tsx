import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  WrenchScrewdriverIcon,
  HomeModernIcon,
  BoltIcon,
  WifiIcon,
  PaintBrushIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  FireIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const homeServices = [
  {
    title: 'General Repairs & Maintenance',
    icon: <WrenchScrewdriverIcon className="w-8 h-8 text-blue-500" />,
    description: 'Plumbing, electrical, carpentry, and appliance repairs.'
  },
  {
    title: 'Professional Cleaning',
    icon: <HomeModernIcon className="w-8 h-8 text-blue-500" />,
    description: 'Scheduled deep cleaning, move-in/out cleaning, and regular housekeeping.'
  },
  {
    title: 'Utility Setup & Management',
    icon: <BoltIcon className="w-8 h-8 text-blue-500" />,
    description: 'Assistance with electricity, water, gas, and bill payments.'
  },
  {
    title: 'Internet & Communications',
    icon: <WifiIcon className="w-8 h-8 text-blue-500" />,
    description: 'Installation of internet, television, and phone lines.'
  },
  {
    title: 'Painting & Decorating',
    icon: <PaintBrushIcon className="w-8 h-8 text-blue-500" />,
    description: 'Interior/exterior painting, wallpapering, and design consultation.'
  },
  {
    title: 'Verified Contractor Sourcing',
    icon: <UserGroupIcon className="w-8 h-8 text-blue-500" />,
    description: 'Finding trusted professionals for remodeling, and installations.'
  },
  {
    title: 'Home Security',
    icon: <ShieldCheckIcon className="w-8 h-8 text-blue-500" />,
    description: 'Alarm system installation, camera setup, and security assessments.'
  },
  {
    title: 'Pest Control',
    icon: <FireIcon className="w-8 h-8 text-blue-500" />,
    description: 'Safe and effective solutions for all common household pests.'
  },
  {
    title: 'Moving & Storage',
    icon: <InboxIcon className="w-8 h-8 text-blue-500" />,
    description: 'Local moving assistance and secure storage solutions.'
  }
];

export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

const HomeServicesPage = ({ recaptchaSiteKey }: { recaptchaSiteKey: string }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRecaptchaConfigured() && !recaptchaValue) {
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
          subject: 'Home Service Request',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <>
      <Head>
        <title>Home Services | San Luis Way - Reliable Home Support</title>
        <meta name="description" content="Comprehensive home services in San Luis Potosí, including repairs, cleaning, utility setup, and contractor sourcing." />
        <meta name="keywords" content="home services, home repairs, cleaning services, utility setup, contractors, San Luis Potosí" />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/housing-services/hero.png"
          alt="Comfortable and clean home interior"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Home Services</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Reliable and professional home services to make your life easier. From maintenance to cleaning, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {homeServices.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 text-gray-800 py-16">
        <div className="container mx-auto px-4">
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Request Home Services</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Thank you for your request!</p>
                  <p>We've received it and will get back to you shortly.</p>
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe the services you need..."
                    />
                  </div>

                  {isRecaptchaConfigured() && (
                    <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaSiteKey}
                        onChange={handleRecaptchaChange}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-center text-red-600 mt-4">
                        Please complete the reCAPTCHA or try again later.
                    </p>
                  )}
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomeServicesPage;