const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Create Your Profile",
      description: "Sign up in minutes and build your professional profile with skills, experience, and portfolio."
    },
    {
      number: "02",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Apply for Jobs",
      description: "Browse thousands of curated job listings and apply with one click using your profile."
    },
    {
      number: "03",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Get Hired",
      description: "Connect directly with employers, schedule interviews, and land your dream job."
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get your dream job in 3 simple steps
          </p>
        </div>

        {/* Steps Grid - 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 py-3">
                <span className="text-5xl font-bold text-gray-100">
                  {step.number}
                </span>
              </div>
              
              {/* Step Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 pt-12 text-center hover:shadow-xl transition-all duration-300 hover:border-[#309689]/20 group">
                
                {/* Icon Container */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#309689]/10 flex items-center justify-center text-[#309689] group-hover:bg-[#309689] group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600">
                  {step.description}
                </p>
                
                {/* Connecting Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
          <button className="px-8 py-3 bg-[#309689] text-white font-medium rounded-lg hover:bg-[#2a877a] transition-colors">
            Get Started For Free
          </button>
          <button className="px-8 py-3 border-2 border-[#309689] text-[#309689] font-medium rounded-lg hover:bg-[#309689] hover:text-white transition-colors">
            Learn More
          </button>
        </div>

      </div>
    </div>
  )
}

export default HowItWorks