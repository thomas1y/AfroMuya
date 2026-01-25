'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { selectApplications } from '@/lib/redux/slices/userSlice';

const ApplicationDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const applications = useSelector(selectApplications);
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Find application by ID
  useEffect(() => {
    const foundApp = applications.find(app => app.id === params.id);
    if (foundApp) {
      setApplication(foundApp);
    }
    setIsLoading(false);
  }, [params.id, applications]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    interview: 'bg-blue-100 text-blue-800 border-blue-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-gray-600">Loading application details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Not Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The application you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/dashboard/applications"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            ← Back to Applications
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Applications
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{application.jobTitle}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-gray-700">{application.company}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[application.status]}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Download Application
            </button>
            {application.status === 'pending' && (
              <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
                Withdraw Application
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Application Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Timeline</h2>
            <div className="space-y-8">
              {[
                { status: 'Submitted', date: application.appliedDate, icon: '📄', completed: true },
                { status: 'Under Review', date: '2024-01-16', icon: '👁️', completed: true },
                { status: 'Interview', date: application.status === 'interview' ? '2024-01-20' : 'Scheduled soon', icon: '🤝', completed: application.status === 'interview' || application.status === 'accepted' },
                { status: 'Decision', date: 'Expected: 2024-01-25', icon: '⚖️', completed: application.status === 'accepted' || application.status === 'rejected' },
                { status: 'Completed', date: application.status === 'accepted' ? 'Hired!' : 'Closed', icon: '✅', completed: application.status === 'accepted' || application.status === 'rejected' || application.status === 'withdrawn' },
              ].map((step, index) => (
                <div key={step.status} className="flex items-start">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    {index < 4 && (
                      <div className={`absolute left-5 top-10 w-0.5 h-8 ${
                        step.completed ? 'bg-teal-200' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-medium ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.status}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Documents */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Documents</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-red-600 text-xl">📄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Resume</h3>
                      <p className="text-sm text-gray-600">Submitted on {application.appliedDate}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors">
                    View
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cover Letter</h3>
                      <p className="text-sm text-gray-600">Custom letter for this application</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Job Details & Actions */}
        <div className="space-y-6">
          {/* Job Details Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Job ID</h3>
                <p className="text-gray-900">#{application.jobId || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="text-gray-900">Remote / San Francisco, CA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                <p className="text-gray-900">$120,000 - $150,000</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                <p className="text-gray-900">Full-time</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Experience Level</h3>
                <p className="text-gray-900">Senior Level</p>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
              View Job Posting
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Recruiter</h3>
                <p className="text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Senior Talent Acquisition</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-900">sarah.johnson@company.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Contact Recruiter
            </button>
          </div>

          {/* Application Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">💡 Application Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Follow up within 5-7 business days</li>
              <li>• Prepare for potential interview questions</li>
              <li>• Research the company before interviews</li>
              <li>• Update your portfolio with relevant work</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetailsPage;