'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const token = localStorage.getItem('adminToken');
      
      // If no token, redirect to login
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // If token exists, verify it with the API
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Token is valid, redirect to dashboard
          router.push('/admin/dashboard');
        } else {
          // Token is invalid, clear storage and redirect to login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        // On error, clear storage and redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        router.push('/admin/login');
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  // Show loading while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memeriksa status login...</p>
      </div>
    </div>
  );
}