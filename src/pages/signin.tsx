import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignIn from '@/components/auth/SignIn';
import { useAuth } from '@/lib/supabase-auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const SignInPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, session, isLoading } = useAuth();
  const supabaseClient = useSupabaseClient();
  const [hasInitialized, setHasInitialized] = useState(false);

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
        // We have a session, verify it's valid
        supabaseClient.auth.getUser().then(({ data: { user: currentUser }, error }) => {
          if (currentUser && !error) {
            console.log('Valid session detected, redirecting to account');
            window.location.href = '/account';
          } else {
            console.log('Invalid session detected, clearing');
            supabaseClient.auth.signOut();
          }
        });
      }
      
      setHasInitialized(true);
    }
  }, [user, session, isLoading, hasInitialized, supabaseClient.auth]);

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
        {process.env.NODE_ENV !== 'production' && (
          <div className="bg-yellow-50 p-4 mb-6 rounded-lg text-xs">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre>
              {JSON.stringify({
                user: user ? { id: user.id, email: user.email } : null,
                session: session ? { 
                  access_token: session.access_token ? 'present' : 'missing',
                  expires_at: session.expires_at
                } : null,
                supabaseAuth: !!supabaseClient?.auth,
                isLoading,
                hasInitialized
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default SignInPage; 