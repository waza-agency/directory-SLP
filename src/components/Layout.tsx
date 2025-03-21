import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import LoadingIndicator from './LoadingIndicator';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <LoadingIndicator />
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
} 