'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthImage from '@/components/Shared/AuthImage';
import { Article } from '@/types';

interface RelatedArticlesSectionProps {
  articles: Article[];
  currentArticleId: string;
}

export default function RelatedArticlesSection({ articles, currentArticleId }: RelatedArticlesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter out current article and limit to related articles
  const relatedArticles = articles.filter(article => article.id !== currentArticleId).slice(0, 6);
  const articlesPerSlide = 3;
  const totalSlides = Math.ceil(relatedArticles.length / articlesPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentArticles = relatedArticles.slice(
    currentIndex * articlesPerSlide,
    (currentIndex + 1) * articlesPerSlide
  );

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'penyakit': 'Diet Tips',
      'tindakan-medis': 'Health Tips',
      'kisah-pasien': 'Patient Story',
      'umum': 'Health Tips',
    };
    return labels[category] || 'Health Tips';
  };

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Lihat Artikel <span className="text-yellow-600">Kesehatan lainnya</span>
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
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {currentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel-kesehatan/${article.slug}`}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                  {article.imageUrl ? (
                    <AuthImage
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
                      <span className="text-5xl sm:text-6xl">📰</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm mb-3">
                    <span className="text-yellow-600 font-medium">
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-yellow-600 font-medium text-sm group-hover:gap-3 transition-all">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
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
          )}
        </div>
      </div>
    </section>
  );
}
