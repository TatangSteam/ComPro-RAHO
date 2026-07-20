'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { stripHtml } from '@/lib/sanitizeHtml';

interface HeroSection5Props {
  articles: Article[];
}

export default function HeroSection5({ articles }: HeroSection5Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter only penyakit articles instead of tindakan-medis
  const penyakitArticles = articles.filter(a => a.category === 'penyakit').slice(0, 6);
  
  // Show 4 cards at a time on desktop, 1 on mobile
  const cardsPerView = 4;
  const maxIndex = Math.max(0, penyakitArticles.length - cardsPerView);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section 
      className="relative py-56 md:py-64 overflow-hidden border-0"
      style={{
        backgroundImage: 'url(/assets/Section5/Section5BG.png)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1f2937', // Fallback color
        marginTop: '-2px',
        marginBottom: '-2px',
        minHeight: '1000px', // Minimum height untuk menampilkan wallpaper penuh
      }}
    >
      {/* Dark overlay for better contrast - reduced for better background visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/25 to-gray-900/30" style={{ borderTop: 'none', borderBottom: 'none' }}></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-start mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm border border-yellow-500 px-6 py-3 rounded-full">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-yellow-500">Edukasi untuk hidup lebih sehat</span>
          </div>
        </div>

        {/* Header with Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          {/* Title */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Area Fokus Kesehatan{' '}
              <span className="text-yellow-500">Kami</span>
            </h2>
            <div className="bg-yellow-600/20 border-l-4 border-yellow-500 p-4 mb-4 max-w-3xl rounded-r-lg backdrop-blur-sm">
              <p className="text-sm font-medium text-yellow-300">
                This section is temporarily unavailable while we update our partner testimonials and success stories. We appreciate your patience and look forward to sharing them with you soon.
              </p>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            </p>
            <p className="text-lg text-gray-300 max-w-3xl">
              ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/artikel-kesehatan?category=penyakit"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-yellow-500/10 text-yellow-500 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 border-2 border-yellow-500 whitespace-nowrap"
          >
            Lihat Semua
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Articles Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-yellow-500 text-white shadow-xl hover:scale-110'
              }`}
              aria-label="Previous articles"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-xl hover:scale-110'
              }`}
              aria-label="Next articles"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden px-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {penyakitArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/artikel-kesehatan/${article.slug}`}
                  className="flex-shrink-0 w-full md:w-[calc(25%-12px)] group"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    {article.imageUrl ? (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          data-lightbox-image="true"
                          data-lightbox-src={article.imageUrl}
                          data-lightbox-title={article.title}
                          className="cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4 flex-1">
                        {article.excerpt || truncateText(stripHtml(article.content), 120)}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-yellow-500 font-medium text-sm">
                        Pelajari Selengkapnya
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-yellow-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              </p>
              <p className="text-gray-300 leading-relaxed">
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
