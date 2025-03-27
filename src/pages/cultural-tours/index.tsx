import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  price: string;
  location: string;
  languages: string[];
  highlights: string[];
  imageUrl: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  tourType: string;
  groupSize: string;
  preferredDate: string;
  preferredLanguage: string;
  specialRequirements: string;
}

const tourPackages: TourPackage[] = [
  {
    id: '7-bares',
    title: '7 Bares Historical Tour',
    description: 'Experience the vibrant nightlife and rich history of San Luis Potosí through its most iconic bars. Each venue tells a unique story of the city\'s past while offering local drinks and atmosphere.',
    duration: '4-5 hours',
    groupSize: '4-12 people',
    price: 'From $600 MXN per person',
    location: 'Centro Histórico',
    languages: ['Spanish', 'English'],
    highlights: [
      'Visit 7 historic bars in the city center',
      'Learn about local drinking traditions',
      'Taste traditional Mexican spirits',
      'Hear fascinating stories about each venue',
      'Experience authentic potosino nightlife'
    ],
    imageUrl: '/images/tours/7-bares-tour.jpg'
  },
  {
    id: '7-barrios',
    title: '7 Barrios Churches Tour',
    description: 'Discover the architectural and religious heritage of San Luis Potosí through its seven traditional neighborhoods and their historic churches.',
    duration: '3-4 hours',
    groupSize: '2-15 people',
    price: 'From $400 MXN per person',
    location: 'Various Neighborhoods',
    languages: ['Spanish', 'English', 'French'],
    highlights: [
      'Visit 7 historic neighborhood churches',
      'Learn about colonial architecture',
      'Discover local religious traditions',
      'Photography opportunities',
      'Cultural and historical insights'
    ],
    imageUrl: '/images/tours/7-barrios-tour.jpg'
  },
  {
    id: 'art-museums',
    title: 'Art Museums Circuit',
    description: 'Explore the rich artistic heritage of San Luis Potosí through its world-class museums and galleries, featuring both traditional and contemporary art.',
    duration: '3 hours',
    groupSize: '2-10 people',
    price: 'From $350 MXN per person',
    location: 'Centro Histórico & Cultural District',
    languages: ['Spanish', 'English'],
    highlights: [
      'Visit to Centro de las Artes',
      'MUREF Museum tour',
      'Contemporary art galleries',
      'Local artists\' workshops',
      'Cultural history exploration'
    ],
    imageUrl: '/images/tours/art-museums-tour.jpg'
  },
  {
    id: 'city-landmarks',
    title: 'Essential City Landmarks Tour',
    description: 'A comprehensive tour of San Luis Potosí\'s most important historical and cultural landmarks, perfect for first-time visitors.',
    duration: '4 hours',
    groupSize: '2-20 people',
    price: 'From $300 MXN per person',
    location: 'Centro Histórico',
    languages: ['Spanish', 'English', 'French'],
    highlights: [
      'Plaza de Armas',
      'Government Palace murals',
      'San Luis Potosí Cathedral',
      'Traditional markets',
      'Historic buildings and monuments'
    ],
    imageUrl: '/images/tours/city-landmarks-tour.jpg'
  }
];

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function CulturalTours() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    tourType: '',
    groupSize: '',
    preferredDate: '',
    preferredLanguage: '',
    specialRequirements: ''
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
          to: 'tours@sanluisway.com',
          subject: 'Cultural Tour Inquiry',
          recaptchaToken: recaptchaValue
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          tourType: '',
          groupSize: '',
          preferredDate: '',
          preferredLanguage: '',
          specialRequirements: ''
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Head>
        <title>Cultural Tours in San Luis Potosí | San Luis Way</title>
        <meta 
          name="description" 
          content="Discover the rich cultural heritage of San Luis Potosí through our curated tours. From historic bars to religious architecture and art museums." 
        />
        <meta 
          name="keywords" 
          content="San Luis Potosí tours, cultural tours, 7 bares tour, church tours, art museums, guided tours" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Hero Section */}
        <div className="relative min-h-[90vh] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/tours/cultural-tours-hero.jpg"
              alt="Cultural Tours in San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-repeat opacity-10"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />
          </div>

          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 opacity-75" />

          {/* Content */}
          <div className="relative container mx-auto px-4 py-24 min-h-[90vh] flex flex-col justify-center">
            {/* Decorative Element - Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-r from-blue-500/20 to-transparent" />
            
            {/* Decorative Element - Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-l from-blue-500/20 to-transparent" />

            <div className="max-w-4xl mx-auto text-center">
              {/* Decorative Line */}
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
              
              {/* Subtitle */}
              <p className="text-yellow-400 text-lg font-medium tracking-wider uppercase mb-6">
                Experience the Rich Heritage
              </p>

              {/* Main Title */}
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                Cultural Tours in
                <span className="block text-yellow-400">San Luis Potosí</span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
                Immerse yourself in centuries of history, art, and tradition through our carefully curated tours. From colonial architecture to vibrant nightlife.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button 
                  onClick={() => {
                    const element = document.getElementById('booking-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Your Tour Now
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('tour-packages');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Explore Tours
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDownIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tour Packages Section */}
        <section id="tour-packages" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Tour Packages</h2>
              <p className="text-lg text-gray-600 mt-4">
                Choose from our selection of guided tours designed to showcase the best of San Luis Potosí's culture and history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tourPackages.map((tour) => (
                <div 
                  key={tour.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tour.title}</h3>
                    <p className="text-gray-600 mb-6">{tour.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <UserGroupIcon className="w-5 h-5 mr-2" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                        <span>{tour.price}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Tour Highlights:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <LanguageIcon className="w-5 h-5 mr-2" />
                        <span>{tour.languages.join(', ')}</span>
                      </div>
                      <button 
                        onClick={() => {
                          const element = document.getElementById('booking-form');
                          element?.scrollIntoView({ behavior: 'smooth' });
                          setFormData(prev => ({ ...prev, tourType: tour.title }));
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-form" className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Book Your Tour</h2>
              <p className="text-lg text-gray-600 mt-4">
                Fill out the form below to request a tour booking. We'll get back to you within 24 hours.
              </p>
            </div>

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
                <label htmlFor="tourType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Package
                </label>
                <select
                  id="tourType"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a tour</option>
                  {tourPackages.map(tour => (
                    <option key={tour.id} value={tour.title}>{tour.title}</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select group size</option>
                  <option value="1-2">1-2 people</option>
                  <option value="3-5">3-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11+">11+ people</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language
                </label>
                <select
                  id="preferredLanguage"
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select language</option>
                  <option value="Spanish">Spanish</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requirements or Questions
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requirements, dietary restrictions, or questions about the tour?"
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
                {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">Your booking request has been sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">Failed to send booking request. Please try again.</p>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
} 