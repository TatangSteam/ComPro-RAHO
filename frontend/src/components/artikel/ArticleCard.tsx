import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock, Newspaper } from 'lucide-react';
import AuthImage from '@/components/Shared/AuthImage';
import { Article } from '@/types';
import {
  formatArticleDate,
  getArticleSummary,
  getCategoryLabel,
  getReadingTime,
} from '@/lib/articleMeta';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const readingTime = getReadingTime(article.content);
  const summary = getArticleSummary(article);
  const authorInitial = (article.author || 'R').charAt(0).toUpperCase();

  return (
    <Link
      href={`/artikel-kesehatan/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B85A]/70 hover:shadow-xl hover:shadow-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B85A]"
    >
      <div className="relative h-52 overflow-hidden bg-[#f4efe4] sm:h-56">
        {article.imageUrl ? (
          <AuthImage
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#fff8e6] via-white to-[#ead9a4]">
            <Newspaper className="h-14 w-14 text-[#B69133]" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-[#8B6F2E] shadow-sm backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-[#B69133]" />
            {formatArticleDate(article.createdAt, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#B69133]" />
            {readingTime} menit baca
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-gray-950 transition-colors group-hover:text-[#B69133] sm:text-xl">
          {article.title}
        </h3>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {summary || 'Baca artikel kesehatan terbaru dari RAHO Club Premier.'}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#171717] text-sm font-semibold text-[#F4D98A]">
              {authorInitial}
            </div>
            <span className="truncate text-sm font-semibold text-gray-800">{article.author}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#B69133]">
            Baca
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
