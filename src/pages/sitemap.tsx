import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: '🏠',
      links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'Explore',
      icon: '🔍',
      links: [
        { href: '/places', label: 'All Places' },
        { href: '/events', label: 'Events Calendar' },
        { href: '/services', label: 'Services' },
        { href: '/outdoors', label: 'Outdoor Activities' },
      ],
    },
    {
      title: 'Cultural',
      icon: '🎭',
      links: [
        { href: '/cultural', label: 'Cultural Hub' },
        { href: '/cultural/history', label: 'History of SLP' },
        { href: '/cultural/festivals', label: 'Festivals & Events' },
        { href: '/cultural/music-dance', label: 'Music & Dance' },
      ],
    },
    {
      title: 'Guides',
      icon: '📚',
      links: [
        { href: '/expat-guide', label: 'Expat Guide' },
        { href: '/living-guide', label: 'Living Guide' },
        { href: '/blog', label: 'Blog' },
        { href: '/newsletter', label: 'Newsletter' },
      ],
    },
    {
      title: 'Account',
      icon: '👤',
      links: [
        { href: '/signin', label: 'Sign In' },
        { href: '/signup', label: 'Sign Up' },
      ],
    },
    {
      title: 'Legal',
      icon: '⚖️',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Sitemap | San Luis Way</title>
        <meta name="description" content="Complete sitemap of San Luis Way - Find all pages and sections of our website for expats and visitors in San Luis Potosí." />
      </Head>

      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="container-responsive">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Sitemap</h1>
            <p className="text-white/80 mt-2">Find your way around San Luis Way</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-responsive py-12">
          <div className="max-w-5xl mx-auto">
            {/* XML Sitemap Link */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-medium">Looking for the XML sitemap?</p>
                <p className="text-blue-600 text-sm">For search engines and developers</p>
              </div>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View XML Sitemap
              </a>
            </div>

            {/* Sitemap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sitemapSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-primary transition-colors flex items-center group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mt-12 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/places"
                  className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-medium text-gray-700 hover:text-primary"
                >
                  🗺️ Explore Places
                </Link>
                <Link
                  href="/events"
                  className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-medium text-gray-700 hover:text-primary"
                >
                  📅 Upcoming Events
                </Link>
                <Link
                  href="/blog"
                  className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-medium text-gray-700 hover:text-primary"
                >
                  📖 Read Blog
                </Link>
                <Link
                  href="/contact"
                  className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-medium text-gray-700 hover:text-primary"
                >
                  ✉️ Contact Us
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Follow us on social media</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/sanluisway/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  📸 Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="text-primary hover:text-primary-dark font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
