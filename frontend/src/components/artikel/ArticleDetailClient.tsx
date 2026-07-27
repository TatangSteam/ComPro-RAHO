'use client';

import Link from 'next/link';
import Script from 'next/script';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  MessageCircle,
  Tag,
  User,
} from 'lucide-react';
import { Article } from '@/types';
import RelatedArticlesSection from '@/components/artikel/RelatedArticlesSection';
import AuthImage from '@/components/Shared/AuthImage';
import { renderArticleContent } from '@/lib/sanitizeHtml';
import {
  formatArticleDate,
  getArticleSummary,
  getCategoryLabel,
  getReadingTime,
} from '@/lib/articleMeta';

export default function ArticleDetailClient({
  initialArticle,
  initialRelatedArticles,
}: {
  initialArticle: Article;
  initialRelatedArticles: Article[];
}) {
  const article = initialArticle;
  const relatedArticles = initialRelatedArticles;

  const summary = getArticleSummary(article);
  const readingTime = getReadingTime(article.content);
  const categoryLabel = getCategoryLabel(article.category);
  const publishedDate = formatArticleDate(article.createdAt);
  const updatedDate = formatArticleDate(article.updatedAt);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${article.imageUrl}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RAHO Club Premier',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rahopremier.id/assets/icon.png',
      },
    },
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    description: summary.substring(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rahopremier.id/artikel-kesehatan/${article.slug}`,
    },
  };

  return (
    <>
      <Script
        id="article-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="min-h-screen bg-[#f8f6f1]">
        <section className="relative overflow-hidden bg-[#171717] text-white">
          {article.imageUrl && (
            <AuthImage
              src={article.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <Link
              href="/artikel-kesehatan"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:text-[#F4D98A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Artikel Kesehatan
            </Link>

            <div className="max-w-4xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#F4D98A] px-3 py-1.5 text-sm font-bold text-[#171717]">
                  <Tag className="h-4 w-4" />
                  {categoryLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/80 backdrop-blur">
                  <Clock className="h-4 w-4 text-[#F4D98A]" />
                  {readingTime} menit baca
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              {summary && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
                  {summary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/75">
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
                  <User className="h-4 w-4 text-[#F4D98A]" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
                  <CalendarDays className="h-4 w-4 text-[#F4D98A]" />
                  {publishedDate}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
            <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-[#eadfca] bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B69133]">
                  Info Artikel
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Kategori</dt>
                    <dd className="mt-1 font-semibold text-gray-950">{categoryLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Penulis</dt>
                    <dd className="mt-1 font-semibold text-gray-950">{article.author}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Dipublikasikan</dt>
                    <dd className="mt-1 font-semibold text-gray-950">{publishedDate}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Diperbarui</dt>
                    <dd className="mt-1 font-semibold text-gray-950">{updatedDate}</dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-lg bg-[#171717] p-4 text-white">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4D98A] text-[#171717]">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">Butuh arahan lebih lanjut?</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Diskusikan kondisi Anda bersama tim RAHO Premier.
                  </p>
                  <a
                    href="https://wa.link/7hzabn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#F4D98A] px-4 py-2 text-sm font-bold text-[#171717] transition-colors hover:bg-[#D6B85A]"
                  >
                    Konsultasi Gratis
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>

            <article className="order-1 min-w-0 overflow-hidden rounded-lg border border-[#eadfca] bg-white shadow-sm lg:order-2">
              {article.imageUrl && (
                <figure className="border-b border-[#eadfca] bg-[#f4efe4]">
                  <AuthImage
                    src={article.imageUrl}
                    alt={article.title}
                    data-lightbox-image="true"
                    data-lightbox-title={article.title}
                    className="h-64 w-full cursor-zoom-in object-cover sm:h-96 lg:h-[480px]"
                  />
                </figure>
              )}

              <div className="min-w-0 px-5 py-8 sm:p-8 lg:p-10">
                <div
                  className="prose prose-base max-w-none min-w-0 text-gray-700 prose-headings:font-bold prose-headings:text-gray-950 prose-h2:mt-10 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:leading-8 prose-a:text-[#B69133] prose-a:no-underline prose-strong:text-gray-950 prose-blockquote:border-l-[#B69133] prose-blockquote:bg-[#fff8e6] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-li:marker:text-[#B69133] sm:prose-lg [&_*]:max-w-full [&_*]:!whitespace-normal [&_*]:break-words [&_*]:[overflow-wrap:anywhere] [&_*]:[word-break:break-word] [&_a:hover]:text-[#8B6F2E]"
                  dangerouslySetInnerHTML={{ __html: renderArticleContent(article.content) }}
                />
              </div>
            </article>
          </div>
        </section>
      </main>

      <RelatedArticlesSection articles={relatedArticles} currentArticleId={article.id} />
    </>
  );
}
