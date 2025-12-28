import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CheckCircleIcon, SparklesIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(2847);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          source: 'landing_page_optimized'
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

  const getNextMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    return nextMonday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const benefits = [
    { icon: '🎯', text: 'Best events curated weekly' },
    { icon: '🍽️', text: 'New restaurants first' },
    { icon: '🌿', text: 'Huasteca hidden gems' },
    { icon: '💡', text: 'Expat life hacks' },
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
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-500 scale-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
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
                  className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@sanluisway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
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
        <title>Never Miss What Matters in SLP | San Luis Way Weekly</title>
        <meta
          name="description"
          content="Join 2,800+ expats and locals who get the best events, restaurants, and insider tips delivered every Monday. Takes 10 seconds. Free forever."
        />
        <meta property="og:title" content="Never Miss What Matters in SLP" />
        <meta property="og:description" content="Join 2,800+ readers who get the best of San Luis Potosí every Monday." />
        <meta property="og:image" content="https://www.sanluisway.com/images/og-newsletter.jpg" />
        <meta property="og:url" content="https://www.sanluisway.com/subscribe" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Above the Fold */}
        <section className="relative bg-gradient-to-br from-[#C75B39] via-[#D4694A] to-[#FFCB05] text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFCB05]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
            {/* Social Proof Badge - Top */}
            <div className={`flex justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg">
                <UserGroupIcon className="w-5 h-5 mr-2" />
                Join {subscriberCount.toLocaleString()}+ readers
              </div>
            </div>

            {/* Main Headline */}
            <div className={`text-center mb-12 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                Never Miss What <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="relative z-10">Matters in SLP</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFCB05] -rotate-1 opacity-50"></span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl opacity-95 mb-4 font-medium max-w-3xl mx-auto">
                The best events, restaurants, and insider tips delivered to your inbox every Monday morning.
              </p>

              <p className="text-lg opacity-80 flex items-center justify-center gap-2">
                <ClockIcon className="w-5 h-5" />
                5-minute read. No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Urgency Badge */}
            <div className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center bg-gray-900/80 backdrop-blur-md rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl border border-white/20">
                <SparklesIcon className="w-5 h-5 mr-2 text-[#FFCB05] animate-pulse" />
                Next issue: Monday, {getNextMonday()}
              </div>
            </div>

            {/* Primary Form - Simplified */}
            <div className={`max-w-xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FFCB05] to-white rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

                  <div className="relative bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      required
                      className="flex-1 px-6 py-4 text-lg text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none rounded-xl"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none text-lg shadow-xl hover:shadow-2xl whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subscribing...
                        </span>
                      ) : (
                        <>Get Monday&apos;s Issue</>
                      )}
                    </button>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="mt-4 text-white bg-red-500/80 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-medium shadow-lg animate-shake">
                    {message}
                  </div>
                )}
              </form>

              <p className="text-center text-white/80 text-sm mt-4 font-medium">
                Takes 10 seconds. Free forever. Join 2,847+ happy readers.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default"
                >
                  <span className="text-3xl mb-2">{benefit.icon}</span>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sneak Peek Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What You Get Every Monday at 7 AM
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about SLP this week
              </p>
            </div>

            <div className="space-y-4">
              {sampleSections.map((section, i) => (
                <div
                  key={i}
                  className={`${section.color} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-default`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{section.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-xl mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 italic leading-relaxed">
                        &quot;{section.preview}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 p-6 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600">
                Plus: Weather forecast, events calendar, reader tips, and more...
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA - High Impact */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C75B39]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFCB05]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-[#FFCB05]/20 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-semibold mb-8">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Limited time: Get our Best of SLP 2024 guide when you subscribe
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don&apos;t Miss Monday&apos;s Issue
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Join the community that knows what&apos;s happening in San Luis Potosí. <br className="hidden sm:block" />
              Free every Monday. No spam. Unsubscribe anytime.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C75B39] via-[#FFCB05] to-[#C75B39] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

                <div className="relative bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-6 py-4 text-lg text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none rounded-xl"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-4 bg-gradient-to-r from-[#C75B39] to-[#D4694A] hover:from-[#B04D2F] hover:to-[#C75B39] text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none text-lg shadow-xl hover:shadow-2xl whitespace-nowrap"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
                  </button>
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-4 text-red-400 bg-red-500/20 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-medium">
                  {message}
                </p>
              )}
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                Free forever
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-950 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-gray-400 text-sm mb-4">
              San Luis Way | Your guide to life in San Luis Potosí
            </p>
            <div className="flex justify-center gap-6 text-gray-500 text-sm">
              <a href="https://www.sanluisway.com" className="hover:text-white transition-colors">
                Website
              </a>
              <a href="https://www.instagram.com/sanluisway/" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@sanluisway" className="hover:text-white transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
