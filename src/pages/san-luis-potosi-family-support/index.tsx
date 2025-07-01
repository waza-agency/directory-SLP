import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  UserGroupIcon,
  AcademicCapIcon,
  HeartIcon,
  BookOpenIcon,
  UserIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  familySize: string;
  childrenAges: string[];
  educationNeeds: string[];
  healthcareNeeds: string;
  languageSupport: string;
  activityInterests: string[];
  specialRequirements: string;
  preferredSchedule: string;
  additionalInformation: string;
}

const familyServices = [
  {
    title: 'Childcare Services',
    icon: <UserGroupIcon className="w-8 h-8 text-purple-500" />,
    description: 'Professional babysitting and childcare solutions',
  },
  {
    title: 'Education Support',
    icon: <AcademicCapIcon className="w-8 h-8 text-purple-500" />,
    description: 'School selection and enrollment assistance',
  },
  {
    title: 'Healthcare Connections',
    icon: <HeartIcon className="w-8 h-8 text-purple-500" />,
    description: 'Access to family doctors and pediatric care',
  },
  {
    title: 'Tutoring Services',
    icon: <BookOpenIcon className="w-8 h-8 text-purple-500" />,
    description: 'Academic support and language tutoring',
  },
  {
    title: 'Family Activities',
    icon: <UserIcon className="w-8 h-8 text-purple-500" />,
    description: 'Organized family events and activities',
  },
  {
    title: 'School Integration',
    icon: <BuildingLibraryIcon className="w-8 h-8 text-purple-500" />,
    description: 'Support with academic and social integration',
  },
];

const educationOptions = [
  'School Search',
  'Enrollment Support',
  'Academic Assessment',
  'Language Classes',
  'Tutoring',
  'Special Education',
  'International Curriculum',
  'After-school Programs',
  'Summer Programs',
  'Parent-Teacher Communication',
];

const activityTypes = [
  'Sports Programs',
  'Art Classes',
  'Music Lessons',
  'Language Classes',
  'Cultural Activities',
  'Educational Trips',
  'Family Events',
  'Outdoor Activities',
  'Social Groups',
  'Holiday Programs',
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function FamilySupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    familySize: '',
    childrenAges: [],
    educationNeeds: [],
    healthcareNeeds: '',
    languageSupport: '',
    activityInterests: [],
    specialRequirements: '',
    preferredSchedule: '',
    additionalInformation: '',
  });
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
          subject: 'Family Support Services Request',
          message: `
Family Support Service Request Details:
------------------------
Family Size: ${formData.familySize}
Children Ages: ${formData.childrenAges.join(', ')}
Education Needs: ${formData.educationNeeds.join(', ')}

Healthcare Needs:
${formData.healthcareNeeds}

Language Support: ${formData.languageSupport}
Activity Interests: ${formData.activityInterests.join(', ')}
Preferred Schedule: ${formData.preferredSchedule}

Special Requirements:
${formData.specialRequirements || 'None specified'}

Additional Information:
${formData.additionalInformation || 'None provided'}
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          familySize: '',
          childrenAges: [],
          educationNeeds: [],
          healthcareNeeds: '',
          languageSupport: '',
          activityInterests: [],
          specialRequirements: '',
          preferredSchedule: '',
          additionalInformation: ''
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
    const { name, value, type } = e.target;
    
    if (type === 'select-multiple') {
      const select = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
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
        <title>Family Support Services | San Luis Way - Supporting Expat Families</title>
        <meta 
          name="description" 
          content="Comprehensive family support services in San Luis Potosí. From childcare to education, we help expat families thrive in their new home." 
        />
        <meta 
          name="keywords" 
          content="family support, San Luis Potosí, childcare, education, healthcare, tutoring, family activities, expat families" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/family-support/hero.jpg"
              alt="Family Support Services in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Family Support Services</h1>
              <p className="text-xl mb-8">
                Comprehensive support for expat families in San Luis Potosí. 
                We help your whole family thrive in your new home.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Family Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Family Support</h2>
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
                    <option value="2">2 members</option>
                    <option value="3">3 members</option>
                    <option value="4">4 members</option>
                    <option value="5">5 members</option>
                    <option value="6+">6+ members</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="childrenAges" className="block text-sm font-medium text-gray-700 mb-1">
                    Children's Age Groups
                  </label>
                  <select
                    id="childrenAges"
                    name="childrenAges"
                    value={formData.childrenAges}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-11">6-11 years</option>
                    <option value="12-15">12-15 years</option>
                    <option value="16-18">16-18 years</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="educationNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                    Education Needs
                  </label>
                  <select
                    id="educationNeeds"
                    name="educationNeeds"
                    value={formData.educationNeeds}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {educationOptions.map((option, index) => (
                      <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="healthcareNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                    Healthcare Needs
                  </label>
                  <select
                    id="healthcareNeeds"
                    name="healthcareNeeds"
                    value={formData.healthcareNeeds}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select healthcare needs</option>
                    <option value="general">General Family Healthcare</option>
                    <option value="pediatric">Pediatric Care</option>
                    <option value="specialist">Specialist Care</option>
                    <option value="dental">Dental Care</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="languageSupport" className="block text-sm font-medium text-gray-700 mb-1">
                    Language Support Needed
                  </label>
                  <select
                    id="languageSupport"
                    name="languageSupport"
                    value={formData.languageSupport}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select language support</option>
                    <option value="none">No Support Needed</option>
                    <option value="children">Children Only</option>
                    <option value="adults">Adults Only</option>
                    <option value="whole-family">Whole Family</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="activityInterests" className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Interests
                  </label>
                  <select
                    id="activityInterests"
                    name="activityInterests"
                    value={formData.activityInterests}
                    onChange={handleChange}
                    multiple
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {activityTypes.map((activity, index) => (
                      <option key={index} value={activity.toLowerCase().replace(/\s+/g, '-')}>
                        {activity}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="preferredSchedule" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Schedule
                  </label>
                  <select
                    id="preferredSchedule"
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select preferred schedule</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-4pm)</option>
                    <option value="evening">Evening (4pm-8pm)</option>
                    <option value="flexible">Flexible</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Please specify any special requirements or considerations for your family..."
                  />
                </div>

                <div>
                  <label htmlFor="additionalInformation" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInformation"
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any other information you'd like to share about your family's needs..."
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