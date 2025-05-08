
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder.svg',
  style = {},
  objectFit = 'cover',
  width,
  height,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, imgSrc, hasError]);

  // Pre-load image to check if it's valid
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setHasError(false);
    };
    img.onerror = () => {
      if (imgSrc !== fallbackSrc) {
        console.log(`Image failed to load: ${imgSrc}, using fallback`);
        setImgSrc(fallbackSrc);
        setHasError(true);
      }
    };
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.log(`Image failed to load: ${imgSrc}, using fallback`);
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
      width={width}
      height={height}
    />
  );
}
