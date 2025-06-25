import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'next-i18next';
import ListingsBanner from '@/components/ListingsBanner';

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Next.js Image
jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

const mockT = jest.fn((key: string, defaultValue?: string) => defaultValue || key);

describe('ListingsBanner', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the banner with correct content', () => {
    render(<ListingsBanner />);

    // Check for main heading
    expect(screen.getByText('Find Trusted Local Businesses')).toBeInTheDocument();

    // Check for description
    expect(screen.getByText(/Connect with verified businesses and service providers/)).toBeInTheDocument();

    // Check for badge
    expect(screen.getByText('Local Business Directory')).toBeInTheDocument();
  });

  it('displays all feature items', () => {
    render(<ListingsBanner />);

    // Check for all four features
    expect(screen.getByText('Verified Businesses')).toBeInTheDocument();
    expect(screen.getByText('Easy Search')).toBeInTheDocument();
    expect(screen.getByText('Local Focus')).toBeInTheDocument();
    expect(screen.getByText('Direct Contact')).toBeInTheDocument();

    // Check for feature descriptions
    expect(screen.getByText('All listings are verified and actively maintained')).toBeInTheDocument();
    expect(screen.getByText('Filter by category and location')).toBeInTheDocument();
    expect(screen.getByText('Exclusively San Luis Potosí businesses')).toBeInTheDocument();
    expect(screen.getByText('Phone, address, and website info')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<ListingsBanner />);

    // Check for Browse Businesses button
    const browseButton = screen.getByText('Browse Businesses').closest('a');
    expect(browseButton).toHaveAttribute('href', '/listings');

    // Check for List Your Business button
    const listButton = screen.getByText('List Your Business').closest('a');
    expect(listButton).toHaveAttribute('href', '/business/dashboard');
  });

  it('displays stats section', () => {
    render(<ListingsBanner />);

    // Check for stats
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();

    // Check for stats labels
    expect(screen.getByText('Businesses')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    render(<ListingsBanner />);

    const image = screen.getByAltText('San Luis Potosí Local Businesses');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/experiences/San-Luis-Potosi-Ciudad.webp');
  });

  it('has proper accessibility attributes', () => {
    render(<ListingsBanner />);

    // Check that buttons are properly accessible
    const browseButton = screen.getByText('Browse Businesses');
    expect(browseButton.closest('a')).toHaveClass('inline-flex');

    const listButton = screen.getByText('List Your Business');
    expect(listButton.closest('a')).toHaveClass('inline-flex');
  });

  it('uses translation keys correctly', () => {
    render(<ListingsBanner />);

    // Verify that translation function is called with correct keys
    expect(mockT).toHaveBeenCalledWith('listingsBanner.title', 'Find Trusted Local Businesses');
    expect(mockT).toHaveBeenCalledWith('listingsBanner.description', expect.any(String));
    expect(mockT).toHaveBeenCalledWith('listingsBanner.browseCTA', 'Browse Businesses');
    expect(mockT).toHaveBeenCalledWith('listingsBanner.listCTA', 'List Your Business');
  });

  it('has responsive design classes', () => {
    render(<ListingsBanner />);

    // Check for responsive grid classes
    const gridContainer = screen.getByText('Find Trusted Local Businesses').closest('div')?.parentElement?.parentElement;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-2');
  });
});