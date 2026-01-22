'use client';

const JobFilters = ({
  filters,
  jobTypes,
  locations,
  experiences,
  categories,
  onFilterChange,
  onCheckboxFilter,
  onSalaryRangeChange,
  onClearFilters
}) => {
  // Define the filter options that are static (not from jobs data)
  const workTypeOptions = ['Remote', 'On-site', 'Hybrid'];
  const staticJobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceOptions = ['Entry Level', 'Mid Level', 'Senior', 'Executive'];
  const popularCities = ['New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, DE', 'Tokyo, JP'];

  // Ensure filters have default values
  const safeFilters = {
    jobType: filters?.jobType || [],
    location: filters?.location || [],
    experience: filters?.experience || [],
    category: filters?.category || [],
    salaryRange: filters?.salaryRange || [0, 300000],
    remoteOnly: filters?.remoteOnly || false,
    featuredOnly: filters?.featuredOnly || false,
    workType: filters?.workType || [] // New: for On-site/Hybrid
  };

  // Handle work type filter (Remote, On-site, Hybrid)
  const handleWorkTypeFilter = (type, checked) => {
    if (type === 'Remote') {
      onFilterChange('remoteOnly', checked);
    } else {
      // Handle On-site and Hybrid
      if (checked) {
        onFilterChange('workType', [...safeFilters.workType, type]);
      } else {
        onFilterChange('workType', safeFilters.workType.filter(t => t !== type));
      }
    }
  };

  // Handle static job type filter
  const handleStaticJobTypeFilter = (type, checked) => {
    if (type === 'Full-time' || type === 'Contract' || type === 'Part-time' || type === 'Internship') {
      onCheckboxFilter('jobType', type, checked);
    }
  };

  // Helper to check if a job type is selected
  const isJobTypeSelected = (type) => {
    return safeFilters.jobType.includes(type);
  };

  // Helper to check if a work type is selected
  const isWorkTypeSelected = (type) => {
    if (type === 'Remote') {
      return safeFilters.remoteOnly;
    }
    return safeFilters.workType.includes(type);
  };

  // Handle experience level filter
  const handleExperienceFilter = (level, checked) => {
    // Map UI experience levels to job data experience levels
    const experienceMap = {
      'Entry Level': '2+ years',
      'Mid Level': '3+ years', 
      'Senior': '5+ years',
      'Executive': '8+ years'
    };
    
    if (experienceMap[level]) {
      onCheckboxFilter('experience', experienceMap[level], checked);
    }
  };

  // Handle salary input changes
  const handleSalaryMinChange = (e) => {
    const value = e.target.value;
    const min = value === '' ? 0 : parseInt(value) || 0;
    onSalaryRangeChange(min, safeFilters.salaryRange[1]);
  };

  const handleSalaryMaxChange = (e) => {
    const value = e.target.value;
    const max = value === '' ? 300000 : parseInt(value) || 300000;
    onSalaryRangeChange(safeFilters.salaryRange[0], max);
  };

  // Handle location filter (cities)
  const handleLocationFilter = (city, checked) => {
    // Extract just the city name from "San Francisco, CA"
    const cityName = city.split(',')[0].trim();
    onCheckboxFilter('location', cityName, checked);
  };

  // Helper to check if a city is selected
  const isCitySelected = (city) => {
    const cityName = city.split(',')[0].trim();
    return safeFilters.location.includes(cityName);
  };

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6 sticky top-24'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h3 className='font-semibold text-lg text-gray-900'>
          Filters
        </h3>
        <button 
          onClick={onClearFilters}
          className="text-sm text-[#309689] hover:text-[#2a877a] font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
        <div className="space-y-2">
          {staticJobTypeOptions.map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                checked={isJobTypeSelected(type)}
                onChange={(e) => handleStaticJobTypeFilter(type, e.target.checked)}
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{type}</span>
              {type === 'Internship' && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
        <div className="space-y-2">
          {experienceOptions.map((level) => (
            <label key={level} className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                checked={
                  (level === 'Entry Level' && safeFilters.experience.includes('2+ years')) ||
                  (level === 'Mid Level' && safeFilters.experience.includes('3+ years')) ||
                  (level === 'Senior' && safeFilters.experience.includes('5+ years')) ||
                  (level === 'Executive' && safeFilters.experience.includes('8+ years'))
                }
                onChange={(e) => handleExperienceFilter(level, e.target.checked)}
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
                  value={safeFilters.salaryRange[0] || 0}
                  onChange={handleSalaryMinChange}
                  min="0"
                  max="300000"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  placeholder="300000"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                  value={safeFilters.salaryRange[1] || 300000}
                  onChange={handleSalaryMaxChange}
                  min="0"
                  max="300000"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Yearly salary in USD. Current: ${(safeFilters.salaryRange[0] || 0).toLocaleString()} - ${(safeFilters.salaryRange[1] || 300000).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Location Filter */}
           {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Location</h4>
        <div className="space-y-2">
          {/* Work Type */}
          <div className="mb-3">
            <div className="text-sm text-gray-500 mb-2">Work Arrangement</div>
            {['Remote', 'On-site', 'Hybrid'].map((type) => (
              <label key={type} className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                  checked={
                    type === 'Remote' 
                      ? filters?.remoteOnly || false
                      : type === 'On-site' 
                        ? filters?.onSiteOnly || false
                        : filters?.hybridOnly || false
                  }
                  onChange={(e) => {
                    if (type === 'Remote') {
                      onFilterChange('remoteOnly', e.target.checked);
                    } else if (type === 'On-site') {
                      onFilterChange('onSiteOnly', e.target.checked);
                    } else if (type === 'Hybrid') {
                      onFilterChange('hybridOnly', e.target.checked);
                    }
                  }}
                />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900">{type}</span>
                {type === 'Hybrid' && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </label>
            ))}
          </div>
          
          {/* Popular Cities */}
          <div className="pt-3 mt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Popular Cities</div>
            {['New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, DE', 'Tokyo, JP'].map((city) => (
              <label key={city} className="flex items-center cursor-pointer group mt-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                  checked={(filters?.location || []).includes(city.split(',')[0].trim())}
                  onChange={(e) => {
                    const cityName = city.split(',')[0].trim();
                    const currentLocations = filters?.location || [];
                    if (e.target.checked) {
                      onFilterChange('location', [...currentLocations, cityName]);
                    } else {
                      onFilterChange('location', currentLocations.filter(loc => loc !== cityName));
                    }
                  }}
                />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900 text-sm">{city}</span>
              </label>
            ))}
          </div>

          {/* Dynamic locations from job data */}
          {locations && locations.length > 0 && (
            <div className="pt-3 mt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-2">All Locations</div>
              <div className="max-h-40 overflow-y-auto pr-2">
                {locations.map((location) => (
                  <label key={location} className="flex items-center cursor-pointer group mt-1">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0 flex-shrink-0"
                      checked={(filters?.location || []).includes(location)}
                      onChange={(e) => {
                        const currentLocations = filters?.location || [];
                        if (e.target.checked) {
                          onFilterChange('location', [...currentLocations, location]);
                        } else {
                          onFilterChange('location', currentLocations.filter(loc => loc !== location));
                        }
                      }}
                    />
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900 text-sm truncate">{location}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          {categories && categories.length > 0 && (
            <div className="pt-3 mt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-2">Job Categories</div>
              {categories.map((category) => (
                <label key={category} className="flex items-center cursor-pointer group mt-1">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
                    checked={(filters?.category || []).includes(category)}
                    onChange={(e) => onCheckboxFilter('category', category, e.target.checked)}
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-gray-900 text-sm">{category}</span>
                  {category === 'Engineering' && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                      In Demand
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Jobs Filter */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-[#309689] focus:ring-[#309689] focus:ring-offset-0"
            checked={safeFilters.featuredOnly}
            onChange={(e) => onFilterChange('featuredOnly', e.target.checked)}
          />
          <span className="ml-2 text-gray-700 group-hover:text-gray-900 font-medium">
            Featured Jobs Only
          </span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
            Premium
          </span>
        </label>
      </div>

      <button 
        onClick={onClearFilters}
        className="w-full py-3 bg-[#309689] text-white font-medium rounded-lg hover:bg-[#2a877a] transition-colors"
      >
        Apply Filters
      </button>

    </div>
  )
}

export default JobFilters;