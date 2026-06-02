'use client';

import { useState } from 'react';

export default function PartnershipPage() {
  const [activeTab, setActiveTab] = useState<'dokter' | 'klinik'>('dokter');

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
                  <p>
                    Partnership RAHO Premier untuk Dokter (Research Partner) menghadirkan kolaborasi inovatif dalam bentuk co-management pasien dengan pendekatan terapi pendukung berbasis bioteknologi, termasuk pemanfaatan teknologi nano bubble sebagai bagian dari strategi wellness dan regenerasi seluler.
                  </p>
                  <p>
                    Program ini dirancang untuk mendukung dokter dalam memberikan terapi pendukung yang terstruktur, mengikat forum edukasi dan diskusi ilmiah serta pengembangan pengetahuan, serta berpartisipasi dalam riset berbasis komunitias dan pengalaman data klinis guna meredukung praktik medis yang lebih komprehensif, kolaboratif, dan berbasis bukti.
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
                    <p>
                      Partnership RAHO Premier untuk Klinik & Instansi Kesehatan menawarkan kolaborasi strategis melalui integrasi layanan berbasis wellness modern dan pemulihan seluler, termasuk dukungan teknologi seperti nano bubble sebagai terapi pendukung.
                    </p>
                    <p>
                      Kemitraan ini memungkinkan pengembangan wellness center atau health center bersama yang terintegrasi dengan layanan existing, menciptakan ekosistem kesehatan holistik yang komprehensif. Program ini serta menghadirkan solusi yang lebih komprehensif bagi pasien dengan pendekatan preventif, promotif, dan suportif.
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
                  <p>
                    Partnership RAHO Premier untuk Klinik & Instansi Kesehatan menawarkan kolaborasi strategis melalui integrasi layanan berbasis wellness modern dan pemulihan seluler, termasuk dukungan teknologi seperti nano bubble sebagai terapi pendukung.
                  </p>
                  <p>
                    Kemitraan ini memungkinkan pengembangan wellness center atau health center bersama yang terintegrasi dengan layanan existing, menciptakan ekosistem kesehatan holistik yang komprehensif. Program ini serta menghadirkan solusi yang lebih komprehensif bagi pasien dengan pendekatan preventif, promotif, dan suportif.
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

    </div>
  );
}
