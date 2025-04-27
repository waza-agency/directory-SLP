import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  };
};

export default function DebugEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/debug-events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
        setNow(data.now);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head>
        <title>Debug Events</title>
      </Head>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Debug Events</h1>
        <p className="mb-4">Current server time: <span className="font-mono">{now}</span></p>
        
        {loading && <div className="text-center py-12">Loading events...</div>}
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="mb-6">Found {events.length} events in the database</p>
            
            <div className="bg-white shadow overflow-hidden rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => {
                    // Determine event status
                    let status = 'Unknown';
                    let statusColor = 'gray';
                    
                    if (event._diagnostics) {
                      const d = event._diagnostics;
                      
                      if (!d.startDateValid) {
                        status = 'Invalid start date';
                        statusColor = 'red';
                      } else if (d.endDateValid === false) {
                        status = 'Invalid end date';
                        statusColor = 'red';
                      } else if (d.startDateIsFuture) {
                        status = 'Upcoming';
                        statusColor = 'green';
                      } else if (d.endDateIsFuture === true) {
                        status = 'Ongoing';
                        statusColor = 'blue';
                      } else {
                        status = 'Past';
                        statusColor = 'yellow';
                      }
                    }

                    return (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {event.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event._diagnostics?.startDateFormatted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event._diagnostics?.endDateFormatted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.featured ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Event Details (Raw Data)</h2>
              <div className="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(events, null, 2)}</pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 