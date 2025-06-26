import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductionSignUp from '@/components/auth/ProductionSignUp';

export default function ProductionSignUpPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Simple auth check without complex dependencies
  useEffect(() => {
    // Only check for existing auth tokens in localStorage
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
        <title>{t('signup.title', 'Create Account')} | Directory SLP</title>
        <meta name="description" content={t('signup.description', 'Sign up for an account - Production ready signup.')} />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <ProductionSignUp />

          {/* Production Environment Indicator */}
          {process.env.NODE_ENV === 'production' && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Production Environment
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}