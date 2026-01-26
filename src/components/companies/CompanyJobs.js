'use client';

import Link from 'next/link';

const CompanyJobs = ({ jobs }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Open Positions at This Company
        </h2>
        <div className="text-gray-600">
          {jobs.length} position{jobs.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Open Positions</h3>
          <p className="text-gray-600 mb-6">
            This company doesn't have any open positions at the moment.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
            Set Job Alert
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors mb-2">
                        <Link href={`/jobs/${job.id}`}>
                          {job.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">{job.posted}</div>
                      <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {job.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {job.experience} experience
                    </div>
                    {job.location.includes('Remote') && (
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Remote Available
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  >
                    View Job
                  </Link>
                  <Link
                    href={`/jobs/apply/${job.id}`}
                    className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
                  >
                    Easy Apply
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Alert CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-[#2a877a]/10 rounded-2xl p-8 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Want to be notified about new jobs?
            </h3>
            <p className="text-gray-600">
              Get email alerts when this company posts new positions
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
              Set Job Alert
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
              Follow Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobs;