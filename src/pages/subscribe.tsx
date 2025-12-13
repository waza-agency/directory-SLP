import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          source: 'landing_page'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setStatus('success');
      setMessage(data.alreadySubscribed
        ? "You're already on the list!"
        : 'Welcome to San Luis Way Weekly!');

    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const benefits = [
    { icon: '📰', text: 'Local news that actually matters' },
    { icon: '🎭', text: 'Events worth your time' },
    { icon: '🍽️', text: 'New restaurants & hidden gems' },
    { icon: '🌿', text: 'Day trips to the Huasteca' },
    { icon: '💡', text: 'Insider tips from expats' },
    { icon: '😂', text: 'Potosino humor & memes' },
  ];

  const sampleSections = [
    {
      title: 'The Week in SLP',
      emoji: '📰',
      preview: 'New bike lanes coming to Avenida Carranza, plus 3 restaurant openings you need to know about...',
      color: 'bg-red-50 border-red-200',
    },
    {
      title: "This Week's Top Picks",
      emoji: '🌟',
      preview: 'Jazz at Teatro de la Paz, Mercado del Carmen food festival, and Atlético vs Tigres...',
      color: 'bg-yellow-50 border-yellow-200',
    },
    {
      title: 'Weekend Escape',
      emoji: '🌿',
      preview: 'The waterfalls at Tamasopo are flowing perfectly right now. Here\'s the best route...',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Expat Pro Tip',
      emoji: '💡',
      preview: 'Skip the bank lines: Here\'s how to pay your CFE bill in 2 minutes from your phone...',
      color: 'bg-amber-50 border-amber-200',
    },
  ];

  if (status === 'success') {
    return (
      <>
        <Head>
          <title>Welcome! | San Luis Way Newsletter</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">You&apos;re In!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Check your inbox for a welcome email. Your first newsletter arrives Monday morning.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">While you wait, follow us:</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/sanluisway/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@sanluisway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 font-medium"
                >
                  TikTok
                </a>
              </div>
            </div>
            <a
              href="https://www.sanluisway.com"
              className="text-terracotta hover:underline font-medium"
            >
              Explore sanluisway.com
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Subscribe to San Luis Way Weekly | Free Newsletter</title>
        <meta
          name="description"
          content="Join expats and locals who get the best of San Luis Potosí delivered every Monday. Events, news, restaurants, and insider tips. Free."
        />
        <meta property="og:title" content="San Luis Way Weekly Newsletter" />
        <meta property="og:description" content="Your weekly guide to life in San Luis Potosí. Events, news, restaurants, day trips, and expat tips." />
        <meta property="og:image" content="https://www.sanluisway.com/images/og-newsletter.jpg" />
        <meta property="og:url" content="https://www.sanluisway.com/subscribe" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#C75B39] via-[#D4694A] to-[#FFCB05] text-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Copy */}
              <div>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <span className="mr-2">📬</span> Free weekly newsletter
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Know What&apos;s Happening in San Luis Potosí
                </h1>

                <p className="text-xl md:text-2xl opacity-90 mb-8">
                  Join expats and locals who get the best of SLP delivered every Monday.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center text-white/90">
                      <span className="mr-2 text-lg">{benefit.icon}</span>
                      <span className="text-sm md:text-base">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name (optional)"
                      className="flex-1 px-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-lg"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
                  </button>
                </form>

                {status === 'error' && (
                  <p className="mt-3 text-white bg-red-500/30 rounded-lg px-4 py-2 text-sm">
                    {message}
                  </p>
                )}

                <p className="text-white/70 text-sm mt-4">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </div>

              {/* Right: Preview Image/Mockup */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C75B39]/20 to-transparent rounded-2xl"></div>
                  <Image
                    src="/images/logo.jpeg"
                    alt="San Luis Way Newsletter"
                    width={500}
                    height={500}
                    className="rounded-2xl shadow-2xl mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sneak Peek Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sneak Peek: What You&apos;ll Get Every Monday
              </h2>
              <p className="text-lg text-gray-600">
                A 5-minute read packed with everything you need to know
              </p>
            </div>

            <div className="space-y-4">
              {sampleSections.map((section, i) => (
                <div
                  key={i}
                  className={`${section.color} border rounded-xl p-6 transition-all hover:shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{section.emoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 italic">
                        &quot;{section.preview}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                Plus: Weather forecast, upcoming events calendar, and more...
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Readers Love It
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Finally, one place to find out what's happening. Saves me hours of scrolling Facebook groups.",
                  name: "Sarah M.",
                  desc: "Expat from Texas"
                },
                {
                  quote: "The Huasteca tips alone are worth it. Found waterfalls I never knew existed!",
                  name: "Carlos R.",
                  desc: "Local Potosino"
                },
                {
                  quote: "Best Monday morning read. Short, useful, and actually tells me what I need to know.",
                  name: "Mike & Jenny",
                  desc: "Retired in SLP"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stay in the Loop?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the community that&apos;s figured out SLP. Free every Monday.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#FFCB05]/50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-[#FFCB05] hover:bg-[#e6b800] text-gray-900 font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </div>
            </form>

            {status === 'error' && (
              <p className="mt-3 text-red-400 text-sm">{message}</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-950 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-gray-400 text-sm mb-4">
              San Luis Way | Your guide to life in San Luis Potosí
            </p>
            <div className="flex justify-center gap-6 text-gray-500 text-sm">
              <a href="https://www.sanluisway.com" className="hover:text-white transition">
                Website
              </a>
              <a href="https://www.instagram.com/sanluisway/" className="hover:text-white transition">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@sanluisway" className="hover:text-white transition">
                TikTok
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
