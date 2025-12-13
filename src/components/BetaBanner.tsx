import { useState, useEffect } from 'react';
import { XMarkIcon, BeakerIcon } from '@heroicons/react/24/outline';

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('betaBannerDismissed');
    const dismissedDate = localStorage.getItem('betaBannerDismissedDate');

    // Show banner again after 7 days
    if (dismissed && dismissedDate) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('betaBannerDismissed', 'true');
    localStorage.setItem('betaBannerDismissedDate', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <BeakerIcon className="w-4 h-4 text-amber-600" />
            </div>

            <div className="flex-1 min-w-0">
              {/* English */}
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Beta Version</span>
                <span className="hidden sm:inline"> — We&apos;re improving every day. Found a bug? </span>
                <span className="sm:hidden"> — </span>
                <a href="/contact" className="underline hover:text-amber-700 font-medium">
                  Let us know
                </a>
                <span className="hidden sm:inline">. Your patience is appreciated!</span>
              </p>

              {/* Spanish - smaller, secondary */}
              <p className="text-xs text-amber-700 mt-0.5">
                <span className="font-medium">Versión Beta</span>
                <span className="hidden sm:inline"> — Mejoramos cada día. </span>
                <a href="/contact" className="underline hover:text-amber-600">
                  Tu retroalimentación es bienvenida
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 rounded-full hover:bg-amber-100 transition-colors"
            aria-label="Dismiss beta banner"
          >
            <XMarkIcon className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
