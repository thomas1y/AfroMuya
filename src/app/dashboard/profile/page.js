'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { selectUserProfile, updateUserProfile, setProfile } from '@/lib/redux/slices/userSlice';
import { showSuccessToast, showErrorToast } from '@/lib/redux/slices/uiSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(selectUserProfile);
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    resumeUrl: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Initialize form data from Redux store
  useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        headline: userProfile.headline || '',
        bio: userProfile.bio || '',
        skills: userProfile.skills || [],
        experience: userProfile.experience || [],
        education: userProfile.education || [],
        resumeUrl: userProfile.resumeUrl || '',
        linkedin: userProfile.linkedin || '',
        github: userProfile.github || '',
        portfolio: userProfile.portfolio || '',
      });
    }
  }, [userProfile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle skill changes
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Handle experience changes
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const addExperience = () => {
    if (experienceForm.title && experienceForm.company) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...experienceForm, id: Date.now() }]
      }));
      setExperienceForm({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };

  const removeExperience = (id) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Handle education changes
  const [educationForm, setEducationForm] = useState({
    degree: '',
    school: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const addEducation = () => {
    if (educationForm.degree && educationForm.school) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { ...educationForm, id: Date.now() }]
      }));
      setEducationForm({
        degree: '',
        school: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };

  const removeEducation = (id) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      dispatch(showSuccessToast('Profile updated successfully!'));
      setIsEditing(false);
    } catch (error) {
      dispatch(showErrorToast(error.message || 'Failed to update profile'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        headline: userProfile.headline || '',
        bio: userProfile.bio || '',
        skills: userProfile.skills || [],
        experience: userProfile.experience || [],
        education: userProfile.education || [],
        resumeUrl: userProfile.resumeUrl || '',
        linkedin: userProfile.linkedin || '',
        github: userProfile.github || '',
        portfolio: userProfile.portfolio || '',
      });
    }
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'skills', name: 'Skills', icon: '🎯' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Management</h1>
            <p className="text-gray-600 mt-2">
              Update your personal and professional information
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-green-400 flex items-center justify-center text-white text-3xl font-bold">
              {profileData.name?.charAt(0) || 'U'}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{profileData.name || 'Your Name'}</h2>
            <p className="text-gray-600">{profileData.headline || 'Your professional headline'}</p>
            <p className="text-gray-500 text-sm mt-1">{profileData.location || 'Add your location'}</p>
            {isEditing && (
              <button className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium">
                Change profile photo
              </button>
            )}
          </div>
        </div>
      </div>

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
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  value={profileData.headline}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Senior Frontend Developer"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio / About
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Describe your professional background, skills, and career goals..."
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profileData.linkedin}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profileData.github}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={profileData.portfolio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Skills</h3>
              <p className="text-gray-600 mb-4">
                Add skills that match your expertise. These will help employers find you.
              </p>
              
              <div className="flex items-center mb-6">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  disabled={!isEditing}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50"
                  placeholder="Add a skill (e.g., React, Node.js, Python)"
                />
                <button
                  onClick={addSkill}
                  disabled={!isEditing || !newSkill.trim()}
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-r-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg"
                  >
                    <span className="font-medium">{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-teal-600 hover:text-teal-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                {profileData.skills.length === 0 && (
                  <p className="text-gray-500 italic">No skills added yet.</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Skill Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Include both technical and soft skills</li>
                <li>• List skills in order of proficiency</li>
                <li>• Update skills as you learn new technologies</li>
                <li>• Be specific (e.g., "React Hooks" instead of just "React")</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
              
              {isEditing && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Add New Experience</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={experienceForm.title}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Senior Frontend Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={experienceForm.location}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={experienceForm.startDate}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={experienceForm.endDate}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, endDate: e.target.value }))}
                          disabled={experienceForm.current}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="currentJob"
                        checked={experienceForm.current}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, current: e.target.checked }))}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="currentJob" className="ml-2 text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={addExperience}
                    disabled={!experienceForm.title || !experienceForm.company}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    Add Experience
                  </button>
                </div>
              )}

              {/* Experience List */}
              <div className="space-y-4">
                {profileData.experience.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                        <p className="text-gray-700">{exp.company} • {exp.location}</p>
                        <p className="text-gray-500 text-sm">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="text-gray-600 mt-2">{exp.description}</p>
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {profileData.experience.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">No work experience added yet.</p>
                    {isEditing && (
                      <p className="text-gray-400 text-sm mt-1">Add your first work experience above.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
              
              {isEditing && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Add Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree *
                      </label>
                      <input
                        type="text"
                        value={educationForm.degree}
                        onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School/University *
                      </label>
                      <input
                        type="text"
                        value={educationForm.school}
                        onChange={(e) => setEducationForm(prev => ({ ...prev, school: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="University of Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={educationForm.field}
                        onChange={(e) => setEducationForm(prev => ({ ...prev, field: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={educationForm.startDate}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={educationForm.endDate}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, endDate: e.target.value }))}
                          disabled={educationForm.current}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="currentEducation"
                        checked={educationForm.current}
                        onChange={(e) => setEducationForm(prev => ({ ...prev, current: e.target.checked }))}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="currentEducation" className="ml-2 text-sm text-gray-700">
                        Currently studying here
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description/Achievements
                      </label>
                      <textarea
                        value={educationForm.description}
                        onChange={(e) => setEducationForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Honors, awards, or relevant coursework..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={addEducation}
                    disabled={!educationForm.degree || !educationForm.school}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    Add Education
                  </button>
                </div>
              )}

              {/* Education List */}
              <div className="space-y-4">
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-700">{edu.school}</p>
                        {edu.field && <p className="text-gray-600">Field: {edu.field}</p>}
                        <p className="text-gray-500 text-sm">
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </p>
                        {edu.description && (
                          <p className="text-gray-600 mt-2">{edu.description}</p>
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {profileData.education.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <p className="text-gray-500">No education added yet.</p>
                    {isEditing && (
                      <p className="text-gray-400 text-sm mt-1">Add your education above.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;