'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardLayout({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status
  useEffect(() => {
    // Give a small delay for Redux state to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}