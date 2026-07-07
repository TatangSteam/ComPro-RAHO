'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useRequireAuth } from '@/hooks/useAuth';
import AuthImage from '@/components/Shared/AuthImage';

interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  mapUrl?: string;
  imageUrl?: string;
  category?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminLocations() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useRequireAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchLocations();
    }
  }, [isAuthenticated, authLoading]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get<any>(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      // Backend returns { success: true, locations: [...] }
      const locationData = res.data.locations || res.data;
      setLocations(locationData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(locations.filter(l => l.id !== id));
      alert('Lokasi berhasil dihapus');
    } catch (error: any) {
      console.error('Error deleting location:', error);
      if (error.response?.status === 403) {
        alert('Anda tidak memiliki izin untuk menghapus lokasi. Hanya superadmin yang dapat menghapus lokasi.');
      } else {
        alert('Gagal menghapus lokasi');
      }
    }
  };

  // Show loading while checking authentication
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat lokasi...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (useRequireAuth will handle redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-yellow-600 hover:text-yellow-700 text-sm mb-2 inline-block">
                ← Kembali ke Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Lokasi</h1>
            </div>
            <Link
              href="/admin/locations/create"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Tambah Lokasi
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading...</div>
          </div>
        ) : locations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada lokasi</h3>
            <p className="text-gray-600 mb-4">Mulai dengan menambahkan lokasi klinik pertama Anda</p>
            <Link
              href="/admin/locations/create"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              + Tambah Lokasi
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  {location.imageUrl ? (
                    <AuthImage
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                      🏥
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/locations/edit/${location.id}`}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      location.category === 'cabang'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {location.category === 'cabang' ? 'Cabang' : 'Partnership'}
                  </span>
                  <span className="text-xs text-gray-400">Urutan: {location.sortOrder ?? 0}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">📍 {location.city}</span>
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {location.address}
                </p>
                {location.phone && (
                  <p className="text-sm text-gray-600 mb-3">
                    📞 {location.phone}
                  </p>
                )}
                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Lihat di Maps →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
