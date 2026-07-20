'use client';

import Image from 'next/image';

export default function HeroSection2() {
  const partners = [
    { id: 1, name: 'Loving', image: '/assets/Hero2/Rectangle 158.png' },
    { id: 2, name: 'Art of Wellness', image: '/assets/Hero2/Rectangle 159.png' },
    { id: 3, name: 'Gym Bless', image: '/assets/Hero2/Rectangle 161.png' },
    { id: 4, name: 'Echare', image: '/assets/Hero2/Rectangle 162.png' },
    { id: 5, name: 'Hoki Noodle', image: '/assets/Hero2/Rectangle 163.png' },
    { id: 6, name: 'Attiya', image: '/assets/Hero2/Rectangle 164.png' },
  ];

  const stats = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      value: '22.000 +',
      label: 'Anggota Komunitas',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      value: '10 +',
      label: 'Partner Aktif',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      value: '40+',
      label: 'Praktisi',
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      ),
      title: 'Education Support',
      description: 'Materi Edukasi Eksklusif',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: 'Jaringan Komunitas',
      description: 'Terhubung Banyak Anggota',
    },
  ];

  return (
    <section 
      className="relative min-h-[calc(100dvh-5rem)] flex items-center overflow-visible"
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
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#B69133] px-6 py-3 rounded-full shadow-lg">
              <svg className="w-5 h-5 text-[#B69133]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Dipercaya oleh 22.000+ anggota komunitas kesehatan</span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                Membangun Kesehatan Lebih Baik dengan{' '}
                <span className="bg-gradient-to-r from-[#B69133] via-[#D6B85A] to-[#B69133] bg-clip-text text-transparent">
                  Teknologi Nano Bubble
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pelajari teknologi Nano Bubble, dapatkan edukasi kesehatan terpercaya, dan bergabung dalam komunitas partner yang terus berkembang.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.link/h2uyet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                Gabung Partnership
              </a>
              <a
                href="#nano-bubble"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 border-2 border-[#B69133] shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 text-[#B69133]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Pelajari Teknologi
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Logo with stats */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[800px] lg:max-w-[1000px]">
              <Image
                src="/assets/LOGORAHO.png"
                alt="Raho Club Premier"
                width={1500}
                height={1000}
                data-lightbox-image="true"
                data-lightbox-src="/assets/LOGORAHO.png"
                data-lightbox-title="Raho Club Premier"
                className="object-contain w-full h-auto cursor-zoom-in opacity-100"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 flex items-center justify-center flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#B69133]">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
