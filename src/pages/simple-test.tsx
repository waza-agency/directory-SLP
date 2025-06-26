import { useState } from 'react';
import Head from 'next/head';

export default function SimpleTestPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testDebugAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-minimal-signup');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Simple Test</title>
      </Head>

      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>🧪 Simple Test Page</h1>

        <p>Environment: {process.env.NODE_ENV || 'unknown'}</p>
        <p>This is a basic React page to test if the issue is with React components.</p>

        <button
          onClick={testDebugAPI}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Debug API'}
        </button>

        {result && (
          <pre style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {result}
          </pre>
        )}

        <hr style={{ margin: '20px 0' }} />

        <div>
          <h3>Manual API Tests:</h3>
          <p>Try these URLs directly:</p>
          <ul>
            <li><a href="/api/debug-minimal-signup" target="_blank">/api/debug-minimal-signup</a></li>
            <li><a href="/api/check-production-env" target="_blank">/api/check-production-env</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}