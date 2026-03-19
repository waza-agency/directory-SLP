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
  created_at: string;
  places?: { id: string; name: string; image_url: string | null; category: string };
};

type BookingListProps = {
  refreshTrigger?: number;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  no_show: 'bg-gray-100 text-gray-800',
};

export default function BookingList({ refreshTrigger }: BookingListProps) {
  const { t } = useTranslation('common');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings/list');
      if (res.ok) {
        setBookings(await res.json());
      }
    } catch { /* non-critical */ }
    finally { setLoading(false); }
  };

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId }),
      });

      if (res.ok) {
        setBookings(prev =>
          prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
        );
      }
    } catch { /* non-critical */ }
    finally { setCancellingId(null); }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div id="booking-list-empty-012" className="text-center py-8 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>{t('booking.noBookings')}</p>
      </div>
    );
  }

  return (
    <div id="booking-list-013" className="space-y-3">
      {bookings.map(booking => (
        <div
          key={booking.id}
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900">
                {booking.places?.name || t('booking.unknownPlace')}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                {t(`booking.status.${booking.status}`)}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
              <span>{booking.booking_date}</span>
              <span>{booking.booking_time}</span>
              <span>{booking.party_size} {booking.party_size === 1 ? t('booking.person') : t('booking.people')}</span>
            </div>
          </div>
          {(booking.status === 'pending' || booking.status === 'confirmed') && (
            <button
              onClick={() => handleCancel(booking.id)}
              disabled={cancellingId === booking.id}
              className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
            >
              {cancellingId === booking.id ? '...' : t('booking.cancel')}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
