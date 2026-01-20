
// File: src/app/jobs/[id]/page.js
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock job data - in real app, fetch from API
const jobData = {
  '1': {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechVision Inc.",
    companyLogo: "TV",
    companyDescription: "TechVision is a leading SaaS company building innovative solutions for businesses worldwide.",
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
    description: "We're looking for a Senior Frontend Developer to join our product team. You'll work on building beautiful, performant web applications used by millions of users worldwide.",
    responsibilities: [
      "Develop and maintain user-facing features using React and TypeScript",
      "Collaborate with designers to implement pixel-perfect UIs",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and testable code",
      "Mentor junior developers and conduct code reviews"
    ],
    requirements: [
      "5+ years of professional frontend development experience",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with Next.js, Tailwind CSS, and GraphQL",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Excellent problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) matching up to 5%",
      "Unlimited paid time off",
      "Remote work flexibility",
      "Learning and development budget",
      "Home office setup allowance"
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "CI/CD"]
  },
  '2': {
    id: 2,
    title: "UX/UI Designer",
    company: "CreativeMinds",
    companyLogo: "CM",
    companyDescription: "A digital agency specializing in user experience and interface design.",
    companySize: "201-500 employees",
    companyIndustry: "Digital Agency",
    companyWebsite: "https://creativeminds.com",
    companyLocation: "New York, NY",
    location: "New York, NY (Remote Available)",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    isRemote: true,
    isFeatured: false,
    posted: "5 days ago",
    postedDate: "2024-01-14",
    applicationDeadline: "2024-02-14",
    experience: "3+ years",
    category: "Design",
    applyLink: "/jobs/apply/2",
    description: "Join our design team to create intuitive user experiences across web and mobile platforms. Collaborate with product managers and engineers to bring designs to life.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with cross-functional teams",
      "Maintain and evolve design systems"
    ],
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, and Adobe Creative Suite",
      "Strong portfolio showcasing design process",
      "Understanding of user-centered design principles",
      "Excellent communication and collaboration skills"
    ],
    benefits: [
      "Health Insurance",
      "Remote Work Options",
      "Professional Development",
      "Unlimited PTO",
      "Flexible Hours",
      "Annual Bonus"
    ],
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"]
  }
};

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const jobId = params.id;
      const foundJob = jobData[jobId] || null;
      
      // Simulate API delay
      setTimeout(() => {
        setJob(foundJob);
        setLoading(false);
      }, 300);
    }
  }, [params]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(`${isSaved ? 'Unsaved' : 'Saved'} job ${job.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900">Job Not Found</h1>
            <p className="text-gray-600 mt-4">The job you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/jobs"
              className="mt-6 inline-block bg-[#309689] text-white px-6 py-3 rounded-lg hover:bg-[#2a877a] transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#309689] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-[#309689] transition-colors">
                Jobs
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {job.title}
            </li>
          </ol>
        </nav>

        {/* Job Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#309689]/10 to-[#309689]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-[#309689]">{job.companyLogo}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                  <p className="text-xl text-gray-700 mt-1">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      📍 {job.location}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      💼 {job.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      💰 {job.salary}
                    </span>
                    {job.isRemote && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        🌍 Remote
                      </span>
                    )}
                    {job.isFeatured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600">{job.description}</p>
            </div>
            
            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">{job.salary}</div>
                  <p className="text-gray-500 text-sm mt-1">Annual salary</p>
                </div>
                
                <div className="space-y-4">
                  <Link
                    href={job.applyLink}
                    className="w-full bg-[#309689] text-white py-3 rounded-xl hover:bg-[#2a877a] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Apply Now
                  </Link>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Posted</p>
                    <p className="font-medium text-gray-900">{job.posted}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Responsibilities */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#309689]/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#309689]"></div>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-4">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#309689]/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-[#309689]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-[#309689] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#309689]/10 text-[#309689] rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Company & Application */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium text-gray-900">{job.companyIndustry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium text-gray-900">{job.companySize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{job.companyLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#309689] hover:text-[#2a877a] transition-colors"
                  >
                    {job.companyWebsite.replace('https://', '')}
                  </a>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm">{job.companyDescription}</p>
              </div>
            </div>

            {/* Application Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Experience Required</p>
                  <p className="font-medium text-gray-900">{job.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Category</p>
                  <p className="font-medium text-gray-900">{job.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Jobs */}
        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-[#309689] hover:text-[#2a877a] font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}