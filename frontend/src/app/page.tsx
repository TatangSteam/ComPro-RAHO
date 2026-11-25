'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '@/types';
import NanoBubbleFeatureSection from '@/components/home/NanoBubbleFeatureSection';
import WelcomeHeroSection from '@/components/home/WelcomeHeroSection';
import HeroSection2 from '@/components/home/HeroSection2';
import HeroSection3 from '@/components/home/HeroSection3';
import ProgramJourneySection from '@/components/home/ProgramJourneySection';
import LocationsSection from '@/components/home/LocationsSection';
import KisahPasienSection from '@/components/home/KisahPasienSection';
import IMICollaborationSection from '@/components/home/IMICollaborationSection';
import PagePreloader from '@/components/Shared/PagePreloader';

// Only preload the initially visible hero; other panels load as needed.
const PRELOAD_IMAGES = [
  '/assets/Hero/wellness-consultation.webp',
];

export default function Home() {
  const [kisahPasienArticles, setKisahPasienArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      const publishedArticles = res.data.filter(a => a.published);
      
      // Tampilkan enam kisah pasien terbaru yang sudah dipublikasikan.
      const kisahPasien = publishedArticles
        .filter(a => a.category === 'kisah-pasien')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
      
      setKisahPasienArticles(kisahPasien);
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

      <div className="home-snap-panel relative">
        <WelcomeHeroSection />
      </div>

      {/* Shared background for the introduction and program panels. */}
      <div className="relative animated-gold-gradient" style={{ 
        background: 'transparent',
        boxShadow: '0 4px 6px -1px rgba(182, 145, 51, 0.15), 0 2px 4px -1px rgba(182, 145, 51, 0.1)'
      }}>
        {/* Unified animated background */}
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

        {/* Section 4: Perjalanan Program */}
        <div className="home-snap-panel relative">
          <ProgramJourneySection />
        </div>

        {/* Section 5: Lokasi Kami */}
        <div className="home-snap-panel relative" style={{ background: 'transparent' }}>
          <LocationsSection />
        </div>
      </div>

      {/* Section 6: Kisah Pasien */}
      <div className="home-snap-panel relative">
        <KisahPasienSection articles={kisahPasienArticles} />
      </div>

      {/* Section 7: IMI Collaboration */}
      <div className="home-snap-panel home-snap-panel-footer relative">
        <IMICollaborationSection />
      </div>
    </main>
  );
}
