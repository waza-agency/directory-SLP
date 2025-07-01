import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface DesignShowcaseProps {}

export const getStaticProps: GetStaticProps = async ({ }) => {
  return {
    props: {
    },
  };
};

const DesignShowcase: React.FC<DesignShowcaseProps> = () => {

  return (
    <>
      <Head>
        <title>Design Showcase | San Luis Way</title>
        <meta name="description" content="Modern design improvements showcase" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <span className="badge-primary mb-6">Design Showcase</span>
              <h1 className="font-serif text-6xl font-bold text-gray-900 mb-6 gradient-text">
                Modern Typography & Design
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the refined aesthetics and polished design language of San Luis Way.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Typography Section */}
          <section className="mb-20">
            <div className="slp-accent-border mb-8">
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                Typography Hierarchy
              </h2>
              <p className="text-lg text-gray-600">
                Clean, readable typography using Inter and Crimson Pro fonts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="card p-8">
                <h3 className="font-serif text-2xl font-semibold mb-6">Heading Examples</h3>
                <div className="space-y-6">
                  <div>
                    <h1 className="font-serif text-5xl font-bold text-gray-900 mb-2">Heading 1</h1>
                    <code className="text-sm text-gray-500">font-serif text-5xl font-bold</code>
                  </div>
                  <div>
                    <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-2">Heading 2</h2>
                    <code className="text-sm text-gray-500">font-serif text-4xl font-semibold</code>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h3 className="font-serif text-2xl font-semibold mb-6">Body Text</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xl text-gray-700 mb-2">Large body text</p>
                    <code className="text-sm text-gray-500">text-xl text-gray-700</code>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-2">Standard body text</p>
                    <code className="text-sm text-gray-500">text-lg text-gray-600</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Button Styles */}
          <section className="mb-20">
            <div className="slp-accent-border mb-8">
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                Enhanced Button Styles
              </h2>
              <p className="text-lg text-gray-600">
                Modern button designs with refined shadows and hover effects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="card p-6 text-center">
                <h3 className="font-serif text-xl font-semibold mb-4">Primary</h3>
                <button className="btn-primary w-full mb-3">Primary Button</button>
                <code className="text-xs text-gray-500">btn-primary</code>
              </div>

              <div className="card p-6 text-center">
                <h3 className="font-serif text-xl font-semibold mb-4">Secondary</h3>
                <button className="btn-secondary w-full mb-3">Secondary Button</button>
                <code className="text-xs text-gray-500">btn-secondary</code>
              </div>

              <div className="card p-6 text-center">
                <h3 className="font-serif text-xl font-semibold mb-4">Outline</h3>
                <button className="btn-outline w-full mb-3">Outline Button</button>
                <code className="text-xs text-gray-500">btn-outline</code>
              </div>

              <div className="card p-6 text-center">
                <h3 className="font-serif text-xl font-semibold mb-4">Ghost</h3>
                <button className="btn-ghost w-full mb-3">Ghost Button</button>
                <code className="text-xs text-gray-500">btn-ghost</code>
              </div>
            </div>
          </section>

          {/* Card Designs */}
          <section className="mb-20">
            <div className="slp-accent-border mb-8">
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                Modern Card Designs
              </h2>
              <p className="text-lg text-gray-600">
                Refined card components with subtle shadows and smooth transitions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8">
                <h3 className="font-serif text-xl font-semibold mb-3">Standard Card</h3>
                <p className="text-gray-600 mb-4">Clean design with subtle shadows.</p>
                <code className="text-xs text-gray-500">card</code>
              </div>

              <div className="card-elevated p-8">
                <h3 className="font-serif text-xl font-semibold mb-3">Elevated Card</h3>
                <p className="text-gray-600 mb-4">Enhanced card with prominent shadows.</p>
                <code className="text-xs text-gray-500">card-elevated</code>
              </div>

              <div className="slp-card p-8">
                <h3 className="font-serif text-xl font-semibold mb-3">SLP Themed Card</h3>
                <p className="text-gray-600 mb-4">San Luis Potosí branded styling.</p>
                <code className="text-xs text-gray-500">slp-card</code>
              </div>
            </div>
          </section>

          {/* San Luis Potosí Elements */}
          <section className="mb-20">
            <div className="slp-accent-border mb-8">
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                San Luis Potosí Design Elements
              </h2>
              <p className="text-lg text-gray-600">
                Custom design elements reflecting the cultural identity.
              </p>
            </div>

            <div className="space-y-8">
              <div className="slp-pattern-bg p-8 rounded-2xl">
                <h3 className="font-serif text-xl font-semibold mb-3">Pattern Background</h3>
                <p className="text-gray-600 mb-4">Subtle grid pattern representing urban layout.</p>
                <code className="text-xs text-gray-500">slp-pattern-bg</code>
              </div>

              <div className="slp-accent-box">
                <h3 className="font-serif text-xl font-semibold mb-3">Accent Box</h3>
                <p className="text-gray-600 mb-4">Enhanced container with gradient backgrounds.</p>
                <code className="text-xs text-gray-500">slp-accent-box</code>
              </div>
            </div>
          </section>

          {/* Modern Effects */}
          <section className="mb-20">
            <div className="slp-accent-border mb-8">
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                Modern Visual Effects
              </h2>
              <p className="text-lg text-gray-600">
                Contemporary design effects including glass morphism and gradients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="font-serif text-xl font-semibold mb-3">Glass Effect</h3>
                <p className="text-gray-600 mb-4">Modern glass morphism with backdrop blur.</p>
                <code className="text-xs text-gray-500">glass-effect</code>
              </div>

              <div className="card p-8">
                <h3 className="font-serif text-xl font-semibold mb-6">Gradient Text</h3>
                <div className="gradient-text text-3xl font-bold mb-4">
                  Beautiful Gradient
                </div>
                <code className="text-xs text-gray-500">gradient-text</code>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DesignShowcase;