'use client';

import Image from 'next/image';

export default function NanoBubbleFeatureSection() {
  const features = [
    {
      title: 'Stabilitas yang Tinggi',
      description: 'Nano Bubble dapat bertahan lebih lama dalam cairan.',
      image: '/assets/Hero/Stabilitas-yang-Tinggi2.png',
    },
    {
      title: 'Luas Permukaan Besar',
      description: 'Ukuran nano memberikan area interaksi yang lebih luas dan efisien.',
      image: '/assets/Hero/Luas-Permukaan-Besar2.png',
    },
    {
      title: 'Potensi Pengantaran Gas',
      description: 'Memungkinkan distribusi oksigen, hidrogen, dan gas bioaktif.',
      image: '/assets/Hero/Potensi-Pengantaran-Gas2.png',
    },
    {
      title: 'Area Riset Berkembang',
      description: 'Terus dieksplorasi dalam berbagai bidang kesehatan.',
      image: '/assets/Hero/Area-Riset-Berkembang2.png',
    },
  ];

  return (
    <section className="rising-bubble-field relative isolate flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-[#fffaf2] text-[#17120a]">
      <div className="rising-bubbles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="rising-bubble" key={index} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,250,242,0.5)_0%,rgba(255,243,222,0.28)_48%,rgba(246,230,195,0.42)_100%)]" />
      <div className="pointer-events-none absolute -left-32 top-12 z-[1] h-72 w-72 rounded-full bg-[#d6b85a]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 z-[1] h-80 w-80 rounded-full bg-[#b69133]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b69133]">
            Karakteristik Utama
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Potensi Nano Bubble untuk Inovasi Kesehatan
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group overflow-hidden rounded-[1.75rem] border border-[#e7d7ac] bg-white/80 shadow-xl shadow-amber-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-950/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
              </div>

              <div className="p-5 text-center sm:p-6">
                <h3 className="text-base font-bold leading-snug text-[#17120a] sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6d665f]">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="https://wa.link/h2uyet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a67319] via-[#d6b85a] to-[#f1d36b] px-6 py-3 text-sm font-semibold text-[#2b1804] shadow-xl shadow-amber-950/15 transition duration-300 hover:scale-[1.03] hover:from-[#f1d36b] hover:to-[#a67319] sm:px-7 sm:text-base"
          >
            Pelajari Nano Bubble Lebih Lanjut
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
