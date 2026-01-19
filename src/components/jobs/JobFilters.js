import React from 'react'

const JobFilters = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
         {/* Header */}
         <div className='flex items-center justify-between mb-6'>
            <h3 className='font-semibold text-lg text-gray-900'>
               Filters
            </h3>
            <button className="text-sm text-[#309689] hover:text-[#2a877a] font-medium">Clear all</button>
         </div>

         {/* Job Type Filter */}
         <div className="mb-6">
                 <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                      />
                      <span className="ml-2 text-gray-700 group-hover:text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
         </div>

         {/* Experience Level Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
        <div className="space-y-2">
          {['Entry Level', 'Mid Level', 'Senior', 'Executive'].map((level) => (
            <label key={level} className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Salary Range</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Min</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  placeholder="Any"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Yearly salary in USD</div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Location</h4>
        <div className="space-y-2">
          {/* Work Type */}
          {['Remote', 'On-site', 'Hybrid'].map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{type}</span>
            </label>
          ))}
          
          <div className="pt-2 mt-2 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Popular Cities</div>
            {['New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, DE', 'Tokyo, JP'].map((city) => (
              <label key={city} className="flex items-center cursor-pointer group mt-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900 text-sm">{city}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full lg:hidden py-3 bg-[#309689] text-white font-medium rounded-lg hover:bg-[#2a877a] transition-colors">
        Apply Filters
      </button>

    </div>
  )
}

export default JobFilters