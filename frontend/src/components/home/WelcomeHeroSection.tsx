'use client';

import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WelcomeHeroSection() {
  const exploreNanoBubble = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById('nano-bubble');
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', '#nano-bubble');
    section.focus({ preventScroll: true });
  };

  return (
    <section
      id="selamat-datang"
      aria-labelledby="welcome-heading"
      className="relative isolate flex flex-col overflow-hidden bg-[#25211B] text-[#FFFBF4] lg:justify-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[2] h-52 w-64 opacity-20 [mask-image:linear-gradient(135deg,black,transparent_70%)] bg-[radial-gradient(circle,#D6B85A_2px,transparent_3px)] bg-[size:20px_20px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-xl lg:w-[46%]">
          <h1 id="welcome-heading" className="text-[clamp(2rem,4.3vw,3.75rem)] font-semibold leading-[1.1] tracking-tight">
            <span className="block">Pulihkan</span>
            <span className="block">Keseimbangan.</span>
            <span className="block text-[#E4C477]">Perbarui</span>
            <span className="block text-[#E4C477]">Kualitas Hidup.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#F2EBDF] sm:text-base">
            Program kesehatan personal berbasis teknologi Nano Bubble, dengan pendampingan dokter berpengalaman.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://api.whatsapp.com/send?phone=6287766677055&text=Halo%2C%20saya%20mendapatkan%20informasi%20tentang%20Raho%20Premier%20dari%20website.%20Saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20layanan%20yang%20tersedia.%20Bisa%20dibantu%20penjelasannya%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#AA1734] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C02042] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C477] focus-visible:ring-offset-4 focus-visible:ring-offset-[#25211B]"
            >
              <FaWhatsapp aria-hidden="true" className="h-5 w-5 shrink-0" />
              Konsultasi Sekarang
            </a>
            <a
              href="#nano-bubble"
              onClick={exploreNanoBubble}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D6B85A] bg-[#25211B]/70 px-6 py-3 text-sm font-semibold text-[#E4C477] transition-colors hover:bg-[#D6B85A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C477] focus-visible:ring-offset-4 focus-visible:ring-offset-[#25211B]"
            >
              Pelajari Nano Bubble
              <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
            </a>
          </div>

          <a href="#nano-bubble" onClick={exploreNanoBubble} className="mt-10 hidden w-fit items-center gap-2 rounded text-xs text-[#F2EBDF] hover:text-[#E4C477] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C477] lg:inline-flex">
            <ArrowDown aria-hidden="true" className="h-4 w-4 text-[#E4C477]" />
            Kenali teknologi kami
          </a>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full sm:aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[66%]">
        <Image
          src="/assets/Hero/wellness-consultation.webp"
          alt="Ilustrasi dokter berdiskusi dengan pasien dalam konsultasi kesehatan personal"
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#25211B_0%,transparent_22%)] lg:bg-[linear-gradient(90deg,#25211B_10%,rgba(37,33,27,0.45)_22%,transparent_40%)]" />
      </div>
    </section>
  );
}
