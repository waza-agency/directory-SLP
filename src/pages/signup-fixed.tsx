import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FixedSignUp from '@/components/auth/FixedSignUp';

export default function FixedSignUpPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Simple auth check without complex dependencies
  useEffect(() => {
    const checkSimpleAuth = () => {
      try {
        // Check if there's an existing session token
        const token = localStorage.getItem('sb-access-token');
        if (token) {
          // User might be already logged in, redirect them
          router.push('/account');
        }
      } catch (error) {
        // If localStorage is not available or any error occurs, continue to show signup
        console.log('Auth check skipped:', error);
      }
    };

    checkSimpleAuth();
  }, [router]);

  return (
    <>
      <Head>
        <title>Fixed Signup | Directory SLP</title>
        <meta name="description" content="Production-ready signup with robust error handling and comprehensive debugging." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <FixedSignUp />

          {/* Environment Indicator */}
          <div className="mt-4 text-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              process.env.NODE_ENV === 'production'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} - Fixed Signup
            </span>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">🔧 Fixed Signup Features:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>✅ Robust error handling for production environments</li>
              <li>✅ Comprehensive environment variable validation</li>
              <li>✅ Retry logic for network timeouts</li>
              <li>✅ User-friendly error messages</li>
              <li>✅ Detailed debug information (development only)</li>
              <li>✅ Production-optimized Supabase client configuration</li>
            </ul>
          </div>

          {/* Debug Links (Development Only) */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-800 mb-2">🔍 Debug Tools:</h3>
              <div className="space-y-2">
                <a
                  href="/api/debug-production-issue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 hover:text-blue-800"
                >
                  → Test Production Debug Endpoint
                </a>
                <a
                  href="/api/robust-signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 hover:text-blue-800"
                >
                  → Test Robust Signup API (GET)
                </a>
                <button
                  onClick={() => {
                    // Test the robust signup API with a test user
                    fetch('/api/robust-signup', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: `test-${Date.now()}@example.com`,
                        password: 'TestPassword123!'
                      })
                    }).then(r => r.json()).then(data => {
                      console.log('Test signup result:', data);
                      alert(`Test signup: ${data.success ? 'SUCCESS' : 'FAILED'}\nSee console for details.`);
                    });
                  }}
                  className="block text-xs text-purple-600 hover:text-purple-800 underline"
                >
                  → Run Test Signup (Check Console)
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Compare with other signup pages:
            </p>
            <div className="space-x-4">
              <a href="/signup" className="text-xs text-blue-600 hover:text-blue-800">
                Original Signup
              </a>
              <a href="/signup-minimal" className="text-xs text-blue-600 hover:text-blue-800">
                Minimal Signup
              </a>
              <a href="/signup-production" className="text-xs text-blue-600 hover:text-blue-800">
                Production Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}