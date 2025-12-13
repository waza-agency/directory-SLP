import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AboutPage() {

  const values = [
    {
      title: 'Cultural Bridge',
      description: 'We bridge the gap between expatriates and local culture, fostering meaningful connections and understanding.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Local Expertise',
      description: 'Our team combines deep local knowledge with international perspective to provide authentic insights.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      title: 'Community Focus',
      description: 'We believe in building and nurturing a strong, supportive expatriate community in San Luis Potosí.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600'
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

  const stats = [
    { number: '500+', label: 'Community Members' },
    { number: '50+', label: 'Partner Businesses' },
    { number: '100+', label: 'Cultural Events' },
    { number: '5+', label: 'Years Experience' }
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
        {/* Hero Section - Refined and Professional */}
        <section className="relative h-[60vh] min-h-[500px] max-h-[700px] bg-gray-900 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/cultura-1.jpg"
              alt="San Luis Potosí cityscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/90" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-6 md:px-12 lg:px-20 h-full flex items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-white font-medium text-sm tracking-wider uppercase">Your Cultural Bridge to San Luis Potosí</span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Connecting Cultures,<br />
                Building Community
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                We help expatriates discover, understand, and embrace the rich cultural heritage of San Luis Potosí through authentic experiences and meaningful connections.
              </p>
            </div>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-20">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Stats Section - Trust Indicators */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-3">
                    <span className="font-serif text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {stat.number}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section - Two Column Layout */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div>
                <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                  Our Mission
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Helping You Discover the Heart of Potosino Culture
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  San Luis Way was founded with a clear mission: to help expatriates discover, understand, and integrate into the rich cultural tapestry of San Luis Potosí.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We believe that cultural understanding leads to stronger communities and more enriching experiences for both newcomers and locals alike. Every connection we facilitate, every experience we curate, is designed to bridge cultures and build lasting relationships.
                </p>

                {/* Key Points */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Authentic Local Experiences</h4>
                      <p className="text-gray-600">Curated activities that showcase genuine Potosino culture</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Trusted Local Partnerships</h4>
                      <p className="text-gray-600">Connections with authentic businesses and cultural institutions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Supportive Community Network</h4>
                      <p className="text-gray-600">A welcoming community of expats and locals helping each other thrive</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Featured Image */}
              <div className="relative">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-elegant">
                  <Image
                    src="/images/cultura-1.jpg"
                    alt="San Luis Potosí culture"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-gray-900">We Love Potosino Culture</p>
                      <p className="text-sm text-gray-600 mt-1">Passionate about sharing the authentic San Luis Potosí</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Modern Card Design */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                Our Values
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                What Drives Us Forward
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                These core principles guide everything we do, from the experiences we create to the partnerships we build.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Icon Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${value.gradient}`} />

                  <div className="p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Passion Section - Full Width Banner */}
        <section className="relative py-24 md:py-32 bg-gradient-to-r from-secondary via-secondary-light to-secondary overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-white font-medium text-sm tracking-wider uppercase">Our Passion</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Discover the Amazing Secrets of San Luis Potosí
              </h2>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
                We are passionate about the vibrant Potosino culture and deeply believe that everyone who comes from abroad should have helpful insights to truly embrace and discover the amazing secrets of San Luis Potosí. From its rich colonial architecture and time-honored traditions to its warm hospitality and hidden culinary gems, this remarkable city offers countless treasures waiting to be uncovered.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">Hidden Treasures</h3>
                  <p className="text-white/80 leading-relaxed">Uncover secret spots and stories only locals know about</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">Cultural Connections</h3>
                  <p className="text-white/80 leading-relaxed">Build meaningful relationships with locals and expats</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">Authentic Experiences</h3>
                  <p className="text-white/80 leading-relaxed">Live like a true Potosino with genuine local experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Brands Section - Enhanced Design */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                Trusted Partners
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our Partner Brands
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We collaborate with authentic local businesses that embody the spirit of San Luis Potosí, ensuring our community experiences the very best of Potosino culture and hospitality.
              </p>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerBrands.map((brand, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Logo Container */}
                  <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 border-b border-gray-100">
                    <div className="relative h-20 w-40">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                        {brand.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {brand.description}
                    </p>

                    {/* CTA Link */}
                    <a
                      href={brand.website}
                      className="inline-flex items-center gap-2 text-primary font-semibold group/link hover:gap-3 transition-all"
                    >
                      <span>Learn More</span>
                      <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Join Community */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
              {/* Content Card */}
              <div className="relative bg-white rounded-3xl shadow-elegant overflow-hidden">
                {/* Decorative Gradient Bar */}
                <div className="h-2 bg-gradient-to-r from-primary via-amber-400 to-orange-500" />

                <div className="p-12 md:p-16 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-primary font-semibold text-sm tracking-wider uppercase">Join Us</span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Become Part of Our Community
                  </h2>

                  <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                    Be part of our growing community of expatriates and locals. Together, we create meaningful connections and share enriching experiences in San Luis Potosí.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-3 bg-primary text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:scale-105"
                    >
                      Contact Us
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    <a
                      href="/community"
                      className="inline-flex items-center justify-center gap-3 bg-white border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-gray-900 hover:shadow-xl hover:scale-105"
                    >
                      Join Community
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
