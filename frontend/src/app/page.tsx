'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import NanoBubbleInfoSection from '@/components/home/NanoBubbleInfoSection';
import NanoBubbleFeatureSection from '@/components/home/NanoBubbleFeatureSection';
import HeroSection2 from '@/components/home/HeroSection2';
import HeroSection3 from '@/components/home/HeroSection3';
import Footer from '@/components/layout/Footer';

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
    <main className="home-scroll-snap" aria-label="Beranda">
      <div className="home-snap-panel">
        <HeroSection />
      </div>

      <div className="home-snap-panel">
        <NanoBubbleInfoSection />
      </div>

      <div className="home-snap-panel">
        <NanoBubbleFeatureSection />
      </div>

      <div className="home-snap-panel">
        <HeroSection2 />
      </div>

      <div className="home-snap-panel">
        <HeroSection3 />
      </div>

      <div className="home-snap-panel home-snap-panel-footer">
        <Footer />
      </div>
    </main>
  );
}
