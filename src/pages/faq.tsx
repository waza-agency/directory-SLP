import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      title: 'General Questions',
      questions: [
        {
          question: 'What is SLP Descubre?',
          answer: 'SLP Descubre is your comprehensive guide to discovering the rich cultural heritage and vibrant community of San Luis Potosí. We help expatriates navigate the city\'s cultural landscape with curated recommendations and local insights.'
        },
        {
          question: 'How can I get involved in the expat community?',
          answer: 'Join our community events, language exchange meetups, and cultural workshops. We also have a dedicated expat forum and monthly social gatherings.'
        },
        {
          question: 'What resources are available for newcomers?',
          answer: 'We provide comprehensive guides covering housing, healthcare, banking, and cultural adaptation. Our living guide and expat guide are essential resources for settling in San Luis Potosí.'
        }
      ]
    },
    {
      title: 'Cultural Activities',
      questions: [
        {
          question: 'How do I book a historical tour?',
          answer: 'You can book a historical tour through our online booking system or contact us directly. Tours are available in English and Spanish, with experienced guides who specialize in the city\'s rich history.'
        },
        {
          question: 'When is the best time to visit for festivals?',
          answer: 'The city hosts major festivals throughout the year, but the most popular are during Feria Nacional Potosina (August), Festival de la Luz (September), and Día de los Muertos celebrations (November).'
        },
        {
          question: 'How can I participate in local festivals?',
          answer: 'Many festivals are open to public participation. We recommend joining our cultural workshops and community events to learn about traditional celebrations and customs.'
        }
      ]
    },
    {
      title: 'Language and Communication',
      questions: [
        {
          question: 'What Spanish classes are available?',
          answer: 'We offer various Spanish classes including beginner to advanced levels, business Spanish, and cultural immersion programs. Classes are available in small groups or private sessions.'
        },
        {
          question: 'How do I find a language exchange partner?',
          answer: 'Join our language exchange program where we match you with native Spanish speakers interested in learning your language. This creates a perfect environment for mutual learning.'
        },
        {
          question: 'What translation services do you offer?',
          answer: 'We provide professional translation services for documents, legal papers, medical records, and business communications. Our translators are certified and experienced in various fields.'
        }
      ]
    },
    {
      title: 'Practical Information',
      questions: [
        {
          question: 'How do I stay updated with local events?',
          answer: 'Subscribe to our newsletter for weekly updates on cultural events, community gatherings, and important local information. You can also follow us on social media for real-time updates.'
        },
        {
          question: 'What historical sites should I visit first?',
          answer: 'Start with the UNESCO World Heritage sites in the historic center, including the Plaza de Armas, Catedral Metropolitana, and Palacio de Gobierno. These landmarks offer the best introduction to the city\'s colonial heritage.'
        },
        {
          question: 'Are there family-friendly festivals?',
          answer: 'Yes, most festivals in San Luis Potosí are family-friendly. We provide specific guides for family activities during major celebrations.'
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about living in San Luis Potosí, cultural activities, language learning, and more to help make your expatriate experience smoother."
        keywords="FAQ, San Luis Potosí, expat guide, cultural activities, language learning, festivals, historical tours, Mexico relocation, living in SLP, expatriate questions"
        ogType="website"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Background */}
        <section className="relative h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/teatro-de-la-paz.jpg"
              alt="Teatro de la Paz, San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
            <div className="max-w-4xl">
              <div className="mb-4 flex items-center">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                  Your questions answered
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Find answers to common questions about living, working, and exploring San Luis Potosí. Our comprehensive FAQ covers everything from cultural insights to practical information.
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-sm">
                      <button
                        onClick={() => setOpenFaq(openFaq === faq.question ? null : faq.question)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                      >
                        <span className="text-lg font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <svg
                          className={`h-5 w-5 text-gray-500 transform transition-transform ${
                            openFaq === faq.question ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openFaq === faq.question && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-8">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
}