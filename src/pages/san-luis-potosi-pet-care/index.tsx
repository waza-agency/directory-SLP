import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  HeartIcon,
  HomeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const petServices = [
  {
    title: 'Veterinary Services',
    icon: <HeartIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Access to trusted vets and emergency care'
  },
  {
    title: 'Pet Sitting & Boarding',
    icon: <HomeIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Reliable care for your pets when you are away'
  },
  {
    title: 'Grooming',
    icon: <SparklesIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Professional grooming services to keep your pet looking great'
  },
  {
    title: 'Training & Behavior',
    icon: <UserGroupIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Expert training for a well-behaved companion'
  },
  {
    title: 'Pet Relocation',
    icon: <TruckIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Assistance with national and international pet transport'
  },
  {
    title: 'Pet Insurance',
    icon: <ShieldCheckIcon className="w-8 h-8 text-cyan-500" />,
    description: 'Find the best insurance options for your pet'
  }
];

export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

export default function PetCareServices({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
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
          subject: 'Pet Care Service Request',
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
        <title>Pet Care Services | San Luis Way</title>
        <meta name="description" content="Complete pet care services for expats in San Luis Potosí, including veterinary, grooming, sitting, and relocation support." />
        <meta name="keywords" content="pet care, veterinary, pet grooming, pet sitting, pet relocation, san luis potosi" />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/practical-categories/outdoors.jpeg"
          alt="Happy pet outdoors"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-yellow-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Pet Care Services</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive and compassionate care for your beloved pets. From grooming to veterinary services, we're here for you.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {petServices.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-cyan-100 rounded-full mb-4">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us for Pet Care</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Thank you for your inquiry!</p>
                  <p>We'll get back to you soon with information about our pet services.</p>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Tell us about your pet and the services you need..."
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
                    className="w-full bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
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
}