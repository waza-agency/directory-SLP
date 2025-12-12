import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      title: 'About San Luis Way',
      questions: [
        {
          question: 'What is San Luis Way?',
          answer: 'San Luis Way is your comprehensive digital guide to San Luis Potosí, Mexico. We offer a curated directory of the best places to eat, drink, shop, and explore, along with in-depth articles about the city\'s rich history, baroque architecture, and vibrant culture. Whether you\'re a local, an expat, or a visitor, San Luis Way helps you discover the best of SLP.'
        },
        {
          question: 'Is San Luis Way free to use?',
          answer: 'Yes! San Luis Way is completely free. You can browse our directory, read our blog articles, and subscribe to our newsletter at no cost. We\'re passionate about sharing the beauty of San Luis Potosí with the world.'
        },
        {
          question: 'How can I stay updated with new content?',
          answer: 'Subscribe to our weekly newsletter to receive the latest articles, place recommendations, and local insights directly in your inbox. You can also follow us on Instagram and TikTok @sanluisway for daily content and updates.'
        }
      ]
    },
    {
      title: 'Directory & Places',
      questions: [
        {
          question: 'What types of places can I find on San Luis Way?',
          answer: 'Our directory includes restaurants, cafés, bars, shops, outdoor activities, cultural attractions, and services. Each listing includes details like location, hours, contact information, and our curated recommendations.'
        },
        {
          question: 'How do you select the places featured on the site?',
          answer: 'We personally visit and evaluate each place before adding it to our directory. We focus on quality, authenticity, and places that truly represent the best of San Luis Potosí. We don\'t accept payment for listings - our recommendations are based solely on merit.'
        },
        {
          question: 'Can I suggest a place to be added?',
          answer: 'Absolutely! We love discovering new places. Contact us through our contact form with your recommendation, and we\'ll check it out. If it meets our standards, we\'ll add it to the directory.'
        },
        {
          question: 'I own a business. How can I get listed?',
          answer: 'If you own a quality establishment in San Luis Potosí, reach out to us via our contact page. We\'ll arrange a visit to experience your business firsthand. Remember, we only feature places we genuinely recommend.'
        }
      ]
    },
    {
      title: 'Blog & Content',
      questions: [
        {
          question: 'What topics does your blog cover?',
          answer: 'Our blog features deep-dive articles about San Luis Potosí\'s history, baroque architecture, mining heritage, local traditions, the Huasteca Potosina, gastronomy, festivals, and practical guides for living in or visiting the city.'
        },
        {
          question: 'How often do you publish new articles?',
          answer: 'We publish new content regularly, typically 2-4 articles per month. Each article is thoroughly researched and includes verified information from historical sources, local experts, and our own experiences.'
        },
        {
          question: 'Can I contribute an article or collaborate?',
          answer: 'We\'re open to collaborations with local experts, historians, photographers, and content creators who share our passion for San Luis Potosí. Contact us with your proposal and portfolio.'
        }
      ]
    },
    {
      title: 'For Expats & Visitors',
      questions: [
        {
          question: 'Is San Luis Potosí a good place for expats?',
          answer: 'San Luis Potosí is an excellent choice for expats. It offers a lower cost of living compared to larger Mexican cities, a rich cultural scene, excellent healthcare, a safe environment, and a welcoming local community. The city has a growing expat community while maintaining its authentic Mexican character.'
        },
        {
          question: 'Do I need to speak Spanish to live in SLP?',
          answer: 'While knowing Spanish definitely helps, you can get by with basic Spanish in many situations. However, we highly recommend learning the language to fully enjoy the culture and connect with locals. San Luis Potosí is less touristy than other Mexican cities, so English is less commonly spoken.'
        },
        {
          question: 'What are the must-visit attractions?',
          answer: 'Start with the UNESCO World Heritage historic center, including Plaza de Armas, the Metropolitan Cathedral, Templo del Carmen, and Teatro de la Paz. Don\'t miss the Huasteca Potosina region with its stunning waterfalls like Tamul, and the magical town of Real de Catorce in the desert.'
        },
        {
          question: 'When is the best time to visit?',
          answer: 'San Luis Potosí has a pleasant climate year-round. The best times are during major festivals: Feria Nacional Potosina (August), Festival de la Luz (September-October), and Día de los Muertos (November). Spring (March-May) offers great weather for exploring the Huasteca.'
        }
      ]
    },
    {
      title: 'Newsletter & Contact',
      questions: [
        {
          question: 'What will I receive if I subscribe to the newsletter?',
          answer: 'Our weekly newsletter includes curated place recommendations, new blog articles, upcoming events, local tips, and exclusive content you won\'t find on the website. We respect your inbox - no spam, just quality content about San Luis Potosí.'
        },
        {
          question: 'How can I contact San Luis Way?',
          answer: 'You can reach us via email at info@sanluisway.com or through our contact form. For quick questions, DM us on Instagram @sanluisway. We typically respond within 24-48 hours.'
        },
        {
          question: 'Are you on social media?',
          answer: 'Yes! Follow us on Instagram and TikTok @sanluisway for daily content, stories, reels, and behind-the-scenes looks at life in San Luis Potosí. We share photos, videos, and quick tips that complement our website content.'
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions | San Luis Way"
        description="Find answers to common questions about San Luis Way, our directory of places in San Luis Potosí, our blog content, and tips for expats and visitors."
        keywords="FAQ, San Luis Way, San Luis Potosí, expat guide, places directory, blog, newsletter, Mexico travel, living in SLP"
        ogType="website"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white/90">
                Everything you need to know about San Luis Way and discovering San Luis Potosí
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3 text-sm font-bold">
                    {categoryIndex + 1}
                  </span>
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === `${categoryIndex}-${faqIndex}` ? null : `${categoryIndex}-${faqIndex}`)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={`h-5 w-5 text-primary flex-shrink-0 transform transition-transform duration-200 ${
                            openFaq === `${categoryIndex}-${faqIndex}` ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-200 ${
                        openFaq === `${categoryIndex}-${faqIndex}` ? 'max-h-96' : 'max-h-0'
                      }`}>
                        <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Can't find what you're looking for? We're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </Link>
                <a
                  href="https://www.instagram.com/sanluisway/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.067 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.067-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.07-1.067-.09-1.407-.09-4.123v-.08c0-2.643.012-2.987.09-4.043.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                  DM on Instagram
                </a>
              </div>
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
