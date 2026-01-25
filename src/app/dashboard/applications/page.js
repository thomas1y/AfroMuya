'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { selectApplications, fetchUserApplications } from '@/lib/redux/slices/userSlice';
import { showSuccessToast, showErrorToast } from '@/lib/redux/slices/uiSlice';

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const applications = useSelector(selectApplications);
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Fetch applications on mount
  useEffect(() => {
    const loadApplications = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchUserApplications()).unwrap();
      } catch (error) {
        dispatch(showErrorToast('Failed to load applications'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadApplications();
  }, [dispatch]);

  // Filter and sort applications
  useEffect(() => {
    let result = [...applications];
    
    // Apply filter
    if (filter !== 'all') {
      result = result.filter(app => app.status === filter);
    }
    
    // Apply sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'oldest':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'title':
          return a.jobTitle.localeCompare(b.jobTitle);
        default:
          return 0;
      }
    });
    
    setFilteredApplications(result);
  }, [applications, filter, sortBy]);

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    interview: applications.filter(app => app.status === 'interview').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    withdrawn: applications.filter(app => app.status === 'withdrawn').length,
  };

  // Mock function to withdraw application
  const withdrawApplication = (applicationId) => {
    // In a real app, this would be an API call
    dispatch(showSuccessToast('Application withdrawn successfully'));
  };

  // Mock function to view application details
  const viewApplicationDetails = (applicationId) => {
    // Navigate to application details page
    router.push(`/dashboard/applications/${applicationId}`);
  };

  const filters = [
    { id: 'all', name: 'All Applications', count: stats.total },
    { id: 'pending', name: 'Pending', count: stats.pending },
    { id: 'interview', name: 'Interview', count: stats.interview },
    { id: 'accepted', name: 'Accepted', count: stats.accepted },
    { id: 'rejected', name: 'Rejected', count: stats.rejected },
    { id: 'withdrawn', name: 'Withdrawn', count: stats.withdrawn },
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'company', name: 'Company Name' },
    { id: 'title', name: 'Job Title' },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    interview: 'bg-blue-100 text-blue-800 border-blue-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const statusIcons = {
    pending: '⏳',
    interview: '🤝',
    accepted: '✅',
    rejected: '❌',
    withdrawn: '↩️',
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">
          Track and manage all your job applications in one place
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
          { label: 'Pending', value: stats.pending, color: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-100' },
          { label: 'Interview', value: stats.interview, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
          { label: 'Accepted', value: stats.accepted, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
          { label: 'Withdrawn', value: stats.withdrawn, color: 'bg-gray-50 text-gray-600', border: 'border-gray-100' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`border ${stat.border} rounded-xl p-4 text-center hover:shadow-sm transition-shadow ${stat.color}`}
          >
            <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.name}
                {filterOption.count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
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

      {/* Applications List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="col-span-4">
            <span className="text-sm font-semibold text-gray-700">Job & Company</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-semibold text-gray-700">Applied Date</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-semibold text-gray-700">Status</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-semibold text-gray-700">Last Updated</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-semibold text-gray-700">Actions</span>
          </div>
        </div>

        {/* Applications */}
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-12 items-center px-6 py-4">
                  <div className="col-span-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
                        {application.company?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.jobTitle}</h3>
                        <p className="text-sm text-gray-600">{application.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900">{application.appliedDate}</p>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[application.status]}`}>
                      <span className="mr-1">{statusIcons[application.status]}</span>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">
                      {application.lastUpdated || application.appliedDate}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => viewApplicationDetails(application.id)}
                        className="px-3 py-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      {application.status === 'pending' && (
                        <button
                          onClick={() => withdrawApplication(application.id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
                        {application.company?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.jobTitle}</h3>
                        <p className="text-sm text-gray-600">{application.company}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[application.status]}`}>
                      <span className="mr-1">{statusIcons[application.status]}</span>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Applied:</span>
                      <span className="ml-2 text-gray-900">{application.appliedDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="ml-2 text-gray-900">
                        {application.lastUpdated || application.appliedDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewApplicationDetails(application.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors text-center"
                    >
                      View Details
                    </button>
                    {application.status === 'pending' && (
                      <button
                        onClick={() => withdrawApplication(application.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-center"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {filter === 'all'
                ? "You haven't applied to any jobs yet. Start your job search to find exciting opportunities!"
                : `You don't have any applications with status "${filter}".`}
            </p>
            {filter === 'all' ? (
              <Link
                href="/jobs"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Jobs
              </Link>
            ) : (
              <button
                onClick={() => setFilter('all')}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                View All Applications
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">1-{filteredApplications.length}</span> of{' '}
                <span className="font-semibold">{filteredApplications.length}</span> applications
              </div>
              <div className="flex space-x-2">
                <button
                  disabled
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors">
                  1
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-blue-600">📈</span>
            </div>
            <h3 className="font-semibold text-gray-900">Track Your Progress</h3>
          </div>
          <p className="text-sm text-gray-600">
            Monitor application status and follow up with employers after submitting your applications.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-green-600">✍️</span>
            </div>
            <h3 className="font-semibold text-gray-900">Customize Applications</h3>
          </div>
          <p className="text-sm text-gray-600">
            Tailor your resume and cover letter for each job application to increase your chances.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-5">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-purple-600">🔔</span>
            </div>
            <h3 className="font-semibold text-gray-900">Set Reminders</h3>
          </div>
          <p className="text-sm text-gray-600">
            Set reminders for follow-ups and interview preparation to stay organized in your job search.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;