declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackFbEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// Subscription funnel events
export const SubscriptionEvents = {
  viewPricing: () => trackEvent('view_pricing', { page: 'business_subscription' }),
  selectPlan: (plan: string) => trackEvent('select_plan', { plan }),
  startCheckout: (plan: string, value: number) => {
    trackEvent('begin_checkout', { plan, value, currency: 'MXN' });
    trackFbEvent('InitiateCheckout', { value, currency: 'MXN' });
  },
  completeSubscription: (plan: string, value: number) => {
    trackEvent('purchase', { plan, value, currency: 'MXN', transaction_id: `sub_${Date.now()}` });
    trackFbEvent('Subscribe', { value, currency: 'MXN' });
  },
  applyCoupon: (code: string) => trackEvent('apply_coupon', { coupon_code: code }),
};
