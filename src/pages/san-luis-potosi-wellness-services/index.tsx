import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  HeartIcon,
  SparklesIcon,
  SunIcon,
  BeakerIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const wellnessServices = [
  {
    title: 'Mental Health Support',
    icon: <HeartIcon className="w-8 h-8 text-rose-500" />,
    description: 'Access to therapists and counselors'
  },
  {
    title: 'Fitness & Recreation',
    icon: <SparklesIcon className="w-8 h-8 text-rose-500" />,
    description: 'Find gyms, personal trainers, and sports clubs'
  },
  {
    title: 'Holistic Health',
    icon: <SunIcon className="w-8 h-8 text-rose-500" />,
    description: 'Yoga, meditation, acupuncture, and more'
  },
  {
    title: 'Nutritional Guidance',
    icon: <BeakerIcon className="w-8 h-8 text-rose-500" />,
    description: 'Connect with nutritionists and dietitians'
  },
  {
    title: 'Support Networks',
    icon: <UserGroupIcon className="w-8 h-8 text-rose-500" />,
    description: 'Join wellness groups and communities'
  },
  {
    title: 'Health Coaching',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-rose-500" />,
    description: 'Personalized coaching to achieve your health goals'
  }
];

export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

export default function WellnessServicesPage({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
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
          subject: 'Wellness Service Inquiry',
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
        <title>Health & Wellness Services | San Luis Way</title>
        <meta name="description" content="Holistic wellness services for expats in San Luis Potosí, including mental health, fitness, and nutritional support." />
        <meta name="keywords" content="health and wellness, mental health, fitness, nutrition, holistic health, san luis potosi" />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/practical-categories/english-speaking-healthcare.jpg"
          alt="A person meditating in a peaceful setting"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-teal-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Health & Wellness</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Your guide to health and wellness in San Luis Potosí. Access quality healthcare, fitness centers, and mental health support.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {wellnessServices.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-rose-100 rounded-full mb-4">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us for Wellness Support</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Thank you for your inquiry!</p>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Tell us about your wellness goals..."
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
                    className="w-full bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50"
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