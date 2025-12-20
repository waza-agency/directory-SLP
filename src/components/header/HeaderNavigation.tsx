import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const HeaderNavigation = memo(function HeaderNavigation() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/places', label: t('nav.explore') },
    { href: '/resources', label: t('nav.resources') },
    { href: '/spouse-hub', label: t('nav.spouseHub'), highlight: true },
    { href: '/community', label: t('nav.community', 'Community'), comingSoon: true },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map(({ href, label, comingSoon, highlight }) => (
        <Link
          key={href}
          href={href}
          className={`
            nav-link px-3 py-1.5 rounded-lg text-sm font-medium
            transition-all duration-200 relative
            ${isActive(href)
              ? 'text-primary bg-primary/5'
              : highlight
                ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                : 'text-gray-700 hover:text-primary hover:bg-gray-50'
            }
            focus-ring
          `}
        >
          <span className="flex items-center gap-1.5">
            {label}
            {highlight && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full uppercase">
                New
              </span>
            )}
            {comingSoon && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full uppercase">
                Soon
              </span>
            )}
          </span>
        </Link>
      ))}
    </nav>
  );
});

export default HeaderNavigation;
