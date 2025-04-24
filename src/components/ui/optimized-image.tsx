
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder.svg',
  style = {},
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src]);

  const handleError = () => {
    console.log(`Image failed to load: ${imgSrc}, using fallback: ${fallbackSrc}`);
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={{ objectFit, ...style }}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}
