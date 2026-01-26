import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls
const mockJobsAPI = {
  fetchJobs: () => new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "TechVision Inc.",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$120,000 - $160,000",
          experience: "5+ years",
          postedDate: "2024-01-20",
          easyApply: true,
          techStack: ["React", "TypeScript", "Next.js"],
          description: "Looking for an experienced frontend developer..."
        },
        // Add more mock jobs as needed
      ]);
    }, 500);
  }),

  fetchJobById: (id) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        title: "Senior Frontend Developer",
        company: "TechVision Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        experience: "5+ years",
        postedDate: "2024-01-20",
        easyApply: true,
        techStack: ["React", "TypeScript", "Next.js"],
        description: "Looking for an experienced frontend developer..."
      });
    }, 500);
  }),

  applyToJob: (jobId, applicationData) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        applicationId: `app_${Date.now()}`,
        jobId,
        ...applicationData
      });
    }, 1000);
  })
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await mockJobsAPI.fetchJobs();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await mockJobsAPI.fetchJobById(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyToJob = createAsyncThunk(
  'jobs/applyToJob',
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await mockJobsAPI.applyToJob(jobId, applicationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    currentJob: null,
    filteredJobs: [],
    filters: {
      search: '',
      location: '',
      type: [],
      experience: [],
      salaryRange: [0, 300000],
      remote: false
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalJobs: 0,
      jobsPerPage: 10
    },
    loading: false,
    error: null,
    success: false,
    applicationStatus: {
      submitting: false,
      submitted: false,
      error: null
    }
  },
  reducers: {
    // Filter actions
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.filters.experience = action.payload;
    },
    setSalaryFilter: (state, action) => {
      state.filters.salaryRange = action.payload;
    },
    setRemoteFilter: (state, action) => {
      state.filters.remote = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        location: '',
        type: [],
        experience: [],
        salaryRange: [0, 300000],
        remote: false
      };
    },
    
    // Pagination
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    
    // Application status
    resetApplicationStatus: (state) => {
      state.applicationStatus = {
        submitting: false,
        submitted: false,
        error: null
      };
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear success
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    // Fetch jobs
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
        state.pagination.totalJobs = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.jobsPerPage);
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Apply to job
      .addCase(applyToJob.pending, (state) => {
        state.applicationStatus.submitting = true;
        state.applicationStatus.error = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.applicationStatus.submitting = false;
        state.applicationStatus.submitted = true;
        state.success = true;
        
        // Add to user's applied jobs (this would integrate with userSlice)
        // In a real app, this would dispatch an action to userSlice
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applicationStatus.submitting = false;
        state.applicationStatus.error = action.payload;
      });
  }
});

export const {
  setSearchFilter,
  setLocationFilter,
  setTypeFilter,
  setExperienceFilter,
  setSalaryFilter,
  setRemoteFilter,
  clearFilters,
  setCurrentPage,
  resetApplicationStatus,
  clearError,
  clearSuccess
} = jobSlice.actions;

export default jobSlice.reducer;