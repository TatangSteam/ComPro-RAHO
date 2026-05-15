import Link from 'next/link';
import AuthImage from '@/components/Shared/AuthImage';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'penyakit': 'Penyakit',
      'tindakan-medis': 'Tindakan Medis',
      'kisah-pasien': 'Kisah Pasien',
    };
    return labels[category] || 'Health Tips';
  };

  return (
    <Link
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
              month: 'short'
            })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-medium text-sm">
            {article.author.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm sm:text-base text-gray-700 font-medium">{article.author}</span>
        </div>
      </div>
    </Link>
  );
}
