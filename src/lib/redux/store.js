import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: ['user/applyForJob/fulfilled'],
       
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        
        ignoredPaths: ['user.applications'],
      },
    }),
});

