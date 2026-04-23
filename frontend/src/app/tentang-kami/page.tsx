'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from '@/types';
import TabNavigation from '@/components/tentang-kami/TabNavigation';
import UmumSection from '@/components/tentang-kami/UmumSection';
import PelayananSection from '@/components/tentang-kami/PelayananSection';
import TeknologiSection from '@/components/tentang-kami/TeknologiSection';
import LokasiSection from '@/components/tentang-kami/LokasiSection';

export default function TentangKami() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState('umum');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get<Location[]>(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      setLocations(res.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation activeTab={activeTab} onTabClick={scrollToSection} />
      <UmumSection />
      <PelayananSection />
      <TeknologiSection />
      <LokasiSection locations={locations} />
    </div>
  );
}
