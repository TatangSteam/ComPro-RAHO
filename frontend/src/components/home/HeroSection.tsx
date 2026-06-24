'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#fffaf2]">
      {/* Rising Bubbles Background Layer */}
      <div className="bubbles-layer" aria-hidden="true">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

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

      {/* Bubble Animation Styles */}
      <style jsx>{`
        .bubbles-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          bottom: -120px;
          border-radius: 50%;
          opacity: 0;
          animation: rise-bubble var(--dur, 10s) var(--delay, 0s) infinite ease-in;
          background: radial-gradient(
            circle at 35% 30%,
            rgba(200, 160, 50, 0.18) 0%,
            rgba(200, 150, 0, 0.06) 45%,
            transparent 70%
          );
          border: 1px solid rgba(200, 160, 50, 0.25);
          box-shadow:
            inset 0 0 6px rgba(200, 150, 0, 0.08),
            0 0 10px rgba(200, 140, 30, 0.05);
        }

        @keyframes rise-bubble {
          0% {
            bottom: -120px;
            opacity: 0;
            transform: translateX(0) scale(0.6);
          }
          10% { opacity: 0.35; }
          80% { opacity: 0.35; }
          100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(var(--drift, 80px)) scale(1);
          }
        }

        .bubble:nth-child(1)  { width: 40px; height: 40px; left: 10%; --dur: 8s;   --delay: 0s;   --drift: 80px;   }
        .bubble:nth-child(2)  { width: 20px; height: 20px; left: 20%; --dur: 5s;   --delay: 1s;   --drift: -60px;  }
        .bubble:nth-child(3)  { width: 50px; height: 50px; left: 35%; --dur: 7s;   --delay: 2s;   --drift: 100px;  }
        .bubble:nth-child(4)  { width: 80px; height: 80px; left: 50%; --dur: 11s;  --delay: 0s;   --drift: -120px; }
        .bubble:nth-child(5)  { width: 35px; height: 35px; left: 55%; --dur: 6s;   --delay: 1s;   --drift: 80px;   }
        .bubble:nth-child(6)  { width: 45px; height: 45px; left: 65%; --dur: 8s;   --delay: 3s;   --drift: -70px;  }
        .bubble:nth-child(7)  { width: 90px; height: 90px; left: 70%; --dur: 12s;  --delay: 2s;   --drift: 140px;  }
        .bubble:nth-child(8)  { width: 25px; height: 25px; left: 80%; --dur: 6s;   --delay: 2s;   --drift: -50px;  }
        .bubble:nth-child(9)  { width: 15px; height: 15px; left: 70%; --dur: 5s;   --delay: 1s;   --drift: 60px;   }
        .bubble:nth-child(10) { width: 90px; height: 90px; left: 25%; --dur: 10s;  --delay: 4s;   --drift: -130px; }
        .bubble:nth-child(11) { width: 30px; height: 30px; left: 42%; --dur: 7.5s; --delay: 3.5s; --drift: 90px;   }
        .bubble:nth-child(12) { width: 58px; height: 58px; left: 88%; --dur: 9.5s; --delay: 1.5s; --drift: -80px;  }

        @media (prefers-reduced-motion: reduce) {
          .bubble {
            animation: none !important;
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
}
