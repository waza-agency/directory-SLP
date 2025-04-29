import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function DebugPage() {
  const router = useRouter();
  
  const reloadPage = () => {
    router.reload();
  };
  
  return (
    <>
      <Head>
        <title>Debug Page</title>
      </Head>
      
      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Auth Links</h2>
              <div className="space-y-3">
                <Link href="/signin" className="block text-primary hover:underline">
                  Go to Sign In
                </Link>
                <Link href="/signup" className="block text-primary hover:underline">
                  Go to Sign Up
                </Link>
                <Link href="/account" className="block text-primary hover:underline">
                  Go to Account
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Navigate Links</h2>
              <div className="space-y-3">
                <Link href="/" className="block text-primary hover:underline">
                  Go to Home
                </Link>
                <Link href="/places" className="block text-primary hover:underline">
                  Go to Places
                </Link>
                <Link href="/events" className="block text-primary hover:underline">
                  Go to Events
                </Link>
                <button
                  onClick={reloadPage}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-sm">
              {`User Agent: ${typeof window !== 'undefined' ? window.navigator.userAgent : 'Not available'}`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
} 