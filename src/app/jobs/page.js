
'use client';

import JobFilters from '@/components/jobs/JobFilters';
import JobCard from '@/components/jobs/JobCard';
import { useState, useEffect } from 'react';

export default function JobsPage() {
  // All job data
  const allJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechVision Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      salaryRange: [120000, 160000],
      isFeatured: true,
      isRemote: true,
      isNew: true,
      posted: "2 days ago",
      postedDate: "2024-01-17",
      description: "We're looking for a Senior Frontend Developer to join our product team.",
      skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "REST APIs", "UI/UX Design"],
      experience: "5+ years",
      category: "Engineering"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "CreativeMinds",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      salaryRange: [90000, 120000],
      isFeatured: false,
      isRemote: true,
      isNew: false,
      posted: "5 days ago",
      postedDate: "2024-01-14",
      description: "Join our design team to create intuitive user experiences.",
      skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Thinking"],
      experience: "3+ years",
      category: "Design"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      salaryRange: [130000, 180000],
      isFeatured: true,
      isRemote: true,
      isNew: true,
      posted: "1 day ago",
      postedDate: "2024-01-18",
      description: "Build scalable backend systems and microservices.",
      skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes", "REST APIs"],
      experience: "4+ years",
      category: "Engineering"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "GrowthHub",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      salaryRange: [110000, 150000],
      isFeatured: false,
      isRemote: false,
      isNew: false,
      posted: "1 week ago",
      postedDate: "2024-01-11",
      description: "Lead product development from conception to launch.",
      skills: ["Product Management", "Agile/Scrum", "Data Analysis", "Stakeholder Management"],
      experience: "5+ years",
      category: "Product"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote",
      type: "Contract",
      salary: "$80 - $120/hr",
      salaryRange: [80, 120],
      isFeatured: true,
      isRemote: true,
      isNew: true,
      posted: "3 days ago",
      postedDate: "2024-01-16",
      description: "6-month contract with potential for extension.",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Infrastructure as Code"],
      experience: "3+ years",
      category: "Engineering"
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140,000 - $190,000",
      salaryRange: [140000, 190000],
      isFeatured: false,
      isRemote: true,
      isNew: false,
      posted: "2 weeks ago",
      postedDate: "2024-01-05",
      description: "Build machine learning models and analyze large datasets.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Data Visualization"],
      experience: "4+ years",
      category: "Data Science"
    },
    {
      id: 7,
      title: "Mobile Developer",
      company: "AppFlow",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      salaryRange: [100000, 140000],
      isFeatured: false,
      isRemote: true,
      isNew: true,
      posted: "4 days ago",
      postedDate: "2024-01-15",
      description: "Develop cross-platform mobile applications for iOS and Android.",
      skills: ["React Native", "JavaScript", "TypeScript", "Mobile Development"],
      experience: "3+ years",
      category: "Engineering"
    },
    {
      id: 8,
      title: "Marketing Specialist",
      company: "BrandBoost",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      salaryRange: [65000, 85000],
      isFeatured: true,
      isRemote: false,
      isNew: true,
      posted: "Today",
      postedDate: "2024-01-19",
      description: "Develop and execute marketing campaigns across multiple channels.",
      skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"],
      experience: "2+ years",
      category: "Marketing"
    },
    {
      id: 9,
      title: "QA Engineer",
      company: "QualityFirst",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$85,000 - $115,000",
      salaryRange: [85000, 115000],
      isFeatured: false,
      isRemote: true,
      isNew: false,
      posted: "3 days ago",
      postedDate: "2024-01-16",
      description: "Ensure product quality through automated and manual testing.",
      skills: ["Test Automation", "Selenium", "Cypress", "Quality Assurance"],
      experience: "2+ years",
      category: "Engineering"
    },
    {
      id: 10,
      title: "Sales Executive",
      company: "RevenueTech",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$70,000 + Commission",
      salaryRange: [70000, 150000],
      isFeatured: false,
      isRemote: true,
      isNew: false,
      posted: "1 week ago",
      postedDate: "2024-01-12",
      description: "Drive revenue growth by acquiring new enterprise clients.",
      skills: ["Sales", "CRM", "Negotiation", "B2B"],
      experience: "3+ years",
      category: "Sales"
    }
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    location: [],
    experience: [],
    category: [],
    salaryRange: [0, 300000],
    remoteOnly: false,
    featuredOnly: false
  });
  const [sortBy, setSortBy] = useState('mostRelevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Extract unique values for filters
  const jobTypes = [...new Set(allJobs.map(job => job.type))];
  const locations = [...new Set(allJobs.map(job => job.location))];
  const experiences = [...new Set(allJobs.map(job => job.experience))];
  const categories = [...new Set(allJobs.map(job => job.category))];

  // Filter and sort jobs
  useEffect(() => {
    let result = [...allJobs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // Job type filter
    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.type));
    }

    // Location filter
    if (filters.location.length > 0) {
      result = result.filter(job => filters.location.includes(job.location));
    }

    // Experience filter
    if (filters.experience.length > 0) {
      result = result.filter(job => filters.experience.includes(job.experience));
    }

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter(job => filters.category.includes(job.category));
    }

    // Salary range filter
    result = result.filter(job => {
      const avgSalary = (job.salaryRange[0] + job.salaryRange[1]) / 2;
      return avgSalary >= filters.salaryRange[0] && avgSalary <= filters.salaryRange[1];
    });

    // Remote only filter
    if (filters.remoteOnly) {
      result = result.filter(job => job.isRemote);
    }

    // Featured only filter
    if (filters.featuredOnly) {
      result = result.filter(job => job.isFeatured);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'salaryHighToLow':
        result.sort((a, b) => b.salaryRange[1] - a.salaryRange[1]);
        break;
      case 'salaryLowToHigh':
        result.sort((a, b) => a.salaryRange[0] - b.salaryRange[0]);
        break;
      case 'mostRelevant':
      default:
        // Featured first, then new, then by date
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return new Date(b.postedDate) - new Date(a.postedDate);
        });
    }

    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle checkbox filter (for arrays)
  const handleCheckboxFilter = (filterName, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: checked
        ? [...prev[filterName], value]
        : prev[filterName].filter(item => item !== value)
    }));
  };

  // Handle salary range change
  const handleSalaryRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: [min, max]
    }));
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      jobType: [],
      location: [],
      experience: [],
      category: [],
      salaryRange: [0, 300000],
      remoteOnly: false,
      featuredOnly: false
    });
    setSortBy('mostRelevant');
  };

  // Get active filter count
  const activeFilterCount = [
    searchQuery,
    filters.jobType.length,
    filters.location.length,
    filters.experience.length,
    filters.category.length,
    filters.remoteOnly,
    filters.featuredOnly,
    filters.salaryRange[0] > 0 || filters.salaryRange[1] < 300000
  ].filter(Boolean).length;

  return (
    <main>
      {/* === PAGE HEADER WITH SEARCH BAR === */}
      <div className="bg-white border-b border-gray-200 pt-20">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {['React', 'Remote', 'UX Designer', 'Engineering', 'Marketing'].map((tag, index) => (
                <button
                  key={index}
                  className="text-sm text-gray-700 hover:text-[#309689] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results Count & Active Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-sm text-gray-500 inline-block bg-gray-100 px-4 py-2 rounded-lg">
              Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> results
            </div>
            
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#309689] hover:text-[#2a877a] font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
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
              <JobFilters
                filters={filters}
                jobTypes={jobTypes}
                locations={locations}
                experiences={experiences}
                categories={categories}
                onFilterChange={handleFilterChange}
                onCheckboxFilter={handleCheckboxFilter}
                onSalaryRangeChange={handleSalaryRangeChange}
                onClearFilters={clearAllFilters}
              />
            </div>

            {/* Right Column - Job Listings */}
            <div className="lg:w-3/4">
              {/* Sort and View Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="text-gray-600">
                  <span className="font-medium">{filteredJobs.length} jobs</span> matched your criteria
                  {currentJobs.length > 0 && (
                    <span className="text-gray-500">
                      {' '}(Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select 
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="mostRelevant">Most Relevant</option>
                      <option value="newest">Newest</option>
                      <option value="salaryHighToLow">Salary (High to Low)</option>
                      <option value="salaryLowToHigh">Salary (Low to High)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Listings Grid */}
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={clearAllFilters}
                    className="bg-[#309689] text-white px-6 py-3 rounded-lg hover:bg-[#2a877a] transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div id="job-listings" className="space-y-4">
                    {currentJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center gap-1">
                        <button 
                          className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        {getVisiblePages().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                              ...
                            </span>
                          ) : (
                            <button
                              key={page}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                page === currentPage
                                  ? 'bg-[#309689] text-white hover:bg-[#2a877a]' 
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                              onClick={() => goToPage(page)}
                            >
                              {page}
                            </button>
                          )
                        ))}
                        
                        <button 
                          className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}

                  {/* Show page info */}
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}