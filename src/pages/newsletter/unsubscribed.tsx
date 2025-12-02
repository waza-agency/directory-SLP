import React from 'react';
import Link from 'next/link';
import SEO from '@/components/common/SEO';

export default function UnsubscribedPage() {
  return (
    <>
      <SEO
        title="Unsubscribed | San Luis Way"
        description="You have been unsubscribed from San Luis Way newsletter"
        noIndex={true}
      />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              You've Been Unsubscribed
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry to see you go! You won't receive any more emails from San Luis Way Weekly.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Changed your mind? You can always{' '}
              <Link href="/" className="text-terracotta hover:underline">
                resubscribe on our homepage
              </Link>.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              Back to San Luis Way
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
