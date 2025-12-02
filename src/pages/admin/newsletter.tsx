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
  const [activeTab, setActiveTab] = useState<'subscribers' | 'newsletters' | 'send'>('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [subscriberCounts, setSubscriberCounts] = useState({ active: 0, unsubscribed: 0, bounced: 0 });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Send form state
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

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
      else if (activeTab === 'newsletters') fetchNewsletters();
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
    if (savedKey) setAdminKey(savedKey);
  }, []);

  const createAndSendNewsletter = async (sendToAll: boolean) => {
    if (!subject.trim() || !htmlContent.trim()) {
      alert('Subject and HTML content are required');
      return;
    }
    if (!sendToAll && !testEmail.trim()) {
      alert('Please enter a test email address');
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      // First create the newsletter
      const createRes = await fetch('/api/newsletter/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ subject, html_content: htmlContent })
      });
      const createData = await createRes.json();

      if (!createRes.ok) throw new Error(createData.message || 'Failed to create newsletter');

      // Then send it
      const sendRes = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({
          newsletter_id: createData.newsletter.id,
          test_email: sendToAll ? undefined : testEmail
        })
      });
      const sendData = await sendRes.json();

      if (sendRes.ok) {
        setSendResult({
          success: true,
          message: sendToAll
            ? `Newsletter sent to ${sendData.stats?.sent || 0} subscribers!`
            : `Test email sent to ${testEmail}`
        });
        if (sendToAll) {
          setSubject('');
          setHtmlContent('');
        }
      } else {
        throw new Error(sendData.message || 'Failed to send newsletter');
      }
    } catch (error) {
      setSendResult({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred'
      });
    }
    setSending(false);
  };

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
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
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
            <button
              onClick={() => setActiveTab('send')}
              className={`px-6 py-2 rounded-lg font-medium ${activeTab === 'send' ? 'bg-terracotta text-white' : 'bg-white text-gray-600'}`}
            >
              ✉️ Send Newsletter
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            {/* SUBSCRIBERS TAB */}
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
                  <button onClick={fetchSubscribers} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : subscribers.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No subscribers yet</div>
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

            {/* NEWSLETTERS TAB */}
            {activeTab === 'newsletters' && (
              <div>
                <div className="p-4 border-b">
                  <button onClick={fetchNewsletters} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
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
                              nl.status === 'sending' ? 'bg-blue-100 text-blue-700' :
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

            {/* SEND NEWSLETTER TAB */}
            {activeTab === 'send' && (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Send Newsletter</h2>

                {sendResult && (
                  <div className={`mb-6 p-4 rounded-lg ${sendResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {sendResult.message}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., San Luis Way Weekly - Dec 1-7"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HTML Content *
                    </label>
                    <textarea
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                      placeholder="Paste your newsletter HTML here..."
                      rows={12}
                      className="w-full px-4 py-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste the complete HTML from your newsletter file
                    </p>
                  </div>

                  {/* Preview */}
                  {htmlContent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                      </div>
                    </div>
                  )}

                  {/* Test Email */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Test Email</h3>
                    <div className="flex gap-4">
                      <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-3 border rounded-lg"
                      />
                      <button
                        onClick={() => createAndSendNewsletter(false)}
                        disabled={sending || !subject || !htmlContent}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? 'Sending...' : 'Send Test'}
                      </button>
                    </div>
                  </div>

                  {/* Send to All */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-2">Send to All Subscribers</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This will send the newsletter to all {subscriberCounts.active} active subscribers.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to send this newsletter to ${subscriberCounts.active} subscribers?`)) {
                          createAndSendNewsletter(true);
                        }
                      }}
                      disabled={sending || !subject || !htmlContent}
                      className="px-8 py-3 bg-terracotta text-white rounded-lg font-semibold hover:bg-terracotta/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Sending...' : `Send to ${subscriberCounts.active} Subscribers`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
