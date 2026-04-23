'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Article, CompanyProfile } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import ProfessionalTeamSection from '@/components/home/ProfessionalTeamSection';
import TerapiPendukungSection from '@/components/home/TerapiPendukungSection';
import SolusiSection from '@/components/home/SolusiSection';
import KisahPasienSection from '@/components/home/KisahPasienSection';
import ArtikelKesehatanSection from '@/components/home/ArtikelKesehatanSection';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [penyakitArticles, setPenyakitArticles] = useState<Article[]>([]);
  const [tindakanMedisArticles, setTindakanMedisArticles] = useState<Article[]>([]);
  const [kisahPasienArticles, setKisahPasienArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    fetchArticles();
    fetchCompany();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get<Article[]>(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
      const publishedArticles = res.data.filter(a => a.published);
      
      // Filter artikel kategori penyakit (15 terbaru)
      const penyakit = publishedArticles
        .filter(a => a.category === 'penyakit')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 15);
      
      // Filter artikel kategori tindakan medis (3 terbaru)
      const tindakanMedis = publishedArticles
        .filter(a => a.category === 'tindakan-medis')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);
      
      // Filter artikel kategori kisah pasien
      const kisahPasien = publishedArticles
        .filter(a => a.category === 'kisah-pasien')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Artikel terbaru (semua kategori)
      const latest = publishedArticles
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 9);
      
      setPenyakitArticles(penyakit);
      setTindakanMedisArticles(tindakanMedis);
      setKisahPasienArticles(kisahPasien);
      setLatestArticles(latest);
      setArticles(publishedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCompany = async () => {
    try {
      const res = await axios.get<CompanyProfile>(`${process.env.NEXT_PUBLIC_API_URL}/company`);
      setCompany(res.data);
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Terapi Pendukung Section */}
      <TerapiPendukungSection articles={penyakitArticles} />

      {/* Professional Team Section */}
      <ProfessionalTeamSection />

      {/* Solusi Section */}
      <SolusiSection articles={tindakanMedisArticles} />

      {/* Kisah Pasien Section */}
      <KisahPasienSection articles={kisahPasienArticles} />

      {/* Artikel Kesehatan Section */}
      <ArtikelKesehatanSection articles={latestArticles} />
    </div>
  );
}
