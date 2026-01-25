
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { selectUserProfile, updateUserProfile } from '@/lib/redux/slices/userSlice';
import { showSuccessToast, showErrorToast, showInfoToast } from '@/lib/redux/slices/uiSlice';

const ResumePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(selectUserProfile);
  
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  
  // Resume data
  const [currentResume, setCurrentResume] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Resume builder form
  const [resumeForm, setResumeForm] = useState({
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Load resume data from localStorage
  useEffect(() => {
    const loadResumeData = () => {
      try {
        const savedResume = localStorage.getItem('userResume');
        const savedHistory = localStorage.getItem('resumeHistory');
        
        if (savedResume) {
          setCurrentResume(JSON.parse(savedResume));
        }
        
        if (savedHistory) {
          setResumeHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    };
    
    loadResumeData();
  }, []);

  // Save resume data to localStorage
  const saveResumeData = (resume, history) => {
    try {
      if (resume) {
        localStorage.setItem('userResume', JSON.stringify(resume));
      }
      if (history) {
        localStorage.setItem('resumeHistory', JSON.stringify(history));
      }
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Validate and set file
  const validateAndSetFile = (file) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      dispatch(showErrorToast('Please upload PDF, DOC, or DOCX files only'));
      return;
    }
    
    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      dispatch(showErrorToast('File size must be less than 5MB'));
      return;
    }
    
    setSelectedFile(file);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) {
      dispatch(showErrorToast('Please select a file to upload'));
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new resume object
      const newResume = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
        fileType: selectedFile.type,
        uploadDate: new Date().toISOString(),
        isPrimary: true,
        url: URL.createObjectURL(selectedFile), // In real app, this would be server URL
      };
      
      // Update current resume
      setCurrentResume(newResume);
      
      // Add to history
      const updatedHistory = [newResume, ...resumeHistory.slice(0, 4)];
      setResumeHistory(updatedHistory);
      
      // Save to localStorage
      saveResumeData(newResume, updatedHistory);
      
      // Update user profile
      dispatch(updateUserProfile({
        ...userProfile,
        resumeUrl: newResume.url,
      }));
      
      // Clear selected file
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Complete upload
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      dispatch(showSuccessToast('Resume uploaded successfully!'));
      
      // Reset progress after delay
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
      
    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      dispatch(showErrorToast('Failed to upload resume. Please try again.'));
    }
  };

  // Handle delete resume
  const handleDeleteResume = (resumeId) => {
    if (currentResume && currentResume.id === resumeId) {
      setCurrentResume(null);
      localStorage.removeItem('userResume');
      dispatch(showInfoToast('Resume removed'));
      
      // Update user profile
      dispatch(updateUserProfile({
        ...userProfile,
        resumeUrl: null,
      }));
    }
  };

  // Handle set as primary
  const handleSetAsPrimary = (resume) => {
    setCurrentResume(resume);
    saveResumeData(resume, resumeHistory);
    dispatch(showSuccessToast('Resume set as primary'));
    
    // Update user profile
    dispatch(updateUserProfile({
      ...userProfile,
      resumeUrl: resume.url,
    }));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const tabs = [
    { id: 'upload', name: 'Upload Resume', icon: '📤' },
    { id: 'builder', name: 'Resume Builder', icon: '🛠️' },
    { id: 'history', name: 'History', icon: '📜' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Resume Management</h1>
        <p className="text-gray-600 mt-2">
          Upload, manage, and build your professional resume
        </p>
      </div>

      {/* Current Resume Card */}
      {currentResume && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Current Resume</h2>
              <p className="text-gray-600 text-sm">This resume will be used for new applications</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✅ Primary Resume
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">
                  {currentResume.fileType === 'application/pdf' ? '📄' : '📝'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentResume.fileName}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{currentResume.fileSize}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(currentResume.uploadDate)}</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <a
                href={currentResume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Preview
              </a>
              <a
                href={currentResume.url}
                download={currentResume.fileName}
                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Download
              </a>
              <button
                onClick={() => handleDeleteResume(currentResume.id)}
                className="px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          
          {/* Resume Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="text-sm text-blue-700 mb-1">Applications Using This Resume</div>
              <div className="text-2xl font-bold text-blue-900">12</div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-sm text-green-700 mb-1">Last Updated</div>
              <div className="text-lg font-semibold text-green-900">
                {formatDate(currentResume.uploadDate)}
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <div className="text-sm text-purple-700 mb-1">Compatibility Score</div>
              <div className="text-2xl font-bold text-purple-900">85%</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Upload Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Resume</h3>
              <p className="text-gray-600 mb-6">
                Upload your resume in PDF, DOC, or DOCX format (max 5MB). Your resume will be automatically parsed for skills and experience.
              </p>
              
              {/* Drag & Drop Zone */}
              <div
                className={`border-2 ${
                  dragOver ? 'border-teal-500 bg-teal-50' : 'border-dashed border-gray-300'
                } rounded-xl p-8 text-center transition-colors cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {selectedFile ? '📄' : '📤'}
                  </span>
                </div>
                
                {selectedFile ? (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{selectedFile.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {formatFileSize(selectedFile.size)} • Ready to upload
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Drag & drop your resume here
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      or click to browse files
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports: PDF, DOC, DOCX • Max size: 5MB
                    </p>
                  </div>
                )}
              </div>
              
              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Upload Button */}
              <div className="mt-6">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload Resume'}
                </button>
              </div>
            </div>
            
            {/* Resume Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Resume Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Keep your resume updated with your latest experience</li>
                <li>• Use keywords from job descriptions to improve match rates</li>
                <li>• Include measurable achievements and results</li>
                <li>• Keep the length to 1-2 pages for optimal readability</li>
                <li>• Save your resume as a PDF to preserve formatting</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="space-y-8">
            {/* Resume Builder Header */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Your Resume</h3>
              <p className="text-gray-600 mb-6">
                Create a professional resume using our templates. Fill in your information and download in multiple formats.
              </p>
            </div>
            
            {/* Template Selection */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Choose a Template</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'modern', name: 'Modern', color: 'from-blue-500 to-purple-500', selected: true },
                  { id: 'classic', name: 'Classic', color: 'from-gray-600 to-gray-800' },
                  { id: 'creative', name: 'Creative', color: 'from-teal-500 to-green-500' },
                ].map((template) => (
                  <div
                    key={template.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      template.selected
                        ? 'border-teal-500 ring-2 ring-teal-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-32 rounded-lg bg-gradient-to-r ${template.color} mb-3`}></div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{template.name}</span>
                      {template.selected && (
                        <span className="text-teal-600 font-medium">Selected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resume Sections */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Professional Summary</h4>
                <textarea
                  value={resumeForm.summary}
                  onChange={(e) => setResumeForm(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Write a brief summary highlighting your experience, skills, and career goals..."
                />
                <p className="text-xs text-gray-500 mt-2">Recommended: 3-5 sentences</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeForm.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => setResumeForm(prev => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-teal-600 hover:text-teal-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        setResumeForm(prev => ({
                          ...prev,
                          skills: [...prev.skills, e.target.value.trim()]
                        }));
                        e.target.value = '';
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a skill"]');
                      if (input.value.trim()) {
                        setResumeForm(prev => ({
                          ...prev,
                          skills: [...prev.skills, input.value.trim()]
                        }));
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-teal-600 text-white font-medium rounded-r-lg hover:bg-teal-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Preview Actions */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Preview Resume
                  </button>
                  <button className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                    Download as PDF
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume History</h3>
            
            {resumeHistory.length > 0 ? (
              <div className="space-y-4">
                {resumeHistory.map((resume, index) => (
                  <div
                    key={resume.id}
                    className={`border rounded-lg p-4 ${
                      currentResume?.id === resume.id
                        ? 'border-teal-200 bg-teal-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600">
                            {resume.fileType === 'application/pdf' ? '📄' : '📝'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{resume.fileName}</h4>
                          <div className="text-sm text-gray-600">
                            {resume.fileSize} • {formatDate(resume.uploadDate)}
                            {currentResume?.id === resume.id && (
                              <span className="ml-2 text-green-600 font-medium">(Current)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <a
                          href={resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Preview
                        </a>
                        <a
                          href={resume.url}
                          download={resume.fileName}
                          className="px-3 py-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          Download
                        </a>
                        {currentResume?.id !== resume.id && (
                          <button
                            onClick={() => handleSetAsPrimary(resume)}
                            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Set as Primary
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📜</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No resume history</h4>
                <p className="text-gray-600 mb-6">
                  Your uploaded resumes will appear here
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Upload Your First Resume
                </button>
              </div>
            )}
            
            {/* History Tips */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="font-medium text-gray-900 mb-3">📝 Version Control Tips</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Keep only relevant versions of your resume</li>
                <li>• Name your resumes clearly (e.g., "Resume_2024_Tech.pdf")</li>
                <li>• Delete outdated resumes to keep your profile organized</li>
                <li>• Keep a record of which resume was used for each application</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* AI Resume Analysis */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">🤖 AI Resume Analysis</h3>
            <p className="text-gray-600">
              Get personalized feedback on your resume's strengths and areas for improvement.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
            Analyze My Resume
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumePage;