import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Use simple export instead of Next.js i18n
export default MyApp; 