import Link from 'next/link';
import { Handshake, MapPin, Sparkles } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabClick }: TabNavigationProps) {
  const isTentangActive = activeTab === 'umum';
  const isLokasiActive = activeTab === 'partner-network' || activeTab === 'lokasi';

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 inline-flex min-h-[58px] items-center gap-5 rounded-full border border-[#D6B85A] bg-white/55 px-6 py-3 text-sm font-semibold text-gray-950 shadow-sm backdrop-blur sm:min-w-[470px] sm:justify-center sm:px-8 sm:text-base">
          <Sparkles className="h-8 w-8 text-[#B69133]" />
          <span>Lebih dari Sekadar Peduli Kesehatan</span>
        </div>

        <h1 className="font-display max-w-5xl text-[46px] font-extrabold leading-[0.98] tracking-normal text-[#111111] sm:text-[64px] lg:text-[82px]">
          Tentang Raho Club{' '}
          <span className="text-[#B69133]">Premier</span>
          <br />
          <span className="text-[#B69133]">dan Partnership</span>
        </h1>

        <p className="mt-8 max-w-5xl text-base leading-8 text-[#7a7a7a] sm:text-lg md:text-xl md:leading-9">
          Kami percaya bahwa akses terhadap pengetahuan, teknologi, dan komunitas yang tepat dapat
          membantu menciptakan kualitas hidup yang lebih baik. Oleh karena itu, Raho Premier hadir
          sebagai wadah yang menghubungkan edukasi kesehatan, teknologi Nano Bubble, dan berbagai
          program kolaborasi yang berkelanjutan.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onTabClick('umum')}
            className={`inline-flex min-h-[58px] w-full max-w-[220px] items-center justify-center rounded-full px-8 text-base font-semibold shadow-sm transition-all duration-300 ${
              isTentangActive
                ? 'bg-gradient-to-r from-[#B69133] to-[#D6B85A] text-white shadow-[#B69133]/20'
                : 'border border-[#B69133] bg-white/50 text-[#B69133] hover:bg-[#fff5dc]'
            }`}
          >
            Tentang Kami
          </button>

          <Link
            href="/partnership"
            className="inline-flex min-h-[58px] w-full max-w-[220px] items-center justify-center gap-2 rounded-full border border-[#B69133] bg-white/50 px-8 text-base font-semibold text-[#B69133] shadow-sm transition-all duration-300 hover:bg-[#fff5dc]"
          >
            <Handshake className="h-4 w-4" />
            Partnership
          </Link>

          <button
            onClick={() => onTabClick('partner-network')}
            className={`inline-flex min-h-[58px] w-full max-w-[180px] items-center justify-center gap-2 rounded-full border border-[#B69133] px-8 text-base font-semibold shadow-sm transition-all duration-300 ${
              isLokasiActive
                ? 'bg-gradient-to-r from-[#B69133] to-[#D6B85A] text-white shadow-[#B69133]/20'
                : 'bg-white/50 text-[#B69133] hover:bg-[#fff5dc]'
            }`}
          >
            <MapPin className="h-4 w-4" />
            Lokasi
          </button>
        </div>
      </div>
    </section>
  );
}
