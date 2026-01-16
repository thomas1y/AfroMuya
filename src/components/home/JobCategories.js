const JobCategories = () => {
  const categories = [
    {
      icon: '💻',
      name: 'Technology',
      jobs: '2,500+',
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: '📈',
      name: 'Sales & Marketing',
      jobs: '1,800+',
      color: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: '🎨',
      name: 'Design & Creative',
      jobs: '1,200+',
      color: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: '💰',
      name: 'Finance',
      jobs: '1,500+',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      icon: '🏥',
      name: 'Healthcare',
      jobs: '1,100+',
      color: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      icon: '📚',
      name: 'Education',
      jobs: '900+',
      color: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      icon: '🏭',
      name: 'Manufacturing',
      jobs: '800+',
      color: 'bg-gray-100',
      textColor: 'text-gray-600'
    },
    {
      icon: '🚚',
      name: 'Logistics',
      jobs: '750+',
      color: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find jobs in your field of expertise
          </p>
        </div>

        {/* Categories Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-transparent group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${category.color} ${category.textColor} p-3 rounded-lg text-2xl`}>
                  {category.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#309689]">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {category.jobs} jobs available
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button className="text-[#309689] font-medium hover:text-[#2a877a] flex items-center justify-center mx-auto gap-2">
            Browse all categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default JobCategories