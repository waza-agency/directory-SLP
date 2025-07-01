import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimpleSignIn from '@/components/auth/SimpleSignIn';
import { supabase } from '@/lib/supabase';

export default function SimpleSignInPage() {
  const router = useRouter();

  // Check if user is already authenticated (client-side only)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          router.push('/account');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Continue to show signin form if auth check fails
      }
    };

    checkAuth();
  }, [router]);

  return (
    <>
      <Head>
        <title>{'Sign In'} | Directory SLP</title>
        <meta name="description" content={'Sign in to your account to access all features.'} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <SimpleSignIn />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ }: { locale: string }) {
  return {
    props: {
    },
  };
}