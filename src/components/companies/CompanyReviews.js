'use client';

import { useState } from 'react';

const CompanyReviews = ({ reviews, rating, totalReviews }) => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const ratingBreakdown = [
    { stars: 5, count: 85, percent: 68 },
    { stars: 4, count: 25, percent: 20 },
    { stars: 3, count: 10, percent: 8 },
    { stars: 2, count: 3, percent: 2 },
    { stars: 1, count: 1, percent: 1 }
  ];

  const ratingCategories = [
    { category: 'Work/Life Balance', rating: 4.5 },
    { category: 'Culture & Values', rating: 4.7 },
    { category: 'Career Opportunities', rating: 4.3 },
    { category: 'Compensation & Benefits', rating: 4.6 },
    { category: 'Management', rating: 4.2 },
    { category: 'Diversity & Inclusion', rating: 4.4 }
  ];

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Rating */}
          <div className="md:w-1/3 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">{rating}</div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-8 h-8 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-gray-600">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="md:w-2/3">
            <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">
                    {item.stars} star{item.stars !== 1 ? 's' : ''}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm text-gray-600">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Categories */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Rating by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ratingCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{category.category}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{category.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(category.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Employee Reviews ({totalReviews})
        </h2>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-[#2a877a]/20 flex items-center justify-center">
                    <span className="font-bold text-primary">
                      {review.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <p className="text-gray-600 text-sm">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>{review.date}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">
                  {review.helpful} people found this helpful
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Helpful ✓
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">{review.title}</h3>
            
            <div className={`text-gray-700 mb-4 ${expandedReview === review.id ? '' : 'line-clamp-3'}`}>
              {review.content}
            </div>
            
            {review.content.length > 200 && (
              <button
                onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                className="text-primary hover:text-primary/80 text-sm font-medium mb-4"
              >
                {expandedReview === review.id ? 'Show less' : 'Read more'}
              </button>
            )}

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pros
                </div>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-green-700 text-sm">• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cons
                </div>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-red-700 text-sm">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
                <button 
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="text-3xl hover:text-yellow-400"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Summarize your experience"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Share your experience working at this company..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pros
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="What did you like about working here?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cons
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="What could be improved?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load More Reviews */}
      {reviews.length > 0 && (
        <div className="text-center">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyReviews;