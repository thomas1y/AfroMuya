"use client" // We'll use state for carousel

import { useState } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "This platform completely changed my career trajectory. I found my dream remote job in just 2 weeks! The application process was seamless.",
      name: "Alex Johnson",
      role: "Senior Frontend Developer",
      company: "TechCorp",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      id: 2,
      quote: "As a recent graduate, I was struggling to find entry-level positions. JobPortal connected me with companies actually looking for fresh talent.",
      name: "Sarah Chen",
      role: "UX Designer",
      company: "DesignStudio",
      avatar: "👩‍🎨",
      rating: 5
    },
    {
      id: 3,
      quote: "The salary transparency and company reviews helped me negotiate a 30% higher offer. Best career decision I've made!",
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "StartupXYZ",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      id: 4,
      quote: "I was able to transition from finance to tech thanks to the specialized job recommendations and skill matching features.",
      name: "Priya Sharma",
      role: "Data Analyst",
      company: "DataTech",
      avatar: "👩‍💻",
      rating: 5
    }
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg">
            What our candidates say about us
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white border border-gray-300 rounded-full items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white border border-gray-300 rounded-full items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
            {/* Quote Icon */}
            <div className="text-4xl text-[#309689] mb-6">
              "
            </div>
            
            {/* Quote Text */}
            <p className="text-gray-700 text-lg md:text-xl italic mb-8">
              {testimonials[currentTestimonial].quote}
            </p>
            
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className="w-5 h-5 text-yellow-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">{testimonials[currentTestimonial].avatar}</div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === index ? 'bg-[#309689] w-8' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button 
            onClick={prevTestimonial}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Previous
          </button>
          <button 
            onClick={nextTestimonial}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default Testimonials