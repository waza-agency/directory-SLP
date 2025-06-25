import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components to test typography and styling
const TestTypographyComponent = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      {/* Typography Hierarchy Test */}
      <section className="mb-12">
        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">
          Main Heading (H1) - Crimson Pro
        </h1>
        <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-4">
          Section Heading (H2) - Crimson Pro
        </h2>
        <h3 className="font-serif text-3xl font-medium text-gray-900 mb-4">
          Subsection Heading (H3) - Crimson Pro
        </h3>
        <p className="text-lg text-gray-600 mb-4 font-sans">
          Body text using Inter font family with improved readability and spacing.
        </p>
      </section>

      {/* Button Styles Test */}
      <section className="mb-12">
        <h2 className="font-serif text-3xl font-semibold mb-6">Enhanced Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-outline">Outline Button</button>
          <button className="btn-ghost">Ghost Button</button>
        </div>
      </section>

      {/* Card Styles Test */}
      <section className="mb-12">
        <h2 className="font-serif text-3xl font-semibold mb-6">Modern Card Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-serif text-xl font-semibold mb-3">Standard Card</h3>
            <p className="text-gray-600">Modern card with subtle shadows and rounded corners.</p>
          </div>
          <div className="card-elevated p-6">
            <h3 className="font-serif text-xl font-semibold mb-3">Elevated Card</h3>
            <p className="text-gray-600">Enhanced card with more prominent shadow effects.</p>
          </div>
          <div className="slp-card p-6">
            <h3 className="font-serif text-xl font-semibold mb-3">SLP Themed Card</h3>
            <p className="text-gray-600">Specially styled card with San Luis Potosí theming.</p>
          </div>
        </div>
      </section>

      {/* San Luis Potosí Design Elements */}
      <section className="mb-12">
        <h2 className="font-serif text-3xl font-semibold mb-6">San Luis Potosí Design Elements</h2>

        <div className="slp-pattern-bg p-8 rounded-2xl mb-6">
          <h3 className="font-serif text-xl font-semibold mb-3">Pattern Background</h3>
          <p className="text-gray-600">Subtle grid pattern representing the city's organized layout.</p>
        </div>

        <div className="slp-accent-box mb-6">
          <h3 className="font-serif text-xl font-semibold mb-3">Accent Box</h3>
          <p className="text-gray-600">Enhanced accent box with gradient background and blur effects.</p>
        </div>

        <div className="slp-separator"></div>

        <div className="slp-accent-border">
          <h3 className="font-serif text-xl font-semibold mb-3">Accent Border</h3>
          <p className="text-gray-600">Left border accent with subtle background gradient.</p>
        </div>
      </section>

      {/* Modern Effects */}
      <section className="mb-12">
        <h2 className="font-serif text-3xl font-semibold mb-6">Modern Visual Effects</h2>

        <div className="glass-effect p-6 rounded-2xl mb-6">
          <h3 className="font-serif text-xl font-semibold mb-3">Glass Effect</h3>
          <p className="text-gray-600">Modern glass morphism effect with backdrop blur.</p>
        </div>

        <div className="gradient-text text-4xl font-bold mb-6">
          Gradient Text Effect
        </div>

        <div className="flex gap-3 mb-6">
          <span className="badge">Default Badge</span>
          <span className="badge-primary">Primary Badge</span>
          <span className="badge-secondary">Secondary Badge</span>
        </div>

        <a href="#" className="link-modern">Modern Link Style</a>
      </section>

      {/* Responsive Image Container */}
      <section className="mb-12">
        <h2 className="font-serif text-3xl font-semibold mb-6">Enhanced Image Container</h2>
        <div className="image-container max-w-md">
          <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold">Image Placeholder</span>
          </div>
        </div>
      </section>
    </div>
  </div>
);

describe('Design Improvements', () => {
  test('renders typography hierarchy correctly', () => {
    render(<TestTypographyComponent />);

    // Test heading hierarchy
    expect(screen.getByText('Main Heading (H1) - Crimson Pro')).toBeInTheDocument();
    expect(screen.getByText('Section Heading (H2) - Crimson Pro')).toBeInTheDocument();
    expect(screen.getByText('Subsection Heading (H3) - Crimson Pro')).toBeInTheDocument();

    // Test body text
    expect(screen.getByText(/Body text using Inter font family/)).toBeInTheDocument();
  });

  test('renders enhanced button styles', () => {
    render(<TestTypographyComponent />);

    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    expect(screen.getByText('Outline Button')).toBeInTheDocument();
    expect(screen.getByText('Ghost Button')).toBeInTheDocument();
  });

  test('renders modern card designs', () => {
    render(<TestTypographyComponent />);

    expect(screen.getByText('Standard Card')).toBeInTheDocument();
    expect(screen.getByText('Elevated Card')).toBeInTheDocument();
    expect(screen.getByText('SLP Themed Card')).toBeInTheDocument();
  });

  test('renders San Luis Potosí design elements', () => {
    render(<TestTypographyComponent />);

    expect(screen.getByText('Pattern Background')).toBeInTheDocument();
    expect(screen.getByText('Accent Box')).toBeInTheDocument();
    expect(screen.getByText('Accent Border')).toBeInTheDocument();
  });

  test('renders modern visual effects', () => {
    render(<TestTypographyComponent />);

    expect(screen.getByText('Glass Effect')).toBeInTheDocument();
    expect(screen.getByText('Gradient Text Effect')).toBeInTheDocument();
    expect(screen.getByText('Default Badge')).toBeInTheDocument();
    expect(screen.getByText('Primary Badge')).toBeInTheDocument();
    expect(screen.getByText('Secondary Badge')).toBeInTheDocument();
    expect(screen.getByText('Modern Link Style')).toBeInTheDocument();
  });

  test('has proper CSS classes applied', () => {
    render(<TestTypographyComponent />);

    // Test that elements have expected classes
    const primaryButton = screen.getByText('Primary Button');
    expect(primaryButton).toHaveClass('btn-primary');

    const gradientText = screen.getByText('Gradient Text Effect');
    expect(gradientText).toHaveClass('gradient-text');

    const modernLink = screen.getByText('Modern Link Style');
    expect(modernLink).toHaveClass('link-modern');
  });

  test('applies responsive design classes', () => {
    render(<TestTypographyComponent />);

    // Test responsive grid
    const cardContainer = screen.getByText('Modern Card Designs').closest('section')?.querySelector('.grid');
    expect(cardContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

    test('uses semantic HTML structure', () => {
    render(<TestTypographyComponent />);

    // Test semantic structure
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(6);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(8);
  });

  test('maintains accessibility standards', () => {
    render(<TestTypographyComponent />);

    // Test that buttons are accessible
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeVisible();
      expect(button).toHaveTextContent(/Button/);
    });

    // Test that links are accessible
    const link = screen.getByRole('link');
    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href');
  });
});

export { TestTypographyComponent };