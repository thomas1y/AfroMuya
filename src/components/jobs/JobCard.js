

const JobCard = ({job}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
        {/* Job header with featured badge */}
          <div className="flex justify-between items-start">
              <div >

                   <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                   <p className="text-gray-700 mt-1">{job.company}</p>
              </div>
              {job.isFeatured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                    Featured
                </span>
              )}
          </div>

          {/* Job details */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
        <span className="flex items-center">
          📍 {job.location}
        </span>
        <span className="flex items-center">
          💼 {job.type}
        </span>
        <span className="flex items-center">
          💰 {job.salary}
        </span>
      </div>

      {/* Job description preview */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        Looking for a skilled {job.title.toLowerCase()} with experience in modern technologies...
      </p>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.map((skill, index) => (
          <span 
            key={index}
            className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted {job.posted}
        </span>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="bg-[#5daca1] text-white px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Apply Now
          </button>
        </div>
      </div>       


    </div>
  )
}

export default JobCard