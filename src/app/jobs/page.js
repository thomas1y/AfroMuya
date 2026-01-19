import JobFilters from '@/components/jobs/JobFilters'
import JobCard from '@/components/jobs/JobCard';

export default function JobsPage() {

  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechVision Inc.",
      logo: "TV",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      salaryRange: [120000, 160000],
      isRemote: true,
      isNew: true,
      posted: "2 days ago",
      postedDate: "2024-01-17",
      tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      description: "We're looking for a Senior Frontend Developer to join our product team. You'll work on building beautiful, performant web applications used by millions of users worldwide.",
      experience: "5+ years",
      category: "Engineering",
      applyLink: "/jobs/apply/1",
      companySize: "501-1000 employees",
      companyIndustry: "Software Development",
      benefits: ["Health Insurance", "401(k) Matching", "Flexible Hours", "Stock Options"],
      workType: "Hybrid",
      skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "REST APIs", "UI/UX Design"],
      urgency: "high"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "CreativeMinds",
      logo: "CM",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      salaryRange: [90000, 120000],
      isRemote: true,
      isNew: false,
      posted: "5 days ago",
      postedDate: "2024-01-14",
      tags: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"],
      description: "Join our design team to create intuitive user experiences across web and mobile platforms. Collaborate with product managers and engineers to bring designs to life.",
      experience: "3+ years",
      category: "Design",
      applyLink: "/jobs/apply/2",
      companySize: "201-500 employees",
      companyIndustry: "Digital Agency",
      benefits: ["Health Insurance", "Remote Work", "Professional Development", "Unlimited PTO"],
      workType: "Remote",
      skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Thinking"],
      urgency: "medium"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      logo: "DF",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      salaryRange: [130000, 180000],
      isRemote: true,
      isNew: true,
      posted: "1 day ago",
      postedDate: "2024-01-18",
      tags: ["Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
      description: "Build scalable backend systems and microservices. Work with large datasets and real-time processing. Experience with cloud infrastructure required.",
      experience: "4+ years",
      category: "Engineering",
      applyLink: "/jobs/apply/3",
      companySize: "1001-5000 employees",
      companyIndustry: "Cloud Computing",
      benefits: ["Health/Dental/Vision", "Stock Options", "Home Office Stipend", "Learning Budget"],
      workType: "Remote",
      skills: ["Node.js", "Python", "AWS", "Docker", "Kubernetes", "REST APIs"],
      urgency: "high"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "GrowthHub",
      logo: "GH",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      salaryRange: [110000, 150000],
      isRemote: false,
      isNew: false,
      posted: "1 week ago",
      postedDate: "2024-01-11",
      tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping", "Analytics"],
      description: "Lead product development from conception to launch. Work closely with engineering, design, and marketing teams to deliver exceptional products.",
      experience: "5+ years",
      category: "Product",
      applyLink: "/jobs/apply/4",
      companySize: "51-200 employees",
      companyIndustry: "SaaS",
      benefits: ["Equity", "Health Insurance", "Flexible Schedule", "Annual Bonus"],
      workType: "On-site",
      skills: ["Product Management", "Agile/Scrum", "Data Analysis", "Stakeholder Management"],
      urgency: "medium"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudScale",
      logo: "CS",
      location: "Remote",
      type: "Contract",
      salary: "$80 - $120/hr",
      salaryRange: [80, 120],
      isRemote: true,
      isNew: true,
      posted: "3 days ago",
      postedDate: "2024-01-16",
      tags: ["Kubernetes", "Docker", "CI/CD", "Terraform", "AWS"],
      description: "6-month contract with potential for extension. Help us build and maintain our infrastructure and deployment pipelines.",
      experience: "3+ years",
      category: "Engineering",
      applyLink: "/jobs/apply/5",
      companySize: "501-1000 employees",
      companyIndustry: "DevOps Services",
      benefits: ["Flexible Hours", "Remote Work"],
      workType: "Remote",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Infrastructure as Code"],
      urgency: "low"
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AnalyticsPro",
      logo: "AP",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140,000 - $190,000",
      salaryRange: [140000, 190000],
      isRemote: true,
      isNew: false,
      posted: "2 weeks ago",
      postedDate: "2024-01-05",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "Big Data"],
      description: "Build machine learning models and analyze large datasets to drive business decisions. Work on predictive analytics and recommendation systems.",
      experience: "4+ years",
      category: "Data Science",
      applyLink: "/jobs/apply/6",
      companySize: "201-500 employees",
      companyIndustry: "Analytics",
      benefits: ["Health Insurance", "401(k)", "Conference Budget", "Research Time"],
      workType: "Hybrid",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Data Visualization"],
      urgency: "medium"
    },
    {
      id: 7,
      title: "Marketing Specialist",
      company: "BrandBoost",
      logo: "BB",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      salaryRange: [65000, 85000],
      isRemote: false,
      isNew: true,
      posted: "Today",
      postedDate: "2024-01-19",
      tags: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
      description: "Develop and execute marketing campaigns across multiple channels. Analyze performance metrics and optimize for growth.",
      experience: "2+ years",
      category: "Marketing",
      applyLink: "/jobs/apply/7",
      companySize: "51-200 employees",
      companyIndustry: "Marketing Tech",
      benefits: ["Health Insurance", "Performance Bonus", "Flexible Hours"],
      workType: "On-site",
      skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"],
      urgency: "high"
    },
    {
      id: 8,
      title: "Mobile Developer",
      company: "AppFlow",
      logo: "AF",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      salaryRange: [100000, 140000],
      isRemote: true,
      isNew: true,
      posted: "4 days ago",
      postedDate: "2024-01-15",
      tags: ["React Native", "iOS", "Android", "TypeScript", "Mobile UI"],
      description: "Develop cross-platform mobile applications for iOS and Android using React Native. Work on features that reach millions of users.",
      experience: "3+ years",
      category: "Engineering",
      applyLink: "/jobs/apply/8",
      companySize: "101-500 employees",
      companyIndustry: "Mobile Apps",
      benefits: ["Remote Work", "Learning Budget", "Health Insurance", "Equity"],
      workType: "Remote",
      skills: ["React Native", "JavaScript", "TypeScript", "Mobile Development"],
      urgency: "medium"
    },
    {
      id: 9,
      title: "Sales Executive",
      company: "RevenueTech",
      logo: "RT",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$70,000 + Commission",
      salaryRange: [70000, 150000],
      isRemote: true,
      isNew: false,
      posted: "1 week ago",
      postedDate: "2024-01-12",
      tags: ["B2B Sales", "SaaS", "CRM", "Negotiation", "Client Acquisition"],
      description: "Drive revenue growth by acquiring new enterprise clients. Manage the full sales cycle from prospecting to closing deals.",
      experience: "3+ years",
      category: "Sales",
      applyLink: "/jobs/apply/9",
      companySize: "201-500 employees",
      companyIndustry: "Sales Tech",
      benefits: ["Uncapped Commission", "Health Insurance", "Remote Work"],
      workType: "Hybrid",
      skills: ["Sales", "CRM", "Negotiation", "B2B"],
      urgency: "high"
    },
    {
      id: 10,
      title: "QA Engineer",
      company: "QualityFirst",
      logo: "QF",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$85,000 - $115,000",
      salaryRange: [85000, 115000],
      isRemote: true,
      isNew: false,
      posted: "3 days ago",
      postedDate: "2024-01-16",
      tags: ["Automation Testing", "Selenium", "Cypress", "Jest", "QA"],
      description: "Ensure product quality through automated and manual testing. Develop test plans and collaborate with development teams.",
      experience: "2+ years",
      category: "Engineering",
      applyLink: "/jobs/apply/10",
      companySize: "51-200 employees",
      companyIndustry: "Quality Assurance",
      benefits: ["Health Insurance", "Remote Work", "Professional Development"],
      workType: "Remote",
      skills: ["Test Automation", "Selenium", "Cypress", "Quality Assurance"],
      urgency: "medium"
    }
  ];
  return (
    <main>
      {/* === PAGE HEADER WITH SEARCH BAR === */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          
          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 mt-2">
              Browse thousands of job opportunities
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent text-gray-900"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button className="bg-[#309689] text-white px-6 py-2 rounded-lg hover:bg-[#2a877a] transition-colors font-medium">
                  Search
                </button>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Remote Developer', 'UX Designer', 'Project Manager', 'Data Scientist', 'Marketing'].map((tag, index) => (
                <button
                  key={index}
                  className="text-sm text-gray-700 hover:text-[#309689] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results Count */}
          <div className="text-center">
            <div className="text-sm text-gray-500 inline-block bg-gray-100 px-4 py-2 rounded-lg">
              Showing <span className="font-semibold text-gray-900">1,245</span> results
            </div>
          </div>
          
        </div>
      </div>
      {/* === END PAGE HEADER === */}

      {/* Main Content Area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Filters Sidebar */}
            <div className="lg:w-1/4">
              <div id="filters-sidebar">
                  <JobFilters />
              </div>
            </div>

            {/* Right Column - Job Listings */}
            <div className="lg:w-3/4">
                     {/* Sort and View Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="text-gray-600">
                  <span className="font-medium">{jobListings.length} jobs</span> matched your criteria
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-transparent">
                      <option>Most Relevant</option>
                      <option>Newest</option>
                      <option>Salary (High to Low)</option>
                      <option>Salary (Low to High)</option>
                    </select>
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-gray-200" title="List view">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg bg-gray-200" title="Grid view">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Listings Grid */}
              <div id="job-listings" className="space-y-4">
                {jobListings.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {[1, 2, 3, '...', 10].map((page, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === 1 
                          ? 'bg-[#309689] text-white hover:bg-[#2a877a]' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>

              <div className="mt-8 text-center">
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors hover:border-gray-400">
                  Load More Jobs
                </button>
              </div>
              
              

              
            </div>




          </div>
        </div>
      </div>

    </main>
  )
}