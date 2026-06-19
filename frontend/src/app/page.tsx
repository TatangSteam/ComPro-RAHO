'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import HeroSection2 from '@/components/home/HeroSection2';
import HeroSection3 from '@/components/home/HeroSection3';

export default function Home() {
  const [tindakanMedisArticles, setTindakanMedisArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      const publishedArticles = res.data.filter(a => a.published);
      
      // Filter artikel kategori tindakan medis (6 terbaru untuk Section 5)
      const tindakanMedis = publishedArticles
        .filter(a => a.category === 'tindakan-medis')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
      
      setTindakanMedisArticles(tindakanMedis);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Hero Section 2 */}
      <HeroSection2 />

      {/* Hero Section 3 */}
      <HeroSection3 />


    </div>
  );
}
