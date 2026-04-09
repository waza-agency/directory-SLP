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

// Conversion events
export const ConversionEvents = {
  newsletterSignup: (source: string) =>
    trackEvent('newsletter_signup', { source, method: 'email' }),

  contactFormSubmit: (subject?: string) =>
    trackEvent('contact_form_submit', { subject: subject || 'general' }),

  outboundMapClick: (placeName: string, page: string) =>
    trackEvent('outbound_click', { link_type: 'google_maps', place_name: placeName, page }),

  outboundAffiliateClick: (partner: string, destination: string, page: string) =>
    trackEvent('outbound_click', { link_type: 'affiliate', partner, destination, page }),

  ctaClick: (ctaId: string, ctaText: string, page: string) =>
    trackEvent('cta_click', { cta_id: ctaId, cta_text: ctaText, page }),

  guideEngagement: (guidePath: string, section: string) =>
    trackEvent('guide_section_view', { guide: guidePath, section }),
};

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
