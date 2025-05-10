
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
    if (!path) return fallbackSrc;
    
    // If it's a local lovable upload, ensure it has the correct path
    if (path.includes('lovable-uploads') && !path.startsWith('/')) {
      return '/' + path;
    }
    
    if (path.startsWith('public/')) {
      return path.replace('public/', '/');
    }
    
    return path;
  };

  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(processPath(src));
      setHasError(false);
      setIsLoading(true);
    }
  }, [src, imgSrc, hasError, fallbackSrc]);

  // Handle image load and error events
  const handleError = () => {
    console.log(`Image failed to load: ${imgSrc}, using fallback`);
    setImgSrc(fallbackSrc);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative" style={{ minHeight: '50px', ...style }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={processPath(imgSrc)}
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
