import { memo, useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = useCallback(() => setOpen((p) => !p), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, toggle, close, ref };
}

const devLinks = [
  { href: '/agent-connect', labelKey: 'nav.agentConnect' },
  { href: '/mcp', labelKey: 'nav.mcp' },
  { href: '/cli', labelKey: 'nav.cli' },
];

const moreLinks = [
  { href: '/visit-san-luis-potosi', labelKey: 'nav.visit', fallback: 'Visit SLP', badge: 'New', badgeClass: 'from-blue-500 to-cyan-500' },
  { href: '/digital-nomad-guide', labelKey: 'nav.nomads', fallback: 'Digital Nomads', badge: 'New', badgeClass: 'from-green-500 to-emerald-500' },
  { href: '/resources', labelKey: 'nav.resources' },
  { href: '/spouse-hub', labelKey: 'nav.spouseHub', badge: 'New', badgeClass: 'from-rose-500 to-purple-500' },
  { href: '/community', labelKey: 'nav.community', fallback: 'Community', badge: 'Soon', badgeClass: 'from-purple-500 to-pink-500' },
  { href: '/contact', labelKey: 'nav.contact' },
  { href: 'https://sanluiswayhub.com', labelKey: 'b2b.nav', badge: 'B2B', badgeClass: 'from-secondary to-primary', external: true },
];

const HeaderNavigation = memo(function HeaderNavigation() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const more = useDropdown();
  const dev = useDropdown();

  const isActive = (path: string) => {
    if (path === '/') return router.pathname === '/';
    return router.pathname.startsWith(path);
  };

  const isDevActive = devLinks.some(({ href }) => isActive(href));
  const isMoreActive = moreLinks.some(({ href, external }) => !external && isActive(href));

  const linkClass = (path: string) => `
    nav-link px-3 py-1.5 rounded-lg text-sm font-medium
    transition-all duration-200
    ${isActive(path) ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}
  `;

  const dropdownBtnClass = (active: boolean) => `
    nav-link px-3 py-1.5 rounded-lg text-sm font-medium
    transition-all duration-200 flex items-center gap-1.5
    ${active ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}
  `;

  const chevron = (isOpen: boolean) => (
    <svg
      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <nav className="hidden lg:flex items-center gap-0.5">
      {/* Primary links */}
      <Link href="/" className={linkClass('/')}>{t('nav.home')}</Link>
      <Link href="/places" className={linkClass('/places')}>{t('nav.explore')}</Link>
      <Link href="/events" className={linkClass('/events')}>{t('nav.events')}</Link>
      <Link href="/blog" className={linkClass('/blog')}>{t('nav.blog')}</Link>

      {/* More dropdown */}
      <div ref={more.ref} className="relative">
        <button onClick={more.toggle} className={dropdownBtnClass(isMoreActive)}>
          {t('nav.more', 'More')}
          {chevron(more.open)}
        </button>
        {more.open && (
          <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-fade-in">
            {moreLinks.map(({ href, labelKey, fallback, badge, badgeClass, external }) => {
              const inner = (
                <span className="flex items-center justify-between w-full">
                  <span>{fallback ? t(labelKey, fallback) : t(labelKey)}</span>
                  {badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r ${badgeClass} text-white rounded-full uppercase`}>
                      {badge}
                    </span>
                  )}
                </span>
              );

              if (external) {
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={more.close}
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={more.close}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isActive(href) ? 'text-primary bg-primary/5 font-medium' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Developers & Agents dropdown */}
      <div ref={dev.ref} className="relative">
        <button
          onClick={dev.toggle}
          className={`
            nav-link px-3 py-1.5 rounded-lg text-sm font-medium
            transition-all duration-200 flex items-center gap-1.5
            ${isDevActive
              ? 'text-secondary bg-secondary/5'
              : 'text-gray-700 hover:text-secondary hover:bg-gray-50'
            }
          `}
        >
          <span className="flex items-center gap-1.5">
            {t('nav.developersAgents', 'Developers & Agents')}
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-secondary text-white rounded-full uppercase">MCP</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full uppercase">CLI</span>
          </span>
          {chevron(dev.open)}
        </button>
        {dev.open && (
          <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-fade-in">
            {devLinks.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={dev.close}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isActive(href) ? 'text-secondary bg-secondary/5 font-medium' : 'text-gray-700 hover:text-secondary hover:bg-gray-50'
                }`}
              >
                {t(labelKey)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
});

export default HeaderNavigation;
