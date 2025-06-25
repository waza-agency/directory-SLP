import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignUp from '@/components/auth/SignUp';
import { useAuth } from '@/lib/supabase-auth';

export default function SignUpPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect if already authenticated - only on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && user && !isLoading) {
      router.push('/account');
    }
  }, [user, isLoading, router]);

  // Show loading during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Only show signup if user is not authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t('signup.title', 'Create Account')} | Directory SLP</title>
        <meta name="description" content={t('signup.description', 'Sign up for an account to access all features and make purchases.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <SignUp />
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