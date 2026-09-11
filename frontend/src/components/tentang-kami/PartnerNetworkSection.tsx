'use client';

import { useMemo, useState } from 'react';
import { MapPin, Phone, Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AuthImage from '@/components/Shared/AuthImage';
import { Location } from '@/types';
import { sortLocationsForDisplay } from '@/lib/locationSort';

interface PartnerNetworkSectionProps {
  locations: Location[];
  sectionId?: string;
}

const PARTNERS_PER_PAGE = 6;

export default function PartnerNetworkSection({
  locations,
  sectionId = 'partner-network',
}: PartnerNetworkSectionProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const getGoogleMapsUrl = (location: Location) => {
    if (location.mapUrl) return location.mapUrl;
    const query = encodeURIComponent(`${location.name}, ${location.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const { cabangLocations, partnershipLocations } = useMemo(() => {
    const term = search.trim().toLowerCase();
    const cabang: Location[] = [];
    const partnership: Location[] = [];

    for (const location of locations) {
      const matches =
        !term ||
        location.city.toLowerCase().includes(term) ||
        location.name.toLowerCase().includes(term);

      if (!matches) continue;
      if (location.category === 'cabang') cabang.push(location);
      else partnership.push(location);
    }

    return {
      cabangLocations: sortLocationsForDisplay(cabang),
      partnershipLocations: sortLocationsForDisplay(partnership),
    };
  }, [locations, search]);

  const totalPages = Math.max(1, Math.ceil(partnershipLocations.length / PARTNERS_PER_PAGE));
  const currentPartners = partnershipLocations.slice(
    page * PARTNERS_PER_PAGE,
    (page + 1) * PARTNERS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  if (locations.length === 0) {
    return null;
  }

  return (
    <section id={sectionId} className="relative scroll-mt-24 overflow-hidden py-16 md:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#D6B85A]/40 px-4 py-1.5 rounded-full text-xs font-medium text-[#B69133] mb-4 shadow-sm">
            <Star className="w-3.5 h-3.5" />
            Lokasi Kami
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Jaringan Partner <span className="text-[#B69133]">Kami</span> di Indonesia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Raho Premier bertumbuh bersama berbagai klinik, komunitas, dan partner kesehatan di berbagai kota di Indonesia.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari kota disini..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6B85A]/50 text-sm"
            />
          </div>
        </div>

        {/* Lokasi Cabang */}
        {cabangLocations.length > 0 && (
          <div className="space-y-4 mb-14">
            {cabangLocations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 md:items-start"
              >
                <div
                  data-lightbox-image={location.imageUrl ? 'true' : undefined}
                  data-lightbox-title={location.name}
                  className={`relative h-56 md:h-72 lg:h-80 bg-gray-100 ${
                    location.imageUrl ? 'cursor-zoom-in' : ''
                  }`}
                >
                  {location.imageUrl ? (
                    <AuthImage
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20">
                      <MapPin className="w-16 h-16 text-[#B69133]/50" />
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mb-3">
                    <Star className="w-3 h-3" />
                    Lokasi Cabang
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{location.name}</h3>
                  <p className="text-lg font-medium text-[#B69133] mb-4">{location.city}</p>

                  {location.phone && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#B69133] flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="hover:text-[#B69133] transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-start gap-2 mb-6 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#B69133] flex-shrink-0 mt-0.5" />
                    <span>{location.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={getGoogleMapsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow"
                    >
                      <MapPin className="w-4 h-4" />
                      Lihat di Maps
                    </a>
                    {location.phone && (
                      <a
                        href={`https://wa.me/${location.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white border-2 border-[#B69133] text-[#B69133] hover:bg-[#B69133]/5 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Hubungi Kami
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lokasi Partner */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Lokasi Partner <span className="text-[#B69133]">Kami</span>
          </h3>
          <p className="text-gray-600 mt-1">
            Temukan Raho Premier terdekat di kota Anda.
          </p>
        </div>

        {currentPartners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentPartners.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div
                  data-lightbox-image={location.imageUrl ? 'true' : undefined}
                  data-lightbox-title={location.name}
                  className={`relative h-40 bg-gray-100 ${location.imageUrl ? 'cursor-zoom-in' : ''}`}
                >
                  {location.imageUrl ? (
                    <AuthImage
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B69133]/15 to-[#D6B85A]/15">
                      <MapPin className="w-10 h-10 text-[#B69133]/50" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-0.5 line-clamp-1">{location.name}</h4>
                  <p className="text-sm font-medium text-[#B69133] mb-3">{location.city}</p>

                  {location.phone && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                      <Phone className="w-3.5 h-3.5 text-[#B69133] flex-shrink-0" />
                      <span className="line-clamp-1">{location.phone}</span>
                    </div>
                  )}

                  {location.address && (
                    <div className="flex items-start gap-2 mb-4 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#B69133] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{location.address}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <a
                      href={getGoogleMapsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-full text-xs font-medium transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Maps
                    </a>
                    {location.phone && (
                      <a
                        href={`https://wa.me/${location.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 border-2 border-gray-200 hover:border-[#B69133] text-gray-700 hover:text-[#B69133] px-3 py-2 rounded-full text-xs font-medium transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Hubungi
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-10">Tidak ada partner ditemukan untuk kota tersebut.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-14">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                page === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-[#B69133] text-[#B69133] hover:bg-[#B69133]/10'
              }`}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === page ? 'w-6 bg-[#B69133]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ke halaman ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                page >= totalPages - 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-[#B69133] text-[#B69133] hover:bg-[#B69133]/10'
              }`}
              aria-label="Halaman selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Belum ada Partner atau Cabang di Kota Anda?</p>
              <p className="text-sm text-gray-500">
                Kami terus mengembangkan jaringan komunitas dan partner kesehatan di berbagai wilayah.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://wa.link/pa1lub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-[#B69133] text-[#B69133] hover:bg-[#B69133]/5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            >
              Ajukan Permintaan
            </a>
            <a
              href="https://wa.link/tuwrxr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow whitespace-nowrap"
            >
              Gabung Partnership
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
