'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CompanyCard from '@/components/companies/CompanyCard';
import CompanyFilters from '@/components/companies/CompanyFilters';

// Mock companies data
const mockCompanies = [
  {
    id: 1,
    name: "TechVision Inc.",
    logo: "TV",
    tagline: "Building the future of SaaS",
    description: "Leading SaaS company providing innovative solutions for businesses worldwide.",
    industry: "Software Development",
    size: "501-1000 employees",
    location: "San Francisco, CA",
    founded: 2015,
    website: "https://techvision.com",
    rating: 4.5,
    reviews: 124,
    openPositions: 24,
    followers: 5800,
    isFollowing: false,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Unlimited PTO", "Learning Stipend", "Stock Options", "Remote Work"],
    techStack: ["React", "Node.js", "AWS", "Python", "TypeScript"],
    featured: true
  },
  {
    id: 2,
    name: "DigitalFlow",
    logo: "DF",
    tagline: "Mobile innovation redefined",
    description: "Award-winning mobile app development company creating cutting-edge solutions.",
    industry: "Mobile Apps",
    size: "201-500 employees",
    location: "New York, NY",
    founded: 2018,
    website: "https://digitalflow.com",
    rating: 4.2,
    reviews: 89,
    openPositions: 18,
    followers: 3200,
    isFollowing: true,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Flexible Hours", "Health & Wellness", "Career Growth", "Team Events"],
    techStack: ["React Native", "Swift", "Kotlin", "Firebase", "GraphQL"],
    featured: true
  },
  {
    id: 3,
    name: "CloudScale",
    logo: "CS",
    tagline: "Scalable cloud solutions",
    description: "Enterprise cloud infrastructure and DevOps solutions provider.",
    industry: "Cloud Computing",
    size: "1001-5000 employees",
    location: "Austin, TX",
    founded: 2012,
    website: "https://cloudscale.com",
    rating: 4.3,
    reviews: 156,
    openPositions: 32,
    followers: 7200,
    isFollowing: false,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Competitive Salary", "401k Matching", "Remote First", "Conference Budget"],
    techStack: ["AWS", "Kubernetes", "Terraform", "Go", "Python"],
    featured: false
  },
  {
    id: 4,
    name: "DataSphere",
    logo: "DS",
    tagline: "Data intelligence platform",
    description: "AI and machine learning company specializing in data analytics.",
    industry: "Artificial Intelligence",
    size: "51-200 employees",
    location: "Boston, MA",
    founded: 2019,
    website: "https://datasphere.ai",
    rating: 4.7,
    reviews: 67,
    openPositions: 12,
    followers: 2100,
    isFollowing: false,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Equity", "Research Time", "PhD Support", "Flexible Schedule"],
    techStack: ["Python", "TensorFlow", "PyTorch", "Spark", "SQL"],
    featured: true
  },
  {
    id: 5,
    name: "SecureNet",
    logo: "SN",
    tagline: "Cybersecurity solutions",
    description: "Enterprise cybersecurity and threat intelligence platform.",
    industry: "Cybersecurity",
    size: "501-1000 employees",
    location: "Washington, DC",
    founded: 2016,
    website: "https://securenet.com",
    rating: 4.4,
    reviews: 92,
    openPositions: 21,
    followers: 4100,
    isFollowing: true,
    isRemoteFriendly: false,
    isHiring: true,
    perks: ["Security Clearance", "Training Budget", "Bonus Structure", "Health Insurance"],
    techStack: ["C++", "Python", "Linux", "Network Security", "Cryptography"],
    featured: false
  },
  {
    id: 6,
    name: "FinTech Plus",
    logo: "FP",
    tagline: "Modern banking solutions",
    description: "Financial technology company revolutionizing digital banking.",
    industry: "FinTech",
    size: "1001-5000 employees",
    location: "Charlotte, NC",
    founded: 2014,
    website: "https://fintechplus.com",
    rating: 4.1,
    reviews: 178,
    openPositions: 28,
    followers: 6300,
    isFollowing: false,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Banking Benefits", "Stock Options", "Retirement Plan", "Tuition Reimbursement"],
    techStack: ["Java", "Spring Boot", "React", "Microservices", "Blockchain"],
    featured: true
  },
  {
    id: 7,
    name: "HealthTech Solutions",
    logo: "HT",
    tagline: "Healthcare innovation",
    description: "Digital health platform connecting patients with healthcare providers.",
    industry: "Healthcare Tech",
    size: "201-500 employees",
    location: "Chicago, IL",
    founded: 2017,
    website: "https://healthtech.com",
    rating: 4.6,
    reviews: 103,
    openPositions: 15,
    followers: 2900,
    isFollowing: false,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["Health Benefits", "Flexible Schedule", "Impact Work", "Learning Budget"],
    techStack: ["React", "Node.js", "HIPAA Compliance", "AWS", "TypeScript"],
    featured: false
  },
  {
    id: 8,
    name: "EcoTech",
    logo: "ET",
    tagline: "Sustainable technology",
    description: "Clean energy and sustainable technology solutions provider.",
    industry: "Clean Energy",
    size: "51-200 employees",
    location: "Portland, OR",
    founded: 2020,
    website: "https://ecotech.com",
    rating: 4.8,
    reviews: 45,
    openPositions: 8,
    followers: 1800,
    isFollowing: true,
    isRemoteFriendly: true,
    isHiring: true,
    perks: ["ESG Focus", "Green Initiatives", "Work-Life Balance", "Community Impact"],
    techStack: ["IoT", "Python", "Data Analytics", "Renewable Energy", "Cloud"],
    featured: true
  }
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('mostJobs'); // 'mostJobs', 'highestRated', 'mostFollowers'
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;

  // Filter companies
  const [filters, setFilters] = useState({
    industries: [],
    sizes: [],
    remoteFriendly: false,
    hiring: false,
    ratings: []
  });

  // Handle search
  useEffect(() => {
    const filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = filters.industries.length === 0 || 
                            filters.industries.includes(company.industry);
      
      const matchesSize = filters.sizes.length === 0 || 
                         filters.sizes.includes(company.size.split(' ')[0]);
      
      const matchesRemote = !filters.remoteFriendly || company.isRemoteFriendly;
      const matchesHiring = !filters.hiring || company.isHiring;
      
      const matchesRating = filters.ratings.length === 0 || 
                           filters.ratings.some(rating => Math.floor(company.rating) === rating);

      return matchesSearch && matchesIndustry && matchesSize && 
             matchesRemote && matchesHiring && matchesRating;
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'highestRated':
          return b.rating - a.rating;
        case 'mostFollowers':
          return b.followers - a.followers;
        case 'mostJobs':
        default:
          return b.openPositions - a.openPositions;
      }
    });

    setFilteredCompanies(sorted);
  }, [searchTerm, filters, companies, sortBy]);

  // Handle follow toggle
  const handleFollowToggle = (companyId) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, isFollowing: !company.isFollowing, followers: company.isFollowing ? company.followers - 1 : company.followers + 1 }
        : company
    ));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-3xl font-bold mb-3">Find Your Dream Company</h1>
            <p className=" mb-8 opacity-90">
              Discover top tech companies 
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search companies by name, industry, or keyword..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <CompanyFilters 
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Stats & Controls */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredCompanies.length} Companies Found
                  </h2>
                  <p className="text-gray-600">
                    Browse through top tech companies hiring now
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="mostJobs">Most Jobs</option>
                    <option value="highestRated">Highest Rated</option>
                    <option value="mostFollowers">Most Followed</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-600">Total Companies</div>
                  <div className="text-2xl font-bold text-gray-900">{filteredCompanies.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-600">Open Positions</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredCompanies.reduce((sum, company) => sum + company.openPositions, 0)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-600">Avg. Rating</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(filteredCompanies.reduce((sum, company) => sum + company.rating, 0) / filteredCompanies.length || 0).toFixed(1)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-600">Remote Friendly</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredCompanies.filter(c => c.isRemoteFriendly).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Companies Grid/List */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      industries: [],
                      sizes: [],
                      remoteFriendly: false,
                      hiring: false,
                      ratings: []
                    });
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
                  {paginatedCompanies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      viewMode={viewMode}
                      onFollowToggle={handleFollowToggle}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-primary text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="px-2">...</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Featured Companies Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-[#2a877a]/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Want to feature your company?
              </h2>
              <p className="text-gray-700 mb-6">
                Reach thousands of qualified tech professionals. Increase brand awareness, 
                attract top talent, and showcase your company culture.
              </p>
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
                Learn About Employer Solutions
              </button>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Companies Trust Us</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Join industry leaders like Google, Amazon, and Microsoft in finding top talent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}