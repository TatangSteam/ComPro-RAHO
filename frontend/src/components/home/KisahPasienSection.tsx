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

  // Helper function untuk mendapatkan excerpt singkat
  const getShortExcerpt = (article: Article): string => {
    // Jika ada excerpt dan tidak terlalu panjang, gunakan excerpt
    if (article.excerpt && article.excerpt.length <= 150) {
      return article.excerpt;
    }
    
    // Jika tidak ada excerpt atau terlalu panjang, ambil dari content
    const content = article.content;
    
    // Coba ambil kalimat pertama
    const firstSentence = content.split(/[.!?]/)[0];
    
    // Jika kalimat pertama terlalu panjang (>150 karakter), potong
    if (firstSentence.length > 150) {
      return firstSentence.substring(0, 147) + '...';
    }
    
    // Jika kalimat pertama terlalu pendek (<50 karakter), ambil 2 kalimat
    if (firstSentence.length < 50) {
      const sentences = content.split(/[.!?]/);
      const twoSentences = sentences.slice(0, 2).join('. ');
      
      if (twoSentences.length > 150) {
        return twoSentences.substring(0, 147) + '...';
      }
      
      return twoSentences + (sentences.length > 2 ? '...' : '.');
    }
    
    return firstSentence + '...';
  };

  // Dummy data jika belum ada artikel
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Juwita Tri Yanti',
      slug: 'juwita-tri-yanti',
      content: 'Berkat terapi di RAHO Club, saya sembuh total dari kanker tiroid. Setelah menjalani terapi nano bubble selama 6 bulan, kondisi saya membaik drastis.',
      excerpt: 'Berkat terapi di RAHO Club, saya sembuh total dari kanker tiroid.',
      imageUrl: '/assets/patient-1.jpg',
      category: 'kisah-pasien',
      published: true,
      author: 'Pasien RAHO Club',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Budi Santoso',
      slug: 'budi-santoso',
      content: 'Setelah stroke, terapi seluler di RAHO Club membuat saya pulih total. Kini saya bisa beraktivitas normal kembali tanpa bantuan.',
      excerpt: 'Setelah stroke, terapi seluler di RAHO Club membuat saya pulih total.',
      imageUrl: '/assets/patient-2.jpg',
      category: 'kisah-pasien',
      published: true,
      author: 'Pasien RAHO Club',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Siti Nurhaliza',
      slug: 'siti-nurhaliza',
      content: 'Diabetes saya terkontrol dan tidak perlu insulin lagi. Gula darah stabil dan hidup lebih berkualitas.',
      excerpt: 'Diabetes saya terkontrol dan tidak perlu insulin lagi.',
      imageUrl: '/assets/patient-3.jpg',
      category: 'kisah-pasien',
      published: true,
      author: 'Pasien RAHO Club',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Ahmad Hidayat',
      slug: 'ahmad-hidayat',
      content: 'Kolesterol tinggi saya turun drastis setelah terapi nano bubble. Dari 280 menjadi 180 dalam 3 bulan.',
      excerpt: 'Kolesterol tinggi saya turun drastis setelah terapi nano bubble.',
      imageUrl: '/assets/patient-4.jpg',
      category: 'kisah-pasien',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Pasien RAHO Club'
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
    <section className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Testimoni Kesembuhan
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kisah-kisah <span className="text-yellow-600">Kesembuhan</span> Pasien
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dengarkan langsung dari pasien kami yang telah merasakan manfaat terapi seluler dan teknologi nano bubble
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {currentArticles.map((article, index) => (
              <div key={article.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 h-full border border-gray-100 group-hover:border-yellow-200">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic">
                    "{getShortExcerpt(article)}"
                  </blockquote>

                  {/* Patient Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {article.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{article.title}</h4>
                      <p className="text-yellow-600 font-medium text-sm">{article.category === 'kisah-pasien' ? 'Pasien RAHO Club' : article.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 text-xs font-medium">Verified Patient</span>
                      </div>
                    </div>
                  </div>

                  {/* Condition Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Kondisi Teratasi
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-yellow-300 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-yellow-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Ingin Merasakan Kesembuhan Seperti Mereka?
              </h3>
              <p className="text-gray-600 mb-6">
                Bergabunglah dengan ribuan pasien yang telah merasakan manfaat terapi seluler dan teknologi nano bubble
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="https://wa.link/h2uyet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Konsultasi Gratis
                </Link>
                <Link
                  href="/artikel-kesehatan?category=kisah-pasien"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-full border-2 border-gray-200 hover:border-yellow-300 transition-colors"
                >
                  Baca Kisah Lainnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
