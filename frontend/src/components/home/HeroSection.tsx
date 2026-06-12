'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const features = [
    {
      title: 'Stabilitas yang Tinggi',
      description: 'Nano Bubble dapat bertahan lebih lama dalam cairan.',
      icon: '/assets/Hero/Stabilitas-yang-Tinggi1.png',
      image: '/assets/Hero/Stabilitas-yang-Tinggi2.png',
    },
    {
      title: 'Luas Permukaan Besar',
      description: 'Ukuran nano memberikan area interaksi yang lebih luas dan efisien.',
      icon: '/assets/Hero/Luas-Permukaan-Besar1.png',
      image: '/assets/Hero/Luas-Permukaan-Besar2.png',
    },
    {
      title: 'Potensi Pengantaran Gas',
      description: 'Memungkinkan distribusi oksigen, hidrogen, dan gas bioaktif.',
      icon: '/assets/Hero/Potensi-Pengantaran-Gas1.png',
      image: '/assets/Hero/Potensi-Pengantaran-Gas2.png',
    },
    {
      title: 'Area Riset Berkembang',
      description: 'Terus dieksplorasi dalam berbagai bidang kesehatan.',
      icon: '/assets/Hero/Area-Riset-Berkembang1.png',
      image: '/assets/Hero/Area-Riset-Berkembang2.png',
    },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/Hero/Hero-Section.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text contrast - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/35 to-white/40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#B69133] px-6 py-3 rounded-full shadow-lg">
            <Image 
              src="/assets/icon.png" 
              alt="Icon" 
              width={24} 
              height={24}
              className="object-contain"
            />
            <span className="text-sm font-medium text-gray-800">Teknologi Inti Raho Premier</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Apa Itu
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#B69133] via-[#D6B85A] to-[#B69133] bg-clip-text text-transparent">
            Nano Bubble?
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Teknologi yang Menjadi Fondasi Inovasi Kami
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nano Bubble adalah gelembung gas berukuran nano yang memiliki karakteristik unik termasuk stabilitas tinggi dan luas permukaan besar. Karakteristik ini menjadikannya salah satu teknologi yang terus diteliti untuk berbagai kebutuhan kesehatan.
          </p>
        </div>

        {/* Nano Bubble GIF - Larger size with slower smooth animation */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-2xl">
            <div className="animate-float-smooth">
              <img
                src="/assets/Hero/Hero-Section.gif"
                alt="Nano Bubble Animation"
                className="object-contain w-full h-auto"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
        </div>

        {/* CSS for slower smooth floating animation - no disappearing */}
        <style jsx>{`
          @keyframes float-smooth {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(-25px) scale(1.03);
              opacity: 1;
            }
          }
          .animate-float-smooth {
            animation: float-smooth 8s ease-in-out infinite;
            animation-fill-mode: both;
            will-change: transform;
          }
        `}</style>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
                {feature.title}
              </h4>

              {/* Divider */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#B69133] to-transparent"></div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Image */}
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://wa.link/h2uyet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Pelajari Nano Bubble Lebih Lanjut
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
