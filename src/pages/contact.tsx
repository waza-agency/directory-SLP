import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Contact: NextPage = () => {
  const router = useRouter();
  const { service } = router.query;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  useEffect(() => {
    if (service && typeof service === 'string') {
      setFormData(prev => ({ ...prev, service }));
    }
  }, [service]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Form submitted! In a real application, this would send data to a server.');
    console.log(formData);
  };
  
  return (
    <>
      <Head>
        <title>Contact | SLP Descubre</title>
        <meta name="description" content="Contact our team for personalized expatriate services in San Luis Potosí" />
      </Head>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/contact-bg.jpg"
              alt="Contact Us"
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Let us know how we can assist you with your transition to San Luis Potosí
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-elegant p-8">
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  Contact Us
                </h2>
                
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service You're Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="relocation">Relocation Assistance</option>
                      <option value="housing">Housing Services</option>
                      <option value="legal">Legal Support</option>
                      <option value="community">Community Integration</option>
                      <option value="family">Family Support</option>
                      <option value="petcare">Pet Care Solutions</option>
                      <option value="wellness">Health & Wellness</option>
                      <option value="homeservices">Home Services</option>
                      <option value="cultural">Cultural Experience</option>
                      <option value="experiences">Local Experiences</option>
                      <option value="other">Other (please specify)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col">
                <div className="bg-secondary/5 rounded-xl p-8 mb-8">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
                    How We Can Help
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Relocation Support</h4>
                        <p className="text-gray-600 text-sm">We'll help you navigate visa paperwork, official registrations, and all essential documentation.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Housing Services</h4>
                        <p className="text-gray-600 text-sm">We can help you find the perfect home, navigate rental agreements, and set up utilities.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Personalized Assistance</h4>
                        <p className="text-gray-600 text-sm">From family support to pet care, wellness services and social connections, we've got you covered.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-elegant p-8">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
                        <a href="tel:+524441234567" className="text-primary hover:underline">+52 444 123 4567</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Email</h4>
                        <a href="mailto:info@slpdescubre.com" className="text-primary hover:underline">info@slpdescubre.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Address</h4>
                        <p className="text-gray-600">Av. Venustiano Carranza 2425, San Luis Potosí, S.L.P., Mexico</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Hours</h4>
                        <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                        <p className="text-gray-600">Weekends: By appointment only</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium text-gray-900 text-sm mb-3">Follow Us</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};

export default Contact; 