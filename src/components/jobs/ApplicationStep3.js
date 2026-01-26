'use client';

import { useState } from 'react';

const ApplicationStep3 = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState(data);
  const [diversitySurvey, setDiversitySurvey] = useState({
    gender: '',
    ethnicity: '',
    veteran: '',
    disability: ''
  });

  const workAuthorizationOptions = [
    'Citizen',
    'Permanent Resident',
    'Work Visa',
    'Student Visa',
    'Require Sponsorship',
    'Other'
  ];

  const noticePeriodOptions = [
    'Immediately',
    '1 week',
    '2 weeks',
    '1 month',
    '2 months',
    '3 months',
    'More than 3 months'
  ];

  const referralSourceOptions = [
    'Company Website',
    'Job Board',
    'LinkedIn',
    'Employee Referral',
    'Career Fair',
    'Recruiter',
    'Social Media',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiversityChange = (field, value) => {
    const updated = { ...diversitySurvey, [field]: value };
    setDiversitySurvey(updated);
    setFormData(prev => ({ ...prev, diversitySurvey: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...formData, diversitySurvey });
    onNext();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Step 3: Additional Questions</h2>
        <p className="text-gray-600 mt-2">Help us learn more about your application</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Required Questions */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Required Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Authorization *
              </label>
              <select
                name="workAuthorization"
                value={formData.workAuthorization}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select an option</option>
                {workAuthorizationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notice Period *
              </label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select an option</option>
                {noticePeriodOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Salary (Annual) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 120,000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about us? *
              </label>
              <select
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select an option</option>
                {referralSourceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Diversity Survey (Optional) */}
        <div className="space-y-6 border-t pt-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Diversity Survey (Optional)</h3>
            <p className="text-sm text-gray-600 mt-1">
              This information is collected for diversity and inclusion purposes only. 
              Your responses are voluntary and will not affect your application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender Identity
              </label>
              <select
                value={diversitySurvey.gender}
                onChange={(e) => handleDiversityChange('gender', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ethnicity
              </label>
              <select
                value={diversitySurvey.ethnicity}
                onChange={(e) => handleDiversityChange('ethnicity', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Prefer not to say</option>
                <option value="asian">Asian</option>
                <option value="black">Black or African American</option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="white">White</option>
                <option value="native">Native American</option>
                <option value="pacific">Pacific Islander</option>
                <option value="multiracial">Multiracial</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Veteran Status
              </label>
              <select
                value={diversitySurvey.veteran}
                onChange={(e) => handleDiversityChange('veteran', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Prefer not to say</option>
                <option value="yes">Yes, I am a veteran</option>
                <option value="no">No, I am not a veteran</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disability Status
              </label>
              <select
                value={diversitySurvey.disability}
                onChange={(e) => handleDiversityChange('disability', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Prefer not to say</option>
                <option value="yes">Yes, I have a disability</option>
                <option value="no">No, I do not have a disability</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                onUpdate({ ...formData, diversitySurvey });
                onPrev();
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              ← Back to Documents
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Review Application →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationStep3;