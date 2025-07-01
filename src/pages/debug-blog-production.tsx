import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
  createdAt: string;
}

interface TestResult {
  test: string;
  status: 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
  time?: number;
}

export default function DebugBlogProduction() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (testName: string, update: Partial<TestResult>) => {
    setTests(prev => prev.map(test =>
      test.test === testName ? { ...test, ...update } : test
    ));
  };

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    const startTime = Date.now();
    updateTest(testName, { status: 'loading' });

    try {
      const result = await testFn();
      const endTime = Date.now();
      updateTest(testName, {
        status: 'success',
        data: result,
        time: endTime - startTime
      });
    } catch (error) {
      const endTime = Date.now();
      updateTest(testName, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        time: endTime - startTime
      });
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests([
      { test: 'Environment Check', status: 'loading' },
      { test: 'Blog API - List Posts', status: 'loading' },
      { test: 'Blog API - Get Specific Post', status: 'loading' },
      { test: 'Direct Blog Page', status: 'loading' },
      { test: 'Supabase Connection', status: 'loading' }
    ]);

    // Test 1: Environment Check
    await runTest('Environment Check', async () => {
      return {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        nodeEnv: process.env.NODE_ENV,
        url: window.location.origin
      };
    });

    // Test 2: Blog API - List Posts
    await runTest('Blog API - List Posts', async () => {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        count: data.length,
        posts: data.slice(0, 3).map((p: BlogPost) => ({ slug: p.slug, title: p.title }))
      };
    });

    // Test 3: Blog API - Get Specific Post
    await runTest('Blog API - Get Specific Post', async () => {
      const testSlugs = [
        'san-luis-rey-tranvia',
        'la-gran-via',
        'corazon-de-xoconostle',
        'guia-completa-rentar-casa-san-luis-potosi-2025',
        'checklist-mudanza-15-pasos-relocacion-slp'
      ];

      const results = [];
      for (const slug of testSlugs) {
        try {
          const response = await fetch(`/api/blog/${slug}`);
          results.push({
            slug,
            status: response.status,
            found: response.ok
          });
        } catch (error) {
          results.push({
            slug,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
      return results;
    });

    // Test 4: Direct Blog Page Access
    await runTest('Direct Blog Page', async () => {
      const testSlug = 'san-luis-rey-tranvia';
      const response = await fetch(`/blog/${testSlug}`);
      return {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        contentType: response.headers.get('content-type')
      };
    });

    // Test 5: Supabase Connection Test
    await runTest('Supabase Connection', async () => {
      const response = await fetch('/api/supabase-test');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    });

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'loading': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⭕';
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'loading': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <>
      <Head>
        <title>Blog Debug - Production</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Blog Debug - Production
              </h1>
              <Link
                href="/"
                className="text-primary hover:text-primary-dark"
              >
                ← Back to Home
              </Link>
            </div>

            <div className="mb-8">
              <button
                onClick={runAllTests}
                disabled={isRunning}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isRunning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-white'
                }`}
              >
                {isRunning ? 'Running Tests...' : 'Run All Tests'}
              </button>
            </div>

            <div className="space-y-6">
              {tests.map((test, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${getStatusColor(test.status)}`}>
                      {getStatusIcon(test.status)} {test.test}
                    </h3>
                    {test.time && (
                      <span className="text-sm text-gray-500">
                        {test.time}ms
                      </span>
                    )}
                  </div>

                  {test.status === 'loading' && (
                    <div className="text-gray-600">Running test...</div>
                  )}

                  {test.status === 'success' && test.data && (
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <pre className="text-sm text-green-800 whitespace-pre-wrap">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    </div>
                  )}

                  {test.status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <div className="text-red-800 font-medium">Error:</div>
                      <div className="text-red-700 mt-1">{test.error}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {tests.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                Click "Run All Tests" to start debugging the blog functionality.
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Debug Information
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <div>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
                <div>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</div>
                <div>Time: {new Date().toISOString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}