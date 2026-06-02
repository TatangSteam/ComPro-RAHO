import { Location } from '@/types';

interface LokasiSectionProps {
  locations: Location[];
}

export default function LokasiSection({ locations }: LokasiSectionProps) {
  const getGoogleMapsUrl = (location: Location) => {
    if (location.mapUrl) {
      return location.mapUrl;
    }
    
    const query = encodeURIComponent(`${location.name}, ${location.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <section id="lokasi" className="py-12 md:py-16 bg-gradient-to-br from-yellow-600 to-yellow-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Kunjungi Lokasi Kami</h2>
          <p className="text-white text-base md:text-lg">
            Temukan RAHO Club Premier terdekat dan mulai perjalanan sehat Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-lg">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{location.name}</h3>
              <p className="text-base md:text-lg text-gray-900 font-semibold mb-2">{location.city}</p>
              
              {/* Phone Number */}
              {location.phone && (
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-sm md:text-base text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              )}
              
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                {location.address}
              </p>
              <a
                href={getGoogleMapsUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-50 text-yellow-600 border-2 border-yellow-600 px-5 md:px-6 py-2 rounded-full font-medium transition-colors inline-flex items-center gap-2 text-sm md:text-base"
              >
                Kunjungi Sekarang
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
