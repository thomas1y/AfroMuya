import JobCard from '../jobs/JobCard'

const FeaturedJobs = () => {
    const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Tailwind"],
      isFeatured: true
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Startup Co",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "1 day ago",
      skills: ["Node.js", "Python", "AWS"],
      isFeatured: true
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Agency",
      location: "Remote",
      type: "Contract",
      salary: "$70,000 - $90,000",
      posted: "3 days ago",
      skills: ["Figma", "Sketch", "Prototyping"],
      isFeatured: true
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Data Inc",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$95,000 - $130,000",
      posted: "1 week ago",
      skills: ["Python", "ML", "SQL"],
      isFeatured: true
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Co",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      posted: "4 days ago",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      isFeatured: true
    },
    {
      id: 6,
      title: "Product Manager",
      company: "Product Co",
      location: "Remote",
      type: "Full-time",
      salary: "$85,000 - $115,000",
      posted: "5 days ago",
      skills: ["Product Strategy", "Agile", "Analytics"],
      isFeatured: true
    }
  ]
  return (
    <div className="bg-white py-16">
        <div className="max-w-[1296px] mx-auto px-20">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Popular Job Opportunities
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto ">
                    Browse our most popular job listings from top companies
                </p>
            </div>
              
             
              {/* Jobs Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
               {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
            </div>

             {/* View All Button */}
             <div className="text-center mt-12">
          <a 
            href="/jobs"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View All Jobs
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        </div>
    </div>
  )
}

export default FeaturedJobs