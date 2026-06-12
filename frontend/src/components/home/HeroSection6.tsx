'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection6() {
  const mainSolution = {
    title: 'IGDS: Ketika Nanobubble dan Gasotransmitter Bekerja Bersama untuk Mendukung Kesehatan',
    description: 'IGDS atau Intelligent Gas Delivery System adalah teknologi penghantaran gas terapeutik menggunakan nanobubble berukuran ultra-kecil yang mampu membawa berbagai jenis gas biologis ke area target secara terkontrol.',
    image: '/assets/Section6/Rectangle 66.png',
    icon: '📋',
    link: '/artikel-kesehatan/igds-nanobubble-gasotransmitter',
  };

  const solutions = [
    {
      title: 'Gasotransmitter: Ketika Gas yang Dianggap Racun Justru Menjadi Penyelamat Tubuh',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      image: '/assets/Section6/Rectangle 173.png',
      icon: '📄',
      link: '/artikel-kesehatan/gasotransmitter-penyelamat-tubuh',
    },
    {
      title: 'Apa Itu Nanobubble? Teknologi Cerdas untuk Mengantarkan Oksigen hingga ke Tingkat Mikro',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      image: '/assets/Section6/Rectangle 174.png',
      icon: '📄',
      link: '/artikel-kesehatan/nanobubble-teknologi-cerdas',
    },
  ];

  return (
    <section 
      className="relative py-48 md:py-56 overflow-visible"
      style={{
        backgroundImage: 'url(/assets/Section6/Section6BG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        marginTop: '-5px',
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/35 to-white/40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-[#B69133] px-6 py-3 rounded-full shadow-lg">
            <svg className="w-5 h-5 text-[#B69133]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Teknologi Inovatif untuk Kesehatan yang Lebih Baik</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Solusi yang{' '}
            <span className="bg-gradient-to-r from-[#B69133] via-[#D6B85A] to-[#B69133] bg-clip-text text-transparent">
              Kami Gunakan
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Kami menghadirkan teknologi inovatif dan pendekatan ilmiah untuk mendukung kesehatan sel dan sirkulasi
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            tubuh secara optimal.
          </p>
        </div>

        {/* Main Solution Card - Large */}
        <Link
          href={mainSolution.link}
          className="block bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 mb-8 border-2 border-[#B69133]"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 rounded-xl flex items-center justify-center text-2xl mb-6">
                {mainSolution.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {mainSolution.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {mainSolution.description}
              </p>
            </div>

            {/* Right Image */}
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={mainSolution.image}
                alt={mainSolution.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Link>

        {/* Small Solution Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.link}
              className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#B69133]/30"
            >
              <div className="grid grid-cols-5 gap-4 p-6">
                {/* Left Content */}
                <div className="col-span-3 flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B69133]/20 to-[#D6B85A]/20 rounded-xl flex items-center justify-center text-xl mb-4">
                    {solution.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-3">
                    {solution.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {solution.description}
                  </p>
                </div>

                {/* Right Image */}
                <div className="col-span-2 relative h-full min-h-[200px] rounded-xl overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
