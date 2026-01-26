import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';
import jobReducer from './slices/jobSlice';      // Add this
import companyReducer from './slices/companySlice'; // Add this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
    jobs: jobReducer,        // Add this
    companies: companyReducer // Add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['companies/toggleFollowCompany/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['companies.currentCompany', 'jobs.currentJob']
      },
    }),
});

export default store;