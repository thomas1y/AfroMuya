
import JobDetailsHeader from '@/components/jobs/JobDetailsHeader';
import { notFound } from 'next/navigation';

// This would come from your database/API in a real app
const getJobData = (id) => {
  const jobs = {
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
    }
    // Add more jobs as needed
  };
  
  return jobs[id] || null;
};

export default function JobDetailsPage({ params }) {
  const { id } = params;
  const job = getJobData(id);
  
  if (!job) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
        {/* Job Details Header */}
        <div className="mb-8">
          <JobDetailsHeader job={job} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Description (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">{job.description}</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                <ul className="space-y-2 mb-6">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#309689] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2 mb-6">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#309689] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-[#309689] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Company Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium text-gray-900">{job.companySize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium text-gray-900">{job.companyIndustry}</p>
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
                    {job.companyWebsite}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Application Form Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this Position</h3>
              <button className="w-full bg-[#309689] text-white px-6 py-4 rounded-xl hover:bg-[#2a877a] transition-colors font-semibold text-lg">
                Apply Now
              </button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}