'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthImage from '@/components/Shared/AuthImage';
import { Article } from '@/types';

interface ArtikelKesehatanSectionProps {
  articles: Article[];
}

export default function ArtikelKesehatanSection({ articles }: ArtikelKesehatanSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentArticles = articles.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'penyakit': 'Kesehatan',
      'tindakan-medis': 'Teknologi',
      'kisah-pasien': 'Kisah Inspiratif',
      'umum': 'Kesehatan',
    };
    return labels[category] || 'Kesehatan';
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Artikel <span className="text-yellow-600">Kesehatan</span>
          </h2>
          <Link 
            href="/artikel-kesehatan"
            className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-2 text-sm sm:text-base"
          >
            Lihat Semua
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Articles Carousel */}
        {articles.length > 0 ? (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="group"
                >
                  {/* Image */}
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 h-48 sm:h-52 md:h-56 bg-gray-200">
                    {article.imageUrl ? (
                      <AuthImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
                        <span className="text-4xl sm:text-5xl md:text-6xl">📰</span>
                      </div>
                    )}
                  </div>

                  {/* Category & Date */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-yellow-600 font-medium">{getCategoryLabel(article.category)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 truncate">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt || 'Baca artikel kesehatan terbaru dari kami untuk informasi kesehatan yang bermanfaat.'}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/artikel-kesehatan/${article.slug}`}
                    className="text-yellow-600 font-medium text-xs sm:text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read More
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-yellow-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12 text-sm sm:text-base">
            Belum ada artikel kesehatan tersedia
          </div>
        )}
      </div>
    </section>
  );
}
