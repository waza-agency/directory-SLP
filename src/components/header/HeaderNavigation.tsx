import { memo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const HeaderNavigation = memo(function HeaderNavigation() {
  const { t } = useTranslation('common');

  return (
    <nav className="hidden lg:flex items-center space-x-10">
      <Link
        href="/"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.home')}
      </Link>

      <Link
        href="/places"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.explore')}
      </Link>

      <Link
        href="/blog"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.blog')}
      </Link>

      <Link
        href="/about"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.about')}
      </Link>

      <Link
        href="/faq"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.faq')}
      </Link>

      <Link
        href="/contact"
        className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium relative py-2 hover:scale-105"
      >
        {t('nav.contact')}
      </Link>
    </nav>
  );
});

export default HeaderNavigation;
