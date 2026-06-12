'use client';

import Image from 'next/image';

export default function HeroSection3() {
  const benefits = [
    {
      icon: '/assets/beranda3/icomoon-free_price-tags.png',
      title: 'Harga Khusus Partner',
      description: 'Nikmati akses harga yang lebih kompetitif untuk produk tertentu.',
      image: '/assets/beranda3/Rectangle 169.png',
    },
    {
      icon: '/assets/beranda3/mdi_book-education.png',
      title: 'Edukasi Berkelanjutan',
      description: 'Nikmati akses materi pembelajaran eksklusif.',
      image: '/assets/beranda3/Rectangle 170.png',
    },
    {
      icon: '/assets/beranda3/famicons_business.png',
      title: 'Dukungan Bisnis',
      description: 'Pendampingan pengembangan komunitas dan aktivitas edukasi.',
      image: '/assets/beranda3/Rectangle 171.png',
    },
    {
      icon: '/assets/beranda3/fluent_people-community-20-filled.png',
      title: 'Jaringan Komunitas',
      description: 'Terhubung dengan partner dan praktisi berbagai daerah.',
      image: '/assets/beranda3/Rectangle 172.png',
    },
  ];

  return (
    <section 
      className="relative py-24 md:py-32 overflow-visible"
      style={{
        backgroundImage: 'url(/assets/beranda3/Beranda3BG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        display: 'block',
        marginBottom: '-5px',
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/35 to-white/40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
            Kenapa Bergabung
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#B69133] via-[#D6B85A] to-[#B69133] bg-clip-text text-transparent">
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
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 flex items-center justify-center">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
                {benefit.title}
              </h4>

              {/* Divider */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#B69133] to-transparent"></div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                {benefit.description}
              </p>

              {/* Benefit Image */}
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Value Proposition Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 mb-12 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#B69133] to-[#D6B85A] mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sistem Terintegrasi</h4>
              <p className="text-gray-600 leading-relaxed">
                Platform lengkap yang menghubungkan produk, edukasi, dan komunitas dalam satu ekosistem yang mudah diakses.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#B69133] to-[#D6B85A] mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Dukungan Profesional</h4>
              <p className="text-gray-600 leading-relaxed">
                Tim ahli kami siap membantu Anda dalam pengembangan praktik, strategi bisnis, dan implementasi teknologi terkini.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#B69133] to-[#D6B85A] mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Konten Berkualitas</h4>
              <p className="text-gray-600 leading-relaxed">
                Akses ke library konten edukasi, riset terbaru, dan material promosi yang dapat langsung Anda gunakan untuk komunitas.
              </p>
            </div>
          </div>
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
