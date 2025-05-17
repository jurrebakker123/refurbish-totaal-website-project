import React, { useState, useRef, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

// Define the angles for our 360-degree view with new images
const ANGLES = [
  { degree: 0, src: '/lovable-uploads/a6112a45-bfd2-4d20-b496-8dc7a87d8142.png' },
  { degree: 45, src: '/lovable-uploads/d67ca9bb-8389-42de-a068-52cf63d8b04a.png' },
  { degree: 90, src: '/lovable-uploads/2436d289-2c67-4857-89ad-61736ba3dc09.png' },
  { degree: 135, src: '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png' },
  { degree: 180, src: '/lovable-uploads/1d399cd4-9b33-4b0d-8c07-f6314f8b5a6a.png' },
  { degree: 225, src: '/lovable-uploads/3fb04066-dfc7-400c-9fda-28e2a97979a4.png' },
  { degree: 270, src: '/lovable-uploads/0e7822c5-5fb3-4431-868f-04b3c7ca0be1.png' },
  // Replacing the problematic 315 degree image with another angle image
  { degree: 315, src: '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png' },
];

export function TuinhuizenGallery() {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0); // New state for slider
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Get current image based on angle index
  const currentImage = ANGLES[currentAngleIndex];
  
  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentAngleIndex(prev => {
        const newIndex = (prev + 1) % ANGLES.length;
        setSliderValue(ANGLES[newIndex].degree); // Update slider when auto-rotating
        return newIndex;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Calculate which angle to show based on drag position
  const updateAngleFromDrag = (clientX: number) => {
    if (!containerRef.current) return;
    
    const deltaX = clientX - startXRef.current;
    
    if (Math.abs(deltaX) > 20) { // Threshold to prevent tiny movements
      // Determine direction
      const direction = deltaX > 0 ? -1 : 1; // Negative for right drag (clockwise), positive for left drag (counterclockwise)
      
      setCurrentAngleIndex(prev => {
        const next = (prev + direction + ANGLES.length) % ANGLES.length;
        setSliderValue(ANGLES[next].degree); // Update slider value when dragging
        return next;
      });
      
      // Reset start position
      startXRef.current = clientX;
    }
  };
  
  // Function to handle slider change
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    
    // Find the closest angle in our ANGLES array
    let closestIndex = 0;
    let closestDiff = Math.abs(ANGLES[0].degree - newValue);
    
    ANGLES.forEach((angle, index) => {
      const diff = Math.abs(angle.degree - newValue);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = index;
      }
    });
    
    setCurrentAngleIndex(closestIndex);
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    startXRef.current = e.clientX;
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateAngleFromDrag(e.clientX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    startXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    updateAngleFromDrag(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Plano tuinhuis – 500 cm breed
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Een stijlvolle combinatie van berging en overkapping met zwart/douglas hout.
            Bekijk het tuinhuis vanuit alle hoeken.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <AspectRatio ratio={16/10} className="bg-sky-50">
              <div 
                ref={containerRef}
                className="w-full h-full relative cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {/* 360 degree view indicator */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    <span className="flex items-center">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      360°
                    </span>
                  </div>
                  
                  {/* Loading indicator */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-darkGreen"></div>
                    </div>
                  )}
                  
                  {/* Current angle image */}
                  <img 
                    src={currentImage.src} 
                    alt={`Tuinhuis vanuit ${currentImage.degree}°`}
                    className="w-full h-full object-cover"
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </AspectRatio>
            
            {/* Slider control for rotation */}
            <div className="px-6 py-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Draai het tuinhuis</span>
                <span className="ml-auto text-sm font-medium">{Math.floor(currentImage.degree)}°</span>
              </div>
              
              <Slider
                value={[sliderValue]}
                min={0}
                max={359}
                step={1}
                onValueChange={handleSliderChange}
                className="py-2"
              />
            </div>
            
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors flex items-center gap-1"
                >
                  {autoRotate ? (
                    <>
                      <RotateCcw className="h-4 w-4" /> Rotatie stoppen
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4" /> Automatisch roteren
                    </>
                  )}
                </button>
                
                <div className="text-sm text-gray-500">
                  {Math.floor(currentImage.degree)}°
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Tip: Klik en sleep om het tuinhuis te draaien
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Specificaties
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Afmetingen: 500 x 350 cm (breedte x diepte)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Wandhoogte: 230 cm, nokhoogte: 260 cm</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Zwarte wanden met douglas accenten</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Geïntegreerde overkapping van 200 cm diep</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Onbehandeld geschaafd douglashout</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>EPDM dakbedekking met aluminium randafwerking</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Foto-impressie
              </h3>
              <Carousel className="w-full max-w-md">
                <CarouselContent>
                  {[
                    '/lovable-uploads/a6112a45-bfd2-4d20-b496-8dc7a87d8142.png',
                    '/lovable-uploads/d67ca9bb-8389-42de-a068-52cf63d8b04a.png',
                    '/lovable-uploads/2436d289-2c67-4857-89ad-61736ba3dc09.png',
                    '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png',
                    '/lovable-uploads/1d399cd4-9b33-4b0d-8c07-f6314f8b5a6a.png',
                    '/lovable-uploads/3fb04066-dfc7-400c-9fda-28e2a97979a4.png',
                    '/lovable-uploads/0271be36-660a-4b52-bf9a-b9d16efce0c5.png',
                    '/lovable-uploads/0e7822c5-5fb3-4431-868f-04b3c7ca0be1.png'
                  ].map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <img 
                            src={src} 
                            alt={`Tuinhuis impressie ${index + 1}`} 
                            className="w-full h-full aspect-square object-cover object-center"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            </div>
            
            <div className="pt-4">
              <a 
                href="#offerte-aanvragen" 
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-md"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Offerte aanvragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
