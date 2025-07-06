import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  PaintBrushIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  CameraIcon,
  TicketIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const culturalServices = [
    {
      title: 'Art Workshops',
      icon: <PaintBrushIcon className="w-8 h-8 text-purple-500" />,
      description: 'Discover your creativity with local art classes.',
    },
    {
      title: 'Music & Dance',
      icon: <MusicalNoteIcon className="w-8 h-8 text-purple-500" />,
      description: 'Experience traditional and contemporary local music.',
    },
    {
      title: 'Literary Tours',
      icon: <BookOpenIcon className="w-8 h-8 text-purple-500" />,
      description: 'Explore the literary history of San Luis Potosí.',
    },
    {
      title: 'Photography Tours',
      icon: <CameraIcon className="w-8 h-8 text-purple-500" />,
      description: 'Capture the beauty of the city with guided tours.',
    },
    {
      title: 'Event Tickets',
      icon: <TicketIcon className="w-8 h-8 text-purple-500" />,
      description: 'Get access to exclusive cultural events and shows.',
    },
    {
      title: 'Historical Site Visits',
      icon: <MapPinIcon className="w-8 h-8 text-purple-500" />,
      description: 'Visit museums, galleries, and historical landmarks.',
    },
];


export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

export default function CulturalServices({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
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
          subject: 'Cultural Services Inquiry',
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
        <title>Cultural Services | San Luis Way</title>
        <meta
          name="description"
          content="Immerse yourself in the rich culture of San Luis Potosí with our specialized cultural services and tours."
        />
        <meta
          name="keywords"
          content="cultural services, art workshops, music, dance, tours, events, San Luis Potosí"
        />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/cultural/cultural-default.jpg"
          alt="Cultural event in San Luis Potosí"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold">Cultural Services</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
             Immerse yourself in the vibrant arts, history, and traditions of San Luis Potosí with our curated cultural experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {culturalServices.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Inquire About Cultural Services</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Thank you for your inquiry!</p>
                  <p>We've received your message and will be in touch with you shortly.</p>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="What cultural experiences are you interested in?"
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
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
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