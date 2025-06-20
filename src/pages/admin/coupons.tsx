import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { PlusIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { withAdminPageAuth } from '@/lib/admin-auth';

interface Coupon {
  id: string;
  coupon_code: string;
  name: string;
  description?: string;
  discount_type: 'percent' | 'amount';
  discount_value: number;
  duration: string;
  duration_in_months?: number;
  max_redemptions?: number;
  times_redeemed: number;
  is_active: boolean;
  created_at: string;
  coupon_usage?: Array<{
    id: string;
    user_id: string;
    applied_at: string;
    users: { email: string };
  }>;
}

function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    coupon_code: '',
    name: '',
    description: '',
    discount_type: 'percent' as 'percent' | 'amount',
    discount_value: '',
    duration: 'once' as 'once' | 'repeating' | 'forever',
    duration_in_months: '',
    max_redemptions: ''
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const response = await fetch('/api/admin/coupons/list');
      const data = await response.json();

      if (response.ok) {
        setCoupons(data.coupons);
      } else {
        setError(data.message || 'Error loading coupons');
      }
    } catch (error) {
      console.error('Error loading coupons:', error);
      setError('Error loading coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/coupons/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          discount_value: parseFloat(formData.discount_value),
          duration_in_months: formData.duration_in_months ? parseInt(formData.duration_in_months) : null,
          max_redemptions: formData.max_redemptions ? parseInt(formData.max_redemptions) : null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Coupon created successfully!');
        setFormData({
          coupon_code: '',
          name: '',
          description: '',
          discount_type: 'percent',
          discount_value: '',
          duration: 'once',
          duration_in_months: '',
          max_redemptions: ''
        });
        setShowCreateForm(false);
        loadCoupons();
      } else {
        setError(data.message || 'Error creating coupon');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      setError('Error creating coupon');
    } finally {
      setCreating(false);
    }
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.discount_type === 'percent') {
      return `${coupon.discount_value}% off`;
    } else {
      return `$${coupon.discount_value} off`;
    }
  };

  const formatDuration = (coupon: Coupon) => {
    switch (coupon.duration) {
      case 'once':
        return 'One time';
      case 'forever':
        return 'Forever';
      case 'repeating':
        return `${coupon.duration_in_months} months`;
      default:
        return coupon.duration;
    }
  };

  return (
    <>
      <Head>
        <title>Coupon Management - Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Coupon Management</h1>
                <p className="mt-2 text-gray-600">
                  Create and manage discount coupons for business subscriptions
                </p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Admin
                </Link>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Coupon
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <XMarkIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <button
                  onClick={() => setError('')}
                  className="ml-auto text-red-400 hover:text-red-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
                <button
                  onClick={() => setSuccess('')}
                  className="ml-auto text-green-400 hover:text-green-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Create Form Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Create New Coupon</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coupon Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.coupon_code}
                        onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="DISCOUNT2024"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Holiday Discount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Special discount for new customers"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Type *
                      </label>
                      <select
                        required
                        value={formData.discount_type}
                        onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percent' | 'amount' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="percent">Percentage</option>
                        <option value="amount">Fixed Amount</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        max={formData.discount_type === 'percent' ? '100' : undefined}
                        step={formData.discount_type === 'percent' ? '1' : '0.01'}
                        value={formData.discount_value}
                        onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={formData.discount_type === 'percent' ? '50' : '100.00'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                      </label>
                      <select
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value as 'once' | 'repeating' | 'forever' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="once">One time</option>
                        <option value="repeating">Repeating</option>
                        <option value="forever">Forever</option>
                      </select>
                    </div>

                    {formData.duration === 'repeating' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (Months) *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.duration_in_months}
                          onChange={(e) => setFormData({ ...formData, duration_in_months: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="3"
                        />
                      </div>
                    )}

                    {formData.duration !== 'repeating' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Redemptions
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.max_redemptions}
                          onChange={(e) => setFormData({ ...formData, max_redemptions: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="100"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {creating ? 'Creating...' : 'Create Coupon'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Coupons List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading coupons...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {coupons.length === 0 ? (
                <div className="text-center py-12">
                  <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No coupons</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new coupon.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Coupon
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <li key={coupon.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <TagIcon className="h-6 w-6 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <p className="text-lg font-medium text-gray-900">
                                  {coupon.coupon_code}
                                </p>
                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  coupon.is_active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {coupon.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-900 font-medium">{coupon.name}</p>
                              {coupon.description && (
                                <p className="text-sm text-gray-500">{coupon.description}</p>
                              )}
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <span className="font-medium text-blue-600">
                                  {formatDiscount(coupon)}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{formatDuration(coupon)}</span>
                                <span className="mx-2">•</span>
                                <span>
                                  Used: {coupon.times_redeemed}
                                  {coupon.max_redemptions && ` / ${coupon.max_redemptions}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Created: {new Date(coupon.created_at).toLocaleDateString()}
                          </p>
                          {coupon.coupon_usage && coupon.coupon_usage.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              Last used: {new Date(coupon.coupon_usage[0].applied_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Usage Details */}
                      {coupon.coupon_usage && coupon.coupon_usage.length > 0 && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Usage</h4>
                          <div className="space-y-1">
                            {coupon.coupon_usage.slice(0, 3).map((usage) => (
                              <div key={usage.id} className="flex justify-between text-sm text-gray-600">
                                <span>{usage.users.email}</span>
                                <span>{new Date(usage.applied_at).toLocaleDateString()}</span>
                              </div>
                            ))}
                            {coupon.coupon_usage.length > 3 && (
                              <p className="text-sm text-gray-500">
                                +{coupon.coupon_usage.length - 3} more uses
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withAdminPageAuth(AdminCouponsPage);