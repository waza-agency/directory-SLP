import Head from 'next/head';
import { useEffect, useState } from 'react';
import AdUnit from '../components/common/AdUnit';

export default function AdSenseTest() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Collect debug information
    const info = {
      environment: process.env.NODE_ENV,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
      adsbygoogleAvailable: typeof window !== 'undefined' && !!window.adsbygoogle,
      adsbygoogleLength: typeof window !== 'undefined' && window.adsbygoogle ? window.adsbygoogle.length : 0,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      protocol: typeof window !== 'undefined' ? window.location.protocol : 'N/A',
    };
    setDebugInfo(info);
  }, []);

  return (
    <>
      <Head>
        <title>AdSense Debug Test - San Luis Way</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">AdSense Debug Test</h1>

          {/* Debug Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Environment:</strong> {debugInfo.environment}
              </div>
              <div>
                <strong>Hostname:</strong> {debugInfo.hostname}
              </div>
              <div>
                <strong>Protocol:</strong> {debugInfo.protocol}
              </div>
              <div>
                <strong>AdsByGoogle Available:</strong> {debugInfo.adsbygoogleAvailable ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>AdsByGoogle Array Length:</strong> {debugInfo.adsbygoogleLength}
              </div>
            </div>
          </div>

          {/* Test Ad Units */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Test Ad Unit 1 (Default)</h3>
              <AdUnit
                style={{
                  display: 'block',
                  textAlign: 'center',
                  minHeight: '250px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem'
                }}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Test Ad Unit 2 (Rectangle)</h3>
              <AdUnit
                adFormat="rectangle"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  minHeight: '250px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem'
                }}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Test Ad Unit 3 (Relaxed)</h3>
              <AdUnit
                isRelaxed={true}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  minHeight: '100px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem'
                }}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Testing Instructions</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>This page should only be used for testing in production</li>
              <li>AdSense ads typically don't show on localhost/development</li>
              <li>Check the browser console for AdSense-related messages</li>
              <li>Ads may take a few seconds to load</li>
              <li>If ads don't appear, check if your AdSense account is approved</li>
              <li>Make sure your domain is added to your AdSense account</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}