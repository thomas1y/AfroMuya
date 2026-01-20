// File: src/app/jobs/[id]/page.js (REPLACE everything with this)

export default async function JobDetailsPage({ params }) {
  // Await the params promise
  const { id } = await params;
  
  // Simple job data for testing
  const job = {
    id: id,
    title: "Senior Frontend Developer",
    company: "TechVision Inc.",
    companyLogo: "TV",
    location: "San Francisco, CA (Remote Available)",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    isRemote: true,
    isFeatured: true,
    posted: "2 days ago",
    applyLink: `/jobs/apply/${id}`,
    description: "We're looking for a Senior Frontend Developer to join our product team.",
    responsibilities: ["Develop features", "Write clean code", "Mentor juniors"],
    requirements: ["5+ years experience", "React knowledge", "TypeScript"],
    benefits: ["Health insurance", "401(k)", "Remote work"],
    skills: ["React", "TypeScript", "Next.js"]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Simple Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{job.company}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              📍 {job.location}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              💼 {job.type}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              💰 {job.salary}
            </span>
          </div>
          
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Apply Now
          </button>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 mb-6">{job.description}</p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Responsibilities</h3>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Job ID: {id}</p>
        </div>

      </div>
    </main>
  );
}