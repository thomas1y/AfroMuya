'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectCurrentUser, logoutUser } from '@/lib/redux/slices/authSlice';
import { showSuccessToast, showErrorToast } from '@/lib/redux/slices/uiSlice';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === '/'
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(showSuccessToast('Logged out successfully'));
      setIsMobileMenuOpen(false); // Close mobile menu
      router.push('/'); // Redirect to home
    } catch (error) {
      dispatch(showErrorToast('Logout failed'));
    }
  };

  return (
    <div className={isHomePage ? 'absolute top-0 left-0 right-0 z-50' : 'bg-black'}>
        <nav className={`h-20 ${isHomePage ? 'backdrop-blur-sm bg-black/50' : 'bg-black'}`}>
          <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 h-full">
            <div className="flex items-center justify-between h-full">
              
              {/* Logo - Always white */}
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#309689] to-[#2a877a] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white tracking-tight">JobPortal</span>
                    <span className="text-xs text-gray-300 block -mt-1">Career Success Awaits</span>
                  </div>
                </Link>
              </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/jobs" 
              className={`font-medium text-sm transition-colors ${
                pathname === '/jobs' ? 'text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Find Jobs
            </Link>
            <Link 
              href="/companies" 
              className={`font-medium text-sm transition-colors ${
                pathname?.startsWith('/companies') ? 'text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Companies
            </Link>
            <Link 
              href="/career-advice" 
              className={`font-medium text-sm transition-colors ${
                pathname?.startsWith('/career-advice') ? 'text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Career Advice
            </Link>
            <Link 
              href="/employers" 
              className={`font-medium text-sm transition-colors ${
                pathname?.startsWith('/employers') ? 'text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              For Employers
            </Link>
          </div>

          {/* Right side - Auth/User Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              /* Logged In User Menu */
              <div className="flex items-center space-x-4">
                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </Link>
                
                {/* User Avatar Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                      <span className="text-white font-semibold text-sm">
                        {currentUser?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-white">
                      {currentUser?.name?.split(' ')[0] || 'User'}
                    </span>
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser?.email || ''}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard/applications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Applications
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Not Logged In - Auth Buttons */
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-white/90 hover:text-white font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-teal-700 border-t border-teal-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/jobs"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/jobs'
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname?.startsWith('/companies')
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Companies
            </Link>
            <Link
              href="/career-advice"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname?.startsWith('/career-advice')
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Career Advice
            </Link>
            <Link
              href="/employers"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname?.startsWith('/employers')
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Employers
            </Link>
            
            {isLoggedIn ? (
              <>
                <div className="border-t border-white/20 my-2 pt-2">
                  <p className="px-3 py-2 text-sm text-white/70">
                    Signed in as <span className="font-medium">{currentUser?.name || 'User'}</span>
                  </p>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/applications"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Applications
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500/20 hover:bg-red-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-white/20 my-2 pt-2">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 bg-white hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;