'use client';

export default function HeroSection3() {
  const benefits = [
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
        </svg>
      ),
      title: 'Harga Khusus Partner',
      description: 'Nikmati akses harga yang lebih kompetitif untuk produk tertentu.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      ),
      title: 'Edukasi Berkelanjutan',
      description: 'Nikmati akses materi pembelajaran eksklusif.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      ),
      title: 'Dukungan Bisnis',
      description: 'Pendampingan pengembangan komunitas dan aktivitas edukasi.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: 'Jaringan Komunitas',
      description: 'Terhubung dengan partner dan praktisi berbagai daerah.',
    },
  ];

  return (
    <section 
      className="relative min-h-[calc(100dvh-5rem)] flex items-start overflow-visible"
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
        <div className="text-center mb-16">
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto mb-2">
            Kami memberikan lebih dari sekadar produk.
          </p>
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto mb-6">
            Kami tumbuh bersama partner dalam ekosistem kesehatan yang berkelanjutan.
          </p>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan profesional kesehatan yang telah merasakan manfaat partnership bersama Raho Club Premier. 
            Dari harga khusus, edukasi berkelanjutan, hingga dukungan bisnis yang komprehensif, 
            kami berkomitmen untuk mendukung pertumbuhan praktik dan komunitas Anda.
          </p>
        </div>

        {/* Benefits Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 flex items-center justify-center text-[#B69133]">
                  {benefit.icon}
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-gray-900 text-center mb-3">
                {benefit.title}
              </h4>

              {/* Divider */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B69133] to-transparent"></div>
              </div>

              {/* Description */}
              <p className="text-base text-gray-600 text-center leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
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
              href="https://wa.link/h2uyet"
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
