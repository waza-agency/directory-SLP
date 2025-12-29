import React, { useState, useEffect, useCallback } from 'react';
import SEO from '@/components/common/SEO';
import dynamic from 'next/dynamic';

const NewsletterEditor = dynamic(() => import('@/components/admin/NewsletterEditor'), { ssr: false });

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
  html_content?: string;
  preview_text?: string;
  stats?: { sent: number; failed: number };
}

interface BeehiivResult {
  success: boolean;
  post_id?: string;
  edit_url?: string;
}

interface GeneratedNewsletter {
  id?: string;
  subject: string;
  preview_text: string;
  html_content?: string;
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
  const [customContent, setCustomContent] = useState('');
  const [generating, setGenerating] = useState(false);
  const [beehiivResult, setBeehiivResult] = useState<BeehiivResult | null>(null);
  const [generationMessage, setGenerationMessage] = useState('');
  const [generatedNewsletter, setGeneratedNewsletter] = useState<GeneratedNewsletter | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<{ id?: string; subject: string; html: string } | null>(null);

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

  const handleGenerate = async () => {
    if (!confirm('This will use AI to generate a newsletter. It may take 30-60 seconds. Continue?')) return;

    setGenerating(true);
    setBeehiivResult(null);
    setGenerationMessage('');
    setGeneratedNewsletter(null);
    setCopied(false);

    try {
      const res = await fetch('/api/newsletter/generate', {
        method: 'POST',
        headers: {
          'x-admin-key': adminKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customContent: customContent.trim() || undefined })
      });

      // Safely parse response - handle HTML error pages
      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        // If response is not JSON (e.g., HTML error page), show the first part
        console.error('Non-JSON response:', responseText.substring(0, 500));
        throw new Error(`Server error (status ${res.status}). Check server logs for details.`);
      }

