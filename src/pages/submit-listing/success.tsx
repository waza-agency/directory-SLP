import Head from 'next/head';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SubmissionSuccess() {
  return (
    <>
      <Head>
        <title>Submission Successful - San Luis Way</title>
        <meta name="description" content="Your listing has been successfully submitted to San Luis Way." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Submission Successful!
            </h1>
            
            <p className="mt-4 text-lg text-gray-600">
              Thank you for submitting your listing to San Luis Way. Our team will review your submission and get back to you within 2-3 business days.
            </p>

            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-medium text-gray-900">What happens next?</h2>
                <ul className="mt-4 text-left text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Our team will review your submission
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You'll receive an email confirmation within 2-3 business days
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Once approved, your listing will be live on our platform
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h2 className="text-lg font-medium text-blue-900">Need help?</h2>
                <p className="mt-2 text-blue-700">
                  If you have any questions or need to update your submission, please don't hesitate to contact us.
                </p>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <Link
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 