// File: src/components/jobs/JobCard.js
import Link from 'next/link';

const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-[#309689]/20 cursor-pointer group">
        {/* Job header with featured badge */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#309689] transition-colors">
              {job.title}
            </h3>
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
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {job.type}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary}
          </span>
        </div>

        {/* Job description preview */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {job.description || `Looking for a skilled ${job.title.toLowerCase()} with experience in modern technologies...`}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Posted {job.posted}
          </span>
          <div className="flex gap-3">
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Saved job ${job.id}`);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button 
              className="bg-[#309689] text-white px-4 py-2 rounded-lg hover:bg-[#2a877a] transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Applied to job ${job.id}`);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;