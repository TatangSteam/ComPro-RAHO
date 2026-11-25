'use client';

import { useCallback, useEffect, useState } from 'react';
import PartnerNetworkSection from '@/components/tentang-kami/PartnerNetworkSection';
import type { Location } from '@/types';

export default function LocationsSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchLocations = async () => {
      setLoading(true);
      setError(false);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/locations`, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        const locationData = data.locations || data;
        if (!Array.isArray(locationData)) throw new Error('Invalid locations response');
        if (!controller.signal.aborted) setLocations(locationData);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          console.error('Error fetching locations:', fetchError);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void fetchLocations();
    return () => controller.abort();
  }, [attempt]);

  return <PartnerNetworkSection locations={locations} sectionId="locations" loading={loading} error={error} onRetry={retry} />;
}
