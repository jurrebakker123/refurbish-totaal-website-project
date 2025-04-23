
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
    }
  }, [src, imgSrc, hasError]);

  // Pre-check if image exists
  useEffect(() => {
    // Only check if it's not already showing the fallback
    if (imgSrc !== fallbackSrc) {
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully
      };
      img.onerror = () => {
        console.log(`Image pre-check failed: ${imgSrc}, using fallback`);
        setImgSrc(fallbackSrc);
        setHasError(true);
      };
      img.src = imgSrc;
    }
  }, [imgSrc, fallbackSrc]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      console.log(`Image failed to load in component: ${imgSrc}, using fallback`);
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
