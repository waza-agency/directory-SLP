import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function FixedSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('⚠️ Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setMessage('⚠️ Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setMessage('🔄 Creating your account...');

    try {
      const response = await fetch('/api/robust-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setDebugInfo(data);

      if (data.success) {
        setMessage('✅ Account created successfully! Check your email for confirmation.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Redirect to account page after 3 seconds
        setTimeout(() => {
          router.push('/account');
        }, 3000);
      } else {
        setMessage(`❌ Signup failed: ${data.error}`);
      }
    } catch (error: any) {
      setMessage(`❌ Network error: ${error.message}`);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Fixed Signup - SLP Directory</title>
        <meta name="description" content="Test the fixed signup functionality" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🔧 Fixed Signup Test
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Testing the production signup fix
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            {message && (
              <div className="mt-4 p-3 rounded-md bg-gray-100 border">
                <p className="text-sm text-gray-800">{message}</p>
              </div>
            )}

            {debugInfo && (
              <div className="mt-4 p-3 rounded-md bg-gray-50 border">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Debug Info:</h4>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Test Options</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="/api/debug-production-issue"
                  target="_blank"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  🔍 Debug API
                </a>

                <button
                  type="button"
                  onClick={() => window.location.href = '/signup'}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  🔙 Original Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Remove the getServerSideProps to avoid i18n issues
export async function getServerSideProps() {
  return {
    props: {},
  };
}