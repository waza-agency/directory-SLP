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

  const team = [
    {
      name: 'María González',
      role: 'Founder & Cultural Director',
      image: '/images/team/maria.jpg',
      bio: 'With over 15 years of experience in cultural exchange programs, María founded SLP Descubre to help expatriates discover the beauty of San Luis Potosí.',
    },
    {
      name: 'John Smith',
      role: 'Community Manager',
      image: '/images/team/john.jpg',
      bio: 'Former expat turned permanent resident, John brings his personal experience to help newcomers navigate their transition to life in SLP.',
    },
    {
      name: 'Ana Ramírez',
      role: 'Local Experience Curator',
      image: '/images/team/ana.jpg',
      bio: 'Born and raised in SLP, Ana specializes in creating authentic local experiences that connect expatriates with the city\'s rich culture.',
    },
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
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                SLP Descubre was founded with a clear mission: to help expatriates discover, understand, and integrate into the rich cultural tapestry of San Luis Potosí. We believe that cultural understanding leads to stronger communities and more enriching experiences for both newcomers and locals alike.
              </p>
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

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-elegant overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Be part of our growing community of expatriates and locals. Together, we create meaningful connections and share enriching experiences in San Luis Potosí.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/contact"
                className="bg-white text-secondary px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/community"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
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