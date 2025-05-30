import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* San Luis Colors Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-secondary via-primary to-secondary"></div>

      {/* Decorative Pattern */}
      <div className="h-8 bg-secondary/90 overflow-hidden relative">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 203, 5, 0.1) 10px, rgba(255, 203, 5, 0.1) 20px)`,
             }}>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="SLP Descubre Logo"
                width={500}
                height={50}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Your comprehensive guide to discovering the rich cultural heritage and vibrant community of San Luis Potosí. We help expatriates navigate the city's cultural landscape with curated recommendations and local insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.067 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.067-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.07-1.067-.09-1.407-.09-4.123v-.08c0-2.643.012-2.987.09-4.043.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="slp-accent-border border-primary">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/cultural/history" className="text-base text-gray-400 hover:text-primary transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link href="/cultural/festivals" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/cultural/language" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Language
                </Link>
              </li>
              <li>
                <Link href="/places" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Places
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="slp-accent-border border-secondary">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/blog" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/expat-guide" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Expat Guide
                </Link>
              </li>
              <li>
                <Link href="/living-guide" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Living Guide
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="slp-accent-border border-primary">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:info@sanluisway.com" className="text-base text-gray-400 hover:text-primary transition-colors">
                  info@sanluisway.com
                </a>
              </li>
              <li>
                <a href="tel:+524444444444" className="text-base text-gray-400 hover:text-primary transition-colors">
                  +52 (444) 444-4444
                </a>
              </li>
              <li className="text-base text-gray-400">
                San Luis Potosí, México
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              © {new Date().getFullYear()} SLP Descubre. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-base text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-base text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-base text-gray-400 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-base text-gray-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>

          {/* Waza Studio Credit */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Made with <span className="text-pink-500">❤</span> by <a href="https://wazastudio.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 font-medium hover:text-pink-400 transition-colors">Waza Studio</a>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              We are <span className="text-pink-500 font-bold">WAZA</span>. And we're coding a cooler world.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}