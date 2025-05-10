
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Process the source path
  const processPath = (path: string): string => {
    if (path.startsWith('public/')) {
      return path.replace('public/', '/');
    }
    if (path.startsWith('http') && path.includes('unsplash.com')) {
      // Use a placeholder for unsplash images which might not be available
      return fallbackSrc;
    }
    return path;
  };

  const processedSrc = processPath(imgSrc);

  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(processPath(src));
      setHasError(false);
      setIsLoading(true);
    }
  }, [src, imgSrc, hasError]);

  // Pre-load image to check if it's valid
  useEffect(() => {
    const img = new Image();
    const srcToCheck = processPath(src);
    img.src = srcToCheck;
    
    const onLoad = () => {
      setImgSrc(srcToCheck);
      setHasError(false);
      setIsLoading(false);
    };
    
    const onError = () => {
      console.log(`Image failed to load: ${srcToCheck}, using fallback`);
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    };
    
    img.onload = onLoad;
    img.onerror = onError;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.log(`Image failed to load: ${processedSrc}, using fallback`);
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative" style={{ minHeight: '50px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={processedSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'invisible' : 'visible'}`}
        style={{ objectFit, ...style }}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    </div>
  );
}
