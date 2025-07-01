import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  UserGroupIcon,
  CalendarIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CameraIcon,
  MusicalNoteIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  experienceType: string;
  groupSize: string;
  preferredDates: string;
  languagePreference: string;
  specialRequirements: string;
}

const culturalExperiences = [
  {
    title: 'Traditional Workshops',
    icon: <AcademicCapIcon className="w-8 h-8 text-orange-500" />,
    description: 'Learn authentic Mexican crafts and traditions',
    activities: [
      'Pottery Making',
      'Traditional Cooking',
      'Textile Weaving',
      'Folk Art Creation',
      'Mezcal Tasting',
      'Dance Lessons'
    ],
    duration: '2-4 hours',
    groupSize: '4-12 people'
  },
  {
    title: 'Cultural Tours',
    icon: <GlobeAltIcon className="w-8 h-8 text-orange-500" />,
    description: 'Explore the rich history and heritage of San Luis Potosí',
    activities: [
      'Historic Center Tours',
      'Museum Visits',
      'Architecture Walks',
      'Religious Sites',
      'Mining History',
      'Cultural Landmarks'
    ],
    duration: '3-6 hours',
    groupSize: '6-15 people'
  },
  {
    title: 'Local Experiences',
    icon: <UserGroupIcon className="w-8 h-8 text-orange-500" />,
    description: 'Immerse yourself in local life and traditions',
    activities: [
      'Market Tours',
      'Cooking with Families',
      'Festival Participation',
      'Community Events',
      'Local Celebrations',
      'Traditional Games'
    ],
    duration: '2-8 hours',
    groupSize: '2-8 people'
  },
  {
    title: 'Arts & Entertainment',
    icon: <MusicalNoteIcon className="w-8 h-8 text-orange-500" />,
    description: 'Experience the vibrant arts scene',
    activities: [
      'Music Performances',
      'Theater Shows',
      'Art Galleries',
      'Dance Exhibitions',
      'Cultural Festivals',
      'Film Screenings'
    ],
    duration: '2-4 hours',
    groupSize: '1-20 people'
  }
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function CulturalExperiences() {
  const [selectedExperience, setSelectedExperience] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    experienceType: '',
    groupSize: '',
    preferredDates: '',
    languagePreference: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleExperienceChange = (experience: string) => {
    setSelectedExperience(experience);
    setFormData(prev => ({
      ...prev,
      experienceType: experience
    }));
  };

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
          subject: `Cultural Experience Request: ${formData.experienceType}`,
          message: `
Experience Request Details:
------------------------
Experience Type: ${formData.experienceType}
Group Size: ${formData.groupSize}
Preferred Dates: ${formData.preferredDates}
Language Preference: ${formData.languagePreference}

Special Requirements:
${formData.specialRequirements || 'None specified'}
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experienceType: '',
          groupSize: '',
          preferredDates: '',
          languagePreference: '',
          specialRequirements: ''
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>Cultural Experiences | San Luis Way - Authentic Cultural Immersion</title>
        <meta 
          name="description" 
          content="Immerse yourself in the rich culture of San Luis Potosí through authentic workshops, tours, and local experiences. Connect with traditions, arts, and the local community." 
        />
        <meta 
          name="keywords" 
          content="cultural experiences, San Luis Potosí, workshops, tours, local traditions, arts, cultural immersion, Mexican culture" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural-experiences/hero.jpg"
              alt="Cultural Experiences in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Cultural Experiences</h1>
              <p className="text-xl mb-8">
                Discover the heart and soul of San Luis Potosí through immersive cultural experiences. 
                From traditional workshops to local celebrations, connect with authentic Mexican culture.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Experiences?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic & Local</h3>
                <p className="text-gray-600">
                  Experience genuine traditions and customs with local artisans and families.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Small Groups</h3>
                <p className="text-gray-600">
                  Intimate group sizes ensure personal attention and meaningful connections.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cultural Exchange</h3>
                <p className="text-gray-600">
                  Create lasting memories while supporting local communities and traditions.
                </p>
              </div>
            </div>
          </section>

          {/* Experiences Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {culturalExperiences.map((experience, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl
                    ${selectedExperience === experience.title ? 'ring-2 ring-orange-500' : ''}`}
                  onClick={() => handleExperienceChange(experience.title)}
                >
                  <div className="mb-4">{experience.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Activities:</p>
                      <div className="mt-2 space-y-2">
                        {experience.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {experience.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        {experience.groupSize}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book an Experience</h2>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="experienceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Type
                  </label>
                  <select
                    id="experienceType"
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select an experience</option>
                    {culturalExperiences.map((experience, index) => (
                      <option key={index} value={experience.title}>
                        {experience.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select group size</option>
                    <option value="1-2">1-2 people</option>
                    <option value="3-5">3-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11+">11+ people</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredDates" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Dates
                  </label>
                  <input
                    type="date"
                    id="preferredDates"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="languagePreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Language Preference
                  </label>
                  <select
                    id="languagePreference"
                    name="languagePreference"
                    value={formData.languagePreference}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Bilingual">Bilingual (English & Spanish)</option>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any special requirements or considerations for your experience..."
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
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Book Experience'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center">Your booking request has been sent successfully!</p>
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