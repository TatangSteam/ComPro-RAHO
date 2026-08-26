'use client';

import { useEffect, useState } from 'react';
import PartnerNetworkSection from '@/components/tentang-kami/PartnerNetworkSection';
import type { Location } from '@/types';

export default function LocationsSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/locations`);

        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }

        const data = await response.json();
        setLocations(data.locations || data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchLocations();
  }, []);

  if (loading) {
    return (
      <section id="locations" className="relative min-h-[calc(100dvh-5rem)] scroll-mt-20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="animate-pulse text-center">
            <div className="mx-auto mb-4 h-8 w-64 rounded bg-gray-200" />
            <div className="mx-auto h-4 w-full max-w-96 rounded bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  return <PartnerNetworkSection locations={locations} sectionId="locations" />;
}
