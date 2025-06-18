import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import SEO from '@/components/common/SEO';

export default function AboutPage() {
  const { t } = useTranslation('common');

  const values = [
    {
      title: 'Cultural Bridge',
      description: 'We bridge the gap between expatriates and local culture, fostering meaningful connections and understanding.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h.01M7 12h.01M11 12h.01M15 12h.01M19 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Local Expertise',
      description: 'Our team combines deep local knowledge with international perspective to provide authentic insights.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Community Focus',
      description: 'We believe in building and nurturing a strong, supportive expatriate community in San Luis Potosí.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const partnerBrands = [
    {
      name: 'Corazón de Xoconostle',
      description: 'Authentic Mexican cuisine and cultural experiences that capture the heart of Potosino gastronomy.',
      logo: '/images/brands/corazon-de-xoconostle-logo.png',
      website: '/places/corazon-de-xoconostle',
      category: 'Gastronomy & Culture'
    },
    {
      name: 'San Luis Rey Tranvía',
      description: 'Historic tram tours showcasing the architectural beauty and rich history of San Luis Potosí.',
      logo: '/images/brands/san-luis-rey-tranvia-logo.png',
      website: '/blog/san-luis-rey-tranvia',
      category: 'Cultural Tours'
    },
    {
      name: 'La Gran Vía',
      description: 'Traditional dining experience offering the finest in local Potosino cuisine and hospitality.',
      logo: '/images/brands/la-gran-via-logo.jpg',
      website: '/places/la-gran-via',
      category: 'Traditional Cuisine'
    }
  ];

  return (
    <>
      <SEO
        title="About Us - San Luis Way"
        description="Learn about San Luis Way's mission to help expatriates discover and integrate into the rich cultural landscape of San Luis Potosí."
        keywords="San Luis Way, about us, San Luis Potosí, expat community, cultural integration, expatriate services, Mexico relocation"
        ogImage="/images/cultura-1.jpg"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-1.jpg"
              alt="San Luis Potosí cityscape"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About San Luis Way
              </h1>
              <p className="text-white text-lg">
                Your bridge to discovering and embracing the rich cultural heritage of San Luis Potosí
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                San Luis Way was founded with a clear mission: to help expatriates discover, understand, and integrate into the rich cultural tapestry of San Luis Potosí. We believe that cultural understanding leads to stronger communities and more enriching experiences for both newcomers and locals alike.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">We Love Potosino Culture</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are passionate about the vibrant Potosino culture and deeply believe that everyone who comes from abroad should have helpful insights to truly embrace and discover the amazing secrets of San Luis Potosí. From its rich colonial architecture and time-honored traditions to its warm hospitality and hidden culinary gems, this remarkable city offers countless treasures waiting to be uncovered. Our goal is to ensure that every visitor and new resident experiences the authentic heart of Potosino culture through meaningful connections and genuine local experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-elegant hover-lift">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Brands Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partner Brands</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We collaborate with authentic local businesses that embody the spirit of San Luis Potosí, ensuring our community experiences the very best of Potosino culture and hospitality.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerBrands.map((brand, index) => (
                <div key={index} className="bg-white rounded-xl shadow-elegant overflow-hidden hover-lift group">
                  <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                    <div className="relative h-16 w-32">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain filter group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {brand.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{brand.name}</h3>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <a
                      href={brand.website}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Immersion Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Discover the Secrets of San Luis Potosí</h2>
              <p className="text-xl mb-8 leading-relaxed">
                From hidden culinary treasures in century-old cantinas to the whispered stories of colonial architecture, San Luis Potosí holds countless secrets waiting to be discovered. Our carefully curated experiences and local partnerships ensure you don't just visit our city—you become part of its living history and vibrant community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Hidden Treasures</h3>
                  <p className="text-white/90">Uncover secret spots only locals know</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cultural Connections</h3>
                  <p className="text-white/90">Build meaningful relationships with locals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Authentic Experiences</h3>
                  <p className="text-white/90">Live like a true Potosino</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of our growing community of expatriates and locals. Together, we create meaningful connections and share enriching experiences in San Luis Potosí.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/community"
                className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors"
              >
                Join Community
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};