import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Enhanced San Luis Colors Accent Bar */}
      <div className="h-3 bg-gradient-to-r from-secondary via-primary to-secondary opacity-90 animate-pulse-slow"></div>

      {/* Enhanced Decorative Pattern */}
      <div className="h-12 bg-gradient-to-r from-secondary/80 via-secondary/90 to-secondary/80 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute inset-0"
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255, 203, 5, 0.15) 12px, rgba(255, 203, 5, 0.15) 24px)`,
             }}>
        </div>
        {/* Floating elements */}
        <div className="absolute top-2 left-8 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="absolute top-3 right-12 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
      </div>

      <div className="container-responsive section-padding relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16">
          <NewsletterSignup variant="footer" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6 hover-scale transition-transform duration-200">
              <Image
                src="/images/logo.jpeg"
                alt="SLP Descubre Logo"
                width={500}
                height={50}
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              Your comprehensive guide to discovering the rich cultural heritage and vibrant community of San Luis Potosí. We help expatriates navigate the city's cultural landscape with curated recommendations and local insights.
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/sanluisway/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-all duration-200 p-2 rounded-lg hover:bg-primary/10 hover:scale-110 flex items-center gap-2">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.067 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.067-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.07-1.067-.09-1.407-.09-4.123v-.08c0-2.643.012-2.987.09-4.043.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">@sanluisway</span>
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-16 bg-gradient-to-b from-primary to-primary-dark rounded-full"></div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/cultural/history" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-primary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-primary group-hover:scale-125"></span>
                  History
                </Link>
              </li>
              <li>
                <Link href="/cultural/festivals" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-primary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-primary group-hover:scale-125"></span>
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/cultural/music-dance" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-primary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-primary group-hover:scale-125"></span>
                  Music & Dance
                </Link>
              </li>
              <li>
                <Link href="/places" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-primary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-primary group-hover:scale-125"></span>
                  Places
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-16 bg-gradient-to-b from-secondary to-secondary-light rounded-full"></div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-base text-gray-300 hover:text-secondary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-secondary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-secondary group-hover:scale-125"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/expat-guide" className="text-base text-gray-300 hover:text-secondary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-secondary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-secondary group-hover:scale-125"></span>
                  Expat Guide
                </Link>
              </li>
              <li>
                <Link href="/living-guide" className="text-base text-gray-300 hover:text-secondary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-secondary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-secondary group-hover:scale-125"></span>
                  Living Guide
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-base text-gray-300 hover:text-secondary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1 h-1 bg-secondary/60 rounded-full mr-3 transition-all duration-200 group-hover:bg-secondary group-hover:scale-125"></span>
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact Section */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-16 bg-gradient-to-b from-primary to-primary-dark rounded-full"></div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@sanluisway.com" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <svg className="w-4 h-4 mr-3 text-primary/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@sanluisway.com
                </a>
              </li>
              <li>
                <a href="tel:+524444444444" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <svg className="w-4 h-4 mr-3 text-primary/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +52 (444) 444-4444
                </a>
              </li>
              <li className="text-base text-gray-300 inline-flex items-center">
                <svg className="w-4 h-4 mr-3 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                San Luis Potosí, México
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-flex items-center group">
                  <svg className="w-4 h-4 mr-3 text-primary/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-8 border-t border-gray-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-lg text-gray-300 font-medium">
              © {new Date().getFullYear()} SLP Descubre. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-end gap-8">
              <Link href="/privacy" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:scale-105">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:scale-105">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:scale-105">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-base text-gray-300 hover:text-primary transition-all duration-200 hover:scale-105">
                Sitemap
              </Link>
            </div>
          </div>

          {/* Enhanced Waza Studio Credit */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-2xl">
              <p className="text-gray-300 text-lg mb-2">
                Made with <span className="text-pink-500 animate-pulse text-xl">❤</span> by <a href="https://wazastudio.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 font-bold hover:text-pink-400 transition-all duration-200 hover:scale-105 inline-flex items-center gap-1">Waza Studio</a>
              </p>
              <p className="text-gray-400 text-base mb-6">
                We are <span className="text-pink-500 font-bold text-lg">WAZA</span>. And we're coding a cooler world.
              </p>

              {/* Other Waza Projects */}
              <div className="border-t border-gray-700/50 pt-6">
                <p className="text-gray-300 text-lg font-semibold mb-4">Other projects by Waza:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="https://vibecodingprd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-pink-400 transition-all duration-200 p-4 rounded-lg hover:scale-105 group"
                  >
                    <div className="font-semibold group-hover:text-pink-400">ProductPulse</div>
                    <div className="text-sm text-gray-400">AI Meeting Intelligence</div>
                  </a>
                  <a
                    href="https://tacosnearme.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-pink-400 transition-all duration-200 p-4 rounded-lg hover:scale-105 group"
                  >
                    <div className="font-semibold group-hover:text-pink-400">TacosNearMe</div>
                    <div className="text-sm text-gray-400">Find Great Tacos Fast</div>
                  </a>
                  <a
                    href="https://sobrecitos.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-pink-400 transition-all duration-200 p-4 rounded-lg hover:scale-105 group"
                  >
                    <div className="font-semibold group-hover:text-pink-400">Sobrecitos</div>
                    <div className="text-sm text-gray-400">Family Budget Tracker</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}