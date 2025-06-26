import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MinimalSignUp from '@/components/auth/MinimalSignUp';

export default function MinimalSignUpPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Crear Cuenta | Directory SLP</title>
        <meta name="description" content="Crear cuenta nueva - Solo autenticación básica" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <MinimalSignUp />

          {/* Development Info */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-md">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">🔧 Desarrollo:</h4>
              <p className="text-xs text-yellow-700">
                Este signup SOLO crea la cuenta de autenticación.<br/>
                NO toca tablas de base de datos (users, profiles, business, etc.)
              </p>
            </div>
          )}

          {/* Production Environment Indicator */}
          {process.env.NODE_ENV === 'production' && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Producción - Signup Minimalista
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