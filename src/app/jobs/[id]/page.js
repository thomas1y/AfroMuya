'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock job data -
const jobData = {
  '1': {
    id: 1,
    title: "Senior Frontend Developer - React/TypeScript",
    company: "TechVision Inc.",
    companyLogo: "TV",
    companyDescription: "TechVision is a leading SaaS company building innovative solutions for businesses worldwide. We're looking for passionate engineers to join our growing team.",
    companySize: "501-1000 employees",
    companyIndustry: "Software Development",
    companyWebsite: "https://techvision.com",
    companyLocation: "San Francisco, CA",
    location: "San Francisco, CA (Remote Available)",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    isRemote: true,
    isFeatured: true,
    posted: "2 days ago",
    postedDate: "2024-01-17",
    applicationDeadline: "2024-02-17",
    experience: "5+ years",
    category: "Engineering",
    applyLink: "/jobs/apply/1",
    
    // specific fields
    jobType: "Permanent",
    telecommute: true,
    clearanceRequired: false,
    travelRequired: "None",
    employmentType: "Employee",
    visaSponsorship: true,
    relocationAssistance: true,
    
    
    techStack: [
      { name: "React", years: "3+ years", importance: "required" },
      { name: "TypeScript", years: "2+ years", importance: "required" },
      { name: "Next.js", years: "2+ years", importance: "preferred" },
      { name: "Tailwind CSS", years: "1+ years", importance: "required" },
      { name: "GraphQL", years: "1+ years", importance: "nice-to-have" },
      { name: "Jest/RTL", years: "2+ years", importance: "required" },
      { name: "AWS", years: "1+ years", importance: "preferred" },
      { name: "CI/CD", years: "2+ years", importance: "required" }
    ],
    
    description: "We're looking for a Senior Frontend Developer with React and TypeScript experience to join our product team. You'll work on building scalable web applications used by thousands of businesses.",
    
    detailedDescription: `
      <p><strong>About the Position:</strong></p>
      <p>As a Senior Frontend Developer at TechVision, you'll be part of our core product team, responsible for building and maintaining our flagship SaaS platform. You'll work with modern technologies and have a direct impact on our product roadmap.</p>
      
      <p><strong>Key Responsibilities:</strong></p>
      <ul>
        <li>Develop new user-facing features using React and TypeScript</li>
        <li>Build reusable components and front-end libraries for future use</li>
        <li>Optimize applications for maximum performance across devices</li>
        <li>Collaborate with product managers and designers to translate requirements into technical solutions</li>
        <li>Mentor junior developers and conduct code reviews</li>
        <li>Participate in agile development processes</li>
      </ul>
      
      <p><strong>Technical Environment:</strong></p>
      <ul>
        <li>Frontend: React 18, TypeScript, Next.js 14, Tailwind CSS</li>
        <li>Testing: Jest, React Testing Library, Cypress</li>
        <li>State Management: Redux Toolkit, React Query</li>
        <li>Backend: Node.js, GraphQL, REST APIs</li>
        <li>Infrastructure: AWS, Docker, Kubernetes, CI/CD pipelines</li>
      </ul>
    `,
    
    // Requirements
    requirements: [
      "Bachelor's degree in Computer Science or related field (or equivalent experience)",
      "5+ years of professional frontend development experience",
      "3+ years of React experience in production applications",
      "2+ years of TypeScript experience",
      "Experience with modern frontend build tools and CI/CD",
      "Strong understanding of web performance optimization",
      "Experience with responsive design and cross-browser compatibility"
    ],
    
    // Benefits 
    benefits: [
      "Medical, Dental, and Vision Insurance",
      "401(k) with 5% company match",
      "Unlimited Paid Time Off",
      "Remote Work Flexibility",
      "$3,000 Annual Learning Stipend",
      "Home Office Equipment Allowance",
      "Stock Options",
      "Quarterly Bonus Potential"
    ],
    
    // Similar jobs
    similarJobs: [
      {
        id: 11,
        title: "React Developer",
        company: "CloudScale",
        location: "Remote",
        salary: "$115,000 - $150,000",
        posted: "1 day ago",
        isRemote: true
      },
      {
        id: 12,
        title: "Frontend Engineer",
        company: "DigitalFlow",
        location: "New York, NY",
        salary: "$125,000 - $165,000",
        posted: "3 days ago",
        isRemote: false
      },
      {
        id: 13,
        title: "UI Developer - React",
        company: "AppWorks",
        location: "Remote",
        salary: "$110,000 - $145,000",
        posted: "5 days ago",
        isRemote: true
      }
    ],
    
    // statistics
    views: "2,438",
    applicants: "156",
    easyApply: true,
    Score: 87,
    urgencyLevel: "High" 
  }
};

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const jobId = params.id;
      const foundJob = jobData[jobId] || null;
      
      // Simulate API delay
      setTimeout(() => {
        setJob(foundJob);
        
        if (foundJob) {
          const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
          const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
          
          setIsSaved(savedJobs.includes(foundJob.id));
          setHasApplied(appliedJobs.includes(foundJob.id));
        }
        
        setLoading(false);
      }, 300);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">This job may have been filled or removed.</p>
            <Link 
              href="/jobs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#008638] hover:bg-[#006b2d]"
            >
              Browse Tech Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Application Modal - Simplified Dice Style */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Apply to {job.company}</h3>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#008638] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume
                </label>
                <div className="border border-gray-300 rounded p-4">
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload your resume</span>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleApply();
                  setShowApplicationModal(false);
                }}
                className="flex-1 bg-[#008638] text-white px-4 py-3 rounded hover:bg-[#006b2d]"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Dice Style Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb - Simple */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-[#008638]">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/jobs" className="hover:text-[#008638]">Jobs</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{job.title.substring(0, 30)}...</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Job Content - Left Column (2/3) */}
          <div className="lg:col-span-2">
            {/* Job Header - Dice Style */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center flex-wrap gap-4 mb-4">
                    <Link 
                      href={`/companies/${job.id}`}
                      className="text-xl text-[#008638] hover:text-[#006b2d] font-semibold"
                    >
                      {job.company}
                    </Link>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-700">{job.location}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-700">{job.posted}</span>
                  </div>
                </div>
                
                {/*  Match Score */}
                <div className="bg-[#008638] text-white px-4 py-2 rounded-lg">
                  <div className="text-sm">MATCH Score</div>
                  <div className="text-2xl font-bold">{job.Score}%</div>
                </div>
              </div>
              
              {/* Job Actions Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="bg-[#008638] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006b2d] flex items-center gap-2"
                >
                  {job.easyApply ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Easy Apply
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </button>
                
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`px-4 py-3 rounded-lg border flex items-center gap-2 ${
                    isSaved
                      ? 'border-[#008638] bg-[#008638]/10 text-[#008638]'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
                
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
              
              {/* Job Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Salary</div>
                  <div className="font-semibold text-gray-900">{job.salary}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Job Type</div>
                  <div className="font-semibold text-gray-900">{job.type}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Experience</div>
                  <div className="font-semibold text-gray-900">{job.experience}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Clearance</div>
                  <div className="font-semibold text-gray-900">
                    {job.clearanceRequired ? 'Required' : 'Not Required'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {job.techStack.map((tech, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#008638] transition-colors">
                    <div className="font-semibold text-gray-900 mb-1">{tech.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{tech.years}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tech.importance === 'required' 
                        ? 'bg-red-100 text-red-800'
                        : tech.importance === 'preferred'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tech.importance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Description - Clean, readable */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: job.detailedDescription }} />
              </div>
            </div>

            {/* Requirements - Simple list */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-[#008638] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-[#008638] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info  */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Employment Type:</span>
                  <span className="ml-2 font-medium text-gray-900">{job.employmentType}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Telecommute:</span>
                  <span className="ml-2 font-medium text-gray-900">{job.telecommute ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Visa Sponsorship:</span>
                  <span className="ml-2 font-medium text-gray-900">{job.visaSponsorship ? 'Available' : 'Not Available'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Relocation Assistance:</span>
                  <span className="ml-2 font-medium text-gray-900">{job.relocationAssistance ? 'Available' : 'Not Available'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Company Card  */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#008638]/10 to-[#008638]/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#008638]">{job.companyLogo}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{job.company}</h3>
                  <p className="text-sm text-gray-600">{job.companyLocation}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{job.companySize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{job.companyIndustry}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 py-3 border border-[#008638] text-[#008638] rounded-lg font-semibold hover:bg-[#008638] hover:text-white transition-colors">
                Follow Company
              </button>
            </div>

            {/* Job Stats */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Job Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Views this week</span>
                    <span className="font-semibold text-gray-900">{job.views}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#008638] w-3/4"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Applicants</span>
                    <span className="font-semibold text-gray-900">{job.applicants}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#008638] w-1/2"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Urgency Level</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      {job.urgencyLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Similar Tech Jobs</h3>
              
              <div className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    href={`/jobs/${similarJob.id}`}
                    className="block p-4 border border-gray-200 rounded hover:border-[#008638] hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{similarJob.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{similarJob.company}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{similarJob.salary}</span>
                          {similarJob.isRemote && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Remote</span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{similarJob.posted}</span>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link
                href="/jobs"
                className="mt-4 block text-center text-[#008638] hover:text-[#006b2d] font-medium"
              >
                View all similar jobs →
              </Link>
            </div>

            {/* Quick Apply CTA - Sticky */}
            <div className="sticky top-32 border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-sm text-gray-600 mb-4">
                This position receives an average of {Math.floor(job.applicants / 7)} applications per day.
              </p>
              
              <button
                onClick={() => setShowApplicationModal(true)}
                className="w-full bg-[#008638] text-white py-3 rounded-lg font-semibold hover:bg-[#006b2d] mb-3"
              >
                {hasApplied ? 'Application Submitted ✓' : 'Apply Now'}
              </button>
              
              <div className="text-center">
                <button className="text-sm text-[#008638] hover:text-[#006b2d] font-medium">
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Next Tech Job</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              AfroMuya helps tech professionals like you find great jobs with leading companies.
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#008638] hover:bg-[#006b2d]"
            >
              Browse All Tech Jobs
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}