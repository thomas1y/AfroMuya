'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CompanyHeader from '@/components/companies/CompanyHeader';
import CompanyTabs from '@/components/companies/CompanyTabs';
import CompanyJobs from '@/components/companies/CompanyJobs';
import CompanyReviews from '@/components/companies/CompanyReviews';

// Mock company data
const mockCompany = {
  id: 1,
  name: "TechVision Inc.",
  logo: "TV",
  tagline: "Building the future of SaaS",
  description: "TechVision is a leading SaaS company that provides innovative solutions for businesses worldwide. We're dedicated to transforming how companies operate through cutting-edge technology.",
  longDescription: `
    <p>Founded in 2015, TechVision has grown from a small startup to a market leader in enterprise SaaS solutions. Our platform serves over 10,000 businesses across 50 countries, helping them streamline operations, enhance productivity, and drive growth.</p>
    
    <p><strong>Our Mission:</strong> To empower businesses with intelligent software solutions that simplify complexity and unlock potential.</p>
    
    <p><strong>Our Culture:</strong> We believe in innovation, collaboration, and continuous learning. Our team of 800+ professionals works in a dynamic environment that encourages creativity and personal growth.</p>
    
    <p><strong>What We Offer:</strong> From startups to Fortune 500 companies, our solutions adapt to any business size. Our product suite includes CRM, project management, analytics, and AI-powered insights.</p>
  `,
  industry: "Software Development",
  size: "501-1000 employees",
  location: "San Francisco, CA",
  founded: 2015,
  website: "https://techvision.com",
  contactEmail: "careers@techvision.com",
  phone: "+1 (555) 123-4567",
  
  // Stats
  rating: 4.5,
  reviews: 124,
  openPositions: 24,
  followers: 5800,
  isFollowing: false,
  isRemoteFriendly: true,
  isHiring: true,
  
  // Social Links
  linkedin: "https://linkedin.com/company/techvision",
  twitter: "https://twitter.com/techvision",
  github: "https://github.com/techvision",
  
  // Perks & Benefits
  perks: [
    "Unlimited PTO",
    "$3,000 Annual Learning Stipend",
    "Stock Options",
    "Remote Work Flexibility",
    "Health, Dental & Vision Insurance",
    "401(k) with 5% Company Match",
    "Home Office Equipment Allowance",
    "Quarterly Bonus Potential",
    "Wellness Program",
    "Parental Leave",
    "Conference & Training Budget",
    "Team Building Events"
  ],
  
  // Tech Stack
  techStack: [
    "React", "TypeScript", "Next.js", "Node.js", 
    "Python", "AWS", "Docker", "Kubernetes",
    "GraphQL", "MongoDB", "PostgreSQL", "Redis",
    "Jest", "Cypress", "CI/CD", "Microservices"
  ],
  
  // Values
  values: [
    "Innovation First",
    "Customer Obsession",
    "Transparency",
    "Continuous Learning",
    "Work-Life Balance",
    "Diversity & Inclusion"
  ],
  
  // Leadership
  leadership: [
    { name: "Sarah Johnson", role: "CEO & Founder", bio: "Former Google engineering lead with 15+ years experience" },
    { name: "Michael Chen", role: "CTO", bio: "Ex-Microsoft architect specializing in cloud infrastructure" },
    { name: "Emma Rodriguez", role: "VP of Engineering", bio: "Scaled engineering teams at multiple startups" },
    { name: "David Kim", role: "Head of Product", bio: "Product leader with background in UX design and strategy" }
  ],
  
  // Company Photos
  photos: [
    { id: 1, url: "/company-1.jpg", alt: "Office workspace" },
    { id: 2, url: "/company-2.jpg", alt: "Team meeting" },
    { id: 3, url: "/company-3.jpg", alt: "Company event" },
    { id: 4, url: "/company-4.jpg", alt: "Engineering team" }
  ],
  
  // Active Jobs
  jobs: [
    {
      id: 101,
      title: "Senior Frontend Developer - React/TypeScript",
      type: "Full-time",
      location: "Remote",
      salary: "$120,000 - $160,000",
      posted: "2 days ago",
      department: "Engineering",
      experience: "5+ years"
    },
    {
      id: 102,
      title: "Backend Engineer - Node.js/Python",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$130,000 - $170,000",
      posted: "3 days ago",
      department: "Engineering",
      experience: "4+ years"
    },
    {
      id: 103,
      title: "DevOps Engineer - AWS/Kubernetes",
      type: "Full-time",
      location: "Remote",
      salary: "$125,000 - $155,000",
      posted: "1 week ago",
      department: "Engineering",
      experience: "3+ years"
    },
    {
      id: 104,
      title: "Product Manager",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$140,000 - $180,000",
      posted: "4 days ago",
      department: "Product",
      experience: "6+ years"
    },
    {
      id: 105,
      title: "UX/UI Designer",
      type: "Full-time",
      location: "Remote",
      salary: "$100,000 - $140,000",
      posted: "5 days ago",
      department: "Design",
      experience: "4+ years"
    },
    {
      id: 106,
      title: "Data Scientist",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$135,000 - $165,000",
      posted: "1 week ago",
      department: "Data",
      experience: "3+ years"
    }
  ],
  
  // Reviews
  reviews: [
    {
      id: 1,
      author: "Alex Morgan",
      role: "Senior Software Engineer",
      rating: 5,
      date: "2024-01-15",
      title: "Best career decision I've made",
      content: "TechVision provides an incredible environment for growth. The engineering culture is top-notch, and management genuinely cares about employee development.",
      pros: ["Great culture", "Smart colleagues", "Cutting-edge tech"],
      cons: ["Fast-paced environment"],
      helpful: 42
    },
    {
      id: 2,
      author: "Jamie Smith",
      role: "Product Manager",
      rating: 4,
      date: "2024-01-10",
      title: "Challenging and rewarding",
      content: "The work is challenging but extremely rewarding. You get to work on products that actually impact thousands of businesses.",
      pros: ["Impactful work", "Good benefits", "Remote flexibility"],
      cons: ["Sometimes long hours"],
      helpful: 28
    },
    {
      id: 3,
      author: "Taylor Brown",
      role: "DevOps Engineer",
      rating: 5,
      date: "2024-01-05",
      title: "Excellent engineering culture",
      content: "The technical leadership is outstanding. We use modern tools and have a strong focus on best practices and continuous improvement.",
      pros: ["Modern tech stack", "Strong leadership", "Learning opportunities"],
      cons: ["On-call rotation"],
      helpful: 35
    }
  ],
  
  // Similar Companies
  similarCompanies: [
    {
      id: 2,
      name: "DigitalFlow",
      logo: "DF",
      industry: "Mobile Apps",
      rating: 4.2,
      openPositions: 18,
      isFollowing: true
    },
    {
      id: 3,
      name: "CloudScale",
      logo: "CS",
      industry: "Cloud Computing",
      rating: 4.3,
      openPositions: 32,
      isFollowing: false
    },
    {
      id: 4,
      name: "DataSphere",
      logo: "DS",
      industry: "Artificial Intelligence",
      rating: 4.7,
      openPositions: 12,
      isFollowing: false
    }
  ]
};

