"use client" // ← ADD THIS AT THE TOP

import JobCard from '../jobs/JobCard'
import { useState } from 'react'

const FeaturedJobs = () => {
  const allJobs = [
    { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote", type: "Full-time", salary: "$80k-$100k", posted: "2 days ago", skills: ["React", "TypeScript"], isFeatured: true },
    { id: 2, title: "Backend Engineer", company: "Startup Co", location: "NY", type: "Full-time", salary: "$90k-$120k", posted: "1 day ago", skills: ["Node.js", "AWS"], isFeatured: true },
    { id: 3, title: "UX Designer", company: "Design Agency", location: "Remote", type: "Contract", salary: "$70k-$90k", posted: "3 days ago", skills: ["Figma", "Sketch"], isFeatured: true },
    { id: 4, title: "Data Scientist", company: "Data Inc", location: "SF", type: "Full-time", salary: "$95k-$130k", posted: "1 week ago", skills: ["Python", "ML"], isFeatured: true },
    { id: 5, title: "DevOps Engineer", company: "Cloud Co", location: "Remote", type: "Full-time", salary: "$100k-$140k", posted: "4 days ago", skills: ["Docker", "K8s"], isFeatured: true },
    { id: 6, title: "Product Manager", company: "Product Co", location: "Remote", type: "Full-time", salary: "$85k-$115k", posted: "5 days ago", skills: ["Strategy", "Agile"], isFeatured: true },
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const jobsPerPage = 3
  
  const startIdx = currentPage * jobsPerPage
  const currentJobs = allJobs.slice(startIdx, startIdx + jobsPerPage)
  const totalPages = Math.ceil(allJobs.length / jobsPerPage)

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Popular Job Opportunities
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto ">
                    Browse our most popular job listings from top companies
                </p>
            </div>

        {/* 3 Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-8 h-8 rounded-full ${currentPage === idx ? 'bg-[#309689] text-white' : 'bg-gray-200'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next →
          </button>
        </div>

        <div className="text-center mt-8">
          <a href="/jobs" className="text-[#309689] font-medium hover:underline">
            View All Jobs →
          </a>
        </div>

      </div>
    </div>
  )
}

export default FeaturedJobs