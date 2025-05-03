
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

  // Reset error state and image source when src prop changes
  useEffect(() => {
    if (src !== imgSrc) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, imgSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.log(`Image failed to load: ${imgSrc}, using fallback: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Pre-check if the image is valid
  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setHasError(false);
    };
    
    img.onerror = () => {
      if (src !== fallbackSrc) {
        console.log(`Image preload failed: ${src}, using fallback`);
        setImgSrc(fallbackSrc);
        setHasError(true);
      }
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

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
