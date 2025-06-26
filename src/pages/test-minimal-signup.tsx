import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function TestMinimalSignupPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const router = useRouter();

  const runDebugTest = async () => {
    setIsLoading(true);
    try {
      console.log('🔍 Running debug test...');

      const response = await fetch('/api/debug-signup-production', {
        method: 'GET'
      });

      const data = await response.json();
      setDebugData(data);
      console.log('Debug results:', data);

    } catch (error) {
      console.error('Debug test failed:', error);
      setDebugData({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const testMinimalSignup = async () => {
    setIsLoading(true);
    try {
      console.log('🧪 Testing minimal signup...');

      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'test123456';

      const response = await fetch('/api/minimal-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Signup result:', result);

      setTestResults(prev => [...prev, {
        timestamp: new Date().toISOString(),
        email: testEmail,
        status: response.status,
        success: result.success,
        result: result
      }]);

    } catch (error: any) {
      console.error('Minimal signup test failed:', error);
      setTestResults(prev => [...prev, {
        timestamp: new Date().toISOString(),
        error: error.message,
        success: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const testFullSignupDebug = async () => {
    setIsLoading(true);
    try {
      console.log('🔬 Testing full signup debug...');

      const response = await fetch('/api/debug-signup-production', {
        method: 'POST'
      });

      const data = await response.json();
      setDebugData(data);
      console.log('Full debug results:', data);

    } catch (error) {
      console.error('Full debug test failed:', error);
      setDebugData({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Test Minimal Signup | Directory SLP</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">🧪 Test Minimal Signup</h1>

            {/* Environment Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-900 mb-2">Environment Info:</h3>
              <p className="text-sm text-blue-700">
                Environment: {process.env.NODE_ENV || 'unknown'}<br/>
                Platform: {typeof window !== 'undefined' ? 'Client' : 'Server'}
              </p>
            </div>

            {/* Test Buttons */}
            <div className="space-y-4 mb-6">
              <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Testing...' : '1. Run Environment Debug'}
              </button>

              <button
                onClick={testMinimalSignup}
                disabled={isLoading}
                className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 ml-0 md:ml-2"
              >
                {isLoading ? 'Testing...' : '2. Test Minimal Signup API'}
              </button>

              <button
                onClick={testFullSignupDebug}
                disabled={isLoading}
                className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 ml-0 md:ml-2"
              >
                {isLoading ? 'Testing...' : '3. Full Signup Debug'}
              </button>
            </div>

            {/* Navigation Links */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Quick Links:</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/signup-minimal')}
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Go to Minimal Signup Page
                </button>
                <button
                  onClick={() => router.push('/signup-production')}
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Go to Production Signup Page
                </button>
                <button
                  onClick={() => router.push('/signin-simple')}
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Go to Sign In (that works)
                </button>
              </div>
            </div>

            {/* Debug Results */}
            {debugData && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">🔍 Debug Results:</h3>
                <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto max-h-96">
                  {JSON.stringify(debugData, null, 2)}
                </pre>
              </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">🧪 Test Results:</h3>
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className={`p-3 rounded-md text-sm ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <div className="font-medium">
                        {result.success ? '✅' : '❌'} Test #{index + 1} - {result.timestamp}
                      </div>
                      {result.email && <div>Email: {result.email}</div>}
                      {result.status && <div>Status: {result.status}</div>}
                      {result.error && <div>Error: {result.error}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}