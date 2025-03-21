import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

// Add debug logging for translations
function logInitProps(props: any) {
  if (typeof window === 'undefined') {
    console.log('Server-side _app props:', Object.keys(props));
    
    // Log i18n configuration if available
    if (props.pageProps && props.pageProps._nextI18Next) {
      console.log('i18n config:', props.pageProps._nextI18Next.initialLocale);
    }
  }
  return props;
}

function MyApp({ Component, pageProps }: AppProps) {
  // Log translation initialization in development
  if (process.env.NODE_ENV === 'development') {
    logInitProps({ pageProps });
  }
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp); 