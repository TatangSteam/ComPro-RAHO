'use client';

export default function HeroSection3() {
  return (
    <section 
      id="partnership"
      className="relative min-h-[calc(100dvh-5rem)] flex items-center overflow-visible scroll-mt-20"
      style={{
        background: '#ffffff',
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
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 z-10 w-full">
        {/* Main Heading */}
        <div className="text-center mb-6 py-2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 px-4">
            Kenapa Bergabung
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#B69133] via-[#D6B85A] to-[#B69133] bg-clip-text text-transparent px-4 pb-3 leading-tight">
            dengan Raho Premier?
          </h3>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto mb-2">
            Kami memberikan lebih dari sekadar produk.
          </p>
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto mb-6">
            Kami tumbuh bersama partner dalam ekosistem kesehatan yang berkelanjutan.
          </p>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bergabunglah dengan banyak profesional kesehatan yang telah merasakan manfaat partnership bersama Raho Club Premier.
            {' '}Dari harga khusus, edukasi berkelanjutan, hingga dukungan riset yang komprehensif,
            kami berkomitmen untuk mendukung pertumbuhan praktik dan komunitas Anda.
          </p>
        </div>

        {/* Bottom Section - Badge with CTA */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-[#B69133]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left - Badge with Icon and Text */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69133] to-[#D6B85A] flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  Bertumbuh Bersama dalam Ekosistem Kesehatan.
                </h4>
                <p className="text-base text-gray-600">
                  Dapatkan berbagai manfaat partnership untuk mendukung perkembangan Anda.
                </p>
              </div>
            </div>

            {/* Right - CTA Button */}
            <a
              href="https://wa.link/tuwrxr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 whitespace-nowrap"
            >
              Gabung Partnership
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
