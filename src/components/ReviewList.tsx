import { useTranslation } from 'next-i18next';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

function formatReviewDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Mexico_City',
  });
}

export default function ReviewList({ reviews, isLoading }: ReviewListProps) {
  const { t } = useTranslation('common');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse border-b pb-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <p className="text-gray-500 text-sm">
        {t('reviews.noReviews', 'No reviews yet. Be the first to review!')}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4 last:border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-gray-900">{review.author}</span>
            <span className="text-xs text-gray-400">{formatReviewDate(review.created_at)}</span>
          </div>
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 text-sm">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
