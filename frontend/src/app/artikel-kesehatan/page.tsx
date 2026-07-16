'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BookOpen, FileText, Loader2, Search } from 'lucide-react';
import { Article } from '@/types';
import CategoryFilter from '@/components/artikel/CategoryFilter';
import ArticleCard from '@/components/artikel/ArticleCard';
import Pagination from '@/components/artikel/Pagination';
import {
  ARTICLE_CATEGORIES,
  CategoryFilterType,
  getCategoryDescription,
  getCategoryLabel,
  parseCategoryFilter,
} from '@/lib/articleMeta';

export default function ArtikelKesehatanPage() {
  return (
    <Suspense fallback={<ArtikelKesehatanFallback />}>
      <ArtikelKesehatanContent />
    </Suspense>
  );
}

function ArtikelKesehatanFallback() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="bg-[#171717] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-[#F4D98A]" />
          <span className="text-sm font-semibold text-white/75">Memuat artikel kesehatan...</span>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-28 animate-pulse rounded-lg bg-white shadow-sm" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[410px] animate-pulse rounded-lg bg-white shadow-sm" />
          ))}
        </div>
      </section>
    </main>
  );
}

function ArtikelKesehatanContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const articlesPerPage = 9;

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    setSelectedCategory(parseCategoryFilter(searchParams.get('category')));
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      setArticles(res.data.filter((article) => article.published));
    } catch (error) {
      console.error('Error fetching articles:', error);
      setErrorMessage('Artikel belum dapat dimuat. Silakan coba beberapa saat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const categoryCounts = useMemo(() => {
    return articles.reduce<Partial<Record<CategoryFilterType, number>>>(
      (counts, article) => {
        const category = parseCategoryFilter(article.category);
        counts.semua = (counts.semua ?? 0) + 1;
        if (category !== 'semua') {
          counts[category] = (counts[category] ?? 0) + 1;
        }
        return counts;
      },
      { semua: 0, penyakit: 0, 'tindakan-medis': 0, 'kisah-pasien': 0 },
    );
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return selectedCategory === 'semua'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);
  const visibleStart = filteredArticles.length === 0 ? 0 : startIndex + 1;
  const visibleEnd = Math.min(endIndex, filteredArticles.length);

  const handleCategoryChange = (category: CategoryFilterType) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(searchParams.toString());
    if (category === 'semua') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="relative overflow-hidden bg-[#171717] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: 'url("/assets/cta-background.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F4D98A] backdrop-blur">
              <BookOpen className="h-4 w-4" />
              Pusat Edukasi Kesehatan RAHO
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Kesehatan, Teknologi, dan Kisah Inspiratif
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Jelajahi artikel tentang berbagai penyakit, perkembangan teknologi Nano Bubble, serta
              kisah inspiratif dari para member yang membagikan pengalaman mereka dalam perjalanan
              menuju hidup yang lebih sehat.
            </p>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold text-[#F4D98A]">{articles.length}</p>
              <p className="mt-1 text-sm text-white/70">Artikel tersedia</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold text-[#F4D98A]">{ARTICLE_CATEGORIES.length - 1}</p>
              <p className="mt-1 text-sm text-white/70">Kategori utama</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold text-[#F4D98A]">5+</p>
              <p className="mt-1 text-sm text-white/70">Menit baca rata-rata</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mb-8 rounded-lg border border-[#eadfca] bg-white p-4 shadow-sm sm:p-5 md:mb-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B69133]">
                Pilih Topik
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
                {getCategoryLabel(selectedCategory)}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {getCategoryDescription(selectedCategory)}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#f8f6f1] px-3 py-2 text-sm font-medium text-gray-600">
              <FileText className="h-4 w-4 text-[#B69133]" />
              {filteredArticles.length} artikel
            </div>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts}
          />
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-600">
            Menampilkan {visibleStart}-{visibleEnd} dari {filteredArticles.length} artikel
          </p>
          {selectedCategory !== 'semua' && (
            <button
              onClick={() => handleCategoryChange('semua')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B69133] transition-colors hover:text-[#8B6F2E]"
            >
              <Search className="h-4 w-4" />
              Lihat semua artikel
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[410px] animate-pulse rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 h-48 rounded-lg bg-gray-200" />
                <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mb-3 h-6 w-full rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : errorMessage ? (
          <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
            <p className="text-base font-semibold text-gray-950">{errorMessage}</p>
            <button
              onClick={fetchArticles}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8B6F2E]"
            >
              <Loader2 className="h-4 w-4" />
              Muat Ulang
            </button>
          </div>
        ) : currentArticles.length > 0 ? (
          <>
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-[#d8c68d] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff8e6] text-[#B69133]">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-950">Artikel belum tersedia</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Belum ada artikel untuk kategori ini. Coba pilih kategori lain atau kembali ke semua
              artikel.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
