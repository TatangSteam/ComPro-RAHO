'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
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
}

export default function EditLocation() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    mapUrl: '',
    category: 'partnership',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    if (params.id) {
      fetchLocation();
    }
  }, [params.id, router]);

  const fetchLocation = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get<{ success: boolean; location: Location }>(
        `${process.env.NEXT_PUBLIC_API_URL}/locations/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const location = res.data.location || res.data;
      setFormData({
        name: location.name,
        city: location.city,
        address: location.address,
        phone: location.phone || '',
        mapUrl: location.mapUrl || '',
        category: location.category || 'partnership',
      });
      if (location.imageUrl) {
        setCurrentImageUrl(location.imageUrl);
      }
    } catch (error: any) {
      console.error('Error fetching location:', error);
      if (error.response?.status === 403) {
        alert('Anda tidak memiliki akses untuk mengedit lokasi ini');
      } else {
        alert('Gagal memuat lokasi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');

      if (imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('mapUrl', formData.mapUrl);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('image', imageFile);

        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/${params.id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/${params.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      alert('Lokasi berhasil diupdate!');
      router.push('/admin/locations');
    } catch (error: any) {
      console.error('Error updating location:', error);
      if (error.response?.status === 403) {
        alert('Anda tidak memiliki izin untuk mengupdate lokasi. Hanya superadmin yang dapat mengedit lokasi.');
      } else {
        alert('Gagal mengupdate lokasi');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin/locations" className="text-yellow-600 hover:text-yellow-700 text-sm mb-2 inline-block">
            ← Kembali ke Daftar Lokasi
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Lokasi</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
            >
              <option value="partnership">Partnership</option>
              <option value="cabang">Cabang</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Cabang: lokasi resmi RAHO Club Premier. Partnership: klinik/mitra kesehatan.
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lokasi *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Contoh: Raho Club Premier"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Kota *
            </label>
            <input
              type="text"
              id="city"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Contoh: Jakarta Pusat"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap *
            </label>
            <textarea
              id="address"
              rows={4}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Contoh: +62 21 1234 5678"
            />
          </div>

          {/* Map URL */}
          <div>
            <label htmlFor="mapUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps URL
            </label>
            <input
              type="url"
              id="mapUrl"
              value={formData.mapUrl}
              onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="https://maps.google.com/?q=..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Link Google Maps untuk lokasi ini (opsional)
            </p>
          </div>

          {/* Current Image */}
          {currentImageUrl && !imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Saat Ini
              </label>
              <AuthImage
                src={currentImageUrl}
                alt="Current"
                className="w-full max-w-md h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              {currentImageUrl ? 'Ganti Gambar' : 'Upload Gambar'}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview Gambar Baru:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Upload gambar baru untuk mengganti gambar lama (opsional, format: JPG, PNG)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Update Lokasi'}
            </button>
            <Link
              href="/admin/locations"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
