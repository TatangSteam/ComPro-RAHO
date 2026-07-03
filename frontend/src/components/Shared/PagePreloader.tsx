'use client';

import Image from 'next/image';
import { useImagePreloader } from '@/hooks/useImagePreloader';

interface PagePreloaderProps {
  /** Background/hero image URLs to wait for before revealing the page. */
  images: string[];
}

/**
 * Full-screen overlay shown while heavy background images (hero sections,
 * CSS backgroundImage assets) are still downloading. Prevents the page from
 * appearing with backgrounds popping in one by one.
 */
export default function PagePreloader({ images }: PagePreloaderProps) {
  const { isLoaded, progress } = useImagePreloader(images);

  if (isLoaded) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300"
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
    >
      <Image
        src="/assets/icon.png"
        alt="RAHO Club Premier"
        width={64}
        height={64}
        className="mb-6 animate-pulse"
        priority
      />
      <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#B69133] to-[#D6B85A] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">Memuat halaman... {progress}%</p>
    </div>
  );
}
