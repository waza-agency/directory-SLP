import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  };
};

export default function RebuildSite() {
  const [loading, setLoading] = useState(false);
  const [fixingDates, setFixingDates] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const triggerRebuild = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      const response = await fetch('/api/rebuild-site', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to rebuild site');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fixEventDates = async () => {
    try {
      setFixingDates(true);
      setError(null);
      setResult(null);
      
      const response = await fetch('/api/fix-event-dates', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fix event dates');
      }
      
      setResult({
        ...data,
        message: `${data.message}. You should now rebuild the site to see the changes.`
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setFixingDates(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head>
        <title>Admin - Rebuild Site</title>
      </Head>

      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Rebuild Site
        </h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-6">
            Use this page to force a rebuild of the site and clear the cache. This will ensure all
            your latest events and content are visible.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={triggerRebuild}
              disabled={loading || fixingDates}
              className={`w-full px-6 py-3 text-white rounded-md ${
                loading || fixingDates ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {loading ? 'Rebuilding...' : 'Rebuild Now'}
            </button>
            
            <button
              onClick={fixEventDates}
              disabled={loading || fixingDates}
              className={`w-full px-6 py-3 text-white rounded-md ${
                loading || fixingDates ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
              } transition-colors`}
            >
              {fixingDates ? 'Fixing Dates...' : 'Fix Event Dates'}
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              The "Fix Event Dates" button will scan for events with missing or invalid dates and fix them automatically.
            </p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            Error: {error}
          </div>
        )}
        
        {result && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
            <p className="font-bold">Success!</p>
            <p>{result.message}</p>
            {result.fixedEvents && result.fixedEvents.length > 0 && (
              <div className="mt-2">
                <p>Fixed {result.fixedEvents.length} events.</p>
              </div>
            )}
            <p className="mt-4 text-sm">
              It may take a minute for changes to be visible on the site.
            </p>
          </div>
        )}
        
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Other Admin Tools</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin/debug-events" 
                className="text-blue-600 hover:underline"
              >
                View/Debug All Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 