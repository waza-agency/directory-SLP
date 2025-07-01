import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export const getServerSideProps: GetServerSideProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [stats, setStats] = useState<{ placesCount: number | null; servicesCount: number | null }>({ placesCount: null, servicesCount: null });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  useEffect(() => {
    async function fetchStats() {
      setStatsLoading(true);
      setStatsError(false);
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats({ placesCount: data.placesCount, servicesCount: data.servicesCount });
      } catch (e) {
        setStatsError(true);
        setStats({ placesCount: null, servicesCount: null });
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaValue) {
      setSubmitError('Please verify that you are not a robot');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          service: data.subject,
          to: 'info@sanluisway.com',
          recaptchaToken: recaptchaValue
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
    if (!token) {
      setSubmitError('Please verify that you are not a robot');
    } else {
      setSubmitError('');
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | SLP Descubre</title>
        <meta
          name="description"
          content="Get in touch with SLP Descubre. We're here to help you discover and make the most of San Luis Potosí."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with About Us */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're passionate about helping newcomers and locals alike discover the beauty, culture,
                and opportunities in San Luis Potosí. Whether you're planning to visit, relocate, or
                already call SLP home, we're here to make your experience exceptional.
              </p>
              <p className="text-xl text-primary font-semibold mt-8">
                If you have questions, need assistance, or have a cool project we can collaborate on, just say hi and reach out!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white rounded-2xl shadow-elegant p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitSuccess ? (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: 'Message is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                      onChange={handleRecaptchaChange}
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !recaptchaValue}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}