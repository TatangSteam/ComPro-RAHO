'use client';

import Image from 'next/image';
import LiquidGlassBackgroundThree from './LiquidGlassBackgroundThree';

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#fffaf2]">
      <LiquidGlassBackgroundThree />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_48%,rgba(255,231,142,0.22),transparent_38%),linear-gradient(180deg,rgba(255,250,242,0.24),transparent_50%,rgba(214,184,90,0.18))]" />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-7xl flex-col items-center justify-between px-5 py-9 text-center sm:px-8 sm:py-12 lg:px-10">
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

        <h1 className="sr-only">Apa Itu Nano Bubble?</h1>

        <div className="pointer-events-auto flex justify-center pb-1">
          <a
            href="#nano-bubble-info"
            className="inline-flex items-center gap-2 rounded-full border border-[#d6b85a]/45 bg-white/45 px-5 py-2.5 text-sm font-semibold text-[#5b3708] shadow-lg shadow-amber-950/10 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/65"
          >
            Lihat Penjelasan
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
