import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | San Luis Way</title>
        <meta name="description" content="Privacy Policy for San Luis Way - Learn how we collect, use, and protect your personal information." />
      </Head>

      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        {/* Header */}
        <div className="bg-secondary py-12">
          <div className="container-responsive">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="text-white/80 mt-2">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-responsive py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  Welcome to San Luis Way ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website sanluisway.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <p className="text-gray-600 mb-4">We may collect information about you in various ways:</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Name and email address (when you subscribe to our newsletter)</li>
                  <li>Contact information (when you fill out our contact form)</li>
                  <li>Account information (if you create an account)</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Automatically Collected Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Send you our weekly newsletter with events and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and user experience</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking</h2>
                <p className="text-gray-600">
                  We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings. For more information, please see our <Link href="/cookies" className="text-primary hover:text-primary-dark">Cookie Policy</Link>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
                <p className="text-gray-600 mb-4">We may use third-party services that collect information:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Supabase:</strong> For user authentication and data storage</li>
                  <li><strong>Stripe:</strong> For processing payments (if applicable)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Unsubscribe from our newsletter at any time</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-600">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-gray-700"><strong>Email:</strong> sanluisway@waza.baby</p>
                  <p className="text-gray-700"><strong>Website:</strong> <Link href="/contact" className="text-primary hover:text-primary-dark">Contact Form</Link></p>
                </div>
              </section>

            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-primary hover:text-primary-dark font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
