'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';

interface KisahPasienSectionProps {
  articles: Article[];
}

export default function KisahPasienSection({ articles }: KisahPasienSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  // Dummy data jika belum ada artikel
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Juwita Tri Yanti',
      slug: 'juwita-tri-yanti',
      content: 'Dokter telah mendiagnosa bahwa hidup saya tinggal beberapa bulan lagi. Namun, berkat terapi di RAHO-Club, saya berhasil mengalami perbaikan total dari kanker tiroid.',
      excerpt: 'Kanker Tiroid',
      imageUrl: '/assets/patient-1.jpg',
      author: 'Juwita Tri Yanti',
      category: 'kisah-pasien',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ester Howard',
      slug: 'ester-howard',
      content: 'Managing diabetes used to be challenging, but the treatment made it much easier. Now I can maintain healthy schedules lifestyle.',
      excerpt: 'Project Manager',
      imageUrl: '/assets/patient-2.jpg',
      author: 'Ester Howard',
      category: 'kisah-pasien',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Budi Santoso',
      slug: 'budi-santoso',
      content: 'Setelah stroke, saya pikir hidup saya berakhir. Namun dengan terapi di RAHO-Club, saya bisa kembali beraktivitas normal.',
      excerpt: 'Stroke',
      imageUrl: '/assets/patient-3.jpg',
      author: 'Budi Santoso',
      category: 'kisah-pasien',
      published: true,
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

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">
          Kisah-kisah <span className="text-yellow-600">Kesembuhan</span> Pasien
        </h2>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 md:mb-8">
            {currentArticles.map((article) => (
              <div key={article.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Patient Image */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden bg-yellow-600">
                    {article.imageUrl ? (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-3xl sm:text-4xl">
                        👤
                      </div>
                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    "{article.content || 'Testimoni pasien tentang kesembuhan mereka.'}"
                  </p>
                  <div>
                    <h4 className="font-bold text-yellow-600 text-base sm:text-lg">{article.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">{article.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={prevSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
