
import React, { useState, useRef, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, RotateCcw, ArrowDown } from 'lucide-react';

// Define the angles for our 360-degree view
const ANGLES = [
  {
    degree: 0,
    src: '/lovable-uploads/7637419b-43f3-4013-b688-d06efaec5329.png',
    label: 'Voorzijde'
  },
  {
    degree: 45,
    src: '/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png',
    label: 'Hoekzicht'
  },
  {
    degree: 90,
    src: '/lovable-uploads/504b25db-f625-4ccd-9e93-6970157c6bf6.png',
    label: 'Zijkant'
  },
  {
    degree: 135,
    src: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
    label: 'Achterzijde hoek'
  },
  {
    degree: 180,
    src: '/lovable-uploads/e4d081e7-d3f8-4e19-b2bf-0bf8c01f0dce.png',
    label: 'Achterzijde'
  },
  {
    degree: 225,
    src: '/lovable-uploads/541390cc-5853-4cca-be10-6ac89b366249.png',
    label: 'Andere hoek'
  },
  {
    degree: 270,
    src: '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png',
    label: 'Andere zijkant'
  },
  {
    degree: 315,
    src: '/lovable-uploads/5da5d680-5b13-440b-9aae-20e52a50a501.png',
    label: 'Laatste hoekzicht'
  }
];

// These are the options that will change the appearance of the dakkapel
const MATERIALS = {
  keralit: {
    name: 'Keralit',
    images: ANGLES
  },
  hout: {
    name: 'Hout',
    images: ANGLES.map(angle => ({
      ...angle,
      src: angle.src // In a real implementation, these would be different images for wood material
    }))
  },
  zink: {
    name: 'Zink',
    images: ANGLES.map(angle => ({
      ...angle,
      src: angle.src // In a real implementation, these would be different images for zinc material
    }))
  }
};

const COLORS = {
  wit: 'Wit',
  crème: 'Crème',
  antraciet: 'Antraciet',
  zwart: 'Zwart'
};

export function DakkapelGallery() {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState('keralit');
  const [selectedColor, setSelectedColor] = useState('wit');
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get current image based on angle index and selected options
  const currentImage = MATERIALS[selectedMaterial as keyof typeof MATERIALS].images[currentAngleIndex];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setCurrentAngleIndex(prev => {
        const newIndex = (prev + 1) % ANGLES.length;
        setSliderValue(ANGLES[newIndex].degree);
        return newIndex;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Calculate which angle to show based on drag position
  const updateAngleFromDrag = (clientX: number) => {
    if (!containerRef.current) return;
    const deltaX = clientX - startXRef.current;
    if (Math.abs(deltaX) > 20) {
      // Threshold to prevent tiny movements
      // Determine direction
      const direction = deltaX > 0 ? -1 : 1; // Negative for right drag (clockwise), positive for left drag (counterclockwise)

      setCurrentAngleIndex(prev => {
        const next = (prev + direction + ANGLES.length) % ANGLES.length;
        setSliderValue(ANGLES[next].degree);
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
    <section className="py-8 bg-white rounded-lg shadow-md">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-brand-darkGreen">
            Bekijk onze dakkapel in 360°
          </h2>
          <p className="text-base text-gray-700 max-w-3xl mx-auto">
            Draai de dakkapel rond om alle details goed te bekijken en pas de opties aan
            om te zien hoe verschillende materialen en kleuren eruit zien.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-sky-50">
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
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                    <span className="flex items-center">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      360°
                    </span>
                  </div>
                  
                  {/* Loading indicator */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-darkGreen"></div>
                    </div>
                  )}
                  
                  {/* Current angle image */}
                  <img 
                    src={currentImage.src}
                    alt={`Dakkapel vanuit ${currentImage.degree}°`}
                    className="w-full h-full object-cover"
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </AspectRatio>
            
            {/* Slider control for rotation */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Draai de dakkapel</span>
                <span className="ml-auto text-sm font-medium">{Math.floor(currentImage.degree)}°</span>
              </div>
              
              <Slider 
                value={[sliderValue]} 
                min={0} 
                max={359} 
                step={1} 
                onValueChange={handleSliderChange}
                className="py-1.5"
              />
            </div>
            
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="text-xs px-2.5 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors flex items-center gap-1"
                >
                  {autoRotate ? (
                    <>
                      <RotateCcw className="h-3 w-3" /> Rotatie stoppen
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-3 w-3" /> Automatisch roteren
                    </>
                  )}
                </button>
                
                <div className="text-xs text-gray-500">
                  {currentImage.label} ({Math.floor(currentImage.degree)}°)
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Tip: Klik en sleep om de dakkapel te draaien
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-brand-darkGreen mb-4">
              Pas de opties aan
            </h3>
            
            {/* Material selection */}
            <div className="mb-5">
              <h4 className="text-sm font-medium mb-2">Materiaal:</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(MATERIALS).map(([key, material]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMaterial(key)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      selectedMaterial === key
                        ? 'bg-brand-lightGreen text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {material.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color selection */}
            <div className="mb-5">
              <h4 className="text-sm font-medium mb-2">Kleur:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedColor(key)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      selectedColor === key
                        ? 'bg-brand-lightGreen text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Additional features */}
            <div>
              <h4 className="text-sm font-medium mb-2">Extra features:</h4>
              <div className="space-y-2">
                {['Ventilatieroosters', 'Zonwering', 'Horren'].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature}`}
                      className="h-4 w-4 rounded border-gray-300 text-brand-lightGreen focus:ring-brand-lightGreen"
                    />
                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-500 mb-1">Geschatte prijs vanaf:</p>
                <p className="text-xl font-bold text-brand-darkGreen">
                  €6.575,00
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="#configurator"
                  className="flex items-center justify-center w-full bg-brand-darkGreen text-white py-2.5 rounded-md gap-2 text-sm hover:bg-opacity-90 transition-colors"
                >
                  Stel uw dakkapel samen
                  <ArrowDown size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-brand-darkGreen mb-2">Foto-impressie</h3>
          <Carousel className="w-full">
            <CarouselContent>
              {ANGLES.map((angle, index) => (
                <CarouselItem key={index} className="basis-1/4 md:basis-1/5 lg:basis-1/6">
                  <div className="p-1">
                    <div 
                      className={`overflow-hidden rounded-lg border-2 cursor-pointer ${
                        currentAngleIndex === index ? 'border-brand-lightGreen' : 'border-transparent'
                      }`}
                      onClick={() => {
                        setCurrentAngleIndex(index);
                        setSliderValue(angle.degree);
                      }}
                    >
                      <AspectRatio ratio={1/1}>
                        <img 
                          src={angle.src} 
                          alt={`Dakkapel impressie ${index + 1}`} 
                          className="w-full h-full object-cover object-center" 
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
