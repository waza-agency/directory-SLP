import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function CookiePolicy() {
  return (
    <Layout>
      <Head>
        <title>Cookie Policy | San Luis Way</title>
        <meta name="description" content="Cookie Policy for San Luis Way - Learn about the cookies we use and how to manage them." />
      </Head>

      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-primary py-12">
          <div className="container-responsive">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
            <p className="text-white/80 mt-2">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-responsive py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-600">
                  Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">San Luis Way uses cookies to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Keep you signed in to your account</li>
                  <li>Understand how you use our website</li>
                  <li>Improve our website and services</li>
                  <li>Deliver relevant advertisements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm mt-2">
                    <li>Session management</li>
                    <li>User authentication</li>
                    <li>Security features</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm mt-2">
                    <li>Google Analytics - tracks page views, traffic sources, and user behavior</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">Preference Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Remember your settings and preferences.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm mt-2">
                    <li>Language preferences</li>
                    <li>Theme settings</li>
                    <li>Location preferences</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Advertising Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Used to deliver relevant advertisements.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm mt-2">
                    <li>Google AdSense - displays personalized ads</li>
                    <li>Ad tracking and conversion measurement</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Some cookies are placed by third-party services that appear on our pages:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Provider</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purpose</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">More Info</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">Google Analytics</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Website analytics</td>
                        <td className="px-4 py-2 text-sm">
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Privacy Policy</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">Google AdSense</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Advertising</td>
                        <td className="px-4 py-2 text-sm">
                          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Ad Policy</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">Supabase</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Authentication</td>
                        <td className="px-4 py-2 text-sm">
                          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Privacy Policy</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control and manage cookies in several ways:
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Browser Settings</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Most browsers allow you to refuse or delete cookies. Here's how:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Opt-Out Links</h3>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Google Analytics Opt-out</a></li>
                    <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Google Ads Settings</a></li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
                <p className="text-gray-600">
                  If you disable cookies, some features of our website may not function properly. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                  <li>You may need to log in each time you visit</li>
                  <li>Your preferences may not be saved</li>
                  <li>Some interactive features may not work</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions about our use of cookies, please contact us:
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
