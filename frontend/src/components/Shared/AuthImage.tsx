"use client";
import React, { useEffect, useState } from 'react';
import { createAuthenticatedObjectUrl } from '@/lib/fileApi';

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
}

export default function AuthImage({ src, alt, ...rest }: Props) {
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    let currentObject: string | undefined;

    async function load() {
      if (!src) return;
      const url = await createAuthenticatedObjectUrl(src);
      if (!mounted) return;
      if (url) {
        currentObject = url;
        setObjectUrl(url);
      } else {
        setObjectUrl(undefined);
      }
    }

    load();

    return () => {
      mounted = false;
      if (currentObject) {
        URL.revokeObjectURL(currentObject);
      }
    };
  }, [src]);

  if (!src) return null;

  return (
    <img 
      src={objectUrl || ''} 
      alt={alt} 
      loading="lazy"
      {...rest} 
    />
  );
}
