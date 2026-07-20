'use client';

import Image from 'next/image';

export default function NanoBubbleInfoSection() {
  return (
    <section
      id="nano-bubble-info"
      className="rising-bubble-field relative isolate flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-[#fffaf2] text-[#16120b]"
    >
      <div className="rising-bubbles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="rising-bubble" key={index} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_8%_22%,rgba(215,184,92,0.16),transparent_12rem),radial-gradient(circle_at_92%_78%,rgba(215,184,92,0.18),transparent_14rem)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
        <h2 className="max-w-4xl text-2xl font-bold leading-tight text-[#111111] sm:text-3xl lg:text-4xl">
          Teknologi yang Menjadi Fondasi Inovasi Kami
        </h2>

        <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-[#6d665f] sm:text-base md:text-lg md:leading-9">
          Nano Bubble adalah gelembung gas berukuran nano yang memiliki karakteristik
          unik termasuk stabilitas tinggi dan luas permukaan besar. Karakteristik ini
          menjadikannya salah satu teknologi yang terus diteliti untuk berbagai
          kebutuhan kesehatan.
        </p>

        <div className="mt-8 w-full max-w-5xl sm:mt-10 lg:mt-12">
          <Image
            src="/assets/Hero/Hero-Section.gif"
            alt="Animasi Nano Bubble"
            width={1200}
            height={680}
            data-lightbox-image="true"
            data-lightbox-src="/assets/Hero/Hero-Section.gif"
            data-lightbox-title="Animasi Nano Bubble"
            unoptimized
            className="mx-auto h-auto max-h-[clamp(16rem,50vh,34rem)] w-full cursor-zoom-in object-contain drop-shadow-[0_2rem_3rem_rgba(128,88,20,0.18)]"
          />
        </div>
      </div>
    </section>
  );
}
