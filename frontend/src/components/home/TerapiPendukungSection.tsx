'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';

interface TerapiPendukungSectionProps {
  articles: Article[];
}

export default function TerapiPendukungSection({ articles }: TerapiPendukungSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  
  // Dummy data jika belum ada artikel
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Kolesterol Tinggi',
      slug: 'kolesterol-tinggi',
      content: '',
      excerpt: 'Terapi pendukung untuk mengatasi kolesterol tinggi dengan pendekatan holistik dan teknologi nano bubble.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Stroke',
      slug: 'stroke',
      content: '',
      excerpt: 'Pemulihan dan pencegahan stroke dengan terapi seluler berbasis bioteknologi molekuler.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Kanker',
      slug: 'kanker',
      content: '',
      excerpt: 'Terapi pendukung untuk pasien kanker dengan fokus pada regenerasi sel dan peningkatan imunitas.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Diabetes',
      slug: 'diabetes',
      content: '',
      excerpt: 'Manajemen diabetes dengan pendekatan komprehensif untuk kontrol gula darah optimal.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Penyakit Jantung',
      slug: 'penyakit-jantung',
      content: '',
      excerpt: 'Terapi pendukung untuk kesehatan jantung dengan teknologi regenerasi seluler.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Hipertensi',
      slug: 'hipertensi',
      content: '',
      excerpt: 'Pengelolaan tekanan darah tinggi dengan terapi holistik dan pemulihan seluler.',
      imageUrl: null,
      category: 'penyakit',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const displayArticles = articles.length > 0 ? articles : dummyArticles;
  const totalPages = Math.ceil(displayArticles.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentArticles = displayArticles.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  // Icon mapping untuk kategori penyakit
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('kolesterol')) {
      return '❤️';
    } else if (title.toLowerCase().includes('stroke')) {
      return '🧠';
    } else if (title.toLowerCase().includes('kanker')) {
      return '🎗️';
    } else if (title.toLowerCase().includes('diabetes')) {
      return '💉';
    } else if (title.toLowerCase().includes('jantung')) {
      return '💓';
    }
    return '🏥';
  };

  return (
    <section className="bg-[#1a1a1a] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Berperan sebagai <span className="text-yellow-500">Terapi Pendukung</span>
          </h2>
          <Link 
            href="/artikel-kesehatan?category=penyakit"
            className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2 text-sm sm:text-base"
          >
            Lihat Semua
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
            {currentArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white text-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-shadow"
              >
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">
                  {getIcon(article.title)}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{article.title}</h3>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {article.excerpt || 'Pelajari lebih lanjut tentang terapi pendukung untuk kondisi ini.'}
                </p>

                {/* CTA Link */}
                <Link 
                  href="/artikel-kesehatan"
                  className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-2 text-sm sm:text-base"
                >
                  Pelajari
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
