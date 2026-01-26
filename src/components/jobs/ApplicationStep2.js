'use client';

import { useState, useRef } from 'react';
import { FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa';

const ApplicationStep2 = ({ data, onUpdate, onNext, onPrev, userResume }) => {
  const [formData, setFormData] = useState(data);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);

  const handleResumeTypeChange = (type) => {
    setFormData(prev => ({ ...prev, resumeType: type, resume: null }));
  };

  const handleCoverLetterTypeChange = (type) => {
    setFormData(prev => ({ 
      ...prev, 
      coverLetterType: type,
      coverLetter: type === 'template' ? 'Dear Hiring Manager,\n\nI am excited to apply for the position...' : ''
    }));
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fileType === 'resume') {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Mock upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setFormData(prev => ({ 
            ...prev, 
            resume: file,
            resumeType: 'upload'
          }));
          setUploadProgress(0);
        }
      }, 100);
    } else if (fileType === 'coverLetter') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          customCoverLetter: file,
          coverLetter: e.target.result,
          coverLetterType: 'upload'
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = (fileType) => {
    if (fileType === 'resume') {
      setFormData(prev => ({ ...prev, resume: null }));
    } else {
      setFormData(prev => ({ ...prev, customCoverLetter: null }));
    }
  };

  const handleCoverLetterChange = (e) => {
    setFormData(prev => ({ ...prev, coverLetter: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Step 2: Documents</h2>
        <p className="text-gray-600 mt-2">Upload your resume and cover letter</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Resume Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">📄 Resume</h3>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleResumeTypeChange('existing')}
                className={`px-4 py-2 rounded-lg border ${formData.resumeType === 'existing' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                Use existing resume
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`px-4 py-2 rounded-lg border ${formData.resumeType === 'upload' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                <FaUpload className="inline mr-2" />
                Upload new resume
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'resume')}
              />
            </div>

            {formData.resumeType === 'existing' && userResume && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaFilePdf className="text-red-500 text-xl mr-3" />
                    <div>
                      <p className="font-medium">Current Resume</p>
                      <p className="text-sm text-gray-600">Uploaded on {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => window.open(userResume, '_blank')}
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}

            {formData.resume && formData.resumeType === 'upload' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaFilePdf className="text-red-500 text-xl mr-3" />
                    <div>
                      <p className="font-medium">{formData.resume.name}</p>
                      <p className="text-sm text-gray-600">
                        {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile('resume')}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            )}

            {(!formData.resume && formData.resumeType !== 'existing') && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <FaFilePdf className="text-gray-400 text-3xl mx-auto mb-2" />
                <p className="text-gray-600">No resume selected</p>
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">📝 Cover Letter</h3>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleCoverLetterTypeChange('template')}
                className={`px-4 py-2 rounded-lg border ${formData.coverLetterType === 'template' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                Use template
              </button>
              <button
                type="button"
                onClick={() => coverLetterInputRef.current?.click()}
                className={`px-4 py-2 rounded-lg border ${formData.coverLetterType === 'upload' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                <FaUpload className="inline mr-2" />
                Upload custom
              </button>
              <input
                type="file"
                ref={coverLetterInputRef}
                className="hidden"
                accept=".txt,.doc,.docx,.pdf"
                onChange={(e) => handleFileUpload(e, 'coverLetter')}
              />
              <button
                type="button"
                onClick={() => handleCoverLetterTypeChange('write')}
                className={`px-4 py-2 rounded-lg border ${formData.coverLetterType === 'write' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                Write now
              </button>
              <button
                type="button"
                onClick={() => handleCoverLetterTypeChange('none')}
                className={`px-4 py-2 rounded-lg border ${formData.coverLetterType === 'none' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 hover:border-primary'}`}
              >
                Skip cover letter
              </button>
            </div>

            {formData.coverLetterType !== 'none' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter Content
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={handleCoverLetterChange}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Write your cover letter here..."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    {formData.coverLetter.length} characters
                  </p>
                  {formData.customCoverLetter && (
                    <div className="flex items-center text-sm">
                      <FaFilePdf className="text-red-500 mr-2" />
                      <span>{formData.customCoverLetter.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('coverLetter')}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                onUpdate(formData);
                onPrev();
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              ← Back to Personal Info
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Continue to Questions →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationStep2;