'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/types';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchArticle();
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Back to Home
        </Link>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <p className="text-gray-500 mb-8">
              Published: {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
