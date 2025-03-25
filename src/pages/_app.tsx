import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../i18n';
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../../next-i18next.config.js';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig); 