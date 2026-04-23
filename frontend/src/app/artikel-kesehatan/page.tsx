'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '@/types';
import CategoryFilter from '@/components/artikel/CategoryFilter';
import ArticleCard from '@/components/artikel/ArticleCard';
import Pagination from '@/components/artikel/Pagination';

type CategoryFilterType = 'semua' | 'penyakit' | 'tindakan-medis' | 'kisah-pasien';

export default function ArtikelKesehatan() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    // Reset to page 1 when category changes
    setCurrentPage(1);
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      setArticles(res.data.filter(a => a.published));
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const filteredArticles = selectedCategory === 'semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Artikel Kesehatan
        </h1>
        
        {/* Category Filters */}
        <div className="mb-10 md:mb-12">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        {/* Articles Grid */}
        {currentArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Tidak ada artikel untuk kategori ini
          </div>
        )}
      </div>
    </div>
  );
}
