import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/supabase-auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { isAdminAuthenticated, removeAdminAuth } from '@/lib/admin-auth';
import { GetServerSideProps } from 'next';
import { withAdminPageAuth } from '@/lib/admin-auth';

type Subscription = {
  id: string;
  user_id: string;
  business_id: string;
  business_name: string | null;
  email: string | null;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  subscription_status: string;
  created_at: string;
};

type SyncStats = {
  total: number;
  updated: number;
  errors: number;
  skipped: number;
  alreadyCorrect: number;
};

export default function AdminSubscriptions() {
  const router = useRouter();
  const { session } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTestingStripe, setIsTestingStripe] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [stripeTestResult, setStripeTestResult] = useState<any>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  // Logout from admin panel
  const handleLogout = () => {
    removeAdminAuth();
    router.push('/admin/login');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchSubscriptions();
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    // Check client-side admin authentication as a fallback
    if (!isAdminAuthenticated()) {
      router.push('/admin/login?redirect=/admin/subscriptions');
      return;
    }
    
    loadData();
  }, [router]);

  const fetchSubscriptions = async () => {
    try {
      // Get subscriptions with business_profiles join to show business names
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          id,
          user_id,
          stripe_subscription_id,
          stripe_customer_id,
          status,
          created_at,
          users!inner (
            email
          ),
          business_profiles!inner (
            id,
            business_name,
            subscription_status
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions:', error);
        return;
      }

      // Transform data to flatten the structure
      const formattedSubscriptions = data.map(sub => ({
        id: sub.id,
        user_id: sub.user_id,
        business_id: sub.business_profiles?.id,
        business_name: sub.business_profiles?.business_name,
        email: sub.users?.email,
        stripe_subscription_id: sub.stripe_subscription_id,
        stripe_customer_id: sub.stripe_customer_id,
        subscription_status: sub.business_profiles?.subscription_status,
        created_at: sub.created_at
      }));

      setSubscriptions(formattedSubscriptions);
    } catch (err) {
      console.error('Error in fetchSubscriptions:', err);
    }
  };

  const updateSubscriptionStatus = async (businessId: string, newStatus: string) => {
    setIsUpdating(businessId);
    setMessage(null);
    
    try {
      // Update the business_profile record
      const { error } = await supabase
        .from('business_profiles')
        .update({ 
          subscription_status: newStatus,
          // If activating, also update these fields
          ...(newStatus === 'active' && {
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          })
        })
        .eq('id', businessId);

      if (error) {
        console.error('Error updating subscription status:', error);
        setMessage({ text: `Error: ${error.message}`, type: 'error' });
        return;
      }

      // Get the user_id from business_profile
      const { data: businessData, error: businessError } = await supabase
        .from('business_profiles')
        .select('user_id')
        .eq('id', businessId)
        .single();

      if (businessError) {
        console.error('Error getting user_id from business profile:', businessError);
      } else if (businessData?.user_id) {
        // Update the users table has_active_subscription field
        const { error: userError } = await supabase
          .from('users')
          .update({ 
            has_active_subscription: newStatus === 'active',
            account_type: newStatus === 'active' ? 'business' : 'user'
          })
          .eq('id', businessData.user_id);

        if (userError) {
          console.error('Error updating user subscription status:', userError);
        }
      }

      // Refresh the data
      fetchSubscriptions();
      setMessage({ text: `Subscription ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`, type: 'success' });
    } catch (err) {
      console.error('Error in updateSubscriptionStatus:', err);
      setMessage({ text: 'An unexpected error occurred', type: 'error' });
    } finally {
      setIsUpdating(null);
    }
  };

  const syncWithStripe = async () => {
    setIsSyncing(true);
    setSyncStats(null);
    setMessage(null);
    
    try {
      // Get token from session if available or use a fake token (we're using cookie auth)
      const token = session?.access_token || "admin-auth-cookie";
      
      console.log('Making sync-subscriptions API request...');
      
      const response = await fetch('/api/admin/sync-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);
      console.log('Response status:', response.status);
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Error: Non-JSON response received:', text);
        setMessage({ 
          text: 'Server returned an invalid response. Check console for details.', 
          type: 'error' 
        });
        return;
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      if (!response.ok) {
        console.error('API error details:', data);
        setMessage({ text: data.message || 'Error syncing with Stripe', type: 'error' });
        return;
      }
      
      setSyncStats(data.stats);
      setMessage({ 
        text: `Sync completed: ${data.stats.updated} subscriptions updated, ${data.stats.alreadyCorrect} already correct`, 
        type: 'success' 
      });
      
      // Refresh subscription data
      fetchSubscriptions();
    } catch (err: any) {
      console.error('Error syncing with Stripe:', err);
      setMessage({ text: err.message || 'Error syncing with Stripe', type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  const testStripeConnection = async () => {
    setIsTestingStripe(true);
    setMessage(null);
    setStripeTestResult(null);
    
    try {
      const token = session?.access_token || "admin-auth-cookie";
      
      console.log('Testing Stripe connection...');
      
      const response = await fetch('/api/admin/test-stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const contentType = response.headers.get('content-type');
      console.log('Test response status:', response.status);
      console.log('Test response content type:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Error: Non-JSON test response:', text);
        setMessage({ 
          text: 'Server returned an invalid response for Stripe test. Check console.', 
          type: 'error' 
        });
        return;
      }
      
      const data = await response.json();
      console.log('Stripe test response:', data);
      setStripeTestResult(data);
      
      if (!response.ok) {
        setMessage({ 
          text: `Stripe test failed: ${data.message || 'Unknown error'}`, 
          type: 'error' 
        });
        return;
      }
      
      setMessage({ 
        text: `Stripe connection successful. Found ${data.subscriptionCount} subscriptions.`, 
        type: 'success' 
      });
    } catch (err: any) {
      console.error('Error testing Stripe:', err);
      setMessage({ text: `Error testing Stripe: ${err.message}`, type: 'error' });
    } finally {
      setIsTestingStripe(false);
    }
  };

  const updateSubscriptionFromStripe = async (subscriptionId: string) => {
    setIsUpdating(subscriptionId);
    setMessage(null);
    
    try {
      const token = session?.access_token || "admin-auth-cookie";
      
      console.log(`Manually updating subscription: ${subscriptionId}...`);
      
      const response = await fetch('/api/admin/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subscriptionId })
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Error: Non-JSON response:', text);
        setMessage({ 
          text: 'Server returned an invalid response. Check console.', 
          type: 'error' 
        });
        return;
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage({ text: data.message || 'Error updating subscription', type: 'error' });
        return;
      }
      
      setMessage({ 
        text: `Subscription updated successfully: ${data.message}`, 
        type: 'success' 
      });
      
      // Refresh data
      fetchSubscriptions();
      
      // If diagnosis is active, refresh it
      if (diagnosisResult) {
        diagnoseSubscriptions();
      }
    } catch (err: any) {
      console.error('Error updating subscription:', err);
      setMessage({ text: err.message || 'Error updating subscription', type: 'error' });
    } finally {
      setIsUpdating(null);
    }
  };

  const diagnoseSubscriptions = async () => {
    setIsDiagnosing(true);
    setMessage(null);
    setDiagnosisResult(null);
    
    try {
      const token = session?.access_token || "admin-auth-cookie";
      
      console.log('Diagnosing subscriptions...');
      
      const response = await fetch('/api/admin/get-supabase-subs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const contentType = response.headers.get('content-type');
      console.log('Diagnosis response status:', response.status);
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Error: Non-JSON diagnosis response:', text);
        setMessage({ 
          text: 'Server returned an invalid response for diagnosis. Check console.', 
          type: 'error' 
        });
        return;
      }
      
      const data = await response.json();
      console.log('Diagnosis response:', data);
      
      // Ensure data has the expected structure
      const safeData = {
        message: data.message || 'Unknown response',
        subscriptions: Array.isArray(data.subscriptions) ? data.subscriptions : [],
        needsUpdate: typeof data.needsUpdate === 'number' ? data.needsUpdate : 0
      };
      
      setDiagnosisResult(safeData);
      
      if (!response.ok) {
        setMessage({ 
          text: `Diagnosis failed: ${data.message || 'Unknown error'}`, 
          type: 'error' 
        });
        return;
      }
      
      if (safeData.needsUpdate > 0) {
        setMessage({ 
          text: `Found ${safeData.needsUpdate} subscription(s) that need updating.`, 
          type: 'error' 
        });
      } else if (safeData.subscriptions.length === 0) {
        setMessage({
          text: 'No subscriptions found in the database.',
          type: 'info'
        });
      } else {
        setMessage({ 
          text: 'All subscriptions are correctly synchronized.', 
          type: 'success' 
        });
      }
    } catch (err: any) {
      console.error('Error diagnosing subscriptions:', err);
      setMessage({ text: `Error: ${err.message}`, type: 'error' });
      // Set an empty result to avoid undefined errors
      setDiagnosisResult({
        message: 'Error fetching data',
        subscriptions: [],
        needsUpdate: 0
      });
    } finally {
      setIsDiagnosing(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin: Manage Subscriptions | Directory SLP</title>
      </Head>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Subscriptions</h1>
            <p className="text-gray-600">View and update subscription statuses for business accounts.</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Admin Logout
          </button>
        </div>
        
        <div className="mb-8">
          <div className="mt-4 flex items-center space-x-4 flex-wrap gap-y-2">
            <button
              onClick={syncWithStripe}
              disabled={isSyncing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
            >
              {isSyncing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </>
              ) : (
                "Sync with Stripe"
              )}
            </button>
            
            <button
              onClick={testStripeConnection}
              disabled={isTestingStripe}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 flex items-center"
            >
              {isTestingStripe ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Testing...
                </>
              ) : (
                "Test Stripe Connection"
              )}
            </button>
            
            <button
              onClick={diagnoseSubscriptions}
              disabled={isDiagnosing}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:bg-amber-400 flex items-center"
            >
              {isDiagnosing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Diagnosing...
                </>
              ) : (
                "Diagnose Subscription Issues"
              )}
            </button>
            
            <button
              onClick={fetchSubscriptions}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Refresh Data
            </button>
          </div>
          
          {message && (
            <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {message.text}
            </div>
          )}
          
          {stripeTestResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
              <h3 className="font-medium text-blue-800 mb-2">Stripe Test Results:</h3>
              <pre className="bg-white p-3 rounded overflow-auto max-h-60">
                {JSON.stringify(stripeTestResult, null, 2)}
              </pre>
            </div>
          )}
          
          {diagnosisResult && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg text-sm">
              <h3 className="font-medium text-amber-800 mb-2">Subscription Diagnosis Results:</h3>
              <div className="bg-white p-3 rounded mb-3">
                <p className="mb-2">
                  <span className="font-medium">Subscriptions with issues:</span> {diagnosisResult.needsUpdate} of {diagnosisResult.subscriptions?.length || 0}
                </p>
                {diagnosisResult.needsUpdate > 0 && (
                  <p className="text-red-600 text-xs">Some subscriptions in Supabase don't match their status in Stripe.</p>
                )}
              </div>
              {diagnosisResult.subscriptions && diagnosisResult.subscriptions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-amber-200 divide-y divide-amber-200">
                    <thead className="bg-amber-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Business</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Stripe ID</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Stripe Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Supabase Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Correct Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Status Match</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-amber-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-amber-200">
                      {diagnosisResult.subscriptions.map((sub) => (
                        <tr key={sub.id} className={!sub.status_match ? 'bg-red-50' : ''}>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{sub.business_name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{sub.stripe_subscription_id}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{sub.stripe_data?.status || 'N/A'}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{sub.supabase_status.subscription_status}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{sub.correct_status}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs">
                            <span className={sub.status_match ? 'text-green-600' : 'text-red-600'}>
                              {sub.status_match ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs">
                            {!sub.status_match && (
                              <button
                                onClick={() => updateSubscriptionFromStripe(sub.stripe_subscription_id)}
                                disabled={isUpdating === sub.stripe_subscription_id}
                                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
                              >
                                {isUpdating === sub.stripe_subscription_id ? 'Updating...' : 'Fix'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white p-4 rounded text-center">
                  <p className="text-gray-500">No subscription data available or no subscriptions found.</p>
                </div>
              )}
            </div>
          )}
          
          {syncStats && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
              <h3 className="font-medium text-blue-800 mb-2">Sync Statistics:</h3>
              <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <li className="bg-white p-2 rounded shadow-sm">
                  <span className="block text-gray-500">Total</span>
                  <span className="font-medium">{syncStats.total}</span>
                </li>
                <li className="bg-white p-2 rounded shadow-sm">
                  <span className="block text-gray-500">Updated</span>
                  <span className="font-medium text-green-600">{syncStats.updated}</span>
                </li>
                <li className="bg-white p-2 rounded shadow-sm">
                  <span className="block text-gray-500">Already Correct</span>
                  <span className="font-medium text-blue-600">{syncStats.alreadyCorrect}</span>
                </li>
                <li className="bg-white p-2 rounded shadow-sm">
                  <span className="block text-gray-500">Skipped</span>
                  <span className="font-medium text-yellow-600">{syncStats.skipped}</span>
                </li>
                <li className="bg-white p-2 rounded shadow-sm">
                  <span className="block text-gray-500">Errors</span>
                  <span className="font-medium text-red-600">{syncStats.errors}</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe Subscription ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No subscriptions found
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{subscription.business_name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{subscription.business_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${subscription.subscription_status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : subscription.subscription_status === 'canceled' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'}`}>
                        {subscription.subscription_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.stripe_subscription_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscription.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {isUpdating === subscription.business_id ? (
                        <span className="text-gray-500">Updating...</span>
                      ) : subscription.subscription_status === 'active' ? (
                        <button
                          onClick={() => updateSubscriptionStatus(subscription.business_id, 'inactive')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubscriptionStatus(subscription.business_id, 'active')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Use the admin authentication middleware
export const getServerSideProps: GetServerSideProps = withAdminPageAuth(); 