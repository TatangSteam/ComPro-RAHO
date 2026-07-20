'use client';

import React from 'react';
import Image from 'next/image';

export default function NanoBubbleFeatureSection() {
  const features = [
    {
      title: 'Stabilitas yang Tinggi',
      description: 'Nano Bubble dapat bertahan lebih lama dalam cairan.',
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#D6B85A" opacity="0.2" />
          <path d="M20 24L22 26L28 20" stroke="#A67319" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="10" stroke="#D6B85A" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Luas Permukaan Besar',
      description: 'Ukuran nano memberikan area interaksi yang lebih luas dan efisien.',
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#D6B85A" opacity="0.2" />
          <path d="M24 14V34M14 24H34" stroke="#A67319" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="3" fill="#D6B85A" />
          <circle cx="24" cy="14" r="2" fill="#B69133" />
          <circle cx="24" cy="34" r="2" fill="#B69133" />
          <circle cx="14" cy="24" r="2" fill="#B69133" />
          <circle cx="34" cy="24" r="2" fill="#B69133" />
        </svg>
      ),
    },
    {
      title: 'Potensi Pengantaran Gas',
      description: 'Memungkinkan distribusi oksigen, hidrogen, dan gas bioaktif.',
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#D6B85A" opacity="0.2" />
          <path d="M24 10V20M24 20L28 16M24 20L20 16" stroke="#A67319" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 28C16 28 18 26 24 26C30 26 32 28 32 28" stroke="#D6B85A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="32" r="4" fill="#B69133" opacity="0.3" />
          <circle cx="18" cy="34" r="2.5" fill="#D6B85A" opacity="0.5" />
          <circle cx="30" cy="34" r="2.5" fill="#D6B85A" opacity="0.5" />
        </svg>
      ),
    },
    {
      title: 'Area Riset Berkembang',
      description: 'Terus dieksplorasi dalam berbagai bidang kesehatan.',
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="8" stroke="#A67319" strokeWidth="2.5" />
          <circle cx="20" cy="20" r="12" fill="#D6B85A" opacity="0.1" />
          <path d="M26 26L34 34" stroke="#A67319" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="35" cy="35" r="3" fill="#B69133" />
          <path d="M18 20H22M20 18V22" stroke="#D6B85A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="rising-bubble-field relative isolate flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden text-[#17120a]" style={{ background: 'transparent' }}>
      {/* SVG Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/Hero/Section1BG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      />
      
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -left-32 top-12 z-[1] h-72 w-72 rounded-full bg-[#d6b85a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 z-[1] h-80 w-80 rounded-full bg-[#b69133]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        {/* Top Badge */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="pointer-events-auto flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6b85a]/45 bg-white/45 px-4 py-2 text-[#5b3708] shadow-lg shadow-amber-950/10 backdrop-blur-md sm:px-5">
              <Image
                src="/assets/icon.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-xs font-medium tracking-wide sm:text-sm">
                Teknologi Inti Raho Premier
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
            <span className="text-[#17120a]">Apa Itu </span>
            <span className="bg-gradient-to-r from-[#A67319] via-[#D6B85A] to-[#F1D36B] bg-clip-text text-transparent">
              Nano Bubble?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-xl font-semibold text-[#4a4640] sm:text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            Teknologi yang Menjadi Fondasi Inovasi Kami
          </p>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#4a4640] sm:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            Nano Bubble adalah gelembung gas berukuran nano (kurang dari 200 nanometer) yang stabil dalam cairan. 
            Teknologi ini memiliki potensi luar biasa dalam meningkatkan efektivitas pengantaran zat aktif, 
            meningkatkan bioavailabilitas, dan membuka peluang baru dalam inovasi produk kesehatan dan kecantikan.
          </p>
        </div>

        {/* Central Bubble Visualization */}
        <div className="mt-4 flex justify-center sm:mt-6">
          <div className="relative overflow-hidden h-72 w-96 sm:h-96 sm:w-[32rem] lg:h-[32rem] lg:w-[42rem]">
            {/* Main Bubble - Hero Section GIF - Cropped 15% from top, bottom cut 10% total */}
            <Image
              src="/assets/Hero/Hero-Section.gif"
              alt="Nano Bubble Visualization"
              width={512}
              height={512}
              data-lightbox-image="true"
              data-lightbox-src="/assets/Hero/Hero-Section.gif"
              data-lightbox-title="Nano Bubble Visualization"
              className="w-full h-[133.33%] cursor-zoom-in object-cover"
              style={{ 
                marginTop: '-15%',
              }}
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-4 grid gap-[30px] sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group overflow-hidden rounded-3xl border-2 border-[#e7d7ac] bg-white/90 p-6 shadow-lg shadow-amber-950/5 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-[#D6B85A] hover:shadow-xl hover:shadow-amber-950/10"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold leading-snug text-[#17120a] sm:text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-[#4a4640] sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="https://wa.link/h2uyet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#A67319] via-[#D6B85A] to-[#F1D36B] px-8 py-4 text-base font-bold text-[#2b1804] shadow-xl shadow-amber-900/20 transition-all duration-300 hover:scale-105 hover:from-[#F1D36B] hover:via-[#D6B85A] hover:to-[#A67319] hover:shadow-2xl hover:shadow-amber-900/30 sm:text-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Pelajari Nano Bubble Lebih Lanjut
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
