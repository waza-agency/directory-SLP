import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const { t } = useTranslation('common');
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
      <Head>
        <title>Frequently Asked Questions - SLP Descubre</title>
        <meta name="description" content="Find answers to common questions about living in San Luis Potosí, cultural activities, language learning, and more." />
        <meta name="keywords" content="FAQ, San Luis Potosí, expat guide, cultural activities, language learning, festivals, historical tours" />
        <meta property="og:title" content="Frequently Asked Questions - SLP Descubre" />
        <meta property="og:description" content="Find answers to common questions about living in San Luis Potosí, cultural activities, language learning, and more." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about living in San Luis Potosí, cultural activities, and more.
            </p>
          </div>
        </div>

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

        <Footer currentPage="home" />
      </main>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
} 