export default function CompanyDetailsPage() {
  const params = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const companyId = params.id;
    
    // Simulate API call
    setTimeout(() => {
      const foundCompany = { ...mockCompany, id: companyId };
      setCompany(foundCompany);
      setIsFollowing(foundCompany.isFollowing);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In a real app, this would call an API
    setCompany(prev => ({
      ...prev,
      isFollowing: !isFollowing,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Not Found</h1>
            <p className="text-gray-600 mb-6">This company profile may have been removed or doesn't exist.</p>
            <Link 
              href="/companies"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Browse All Companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Company Header */}
      <CompanyHeader 
        company={company} 
        isFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:w-2/3">
            {/* Tabs Navigation */}
            <CompanyTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              company={company}
            />

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'overview' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Overview</h2>
                  
                  <div className="prose max-w-none text-gray-700 mb-8">
                    <div dangerouslySetInnerHTML={{ __html: company.longDescription }} />
                  </div>

                  {/* Company Values */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {company.values.map((value, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-900">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leadership Team */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Leadership Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {company.leadership.map((leader, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-[#2a877a]/20 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">
                              {leader.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{leader.name}</h4>
                            <p className="text-primary font-medium mb-1">{leader.role}</p>
                            <p className="text-sm text-gray-600">{leader.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {company.techStack.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <CompanyJobs jobs={company.jobs} />
              )}

              {activeTab === 'reviews' && (
                <CompanyReviews 
                  reviews={company.reviews}
                  rating={company.rating}
                  totalReviews={company.reviews.length}
                />
              )}

              {activeTab === 'photos' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Photos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {company.photos.map((photo) => (
                      <div key={photo.id} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        {/* In real app, this would be an img tag */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-[#2a877a]/10">
                          <svg className="w-12 h-12 text-primary/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4 text-center">
                    {company.photos.length} photos available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="lg:w-1/3 space-y-6">
            {/* Company Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Company Details</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Industry</div>
                  <div className="font-medium text-gray-900">{company.industry}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Company Size</div>
                  <div className="font-medium text-gray-900">{company.size}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Headquarters</div>
                  <div className="font-medium text-gray-900">{company.location}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Founded</div>
                  <div className="font-medium text-gray-900">{company.founded}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Website</div>
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    {company.website.replace('https://', '')}
                  </a>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Contact</div>
                  <div className="font-medium text-gray-900">{company.contactEmail}</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">Follow on Social</div>
                <div className="flex gap-3">
                  {company.linkedin && (
                    <a 
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {company.twitter && (
                    <a 
                      href={company.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {company.github && (
                    <a 
                      href={company.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Perks & Benefits Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Perks & Benefits</h3>
              <div className="space-y-3">
                {company.perks.map((perk, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Companies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Similar Companies</h3>
              <div className="space-y-4">
                {company.similarCompanies.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/companies/${similar.id}`}
                    className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-[#2a877a]/20 flex items-center justify-center">
                      <span className="font-bold text-primary">{similar.logo}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{similar.name}</div>
                      <div className="text-sm text-gray-600">{similar.industry}</div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {similar.rating}
                        </div>
                        <div className="text-sm text-gray-600">
                          {similar.openPositions} open jobs
                        </div>
                      </div>
                    </div>
                    <button className={`p-2 rounded-lg ${similar.isFollowing ? 'text-primary' : 'text-gray-400'}`}>
                      <svg className="w-5 h-5" fill={similar.isFollowing ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </Link>
                ))}
              </div>
              
              <Link
                href="/companies"
                className="mt-4 block text-center text-primary hover:text-primary/80 font-medium"
              >
                View all similar companies →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}