import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAuth } from '@/lib/supabase-auth';

interface ReviewFormProps {
  placeId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ placeId, onReviewSubmitted }: ReviewFormProps) {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-600 text-sm">
          {t('reviews.loginRequired', 'Sign in to leave a review')}
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError(t('reviews.ratingRequired', 'Please select a rating'));
      return;
    }
    if (text.trim().length < 10) {
      setError(t('reviews.textTooShort', 'Review must be at least 10 characters'));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ place_id: placeId, rating, text }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      setSuccess(true);
      setRating(0);
      setText('');
      onReviewSubmitted();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-3">
        {t('reviews.writeReview', 'Write a review')}
      </h4>

      {/* Star rating */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <svg
              className={`w-7 h-7 transition-colors ${
                star <= (hoveredRating || rating) ? 'text-amber-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Text input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('reviews.placeholder', 'Share your experience...')}
        rows={3}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm resize-none"
        maxLength={1000}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {success && (
        <p className="text-green-600 text-xs mt-1">
          {t('reviews.submitted', 'Review submitted successfully!')}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark disabled:opacity-50 transition-colors"
      >
        {isSubmitting
          ? t('reviews.submitting', 'Submitting...')
          : t('reviews.submit', 'Submit Review')}
      </button>
    </form>
  );
}
