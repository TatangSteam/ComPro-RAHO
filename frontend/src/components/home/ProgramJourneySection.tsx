import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import WellnessBackground from '@/components/Shared/WellnessBackground';

const programSteps = [
  {
    title: 'Konsultasi',
    description: 'Pahami kondisi dan tujuan Anda.',
    image: '/assets/program-journey/consultation.webp',
    alt: 'Ilustrasi dokter dan pasien berdiskusi saat konsultasi awal',
  },
  {
    title: 'Assessment',
    description: 'Pemeriksaan kondisi tubuh.',
    image: '/assets/program-journey/assessment.webp',
    alt: 'Ilustrasi praktisi kesehatan memeriksa tekanan darah pasien',
  },
  {
    title: 'Program Personal',
    description: 'Program disesuaikan dengan kebutuhan Anda.',
    image: '/assets/program-journey/personal-program.webp',
    alt: 'Ilustrasi praktisi dan pasien menyusun program personal bersama',
  },
  {
    title: 'Follow-up',
    description: 'Pantau perkembangan secara berkala.',
    image: '/assets/program-journey/follow-up.webp',
    alt: 'Ilustrasi dokter meninjau perkembangan pasien saat follow-up',
  },
];

export default function ProgramJourneySection() {
  return (
    <section
      id="perjalanan-program"
      aria-labelledby="program-journey-heading"
      className="relative isolate z-[2] flex scroll-mt-20 items-center overflow-hidden bg-[#FBF8F1] py-14 sm:py-16 lg:py-20"
    >
      <WellnessBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-9 max-w-4xl sm:mb-11">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#AA2330]">
            Bagaimana Cara Kerjanya
          </p>
          <h2
            id="program-journey-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-[#292723] sm:text-4xl lg:text-[44px]"
          >
            Perjalanan Program Anda di RAHO
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#69635A] sm:text-lg">
            Pendampingan personal, dari konsultasi hingga evaluasi berkala.
          </p>
        </div>

        <ol className="mx-auto grid max-w-md grid-cols-1 gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {programSteps.map((step, index) => (
            <li key={step.title} className="relative flex min-w-0">
              <article className="w-full rounded-[20px] border border-[#EAE2D3] bg-white shadow-[0_6px_24px_rgba(75,54,19,0.04)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-[19px]">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative -mt-6 flex justify-center">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-1/2 top-6 hidden h-px bg-[#D5B66A] lg:block"
                    />
                  )}
                  {index < programSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-6 left-1/2 top-6 hidden h-px bg-[#D5B66A] lg:block"
                    >
                      <ArrowRight className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B69133]" />
                    </span>
                  )}
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#B69133] text-lg font-semibold tabular-nums text-[#201A0E] ring-[5px] ring-white">
                    <span className="sr-only">Langkah </span>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="px-5 pb-7 pt-5 text-center lg:px-4">
                  <h3 className="text-lg font-semibold text-[#292723] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-[#69635A]">
                    {step.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm leading-relaxed text-[#69635A] sm:mt-10 sm:text-base">
          Setiap langkah disesuaikan dengan kebutuhan Anda.
        </p>
      </div>
    </section>
  );
}
