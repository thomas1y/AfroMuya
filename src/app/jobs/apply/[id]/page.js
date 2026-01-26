'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { showToast } from '@/lib/redux/slices/uiSlice';
import Link from 'next/link';
import ApplicationProgress from '@/components/jobs/ApplicationProgress';
import JobSummaryCard from '@/components/jobs/JobSummaryCard';
import ApplicationStep1 from '@/components/jobs/ApplicationStep1';
import ApplicationStep2 from '@/components/jobs/ApplicationStep2';
import ApplicationStep3 from '@/components/jobs/ApplicationStep3';
import ApplicationReview from '@/components/jobs/ApplicationReview';

const JobApplicationPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobId = params.id;
  
  // Redux state
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.user);
  const { savedJobs, appliedJobs } = useAppSelector((state) => state.user);
  
  // Mock job data (in real app, fetch from API)
  const [job, setJob] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    documents: {
      resume: null,
      resumeType: 'existing', // 'existing', 'upload', 'none'
      coverLetter: '',
      coverLetterType: 'template', // 'template', 'upload', 'write', 'none'
      customCoverLetter: null,
    },
    questions: {
      workAuthorization: '',
      noticePeriod: '',
      expectedSalary: '',
      referralSource: '',
      diversitySurvey: {},
    },
    privacyConsent: false,
    termsAgreed: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(showToast({
        message: 'Please login to apply for jobs',
        type: 'warning'
      }));
      router.push(`/login?redirect=/jobs/apply/${jobId}`);
    }
  }, [isLoggedIn, jobId, router, dispatch]);

  // Load job data and user profile
  useEffect(() => {
    // Mock job data - in real app, fetch from API
    const mockJob = {
      id: jobId,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      companyLogo: '/company-logo.png',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'Looking for an experienced frontend developer...',
      postedDate: '2024-01-20',
      applicationDeadline: '2024-02-20',
    };
    
    setJob(mockJob);
    
    // Auto-fill personal info from user profile
    if (profile) {
      setApplicationData(prev => ({
        ...prev,
        personalInfo: {
          fullName: profile.name || user?.name || '',
          email: profile.email || user?.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          linkedin: profile.linkedin || '',
          portfolio: profile.portfolio || '',
        }
      }));
    }
  }, [jobId, profile, user]);

  // Check if already applied
  useEffect(() => {
    if (appliedJobs.includes(jobId)) {
      dispatch(showToast({
        message: 'You have already applied for this job',
        type: 'info'
      }));
      router.push(`/jobs/${jobId}`);
    }
  }, [appliedJobs, jobId, router, dispatch]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleDataUpdate = (step, data) => {
    setApplicationData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  };

  const handleSubmitApplication = async () => {
    if (!applicationData.privacyConsent || !applicationData.termsAgreed) {
      dispatch(showToast({
        message: 'Please agree to the terms and privacy policy',
        type: 'error'
      }));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - in real app, connect to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage (mock)
      const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      const newApplication = {
        id: `app_${Date.now()}`,
        jobId,
        jobTitle: job?.title,
        company: job?.company,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        ...applicationData,
      };
      
      localStorage.setItem('jobApplications', JSON.stringify([...existingApplications, newApplication]));
      
      // Update applied jobs in localStorage
      const currentApplied = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      localStorage.setItem('appliedJobs', JSON.stringify([...currentApplied, jobId]));
      
      dispatch(showToast({
        message: 'Application submitted successfully!',
        type: 'success'
      }));
      
      // Redirect to applications page
      router.push('/dashboard/applications');
      
    } catch (error) {
      dispatch(showToast({
        message: 'Failed to submit application. Please try again.',
        type: 'error'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/jobs" className="text-gray-500 hover:text-primary">
                Jobs
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/jobs/${jobId}`} className="text-gray-500 hover:text-primary">
                {job.title}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-primary font-semibold">Apply</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Position</h1>
          <p className="text-gray-600 mt-2">Complete your application in a few simple steps</p>
        </div>

        {/* Progress Bar */}
        <ApplicationProgress currentStep={currentStep} />

        {/* Job Summary */}
        <div className="mb-8">
          <JobSummaryCard job={job} />
        </div>

        {/* Application Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {currentStep === 1 && (
            <ApplicationStep1
              data={applicationData.personalInfo}
              onUpdate={(data) => handleDataUpdate('personalInfo', data)}
              onNext={handleNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <ApplicationStep2
              data={applicationData.documents}
              onUpdate={(data) => handleDataUpdate('documents', data)}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              userResume={profile?.resumeUrl}
            />
          )}
          
          {currentStep === 3 && (
            <ApplicationStep3
              data={applicationData.questions}
              onUpdate={(data) => handleDataUpdate('questions', data)}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}
          
          {currentStep === 4 && (
            <ApplicationReview
              applicationData={applicationData}
              job={job}
              onPrev={handlePrevStep}
              onSubmit={handleSubmitApplication}
              isSubmitting={isSubmitting}
              onConsentChange={(consent) => handleDataUpdate('privacyConsent', { privacyConsent: consent })}
              onTermsChange={(agreed) => handleDataUpdate('termsAgreed', { termsAgreed: agreed })}
            />
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Your data is secure</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>We use encryption to protect your personal information. Your application will only be shared with the hiring company.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;