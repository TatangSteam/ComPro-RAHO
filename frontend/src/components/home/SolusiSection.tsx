'use client';

import Link from 'next/link';
import { Article } from '@/types';

interface SolusiSectionProps {
  articles: Article[];
}

export default function SolusiSection({ articles }: SolusiSectionProps) {
  // Dummy data jika belum ada artikel
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Terapi Nano Bubble',
      slug: 'terapi-nano-bubble',
      content: '',
      excerpt: 'Teknologi penghantaran gas terlarut berukuran nano untuk penetrasi optimal pada sistem vaskular mikro.',
      imageUrl: '/assets/nano-bubble.jpg',
      category: 'tindakan-medis',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Terapi Gasotransmitter',
      slug: 'terapi-gasotransmitter',
      content: '',
      excerpt: 'Terapi menggunakan molekul gas untuk meningkatkan fungsi seluler dan regenerasi jaringan tubuh.',
      imageUrl: null,
      category: 'tindakan-medis',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Microcirculation Optimization Model',
      slug: 'microcirculation-optimization',
      content: '',
      excerpt: 'Model optimalisasi mikrosirkulasi untuk meningkatkan aliran darah dan oksigenasi jaringan.',
      imageUrl: null,
      category: 'tindakan-medis',
      published: true,
      author: 'Tim Medis RAHO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const displayArticles = articles.length > 0 ? articles.slice(0, 3) : dummyArticles;
  const [firstArticle, ...restArticles] = displayArticles;

  // Icon mapping
  const getIcon = () => {
    return '📋';
  };

  return (
    <section className="bg-[#1a1a1a] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Solusi yang Kami Gunakan
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* First Article - Large Card with Image */}
          {firstArticle && (
            <Link 
              href={`/artikel-kesehatan/${firstArticle.slug}`}
              className="lg:col-span-2 bg-gray-100 text-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">
                    {getIcon()}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{firstArticle.title}</h3>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {firstArticle.excerpt || 'Pelajari lebih lanjut tentang solusi medis ini.'}
                  </p>
                </div>

                {/* Image */}
                {firstArticle.imageUrl && (
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden h-48 sm:h-56 md:h-64">
                    <img 
                      src={firstArticle.imageUrl} 
                      alt={firstArticle.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* Rest Articles - Small Cards without Image */}
          {restArticles.map((article) => (
            <Link
              key={article.id}
              href={`/artikel-kesehatan/${article.slug}`}
              className="bg-gray-100 text-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">
                {getIcon()}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{article.title}</h3>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-4">
                {article.excerpt || 'Pelajari lebih lanjut tentang solusi medis ini.'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
