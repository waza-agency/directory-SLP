import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'next-i18next';
import AffiliateCard from './AffiliateCard';

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('next/image', () => {
  return ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
});

const mockGtag = jest.fn();

beforeEach(() => {
  (useTranslation as jest.Mock).mockReturnValue({
    t: (key: string) => key,
  });
  (window as unknown as { gtag: jest.Mock }).gtag = mockGtag;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('AffiliateCard', () => {
  it('renders nothing when product id is unknown', () => {
    const { container } = render(<AffiliateCard productId="unknown-id" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title, price, and CTA for grid variant', () => {
    render(<AffiliateCard productId="brita-jarra-filtro" variant="grid" />);
    expect(screen.getByText('affiliate.products.brita.title')).toBeInTheDocument();
    expect(screen.getByText('$400–800 MXN')).toBeInTheDocument();
    expect(screen.getByTestId('affiliate-cta')).toHaveTextContent('affiliate.cta');
  });

  it('renders inline variant with disclosure label prominent', () => {
    render(<AffiliateCard productId="brita-jarra-filtro" variant="inline" />);
    // disclosure appears as a label in inline variant
    expect(screen.getByText('affiliate.disclosure')).toBeInTheDocument();
    expect(screen.getByTestId('affiliate-cta')).toBeInTheDocument();
  });

  it('renders checklist variant compactly', () => {
    render(<AffiliateCard productId="brita-jarra-filtro" variant="checklist" />);
    expect(screen.getByText('affiliate.products.brita.title')).toBeInTheDocument();
    expect(screen.getByTestId('affiliate-cta')).toBeInTheDocument();
  });

  it.each(['grid', 'inline', 'checklist'] as const)(
    '%s variant link has sponsored nofollow rel and target _blank',
    (variant) => {
      render(<AffiliateCard productId="brita-jarra-filtro" variant={variant} />);
      const link = screen.getByTestId('affiliate-cta');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('sponsored');
      expect(link.getAttribute('rel')).toContain('nofollow');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
      expect(link.getAttribute('href')).toMatch(/^https:\/\/meli\.la\//);
    },
  );

  it('fires GA4 outbound_click event with affiliate link_type on click', () => {
    render(<AffiliateCard productId="brita-jarra-filtro" />);
    fireEvent.click(screen.getByTestId('affiliate-cta'));
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'outbound_click',
      expect.objectContaining({
        link_type: 'affiliate',
        partner: 'mercadolibre',
        destination: 'brita-jarra-filtro',
      }),
    );
  });
});
