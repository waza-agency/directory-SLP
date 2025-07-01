import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  ScaleIcon,
  DocumentTextIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  urgencyLevel: string;
  message: string;
}

const legalServices = [
  {
    title: 'Residency Permits',
    icon: <IdentificationIcon className="w-8 h-8 text-blue-500" />,
    description: 'Expert assistance with temporary and permanent residency applications',
  },
  {
    title: 'Banking Setup',
    icon: <BanknotesIcon className="w-8 h-8 text-blue-500" />,
    description: 'Help with opening bank accounts and financial services',
  },
  {
    title: 'Tax Consultation',
    icon: <DocumentTextIcon className="w-8 h-8 text-blue-500" />,
    description: 'Professional guidance on tax obligations and compliance',
  },
  {
    title: 'Legal Documentation',
    icon: <ScaleIcon className="w-8 h-8 text-blue-500" />,
    description: 'Support with contracts, agreements, and official documents',
  },
  {
    title: 'Government Procedures',
    icon: <BuildingLibraryIcon className="w-8 h-8 text-blue-500" />,
    description: 'Assistance with local government requirements and registrations',
  },
  {
    title: 'Compliance Services',
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-blue-500" />,
    description: 'Ensuring adherence to local regulations and requirements',
  },
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function LegalAdministrative() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    urgencyLevel: '',
    message: '',
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
          subject: `Legal Administrative Request: ${formData.serviceType}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
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
      <SEO
        title="Legal & Administrative Services in San Luis Potosí"
        description="Professional legal and administrative support for expatriates in SLP. Expert assistance with residency permits, banking setup, tax considerations, and official procedures."
        keywords="legal services, administrative services, San Luis Potosí, residency permits, banking setup, tax consultation, legal documentation, expat legal help, Mexico paperwork, immigration lawyers, visa services, notary public"
        ogImage="/images/legal-administrative/hero.jpg"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/legal-administrative/hero.jpg"
              alt="Legal & Administrative Services in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Legal & Administrative Services</h1>
              <p className="text-xl mb-8">
                Expert guidance through legal and administrative procedures in San Luis Potosí. 
                We ensure compliance and peace of mind for all your official requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Legal & Administrative Support</h2>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select service type</option>
                    <option value="residency">Residency Permits</option>
                    <option value="banking">Banking Setup</option>
                    <option value="tax">Tax Consultation</option>
                    <option value="legal">Legal Documentation</option>
                    <option value="government">Government Procedures</option>
                    <option value="compliance">Compliance Services</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select urgency level</option>
                    <option value="immediate">Immediate (Within 24-48 hours)</option>
                    <option value="urgent">Urgent (Within 1 week)</option>
                    <option value="normal">Normal (Within 2-3 weeks)</option>
                    <option value="flexible">Flexible (No immediate deadline)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any other details about your legal administrative needs..."
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
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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