'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types';
import ArticleCard from '@/components/artikel/ArticleCard';

interface RelatedArticlesSectionProps {
  articles: Article[];
  currentArticleId: string;
}

export default function RelatedArticlesSection({
  articles,
  currentArticleId,
}: RelatedArticlesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const relatedArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 6);
  const articlesPerSlide = 3;
  const totalSlides = Math.ceil(relatedArticles.length / articlesPerSlide);

  if (relatedArticles.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentArticles = relatedArticles.slice(
    currentIndex * articlesPerSlide,
    (currentIndex + 1) * articlesPerSlide,
  );

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#B69133]">
              Rekomendasi
            </p>
            <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl md:text-4xl">
              Artikel Kesehatan Terkait
            </h2>
          </div>
          <Link
            href="/artikel-kesehatan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B69133] transition-colors hover:text-[#8B6F2E]"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {totalSlides > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-[#D6B85A] hover:text-[#B69133]"
              aria-label="Artikel sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-[#B69133]' : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Ke kelompok artikel ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#171717] text-white shadow-sm transition-colors hover:bg-[#8B6F2E]"
              aria-label="Artikel berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
