import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CommunityPage() {

  const upcomingActivities = [
    {
      title: "Potosino Wine Tastings",
      description: "Discover the emerging wine scene of San Luis Potosí while connecting with fellow wine enthusiasts. Learn about local varietals and share stories over carefully selected pairings.",
      date: "Every Third Friday",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14c0 5-7 5-7 5s-7 0-7-5c0-5 0-7 7-7s7 2 7 7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6v1m8-1v1" />
        </svg>
      ),
      badge: "Cultural & Social"
    },
    {
      title: "International Book Club",
      description: "Dive into literature that bridges cultures while building friendships. We explore both international bestsellers and Mexican authors, creating rich discussions that span continents.",
      date: "Bi-weekly Sundays",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: "Intellectual & Social"
    },
    {
      title: "Language Exchange Circles",
      description: "Practice your Spanish while helping others with English in a relaxed, supportive environment. These sessions combine learning with authentic cultural exchange.",
      date: "Weekly Wednesdays",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      badge: "Educational & Social"
    },
    {
      title: "Cultural Discovery Tours",
      description: "Explore hidden gems of San Luis Potosí with fellow expats and knowledgeable local guides. From historic neighborhoods to artisan workshops, discover stories behind the places.",
      date: "Monthly Saturdays",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7M7 7h10M9 11v4m2-4v4m2-4v4" />
        </svg>
      ),
      badge: "Cultural & Adventure"
    }
  ];

  const communityBenefits = [
    {
      title: "Lasting Friendships",
      description: "Form genuine bonds with people who understand the unique experience of living abroad. These connections often become lifelong friendships that extend far beyond shared activities.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Cultural Bridge",
      description: "Learn about Mexican culture through shared experiences and local insights from both fellow expats and Potosino friends. Understanding deepens through community discussion and exploration.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Mutual Support",
      description: "Navigate the challenges of expat life with people who've been there. From practical advice to emotional support, community members help each other thrive in their new home.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <SEO
        title="Community - Connect with Fellow Expats in San Luis Potosí"
        description="Join our vibrant expat community in San Luis Potosí. Connect through wine tastings, book clubs, language exchanges, and cultural activities designed to help you build meaningful connections."
        keywords="expat community San Luis Potosí, wine tastings, book clubs, language exchange, cultural activities, international community Mexico, expatriate social events"
        ogImage="/images/cultural/cultural-default.jpg"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/cultural/cultural-default.jpg"
              alt="Community gathering in San Luis Potosí"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Building Bridges, Creating Bonds
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Your Community Awaits
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-lg leading-relaxed">
                  Moving to a new country can feel overwhelming, but you don't have to navigate it alone. We're creating a warm, welcoming community where every expat can find their place, make meaningful connections, and truly feel at home in San Luis Potosí.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Something Special is Brewing
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                We're putting the finishing touches on an incredible community experience that will bring expatriates together through carefully curated activities designed to foster genuine connections and help you discover the true heart of Potosino culture.
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-elegant">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Stay Tuned for More
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to know when our community activities launch.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8h0z" />
                  </svg>
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Activities Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Community Activities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From intimate wine tastings to lively conversational exchanges, each activity is designed to help you connect with like-minded people while discovering the rich culture of San Luis Potosí.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-xl shadow-elegant overflow-hidden hover-lift group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {activity.icon}
                      </div>
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full">
                        {activity.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{activity.title}</h3>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <div className="flex items-center text-primary font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {activity.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Community Matters
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Building connections in your new home isn't just about social activities—it's about creating a support network that makes your expatriate journey richer, easier, and more fulfilling.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-elegant hover-lift text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Connect?
              </h2>
              <p className="text-xl mb-8 leading-relaxed">
                Whether you're new to San Luis Potosí or have been here for years, our community activities are designed to help you build meaningful connections and discover new aspects of this beautiful city.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:community@sanluis.way"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Community Team
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-colors border border-white/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  General Contact
                </a>
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