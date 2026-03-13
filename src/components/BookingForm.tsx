import { useState } from 'react';
import { useAuth } from '@/lib/supabase-auth';
import { useTranslation } from 'next-i18next';

type BookingFormProps = {
  placeId: string;
  placeName: string;
  onBookingCreated?: () => void;
};

export default function BookingForm({ placeId, placeName, onBookingCreated }: BookingFormProps) {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    party_size: 2,
    notes: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'party_size' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, place_id: placeId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('booking.errorCreating'));
        return;
      }

      setSuccess(true);
      setFormData({
        booking_date: '',
        booking_time: '',
        party_size: 2,
        notes: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
      });
      onBookingCreated?.();
    } catch {
      setError(t('booking.errorCreating'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div id="booking-form-001" className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-blue-800 mb-2">{t('booking.loginRequired')}</p>
        <a href="/signin" className="text-primary hover:text-primary-dark font-medium">
          {t('nav.signIn')}
        </a>
      </div>
    );
  }

  // Get tomorrow's date as minimum bookable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div id="booking-form-002">
      {!isOpen ? (
        <button
          id="booking-form-open-003"
          onClick={() => setIsOpen(true)}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t('booking.bookNow')}
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('booking.reserveAt')} {placeName}
            </h3>
            <button
              onClick={() => { setIsOpen(false); setSuccess(false); setError(''); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-800 font-medium">{t('booking.successMessage')}</p>
              <p className="text-green-600 text-sm mt-1">{t('booking.confirmationNote')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.date')} *
                  </label>
                  <input
                    id="booking-date-004"
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    min={minDate}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.time')} *
                  </label>
                  <input
                    id="booking-time-005"
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.partySize')} *
                </label>
                <select
                  id="booking-party-006"
                  name="party_size"
                  value={formData.party_size}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t('booking.person') : t('booking.people')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.contactName')} *
                  </label>
                  <input
                    id="booking-name-007"
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.contactEmail')} *
                  </label>
                  <input
                    id="booking-email-008"
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.contactPhone')}
                </label>
                <input
                  id="booking-phone-009"
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.specialRequests')}
                </label>
                <textarea
                  id="booking-notes-010"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  maxLength={1000}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                  placeholder={t('booking.notesPlaceholder')}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                id="booking-submit-011"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('booking.submitting') : t('booking.confirmBooking')}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
