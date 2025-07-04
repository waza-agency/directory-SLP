import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { withAdminPageAuth } from '@/lib/admin-auth';

function SyncStripePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/sync-stripe-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sync failed');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sync Stripe Subscriptions | Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Sync Stripe Subscriptions
              </h1>
              <p className="mt-2 text-gray-600">
                This will sync active subscriptions from Stripe to the database and update user profiles.
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <button
                  onClick={handleSync}
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Syncing...
                    </>
                  ) : (
                    'Start Sync'
                  )}
                </button>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Sync Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        {error}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Sync Completed Successfully
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-white p-3 rounded border">
                            <div className="text-lg font-bold text-gray-900">{result.stats.total}</div>
                            <div className="text-sm text-gray-600">Total Subscriptions</div>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <div className="text-lg font-bold text-green-600">{result.stats.synced}</div>
                            <div className="text-sm text-gray-600">Successfully Synced</div>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <div className="text-lg font-bold text-red-600">{result.stats.errors}</div>
                            <div className="text-sm text-gray-600">Errors</div>
                          </div>
                        </div>

                        {result.results && result.results.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium text-green-800 mb-2">Sync Results:</h4>
                            <div className="max-h-64 overflow-y-auto">
                              {result.results.map((item: any, index: number) => (
                                <div key={index} className={`p-2 mb-2 rounded text-xs ${
                                  item.status === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  <div className="font-medium">
                                    {item.customer_email || 'Unknown'} - {item.status}
                                  </div>
                                  <div className="text-xs opacity-75">
                                    {item.message}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">What this sync does:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Fetches all active subscriptions from Stripe</li>
                  <li>Creates or updates subscription records in the database</li>
                  <li>Updates business profiles with subscription status</li>
                  <li>Sets user account flags (has_active_subscription, is_business)</li>
                  <li>Links Stripe customer IDs to user accounts</li>
                </ul>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => router.push('/admin/subscriptions')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Subscriptions
                </button>
                <button
                  onClick={() => router.push('/listings')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Listings Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminPageAuth(SyncStripePage);

export const getServerSideProps = withAdminPageAuth();