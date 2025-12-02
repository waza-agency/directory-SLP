import React, { useState, useEffect, useCallback } from 'react';
import SEO from '@/components/common/SEO';

interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
  status: string;
  source: string;
  subscribed_at: string;
}

interface Newsletter {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  sent_at?: string;
  stats?: { sent: number; failed: number };
}

export default function NewsletterAdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'newsletters'>('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [subscriberCounts, setSubscriberCounts] = useState({ active: 0, unsubscribed: 0, bounced: 0 });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/newsletter/subscribers?status=${statusFilter}`, {
        headers: { 'x-admin-key': adminKey }
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data.subscribers || []);
        setSubscriberCounts(data.counts || { active: 0, unsubscribed: 0, bounced: 0 });
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
    setLoading(false);
  }, [adminKey, statusFilter]);

  const fetchNewsletters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/newsletters', {
        headers: { 'x-admin-key': adminKey }
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletters(data.newsletters || []);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    }
    setLoading(false);
  }, [adminKey]);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'subscribers') fetchSubscribers();
      else fetchNewsletters();
    }
  }, [isAuthenticated, activeTab, fetchSubscribers, fetchNewsletters]);

  const handleAuth = async () => {
    const res = await fetch('/api/newsletter/subscribers?limit=1', {
      headers: { 'x-admin-key': adminKey }
    });
    if (res.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('newsletter_admin_key', adminKey);
    } else {
      alert('Invalid admin key');
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem('newsletter_admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Newsletter Admin | San Luis Way" noIndex={true} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-6">Newsletter Admin</h1>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full px-4 py-3 border rounded-lg mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            />
            <button
              onClick={handleAuth}
              className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold hover:bg-terracotta/90"
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Newsletter Admin | San Luis Way" noIndex={true} />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Admin</h1>
            <button
              onClick={() => { setIsAuthenticated(false); localStorage.removeItem('newsletter_admin_key'); }}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-500">Active Subscribers</p>
              <p className="text-3xl font-bold text-green-600">{subscriberCounts.active}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-500">Unsubscribed</p>
              <p className="text-3xl font-bold text-gray-400">{subscriberCounts.unsubscribed}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-500">Bounced</p>
              <p className="text-3xl font-bold text-red-500">{subscriberCounts.bounced}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-6 py-2 rounded-lg font-medium ${activeTab === 'subscribers' ? 'bg-terracotta text-white' : 'bg-white text-gray-600'}`}
            >
              Subscribers
            </button>
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`px-6 py-2 rounded-lg font-medium ${activeTab === 'newsletters' ? 'bg-terracotta text-white' : 'bg-white text-gray-600'}`}
            >
              Newsletters
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            {activeTab === 'subscribers' && (
              <div>
                <div className="p-4 border-b flex items-center gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="unsubscribed">Unsubscribed</option>
                    <option value="bounced">Bounced</option>
                  </select>
                  <button onClick={fetchSubscribers} className="px-4 py-2 bg-gray-100 rounded-lg">
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Source</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{sub.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{sub.first_name || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              sub.status === 'active' ? 'bg-green-100 text-green-700' :
                              sub.status === 'unsubscribed' ? 'bg-gray-100 text-gray-600' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{sub.source}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(sub.subscribed_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'newsletters' && (
              <div>
                <div className="p-4 border-b">
                  <button onClick={fetchNewsletters} className="px-4 py-2 bg-gray-100 rounded-lg">
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : newsletters.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No newsletters yet</div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Created</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Sent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {newsletters.map((nl) => (
                        <tr key={nl.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{nl.subject}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              nl.status === 'sent' ? 'bg-green-100 text-green-700' :
                              nl.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {nl.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(nl.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {nl.sent_at ? new Date(nl.sent_at).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
