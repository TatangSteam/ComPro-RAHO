'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  loading: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    admin: null,
    loading: true,
  });

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAuthState({
            isAuthenticated: true,
            admin: data.admin,
            loading: false,
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  const login = (token: string, adminData: Admin) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setAuthState({
      isAuthenticated: true,
      admin: adminData,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAuthState({
      isAuthenticated: false,
      admin: null,
      loading: false,
    });
    router.push('/admin/login');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token) {
      setAuthState({
        isAuthenticated: false,
        admin: null,
        loading: false,
      });
      return false;
    }

    const isValid = await verifyToken(token);
    if (!isValid) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      setAuthState({
        isAuthenticated: false,
        admin: null,
        loading: false,
      });
      return false;
    }

    // If adminData exists in localStorage and token is valid, use it
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        setAuthState({
          isAuthenticated: true,
          admin,
          loading: false,
        });
      } catch (error) {
        console.error('Error parsing admin data:', error);
      }
    }

    return true;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}

export function useRequireAuth() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  return { isAuthenticated, loading };
}