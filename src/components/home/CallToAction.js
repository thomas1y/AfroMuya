const CallToAction = () => {
  return (
    <div className="py-16"> {/* Remove background from outer div */}
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="bg-gradient-to-br from-[#309689] to-[#2a877a] rounded-2xl p-8 md:p-12 text-center text-white">
          
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who found their perfect career match with JobPortal
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-white/80 text-sm">Live Jobs</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-white/80 text-sm">Hired</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">18K+</div>
              <div className="text-white/80 text-sm">Companies</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="/jobs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#309689] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Jobs Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="/employer/post-job"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Post a Job
            </a>
          </div>
          
          {/* Secondary Link */}
          <div className="pt-6 border-t border-white/20 max-w-md mx-auto">
            <p className="text-white/90 mb-3">
              Already have an account?
            </p>
            <a 
              href="/auth/login"
              className="inline-flex items-center text-white font-medium hover:text-white/90"
            >
              Sign in to your account
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default CallToAction