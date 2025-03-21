import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoadingIndicator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Event handlers for router events
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setLoading(false);
    };

    // Add event listeners
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Clean up event listeners
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-primary animate-backgroundShift" 
        style={{
          width: '100%',
          backgroundImage: 'linear-gradient(90deg, rgba(157, 34, 53, 0.8) 0%, rgba(212, 175, 55, 0.8) 50%, rgba(157, 34, 53, 0.8) 100%)',
        }}
      />
    </div>
  );
} 