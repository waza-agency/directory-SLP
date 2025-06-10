import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignIn from '@/components/auth/SignIn';
import { useAuth } from '@/lib/supabase-auth';

const SignInPage = () => {
  const { t } = useTranslation('common');
  const { user, session, isLoading } = useAuth();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // Enable debug mode in development or via URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setDebugMode(process.env.NODE_ENV !== 'production' || urlParams.has('debug'));
  }, []);

  // Only check auth status once on mount
  useEffect(() => {
    if (!hasInitialized && !isLoading) {
      console.log('SignIn page: Initial auth check');
      console.log('Auth state:', {
        user: user ? { id: user.id, email: user.email } : 'not authenticated',
        session: session ? {
          access_token: session.access_token ? 'present' : 'missing',
          expires_at: session.expires_at
        } : 'no session',
        isLoading
      });

      // Check both user and session
      if (session?.access_token) {
        console.log('Valid session detected, redirecting to account');
        window.location.href = '/account';
      }

      setHasInitialized(true);
    }
  }, [user, session, isLoading, hasInitialized]);

  // Show loading state while checking auth
  if (isLoading || !hasInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in and we're still on this page, show redirecting message
  if (session?.access_token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-gray-600">Redirecting to your account...</p>
        </div>
      </div>
    );
  }

  // Show sign in form for non-authenticated users
  return (
    <>
      <Head>
        <title>{t('signin.title', 'Sign In')} | Directory SLP</title>
        <meta name="description" content={t('signin.description', 'Sign in to your account to access all features.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        {debugMode && (
          <div className="bg-blue-50 p-4 mb-6 rounded-lg text-xs max-w-lg mx-auto">
            <h3 className="font-bold mb-2">🔧 Debug Info:</h3>
            <pre className="text-xs">
              {JSON.stringify({
                user: user ? { id: user.id, email: user.email } : null,
                session: session ? {
                  access_token: session.access_token ? 'present' : 'missing',
                  expires_at: session.expires_at
                } : null,
                isLoading,
                hasInitialized,
                timestamp: new Date().toISOString()
              }, null, 2)}
            </pre>
          </div>
        )}
        <div className="container max-w-lg mx-auto px-4">
          <SignIn />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps for signin page:', error);
    return {
      props: {},
    };
  }
}

export default SignInPage;