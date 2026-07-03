'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import AuthImage from '@/components/Shared/AuthImage';
import RichTextEditor from '@/components/Shared/RichTextEditor';
import { toDisplayHtml } from '@/lib/sanitizeHtml';
import { Article } from '@/types';

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    category: 'penyakit',
    published: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    if (params.id) {
      fetchArticle();
    }
  }, [params.id, router]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get<Article>(`${process.env.NEXT_PUBLIC_API_URL}/articles/by-id/${params.id}`);
      const article = res.data;
      setFormData({
        title: article.title,
        slug: article.slug,
        // Normalize legacy plain-text/Markdown-lite content to proper HTML
        // before loading it into the rich text editor, so re-saving doesn't
        // collapse paragraphs/headings/lists into a single flattened block.
        content: toDisplayHtml(article.content),
        excerpt: article.excerpt || '',
        author: article.author || '',
        category: article.category,
        published: article.published,
      });
      if (article.imageUrl) {
        setCurrentImageUrl(article.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Gagal memuat artikel');
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

  const isContentEmpty = (html: string) => {
    const stripped = html.replace(/<(.|\n)*?>/g, '').trim();
    return stripped.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isContentEmpty(formData.content)) {
      alert('Konten artikel tidak boleh kosong');
      return;
    }

    setSaving(true);

    try {
      // If there's a new image, send as FormData
      if (imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('slug', formData.slug);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('excerpt', formData.excerpt);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('published', formData.published.toString());
        formDataToSend.append('image', imageFile);

        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // Send as JSON if no new image
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`,
          {
            ...formData,
            published: formData.published,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      alert('Artikel berhasil diupdate!');
      router.push('/admin/articles');
    } catch (error: any) {
      console.error('Error updating article:', error);
      console.error('Error response:', error.response?.data);
      alert(`Gagal mengupdate artikel: ${error.response?.data?.error || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
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
          <Link href="/admin/articles" className="text-yellow-600 hover:text-yellow-700 text-sm mb-2 inline-block">
            ← Kembali ke Daftar Artikel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Artikel *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Masukkan judul artikel"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="judul-artikel-anda"
            />
            <p className="mt-1 text-sm text-gray-500">
              URL: /artikel-kesehatan/{formData.slug || 'slug-artikel'}
            </p>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penulis
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Contoh: Dr. Lina Wijaya"
            />
            <p className="mt-1 text-sm text-gray-500">
              Kosongkan untuk menggunakan "Admin" sebagai penulis
            </p>
          </div>

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
              <option value="penyakit">Penyakit</option>
              <option value="tindakan-medis">Tindakan Medis</option>
              <option value="kisah-pasien">Kisah Pasien</option>
            </select>
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

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none"
              placeholder="Ringkasan singkat artikel (opsional)"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Artikel *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Tulis konten artikel di sini..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Gunakan toolbar untuk mengatur format teks (bold, heading, list, dll).
            </p>
          </div>

          {/* Published Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
              Publikasikan artikel
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Update Artikel'}
            </button>
            <Link
              href="/admin/articles"
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
