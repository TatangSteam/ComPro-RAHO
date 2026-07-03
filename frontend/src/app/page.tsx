'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '@/types';
import NanoBubbleFeatureSection from '@/components/home/NanoBubbleFeatureSection';
import HeroSection2 from '@/components/home/HeroSection2';
import HeroSection3 from '@/components/home/HeroSection3';
import LocationsSection from '@/components/home/LocationsSection';
import IMICollaborationSection from '@/components/home/IMICollaborationSection';
import PagePreloader from '@/components/Shared/PagePreloader';

// Heavy background assets rendered via CSS backgroundImage (not covered by
// next/image), preloaded so the page doesn't reveal with backgrounds
// popping in one by one.
const PRELOAD_IMAGES = [
  '/assets/Hero/Hero-Section.gif',
  '/assets/Hero/Section1BG.svg',
  '/assets/Hero/Section2,3,LokasiKmiBg.svg',
  '/assets/Section5/Section5BG.png',
  '/assets/FOOTER1.png',
  '/assets/cta-background.jpg',
];

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
    <main 
      className="home-scroll-snap relative" 
      aria-label="Beranda"
      style={{
        background: '#ffffff',
      }}
    >
      <PagePreloader images={PRELOAD_IMAGES} />

      {/* Section 1-4: Unified Background Container with Animated Gradient */}
      <div className="relative animated-gold-gradient" style={{ 
        background: 'transparent',
        boxShadow: '0 4px 6px -1px rgba(182, 145, 51, 0.15), 0 2px 4px -1px rgba(182, 145, 51, 0.1)'
      }}>
        {/* Unified Animated Background - Bubbles for Sections 1-4 */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="rising-bubbles" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                className="rising-bubble" 
                key={index}
              />
            ))}
          </div>
        </div>
        {/* Section 1: Nano Bubble - Teknologi Inti */}
        <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
          <NanoBubbleFeatureSection />
        </div>

        {/* Section 2: Produk & Layanan */}
        <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
          <HeroSection2 />
        </div>

        {/* Section 3: Keunggulan & Manfaat */}
        <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
          <HeroSection3 />
        </div>

        {/* Section 4: Lokasi Kami */}
        <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
          <LocationsSection />
        </div>
      </div>

      {/* Section 5: IMI Collaboration */}
      <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
        <IMICollaborationSection />
      </div>
    </main>
  );
}
