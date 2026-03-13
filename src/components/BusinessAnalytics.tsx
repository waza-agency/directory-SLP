import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { AnalyticsData } from '@/pages/api/business/analytics';

function StatCard({ label, value, icon, accent }: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border-l-4" style={{ borderLeftColor: accent }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
    timeZone: 'America/Mexico_City',
  });
}

export default function BusinessAnalytics() {
  const { t } = useTranslation('common');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business/analytics')
      .then(res => res.ok ? res.json() : null)
      .then(setData)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('analytics.title', 'Analytics Overview')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('analytics.title', 'Analytics Overview')}
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label={t('analytics.activeListings', 'Active Listings')}
          value={`${data.activeListings}/${data.totalListings}`}
          accent="#4F46E5"
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
        />
        <StatCard
          label={t('analytics.inquiries', 'Contact Inquiries')}
          value={data.totalInquiries}
          accent="#059669"
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          label={t('analytics.revenue', 'Revenue')}
          value={formatCurrency(data.totalRevenue)}
          accent="#D97706"
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label={t('analytics.avgRating', 'Avg Rating')}
          value={data.reviewCount > 0 ? `${data.avgRating}/5` : '—'}
          accent="#EF4444"
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
        />
      </div>

      {/* Actionable Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 mb-6 border border-blue-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {t('analytics.insights', 'Insights & Tips')}
        </h3>
        <ul className="space-y-2">
          {data.totalListings === 0 && (
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">&#8226;</span>
              {t('analytics.insightNoListings', 'Create your first listing to start attracting customers.')}
            </li>
          )}
          {data.totalListings > 0 && data.totalInquiries === 0 && (
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">&#8226;</span>
              {t('analytics.insightNoInquiries', 'Your listings have no inquiries yet. Try adding detailed descriptions and photos to attract more customers.')}
            </li>
          )}
          {data.totalListings > 0 && data.activeListings < data.totalListings && (
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">&#8226;</span>
              {t('analytics.insightInactiveListings', `You have ${data.totalListings - data.activeListings} inactive listing(s). Activate them to increase your visibility.`)}
            </li>
          )}
          {data.reviewCount === 0 && data.totalListings > 0 && (
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">&#8226;</span>
              {t('analytics.insightNoReviews', 'Ask satisfied customers to leave a review — businesses with reviews get 2x more inquiries.')}
            </li>
          )}
          {data.newInquiries > 0 && (
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-amber-500 mt-0.5">&#8226;</span>
              {t('analytics.insightNewInquiries', `You have ${data.newInquiries} new inquiry(ies). Respond quickly to increase conversion.`)}
            </li>
          )}
          {data.totalListings > 0 && data.totalInquiries > 0 && data.reviewCount > 0 && (
            <li className="flex items-start gap-2 text-sm text-green-700">
              <span className="text-green-500 mt-0.5">&#8226;</span>
              {t('analytics.insightGood', 'Your business is performing well. Keep your listings updated to maintain momentum.')}
            </li>
          )}
        </ul>
      </div>

      {/* Recent Inquiries + Export */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            {t('analytics.recentInquiries', 'Recent Inquiries')}
            {data.newInquiries > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {data.newInquiries} {t('analytics.new', 'new')}
              </span>
            )}
          </h3>
          {/* CSV Export Button */}
          <button
            onClick={() => exportAnalyticsCSV(data)}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            title="Export analytics data as CSV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('analytics.export', 'Export CSV')}
          </button>
        </div>

        {data.recentInquiries.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {data.recentInquiries.map(inquiry => (
              <li key={inquiry.id} className="px-5 py-3 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{inquiry.customer_name}</p>
                  <p className="text-xs text-gray-500 truncate">{inquiry.subject}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status] || 'bg-gray-100 text-gray-800'}`}>
                    {inquiry.status}
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:inline">{formatDate(inquiry.created_at)}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-5 py-8 text-center text-sm text-gray-500">
            {t('analytics.noInquiries', 'No inquiries yet. Share your listing to get started.')}
          </div>
        )}
      </div>
    </div>
  );
}

function exportAnalyticsCSV(data: AnalyticsData) {
  const rows = [
    ['Metric', 'Value'],
    ['Total Listings', String(data.totalListings)],
    ['Active Listings', String(data.activeListings)],
    ['Total Inquiries', String(data.totalInquiries)],
    ['New Inquiries', String(data.newInquiries)],
    ['Total Revenue (MXN)', String(data.totalRevenue)],
    ['Average Rating', data.reviewCount > 0 ? String(data.avgRating) : 'N/A'],
    ['Review Count', String(data.reviewCount)],
    [''],
    ['Recent Inquiries'],
    ['Name', 'Subject', 'Status', 'Date'],
    ...data.recentInquiries.map(i => [i.customer_name, i.subject, i.status, i.created_at]),
  ];

  const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
