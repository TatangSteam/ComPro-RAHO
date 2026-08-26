'use client';

import React, { useEffect, useRef } from 'react';

export default function NanoBubbleFeatureSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId = 0;
    let previousTimestamp = 0;

    const rewind = (timestamp: number) => {
      if (!previousTimestamp) previousTimestamp = timestamp;

      const elapsedSeconds = (timestamp - previousTimestamp) / 1000;
      previousTimestamp = timestamp;
      video.currentTime = Math.max(0, video.currentTime - elapsedSeconds);

      if (video.currentTime > 0) {
        animationFrameId = window.requestAnimationFrame(rewind);
        return;
      }

      previousTimestamp = 0;
      video.currentTime = 0;
      void video.play().catch(() => {
        // Autoplay can be deferred by the browser until the video is visible.
      });
    };

    const handleEnded = () => {
      video.pause();
      previousTimestamp = 0;
      animationFrameId = window.requestAnimationFrame(rewind);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const features = [
    {
      title: 'Ukuran Nano',
      description: 'Partikel atau gelembung berada pada skala nanometrik (<100 nm), memberikan luas permukaan yang sangat luas dan penetrasi yang jauh lebih presisi.',
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#D6B85A" opacity="0.2" />
          <path d="M20 24L22 26L28 20" stroke="#A67319" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="10" stroke="#D6B85A" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Kavitasi',
      description: 'Proses dinamika perubahan tekanan cairan yang memicu terbentuknya rongga atau gelembung mikro-nano secara aktif.',
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
      title: 'Hormesis',
      description: 'Efek pemicuan respons positif atau adaptasi biologis tubuh/seluler pada ambang batas paparan dosis rendah yang menyehatkan.',
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
      title: 'Duet',
      description: 'Kombinasi atau sinergi ganda dua faktor penentu (misalnya interaksi gas-cairan atau surfaktan-ko-surfaktan) untuk mencapai kestabilan optimal.',
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
    <section id="nano-bubble" className="rising-bubble-field relative isolate flex min-h-[calc(100dvh-5rem)] scroll-mt-20 items-center overflow-hidden text-[#17120a]" style={{ background: 'transparent' }}>
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
        <div className="mx-auto max-w-5xl text-center">
          {/* Main Heading */}
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
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
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-label="Visualisasi Nano Bubble"
              className="h-[133.33%] w-full object-cover"
              style={{ marginTop: '-15%', background: 'transparent' }}
            >
              <source src="/assets/GIFNANOBUBBLE.mp4" type="video/mp4" />
            </video>
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
      </div>
    </section>
  );
}
