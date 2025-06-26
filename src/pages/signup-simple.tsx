import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimpleSignUp from '@/components/auth/SimpleSignUp';

export default function SimpleSignUpPage() {
  const router = useRouter();

  // Simple auth check without complex dependencies
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
        <title>Create Account | Directory SLP</title>
        <meta name="description" content="Sign up for an account to access all features." />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <SimpleSignUp />
        </div>
      </div>
    </>
  );
}