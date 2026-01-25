'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '@/lib/redux/slices/authSlice';
import { initializeUserData } from '@/lib/redux/slices/userSlice';

const ClientInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on initial load
    dispatch(loadUserFromStorage());
    dispatch(initializeUserData());
    
    console.log('Client initialized - Redux state loaded from localStorage');
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default ClientInitializer;