'use client';

import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

type LightboxImage = {
  src: string;
  title: string;
};

function getLightboxImage(trigger: HTMLElement): LightboxImage | null {
  const nestedImage =
    trigger instanceof HTMLImageElement
      ? trigger
      : trigger.querySelector<HTMLImageElement>('img');
  const imageSrc = nestedImage?.currentSrc || nestedImage?.src || '';
  const explicitSrc = trigger.dataset.lightboxSrc || nestedImage?.dataset.lightboxSrc || '';
  const src = imageSrc.startsWith('blob:') ? imageSrc : explicitSrc || imageSrc;

  if (!src) {
    return null;
  }

  return {
    src,
    title:
      trigger.dataset.lightboxTitle ||
      nestedImage?.dataset.lightboxTitle ||
      nestedImage?.alt ||
      'Preview gambar',
  };
}

export default function ImageLightbox() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>('[data-lightbox-image]');
      const proseImage =
        target instanceof HTMLImageElement && target.closest('.prose') ? target : null;

      const lightboxTrigger = trigger || proseImage;
      if (!lightboxTrigger) return;

      const lightboxImage = getLightboxImage(lightboxTrigger);
      if (!lightboxImage) return;

      event.preventDefault();
      event.stopPropagation();
      setActiveImage(lightboxImage);
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage]);

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label={activeImage.title}
      onClick={() => setActiveImage(null)}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white shadow-xl shadow-black/30 backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-[#F4D98A]">
              <Maximize2 className="h-5 w-5" />
            </span>
            <p className="truncate text-sm font-semibold sm:text-base">{activeImage.title}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D98A]"
            aria-label="Tutup preview gambar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/50 backdrop-blur">
          <img
            src={activeImage.src}
            alt={activeImage.title}
            className="mx-auto max-h-[78dvh] max-w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
