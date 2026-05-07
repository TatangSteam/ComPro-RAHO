'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const whatsappLink = 'https://wa.link/h2uyet';

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Telah dicoba oleh 22.000 + pengguna
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Raho Club Premier
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble. Solusi aging sehat & regenerasi tubuh alami hingga akar masalah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Hubungi Kami
              </a>
              <a
                href="https://wa.link/h2uyet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-medium transition-colors border-2 border-gray-300 flex items-center gap-2"
              >
                Pelajari
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Content - Image with Stats */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/hero-image.png"
                alt="Doctor and Patient"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
              />
              
              {/* Stats Overlay - Top Right */}
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-4xl font-bold text-yellow-600">22K+</div>
                <div className="text-sm text-gray-600">Pengguna Telah<br />Mencoba</div>
              </div>

              {/* Stats Overlay - Bottom Right */}
              <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">90+</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Research Partner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
