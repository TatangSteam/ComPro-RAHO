'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Search } from 'lucide-react';
import AuthImage from '@/components/Shared/AuthImage';
import WellnessBackground from '@/components/Shared/WellnessBackground';
import type { Location } from '@/types';
import { sortLocationsForDisplay } from '@/lib/locationSort';

interface PartnerNetworkSectionProps {
  locations: Location[];
  sectionId?: string;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const PARTNERS_PER_PAGE = 6;
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A58028] focus-visible:ring-offset-4';
const CARD = 'overflow-hidden rounded-[20px] border border-[#EAE2D3] bg-white shadow-[0_4px_18px_rgba(62,44,15,0.04)]';

function LocationPhoto({ location, featured = false }: { location: Location; featured?: boolean }) {
  return (
    <div
      data-lightbox-image={location.imageUrl ? 'true' : undefined}
      data-lightbox-title={location.name}
      className={`relative overflow-hidden bg-[#F1ECE2] ${featured ? 'min-h-56 md:h-full md:min-h-80' : 'aspect-[16/9]'} ${location.imageUrl ? 'cursor-zoom-in' : ''}`}
    >
      {location.imageUrl ? (
        <AuthImage src={location.imageUrl} alt={location.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F4ECDC] to-[#FCFAF5]">
          <MapPin className="h-12 w-12 text-[#B69133]/50" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function LocationLinks({ location }: { location: Location }) {
  const query = encodeURIComponent(`${location.name}, ${location.address}`);
  const mapUrl = location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-5">
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lihat ${location.name} di Maps`} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#B69133] px-3 py-2.5 text-sm font-semibold text-[#201A0E] transition-colors hover:bg-[#C8A348] ${FOCUS}`}>
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Lihat Maps
      </a>
      {location.phone && (
        <a href={`https://wa.me/${location.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label={`Hubungi ${location.name}`} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#DCCBA4] bg-white px-3 py-2.5 text-sm font-medium text-[#3C352A] transition-colors hover:border-[#B69133] hover:bg-[#FBF8F1] ${FOCUS}`}>
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />Hubungi
        </a>
      )}
    </div>
  );
}

export default function PartnerNetworkSection({ locations, sectionId = 'partner-network', loading = false, error = false, onRetry }: PartnerNetworkSectionProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const { cabangLocations, partnershipLocations } = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matching = locations.filter((location) => !term || location.city.toLowerCase().includes(term) || location.name.toLowerCase().includes(term));
    return {
      cabangLocations: sortLocationsForDisplay(matching.filter((location) => location.category === 'cabang')),
      partnershipLocations: sortLocationsForDisplay(matching.filter((location) => location.category !== 'cabang')),
    };
  }, [locations, search]);
  const totalPages = Math.max(1, Math.ceil(partnershipLocations.length / PARTNERS_PER_PAGE));
  // A refresh can shrink the current list as well as a search.
  const currentPage = Math.min(page, totalPages - 1);
  const currentPartners = partnershipLocations.slice(currentPage * PARTNERS_PER_PAGE, (currentPage + 1) * PARTNERS_PER_PAGE);
  const hasResults = cabangLocations.length > 0 || partnershipLocations.length > 0;
  const searchId = `${sectionId}-search`;
  const titleId = `${sectionId}-title`;

  return (
    <section id={sectionId} aria-labelledby={titleId} aria-busy={loading} className="relative isolate z-[2] scroll-mt-24 overflow-hidden bg-[#FBF8F1] py-16 text-[#292723] md:py-20 lg:py-24">
      <WellnessBackground />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8D6920]">Lokasi Kami</p>
          <h2 id={titleId} className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
            Jaringan <span className="text-[#A58028]">Partner Kami</span> di Indonesia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6C665C] sm:text-base">
            Temukan Raho Premier terdekat di kota Anda. Bertumbuh bersama klinik, komunitas, dan partner kesehatan di Indonesia.
          </p>
          <div className="relative mx-auto mt-7 max-w-lg">
            <label htmlFor={searchId} className="sr-only">Cari kota atau nama partner</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B8375]" aria-hidden="true" />
            <input id={searchId} type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Cari kota atau nama partner..." disabled={loading || error || locations.length === 0} className="min-h-[52px] w-full rounded-full border border-[#E2D9C8] bg-white py-3 pl-12 pr-5 text-sm text-[#292723] shadow-[0_3px_12px_rgba(62,44,15,0.04)] placeholder:text-[#8B8375] focus:border-[#B69133] focus:outline-none focus:ring-2 focus:ring-[#B69133]/20 disabled:opacity-60" />
          </div>
        </div>

        {loading ? (
          <div role="status">
            <span className="sr-only">Memuat lokasi partner...</span>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <div key={index} className={`${CARD} motion-safe:animate-pulse`}>
                  <div className="aspect-[16/9] bg-[#EEE7DB]" />
                  <div className="space-y-4 p-6">
                    <div className="h-5 w-3/4 rounded bg-[#EEE7DB]" /><div className="h-4 w-1/2 rounded bg-[#F3EFE6]" /><div className="h-11 rounded-xl bg-[#F3EFE6]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[20px] border border-[#E5DAC5] bg-white/85 px-6 py-12 text-center" role="status">
            <MapPin className="mx-auto mb-4 h-8 w-8 text-[#A58028]" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Lokasi partner belum dapat dimuat</h3>
            <p className="mt-2 text-sm leading-6 text-[#6C665C]">Silakan coba kembali untuk melihat lokasi terdekat Anda.</p>
            {onRetry && <button type="button" onClick={onRetry} className={`mt-5 rounded-xl border border-[#DCCBA4] bg-white px-5 py-3 text-sm font-semibold text-[#6D511C] hover:bg-[#FBF8F1] ${FOCUS}`}>Coba Lagi</button>}
          </div>
        ) : !hasResults ? (
          <div className="rounded-[20px] border border-[#E5DAC5] bg-white/85 px-6 py-12 text-center" role="status">
            <MapPin className="mx-auto mb-4 h-8 w-8 text-[#A58028]" aria-hidden="true" />
            <h3 className="text-lg font-semibold">{locations.length === 0 ? 'Informasi lokasi segera hadir' : 'Lokasi tidak ditemukan'}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6C665C]">{locations.length === 0 ? 'Hubungi kami untuk informasi jaringan partner Raho Premier.' : 'Coba nama kota atau partner lain untuk menemukan lokasi terdekat.'}</p>
            {search && <button type="button" onClick={() => { setSearch(''); setPage(0); }} className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-[#85631D] underline underline-offset-4 ${FOCUS}`}>Tampilkan semua lokasi</button>}
          </div>
        ) : (
          <>
            {cabangLocations.length > 0 && (
              <div className="mb-12">
                <h3 className="mb-5 text-xl font-semibold sm:text-2xl">Lokasi Cabang</h3>
                <div className="space-y-6">
                  {cabangLocations.map((location) => (
                    <article key={location.id} className={`group grid md:grid-cols-2 ${CARD}`}>
                      <LocationPhoto location={location} featured />
                      <div className="flex min-w-0 flex-col p-6 sm:p-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8D6920]">Cabang Raho Premier</p>
                        <h4 className="break-words text-2xl font-semibold leading-snug">{location.name}</h4>
                        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-[#8D6920]"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{location.city}</p>
                        {location.phone && <a href={`tel:${location.phone}`} className={`mt-5 inline-flex w-fit items-center gap-2 rounded text-sm text-[#6C665C] hover:text-[#8D6920] ${FOCUS}`}><Phone className="h-4 w-4 shrink-0 text-[#A58028]" aria-hidden="true" />{location.phone}</a>}
                        {location.address && <p className="mt-3 text-sm leading-6 text-[#6C665C]">{location.address}</p>}
                        <LocationLinks location={location} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            {currentPartners.length > 0 && (
              <div>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                  <h3 className="text-xl font-semibold sm:text-2xl">Lokasi Partner</h3><p className="text-sm text-[#6C665C]">Terhubung lebih dekat dengan Anda.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentPartners.map((location) => (
                    <article key={location.id} className={`group flex min-w-0 flex-col transition-shadow hover:shadow-[0_8px_24px_rgba(62,44,15,0.08)] ${CARD}`}>
                      <LocationPhoto location={location} />
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h4 className="break-words text-lg font-semibold leading-snug">{location.name}</h4>
                        <p className="mt-2 flex items-center gap-2 text-sm text-[#8D6920]"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{location.city}</p>
                        {location.phone && <p className="mt-4 flex items-center gap-2 text-xs text-[#6C665C]"><Phone className="h-3.5 w-3.5 shrink-0 text-[#A58028]" aria-hidden="true" />{location.phone}</p>}
                        {location.address && <p className="mt-2 text-xs leading-5 text-[#6C665C]">{location.address}</p>}
                        <LocationLinks location={location} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            {totalPages > 1 && (
              <nav className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-label="Halaman lokasi partner">
                <button type="button" onClick={() => setPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0} className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCBA4] bg-white text-[#8D6920] transition-colors hover:bg-[#F5EFDF] disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`} aria-label="Halaman sebelumnya"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
                <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index} type="button" onClick={() => setPage(index)} aria-label={`Ke halaman ${index + 1}`} aria-current={index === currentPage ? 'page' : undefined} className={`flex h-11 min-w-8 items-center justify-center rounded-lg px-1.5 ${FOCUS}`}><span className={`h-2 rounded-full transition-all ${index === currentPage ? 'w-6 bg-[#B69133]' : 'w-2 bg-[#D3CCBF] hover:bg-[#A58028]'}`} /></button>
                  ))}
                </div>
                <button type="button" onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage >= totalPages - 1} className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCBA4] bg-white text-[#8D6920] transition-colors hover:bg-[#F5EFDF] disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`} aria-label="Halaman selanjutnya"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
              </nav>
            )}
          </>
        )}

        <div className="mt-12 flex flex-col justify-between gap-6 rounded-[20px] border border-[#E0D3B8] bg-white/90 p-6 shadow-[0_3px_12px_rgba(62,44,15,0.03)] lg:flex-row lg:items-center lg:p-8">
          <div className="min-w-0"><h3 className="text-lg font-semibold sm:text-xl">Belum ada partner di kota Anda?</h3><p className="mt-2 text-sm leading-6 text-[#6C665C]">Mari tumbuh bersama dalam jaringan Raho Premier.</p></div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <a href="https://wa.link/pa1lub" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-[#DCCBA4] bg-white px-5 py-3 text-sm font-medium text-[#6D511C] transition-colors hover:bg-[#FBF8F1] ${FOCUS}`}>Ajukan Permintaan</a>
            <a href="https://wa.link/tuwrxr" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#B69133] px-5 py-3 text-sm font-semibold text-[#201A0E] transition-colors hover:bg-[#C8A348] ${FOCUS}`}>Gabung Partnership<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
