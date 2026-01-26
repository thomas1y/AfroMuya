import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls
const mockCompaniesAPI = {
  fetchCompanies: () => new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "TechVision Inc.",
          logo: "TV",
          industry: "Software Development",
          size: "501-1000 employees",
          location: "San Francisco, CA",
          rating: 4.5,
          reviews: 124,
          openPositions: 24,
          followers: 5800,
          isFollowing: false,
          isRemoteFriendly: true
        },
        // Add more mock companies as needed
      ]);
    }, 500);
  }),

  fetchCompanyById: (id) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        name: "TechVision Inc.",
        logo: "TV",
        industry: "Software Development",
        size: "501-1000 employees",
        location: "San Francisco, CA",
        rating: 4.5,
        reviews: 124,
        openPositions: 24,
        followers: 5800,
        isFollowing: false,
        isRemoteFriendly: true,
        description: "Leading SaaS company providing innovative solutions...",
        perks: ["Unlimited PTO", "Learning Stipend", "Stock Options"],
        techStack: ["React", "Node.js", "AWS"]
      });
    }, 500);
  }),

  followCompany: (companyId) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        companyId,
        followed: true
      });
    }, 500);
  }),

  unfollowCompany: (companyId) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        companyId,
        followed: false
      });
    }, 500);
  })
};

// Async thunks
export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await mockCompaniesAPI.fetchCompanies();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await mockCompaniesAPI.fetchCompanyById(companyId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFollowCompany = createAsyncThunk(
  'companies/toggleFollow',
  async ({ companyId, follow }, { rejectWithValue }) => {
    try {
      const response = follow 
        ? await mockCompaniesAPI.followCompany(companyId)
        : await mockCompaniesAPI.unfollowCompany(companyId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
    currentCompany: null,
    filteredCompanies: [],
    filters: {
      search: '',
      industries: [],
      sizes: [],
      ratings: [],
      remoteFriendly: false,
      hiring: false
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCompanies: 0,
      companiesPerPage: 12
    },
    loading: false,
    error: null,
    success: false,
    followedCompanies: []
  },
  reducers: {
    // Filter actions
    setCompanySearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setIndustryFilter: (state, action) => {
      state.filters.industries = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.filters.sizes = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filters.ratings = action.payload;
    },
    setRemoteFriendlyFilter: (state, action) => {
      state.filters.remoteFriendly = action.payload;
    },
    setHiringFilter: (state, action) => {
      state.filters.hiring = action.payload;
    },
    clearCompanyFilters: (state) => {
      state.filters = {
        search: '',
        industries: [],
        sizes: [],
        ratings: [],
        remoteFriendly: false,
        hiring: false
      };
    },
    
    // Pagination
    setCompanyCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    
    // View mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    // Sort
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
    // Manual follow/unfollow (for immediate UI feedback)
    followCompanyLocal: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find(c => c.id === companyId);
      if (company) {
        company.isFollowing = true;
        company.followers += 1;
      }
      if (state.currentCompany?.id === companyId) {
        state.currentCompany.isFollowing = true;
        state.currentCompany.followers += 1;
      }
      state.followedCompanies.push(companyId);
    },
    
    unfollowCompanyLocal: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find(c => c.id === companyId);
      if (company) {
        company.isFollowing = false;
        company.followers -= 1;
      }
      if (state.currentCompany?.id === companyId) {
        state.currentCompany.isFollowing = false;
        state.currentCompany.followers -= 1;
      }
      state.followedCompanies = state.followedCompanies.filter(id => id !== companyId);
    },
    
    // Clear errors
    clearCompanyError: (state) => {
      state.error = null;
    },
    
    // Clear success
    clearCompanySuccess: (state) => {
      state.success = false;
    },
    
    // Load followed companies from localStorage
    loadFollowedCompanies: (state) => {
      try {
        const followed = JSON.parse(localStorage.getItem('followedCompanies') || '[]');
        state.followedCompanies = followed;
        
        // Update companies in state
        state.companies = state.companies.map(company => ({
          ...company,
          isFollowing: followed.includes(company.id)
        }));
        
        if (state.currentCompany) {
          state.currentCompany.isFollowing = followed.includes(state.currentCompany.id);
        }
      } catch (error) {
        console.error('Error loading followed companies:', error);
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch companies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
        state.filteredCompanies = action.payload;
        state.pagination.totalCompanies = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.companiesPerPage);
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single company
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle follow
      .addCase(toggleFollowCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFollowCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const { companyId, followed } = action.payload;
        
        // Update companies list
        state.companies = state.companies.map(company => 
          company.id === companyId 
            ? { ...company, isFollowing: followed, followers: followed ? company.followers + 1 : company.followers - 1 }
            : company
        );
        
        // Update current company if it's the one being followed
        if (state.currentCompany?.id === companyId) {
          state.currentCompany.isFollowing = followed;
          state.currentCompany.followers = followed 
            ? state.currentCompany.followers + 1 
            : state.currentCompany.followers - 1;
        }
        
        // Update followed companies list
        if (followed) {
          state.followedCompanies.push(companyId);
          localStorage.setItem('followedCompanies', JSON.stringify([...state.followedCompanies, companyId]));
        } else {
          state.followedCompanies = state.followedCompanies.filter(id => id !== companyId);
          localStorage.setItem('followedCompanies', JSON.stringify(state.followedCompanies.filter(id => id !== companyId)));
        }
      })
      .addCase(toggleFollowCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setCompanySearchFilter,
  setIndustryFilter,
  setSizeFilter,
  setRatingFilter,
  setRemoteFriendlyFilter,
  setHiringFilter,
  clearCompanyFilters,
  setCompanyCurrentPage,
  setViewMode,
  setSortBy,
  followCompanyLocal,
  unfollowCompanyLocal,
  clearCompanyError,
  clearCompanySuccess,
  loadFollowedCompanies
} = companySlice.actions;

export default companySlice.reducer;