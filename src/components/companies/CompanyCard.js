'use client';

import Link from 'next/link';
import { useState } from 'react';

const CompanyCard = ({ company, viewMode, onFollowToggle }) => {
  const [isFollowing, setIsFollowing] = useState(company.isFollowing);

  const handleFollowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    onFollowToggle(company.id);
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/companies/${company.id}`}>
        <div className="bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-[#2a877a]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">{company.logo}</span>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors mb-2">
                    {company.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{company.tagline}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {company.industry}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {company.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {company.location}
                    </div>
                    {company.isRemoteFriendly && (
                      <div className="flex items-center gap-1 text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Remote Friendly
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">{company.rating}</span>
                      <span className="text-xs ml-1">({company.reviews})</span>
                    </div>
                    {company.featured && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{company.openPositions}</div>
                    <div className="text-sm text-gray-600">Open Positions</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack & Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {company.techStack.slice(0, 4).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                  {company.techStack.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{company.techStack.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFollowClick}
                    className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                      isFollowing
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-primary hover:text-primary'
                    }`}
                  >
                    <svg className={`w-4 h-4 ${isFollowing ? 'fill-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {isFollowing ? 'Following' : 'Follow'}
                    <span className="text-sm">({company.followers})</span>
                  </button>
                  <Link
                    href={`/companies/${company.id}`}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link href={`/companies/${company.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Company Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-[#2a877a]/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{company.logo}</span>
            </div>
            <div className="flex items-center gap-2">
              {company.featured && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
              <button
                onClick={handleFollowClick}
                className={`p-2 rounded-lg ${
                  isFollowing
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-gray-400 hover:text-primary hover:bg-gray-100'
                }`}
              >
                <svg className={`w-5 h-5 ${isFollowing ? 'fill-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors mb-2">
            {company.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.tagline}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-bold text-gray-900">{company.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({company.reviews})</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="text-gray-600 text-sm">{company.industry}</div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{company.openPositions}</div>
              <div className="text-xs text-gray-600">Open Jobs</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {company.followers > 1000 ? `${(company.followers / 1000).toFixed(1)}k` : company.followers}
              </div>
              <div className="text-xs text-gray-600">Followers</div>
            </div>
          </div>

          {/* Location & Size */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {company.location}
            </div>
            <div>{company.size}</div>
          </div>
        </div>

        {/* Tech Stack & CTA */}
        <div className="mt-auto p-6 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 mb-4">
            {company.techStack.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tech}
              </span>
            ))}
            {company.techStack.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                +{company.techStack.length - 3}
              </span>
            )}
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            View {company.openPositions} Open Positions
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;