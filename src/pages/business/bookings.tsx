import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase-auth';
import BookingManager from '@/components/BookingManager';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function BusinessBookings() {
  const { t } = useTranslation('common');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
      return;
    }

    if (user) {
      fetch('/api/user/business-profile')
        .then(res => {
          setHasProfile(res.ok);
          if (!res.ok) router.push('/business/profile');
        })
        .catch(() => setHasProfile(false));
    }
  }, [user, isLoading, router]);

  if (isLoading || hasProfile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t('booking.manageBookings')} | San Luis Way</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('booking.manageBookings')}</h1>
              <p className="text-gray-600 mt-1">{t('booking.manageDescription')}</p>
            </div>
            <Link
              href="/business/dashboard"
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              {t('booking.backToDashboard')}
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <BookingManager />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
}
