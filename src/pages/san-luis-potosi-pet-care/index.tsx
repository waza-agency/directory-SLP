import { GetStaticProps } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ReCAPTCHA from "react-google-recaptcha";
import {
  HomeIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  petType: string;
  numberOfPets: string;
  serviceType: string[];
  petDetails: {
    age: string;
    breed: string;
    specialNeeds: string;
  };
  schedulePreference: string;
  serviceFrequency: string;
  locationDetails: string;
  vetInfo: string;
  additionalInformation: string;
}

const petServices = [
  {
    title: 'Pet Sitting',
    icon: <HomeIcon className="w-8 h-8 text-orange-500" />,
    description: 'Professional in-home pet care services',
  },
  {
    title: 'Dog Walking',
    icon: <UserGroupIcon className="w-8 h-8 text-orange-500" />,
    description: 'Regular exercise and outdoor activities',
  },
  {
    title: 'Veterinary Support',
    icon: <HeartIcon className="w-8 h-8 text-orange-500" />,
    description: 'Connections with trusted veterinary clinics',
  },
  {
    title: 'Pet Registration',
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-orange-500" />,
    description: 'Assistance with local pet registration',
  },
  {
    title: 'Pet-Friendly Housing',
    icon: <BuildingOfficeIcon className="w-8 h-8 text-orange-500" />,
    description: 'Help finding pet-friendly accommodation',
  },
  {
    title: 'Local Pet Resources',
    icon: <MapPinIcon className="w-8 h-8 text-orange-500" />,
    description: 'Information about pet stores and services',
  },
];

const serviceTypes = [
  'Pet Sitting',
  'Dog Walking',
  'Veterinary Referral',
  'Pet Registration',
  'Housing Search',
  'Pet Transportation',
  'Pet Grooming',
  'Pet Training',
  'Emergency Care',
  'Pet Supplies',
];

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

export default function PetCare() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    petType: '',
    numberOfPets: '',
    serviceType: [],
    petDetails: {
      age: '',
      breed: '',
      specialNeeds: '',
    },
    schedulePreference: '',
    serviceFrequency: '',
    locationDetails: '',
    vetInfo: '',
    additionalInformation: '',
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
          subject: 'Pet Care Services Request',
          message: `
Pet Care Service Request Details:
------------------------
Pet Type: ${formData.petType}
Number of Pets: ${formData.numberOfPets}
Service Types: ${formData.serviceType.join(', ')}

Pet Details:
Age: ${formData.petDetails.age}
Breed: ${formData.petDetails.breed}
Special Needs: ${formData.petDetails.specialNeeds}

Schedule Preference: ${formData.schedulePreference}
Service Frequency: ${formData.serviceFrequency}

Location Details:
${formData.locationDetails}

Veterinarian Information:
${formData.vetInfo}

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
          petType: '',
          numberOfPets: '',
          serviceType: [],
          petDetails: {
            age: '',
            breed: '',
            specialNeeds: ''
          },
          schedulePreference: '',
          serviceFrequency: '',
          locationDetails: '',
          vetInfo: '',
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
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ContactFormData],
          [child]: value
        }
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
        <title>Pet Care Services | San Luis Way - Expert Pet Support</title>
        <meta 
          name="description" 
          content="Professional pet care services in San Luis Potosí. From pet sitting to veterinary support, we ensure your pets are well cared for." 
        />
        <meta 
          name="keywords" 
          content="pet care, San Luis Potosí, pet sitting, dog walking, veterinary support, pet registration, pet-friendly housing" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/pet-care/hero.jpg"
              alt="Pet Care Services in San Luis Potosí"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Pet Care Services</h1>
              <p className="text-xl mb-8">
                Professional pet care services in San Luis Potosí. 
                We ensure your furry family members receive the best care possible.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Pet Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petServices.map((service, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Pet Care Services</h2>
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
                  <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Pet
                  </label>
                  <select
                    id="petType"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select pet type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="small-mammal">Small Mammal</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="numberOfPets" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Pets
                  </label>
                  <select
                    id="numberOfPets"
                    name="numberOfPets"
                    value={formData.numberOfPets}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select number of pets</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5 or more</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                    Services Needed
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    multiple
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple options</p>
                </div>

                <div>
                  <label htmlFor="petDetails.age" className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Age
                  </label>
                  <input
                    type="text"
                    id="petDetails.age"
                    name="petDetails.age"
                    value={formData.petDetails.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 2 years"
                  />
                </div>

                <div>
                  <label htmlFor="petDetails.breed" className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Breed
                  </label>
                  <input
                    type="text"
                    id="petDetails.breed"
                    name="petDetails.breed"
                    value={formData.petDetails.breed}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Labrador Retriever"
                  />
                </div>

                <div>
                  <label htmlFor="petDetails.specialNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Needs or Requirements
                  </label>
                  <textarea
                    id="petDetails.specialNeeds"
                    name="petDetails.specialNeeds"
                    value={formData.petDetails.specialNeeds}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any medical conditions, dietary requirements, or special care needs..."
                  />
                </div>

                <div>
                  <label htmlFor="schedulePreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Preference
                  </label>
                  <select
                    id="schedulePreference"
                    name="schedulePreference"
                    value={formData.schedulePreference}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select schedule preference</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-4pm)</option>
                    <option value="evening">Evening (4pm-8pm)</option>
                    <option value="overnight">Overnight Care</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="serviceFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Frequency
                  </label>
                  <select
                    id="serviceFrequency"
                    name="serviceFrequency"
                    value={formData.serviceFrequency}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select service frequency</option>
                    <option value="one-time">One-time Service</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="as-needed">As Needed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="locationDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Location
                  </label>
                  <textarea
                    id="locationDetails"
                    name="locationDetails"
                    value={formData.locationDetails}
                    onChange={handleChange}
                    rows={2}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your address or preferred service location..."
                  />
                </div>

                <div>
                  <label htmlFor="vetInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Veterinary Information
                  </label>
                  <textarea
                    id="vetInfo"
                    name="vetInfo"
                    value={formData.vetInfo}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Current veterinarian's name and contact information (if available)..."
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any other information you'd like to share about your pets or service needs..."
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