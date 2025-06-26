import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MinimalSignUp from '@/components/auth/MinimalSignUp';

export default function SignUpPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Simple auth check without complex hooks that crash in production
  useEffect(() => {
    try {
      // Simple check for existing auth without complex dependencies
      const checkAuth = () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('sb-access-token');
          if (token) {
            router.push('/account');
          }
        }
      };
      checkAuth();
    } catch (error) {
      // If auth check fails, just continue to show signup
      console.log('Auth check skipped:', error);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{t('signup.title', 'Create Account')} | Directory SLP</title>
        <meta name="description" content={t('signup.description', 'Sign up for an account to access all features and make purchases.')} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <MinimalSignUp />
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