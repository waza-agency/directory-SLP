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
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleUserMenu}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200 focus-ring group"
        aria-label="Menú de usuario"
        aria-expanded={isUserMenuOpen}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-sm group-hover:shadow-md transition-all duration-200">
          {userInitial}
        </div>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isUserMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsUserMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 animate-fadeIn">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t('nav.myAccount')}</p>
            </div>
            <Link
              href="/account"
              onClick={() => setIsUserMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t('nav.dashboard')}
            </Link>
            <Link
              href="/account/settings"
              onClick={() => setIsUserMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('nav.settings')}
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 rounded focus-ring"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('nav.signout')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default HeaderUserMenu;
