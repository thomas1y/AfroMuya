'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { selectSavedJobs, selectAppliedJobs, unsaveJob, saveJob } from '@/lib/redux/slices/userSlice';
import { showSuccessToast, showErrorToast } from '@/lib/redux/slices/uiSlice';

// Mock job data - In a real app, this would come from an API
const mockSavedJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2024-01-10',
    expiryDate: '2024-02-10',
    isRemote: true,
    savedDate: '2024-01-15',
    description: 'Looking for an experienced Frontend Developer with React expertise.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    matchPercentage: 95,
    applied: false,
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'Startup XYZ',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    experience: 'Mid-Level',
    postedDate: '2024-01-12',
    expiryDate: '2024-02-12',
    isRemote: true,
    savedDate: '2024-01-16',
    description: 'Join our growing team to build amazing products.',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    matchPercentage: 88,
    applied: true,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    experience: 'Mid-Level',
    postedDate: '2024-01-08',
    expiryDate: '2024-02-08',
    isRemote: false,
    savedDate: '2024-01-14',
    description: 'Create beautiful user interfaces for web and mobile applications.',
    skills: ['Figma', 'Sketch', 'UI Design', 'Prototyping'],
    matchPercentage: 76,
    applied: false,
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'Cloud Systems',
    location: 'Austin, TX',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2024-01-05',
    expiryDate: '2024-02-05',
    isRemote: true,
    savedDate: '2024-01-10',
    description: 'Build scalable backend systems for enterprise applications.',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    matchPercentage: 92,
    applied: false,
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'InfraTech',
    location: 'Seattle, WA',
    salary: '$135,000 - $170,000',
    type: 'Contract',
    experience: 'Senior',
    postedDate: '2024-01-03',
    expiryDate: '2024-02-03',
    isRemote: true,
    savedDate: '2024-01-08',
    description: 'Manage and optimize our cloud infrastructure.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    matchPercentage: 85,
    applied: false,
  },
  {
    id: '6',
    title: 'Mobile Developer',
    company: 'AppMakers Inc.',
    location: 'Remote',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    experience: 'Mid-Level',
    postedDate: '2024-01-14',
    expiryDate: '2024-02-14',
    isRemote: true,
    savedDate: '2024-01-18',
    description: 'Develop cross-platform mobile applications.',
    skills: ['React Native', 'iOS', 'Android', 'TypeScript'],
    matchPercentage: 80,
    applied: false,
  },
];

const SavedJobsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const savedJobIds = useSelector(selectSavedJobs);
  const appliedJobIds = useSelector(selectAppliedJobs);
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Initialize saved jobs
  useEffect(() => {
    // Filter mock jobs by saved job IDs
    const userSavedJobs = mockSavedJobs.filter(job => 
      savedJobIds.includes(job.id)
    ).map(job => ({
      ...job,
      applied: appliedJobIds.includes(job.id)
    }));
    
    setSavedJobs(userSavedJobs);
  }, [savedJobIds, appliedJobIds]);

  // Filter and sort jobs
  useEffect(() => {
    let result = [...savedJobs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (filter === 'active') {
      result = result.filter(job => !job.applied);
    } else if (filter === 'applied') {
      result = result.filter(job => job.applied);
    } else if (filter === 'expired') {
      // Mock expired filter
      result = result.filter(job => new Date(job.expiryDate) < new Date());
    }
    
    // Apply sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.savedDate) - new Date(a.savedDate);
        case 'salary-high':
          return parseFloat(b.salary.replace(/[^0-9.-]+/g, "")) - parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
        case 'salary-low':
          return parseFloat(a.salary.replace(/[^0-9.-]+/g, "")) - parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'expiry':
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        default:
          return 0;
      }
    });
    
    setFilteredJobs(result);
  }, [savedJobs, filter, sortBy, searchQuery]);

  // Handle unsave job
  const handleUnsaveJob = (jobId) => {
    dispatch(unsaveJob(jobId));
    dispatch(showSuccessToast('Job removed from saved list'));
  };

  // Handle apply to job
  const handleApplyJob = (job) => {
    router.push(`/jobs/apply/${job.id}`);
  };

  // Calculate stats
  const stats = {
    total: savedJobs.length,
    active: savedJobs.filter(job => !job.applied).length,
    applied: savedJobs.filter(job => job.applied).length,
    expired: savedJobs.filter(job => new Date(job.expiryDate) < new Date()).length,
  };

  const filters = [
    { id: 'all', name: 'All Saved', count: stats.total },
    { id: 'active', name: 'Active', count: stats.active },
    { id: 'applied', name: 'Applied', count: stats.applied },
    { id: 'expired', name: 'Expired', count: stats.expired },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Recently Saved' },
    { id: 'salary-high', name: 'Salary (High to Low)' },
    { id: 'salary-low', name: 'Salary (Low to High)' },
    { id: 'match', name: 'Best Match' },
    { id: 'expiry', name: 'Expiring Soon' },
  ];

  // Get days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-600 mt-2">
          Keep track of jobs you're interested in and apply when ready
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Saved', value: stats.total, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', icon: '📌' },
          { label: 'Active', value: stats.active, color: 'bg-green-50 text-green-600', border: 'border-green-100', icon: '📈' },
          { label: 'Applied', value: stats.applied, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', icon: '📄' },
          { label: 'Expired', value: stats.expired, color: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-100', icon: '⏰' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`border ${stat.border} rounded-xl p-4 hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Filters and View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === filterOption.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.name}
                  {filterOption.count > 0 && (
                    <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                      filter === filterOption.id
                        ? 'bg-teal-700'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {filterOption.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: Search and Sort */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved jobs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full md:w-64"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid/List */}
      {filteredJobs.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const daysUntilExpiry = getDaysUntilExpiry(job.expiryDate);
              const isExpired = daysUntilExpiry < 0;
              
              return (
                <div
                  key={job.id}
                  className={`bg-white border ${
                    job.applied
                      ? 'border-green-200'
                      : isExpired
                      ? 'border-yellow-200'
                      : 'border-gray-200'
                  } rounded-xl p-5 hover:shadow-md transition-all duration-300`}
                >
                  {/* Job Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                            {job.matchPercentage}% match
                          </span>
                          {job.applied && (
                            <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              Applied
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnsaveJob(job.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from saved"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                          Remote
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{job.salary}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{job.type} • {job.experience}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Expiry Info */}
                    <div className={`text-sm ${
                      isExpired ? 'text-red-600' : daysUntilExpiry < 7 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isExpired 
                        ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                        : daysUntilExpiry < 7
                        ? `Expires in ${daysUntilExpiry} days`
                        : `Expires on ${new Date(job.expiryDate).toLocaleDateString()}`
                      }
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="flex-1 px-3 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors text-center"
                    >
                      View Details
                    </Link>
                    {!job.applied ? (
                      <button
                        onClick={() => handleApplyJob(job)}
                        className="flex-1 px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Apply Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
                      >
                        Already Applied
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {filteredJobs.map((job) => {
              const daysUntilExpiry = getDaysUntilExpiry(job.expiryDate);
              const isExpired = daysUntilExpiry < 0;
              
              return (
                <div
                  key={job.id}
                  className={`p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors ${
                    job.applied ? 'bg-green-50' : isExpired ? 'bg-yellow-50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    {/* Left side - Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {job.company.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                              <p className="text-gray-700">{job.company}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                                {job.matchPercentage}% match
                              </span>
                              {job.applied && (
                                <span className="ml-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                  Applied
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                              {job.isRemote && (
                                <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                                  Remote
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {job.salary}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Saved on {new Date(job.savedDate).toLocaleDateString()}
                              {isExpired && (
                                <span className="ml-2 text-red-600">• Expired</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Actions */}
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors text-center"
                        >
                          View Job
                        </Link>
                        {!job.applied ? (
                          <button
                            onClick={() => handleApplyJob(job)}
                            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                          >
                            Apply Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
                          >
                            Applied
                          </button>
                        )}
                      </div>
                      <div className="flex justify-center space-x-3 text-sm text-gray-500">
                        <button
                          onClick={() => handleUnsaveJob(job.id)}
                          className="text-red-600 hover:text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 hover:underline">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        // Empty State
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? 'No matching saved jobs' : 'No saved jobs yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchQuery
              ? `No saved jobs match your search "${searchQuery}". Try a different search term.`
              : 'Start saving jobs that interest you by clicking the bookmark icon on any job listing.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Jobs
            </Link>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-teal-50 to-green-50 border border-teal-100 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-teal-600">💡</span>
          </div>
          <h3 className="font-semibold text-gray-900">Tips for Managing Saved Jobs</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Organize by Priority</h4>
            <p className="text-sm text-gray-600">
              Tag jobs as high, medium, or low priority to focus your applications effectively.
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Set Application Deadlines</h4>
            <p className="text-sm text-gray-600">
              Note application deadlines and set reminders to avoid missing opportunities.
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Track Your Progress</h4>
            <p className="text-sm text-gray-600">
              Review saved jobs regularly and move applied jobs to your applications tracker.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedJobsPage;