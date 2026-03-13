import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

type Booking = {
  id: string;
  place_id: string;
  booking_date: string;
  booking_time: string;
  party_size: number;
  status: string;
  notes: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  created_at: string;
  places?: { id: string; name: string; image_url: string | null; category: string };
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  no_show: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function BookingManager() {
  const { t } = useTranslation('common');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter) params.set('status', filter);

      const res = await fetch(`/api/bookings/manage?${params}`);
      if (res.ok) {
        setBookings(await res.json());
      }
    } catch { /* non-critical */ }
    finally { setLoading(false); }
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      const res = await fetch('/api/bookings/manage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId, status: newStatus }),
      });

      if (res.ok) {
        setBookings(prev =>
          prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
        );
      }
    } catch { /* non-critical */ }
    finally { setUpdatingId(null); }
  };

  const statusFilters = ['', 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'];

  return (
    <div id="booking-manager-014">
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s ? t(`booking.status.${s}`) : t('booking.allBookings')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg">{t('booking.noBookingsFound')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div
              key={booking.id}
              className={`border rounded-lg p-4 ${statusColors[booking.status] || 'bg-white border-gray-200'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {booking.places?.name || t('booking.unknownPlace')}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[booking.status]}`}>
                      {t(`booking.status.${booking.status}`)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-2">
                    <div>
                      <span className="text-gray-500">{t('booking.date')}:</span>{' '}
                      <span className="font-medium">{booking.booking_date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{t('booking.time')}:</span>{' '}
                      <span className="font-medium">{booking.booking_time}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{t('booking.partySize')}:</span>{' '}
                      <span className="font-medium">{booking.party_size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{t('booking.contactName')}:</span>{' '}
                      <span className="font-medium">{booking.contact_name}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span>{booking.contact_email}</span>
                    {booking.contact_phone && <span className="ml-3">{booking.contact_phone}</span>}
                  </div>

                  {booking.notes && (
                    <p className="text-sm text-gray-500 mt-2 italic">{booking.notes}</p>
                  )}
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      disabled={updatingId === booking.id}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {t('booking.confirm')}
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      disabled={updatingId === booking.id}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {t('booking.cancel')}
                    </button>
                  </div>
                )}

                {booking.status === 'confirmed' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'completed')}
                      disabled={updatingId === booking.id}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {t('booking.markCompleted')}
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'no_show')}
                      disabled={updatingId === booking.id}
                      className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
                    >
                      {t('booking.noShow')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
