'use client';

import { useState } from 'react';

const CompanyFilters = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    industry: true,
    size: true,
    ratings: true,
    perks: false
  });

  const industries = [
    { name: 'Software Development', count: 124 },
    { name: 'Mobile Apps', count: 67 },
    { name: 'Cloud Computing', count: 89 },
    { name: 'Artificial Intelligence', count: 45 },
    { name: 'Cybersecurity', count: 56 },
    { name: 'FinTech', count: 78 },
    { name: 'Healthcare Tech', count: 42 },
    { name: 'Clean Energy', count: 23 },
    { name: 'E-commerce', count: 91 },
    { name: 'Gaming', count: 34 }
  ];

  const companySizes = [
    { name: 'Startup (1-50)', value: '1-50' },
    { name: 'Small (51-200)', value: '51-200' },
    { name: 'Medium (201-500)', value: '201-500' },
    { name: 'Large (501-1000)', value: '501-1000' },
    { name: 'Enterprise (1000+)', value: '1000+' }
  ];

  const ratings = [
    { value: 5, label: '★★★★★ & up', count: 45 },
    { value: 4, label: '★★★★☆ & up', count: 89 },
    { value: 3, label: '★★★☆☆ & up', count: 156 },
    { value: 2, label: '★★☆☆☆ & up', count: 23 },
    { value: 1, label: '★☆☆☆☆ & up', count: 5 }
  ];

  const perks = [
    'Remote Work',
    'Flexible Hours',
    'Stock Options',
    'Unlimited PTO',
    'Learning Budget',
    'Health Insurance',
    '401k Matching',
    'Parental Leave',
    'Wellness Program',
    'Career Growth'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleIndustryToggle = (industry) => {
    const newIndustries = filters.industries.includes(industry)
      ? filters.industries.filter(i => i !== industry)
      : [...filters.industries, industry];
    
    onFilterChange({ ...filters, industries: newIndustries });
  };

  const handleSizeToggle = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleRatingToggle = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    
    onFilterChange({ ...filters, ratings: newRatings });
  };

  const handlePerkToggle = (perk) => {
    // This would need additional state for perks if implemented
    console.log('Perk selected:', perk);
  };

  const clearAllFilters = () => {
    onFilterChange({
      industries: [],
      sizes: [],
      remoteFriendly: false,
      hiring: false,
      ratings: []
    });
  };

  const hasActiveFilters = 
    filters.industries.length > 0 ||
    filters.sizes.length > 0 ||
    filters.remoteFriendly ||
    filters.hiring ||
    filters.ratings.length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.industries.map(industry => (
              <span
                key={industry}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {industry}
                <button
                  onClick={() => handleIndustryToggle(industry)}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.sizes.map(size => (
              <span
                key={size}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {size}
                <button
                  onClick={() => handleSizeToggle(size)}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.ratings.map(rating => (
              <span
                key={rating}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {rating} stars
                <button
                  onClick={() => handleRatingToggle(rating)}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.remoteFriendly && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                Remote Friendly
                <button
                  onClick={() => onFilterChange({ ...filters, remoteFriendly: false })}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            )}
            {filters.hiring && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                Currently Hiring
                <button
                  onClick={() => onFilterChange({ ...filters, hiring: false })}
                  className="hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Industry Filter */}
        <div>
          <button
            onClick={() => toggleSection('industry')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h4 className="font-semibold text-gray-900">Industry</h4>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections.industry ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.industry && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {industries.map((industry) => (
                <label
                  key={industry.name}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.industries.includes(industry.name)}
                      onChange={() => handleIndustryToggle(industry.name)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">{industry.name}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{industry.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Company Size Filter */}
        <div>
          <button
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h4 className="font-semibold text-gray-900">Company Size</h4>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections.size ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.size && (
            <div className="space-y-2">
              {companySizes.map((size) => (
                <label
                  key={size.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size.value)}
                      onChange={() => handleSizeToggle(size.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">{size.name}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ratings Filter */}
        <div>
          <button
            onClick={() => toggleSection('ratings')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h4 className="font-semibold text-gray-900">Rating</h4>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections.ratings ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.ratings && (
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label
                  key={rating.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(rating.value)}
                      onChange={() => handleRatingToggle(rating.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">{rating.label}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{rating.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.remoteFriendly}
              onChange={(e) => onFilterChange({ ...filters, remoteFriendly: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <div>
              <div className="font-medium text-gray-900">Remote Friendly</div>
              <div className="text-sm text-gray-600">Companies that support remote work</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hiring}
              onChange={(e) => onFilterChange({ ...filters, hiring: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <div>
              <div className="font-medium text-gray-900">Currently Hiring</div>
              <div className="text-sm text-gray-600">Companies with active job openings</div>
            </div>
          </label>
        </div>

        {/* Popular Perks (Optional - would need implementation) */}
        <div>
          <button
            onClick={() => toggleSection('perks')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h4 className="font-semibold text-gray-900">Popular Perks</h4>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedSections.perks ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.perks && (
            <div className="flex flex-wrap gap-2">
              {perks.map((perk) => (
                <button
                  key={perk}
                  onClick={() => handlePerkToggle(perk)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {perk}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={() => console.log('Filters applied:', filters)}
        className="w-full mt-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default CompanyFilters;