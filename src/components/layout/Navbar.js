"use client"

import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  return (
    <>
      {/* Background wrapper - different per page */}
      <div className={isHomePage ? 'absolute top-0 left-0 right-0 z-50' : 'bg-black'}>
        <nav className={`h-20 ${isHomePage ? 'backdrop-blur-sm bg-black/50' : 'bg-black'}`}>
          <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 h-full">
            <div className="flex items-center justify-between h-full">
              
              {/* Logo - Always white */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#309689] to-[#2a877a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">JobPortal</span>
                  <span className="text-xs text-gray-300 block -mt-1">Career Success Awaits</span>
                </div>
              </div>

              {/* Navigation - Always white */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="/jobs" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
                  Find Jobs
                </a>
                <a href="/companies" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
                  Companies
                </a>
                <a href="/career-advice" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
                  Career Advice
                </a>
                <a href="/pricing" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              For Employers
            </a>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                <button className="text-white/90 hover:text-white font-medium text-sm hidden md:block">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-[#309689] to-[#2a877a] text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm">
                  Get Started
                </button>
              </div>

            </div>
          </div>
        </nav>
      </div>
      
      {/* Add padding on non-home pages to prevent content under navbar */}
      {!isHomePage && <div className="h-20"></div>}
    </>
  )
}

export default Navbar
