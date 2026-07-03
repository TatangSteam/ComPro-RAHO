'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  mapUrl?: string;
}

export default function LocationsSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/locations`);
      if (!response.ok) throw new Error('Failed to fetch locations');
      
      const data = await response.json();
      if (data.success && data.locations) {
        setLocations(data.locations);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const nextLocation = () => {
    setCurrentIndex((prev) => (prev + 1) % locations.length);
  };

  const prevLocation = () => {
    setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  if (loading) {
    return (
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          background: 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || locations.length === 0) {
    return null;
  }

  const currentLocation = locations[currentIndex];

  return (
    <section 
      id="locations"
      className="relative py-20 overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      {/* SVG Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/Hero/Section2,3,LokasiKmiBg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lokasi{' '}
            <span className="bg-gradient-to-r from-[#B69133] to-[#D6B85A] bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan kantor kami di berbagai kota di Indonesia
          </p>
        </div>

        {/* Location Carousel */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Location Visual */}
              <div 
                className="relative h-96 md:h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #B69133 0%, #D6B85A 50%, #B69133 100%)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="relative z-10 text-center text-white p-8">
                  <MapPin className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <h3 className="text-4xl font-bold mb-2">{currentLocation.city}</h3>
                  <p className="text-lg opacity-90">{currentLocation.name}</p>
                </div>
              </div>

              {/* Location Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-[#B69133]/10 text-[#B69133] rounded-full text-sm font-medium mb-4">
                    {currentIndex + 1} / {locations.length}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentLocation.name}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">{currentLocation.city}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#B69133] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{currentLocation.address}</p>
                  </div>
                  {currentLocation.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#B69133]" />
                      <a
                        href={`tel:${currentLocation.phone}`}
                        className="text-gray-700 hover:text-[#B69133] transition-colors"
                      >
                        {currentLocation.phone}
                      </a>
                    </div>
                  )}
                </div>

                {currentLocation.mapUrl && (
                  <a
                    href={currentLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="w-5 h-5" />
                    Lihat di Maps
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {locations.length > 1 && (
            <>
              <button
                onClick={prevLocation}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous location"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextLocation}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next location"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Location Dots */}
        {locations.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {locations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#B69133]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to location ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
