
import React from 'react';
import { DienstData } from '@/data/types/dienst';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface DienstHeroProps {
  dienst: DienstData;
  serviceId: string;
}

const DienstHero = ({ dienst, serviceId }: DienstHeroProps) => {
  // Adjust height for PVC vloeren page
  const heroHeight = serviceId === 'pvc-vloeren' ? 'py-12' : 'py-16';
  
  // Check if the image URL is valid and exists
  const imageUrl = dienst.image || '/placeholder.svg';
  
  // Use a backup image if the current one fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    const element = e.target as HTMLDivElement;
    element.style.backgroundImage = "url('/placeholder.svg')";
  };

  return (
    <section className={`relative text-white ${heroHeight}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: 'center 25%'
        }}
        onError={handleImageError}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-50"></div>
      </div>
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="animate-float">{dienst.icon}</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{dienst.title}</h1>
            <p className="text-xl">{dienst.description}</p>
          </div>
          <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-lg overflow-hidden shadow-lg hover-lift">
              <OptimizedImage 
                src={imageUrl} 
                alt={dienst.title} 
                className="w-full h-auto"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DienstHero;
