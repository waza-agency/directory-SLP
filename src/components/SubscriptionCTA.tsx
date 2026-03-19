import Link from 'next/link';

interface SubscriptionCTAProps {
  variant?: 'banner' | 'inline' | 'card';
  className?: string;
}

export default function SubscriptionCTA({ variant = 'banner', className = '' }: SubscriptionCTAProps) {
  if (variant === 'inline') {
    return (
      <div className={`flex items-center justify-between bg-gradient-to-r from-primary/10 to-amber-50 border border-primary/20 rounded-xl px-5 py-4 ${className}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏪</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Own a business in SLP?</p>
            <p className="text-gray-600 text-xs">Get listed and reach 15,000+ visitors monthly</p>
          </div>
        </div>
        <Link
          href="/business/subscription"
          className="flex-shrink-0 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          List your business
        </Link>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-2xl shadow-card p-8 text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Grow Your Business</h3>
        <p className="text-gray-600 mb-6 text-sm">
          Join 100+ local businesses reaching expats and visitors through San Luis Way.
          From $250 MXN/month.
        </p>
        <Link
          href="/business/subscription"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Get started
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  // Default: banner
  return (
    <section className={`bg-gradient-to-r from-gray-900 to-gray-800 ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Reach 15,000+ Expats & Visitors Monthly
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              List your business on San Luis Way and get discovered by an engaged
              international audience actively looking for local services.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom business profile
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Analytics dashboard
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                From $250 MXN/mo
              </div>
            </div>
          </div>
          <Link
            href="/business/subscription"
            className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
          >
            List Your Business
          </Link>
        </div>
      </div>
    </section>
  );
}
