import { memo, useCallback, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface HeaderUserMenuProps {
  user: any;
  signOut: () => Promise<void>;
}

const HeaderUserMenu = memo(function HeaderUserMenu({ user, signOut }: HeaderUserMenuProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = useCallback(() => setIsUserMenuOpen(prev => !prev), []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push('/');
    setIsUserMenuOpen(false);
  }, [signOut, router]);

  const userInitial = useMemo(() => {
    return user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  }, [user?.email]);

  if (!user) {
    return (
      <>
        <Link
          href="/signin"
          className="nav-link text-gray-700 hover:text-primary transition-all duration-200 text-base font-medium hover:scale-105"
        >
          {t('nav.signin')}
        </Link>
        <Link
          href="/signup"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 text-base"
        >
          {t('nav.getStarted')}
        </Link>
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleUserMenu}
        className="text-gray-700 hover:text-primary transition-all duration-200 flex items-center hover:scale-105 focus-ring"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-base font-semibold mr-3 shadow-md hover:shadow-lg transition-all duration-200">
          {userInitial}
        </div>
        <span className="text-sm hidden lg:inline">
          {user.email?.split('@')[0]}
        </span>
        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isUserMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsUserMenuOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-elegant border border-gray-100 py-2 z-20 animate-scale-in">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500">{t('nav.myAccount')}</p>
            </div>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              {t('nav.dashboard')}
            </Link>
            <Link
              href="/account/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              {t('nav.settings')}
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              {t('nav.signout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default HeaderUserMenu;
