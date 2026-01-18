const HeroSearch = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Container - Elevated Design */}
      <div className="bg-white rounded-2xl shadow-2xl p-1 md:p-3">
        <div className="flex flex-col md:flex-row gap-2">
          
          {/* Job Title Search */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Job title, skills, or company"
              className="w-full pl-12 pr-4 py-4 md:py-5 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#309689]/30 focus:border-[#309689]"
            />
          </div>
          
          {/* Location */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="City, state, or remote"
              className="w-full pl-12 pr-4 py-4 md:py-5 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#309689]/30 focus:border-[#309689]"
            />
          </div>
          
          {/* Search Button */}
          <button className="bg-gradient-to-r from-[#309689] to-[#2a877a] text-white px-8 py-4 md:py-5 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-3 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Jobs
          </button>
          
        </div>
        
        
        
      </div>
    </div>
  )
}

export default HeroSearch