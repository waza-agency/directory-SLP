import React, { useState } from 'react';
import { EnvelopeIcon, XMarkIcon, SparklesIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface NewsletterBannerProps {
  variant?: 'hero' | 'mid-content' | 'sticky' | 'minimal' | 'blog-end';
  className?: string;
  onClose?: () => void;
}

const NewsletterBanner: React.FC<NewsletterBannerProps> = ({
  variant = 'mid-content',
  className = '',
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `website_${variant}` }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Subscription failed');

      setStatus('success');
      setMessage(data.alreadySubscribed ? "You're already subscribed!" : 'Welcome aboard! Check your inbox.');
      setEmail('');
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  // Hero Banner - Large, prominent with gradient background
  if (variant === 'hero') {
    return (
      <section className={`relative overflow-hidden py-16 px-4 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 ${className}`}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
            <EnvelopeIcon className="w-4 h-4" />
            Free Weekly Newsletter
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Your Insider Guide to{' '}
            <span className="text-amber-300">San Luis Potosí</span>
          </h2>

          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Practical tips and useful info to navigate the city like a local — delivered every week.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <CalendarDaysIcon className="w-4 h-4" />
              Weekly Events
            </span>
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <MapPinIcon className="w-4 h-4" />
              Local Gems
            </span>
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <SparklesIcon className="w-4 h-4" />
              Practical Info
            </span>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    Joined!
                  </span>
                ) : 'Join 500+ Readers'}
              </button>
            </div>
            {message && (
              <p className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-amber-200' : 'text-red-200'}`}>
                {message}
              </p>
            )}
          </form>
          <p className="text-white/60 text-sm mt-6">Every Sunday morning. No spam, unsubscribe anytime.</p>
        </div>
      </section>
    );
  }

  // Mid-content Banner - Eye-catching card design
  if (variant === 'mid-content') {
    return (
      <section className={`relative overflow-hidden py-12 px-6 my-12 rounded-3xl ${className}`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="relative max-w-3xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left side - Icon and text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-terracotta to-amber-500 rounded-2xl mb-4 shadow-lg shadow-terracotta/30">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Stay in the Loop
              </h3>
              <p className="text-gray-400 mb-2">
                Get the <span className="text-terracotta font-semibold">SLP Weekly</span> — practical tips and useful info to navigate the city, plus events and local discoveries.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  Free
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  Weekly
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  No spam
                </span>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 lg:w-64 px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-8 py-4 bg-gradient-to-r from-terracotta to-amber-500 text-white font-bold rounded-xl hover:from-terracotta/90 hover:to-amber-500/90 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 hover:scale-105"
                >
                  {status === 'loading' ? (
                    <svg className="animate-spin w-5 h-5 mx-auto" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : status === 'success' ? (
                    <span className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5" />
                      Done!
                    </span>
                  ) : 'Subscribe'}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm text-center lg:text-left ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sticky Banner - Sleek bottom bar
  if (variant === 'sticky') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-4 px-4 z-50 shadow-2xl border-t border-white/10 ${className}`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-gradient-to-br from-terracotta to-amber-500 rounded-xl">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">
                Get the SLP Weekly
              </p>
              <p className="text-sm text-gray-400 hidden sm:block">
                Practical city tips & local info every Sunday
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 sm:w-56 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-2.5 bg-gradient-to-r from-terracotta to-amber-500 text-white font-semibold rounded-lg text-sm hover:from-terracotta/90 hover:to-amber-500/90 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {status === 'success' ? '✓ Joined!' : 'Join Free'}
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Minimal - Compact but eye-catching
  if (variant === 'minimal') {
    return (
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-terracotta to-amber-500 rounded-xl flex-shrink-0">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">SLP Weekly Newsletter</p>
              <p className="text-sm text-gray-600">Practical tips to navigate the city</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 sm:w-44 px-4 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-5 py-2.5 bg-gradient-to-r from-terracotta to-amber-500 text-white font-semibold rounded-lg text-sm hover:from-terracotta/90 hover:to-amber-500/90 disabled:opacity-50 transition-all"
            >
              {status === 'success' ? '✓' : 'Join'}
            </button>
          </form>
        </div>
        {message && <p className={`mt-3 text-xs text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </div>
    );
  }

  // Blog End - Premium card design
  if (variant === 'blog-end') {
    return (
      <div className={`relative overflow-hidden rounded-3xl my-12 ${className}`}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-terracotta/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />

        <div className="relative p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-terracotta to-amber-500 rounded-2xl mb-6 shadow-lg shadow-terracotta/30">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Enjoyed this article?
            </h3>
            <p className="text-gray-400 mb-8">
              Get practical tips to navigate the city, weekly events, and useful local info delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-8 py-4 bg-gradient-to-r from-terracotta to-amber-500 text-white font-bold rounded-xl hover:from-terracotta/90 hover:to-amber-500/90 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-terracotta/30 hover:shadow-xl hover:scale-105"
                >
                  {status === 'loading' ? (
                    <svg className="animate-spin w-5 h-5 mx-auto" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : status === 'success' ? (
                    <span className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5" />
                      Subscribed!
                    </span>
                  ) : 'Subscribe Free'}
                </button>
              </div>
              {message && (
                <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>

            <p className="text-gray-500 text-sm mt-6">Join 500+ readers. No spam, ever.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NewsletterBanner;
