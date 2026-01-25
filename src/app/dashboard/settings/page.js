'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectIsLoggedIn, logoutUser } from '@/lib/redux/slices/authSlice';
import { selectUserProfile, updateUserProfile } from '@/lib/redux/slices/userSlice';
import { showSuccessToast, showErrorToast, showWarningToast } from '@/lib/redux/slices/uiSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(selectUserProfile);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    email: '',
    phone: '',
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      jobAlerts: true,
      applicationUpdates: true,
      messages: true,
      newsletter: false,
      promotions: false,
    },
    pushNotifications: {
      newJobs: true,
      applicationStatus: true,
      messages: true,
    },
    frequency: 'daily',
  });
  
  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // public, private, recruiters-only
    showEmail: false,
    showPhone: false,
    dataSharing: {
      improveServices: true,
      personalizedAds: false,
      thirdParties: false,
    },
  });
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30, // minutes
  });
  
  // Password Change Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Billing/Subscription (mock data)
  const [subscription, setSubscription] = useState({
    plan: 'free',
    status: 'active',
    nextBilling: '2024-02-25',
    storage: '5 GB',
    features: ['Basic Job Search', '5 Applications/Month', 'Email Support'],
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Initialize form data from user profile
  useEffect(() => {
    if (userProfile) {
      setProfileSettings({
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currency: 'USD',
      });
      
      // Load settings from localStorage
      const savedNotifications = localStorage.getItem('notificationSettings');
      const savedPrivacy = localStorage.getItem('privacySettings');
      const savedSecurity = localStorage.getItem('securitySettings');
      
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications));
      }
      
      if (savedPrivacy) {
        setPrivacySettings(JSON.parse(savedPrivacy));
      }
      
      if (savedSecurity) {
        setSecuritySettings(JSON.parse(savedSecurity));
      }
    }
  }, [userProfile]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'subscription', name: 'Subscription', icon: '💳' },
  ];

  // Handle profile settings save
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Update user profile
      await dispatch(updateUserProfile({
        ...userProfile,
        email: profileSettings.email,
        phone: profileSettings.phone,
      })).unwrap();
      
      // Save to localStorage
      localStorage.setItem('profileSettings', JSON.stringify(profileSettings));
      
      dispatch(showSuccessToast('Profile settings saved successfully'));
    } catch (error) {
      dispatch(showErrorToast('Failed to save profile settings'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification settings save
  const handleSaveNotifications = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    dispatch(showSuccessToast('Notification preferences updated'));
  };

  // Handle privacy settings save
  const handleSavePrivacy = () => {
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    dispatch(showSuccessToast('Privacy settings updated'));
  };

  // Handle security settings save
  const handleSaveSecurity = () => {
    localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
    dispatch(showSuccessToast('Security settings updated'));
  };

  // Handle password change
  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      dispatch(showErrorToast('New passwords do not match'));
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      dispatch(showErrorToast('Password must be at least 8 characters'));
      return;
    }
    
    // Mock password change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      dispatch(showSuccessToast('Password changed successfully'));
    }, 1500);
  };

  // Handle two-factor toggle
  const handleToggleTwoFactor = () => {
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
    
    if (!securitySettings.twoFactorEnabled) {
      dispatch(showSuccessToast('Two-factor authentication enabled'));
    } else {
      dispatch(showWarningToast('Two-factor authentication disabled'));
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    setIsDeleting(true);
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setTimeout(() => {
        setIsDeleting(false);
        dispatch(logoutUser());
        router.push('/');
        dispatch(showSuccessToast('Account deleted successfully'));
      }, 2000);
    } else {
      setIsDeleting(false);
    }
  };

  // Handle export data
  const handleExportData = () => {
    setIsLoading(true);
    
    // Create a mock data export
    const userData = {
      profile: userProfile,
      settings: {
        profile: profileSettings,
        notifications: notificationSettings,
        privacy: privacySettings,
        security: securitySettings,
      },
      subscription: subscription,
      timestamp: new Date().toISOString(),
    };
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `jobportal-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setIsLoading(false);
    dispatch(showSuccessToast('Data exported successfully'));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences, privacy, and security
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${
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

      {/* Settings Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={profileSettings.email}
                        onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Preferences */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={profileSettings.language}
                        onChange={(e) => setProfileSettings(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Zone
                      </label>
                      <select
                        value={profileSettings.timezone}
                        onChange={(e) => setProfileSettings(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={profileSettings.currency}
                        onChange={(e) => setProfileSettings(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              
              <div className="space-y-8">
                {/* Email Notifications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <p className="text-sm text-gray-600">
                            {key === 'jobAlerts' && 'Get notified about new job opportunities'}
                            {key === 'applicationUpdates' && 'Receive updates on your applications'}
                            {key === 'messages' && 'Get notified about new messages'}
                            {key === 'newsletter' && 'Receive our monthly newsletter'}
                            {key === 'promotions' && 'Get special offers and promotions'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotificationSettings(prev => ({
                            ...prev,
                            emailNotifications: {
                              ...prev.emailNotifications,
                              [key]: !value
                            }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-teal-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Push Notifications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <p className="text-sm text-gray-600">
                            {key === 'newJobs' && 'Get real-time alerts for new job matches'}
                            {key === 'applicationStatus' && 'Get instant updates on application status'}
                            {key === 'messages' && 'Get notified about new messages'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotificationSettings(prev => ({
                            ...prev,
                            pushNotifications: {
                              ...prev.pushNotifications,
                              [key]: !value
                            }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-teal-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Notification Frequency */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Email Frequency</h4>
                  <div className="flex flex-wrap gap-2">
                    {['realtime', 'daily', 'weekly'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setNotificationSettings(prev => ({ ...prev, frequency: freq }))}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          notificationSettings.frequency === freq
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {freq === 'realtime' && 'Real-time'}
                        {freq === 'daily' && 'Daily Digest'}
                        {freq === 'weekly' && 'Weekly Summary'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveNotifications}
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Notification Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
              
              <div className="space-y-8">
                {/* Profile Visibility */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Profile Visibility</h4>
                  <div className="space-y-4">
                    {[
                      {
                        id: 'public',
                        title: 'Public',
                        description: 'Your profile is visible to everyone, including recruiters and other users',
                        icon: '🌐'
                      },
                      {
                        id: 'recruiters-only',
                        title: 'Recruiters Only',
                        description: 'Only verified recruiters can view your profile',
                        icon: '👔'
                      },
                      {
                        id: 'private',
                        title: 'Private',
                        description: 'Your profile is hidden from everyone except you',
                        icon: '🔒'
                      },
                    ].map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setPrivacySettings(prev => ({ ...prev, profileVisibility: option.id }))}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          privacySettings.profileVisibility === option.id
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{option.icon}</span>
                          <div>
                            <h5 className="font-medium text-gray-900">{option.title}</h5>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                          <div className="ml-auto">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              privacySettings.profileVisibility === option.id
                                ? 'border-teal-600 bg-teal-600'
                                : 'border-gray-300'
                            }`}>
                              {privacySettings.profileVisibility === option.id && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Contact Information Privacy */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'showEmail', label: 'Show email address on profile', description: 'Allow recruiters to see your email' },
                      { key: 'showPhone', label: 'Show phone number on profile', description: 'Allow recruiters to see your phone number' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{item.label}</span>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setPrivacySettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings[item.key] ? 'bg-teal-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Data Sharing */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Data Sharing Preferences</h4>
                  <div className="space-y-3">
                    {Object.entries(privacySettings.dataSharing).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <p className="text-sm text-gray-600">
                            {key === 'improveServices' && 'Help us improve our services with anonymized data'}
                            {key === 'personalizedAds' && 'Show personalized job recommendations and ads'}
                            {key === 'thirdParties' && 'Share data with trusted third-party partners'}
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivacySettings(prev => ({
                            ...prev,
                            dataSharing: {
                              ...prev.dataSharing,
                              [key]: !value
                            }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-teal-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* GDPR Controls */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                  <h4 className="font-medium text-blue-900 mb-3">GDPR Data Rights</h4>
                  <p className="text-sm text-blue-800 mb-4">
                    Under GDPR, you have the right to access, correct, or delete your personal data.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleExportData}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Export My Data
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('This will delete all your personal data. Are you sure?')) {
                          dispatch(showSuccessToast('Data deletion request submitted'));
                        }
                      }}
                      className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Request Data Deletion
                    </button>
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSavePrivacy}
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
              
              <div className="space-y-8">
                {/* Change Password */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <button
                      onClick={handleChangePassword}
                      disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword}
                      className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
                
                {/* Two-Factor Authentication */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={handleToggleTwoFactor}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorEnabled ? 'bg-teal-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  {securitySettings.twoFactorEnabled && (
                    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mt-4">
                      <p className="text-sm text-teal-800 mb-3">
                        Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
                      </p>
                      <button className="text-sm font-medium text-teal-700 hover:text-teal-800">
                        Manage authenticator app →
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Session Settings */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Session Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Login Alerts</span>
                        <p className="text-sm text-gray-600">Get notified of new sign-ins to your account</p>
                      </div>
                      <button
                        onClick={() => setSecuritySettings(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.loginAlerts ? 'bg-teal-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Auto-logout After</span>
                        <span className="text-teal-600 font-medium">{securitySettings.sessionTimeout} minutes</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5 min</span>
                        <span>2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Login History */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recent Login Activity</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, USA', time: '2 hours ago', current: true },
                      { device: 'Safari on iPhone', location: 'San Francisco, USA', time: '1 day ago' },
                      { device: 'Firefox on Mac', location: 'London, UK', time: '3 days ago' },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{session.device}</div>
                          <div className="text-sm text-gray-600">{session.location} • {session.time}</div>
                        </div>
                        {session.current ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Current</span>
                        ) : (
                          <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveSecurity}
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Security Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Subscription & Billing</h3>
              
              <div className="space-y-8">
                {/* Current Plan */}
                <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-teal-100 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl font-bold text-gray-900 mr-2">
                          {subscription.plan === 'free' ? 'Free' : 'Pro'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {subscription.status}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {subscription.plan === 'free' 
                          ? 'Basic features for job seekers'
                          : 'Advanced features for serious job seekers'
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {subscription.plan === 'free' ? '$0' : '$19.99'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {subscription.plan === 'free' ? 'forever' : '/month'}
                      </div>
                    </div>
                  </div>
                  
                  {subscription.plan !== 'free' && (
                    <div className="mt-4 pt-4 border-t border-teal-200">
                      <p className="text-sm text-gray-600">
                        Next billing date: {new Date(subscription.nextBilling).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Plan Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {subscription.plan === 'free' && (
                      <>
                        <div className="flex items-center text-gray-400">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>Unlimited Applications</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>AI Resume Review</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Upgrade Button */}
                {subscription.plan === 'free' && (
                  <div className="pt-6 border-t border-gray-200">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Upgrade to Pro - $19.99/month
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone (Always Visible) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
            <p className="text-red-700 mb-6">
              These actions are irreversible. Please proceed with caution.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleExportData}
                disabled={isLoading}
                className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Exporting...' : 'Export All Data'}
              </button>
              
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
            
            <p className="text-sm text-red-600 mt-4">
              Deleting your account will permanently remove all your data, applications, and saved jobs. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;