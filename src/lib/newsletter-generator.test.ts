import { NEWSLETTER_TEMPLATE, CLOSING_AND_FOOTER_HTML, getCurrentNewsletterDates } from './newsletter-generator';
import { format } from 'date-fns';

describe('newsletter template structure', () => {
  it('exposes the hero and highlight image placeholders', () => {
    expect(NEWSLETTER_TEMPLATE).toContain('[HERO_IMAGE_URL]');
    expect(NEWSLETTER_TEMPLATE).toContain('[HERO_IMAGE_ALT]');
    expect(NEWSLETTER_TEMPLATE).toContain('[TOP_PICK_IMAGE_URL]');
    expect(NEWSLETTER_TEMPLATE).toContain('[TOP_PICK_IMAGE_ALT]');
    expect(NEWSLETTER_TEMPLATE).toContain('[ESCAPE_IMAGE_URL]');
    expect(NEWSLETTER_TEMPLATE).toContain('[ESCAPE_IMAGE_ALT]');
  });

  it('has a placeholder for the closing footer that gets injected programmatically', () => {
    expect(CLOSING_AND_FOOTER_HTML).toContain('Hasta la próxima');
    expect(CLOSING_AND_FOOTER_HTML).toContain('🌐 Website');
    // Footer is now injected programmatically via injectFooterIntoNewsletter()
    expect(NEWSLETTER_TEMPLATE).toContain('<!-- CLOSING_FOOTER_PLACEHOLDER -->');
  });

  it('includes the new CTA placeholders', () => {
    ['[CTA_TITLE]', '[CTA_BODY]', '[CTA_BUTTON_LABEL]', '[CTA_BUTTON_LINK]'].forEach((placeholder) => {
      expect(NEWSLETTER_TEMPLATE).toContain(placeholder);
    });
  });
});

describe('getCurrentNewsletterDates helper', () => {
  it('returns a date range based on today', () => {
    const referenceDate = new Date(Date.UTC(2025, 11, 2)); // December 2, 2025 UTC
    const result = getCurrentNewsletterDates(referenceDate);

    expect(result.currentDate).toBe(format(referenceDate, 'MMMM d, yyyy'));
    expect(result.dateRangeStr).toBe(
      `${format(result.weekStartDate, 'MMMM d')} - ${format(result.weekEndDate, 'MMMM d, yyyy')}`
    );
    expect(result.weekStartDate.getDay()).toBe(1); // Monday
    expect(result.weekEndDate.getDay()).toBe(0); // Sunday
  });
});

