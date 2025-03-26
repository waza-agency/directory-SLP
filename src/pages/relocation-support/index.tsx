import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  TruckIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  currentLocation: string;
  familySize: string;
  plannedMoveDate: string;
  visaStatus: string;
  housingPreference: string;
  schoolingNeeds: string;
  additionalServices: string[];
  message: string;
}

const relocationServices = [
  {
    title: 'Immigration Support',
    icon: <DocumentTextIcon className="w-8 h-8 text-purple-500" />,
    description: 'Expert assistance with visas and permits',
    services: [
      'Visa Application Support',
      'Work Permit Processing',
      'Document Translation',
      'Legal Consultation',
      'Immigration Status Changes',
      'Family Visa Support'
    ]
  },
  {
    title: 'Housing Solutions',
    icon: <HomeIcon className="w-8 h-8 text-purple-500" />,
    description: 'Find your perfect home in San Luis Potosí',
    services: [
      'Property Search',
      'Lease Negotiation',
      'Utility Setup',
      'Home Inspection',
      'Furniture Rental',
      'Area Orientation'
    ]
  },
  {
    title: 'Education Services',
    icon: <AcademicCapIcon className="w-8 h-8 text-purple-500" />,
    description: 'Educational support for the whole family',
    services: [
      'School Selection',
      'Enrollment Assistance',
      'Language Programs',
      'Academic Assessment',
      'Tutoring Services',
      'Educational Consulting'
    ]
  },
  {
    title: 'Settlement Services',
    icon: <BuildingOfficeIcon className="w-8 h-8 text-purple-500" />,
    description: 'Comprehensive settling-in assistance',
    services: [
      'Bank Account Setup',
      'Healthcare Registration',
      'Insurance Arrangement',
      'Mobile Phone Setup',
      'Driver License Support',
      'Local Registration'
    ]
  }
];

const additionalServices = [
  'Moving Services',
  'Language Classes',
  'Cultural Training',
  'Pet Relocation',
  'Vehicle Import',
  'Tax Consultation',
  'Career Support',
  'Spouse Programs'
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function RelocationSupport() {
  const { t } = useTranslation('common');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    currentLocation: '',
    familySize: '',
    plannedMoveDate: '',
    visaStatus: '',
    housingPreference: '',
    schoolingNeeds: '',
    additionalServices: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          to: 'info@sanluisway.com',
          subject: 'Relocation Support Request'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          nationality: '',
          currentLocation: '',
          familySize: '',
          plannedMoveDate: '',
          visaStatus: '',
          housingPreference: '',
          schoolingNeeds: '',
          additionalServices: [],
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'additionalServices') {
      const select = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
      setFormData(prev => ({
        ...prev,
        additionalServices: selectedOptions
      }));
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
        <title>Relocation Support | San Luis Way - Expert Expat Services</title>
        <meta 
          name="description" 
          content="Comprehensive relocation support services in San Luis Potosí. From visa processing to settling in, we help make your move smooth and stress-free." 
        />
        <meta 
          name="keywords" 
          content="relocation services, San Luis Potosí, immigration support, housing, education, settlement services, expat services" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/relocation-support/hero.jpg"
              alt="Relocation Support in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Relocation Support</h1>
              <p className="text-xl mb-8">
                Your trusted partner for a smooth transition to San Luis Potosí. We provide comprehensive 
                relocation services tailored to expats and their families.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Experienced team with deep knowledge of local regulations and procedures.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Family-Focused</h3>
                <p className="text-gray-600">
                  Comprehensive support for the whole family's transition needs.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
                <p className="text-gray-600">
                  End-to-end support to ensure a smooth and stress-free relocation.
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relocationServices.map((service, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl
                    ${selectedService === service.title ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={() => handleServiceChange(service.title)}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.services.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Relocation Support</h2>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    id="currentLocation"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 mb-1">
                    Family Size
                  </label>
                  <select
                    id="familySize"
                    name="familySize"
                    value={formData.familySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select family size</option>
                    <option value="single">Single</option>
                    <option value="couple">Couple</option>
                    <option value="family-3">Family of 3</option>
                    <option value="family-4">Family of 4</option>
                    <option value="family-5+">Family of 5+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="plannedMoveDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Planned Move Date
                  </label>
                  <input
                    type="date"
                    id="plannedMoveDate"
                    name="plannedMoveDate"
                    value={formData.plannedMoveDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="visaStatus" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Visa Status
                  </label>
                  <select
                    id="visaStatus"
                    name="visaStatus"
                    value={formData.visaStatus}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select visa status</option>
                    <option value="none">No Visa Yet</option>
                    <option value="tourist">Tourist Visa</option>
                    <option value="work">Work Visa</option>
                    <option value="student">Student Visa</option>
                    <option value="permanent">Permanent Resident</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="housingPreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Housing Preference
                  </label>
                  <select
                    id="housingPreference"
                    name="housingPreference"
                    value={formData.housingPreference}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select housing preference</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="furnished">Furnished Property</option>
                    <option value="unfurnished">Unfurnished Property</option>
                    <option value="temporary">Temporary Housing</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="schoolingNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                    Schooling Needs
                  </label>
                  <select
                    id="schoolingNeeds"
                    name="schoolingNeeds"
                    value={formData.schoolingNeeds}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select schooling needs</option>
                    <option value="none">No School-Age Children</option>
                    <option value="preschool">Preschool</option>
                    <option value="primary">Primary School</option>
                    <option value="secondary">Secondary School</option>
                    <option value="international">International School</option>
                    <option value="multiple">Multiple Levels</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalServices" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Services Needed
                  </label>
                  <select
                    id="additionalServices"
                    name="additionalServices"
                    value={formData.additionalServices}
                    onChange={handleChange}
                    multiple
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {additionalServices.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Please share any specific requirements, concerns, or questions about your relocation..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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