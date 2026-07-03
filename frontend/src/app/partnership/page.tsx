'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Location } from '@/types';
import PartnerNetworkSection from '@/components/tentang-kami/PartnerNetworkSection';

export default function PartnershipPage() {
  const [activeTab, setActiveTab] = useState<'dokter' | 'klinik'>('dokter');
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get<any>(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      const locationData = res.data.locations || res.data;
      setLocations(locationData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
     
    

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('dokter')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all text-sm sm:text-base ${
                activeTab === 'dokter'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-600'
              }`}
            >
              Untuk Dokter
            </button>
            <button
              onClick={() => setActiveTab('klinik')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'klinik'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-600'
              }`}
            >
              Untuk Instansi, Klinik, atau Rumah Sakit
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Untuk Dokter */}
        {activeTab === 'dokter' && (
          <section className="space-y-12 md:space-y-16">
            {/* Section Dokter */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Untuk Dokter
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                    <p className="text-sm font-medium text-yellow-800">
                      This section is temporarily unavailable while we update our partner testimonials and success stories. We appreciate your patience and look forward to sharing them with you soon.
                    </p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://wa.link/h2uyet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
                  >
                    Selengkapnya Research Partner
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/building.jpg"
                    alt="Partnership untuk Dokter"
                    loading="lazy"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Section Klinik - Below Dokter */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Untuk Klinik
                  </h2>
                  <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                      <p className="text-sm font-medium text-yellow-800">
                        This section is temporarily unavailable while we update our partner testimonials and success stories. We appreciate your patience and look forward to sharing them with you soon.
                      </p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </p>
                  </div>
                  <div className="mt-8">
                    <a
                      href="https://wa.link/h2uyet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
                    >
                      Gabung Research Partner
                    </a>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/assets/UntukKlinik.png"
                      alt="Partnership untuk Klinik"
                      loading="lazy"
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Untuk Klinik */}
        {activeTab === 'klinik' && (
          <section className="space-y-12 md:space-y-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Untuk Klinik, Instansi atau Rumah Sakit
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                    <p className="text-sm font-medium text-yellow-800">
                      This section is temporarily unavailable while we update our partner testimonials and success stories. We appreciate your patience and look forward to sharing them with you soon.
                    </p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://wa.link/h2uyet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
                  >
                    Selengkapnya Research Partner
                  </a>
                </div>
              </div>
              <div>
                <div className="rounded-2xl overflow-hidden shadow-xl bg-blue-50 p-8">
                  <img
                    src="/assets/UntukKlinik.png"
                    alt="Partnership untuk Klinik"
                    loading="lazy"
                    className="w-full h-64 sm:h-80 object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <PartnerNetworkSection locations={locations} />

    </div>
  );
}
