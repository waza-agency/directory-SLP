import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaConfigured } from '../../utils/recaptcha';
import {
  HeartIcon,
  AcademicCapIcon,
  PlayIcon,
  ChatBubbleBottomCenterTextIcon,
  FaceSmileIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      recaptchaSiteKey: getRecaptchaSiteKey(),
    },
  };
};

export default function FamilySupportServices({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const familyServices = [
    {
      title: t('familySupport.childcare'),
      icon: <HeartIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.childcareDesc'),
    },
    {
      title: t('familySupport.education'),
      icon: <AcademicCapIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.educationDesc'),
    },
    {
      title: t('familySupport.activities'),
      icon: <PlayIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.activitiesDesc'),
    },
    {
      title: t('familySupport.workshops'),
      icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.workshopsDesc'),
    },
    {
      title: t('familySupport.supportGroups'),
      icon: <FaceSmileIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.supportGroupsDesc'),
    },
    {
      title: t('familySupport.healthcare'),
      icon: <ShieldCheckIcon className="w-8 h-8 text-pink-500" />,
      description: t('familySupport.healthcareDesc'),
    },
  ];

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
          subject: 'Family Support Inquiry',
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
        <title>{t('familySupport.pageTitle')}</title>
        <meta name="description" content={t('familySupport.metaDescription')} />
        <meta name="keywords" content="family support, childcare, schools, parenting, expat families, san luis potosi" />
      </Head>

      <div className="relative h-96 w-full">
        <Image
          src="/images/practical-categories/family-activities.webp"
          alt="Family enjoying an activity in San Luis Potosí"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">{t('familySupport.heroTitle')}</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              {t('familySupport.heroDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.ourServices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {familyServices.map((service) => (
              <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('familySupport.contactTitle')}</h2>
              {submitStatus === 'success' ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">{t('forms.thankYou')}</p>
                  <p>{t('forms.weWillContact')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('forms.yourName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('forms.emailAddress')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('forms.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder={t('familySupport.messagePlaceholder')}
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
                    className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t('forms.sending') : t('forms.sendMessage')}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-center text-red-600 mt-4">
                      {t('forms.recaptchaError')}
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
