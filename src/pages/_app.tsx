import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';

// Simple version without translation wrapper
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// Translation support disabled temporarily
// Will re-enable this later:
// export default appWithTranslation(MyApp); 