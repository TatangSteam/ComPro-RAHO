'use client';

import { useEffect, useRef, useState } from 'react';

interface UseImagePreloaderOptions {
  /** Force-hide the preloader after this many ms even if not all images loaded (network stall / broken asset safety net). */
  timeoutMs?: number;
}

interface UseImagePreloaderResult {
  /** true once every image has loaded (or failed) or the timeout was hit. */
  isLoaded: boolean;
  /** 0-100 loading progress based on resolved images. */
  progress: number;
}

/**
 * Preloads a list of image URLs (e.g. large hero/section background images)
 * and reports overall progress. Used to keep a loading overlay visible until
 * heavy background assets have actually finished downloading, instead of
 * showing a page with backgrounds popping in late.
 */
export function useImagePreloader(
  urls: string[],
  { timeoutMs = 10000 }: UseImagePreloaderOptions = {}
): UseImagePreloaderResult {
  const [loadedCount, setLoadedCount] = useState(0);
  const [forceDone, setForceDone] = useState(false);
  const total = useRef(urls.length).current;

  useEffect(() => {
    if (urls.length === 0) {
      setForceDone(true);
      return;
    }

    let isCancelled = false;
    let resolvedCount = 0;

    const markResolved = () => {
      if (isCancelled) return;
      resolvedCount += 1;
      setLoadedCount(resolvedCount);
    };

    const images = urls.map((url) => {
      const img = new window.Image();
      img.onload = markResolved;
      img.onerror = markResolved; // don't block forever on a missing/broken asset
      img.src = url;
      return img;
    });

    const timeout = window.setTimeout(() => {
      if (!isCancelled) setForceDone(true);
    }, timeoutMs);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeout);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join('|'), timeoutMs]);

  const progress = total === 0 ? 100 : Math.round((loadedCount / total) * 100);
  const isLoaded = forceDone || loadedCount >= total;

  return { isLoaded, progress };
}
