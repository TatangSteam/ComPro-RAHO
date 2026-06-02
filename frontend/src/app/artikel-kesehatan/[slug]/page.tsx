'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { Article } from '@/types';
import RelatedArticlesSection from '@/components/artikel/RelatedArticlesSection';
import AuthImage from '@/components/Shared/AuthImage';

export default function ArtikelDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (params.slug) {
      fetchArticle();
      fetchRelatedArticles();
    }
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get<Article>(`${process.env.NEXT_PUBLIC_API_URL}/articles/${params.slug}`);
      setArticle(res.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      setRelatedArticles(res.data.filter(a => a.published));
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Schema.org Article structured data for SEO
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
    description: article.content.substring(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rahopremier.id/artikel-kesehatan/${article.slug}`,
    },
  };

  return (
    <>
      {/* Schema.org Article Structured Data */}
      <Script
        id="article-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/artikel-kesehatan" 
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 sm:mb-12 shadow-lg">
              <AuthImage
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 sm:h-96 md:h-[500px] object-cover"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-600 flex items-center justify-center text-white font-medium">
                {article.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-500">Author</p>
                <p className="font-medium text-gray-900">{article.author}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm sm:text-base">
                {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm sm:text-base">5 min read</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              {article.title}
            </h2>
            
            <div className="text-gray-700 leading-relaxed space-y-4 sm:space-y-6 text-sm sm:text-base whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </article>
      </div>

      {/* Related Articles Section */}
      <RelatedArticlesSection articles={relatedArticles} currentArticleId={article.id} />
    </>
  );
}
