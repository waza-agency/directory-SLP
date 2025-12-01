import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function TermsOfService() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | San Luis Way</title>
        <meta name="description" content="Terms of Service for San Luis Way - Read our terms and conditions for using our website and services." />
      </Head>

      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        {/* Header */}
        <div className="bg-primary py-12">
          <div className="container-responsive">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
            <p className="text-white/80 mt-2">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-responsive py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600">
                  By accessing and using San Luis Way (sanluisway.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600">
                  San Luis Way is an online directory and guide for expatriates, tourists, and locals in San Luis Potosí, Mexico. We provide information about places, events, cultural activities, and resources for navigating life in San Luis Potosí.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">You agree NOT to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Post false, misleading, or defamatory content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Scrape or collect data without permission</li>
                  <li>Use automated systems to access the website excessively</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  All content on San Luis Way, including text, graphics, logos, images, and software, is the property of San Luis Way or its content suppliers and is protected by copyright laws.
                </p>
                <p className="text-gray-600">
                  You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User-Generated Content</h2>
                <p className="text-gray-600 mb-4">
                  If you submit content to our website (reviews, comments, photos), you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Grant us a non-exclusive, royalty-free license to use, display, and distribute your content</li>
                  <li>Confirm that you own or have rights to the content</li>
                  <li>Agree that your content does not violate any laws or third-party rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Business Listings</h2>
                <p className="text-gray-600">
                  Business information on our website is provided for informational purposes. While we strive for accuracy, we do not guarantee that all information (hours, prices, availability) is current. We recommend contacting businesses directly to confirm details.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
                <p className="text-gray-600">
                  Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of these external sites. Accessing third-party links is at your own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-gray-600">
                  San Luis Way is provided "as is" without warranties of any kind. We do not guarantee that the website will be error-free, uninterrupted, or free of viruses. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-600">
                  To the fullest extent permitted by law, San Luis Way shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or any content therein.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
                <p className="text-gray-600">
                  You agree to indemnify and hold harmless San Luis Way, its owners, employees, and affiliates from any claims, damages, or expenses arising from your use of the website or violation of these terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p className="text-gray-600">
                  These Terms of Service shall be governed by and construed in accordance with the laws of Mexico. Any disputes shall be resolved in the courts of San Luis Potosí, Mexico.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-gray-700"><strong>Email:</strong> info@sanluisway.com</p>
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
