
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
  fallbackSrc = '/lovable-uploads/5f8f6883-901d-4157-ab41-1b023e186ede.png',
  style = {},
  objectFit = 'cover',
  width,
  height
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

    // If it's an unsplash URL, add a fallback mechanism
    if (path.includes('unsplash.com')) {
      return path;
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
    <div className="relative" style={{
      minHeight: '50px',
      ...style
    }}>
      {isLoading && 
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
      
      <img
        src={processPath(imgSrc)}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          objectFit,
          transition: 'opacity 0.3s ease-in-out',
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          ...style
        }}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
