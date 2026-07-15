'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from '@/types';
import TabNavigation from '@/components/tentang-kami/TabNavigation';
import UmumSection from '@/components/tentang-kami/UmumSection';
import PartnerNetworkSection from '@/components/tentang-kami/PartnerNetworkSection';

export default function TentangKami() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState('umum');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get<any>(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      // Backend returns { success: true, locations: [...] }
      const locationData = res.data.locations || res.data;
      setLocations(locationData);
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
      <div className="relative overflow-hidden bg-[#fff7e8]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(214,184,90,0.18)_0,rgba(214,184,90,0)_26%),radial-gradient(circle_at_88%_12%,rgba(182,145,51,0.14)_0,rgba(182,145,51,0)_24%),radial-gradient(circle_at_8%_58%,rgba(214,184,90,0.13)_0,rgba(214,184,90,0)_24%),linear-gradient(180deg,rgba(255,250,240,0.96)_0%,rgba(255,255,255,0.94)_34%,rgba(255,247,232,0.96)_72%,rgba(255,255,255,0.92)_100%)]" />
        <div className="absolute right-0 top-0 hidden h-full w-[38%] opacity-30 lg:block">
          <div className="h-full w-full bg-[radial-gradient(circle,rgba(182,145,51,0.25)_1px,transparent_1.8px)] bg-[length:20px_20px]" />
        </div>
        <div className="absolute left-0 top-0 hidden h-full w-[28%] opacity-[0.18] lg:block">
          <div className="h-full w-full bg-[radial-gradient(circle,rgba(214,184,90,0.2)_1px,transparent_1.8px)] bg-[length:24px_24px]" />
        </div>
        <div className="relative">
          <TabNavigation activeTab={activeTab} onTabClick={scrollToSection} />
          <UmumSection />
          <PartnerNetworkSection locations={locations} />
        </div>
      </div>
    </div>
  );
}
