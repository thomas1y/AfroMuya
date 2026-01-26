'use client';

const CompanyHeader = ({ company, isFollowing, onFollowToggle }) => {
  // Get reviews count - handle both array and number
  const reviewsCount = typeof company.reviews === 'number' 
    ? company.reviews 
    : company.reviews?.length || 0;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Company Info - Centered and Compact */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 max-w-6xl mx-auto">
          
          {/* Left Side: Logo and Basic Info */}
          <div className="flex items-center gap-6 w-full lg:w-auto">
            {/* Company Logo - Professional Size with subtle shadow */}
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/10 to-[#2a877a]/20 flex items-center justify-center border border-gray-100 shadow-sm">
              <span className="text-2xl font-bold text-primary">{company.logo}</span>
            </div>
            
            {/* Company Name and Details */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{company.name}</h1>
              <p className="text-gray-600 mb-3">{company.tagline}</p>
              
              {/* Company Metadata - Clean with icons */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{company.size}</span>
                </div>
                {company.isRemoteFriendly && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium">Remote Friendly</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Rating and Actions - Softer Design */}
          <div className="flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
            {/* Rating Display - Card Style */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-200 shadow-sm min-w-[140px]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-gray-900">{company.rating}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                {reviewsCount} review{reviewsCount !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Action Buttons - Clean and Professional */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Follow Button - Softer Design */}
              <button
                onClick={onFollowToggle}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm transition-all duration-200 ${
                  isFollowing
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                    : 'bg-white text-primary border border-primary hover:bg-primary/5 shadow-sm'
                }`}
              >
                <svg className={`w-4 h-4 ${isFollowing ? 'fill-white' : 'fill-primary'}`} viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isFollowing ? 'Following' : 'Follow Company'}
                <span className={`text-xs ${isFollowing ? 'opacity-90' : 'opacity-70'}`}>
                  ({company.followers.toLocaleString()})
                </span>
              </button>
              
              {/* Website Button - Clean Outline */}
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 text-sm flex items-center gap-2 transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Visit Website
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats - MINIMAL VERSION */}
        <div className="mt-6 pt-6 border-t border-gray-100 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Open Positions - Minimal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <svg className="w-5 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <div className="text-lg font-bold text-gray-900">{company.openPositions}</div>
                <div className="text-xs text-gray-600">Open Positions</div>
              </div>
            </div>

            {/* Founded - Minimal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-lg font-bold text-gray-900">{company.founded}</div>
                <div className="text-xs text-gray-600">Founded</div>
              </div>
            </div>

            {/* Hiring Status - Minimal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className={`text-sm font-medium ${company.isHiring ? 'text-green-600' : 'text-gray-500'}`}>
                  {company.isHiring ? 'Hiring' : 'Not Hiring'}
                </div>
                <div className="text-xs text-gray-600">Status</div>
              </div>
            </div>

            {/* Remote Friendly - Minimal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className={`text-sm font-medium ${company.isRemoteFriendly ? 'text-green-600' : 'text-gray-500'}`}>
                  {company.isRemoteFriendly ? 'Remote' : 'On-site'}
                </div>
                <div className="text-xs text-gray-600">Work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;