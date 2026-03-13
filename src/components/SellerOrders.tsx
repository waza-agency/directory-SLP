import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { SellerOrdersResponse, SellerOrder } from '@/pages/api/business/orders';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    timeZone: 'America/Mexico_City',
  });
}

const statusStyles: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function SellerOrders() {
  const { t } = useTranslation('common');
  const [data, setData] = useState<SellerOrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business/orders')
      .then((res) => (res.ok ? res.json() : null))
      .then(setData)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('marketplace.sellerOrders', 'Orders & Earnings')}
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!data || data.totalOrders === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('marketplace.sellerOrders', 'Orders & Earnings')}
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-500 text-sm">
            {t('marketplace.noOrdersYet', 'No orders received yet. Orders will appear here when customers purchase your products.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('marketplace.sellerOrders', 'Orders & Earnings')}
      </h2>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">{t('marketplace.totalEarnings', 'Total Earnings')}</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(data.totalEarnings)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">{t('marketplace.pendingPayouts', 'Pending Payouts')}</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(data.pendingPayouts)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
          <p className="text-sm text-gray-500">{t('marketplace.totalOrders', 'Total Orders')}</p>
          <p className="text-xl font-bold text-gray-900">{data.totalOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">
            {t('marketplace.recentOrders', 'Recent Orders')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('marketplace.date', 'Date')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('marketplace.amount', 'Amount')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('marketplace.yourEarnings', 'Your Earnings')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('marketplace.status', 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.orders.map((order: SellerOrder) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-3 text-sm font-medium">{formatCurrency(order.total_amount)}</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">{formatCurrency(order.seller_payout)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status] || 'bg-gray-100 text-gray-800'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
