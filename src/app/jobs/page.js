import JobFilters from '@/components/jobs/JobFilters'

export default function JobsPage() {
  return (
    <main>
      {/* === PAGE HEADER WITH SEARCH BAR === */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          
          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 mt-2">
              Browse thousands of job opportunities
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-900"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button className="bg-[#309689] text-white px-6 py-2 rounded-lg hover:bg-[#2a877a] transition-colors font-medium">
                  Search
                </button>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Remote Developer', 'UX Designer', 'Project Manager', 'Data Scientist', 'Marketing'].map((tag, index) => (
                <button
                  key={index}
                  className="text-sm text-gray-700 hover:text-[#309689] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results Count */}
          <div className="text-center">
            <div className="text-sm text-gray-500 inline-block bg-gray-100 px-4 py-2 rounded-lg">
              Showing <span className="font-semibold text-gray-900">1,245</span> results
            </div>
          </div>
          
        </div>
      </div>
      {/* === END PAGE HEADER === */}

      {/* Main Content Area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Filters Sidebar */}
            <div className="lg:w-1/4">
              <div id="filters-sidebar">
                  <JobFilters />
              </div>
            </div>

            {/* Right Column - Job Listings */}
            <div className="lg:w-3/4">
              <div id="job-listings">
                {/* Job cards will go here - Later step */}
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  )
}