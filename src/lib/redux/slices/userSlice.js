import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API functions
const mockApi = {
  updateProfile: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data };
  },
  
  getApplications: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: '1',
        jobId: '101',
        jobTitle: 'Frontend Developer',
        company: 'Tech Corp',
        status: 'pending',
        appliedDate: '2024-01-15',
        resumeUrl: '/resumes/resume1.pdf'
      },
      {
        id: '2',
        jobId: '102',
        jobTitle: 'React Developer',
        company: 'Startup XYZ',
        status: 'interview',
        appliedDate: '2024-01-10',
        resumeUrl: '/resumes/resume1.pdf'
      }
    ];
  },
  
  getUserProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      headline: 'Senior Frontend Developer',
      bio: 'Experienced developer with 5+ years in React and Node.js',
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
      experience: [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          current: false,
          description: 'Led frontend development team'
        }
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'University of Technology',
          field: 'Computer Science',
          startDate: '2015-09-01',
          endDate: '2019-06-01',
          current: false,
          description: 'Graduated with honors'
        }
      ],
      resumeUrl: '/resumes/resume1.pdf',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev'
    };
  }
};

// Async Thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await mockApi.getUserProfile(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await mockApi.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserApplications = createAsyncThunk(
  'user/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApi.getApplications();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveJob = createAsyncThunk(
  'user/saveJob',
  async (jobId, { rejectWithValue }) => {
    try {
      // Get current saved jobs from localStorage
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const updatedSavedJobs = [...new Set([...savedJobs, jobId])];
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
      
      return { jobId, savedJobs: updatedSavedJobs };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unsaveJob = createAsyncThunk(
  'user/unsaveJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
      
      return { jobId, savedJobs: updatedSavedJobs };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyForJob = createAsyncThunk(
  'user/applyForJob',
  async ({ jobId, jobTitle, company, resumeUrl, coverLetter }, { rejectWithValue }) => {
    try {
      // Get current applications from localStorage
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      const newApplication = {
        id: Date.now().toString(),
        jobId,
        jobTitle,
        company,
        resumeUrl: resumeUrl || '/resumes/default.pdf',
        coverLetter: coverLetter || '',
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      
      const updatedApplications = [...applications, newApplication];
      localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
      
      // Also add to appliedJobs array
      const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      const updatedAppliedJobs = [...new Set([...appliedJobs, jobId])];
      localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
      
      return { 
        application: newApplication,
        applications: updatedApplications,
        appliedJobs: updatedAppliedJobs
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profile: null,
  savedJobs: [],
  appliedJobs: [],
  applications: [],
  loading: false,
  error: null,
  success: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.success = false;
    },
    loadUserFromStorage: (state) => {
      try {
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        
        state.savedJobs = savedJobs;
        state.appliedJobs = appliedJobs;
        state.applications = applications;
      } catch (error) {
        console.error('Error loading user data from storage:', error);
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    initializeUserData: (state) => {
      // Initialize localStorage with empty arrays if they don't exist
      if (!localStorage.getItem('savedJobs')) {
        localStorage.setItem('savedJobs', JSON.stringify([]));
      }
      if (!localStorage.getItem('appliedJobs')) {
        localStorage.setItem('appliedJobs', JSON.stringify([]));
      }
      if (!localStorage.getItem('jobApplications')) {
        localStorage.setItem('jobApplications', JSON.stringify([]));
      }
      
      // Load data from localStorage
      state.savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      state.appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      state.applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
        state.success = true;
        
        // Update localStorage user data
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const updatedUser = { ...user, ...action.payload };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Applications
      .addCase(fetchUserApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Save Job
      .addCase(saveJob.fulfilled, (state, action) => {
        state.savedJobs = action.payload.savedJobs;
      })
      
      // Unsave Job
      .addCase(unsaveJob.fulfilled, (state, action) => {
        state.savedJobs = action.payload.savedJobs;
      })
      
      // Apply for Job
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.applications = action.payload.applications;
        state.appliedJobs = action.payload.appliedJobs;
        state.success = true;
      });
  }
});

export const { 
  clearUserError, 
  clearUserSuccess, 
  loadUserFromStorage,
  setProfile,
  initializeUserData
} = userSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectSavedJobs = (state) => state.user.savedJobs;
export const selectAppliedJobs = (state) => state.user.appliedJobs;
export const selectApplications = (state) => state.user.applications;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserSuccess = (state) => state.user.success;

export default userSlice.reducer;