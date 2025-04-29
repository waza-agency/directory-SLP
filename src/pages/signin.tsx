import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignIn from '@/components/auth/SignIn';
import { useAuth } from '@/lib/supabase-auth';

export default function SignInPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/account');
    }
  }, [user, isLoading, router]);

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in, show sign in form
  return (
    <>
      <Head>
        <title>{t('signin.title', 'Sign In')} | Directory SLP</title>
        <meta name="description" content={t('signin.description', 'Sign in to your account to access all features.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <SignIn />
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