
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

  // Fix path if it starts with public/
  const processedSrc = imgSrc.startsWith('public/') ? imgSrc.replace('public/', '/') : imgSrc;

  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      const newSrc = src.startsWith('public/') ? src.replace('public/', '/') : src;
      setImgSrc(newSrc);
      setHasError(false);
    }
  }, [src, imgSrc, hasError]);

  // Pre-load image to check if it's valid
  useEffect(() => {
    const img = new Image();
    const srcToCheck = src.startsWith('public/') ? src.replace('public/', '/') : src;
    img.src = srcToCheck;
    
    img.onload = () => {
      setImgSrc(srcToCheck);
      setHasError(false);
    };
    
    img.onerror = () => {
      if (imgSrc !== fallbackSrc) {
        console.log(`Image failed to load: ${srcToCheck}, using fallback`);
        setImgSrc(fallbackSrc);
        setHasError(true);
      }
    };
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.log(`Image failed to load: ${processedSrc}, using fallback`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={processedSrc}
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
