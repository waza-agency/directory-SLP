import Link from 'next/link';
import SEO from '@/components/common/SEO';

export default function Custom404() {
  return (
    <>
      <SEO
        title="Page Not Found | San Luis Way"
        description="The page you are looking for does not exist."
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}

