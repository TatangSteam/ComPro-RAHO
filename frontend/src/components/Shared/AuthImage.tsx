"use client";
import React, { useEffect, useRef, useState } from 'react';
import { createAuthenticatedObjectUrl } from '@/lib/fileApi';

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
}

export default function AuthImage({ src, alt, ...rest }: Props) {
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);
  const objectUrlRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    // Release the previous blob before starting another request. This is
    // important when a list is filtered or paginated quickly.
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = undefined;
    }
    setObjectUrl(undefined);

    async function load() {
      if (!src) return;
      const url = await createAuthenticatedObjectUrl(src);
      if (cancelled) {
        // The request may finish after unmount/prop change. Do not leave the
        // generated blob URL alive in that case.
        if (url) URL.revokeObjectURL(url);
        return;
      }

      objectUrlRef.current = url;
      setObjectUrl(url);
    }

    load();

    return () => {
      cancelled = true;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = undefined;
      }
    };
  }, [src]);

  // Avoid rendering an empty `src` while the authenticated request is in
  // flight. Empty-src images can trigger an unnecessary document request and
  // retain a decoded page-sized image in the browser cache.
  if (!src || !objectUrl) return null;

  return (
    <img 
      src={objectUrl}
      alt={alt} 
      loading="lazy"
      {...rest} 
    />
  );
}
