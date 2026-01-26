'use client';

import { useState } from 'react';
import { FaCheckCircle, FaEdit, FaFilePdf, FaEye, FaDownload } from 'react-icons/fa';

const ApplicationReview = ({ 
  applicationData, 
  job, 
  onPrev, 
  onSubmit, 
  isSubmitting,
  onConsentChange,
  onTermsChange 
}) => {
  const [editingSection, setEditingSection] = useState(null);

  const handleEdit = (section) => {
    setEditingSection(section);
    onPrev(); // Go back to the appropriate step
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Step 4: Review & Submit</h2>
        <p className="text-gray-600 mt-2">Please review your application before submitting</p>
      </div>

      {/* Application Summary */}
      <div className="space-y-6">
        {/* Personal Info Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Personal Information
              </h3>
              <p className="text-sm text-gray-600">Step 1 - Contact details</p>
            </div>
            <button
              onClick={() => handleEdit('personalInfo')}
              className="text-primary hover:text-primary/80 flex items-center"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium">{applicationData.personalInfo.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{applicationData.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{applicationData.personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">{applicationData.personalInfo.location}</p>
            </div>
            {applicationData.personalInfo.linkedin && (
              <div>
                <p className="text-sm text-gray-600">LinkedIn</p>
                <p className="font-medium text-primary truncate">
                  {applicationData.personalInfo.linkedin}
                </p>
              </div>
            )}
            {applicationData.personalInfo.portfolio && (
              <div>
                <p className="text-sm text-gray-600">Portfolio</p>
                <p className="font-medium text-primary truncate">
                  {applicationData.personalInfo.portfolio}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Documents
              </h3>
              <p className="text-sm text-gray-600">Step 2 - Resume & Cover Letter</p>
            </div>
            <button
              onClick={() => handleEdit('documents')}
              className="text-primary hover:text-primary/80 flex items-center"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Resume</p>
              {applicationData.documents.resume ? (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <div className="flex items-center">
                    <FaFilePdf className="text-red-500 text-xl mr-3" />
                    <div>
                      <p className="font-medium">
                        {applicationData.documents.resume.name || 'Current Resume'}
                      </p>
                      {applicationData.documents.resume.size && (
                        <p className="text-sm text-gray-600">
                          {formatFileSize(applicationData.documents.resume.size)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-600 hover:text-primary"
                      title="Preview"
                    >
                      <FaEye />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-600 hover:text-primary"
                      title="Download"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Using existing resume from profile</p>
              )}
            </div>

            {applicationData.documents.coverLetterType !== 'none' && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Cover Letter</p>
                <div className="bg-white p-4 rounded-lg border max-h-40 overflow-y-auto">
                  <p className="whitespace-pre-line text-sm">
                    {applicationData.documents.coverLetter || 'No cover letter provided'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Additional Questions
              </h3>
              <p className="text-sm text-gray-600">Step 3 - Application details</p>
            </div>
            <button
              onClick={() => handleEdit('questions')}
              className="text-primary hover:text-primary/80 flex items-center"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Work Authorization</p>
              <p className="font-medium">{applicationData.questions.workAuthorization || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Notice Period</p>
              <p className="font-medium">{applicationData.questions.noticePeriod || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Salary</p>
              <p className="font-medium">
                {applicationData.questions.expectedSalary ? `$${applicationData.questions.expectedSalary}` : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Referral Source</p>
              <p className="font-medium">{applicationData.questions.referralSource || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Consent Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent & Agreements</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacy-consent"
                  type="checkbox"
                  checked={applicationData.privacyConsent}
                  onChange={(e) => onConsentChange(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
              </div>
              <div className="ml-3">
                <label htmlFor="privacy-consent" className="font-medium text-gray-900">
                  Privacy Consent *
                </label>
                <p className="text-sm text-gray-600">
                  I consent to the processing of my personal data for recruitment purposes in accordance with the Privacy Policy.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms-agreement"
                  type="checkbox"
                  checked={applicationData.termsAgreed}
                  onChange={(e) => onTermsChange(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms-agreement" className="font-medium text-gray-900">
                  Terms Agreement *
                </label>
                <p className="text-sm text-gray-600">
                  I agree to the Terms of Service and confirm that all information provided is accurate and complete.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Summary */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Application Summary</h3>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-gray-900">{job?.title}</h4>
              <p className="text-gray-600">{job?.company}</p>
              <p className="text-sm text-gray-500 mt-1">
                Applied on {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Application ID</p>
              <p className="font-mono font-bold text-primary">APP-{Date.now().toString().slice(-8)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onPrev}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              ← Back to Questions
            </button>
            
            <div className="space-x-4">
              <button
                type="button"
                onClick={onPrev}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting || !applicationData.privacyConsent || !applicationData.termsAgreed}
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              By submitting, you agree that your application will be sent to {job?.company} and stored in your application history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;