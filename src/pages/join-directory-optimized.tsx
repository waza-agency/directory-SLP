import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  MapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function JoinDirectoryOptimized() {
  const testimonials = [
    {
      name: "Dr. Martinez",
      business: "English-Speaking Dentist",
      quote: "Within 2 weeks of listing, I received 15 inquiries from expats. Best 250 pesos I spend every month.",
      rating: 5
    },
    {
      name: "Restaurant La Tradición",
      business: "Traditional Cuisine",
      quote: "Our restaurant now has a steady stream of English-speaking customers who found us on San Luis Way.",
      rating: 5
    },
    {
      name: "Carlos Gomez",
      business: "Real Estate Agent",
      quote: "I've closed 8 deals with expats I met through this directory. The ROI is incredible.",
      rating: 5
    }
  ];

  const businessTypes = [
    { icon: '🏥', title: 'Healthcare', description: 'Doctors, dentists, specialists, clinics' },
    { icon: '🍽️', title: 'Restaurants & Cafes', description: 'International cuisine, cafes, bars' },
    { icon: '🏠', title: 'Real Estate', description: 'Agents, property managers, rentals' },
    { icon: '💼', title: 'Professional Services', description: 'Lawyers, accountants, consultants' },
    { icon: '🎓', title: 'Education', description: 'Language schools, tutors, classes' },
    { icon: '🛍️', title: 'Retail', description: 'International markets, specialty shops' }
  ];

  const faqs = [
    {
      question: "How quickly will I see results?",
      answer: "Most businesses receive their first inquiry within 2-3 weeks. Active categories like healthcare and restaurants typically see faster results."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! Monthly plans can be canceled anytime with no penalty. Yearly plans are non-refundable but you can use the full year."
    },
    {
      question: "Do you help set up my listing?",
      answer: "Absolutely. We provide templates, photo guidelines, and can even write your description for you. Onboarding takes about 15 minutes."
    },
    {
      question: "What if I don't get customers?",
      answer: "We offer a 3-month money-back guarantee. If you don't receive at least 5 qualified inquiries in your first 3 months, we'll refund 100% of your subscription."
    },
    {
      question: "How do I track my listing performance?",
      answer: "Premium listings include an analytics dashboard showing views, clicks, and inquiries. Basic listings get monthly email reports."
    }
  ];

  return (
    <>
      <Head>
        <title>List Your Business in San Luis Potosí Expat Directory | Reach 1,000+ Customers</title>
        <meta
          name="description"
          content="Get your business in front of 1,000+ expats, digital nomads, and travelers in San Luis Potosí. Premium directory listing from 250 MXN/month. Start your 3-month trial today."
        />
        <meta name="keywords" content="San Luis Potosí business directory, expat customers, advertise to expats, business listing Mexico, reach expats SLP" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sanluisway.com/join-directory" />
        <meta property="og:title" content="Reach 1,000+ English-Speaking Customers in San Luis Potosí" />
        <meta property="og:description" content="Get your business listed in the #1 expat directory for SLP. Only 250 MXN/month. 3-month money-back guarantee." />
        <meta property="og:image" content="/images/og-join-directory.jpg" />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />

        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "San Luis Way Business Directory Listing",
              "description": "Premium business directory listing to reach expats in San Luis Potosí",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Basic Listing",
                  "price": "250",
                  "priceCurrency": "MXN",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "Premium Listing",
                  "price": "2500",
                  "priceCurrency": "MXN",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "87"
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-white">

        {/* Hero Section - Conversion Optimized */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
                <StarIcon className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">Rated 4.9/5 by 100+ Businesses</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Reach 1,000+ English-Speaking Customers in San Luis Potosí
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Get your business listed in the #1 expat directory for SLP
              </p>

              {/* Value Props */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-300" />
                  <span>Only 250 MXN/Month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-300" />
                  <span>No Contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-300" />
                  <span>3-Month Guarantee</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  View Pricing & Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#examples"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300"
                >
                  See Example Listings
                </Link>
              </div>

              {/* Social Proof */}
              <p className="mt-8 text-sm text-gray-200">
                Trusted by 100+ local businesses • Featured by 1,000+ active expats
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof - Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Business Owners Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-card">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why List Your Business with Us?</h2>
              <p className="text-xl text-gray-600">
                We're the #1 resource for English-speaking expats, digital nomads, and travelers in San Luis Potosí
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value Prop 1 */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 hover:shadow-card transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1,000+ Active Expats</h3>
                <p className="text-gray-700 leading-relaxed">
                  Verified community actively searching for English-speaking services every day. These are your ideal customers.
                </p>
              </div>

              {/* Value Prop 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-card transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <CurrencyDollarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Only 250 MXN/Month</h3>
                <p className="text-gray-700 leading-relaxed">
                  Less than the cost of one social media ad. No contracts, cancel anytime. ROI typically within first month.
                </p>
              </div>

              {/* Value Prop 3 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-card transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Build Trust Fast</h3>
                <p className="text-gray-700 leading-relaxed">
                  Reviews and ratings from real expats. We verify all businesses to maintain quality and trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">
                No hidden fees. No long-term contracts. Cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* Basic Plan */}
              <div className="bg-white rounded-3xl p-10 shadow-card border-2 border-gray-100">
                <h3 className="text-2xl font-bold mb-2">Basic Listing</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-gray-900">250</span>
                  <span className="text-xl text-gray-600">MXN/month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for getting started</p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Business name & category</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Contact info & location</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>150-word description</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3 photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Customer reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Search visibility</span>
                  </li>
                </ul>

                <Link
                  href="/submit-listing/business?plan=monthly"
                  className="block text-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                >
                  Start Monthly Plan
                </Link>
              </div>

              {/* Premium Plan - Highlighted */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 shadow-card-hover border-4 border-primary relative">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  MOST POPULAR - SAVE 17%
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">Premium Listing</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-white">2,500</span>
                  <span className="text-xl text-gray-200">MXN/year</span>
                </div>
                <p className="text-gray-100 mb-6">Save 2 months! Best value</p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Priority placement in category</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Unlimited photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Video introduction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Featured badge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Social media links</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Analytics dashboard</span>
                  </li>
                </ul>

                <Link
                  href="/submit-listing/business?plan=yearly"
                  className="block text-center bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
                >
                  Start Yearly Plan (SAVE 17%)
                </Link>
              </div>

            </div>

            {/* Money-Back Guarantee */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">3-Month Money-Back Guarantee</h3>
                    <p className="text-gray-700 leading-relaxed">
                      If you don't receive at least 5 qualified inquiries in your first 3 months, we'll refund 100% of your subscription. No questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section id="examples" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Perfect for These Businesses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {businessTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100">
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-card">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-secondary via-secondary-dark to-primary text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
              Join 100+ businesses already reaching expats in San Luis Potosí
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/submit-listing/business"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Get Started - 250 MXN/month
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact?topic=business"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white hover:text-primary"
              >
                Schedule a Demo Call
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-200">
              No contracts • Cancel anytime • 3-month guarantee
            </p>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">100+</div>
                  <div className="text-sm text-gray-300">Active Businesses</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">1,000+</div>
                  <div className="text-sm text-gray-300">Expat Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                  <div className="text-sm text-gray-300">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