      if (res.ok) {
        setSubject(data.newsletter?.subject || '');
        setHtmlContent(data.newsletter?.html_content || '');
        setBeehiivResult(data.beehiiv);
        setGenerationMessage(data.message);
        setGeneratedNewsletter(data.newsletter);
      } else {
        throw new Error(data.error || data.message || 'Failed to generate');
      }
    } catch (error) {
      alert('Error generating newsletter: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
    setGenerating(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportHtmlFile = (htmlContent: string, subject: string) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = subject
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
    link.href = url;
    link.download = `${filename}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveNewsletter = async (html: string) => {
    try {
      const res = await fetch('/api/newsletter/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({
          id: editingNewsletter?.id,
          subject: editingNewsletter?.subject || subject,
          html_content: html,
          status: 'draft'
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Newsletter saved successfully!');
        // Update parent state with edited HTML
        setHtmlContent(html);
        if (generatedNewsletter) {
          setGeneratedNewsletter({ ...generatedNewsletter, html_content: html });
        }
        if (editingNewsletter) {
          setEditingNewsletter({ ...editingNewsletter, html });
        }
        fetchNewsletters();
      } else {
        alert('Failed to save: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error saving newsletter');
      console.error(error);
    }
  };

  const openEditor = (newsletter: Newsletter | GeneratedNewsletter) => {
    setEditingNewsletter({
      id: newsletter.id,
      subject: newsletter.subject,
      html: newsletter.html_content || ''
    });
    setShowEditor(true);
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
            <div className="flex items-center gap-4">
              <a
                href="https://app.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400"
              >
                Open Beehiiv Dashboard
              </a>
              <button
                onClick={() => { setIsAuthenticated(false); localStorage.removeItem('newsletter_admin_key'); }}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
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
              Generate Newsletter
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
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
                          <td className="px-4 py-3 text-sm flex gap-2">
                            <button
                              onClick={() => setSelectedNewsletter(nl)}
                              className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                            >
                              View
                            </button>
                            {nl.html_content && (
                              <>
                                <button
                                  onClick={() => openEditor(nl)}
                                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => exportHtmlFile(nl.html_content || '', nl.subject)}
                                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                                >
                                  Export
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Newsletter Preview Modal */}
                {selectedNewsletter && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <div>
                          <h3 className="font-bold text-lg">{selectedNewsletter.subject}</h3>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(selectedNewsletter.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {selectedNewsletter.html_content && (
                            <>
                              <button
                                onClick={() => {
                                  copyToClipboard(selectedNewsletter.html_content || '');
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  copied ? 'bg-green-500 text-white' : 'bg-terracotta text-white hover:bg-terracotta/90'
                                }`}
                              >
                                {copied ? '✓ Copied!' : 'Copy HTML'}
                              </button>
                              <button
                                onClick={() => exportHtmlFile(selectedNewsletter.html_content || '', selectedNewsletter.subject)}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                              >
                                ⬇ Export HTML
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSelectedNewsletter(null)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4">
                        {selectedNewsletter.html_content ? (
                          <div
                            className="newsletter-preview"
                            dangerouslySetInnerHTML={{ __html: selectedNewsletter.html_content }}
                          />
                        ) : (
                          <p className="text-gray-500 text-center py-8">No HTML content available for this newsletter.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GENERATE NEWSLETTER TAB */}
            {activeTab === 'send' && (
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-2">Generate Newsletter with AI</h2>
                  <p className="text-gray-600 mb-4">
                    Click the button below to generate a newsletter draft using AI. The draft will be created directly in Beehiiv where you can edit and send it.
                  </p>

                  {/* Custom Content Section - Comunidad */}
                  <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <label htmlFor="customContent" className="block text-sm font-semibold text-purple-800 mb-2">
                      🤝 Comunidad Section (Optional)
                    </label>
                    <p className="text-sm text-purple-700 mb-3">
                      Add promotions, announcements, or special messages. These will appear in a dedicated <strong>&quot;Comunidad&quot;</strong> section in the newsletter, styled to feel like community news.
                    </p>
                    <textarea
                      id="customContent"
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                      placeholder="Example:&#10;- 20% off at Café Tulum this weekend with code SLWAY20&#10;- Join our community meetup next Saturday at Plaza de Armas at 5pm&#10;- Special thanks to our sponsors: Restaurant X, Service Y&#10;- New yoga classes at Centro Cultural - first class free!"
                      className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[120px] text-sm"
                      rows={5}
                    />
                    <p className="text-xs text-purple-600 mt-2">
                      💡 Tip: Be specific! Include dates, discount codes, locations, and any details readers need. The AI will adapt your content to match the newsletter&apos;s friendly tone.
                    </p>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {generating ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating... (30-60 seconds)
                      </>
                    ) : (
                      <>Generate Newsletter with AI</>
                    )}
                  </button>
                </div>

                {/* Success Message with Content */}
                {generatedNewsletter && (
                  <div className="mb-8 p-6 rounded-lg bg-green-50 border border-green-200">
                    <h3 className="font-bold text-lg mb-2">Newsletter Generated!</h3>
                    <p className="text-gray-700 mb-4">{generationMessage}</p>

                    {/* Subject with copy button */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={subject}
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-lg bg-white"
                        />
                        <button
                          onClick={() => copyToClipboard(subject)}
                          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Preview Text */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preview Text:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={generatedNewsletter.preview_text}
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-lg bg-white"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedNewsletter.preview_text)}
                          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Copy HTML button */}
                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => copyToClipboard(htmlContent)}
                        className={`px-6 py-3 rounded-lg font-bold transition ${
                          copied
                            ? 'bg-green-500 text-white'
                            : 'bg-terracotta text-white hover:bg-terracotta/90'
                        }`}
                      >
                        {copied ? 'Copied!' : 'Copy HTML Content'}
                      </button>
                      <a
                        href="https://app.beehiiv.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-400 transition"
                      >
                        Open Beehiiv Dashboard
                      </a>
                    </div>

                    {/* HTML Preview */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                        <span className="text-sm font-medium">HTML Preview</span>
                        <button
                          onClick={() => copyToClipboard(htmlContent)}
                          className={`px-4 py-1 rounded text-sm font-medium transition ${
                            copied
                              ? 'bg-green-500 text-white'
                              : 'bg-terracotta text-white hover:bg-terracotta/90'
                          }`}
                        >
                          {copied ? '✓ Copied!' : '📋 Copy HTML'}
                        </button>
                      </div>
                      <div
                        className="p-4 bg-white max-h-96 overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    </div>
                  </div>
                )}

                {/* Edit Sections Button */}
                {generatedNewsletter && htmlContent && (
                  <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">Want to edit specific sections?</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Open the section editor to regenerate individual sections like news, events, or tips without regenerating the entire newsletter.
                    </p>
                    <button
                      onClick={() => openEditor(generatedNewsletter)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                    >
                      Open Section Editor
                    </button>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold mb-4">How it works:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Click &quot;Generate Newsletter with AI&quot; to create content</li>
                    <li>The AI searches for news, events, and information about San Luis Potosí</li>
                    <li>Copy the subject line, preview text, and HTML content</li>
                    <li>Open Beehiiv and create a new post</li>
                    <li>Paste the content using the HTML editor mode</li>
                    <li>Review, edit if needed, and send!</li>
                  </ol>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-2">Why send from Beehiiv?</h4>
                    <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                      <li>Better email deliverability</li>
                      <li>Built-in analytics (open rates, clicks)</li>
                      <li>Ad Network monetization</li>
                      <li>Boost cross-promotion opportunities</li>
                      <li>Professional email templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section Editor Modal */}
      {showEditor && editingNewsletter && (
        <NewsletterEditor
          htmlContent={editingNewsletter.html}
          subject={editingNewsletter.subject}
          adminKey={adminKey}
          onSave={handleSaveNewsletter}
          onExport={exportHtmlFile}
          onClose={() => {
            setShowEditor(false);
            setEditingNewsletter(null);
          }}
        />
      )}
    </>
  );
}
