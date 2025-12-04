import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  MapIcon,
  TicketIcon,
  CameraIcon,
  UsersIcon,
  SunIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const localExperiences = [
    {
      title: 'City Tours',
      icon: <MapIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Explore the historic center and hidden gems.',
    },
    {
      title: 'Event Access',
      icon: <TicketIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Get tickets to festivals, concerts, and local events.',
    },
    {
      title: 'Photo Walks',
      icon: <CameraIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Discover the most photogenic spots in the city.',
    },
    {
      title: 'Meetups',
      icon: <UsersIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Connect with locals and expats at social gatherings.',
    },
    {
      title: 'Outdoor Adventures',
      icon: <SunIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Experience the natural beauty surrounding the city.',
    },
    {
      title: 'Local Markets',
      icon: <ShoppingBagIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Discover unique crafts and foods at local markets.',
    },
];


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

export default function LocalExperiences({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
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
      [e.target.name]: e.target.value
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
          subject: 'Local Experiences Inquiry',
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
        <title>Local Experiences | San Luis Way</title>
        <meta
          name="description"
          content="Discover the best local experiences in San Luis Potosí. From city tours to outdoor adventures, we help you connect with the authentic local culture."
        />
        <meta
          name="keywords"
          content="local experiences, city tours, adventures, events, meetups, San Luis Potosí"
        />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/experiences/San-Luis-Potosi-Ciudad.webp"
          alt="View of San Luis Potosí city"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-yellow-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold">Local Experiences</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
             Live the city like a local. Discover authentic tours, activities, and cultural experiences in San Luis Potosí.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {localExperiences.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Plan Your Experience</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We've received your inquiry and will get back to you soon to plan your experience.</p>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Tell us what kind of experience you're looking for..."
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
                    className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>

                  {submitStatus === 'error' && (
                   <p className="text-red-600 text-center">Sorry, there was an error sending your message. Please complete the reCAPTCHA and try again.</p>
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