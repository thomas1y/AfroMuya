'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectApplications, selectSavedJobs, selectUserProfile } from '@/lib/redux/slices/userSlice';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(selectUserProfile);
  const applications = useSelector(selectApplications);
  const savedJobs = useSelector(selectSavedJobs);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Profile Views',
      value: '245',
      change: '+12%',
      changeType: 'increase',
      icon: '👁️',
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Applications',
      value: applications?.length || 0,
      change: '+3',
      changeType: 'increase',
      icon: '📄',
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200',
    },
    {
      title: 'Saved Jobs',
      value: savedJobs?.length || 0,
      change: '+1',
      changeType: 'increase',
      icon: '⭐',
      color: 'bg-yellow-50 text-yellow-600',
      borderColor: 'border-yellow-200',
    },
    {
      title: 'Profile Strength',
      value: '65%',
      change: '+10%',
      changeType: 'increase',
      icon: '📈',
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'Applied for Senior Frontend Developer',
      company: 'Tech Corp',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'saved',
      title: 'Saved Backend Engineer position',
      company: 'Startup XYZ',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'view',
      title: 'Profile viewed by Google Recruiter',
      time: '2 days ago',
    },
    {
      id: 4,
      type: 'update',
      title: 'Updated your resume',
      time: '3 days ago',
    },
  ];

  const quickActions = [
    {
      title: 'Complete Profile',
      description: 'Add missing information to increase visibility',
      icon: '👤',
      href: '/dashboard/profile',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Upload Resume',
      description: 'Update your resume for better matches',
      icon: '📄',
      href: '/dashboard/resume',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Search Jobs',
      description: 'Find new opportunities that match your skills',
      icon: '🔍',
      href: '/jobs',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Skill Assessment',
      description: 'Take tests to showcase your abilities',
      icon: '🎯',
      href: '#',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {userProfile?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white border ${stat.borderColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">from last week</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Activity & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                        <span className="text-teal-600">
                          {activity.type === 'application' && '📄'}
                          {activity.type === 'saved' && '⭐'}
                          {activity.type === 'view' && '👁️'}
                          {activity.type === 'update' && '✏️'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.company && `${activity.company} • `}
                        {activity.time}
                      </p>
                      {activity.status && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/applications"
                className="mt-4 block text-center text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                View all activity →
              </Link>
            </div>
          </div>

          {/* Job Recommendations */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-teal-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Jobs For You
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Full Stack Developer',
                  company: 'Innovate Tech',
                  location: 'Remote',
                  salary: '$120k - $150k',
                  match: '95%',
                },
                {
                  title: 'React Native Developer',
                  company: 'Mobile First',
                  location: 'San Francisco, CA',
                  salary: '$110k - $140k',
                  match: '88%',
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">
                        {job.company} • {job.location} • {job.salary}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                        {job.match} match
                      </span>
                      <button className="mt-2 block text-sm font-medium text-teal-600 hover:text-teal-700">
                        Apply Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`group block bg-gradient-to-r ${action.color} text-white rounded-lg p-5 hover:shadow-lg transition-all transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{action.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Profile Completion
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">65% Complete</span>
                  <span className="text-teal-600 font-semibold">Good!</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Add Profile Photo', completed: true },
                  { label: 'Complete Work Experience', completed: true },
                  { label: 'Add Education Details', completed: false },
                  { label: 'List 5+ Skills', completed: true },
                  { label: 'Upload Resume', completed: false },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        item.completed
                          ? 'bg-teal-100 text-teal-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {item.completed ? '✓' : '○'}
                    </div>
                    <span
                      className={`text-sm ${
                        item.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;