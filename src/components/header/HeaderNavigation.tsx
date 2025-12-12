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
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/faq', label: t('nav.faq') },
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
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`
            nav-link px-3 py-1.5 rounded-lg text-sm font-medium
            transition-all duration-200 relative
            ${isActive(href)
              ? 'text-primary bg-primary/5'
              : 'text-gray-700 hover:text-primary hover:bg-gray-50'
            }
            focus-ring
          `}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
});

export default HeaderNavigation;
