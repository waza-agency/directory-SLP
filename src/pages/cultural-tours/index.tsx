import { GetStaticProps } from 'next';
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

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function CulturalTours() {
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
          to: 'sanluisway@waza.baby',
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

  // TEST: Ensure the contact form sends to the correct email
  if (process.env.NODE_ENV === 'test') {
    if (typeof window !== 'undefined') {
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          const data = new FormData(form);
          if (data.get('destination') !== 'sanluisway@waza.baby') {
            throw new Error('Contact form does not send to sanluisway@waza.baby');
          }
        });
      }
    }
  }

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
        {/* Enhanced Hero Section - Pure Gold */}
        <div className="relative h-screen bg-gradient-to-r from-amber-300 to-yellow-400 text-white overflow-hidden">
          {/* Background Image with Golden Glow */}
          <div className="absolute inset-0">
            <Image
              src="/images/tours/cultural-tours-hero.jpg"
              alt="Cultural Tours in San Luis Potosí"
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority
            />
            {/* Golden Overlay - Pure gold layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/70 via-amber-400/40 to-yellow-500/50"></div>

            {/* Golden Shine Effect - Enhanced */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-yellow-200/20 blur-3xl"></div>
              <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-200/10 blur-3xl"></div>
            </div>

            {/* Golden Particles */}
            <div className="absolute inset-0 bg-repeat opacity-5"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />

            {/* Gold dust particles */}
            <div className="absolute inset-0 overflow-hidden mix-blend-soft-light">
              <div className="absolute h-full w-full bg-fixed opacity-40"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-10 0v-9h-9v9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundColor: `transparent`,
                   }}
              ></div>
            </div>
          </div>

          {/* Decorative Top Border - Blue */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-90" />

          {/* Decorative Bottom Border - Golden */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 opacity-75" />

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto text-center">
              {/* Decorative Line */}
              <div className="w-28 h-1 bg-blue-500 mx-auto mb-8 shadow-lg" />

              {/* Subtitle */}
              <p className="text-blue-100 text-lg font-medium tracking-wider uppercase mb-6 drop-shadow-lg">
                Experience the Rich Heritage
              </p>

              {/* Main Title - Enhanced with more glow */}
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
                Cultural Tours in
                <span className="block text-white text-glow-gold">San Luis Potosí</span>
              </h1>

              {/* Description - Better contrast */}
              <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-light">
                Immerse yourself in centuries of history, art, and tradition through our carefully curated tours. From colonial architecture to vibrant nightlife.
              </p>

              {/* CTA Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    const element = document.getElementById('booking-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-colors duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Your Tour Now
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('tour-packages');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-amber-500/30 backdrop-blur-sm border-2 border-white/70 rounded-full font-bold text-lg hover:bg-amber-500/40 transition-all duration-300 text-white"
                >
                  Explore Tours
                </button>
              </div>
            </div>

            {/* Enhanced Scroll Indicator - Even more noticeable */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
              <div onClick={() => {
                const element = document.getElementById('tour-packages');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer transition-all">
                <p className="mb-3 font-semibold text-white drop-shadow-lg text-lg group-hover:text-blue-200 transition-colors">
                  View Our Tours
                </p>
                <div className="flex flex-col items-center animate-bounce">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <ChevronDownIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mt-2 w-24 h-0.5 bg-white/50 mx-auto group-hover:bg-blue-200/50 transition-colors"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Packages Section - Enhanced separator and visual elements */}
        <section id="tour-packages" className="py-24 px-4 relative bg-gradient-to-b from-amber-50 to-white">
          {/* Visual separator elements */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-100/80 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-amber-500/30"></div>

          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Cultural Tours</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from our selection of guided tours designed to showcase the best of San Luis Potosí's culture and history.
              </p>
            </div>

            {/* Tour cards with enhanced visual appearance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {tourPackages.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-72">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{tour.title}</h3>
                      <div className="flex items-center text-amber-200 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{tour.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{tour.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="w-5 h-5 mr-2 text-amber-600" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <UserGroupIcon className="w-5 h-5 mr-2 text-amber-600" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="w-5 h-5 mr-2 text-amber-600" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-amber-600" />
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
                        <LanguageIcon className="w-5 h-5 mr-2 text-amber-600" />
                        <span>{tour.languages.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => {
                          const element = document.getElementById('booking-form');
                          element?.scrollIntoView({ behavior: 'smooth' });
                          setFormData(prev => ({ ...prev, tourType: tour.title }));
                        }}
                        className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-500 transition-colors shadow-md hover:shadow-lg"
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

        {/* Booking Form Section - Updated design to match */}
        <section id="booking-form" className="py-24 px-4 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Book Your Tour</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to request a tour booking. We'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  min={new Date().toISOString().split[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-center font-medium">Your booking request has been sent successfully!</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-center font-medium">Failed to send booking request. Please try again.</p>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>

      {/* Add CSS variables for the text glow effect */}
      <style jsx global>{`
        .text-glow-gold {
          text-shadow: 0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.6), 0 0 45px rgba(251, 191, 36, 0.4);
        }
      `}</style>
    </>
  );
}