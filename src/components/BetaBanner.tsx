import { useState, useEffect } from 'react';
import { XMarkIcon, BeakerIcon } from '@heroicons/react/24/outline';

// Note on CLS: this banner used to start hidden (`useState(false)`) and only
// turn visible after the client-side useEffect read localStorage. That created
// a 0.15+ layout shift on every desktop pageview because the banner mounted
// AFTER hydration and pushed every section of the homepage down.
//
// Fix: render visible by default (matches SSR), then dismiss in useEffect for
// users who previously dismissed. Worst case is a small upward shift only for
// users who already dismissed, instead of a downward shift for every visitor.
//
// The scroll-collapse uses CSS transform (translateY + opacity) instead of
// max-height so it does NOT trigger Cumulative Layout Shift either. The
// banner is `sticky top-0` so collapsing it does not move anything below.
export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('betaBannerDismissed');
    const dismissedDate = localStorage.getItem('betaBannerDismissedDate');

    if (dismissed && dismissedDate) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setIsVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('betaBannerDismissed', 'true');
    localStorage.setItem('betaBannerDismissedDate', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div
      className={`sticky top-0 z-40 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200 transition-transform duration-300 will-change-transform ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
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
